import prisma from '../lib/prisma';

export const triggerEventRepository = {
  async hasTriggeredToday(userId: number, triggerType: string, triggerKey: string): Promise<boolean> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const event = await prisma.triggerEvent.findFirst({
      where: {
        userId,
        triggerType,
        triggerKey,
        triggeredAt: { gte: today },
      },
    });

    return !!event;
  },

  async record(userId: number, triggerType: string, triggerKey: string, payload?: any) {
    const exists = await this.hasTriggeredToday(userId, triggerType, triggerKey);
    if (exists) {
      return null;
    }

    return prisma.triggerEvent.create({
      data: {
        userId,
        triggerType,
        triggerKey,
        payload: payload ?? undefined,
        triggeredAt: new Date(),
      },
    });
  },

  async findByUserId(userId: number, limit: number = 100) {
    return prisma.triggerEvent.findMany({
      where: { userId },
      orderBy: { triggeredAt: 'desc' },
      take: limit,
    });
  },

  async findByTriggerType(userId: number, triggerType: string, limit: number = 50) {
    return prisma.triggerEvent.findMany({
      where: { userId, triggerType },
      orderBy: { triggeredAt: 'desc' },
      take: limit,
    });
  },

  async findById(id: number) {
    return prisma.triggerEvent.findUnique({
      where: { id },
    });
  },

  async findRecentByType(triggerType: string, days: number = 7) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    return prisma.triggerEvent.findMany({
      where: {
        triggerType,
        triggeredAt: { gte: since },
      },
      orderBy: { triggeredAt: 'desc' },
    });
  },

  async delete(id: number) {
    return prisma.triggerEvent.delete({
      where: { id },
    });
  },

  async deleteOld(daysToKeep: number = 30) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - daysToKeep);

    return prisma.triggerEvent.deleteMany({
      where: {
        triggeredAt: { lt: cutoff },
      },
    });
  },
};
