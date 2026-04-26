import { useState } from 'react';
import type { ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
  onUndo?: () => void;
  isRevoked?: boolean;
}

export default function ChatMessage({ message, onUndo, isRevoked = false }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [showUndo, setShowUndo] = useState(false);
  // 检查 savedData 或者内容中是否包含保存成功的标记
  const isSaved = message.savedData || message.content.includes('已保存') || message.content.includes('已记录') || message.content.includes('✅');

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] px-4 py-3 relative group ${
          isUser
            ? `bg-primary-tertiary text-text-primary border-2 border-border ${isRevoked ? 'opacity-50' : ''}`
            : 'bg-transparent text-text-primary'
        }`}
        onMouseEnter={() => isUser && isSaved && !isRevoked && setShowUndo(true)}
        onMouseLeave={() => setShowUndo(false)}
      >
        <p className={`whitespace-pre-wrap ${isRevoked ? 'text-slate-400 line-through' : ''}`}>
          {message.content}
        </p>

        {isRevoked && (
          <span className="ml-2 px-2 py-0.5 text-xs bg-slate-600/50 text-slate-300 rounded">
            已撤销
          </span>
        )}

        {/* 用户消息hover显示撤销图标 */}
        {isUser && isSaved && showUndo && !isRevoked && onUndo && (
          <button
            onClick={onUndo}
            className="absolute -left-10 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-accent-orange transition-colors"
            title="撤销"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
        )}

        {/* Assistant消息的撤销按钮保留 */}
        {!isUser && isSaved && onUndo && !isRevoked && (
          <button
            onClick={onUndo}
            className="mt-2 text-sm text-accent-orange hover:text-accent-red transition-colors"
          >
            撤销
          </button>
        )}

        {message.timestamp && (
          <p className={`text-xs mt-1 ${isRevoked ? 'text-slate-500' : 'text-text-muted'}`}>
            {new Date(message.timestamp).toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
}