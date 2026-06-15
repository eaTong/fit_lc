/**
 * Prisma Test Kit
 * 用 sqlite 内存库跑真实 Prisma 业务逻辑
 */

import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

let testPrisma: PrismaClient | null = null;

/**
 * 创建测试数据库
 */
export async function setupTestDb(): Promise<PrismaClient> {
  if (testPrisma) return testPrisma;

  const dbPath = path.join(__dirname, `../../.test-${process.pid}.db`);

  // 清理旧数据库
  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
  }

  process.env.DATABASE_URL = `file:${dbPath}`;

  // 用 schema 跑 db push
  execSync('npx prisma db push --schema=prisma/schema.prisma --skip-generate', {
    cwd: path.join(__dirname, '../..'),
    stdio: 'pipe',
    env: { ...process.env },
  });

  testPrisma = new PrismaClient({
    datasources: {
      db: {
        url: `file:${dbPath}`,
      },
    },
  });

  return testPrisma;
}

/**
 * 清理测试数据库
 */
export async function cleanupTestDb(): Promise<void> {
  if (testPrisma) {
    await testPrisma.$disconnect();
    testPrisma = null;
  }
}

/**
 * 创建测试用户
 */
export async function createTestUser(prisma: PrismaClient, overrides = {}) {
  return prisma.user.create({
    data: {
      username: `test-${Date.now()}`,
      email: `test-${Date.now()}@test.com`,
      password: '$2a$10$testhash',
      ...overrides,
    },
  });
}
