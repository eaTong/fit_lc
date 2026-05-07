// backend/tests/fixtures/factories.ts
// @ts-ignore
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

// 使用默认 Prisma Client（从环境变量读取 DATABASE_URL）
const prisma = new PrismaClient();

export const createTestUser = async (overrides = {}) => {
  const email = `test-${Date.now()}@example.com`;
  const passwordHash = await bcrypt.hash('password123', 4);
  return prisma.user.create({
    data: {
      email,
      passwordHash,
      nickname: 'Test User',
      ...overrides
    }
  });
};

export const createTestWorkout = async (userId: number, overrides = {}) => {
  return prisma.workout.create({
    data: {
      userId,
      date: new Date(),
      ...overrides
    }
  });
};

export const createTestExercise = async (overrides = {}) => {
  return prisma.exercise.create({
    data: {
      name: 'Test Exercise',
      category: 'chest',
      equipment: 'barbell',
      difficulty: 'beginner',
      ...overrides
    }
  });
};

export const createTestMeasurement = async (userId: number, overrides = {}) => {
  return prisma.bodyMeasurement.create({
    data: {
      userId,
      date: new Date(),
      ...overrides
    }
  });
};

export const cleanDatabase = async () => {
  // 清理顺序：先清理有外键关联的表
  const tables = [
    'planExecution',
    'planExercise',
    'workoutPlan',
    'measurementItem',
    'bodyMeasurement',
    'workoutExercise',
    'workout',
    'chatMessage',
    'albumPhoto',
    'userBadge',
    'userMilestone',
    'triggerEvent',
    'trendPrediction',
    'aggregatedStats',
    'personalRecord',
    'bodyMetric',
    'coachConfig',
    'userContext',
    'userProfile',
    'userRole',
    'user',
    'role',
    'badge',
    'milestone',
    'exerciseMuscle',
    'exerciseVariant',
    'exercise',
    'muscle'
  ];

  for (const table of tables) {
    try {
      // 将 CamelCase 转换为 snake_case
      const snakeName = table.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');
      await prisma.$executeRawUnsafe(`DELETE FROM \`${snakeName}\``);
    } catch (e) {
      // 表可能不存在或为视图，跳过
    }
  }
};

export { prisma };
