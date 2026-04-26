import { create } from 'zustand';
import { chatApi } from '../api/chat';
import type { ChatMessage, SavedData } from '../types';

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  revokedMessageIds: Set<string>;
  lastUserMessageContent: string | null;
  sendMessage: (content: string, historyMessages?: ChatMessage[]) => Promise<void>;
  clearMessages: () => void;
  removeLastSavedData: () => SavedData | undefined;
  markMessageAsRevoked: (messageId: string) => string | null;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isLoading: false,
  revokedMessageIds: new Set(),
  lastUserMessageContent: null,

  sendMessage: async (content, historyMessages = []) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    set((state) => ({
      messages: [...state.messages, userMessage],
      isLoading: true,
    }));

    try {
      const { reply, savedData } = await chatApi.sendMessage(content, historyMessages);
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
        savedData,
      };
      set((state) => ({ messages: [...state.messages, assistantMessage], isLoading: false }));
    } catch {
      set((state) => ({
        messages: [
          ...state.messages,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: '发送失败，请重试',
            timestamp: new Date(),
          },
        ],
        isLoading: false,
      }));
    }
  },

  clearMessages: () => set({ messages: [], revokedMessageIds: new Set() }),

  removeLastSavedData: () => {
    const { messages } = get();
    const lastWithSave = [...messages].reverse().find((m) => m.savedData);
    if (lastWithSave?.savedData) {
      set((state) => ({
        messages: state.messages.filter((m) => m.id !== lastWithSave.id),
      }));
      return lastWithSave.savedData;
    }
    return undefined;
  },

  markMessageAsRevoked: (messageId: string) => {
    const { messages } = get();
    const msg = messages.find((m) => m.id === messageId);
    const userMessage = msg?.role === 'user' ? msg : [...messages].reverse().find((m) => m.role === 'user' && m.savedData);

    if (userMessage) {
      set((state) => {
        const newRevoked = new Set(state.revokedMessageIds);
        newRevoked.add(userMessage.id);
        return {
          revokedMessageIds: newRevoked,
          lastUserMessageContent: userMessage.content
        };
      });
      return userMessage.content;
    }
    return null;
  },
}));

// Get last N rounds of conversation (2 messages per round)
export function getRecentHistory(messages: ChatMessage[], rounds: number): ChatMessage[] {
  return messages.slice(-rounds * 2);
}