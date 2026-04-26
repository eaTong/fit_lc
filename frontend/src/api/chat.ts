import client from './client';
import type { ChatMessage, SavedData } from '../types';

export const chatApi = {
  async sendMessage(message: string, historyMessages: ChatMessage[] = []): Promise<{ reply: string; savedData?: SavedData }> {
    const { data } = await client.post<{ reply: string; savedData?: SavedData }>('/chat/message', { message, historyMessages });
    return data;
  },
};