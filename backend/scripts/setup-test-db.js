/**
 * FitLC 测试数据库设置脚本
 *
 * 使用方法:
 *   npm run test:setup
 *
 * 功能:
 * 1. 创建测试数据库（如果不存在）
 * 2. 推送 Prisma Schema 到测试数据库
 */

import { execSync } from 'child_process';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 加载主 .env 配置（获取主数据库连接信息）
dotenv.config({ path: path.join(__dirname, '../.env') });

const TEST_DB_NAME = 'fitlc_test';
// 从主数据库 URL 提取连接信息，替换数据库名为测试数据库
const MAIN_DB_URL = process.env.DATABASE_URL || 'mysql://eaTong:eaTong%40123@localhost:3306/fitlc';

async function setupTestDatabase() {
  console.log('🔧 Setting up test database...\n');

  try {
    // 1. 解析主数据库 URL 获取连接信息（密码需要 URL 解码）
    const mainUrlMatch = MAIN_DB_URL.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(\w+)/);
    if (!mainUrlMatch) {
      throw new Error(`Invalid DATABASE_URL format: ${MAIN_DB_URL}`);
    }

    // 密码是 URL 编码的，需要解码
    const [, user, encodedPassword, host, port, dbName] = mainUrlMatch;
    const password = decodeURIComponent(encodedPassword);
    console.log(`Main database: ${dbName}`);

    // 2. 连接到 MySQL 服务器
    console.log(`Connecting to MySQL at ${host}:${port}...`);
    const connection = await mysql.createConnection({
      host,
      port: parseInt(port),
      user,
      password
    });

    // 3. 创建测试数据库（如果不存在）
    console.log(`Creating database "${TEST_DB_NAME}" if not exists...`);
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${TEST_DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`✅ Database "${TEST_DB_NAME}" ready\n`);

    await connection.end();

    // 4. 推送 Prisma Schema 到测试数据库
    const testDbUrl = MAIN_DB_URL.replace(new RegExp(`\/${dbName}$`), `/${TEST_DB_NAME}`);
    console.log('Pushing Prisma schema to test database...');
    execSync('npx prisma db push --accept-data-loss --skip-generate', {
      cwd: path.join(__dirname, '../'),
      stdio: 'inherit',
      env: {
        ...process.env,
        DATABASE_URL: testDbUrl
      }
    });

    console.log('\n✅ Test database setup complete!');
    console.log(`   Database: ${TEST_DB_NAME}`);
    console.log(`   Run tests: npm test`);

  } catch (error) {
    console.error('\n❌ Test database setup failed:', error.message);
    process.exit(1);
  }
}

setupTestDatabase();
