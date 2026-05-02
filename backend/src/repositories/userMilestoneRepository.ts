import prisma from '../config/prisma';
import { Decimal } from '@prisma/client/runtime/client';

export const userMilestoneRepository = {
  async upsertWithProgress(userId: number, milestoneId: number, progress: number) {
    return prisma.userMilestone.upsert({
      where: {
        userId_milestoneId: { userId, milestoneId }
      },
      create: {
        userId,
        milestoneId,
        progress: new Decimal(progress.toString()),
      },
      update: {
        progress: new Decimal(progress.toString()),
      },
    });
  },

  async findByUserId(userId: number) {
    return prisma.userMilestone.findMany({
      where: { userId },
      include: { milestone: true },
      orderBy: { milestone: { tier: 'asc' } },
    });
  },

  async findById(id: number) {
    return prisma.userMilestone.findUnique({
      where: { id },
      include: { milestone: true },
    });
  },

  async markAchieved(id: number) {
    return prisma.userMilestone.update({
      where: { id },
      data: { achievedAt: new Date() },
    });
  },

  async markNotified(id: number) {
    return prisma.userMilestone.update({
      where: { id },
      data: { notifyShown: true },
    });
  },

  async getAchievedMilestones(userId: number) {
    return prisma.userMilestone.findMany({
      where: {
        userId,
        achievedAt: { not: null },
      },
      include: { milestone: true },
      orderBy: { achievedAt: 'desc' },
    });
  },

  async getUnnotifiedMilestones(userId: number) {
    return prisma.userMilestone.findMany({
      where: {
        userId,
        achievedAt: { not: null },
        notifyShown: false,
      },
      include: { milestone: true },
    });
  },

  async delete(id: number) {
    return prisma.userMilestone.delete({
      where: { id },
    });
  },
};
