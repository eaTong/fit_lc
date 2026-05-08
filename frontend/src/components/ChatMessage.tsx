import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ChatMessage as ChatMessageType } from '../types';
import PlanCard from './chat/PlanCard';
import QueryResultCard from './chat/QueryResultCard';
import AnalysisCard from './chat/AnalysisCard';
import PlanAdjustCard from './chat/PlanAdjustCard';

interface ChatMessageProps {
  message: ChatMessageType;
  onUndo?: () => void;
  isRevoked?: boolean;
}

function canUndo(type?: string): boolean {
  return type === 'workout' || type === 'measurement' || type === 'plan';
}

export default function ChatMessage({ message, onUndo, isRevoked = false }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isCoach = message.isFromCoach && message.role === 'assistant';
  const [showUndo, setShowUndo] = useState(false);
  const isSaved = message.savedData || message.content.includes('已保存') || message.content.includes('已记录') || message.content.includes('✅');

  const renderCard = () => {
    if (!message.savedData) return null;
    const { type, id, meta, needsMoreInfo } = message.savedData;

    // 如果需要补充信息，显示提示卡片
    if (needsMoreInfo) {
      return (
        <div className="mt-2 p-3 bg-accent-orange/10 border border-accent-orange/30 rounded-lg">
          <div className="flex items-center gap-2 text-accent-orange text-sm">
            <span>💡</span>
            <span>需要补充信息</span>
          </div>
          {message.savedData.missingFields && message.savedData.missingFields.length > 0 && (
            <p className="text-text-secondary text-sm mt-1">
              请补充：{message.savedData.missingFields.map(f => f.label).join('或')}
            </p>
          )}
        </div>
      );
    }

    if (type === 'plan') {
      return <PlanCard planId={id!} planName={(meta as any)?.name} />;
    }
    if (type === 'query' && meta) {
      return <QueryResultCard queryType={(meta as any).queryType} summary={(meta as any).summary} />;
    }
    if (type === 'analysis' && meta) {
      return <AnalysisCard {...(meta as any)} />;
    }
    if (type === 'adjustment') {
      return <PlanAdjustCard planId={id!} adjustment={(meta as any)?.description || ''} />;
    }
    return null;
  };

  const showCard = message.savedData && ['plan', 'query', 'analysis', 'adjustment'].includes(message.savedData.type);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        data-testid={`message-${message.role}`}
        className={`max-w-[70%] px-4 py-3 relative group ${
          isUser
            ? `bg-primary-tertiary text-text-primary border-2 border-border ${isRevoked ? 'opacity-50' : ''}`
            : isCoach
              ? 'bg-gradient-to-r from-accent-orange/10 to-accent-red/10 border-2 border-accent-orange/50 rounded-lg'
              : 'bg-transparent text-text-primary'
        }`}
        onMouseEnter={() => isUser && isSaved && !isRevoked && setShowUndo(true)}
        onMouseLeave={() => setShowUndo(false)}
      >
        {isCoach && (
          <div className="text-xs text-accent-orange mb-1 flex items-center gap-1">
            <span>小Fit</span>
            {message.coachMessageType === 'achievement' && <span>🏆</span>}
            {message.coachMessageType === 'reminder' && <span>⏰</span>}
            {message.coachMessageType === 'encouragement' && <span>💪</span>}
          </div>
        )}

        {/* User images */}
        {isUser && message.imageUrls && message.imageUrls.length > 0 && (
          <div className="flex gap-2 mb-2 flex-wrap">
            {message.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Uploaded ${index + 1}`}
                className="max-w-[200px] max-h-[200px] object-cover rounded border border-border"
              />
            ))}
          </div>
        )}

        <p className={`whitespace-pre-wrap ${isRevoked ? 'text-slate-400 line-through' : ''}`}>
          {isUser ? (
            message.content
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: ({ children, className }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code className="bg-primary-tertiary px-1 py-0.5 rounded text-accent-orange">{children}</code>
                  ) : (
                    <code className={`bg-primary-tertiary px-2 py-1 rounded block ${className}`}>{children}</code>
                  );
                },
                pre: ({ children }) => <pre className="bg-primary-tertiary p-2 rounded my-2 overflow-x-auto">{children}</pre>,
                a: ({ href, children }) => <a href={href} className="text-accent-orange underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                ul: ({ children }) => <ul className="list-disc list-inside my-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside my-1">{children}</ol>,
                li: ({ children }) => <li className="my-0.5">{children}</li>,
                strong: ({ children }) => <strong className="text-accent-orange font-semibold">{children}</strong>,
                h1: ({ children }) => <h1 className="text-xl font-bold my-2">{children}</h1>,
                h2: ({ children }) => <h2 className="text-lg font-bold my-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-base font-semibold my-1">{children}</h3>,
                p: ({ children }) => <p className="my-1">{children}</p>,
                blockquote: ({ children }) => <blockquote className="border-l-4 border-accent-orange pl-4 my-2 italic">{children}</blockquote>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </p>

        {showCard && renderCard()}

        {isRevoked && (
          <span className="ml-2 px-2 py-0.5 text-xs bg-slate-600/50 text-slate-300 rounded">
            已撤销
          </span>
        )}

        {isUser && isSaved && showUndo && !isRevoked && onUndo && canUndo(message.savedData?.type) && (
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

        {!isUser && isSaved && onUndo && !isRevoked && canUndo(message.savedData?.type) && !message.savedData?.needsMoreInfo && (
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
