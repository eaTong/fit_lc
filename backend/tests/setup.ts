// backend/tests/setup.ts
import { jest } from '@jest/globals';

// 设置测试环境变量
process.env.DATABASE_URL = 'file:./test.db?mode=memory';
process.env.JWT_SECRET = 'test-jwt-secret-for-testing';
process.env.BCRYPT_SALT_ROUNDS = '4';
process.env.NODE_ENV = 'test';

// 全局 beforeAll/afterAll
export default {};