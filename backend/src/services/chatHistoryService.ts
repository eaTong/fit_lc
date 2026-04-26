import { chatMessageRepository } from '../repositories/chatMessageRepository';

export const chatHistoryService = {
  async saveMessage(userId, role, content, savedData = null) {
    return chatMessageRepository.create(userId, role, content, savedData);
  },

  async getMessages(userId, limit = 20) {
    return chatMessageRepository.getRecentMessages(userId, limit);
  }
};