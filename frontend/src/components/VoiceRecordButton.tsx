import { useVoiceRecord, VoiceRecordStatus } from '../hooks/useVoiceRecord';

interface VoiceRecordButtonProps {
  onSuccess?: () => void;
  onPartial?: (text: string) => void;
}

const statusConfig: Record<VoiceRecordStatus, { text: string; icon: string; classes: string }> = {
  idle: { text: '按住说话', icon: '🎤', classes: 'bg-primary-tertiary hover:bg-border' },
  recording: { text: '松开结束', icon: '🔴', classes: 'bg-red-500 animate-pulse' },
  processing: { text: '解析中...', icon: '⏳', classes: 'bg-primary-tertiary cursor-wait' },
  success: { text: '保存成功', icon: '✅', classes: 'bg-green-600' },
  partial: { text: '待补充', icon: '⚠️', classes: 'bg-yellow-600' },
  failed: { text: '重试', icon: '❌', classes: 'bg-red-600 hover:bg-red-700' },
};

export default function VoiceRecordButton({ onSuccess, onPartial }: VoiceRecordButtonProps) {
  const { status, transcribedText, startRecording, stopRecording, reset } = useVoiceRecord();

  const handleMouseDown = () => {
    if (status === 'idle' || status === 'failed') {
      startRecording();
    }
  };

  const handleMouseUp = () => {
    if (status === 'recording') {
      stopRecording();
    }
  };

  const handleClick = () => {
    if (status === 'failed') {
      reset();
    } else if (status === 'success') {
      onSuccess?.();
      reset();
    } else if (status === 'partial') {
      onPartial?.(transcribedText);
      reset();
    }
  };

  const config = statusConfig[status];
  const isProcessing = status === 'recording' || status === 'processing';

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => status === 'recording' && handleMouseUp()}
        onClick={handleClick}
        disabled={isProcessing}
        className={`
          px-4 py-3 rounded-lg font-heading font-semibold uppercase tracking-wide
          transition-all duration-150 flex items-center gap-2
          ${config.classes}
          ${isProcessing ? 'cursor-wait opacity-75' : ''}
          min-w-[120px] justify-center
        `}
      >
        <span>{config.icon}</span>
        <span>{config.text}</span>
      </button>

      {status === 'recording' && (
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
          <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:0.1s]" />
          <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]" />
        </div>
      )}
    </div>
  );
}
