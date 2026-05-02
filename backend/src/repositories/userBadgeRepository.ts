import prisma from '../config/prisma';

export const userBadgeRepository = {
  async awardIfNotEarned(userId: number, badgeId: number) {
    const existing = await prisma.userBadge.findUnique({
      where: {
        userId_badgeId: { userId, badgeId }
      }
    });

    if (existing) {
      return null;
    }

    return prisma.userBadge.create({
      data: {
        userId,
        badgeId,
      },
    });
  },

  async findByUserId(userId: number) {
    return prisma.userBadge.findMany({
      where: { userId },
      include: {
        badge: true,
      },
      orderBy: { achievedAt: 'desc' },
    });
  },

  async findById(id: number) {
    return prisma.userBadge.findUnique({
      where: { id },
      include: { badge: true },
    });
  },

  async hasEarned(userId: number, badgeId: number) {
    const existing = await prisma.userBadge.findUnique({
      where: {
        userId_badgeId: { userId, badgeId }
      }
    });
    return !!existing;
  },

  async markNotified(id: number) {
    return prisma.userBadge.update({
      where: { id },
      data: { notifyShown: true },
    });
  },

  async getUnnotifiedBadges(userId: number) {
    return prisma.userBadge.findMany({
      where: {
        userId,
        notifyShown: false,
      },
      include: { badge: true },
    });
  },

  async delete(id: number) {
    return prisma.userBadge.delete({
      where: { id },
    });
  },
};
