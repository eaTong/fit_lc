import { useEffect, useRef, useCallback, useState } from 'react';
import { useChatStore, getRecentHistory } from '../stores/chatStore';
import { useToastStore } from '../stores/toastStore';
import { useAchievementStore } from '../stores/achievementStore';
import { recordsApi } from '../api/records';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import VoiceRecordButton from '../components/VoiceRecordButton';
import FirstTimeCelebration from '../components/celebration/FirstTimeCelebration';

export default function Chat() {
  const { messages, isLoading, revokedMessageIds, sendMessage, markMessageAsRevoked, lastUserMessageContent, loadLatestMessages } = useChatStore();
  const { addToast } = useToastStore();
  const { stats: achievementStats, fetchStats } = useAchievementStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showFirstTimeCelebration, setShowFirstTimeCelebration] = useState(false);
  const prevWorkoutsCount = useRef<number>(0);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load latest 20 messages on mount
  useEffect(() => {
    loadLatestMessages(20);
  }, [loadLatestMessages]);

  // Check for first workout completion
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    const totalWorkouts = achievementStats['total_workouts']?.value || 0;
    if (prevWorkoutsCount.current === 0 && totalWorkouts === 1) {
      setShowFirstTimeCelebration(true);
    }
    prevWorkoutsCount.current = totalWorkouts;
  }, [achievementStats]);

  const handleSend = useCallback(async (content: string) => {
    // Get latest messages from store to avoid stale closure
    const latestMessages = useChatStore.getState().messages;
    await sendMessage(content, getRecentHistory(latestMessages, 10));
    // Refresh stats after sending message (in case workout was saved)
    fetchStats();
  }, [sendMessage, fetchStats]);

  const handleUndo = useCallback(async (messageId: string) => {
    // Get latest messages from store to avoid stale closure
    const latestMessages = useChatStore.getState().messages;
    const savedData = latestMessages.find(m => m.id === messageId)?.savedData;
    if (savedData && savedData.id !== undefined) {
      try {
        if (savedData.type === 'workout') {
          await recordsApi.deleteWorkout(savedData.id);
        } else {
          await recordsApi.deleteMeasurement(savedData.id);
        }
        // Mark message as revoked only after successful deletion
        markMessageAsRevoked(messageId);
        addToast('记录已撤销', 'success');
      } catch (err: any) {
        console.error('Undo failed:', err);
        // Don't mark as revoked if delete failed
        addToast(err?.response?.data?.error || '撤销失败，请重试', 'error');
      }
    }
  }, [markMessageAsRevoked, addToast]);

  const handleVoiceSuccess = useCallback(() => {
    // Voice recorded and saved successfully - could trigger other actions
  }, []);

  return (
    <>
      <FirstTimeCelebration
        show={showFirstTimeCelebration}
        onComplete={() => setShowFirstTimeCelebration(false)}
      />
      <div className="flex flex-col h-[calc(100vh-73px)]">
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {messages.length === 0 && (
            <div className="text-center text-text-secondary mt-20">
              <p className="font-heading text-xl">开始记录你的健身数据</p>
              <p className="text-text-muted mt-2">
                例如："今天深蹲100kg 5组" 或 "这周跑了多少次？"
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onUndo={msg.savedData ? () => handleUndo(msg.id) : undefined}
              isRevoked={revokedMessageIds.has(msg.id)}
            />
          ))}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t-2 border-border px-6 py-4 bg-primary-secondary">
          <div className="flex gap-3 items-center">
            <ChatInput onSend={handleSend} disabled={isLoading} initialValue={lastUserMessageContent} />
            <VoiceRecordButton
              onSuccess={handleVoiceSuccess}
              onPartial={(text) => addToast(`待补充: ${text}`, 'warning')}
            />
          </div>
        </div>
      </div>
    </>
  );
}