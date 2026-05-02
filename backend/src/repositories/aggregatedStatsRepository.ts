import prisma from '../config/prisma';
import { Decimal } from '@prisma/client/runtime/client';

export const aggregatedStatsRepository = {
  async upsert(userId: number, statType: string, period: string, value: number) {
    return prisma.aggregatedStats.upsert({
      where: {
        userId_statType_period: { userId, statType, period }
      },
      create: {
        userId,
        statType,
        period,
        value: new Decimal(value.toString()),
      },
      update: {
        value: new Decimal(value.toString()),
      },
    });
  },

  async findByUserId(userId: number) {
    return prisma.aggregatedStats.findMany({
      where: { userId },
      orderBy: { statType: 'asc' },
    });
  },

  async findByStatType(userId: number, statType: string, period: string = 'all') {
    return prisma.aggregatedStats.findUnique({
      where: {
        userId_statType_period: { userId, statType, period }
      },
    });
  },

  async findById(id: number) {
    return prisma.aggregatedStats.findUnique({
      where: { id },
    });
  },

  async increment(userId: number, statType: string, period: string, incrementBy: number = 1) {
    const existing = await prisma.aggregatedStats.findUnique({
      where: {
        userId_statType_period: { userId, statType, period }
      },
    });

    if (existing) {
      return prisma.aggregatedStats.update({
        where: { id: existing.id },
        data: {
          value: new Decimal(Number(existing.value) + incrementBy),
        },
      });
    }

    return prisma.aggregatedStats.create({
      data: {
        userId,
        statType,
        period,
        value: new Decimal(incrementBy.toString()),
      },
    });
  },

  async delete(id: number) {
    return prisma.aggregatedStats.delete({
      where: { id },
    });
  },
};
