import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/userRepository';
import { roleRepository } from '../repositories/roleRepository';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

// Bcrypt salt rounds, configurable via environment (default 10 for security/performance balance)
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

// User role relation type
interface UserRole {
  role: { name: string };
}

export const authService = {
  async register(email, password) {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw new Error('Email already registered');
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await userRepository.create(email, passwordHash);

    // 自动分配 normal 角色
    const normalRole = await roleRepository.findByName('normal');
    if (!normalRole) {
      throw new Error('System error: normal role not found. Please seed database.');
    }
    await roleRepository.createUserRole(user.id, normalRole.id);

    const token = this.generateToken(user.id, user.email, ['normal']);

    return { token, user: { id: user.id, email: user.email } };
  },

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new Error('Invalid credentials');
    }

    const roles = user.roles?.map((ur: UserRole) => ur.role.name) || [];
    const token = jwt.sign(
      { userId: user.id, email: user.email, roles },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    return { token, user: { id: user.id, email: user.email } };
  },

  async getCurrentUser(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },

  generateToken(userId: number, email: string, roles: string[] = []) {
    return jwt.sign(
      { userId, email, roles },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
  }
};