import prisma from '../lib/prisma';
import { Decimal } from '@prisma/client/runtime/client';

export const personalRecordRepository = {
  async upsert(userId: number, exerciseName: string, recordType: string, value: number, workoutId?: number) {
    const data = {
      userId,
      exerciseName,
      recordType,
      bestValue: new Decimal(value.toString()),
      achievedAt: new Date(),
      workoutId: workoutId ?? null,
    };

    return prisma.personalRecord.upsert({
      where: {
        userId_exerciseName_recordType: { userId, exerciseName, recordType }
      },
      create: data,
      update: {
        bestValue: new Decimal(value.toString()),
        achievedAt: new Date(),
        workoutId: workoutId ?? null,
      },
    });
  },

  async findByUserId(userId: number) {
    return prisma.personalRecord.findMany({
      where: { userId },
      orderBy: { achievedAt: 'desc' },
    });
  },

  async findByUserAndExercise(userId: number, exerciseName: string) {
    return prisma.personalRecord.findMany({
      where: { userId, exerciseName },
      orderBy: { recordType: 'asc' },
    });
  },

  async findById(id: number) {
    return prisma.personalRecord.findUnique({
      where: { id },
    });
  },

  async getTopPRs(userId: number, limit: number = 10) {
    return prisma.personalRecord.findMany({
      where: { userId },
      orderBy: { achievedAt: 'desc' },
      take: limit,
    });
  },

  async delete(id: number) {
    return prisma.personalRecord.delete({
      where: { id },
    });
  },

  async findByRecordType(userId: number, recordType: string) {
    return prisma.personalRecord.findMany({
      where: { userId, recordType },
      orderBy: { bestValue: 'desc' },
    });
  },
};
