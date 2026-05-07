// backend/tests/setup.ts
import * as fs from 'fs';
import * as path from 'path';

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

// 设置测试环境变量（默认值）
process.env.DATABASE_URL = process.env.DATABASE_URL || 'mysql://eaTong:eaTong%40123@localhost:3306/fitlc_test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-jwt-secret-for-testing';
process.env.BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || '4';
process.env.NODE_ENV = 'test';

// 全局 beforeAll - 打印测试环境信息
beforeAll(async () => {
  console.log('\n========================================');
  console.log('Test Environment:');
  console.log('  NODE_ENV:', process.env.NODE_ENV);
  console.log('  DATABASE_URL:', process.env.DATABASE_URL?.replace(/\/\/.*@/, '//****@'));
  console.log('========================================\n');
}, 60000);

// 全局 jest 配置
export default {};
