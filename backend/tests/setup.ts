// backend/tests/setup.ts
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// 加载测试环境配置
const envTestPath = path.join(__dirname, '../.env.test');
if (fs.existsSync(envTestPath)) {
  const envContent = fs.readFileSync(envTestPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
}

// 设置测试环境变量（默认值）
process.env.DATABASE_URL = process.env.DATABASE_URL || 'mysql://eaTong:eaTong%40123@localhost:3306/fitlc_test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-jwt-secret-for-testing';
process.env.BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || '4';
process.env.NODE_ENV = 'test';

// 测试数据库 Prisma Client
const testPrisma = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL }
  }
});

// 全局 beforeAll - 初始化测试数据库
beforeAll(async () => {
  console.log('Initializing test database...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL?.replace(/\/\/.*@/, '//****@'));

  try {
    // 确保测试数据库存在
    execSync('npx prisma db push --accept-data-loss --skip-generate', {
      cwd: path.join(__dirname, '../'),
      stdio: 'inherit',
      env: { ...process.env }
    });
    console.log('Test database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize test database:', error);
    throw error;
  }
});

// 全局 afterAll - 清理测试数据
afterAll(async () => {
  console.log('Cleaning up test database...');

  try {
    // 清理所有测试数据（但保留表结构）
    const tables = [
      'plan_executions',
      'plan_exercises',
      'workout_plans',
      'measurement_items',
      'body_measurements',
      'workout_exercises',
      'workouts',
      'chat_messages',
      'album_photos',
      'user_roles',
      'user_badges',
      'user_milestones',
      'trigger_events',
      'trend_predictions',
      'aggregated_stats',
      'personal_records',
      'body_metrics',
      'coach_configs',
      'user_contexts',
      'user_profiles',
      'users',
      'roles',
      'badges',
      'milestones',
      'exercise_muscles',
      'exercise_variants',
      'exercises',
      'muscles'
    ];

    for (const table of tables) {
      try {
        await testPrisma.$executeRawUnsafe(`DELETE FROM \`${table}\``);
      } catch (e) {
        // 表可能不存在，跳过
      }
    }

    // 重置自增ID
    for (const table of tables) {
      try {
        await testPrisma.$executeRawUnsafe(`ALTER TABLE \`${table}\` AUTO_INCREMENT = 1`);
      } catch (e) {
        // 表可能不存在，跳过
      }
    }

    console.log('Test database cleaned successfully');
  } catch (error) {
    console.error('Failed to clean test database:', error);
  } finally {
    await testPrisma.$disconnect();
  }
});

// 全局 jest 配置
export default {};
