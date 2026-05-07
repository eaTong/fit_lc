// backend/tests/fixtures/factories.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient({
  datasources: {
    db: { url: 'file:./test.db?mode=memory' }
  }
});

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
  const tables = ['workoutExercise', 'workout', 'measurementItem', 'bodyMeasurement',
    'chatMessage', 'albumPhoto', 'userRole', 'user'];
  for (const table of tables) {
    try {
      await (prisma as any)[table.charAt(0).toLowerCase() + table.slice(1).replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '')].deleteMany({});
    } catch (e) {
      // table might not exist, skip
    }
  }
};

export { prisma };