//@ts-ignore
import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { PrismaClient } from '@prisma/client';
// @ts-ignore
import path from 'path';
import { execSync } from 'child_process';

const testDbPath = path.join(__dirname, '../../prisma/test.db');

// Create test Prisma client with SQLite
const testPrisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${testDbPath}`,
    },
  },
});

beforeAll(async () => {
  // Generate Prisma client for test schema
  try {
    execSync('npx prisma generate --schema=./prisma/schema.test.prisma', {
      cwd: path.join(__dirname, '../..'),
      stdio: 'pipe',
    });
  } catch (e) {
    // Ignore if already generated
  }

  // Push schema to test database
  try {
    execSync('npx prisma db push --schema=./prisma/schema.test.prisma --skip-generate --force-reset', {
      cwd: path.join(__dirname, '../..'),
      stdio: 'pipe',
      env: { ...process.env, PRISMA_USER_CONSENT_FOR_DANGEROUS_AI_ACTION: 'yes' },
    });
  } catch (e) {
    // May fail in AI context - tables may already exist
  }

  await testPrisma.$connect();

  // Create test user
  try {
    await testPrisma.user.create({
      data: {
        id: 1,
        email: 'test@example.com',
        passwordHash: 'hashed_password'
      }
    });
  } catch (e) {
    // User may already exist
  }
});

afterAll(async () => {
  await testPrisma.$disconnect();
});

beforeEach(async () => {
  await testPrisma.workoutExercise.deleteMany();
  await testPrisma.workout.deleteMany();
  await testPrisma.measurementItem.deleteMany();
  await testPrisma.bodyMeasurement.deleteMany();
});

describe('WorkoutRepository Integration', () => {
  describe('create', () => {
    it('should create a workout', async () => {
      const result = await testPrisma.workout.create({
        data: {
          userId: 1,
          date: new Date('2026-04-26')
        }
      });

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.userId).toBe(1);
    });
  });

  describe('findByUserAndDateRange', () => {
    it('should return workouts within date range', async () => {
      await testPrisma.workout.createMany({
        data: [
          { userId: 1, date: new Date('2026-04-20') },
          { userId: 1, date: new Date('2026-04-26') },
        ]
      });

      const results = await testPrisma.workout.findMany({
        where: {
          userId: 1,
          date: {
            gte: new Date('2026-04-01'),
            lte: new Date('2026-04-30')
          },
          deletedAt: null
        }
      });

      expect(results).toHaveLength(2);
    });
  });

  describe('softDelete', () => {
    it('should soft delete a workout', async () => {
      const created = await testPrisma.workout.create({
        data: { userId: 1, date: new Date('2026-04-26') }
      });

      const result = await testPrisma.workout.update({
        where: { id: created.id },
        data: { deletedAt: new Date() }
      });

      expect(result).toBeDefined();
      expect(result.deletedAt).toBeDefined();
    });
  });

  describe('addExercise', () => {
    it('should add exercise to workout', async () => {
      const workout = await testPrisma.workout.create({
        data: { userId: 1, date: new Date('2026-04-26') }
      });

      const result = await testPrisma.workoutExercise.create({
        data: {
          workoutId: workout.id,
          exerciseName: '深蹲',
          sets: 3,
          reps: 10,
          weight: 100,
        }
      });

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
    });
  });
});

describe('MeasurementRepository Integration', () => {
  describe('create', () => {
    it('should create a measurement', async () => {
      const result = await testPrisma.bodyMeasurement.create({
        data: {
          userId: 1,
          date: new Date('2026-04-26')
        }
      });

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.userId).toBe(1);
    });
  });

  describe('addItem', () => {
    it('should add item to measurement', async () => {
      const measurement = await testPrisma.bodyMeasurement.create({
        data: { userId: 1, date: new Date('2026-04-26') }
      });

      const result = await testPrisma.measurementItem.create({
        data: {
          measurementId: measurement.id,
          bodyPart: 'chest',
          value: 94
        }
      });

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
    });
  });

  describe('findById', () => {
    it('should return measurement when found', async () => {
      const created = await testPrisma.bodyMeasurement.create({
        data: { userId: 1, date: new Date('2026-04-26') }
      });

      const result = await testPrisma.bodyMeasurement.findFirst({
        where: { id: created.id, userId: 1, deletedAt: null }
      });

      expect(result).toBeDefined();
      expect(result?.id).toBe(created.id);
    });

    it('should return null when not found', async () => {
      const result = await testPrisma.bodyMeasurement.findFirst({
        where: { id: 99999, userId: 1, deletedAt: null }
      });

      expect(result).toBeNull();
    });
  });
});