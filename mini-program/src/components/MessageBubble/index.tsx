import { View, Text, RichText } from '@tarojs/components';
import { memo } from 'react';
import type { ChatMessage } from '../../api/chat';
import './index.scss';

interface MessageBubbleProps {
  message: ChatMessage;
  onUndo?: () => void;
}

function MessageBubble({ message, onUndo }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <View className={`message-bubble ${isUser ? 'user' : 'assistant'}`}>
      <View className="bubble">
        {!isUser && (
          <RichText nodes={message.content} className="content" />
        )}
        {isUser && <Text className="content">{message.content}</Text>}
        {message.savedData && !isUser && (
          <View className="saved-indicator">
            <Text className="saved-text">已保存</Text>
            {onUndo && (
              <Text className="undo-btn" onClick={onUndo}>撤销</Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

export default memo(MessageBubble);