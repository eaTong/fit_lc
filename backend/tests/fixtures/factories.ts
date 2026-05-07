// backend/tests/fixtures/factories.ts
// @ts-ignore
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

// 懒加载 Prisma Client，确保环境变量已设置
let _prisma: PrismaClient | null = null;

function getPrisma(): PrismaClient {
  if (!_prisma) {
    // 加载 .env.test 配置
    const envTestPath = path.join(__dirname, '../.env.test');
    if (fs.existsSync(envTestPath)) {
      const envContent = fs.readFileSync(envTestPath, 'utf-8');
      envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0 && !line.startsWith('#')) {
          process.env[key.trim()] = valueParts.join('=').trim();
        }
      });
    }

    // 设置默认值
    if (!process.env.DATABASE_URL) {
      process.env.DATABASE_URL = 'mysql://eaTong:eaTong%40123@localhost:3306/fitlc_test';
    }
    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = 'test';
    }

    _prisma = new PrismaClient();
  }
  return _prisma;
}

const prisma = getPrisma();

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
