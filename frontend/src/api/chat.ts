import client from './client';
import type { ChatMessage, SavedData } from '../types';

function parseSavedData(reply: string): { parsed: string; savedData?: SavedData } {
  const match = reply.match(/^__SAVED_TYPE__:(.+?)__:MESSAGE__(.+)$/s);
  if (!match) return { parsed: reply };

  const [, header, message] = match;
  const parts = header.split(':');
  const type = parts[0] as SavedData['type'];

  if (['workout', 'measurement', 'plan', 'adjustment'].includes(type)) {
    const id = parseInt(parts[1]);
    return { parsed: message, savedData: { type, id } };
  }

  if (type === 'query') {
    const queryType = parts[1];
    const meta = { type: 'query' as const, queryType: queryType as 'workout' | 'measurement', summary: {} };
    try {
      const metaObj = JSON.parse(parts.slice(2).join(':'));
      meta.summary = metaObj.summary || {};
    } catch {}
    return { parsed: message, savedData: { type: 'query', meta } };
  }

  if (type === 'analysis') {
    let meta = { type: 'analysis' as const, completionRate: 0, completed: 0, skipped: 0, pending: 0, suggestions: [] as string[] };
    try {
      meta = { ...meta, ...JSON.parse(parts.slice(1).join(':')) };
    } catch {}
    return { parsed: message, savedData: { type: 'analysis', meta } };
  }

  return { parsed: message };
}

export const chatApi = {
  async sendMessage(message: string, historyMessages: ChatMessage[] = []): Promise<{ reply: string; savedData?: SavedData }> {
    const { data } = await client.post<{ reply: string; savedData?: SavedData }>('/chat/message', { message, historyMessages });
    const { parsed, savedData } = parseSavedData(data.reply);
    return { reply: parsed, savedData };
  },

  async getRecentMessages(limit = 20): Promise<{ messages: ChatMessage[] }> {
    const { data } = await client.get<{ messages: any[] }>('/chat/messages', { params: { limit } });
    // Convert API messages to ChatMessage format
    const messages: ChatMessage[] = data.messages.map((m: any) => ({
      id: m.id?.toString() || crypto.randomUUID(),
      role: m.role,
      content: m.content,
      timestamp: new Date(m.timestamp),
      savedData: m.savedData,
      isFromCoach: m.isFromCoach,
      coachMessageType: m.coachMessageType,
    }));
    return { messages };
  },
};