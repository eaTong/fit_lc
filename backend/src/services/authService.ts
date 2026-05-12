import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';
import { userRepository } from '../repositories/userRepository';
import { roleRepository } from '../repositories/roleRepository';

// Bcrypt salt rounds, configurable via environment (default 10 for security/performance balance)
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

// JWT_SECRET must be set in environment - no fallback for security
let _JWT_SECRET: string | null = null;
function getJwtSecret(): string {
  if (!_JWT_SECRET) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET environment variable is required');
    }
    _JWT_SECRET = secret;
  }
  return _JWT_SECRET;
}

// User role relation type
interface UserRole {
  role: { name: string };
}

export const authService = {
  async register(email, password) {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw new Error('邮箱已被注册');
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Use transaction to ensure atomicity: create user + assign role
    const result = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: { email, passwordHash }
      });

      const normalRole = await tx.role.findUnique({
        where: { name: 'normal' }
      });

      if (!normalRole) {
        throw new Error('系统错误：未找到 normal 角色，请先初始化数据库');
      }

      await tx.userRole.create({
        data: { userId: newUser.id, roleId: normalRole.id }
      });

      return newUser;
    });

    const user = result;
    const token = this.generateToken(user.id, user.email, ['normal']);

    return { token, user: { id: user.id, email: user.email } };
  },

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('无效的凭据');
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new Error('无效的凭据');
    }

    const roles = user.roles?.map((ur: UserRole) => ur.role.name) || [];
    const token = jwt.sign(
      { userId: user.id, email: user.email, roles },
      getJwtSecret(),
      { expiresIn: '7d' }
    );
    return { token, user: { id: user.id, email: user.email } };
  },

  async getCurrentUser(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('用户不存在');
    }
    return user;
  },

  generateToken(userId: number, email: string, roles: string[] = []) {
    return jwt.sign(
      { userId, email, roles },
      getJwtSecret(),
      { expiresIn: '7d' }
    );
  }
};