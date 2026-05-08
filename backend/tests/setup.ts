// backend/tests/setup.ts
import * as fs from 'fs';
import * as path from 'path';

// 关键：立即设置环境变量在任何其他模块导入之前
const envTestPath = path.join(process.cwd(), 'backend/.env.test');
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
