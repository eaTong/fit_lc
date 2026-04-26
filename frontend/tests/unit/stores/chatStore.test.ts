import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useChatStore, getRecentHistory } from '../../../src/stores/chatStore';
import type { ChatMessage } from '../../../src/types';

// Mock chatApi
vi.mock('../../../src/api/chat', () => ({
  chatApi: {
    sendMessage: vi.fn(),
  },
}));

import { chatApi } from '../../../src/api/chat';

describe('useChatStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset store state
    useChatStore.setState({
      messages: [],
      isLoading: false,
      revokedMessageIds: new Set(),
      lastUserMessageContent: null,
    });
  });

  describe('initial state', () => {
    it('should have empty messages array initially', () => {
      const state = useChatStore.getState();
      expect(state.messages).toEqual([]);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('sendMessage', () => {
    it('should add user message to messages array', async () => {
      vi.mocked(chatApi.sendMessage).mockResolvedValue({
        reply: '训练已记录',
        savedData: { type: 'workout', data: {} },
      });

      await useChatStore.getState().sendMessage('今天跑了5公里');

      const state = useChatStore.getState();
      const userMessage = state.messages.find((m) => m.role === 'user');
      expect(userMessage?.content).toBe('今天跑了5公里');
    });

    it('should add assistant message after API response', async () => {
      vi.mocked(chatApi.sendMessage).mockResolvedValue({
        reply: '训练已记录，深蹲100kg 5组',
        savedData: { type: 'workout', data: {} },
      });

      await useChatStore.getState().sendMessage('深蹲100kg 5组每组8个');

      const state = useChatStore.getState();
      const assistantMessage = state.messages.find((m) => m.role === 'assistant');
      expect(assistantMessage?.content).toBe('训练已记录，深蹲100kg 5组');
      expect(assistantMessage?.savedData).toBeDefined();
    });

    it('should set isLoading to true during API call', async () => {
      let resolvePromise: (value: { reply: string; savedData: null }) => void;
      vi.mocked(chatApi.sendMessage).mockImplementation(
        () => new Promise((resolve) => { resolvePromise = resolve; })
      );

      const sendPromise = useChatStore.getState().sendMessage('test');

      const state1 = useChatStore.getState();
      expect(state1.isLoading).toBe(true);

      // @ts-ignore
      resolvePromise({ reply: 'ok', savedData: null });
      await sendPromise;
    });

    it('should add error message on API failure', async () => {
      vi.mocked(chatApi.sendMessage).mockRejectedValue(new Error('Network error'));

      await useChatStore.getState().sendMessage('test message');

      const state = useChatStore.getState();
      const errorMessage = state.messages.find((m) => m.role === 'assistant');
      expect(errorMessage?.content).toBe('发送失败，请重试');
    });
  });

  describe('clearMessages', () => {
    it('should clear all messages', async () => {
      vi.mocked(chatApi.sendMessage).mockResolvedValue({
        reply: '已保存',
        savedData: { type: 'workout', data: {} },
      });

      await useChatStore.getState().sendMessage('test');

      useChatStore.getState().clearMessages();

      const state = useChatStore.getState();
      expect(state.messages).toEqual([]);
      expect(state.revokedMessageIds.size).toBe(0);
    });
  });

  describe('removeLastSavedData', () => {
    it('should remove last message with savedData', async () => {
      vi.mocked(chatApi.sendMessage).mockResolvedValue({
        reply: '已保存',
        savedData: { type: 'workout', id: 123 },
      });

      await useChatStore.getState().sendMessage('深蹲');

      const removed = useChatStore.getState().removeLastSavedData();

      expect(removed).toBeDefined();
      const state = useChatStore.getState();
      // Should have 1 message left (user message only, assistant with savedData was removed)
      expect(state.messages.length).toBe(1);
    });

    it('should return undefined if no savedData found', async () => {
      vi.mocked(chatApi.sendMessage).mockResolvedValue({
        reply: '请问有什么可以帮你的？',
        savedData: null,
      });

      await useChatStore.getState().sendMessage('你好');

      const removed = useChatStore.getState().removeLastSavedData();

      expect(removed).toBeUndefined();
    });
  });

  describe('markMessageAsRevoked', () => {
    it('should mark user message as revoked', async () => {
      vi.mocked(chatApi.sendMessage).mockResolvedValue({
        reply: '已保存',
        savedData: { type: 'workout', id: 123 },
      });

      await useChatStore.getState().sendMessage('深蹲');

      const state1 = useChatStore.getState();
      const userMessage = state1.messages.find((m) => m.role === 'user');

      useChatStore.getState().markMessageAsRevoked(userMessage!.id);

      const state2 = useChatStore.getState();
      expect(state2.revokedMessageIds.has(userMessage!.id)).toBe(true);
      expect(state2.lastUserMessageContent).toBe('深蹲');
    });
  });
});

describe('getRecentHistory', () => {
  it('should return last N rounds of conversation', () => {
    const messages: ChatMessage[] = [
      { id: '1', role: 'user', content: 'msg1', timestamp: new Date() },
      { id: '2', role: 'assistant', content: 'reply1', timestamp: new Date() },
      { id: '3', role: 'user', content: 'msg2', timestamp: new Date() },
      { id: '4', role: 'assistant', content: 'reply2', timestamp: new Date() },
      { id: '5', role: 'user', content: 'msg3', timestamp: new Date() },
      { id: '6', role: 'assistant', content: 'reply3', timestamp: new Date() },
    ];

    const recent = getRecentHistory(messages, 1);

    expect(recent.length).toBe(2);
    expect(recent[0].id).toBe('5');
    expect(recent[1].id).toBe('6');
  });

  it('should return empty array for empty messages', () => {
    const recent = getRecentHistory([], 2);
    expect(recent).toEqual([]);
  });
});