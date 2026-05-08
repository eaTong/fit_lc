// backend/tests/fixtures/factories.ts
// @ts-ignore
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

// 获取测试 fixtures 目录路径 (使用 process.cwd() + 相对路径)
const FIXTURES_DIR = path.join(process.cwd(), 'tests/fixtures');

// 懒加载 Prisma Client - 直到第一次使用时才初始化
let _prisma: PrismaClient | null = null;

function loadTestEnv() {
  const envTestPath = path.join(FIXTURES_DIR, '../.env.test');
  if (fs.existsSync(envTestPath)) {
    const envContent = fs.readFileSync(envTestPath, 'utf-8');
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0 && !line.startsWith('#')) {
        // 只覆盖未设置的变量
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = valueParts.join('=').trim();
        }
      }
    });
  }

  // 设置默认值（如果未设置）
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = 'mysql://eaTong:eaTong%40123@localhost:3306/fitlc_test';
  }
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'test';
  }
}

function getPrisma(): PrismaClient {
  if (!_prisma) {
    // 加载测试环境配置
    loadTestEnv();
    _prisma = new PrismaClient();
  }
  return _prisma;
}

// 导出 getter 函数，确保 lazy initialization
export const prisma = {
  get client() {
    return getPrisma();
  }
};

// Factory 函数使用 getter
export const createTestUser = async (overrides = {}) => {
  const email = `test-${Date.now()}@example.com`;
  const passwordHash = await bcrypt.hash('password123', 4);
  return getPrisma().user.create({
    data: {
      email,
      passwordHash,
      nickname: 'Test User',
      ...overrides
    }
  });
};

export const createTestWorkout = async (userId: number, overrides = {}) => {
  return getPrisma().workout.create({
    data: {
      userId,
      date: new Date(),
      ...overrides
    }
  });
};

export const createTestExercise = async (overrides = {}) => {
  return getPrisma().exercise.create({
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
  return getPrisma().bodyMeasurement.create({
    data: {
      userId,
      date: new Date(),
      ...overrides
    }
  });
};

export const cleanDatabase = async () => {
  const p = getPrisma();

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
      await p.$executeRawUnsafe(`DELETE FROM \`${snakeName}\``);
    } catch (e) {
      // 表可能不存在或为视图，跳过
    }
  }
};
