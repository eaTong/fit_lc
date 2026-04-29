import { request } from './request';

export interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  savedData?: {
    type: 'workout' | 'measurement';
    workout?: any;
    measurement?: any;
  };
  createdAt: string;
}

export async function getChatMessages() {
  return request<ChatMessage[]>({
    url: '/chat/messages'
  });
}

export interface SendMessageResponse {
  message: ChatMessage;
}

export async function sendMessage(content: string): Promise<SendMessageResponse> {
  return request<SendMessageResponse>({
    url: '/chat/message',
    method: 'POST',
    data: { content }
  });
}