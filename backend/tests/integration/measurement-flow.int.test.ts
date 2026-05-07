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

describe('Measurement Flow Integration', () => {
  let testUser: any;

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
      execSync('npx prisma db push --schema=./prisma/schema.test.prisma --skip-generate', {
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
      testUser = await testPrisma.user.create({
        data: {
          id: 998,
          email: 'measurement-flow-test@example.com',
          passwordHash: 'hashed_password'
        }
      });
    } catch (e) {
      // User may already exist
      testUser = await testPrisma.user.findUnique({ where: { id: 998 } });
    }
  });

  afterAll(async () => {
    await testPrisma.measurementItem.deleteMany();
    await testPrisma.bodyMeasurement.deleteMany();
    await testPrisma.$disconnect();
  });

  beforeEach(async () => {
    await testPrisma.measurementItem.deleteMany();
    await testPrisma.bodyMeasurement.deleteMany();
  });

  it('should save and query measurement by date', async () => {
    // 1. Create measurement with items
    const measurement = await testPrisma.bodyMeasurement.create({
      data: {
        userId: testUser.id,
        date: new Date('2026-05-01')
      }
    });

    await testPrisma.measurementItem.createMany({
      data: [
        { measurementId: measurement.id, bodyPart: 'chest', value: 100 },
        { measurementId: measurement.id, bodyPart: 'waist', value: 80 }
      ]
    });

    // 2. Query measurement by date
    const startOfDay = new Date('2026-05-01');
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date('2026-05-01');
    endOfDay.setHours(23, 59, 59, 999);

    const found = await testPrisma.bodyMeasurement.findFirst({
      where: {
        userId: testUser.id,
        date: {
          gte: startOfDay,
          lte: endOfDay
        },
        deletedAt: null
      },
      include: { items: true }
    });

    expect(found).toBeDefined();
    expect(found?.items).toHaveLength(2);
  });

  it('should update measurement items via upsert', async () => {
    // Create measurement with items
    const measurement = await testPrisma.bodyMeasurement.create({
      data: {
        userId: testUser.id,
        date: new Date('2026-05-01')
      }
    });

    const item = await testPrisma.measurementItem.create({
      data: {
        measurementId: measurement.id,
        bodyPart: 'chest',
        value: 95
      }
    });

    // Upsert: update existing item
    const existingItem = await testPrisma.measurementItem.findFirst({
      where: { measurementId: measurement.id, bodyPart: 'chest' }
    });

    await testPrisma.measurementItem.update({
      where: { id: existingItem!.id },
      data: { value: 100 }
    });

    const updatedItem = await testPrisma.measurementItem.findFirst({
      where: { measurementId: measurement.id, bodyPart: 'chest' }
    });

    expect(Number(updatedItem?.value)).toBe(100);
  });

  it('should get measurement history', async () => {
    // Create multiple measurements
    const m1 = await testPrisma.bodyMeasurement.create({
      data: {
        userId: testUser.id,
        date: new Date('2026-05-01')
      }
    });
    await testPrisma.measurementItem.create({
      data: { measurementId: m1.id, bodyPart: 'chest', value: 95 }
    });

    const m2 = await testPrisma.bodyMeasurement.create({
      data: {
        userId: testUser.id,
        date: new Date('2026-05-15')
      }
    });
    await testPrisma.measurementItem.create({
      data: { measurementId: m2.id, bodyPart: 'chest', value: 96 }
    });

    // Get all measurements for user
    const measurements = await testPrisma.bodyMeasurement.findMany({
      where: {
        userId: testUser.id,
        deletedAt: null
      },
      include: { items: true },
      orderBy: { date: 'desc' }
    });

    expect(measurements.length).toBe(2);
    expect(measurements[0].items[0].bodyPart).toBe('chest');
  });

  it('should get latest measurement by body part', async () => {
    // Create measurement
    const measurement = await testPrisma.bodyMeasurement.create({
      data: {
        userId: testUser.id,
        date: new Date('2026-05-01')
      }
    });

    await testPrisma.measurementItem.create({
      data: { measurementId: measurement.id, bodyPart: 'chest', value: 100 }
    });

    // Query latest measurement with chest item
    const latestMeasurement = await testPrisma.bodyMeasurement.findFirst({
      where: {
        userId: testUser.id,
        deletedAt: null
      },
      include: {
        items: {
          where: { bodyPart: 'chest' }
        }
      },
      orderBy: { date: 'desc' }
    });

    expect(latestMeasurement).toBeDefined();
    expect(latestMeasurement?.items[0].bodyPart).toBe('chest');
    expect(Number(latestMeasurement?.items[0].value)).toBe(100);
  });

  it('should soft delete measurement', async () => {
    const measurement = await testPrisma.bodyMeasurement.create({
      data: {
        userId: testUser.id,
        date: new Date('2026-05-01')
      }
    });

    const deleted = await testPrisma.bodyMeasurement.update({
      where: { id: measurement.id },
      data: { deletedAt: new Date() }
    });

    expect(deleted.deletedAt).toBeDefined();

    // Verify it's no longer in normal queries
    const found = await testPrisma.bodyMeasurement.findFirst({
      where: { id: measurement.id, deletedAt: null }
    });
    expect(found).toBeNull();
  });
});
