// mini-program/src/pages/chat/index.tsx
import { View, ScrollView, Text, Input, Button } from '@tarojs/components';
import { useState, useEffect, useRef } from 'react';
import { useChatStore } from '../../store/chat';
import { useAuthStore } from '../../store/auth';
import { useRecordsStore } from '../../store/records';
import { getChatMessages, sendMessage } from '../../api/chat';
import { getStats } from '../../api/achievements';
import { wechatLogin } from '../../api/auth';
import MessageBubble from '../../components/MessageBubble';
import LoadingDots from '../../components/LoadingDots';
import Celebration from '../../components/Celebration';
import './index.scss';

function generateMessageId(): number {
  return Date.now() + Math.floor(Math.random() * 1000000);
}

export default function ChatPage() {
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<{ scrollTop?: number }>(null);
  const { messages, setMessages, addMessage, updateLastMessage, setLoading, isLoading } = useChatStore();
  const { isLoggedIn, setAuth } = useAuthStore();
  const { addWorkout, addMeasurement } = useRecordsStore();
  const [showCelebration, setShowCelebration] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      if (!loginFailed) {
        handleWechatLogin();
      }
    } else {
      loadMessages();
      checkFirstWorkout();
    }
  }, [isLoggedIn, loginFailed]);

  const handleWechatLogin = async () => {
    try {
      const loginRes = await wx.login();
      const result = await wechatLogin(loginRes.code);
      setAuth(result.token, result.user);
      setLoginFailed(false);
      loadMessages();
    } catch (err) {
      console.error('Login failed:', err);
      setLoginFailed(true);
      wx.showToast({ title: '登录失败，点击重试', icon: 'none' });
    }
  };

  const loadMessages = async () => {
    try {
      setLoading(true);
      const msgs = await getChatMessages();
      setMessages(msgs);
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkFirstWorkout = async () => {
    try {
      const stats = await getStats();
      if (stats.totalWorkouts === 1) {
        setShowCelebration(true);
      }
    } catch (err) {
      console.error('Failed to check stats:', err);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const tempId = generateMessageId();
    const userMessage = {
      id: tempId,
      role: 'user' as const,
      content: inputValue,
      createdAt: new Date().toISOString()
    };

    addMessage(userMessage);
    setInputValue('');
    setLoading(true);

    try {
      // Add placeholder for AI response
      const placeholderId = generateMessageId();
      addMessage({
        id: placeholderId,
        role: 'assistant',
        content: '正在思考...',
        createdAt: new Date().toISOString()
      });

      const result = await sendMessage(inputValue);
      const finalMessage = result.message;

      // Update the "thinking" message with actual response
      updateLastMessage(finalMessage);

      // If saved data came back, add to records
      if (finalMessage.savedData) {
        if (finalMessage.savedData.type === 'workout' && finalMessage.savedData.workout) {
          addWorkout(finalMessage.savedData.workout);
        } else if (finalMessage.savedData.type === 'measurement' && finalMessage.savedData.measurement) {
          addMeasurement(finalMessage.savedData.measurement);
        }
      }
    } catch (err) {
      updateLastMessage({
        id: generateMessageId(),
        role: 'assistant',
        content: '抱歉，服务出错了，请稍后重试。',
        createdAt: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRetryLogin = () => {
    setLoginFailed(false);
    handleWechatLogin();
  };

  const handleUndo = async (messageId: number) => {
    wx.showModal({
      title: '确认撤销',
      content: '确定要撤销这次保存吗？',
      success: async (res) => {
        if (res.confirm) {
          // TODO: Call delete API
          console.log('Undo for message:', messageId);
        }
      }
    });
  };

  if (loginFailed) {
    return (
      <View className="chat-page login-failed">
        <View className="login-error">
          <Text className="error-icon">⚠️</Text>
          <Text className="error-text">登录失败</Text>
          <Button className="retry-btn" onClick={handleRetryLogin}>
            点击重试
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View className="chat-page">
      <ScrollView
        className="messages"
        scrollWithAnimation
        scrollTop={999999}
        ref={scrollRef}
      >
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            onUndo={msg.savedData ? () => handleUndo(msg.id) : undefined}
          />
        ))}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <View className="loading-wrapper">
            <LoadingDots />
          </View>
        )}
      </ScrollView>

      <View className="input-area">
        <Input
          className="input"
          type="text"
          placeholder="描述你的训练或围度..."
          placeholderClass="input-placeholder"
          value={inputValue}
          onInput={(e: { detail: { value: string } }) => setInputValue(e.detail.value)}
          onConfirm={handleSend}
        />
        <Button className="send-btn" onClick={handleSend} disabled={isLoading}>
          发送
        </Button>
      </View>

      <Celebration show={showCelebration} />
    </View>
  );
}