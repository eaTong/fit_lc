import { create } from 'zustand';
import type { ChatMessage } from '../api/chat';

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  updateLastMessage: (message: ChatMessage) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,

  setMessages: (messages) => set({ messages }),

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  updateLastMessage: (message) =>
    set((state) => ({
      messages: state.messages.map((m, i) =>
        i === state.messages.length - 1 ? message : m
      )
    })),

  setLoading: (isLoading) => set({ isLoading }),

  clearMessages: () => set({ messages: [] })
}));