import prisma from '../lib/prisma';

export const chatMessageRepository = {
  async create(userId: number, role: string, content: string, savedData: any = null) {
    return prisma.chatMessage.create({
      data: {
        userId,
        role,
        content,
        savedData: savedData ? JSON.parse(JSON.stringify(savedData)) : null
      }
    });
  },

  async getRecentMessages(userId: number, limit: number = 20) {
    const messages = await prisma.chatMessage.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit
    });
    return messages.reverse();
  }
};