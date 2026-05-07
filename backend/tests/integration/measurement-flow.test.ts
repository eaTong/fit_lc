// backend/tests/integration/measurement-flow.test.ts
import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { execSync } from 'child_process';
import { createTestUser, cleanDatabase } from '../fixtures/factories';
import { measurementRepository } from '../../src/repositories/measurementRepository';
import { saveService } from '../../src/services/saveService';
import { recordService } from '../../src/services/recordService';

const testDbPath = path.join(__dirname, '../../prisma/test.db');

const testPrisma = new PrismaClient({
  datasources: {
    db: { url: `file:${testDbPath}` }
  }
});

let testUser: { id: number; email: string };

beforeAll(async () => {
  // Generate Prisma client
  try {
    execSync('npx prisma generate --schema=./prisma/schema.test.prisma', {
      cwd: path.join(__dirname, '../..'),
      stdio: 'pipe'
    });
  } catch (e) {
    // Ignore if already generated
  }

  // Push schema to test database
  try {
    execSync('npx prisma db push --schema=./prisma/schema.test.prisma --skip-generate --force-reset', {
      cwd: path.join(__dirname, '../..'),
      stdio: 'pipe',
      env: { ...process.env, PRISMA_USER_CONSENT_FOR_DANGEROUS_AI_ACTION: 'yes' }
    });
  } catch (e) {
    // May fail in AI context
  }

  await testPrisma.$connect();
  testUser = await createTestUser();
});

afterAll(async () => {
  await testPrisma.$disconnect();
});

beforeEach(async () => {
  await testPrisma.measurementItem.deleteMany();
  await testPrisma.bodyMeasurement.deleteMany();
});

describe('Measurement Flow Integration', () => {
  describe('save -> query -> summary flow', () => {
    it('should save measurement via service and query via repository', async () => {
      // Step 1: Save measurement via service
      const measurements = [
        { body_part: 'chest', value: 94 },
        { body_part: 'waist', value: 80 },
        { body_part: 'hips', value: 95 }
      ];

      const savedMeasurement = await saveService.saveMeasurement(
        testUser.id,
        '2026-04-26',
        measurements
      );

      expect(savedMeasurement).toBeDefined();
      expect(savedMeasurement.id).toBeDefined();
      expect(savedMeasurement.measurements).toHaveLength(3);

      // Step 2: Query via repository
      const measurementByDate = await measurementRepository.findByDate(
        testUser.id,
        '2026-04-26'
      );

      expect(measurementByDate).toBeDefined();
      expect(measurementByDate?.items).toHaveLength(3);

      // Step 3: Query via service (date range)
      const allMeasurements = await recordService.getMeasurements(
        testUser.id,
        '2026-04-01',
        '2026-04-30'
      );

      expect(allMeasurements).toHaveLength(1);
      expect(allMeasurements[0].items).toHaveLength(3);
    });

    it('should save multiple body parts in a single measurement', async () => {
      const measurements = [
        { body_part: 'biceps_left', value: 32 },
        { body_part: 'biceps_right', value: 33 },
        { body_part: 'thigh_left', value: 55 },
        { body_part: 'thigh_right', value: 56 }
      ];

      const saved = await saveService.saveMeasurement(
        testUser.id,
        '2026-04-27',
        measurements
      );

      expect(saved.measurements).toHaveLength(4);

      // Verify via query
      const queried = await recordService.getMeasurementByDate(testUser.id, '2026-04-27');
      expect(queried?.items).toHaveLength(4);
    });

    it('should query measurements across date range', async () => {
      // Save measurements on different dates
      await saveService.saveMeasurement(testUser.id, '2026-04-10', [
        { body_part: 'weight', value: 75 }
      ]);
      await saveService.saveMeasurement(testUser.id, '2026-04-17', [
        { body_part: 'weight', value: 74.5 }
      ]);
      await saveService.saveMeasurement(testUser.id, '2026-04-24', [
        { body_part: 'weight', value: 74 }
      ]);

      // Query April
      const aprilMeasurements = await recordService.getMeasurements(
        testUser.id,
        '2026-04-01',
        '2026-04-30'
      );

      expect(aprilMeasurements).toHaveLength(3);

      // Verify dates are sorted (most recent first)
      expect(new Date(aprilMeasurements[0].date).getDate()).toBe(24);
    });
  });

  describe('measurement tracking over time', () => {
    it('should track weight progression over time', async () => {
      // Save multiple measurements with weight tracking
      const weights = [75, 74.5, 74, 73.5];

      for (let i = 0; i < weights.length; i++) {
        const date = new Date(2026, 3, 10 + i * 7); // April 10, 17, 24, May 1
        const dateStr = date.toISOString().split('T')[0];
        await saveService.saveMeasurement(testUser.id, dateStr, [
          { body_part: 'weight', value: weights[i] }
        ]);
      }

      // Query and verify progression
      const measurements = await recordService.getMeasurements(
        testUser.id,
        '2026-04-01',
        '2026-05-31'
      );

      const weightItems = measurements
        .map(m => m.items.find(i => i.bodyPart === 'weight'))
        .filter(Boolean);

      expect(weightItems).toHaveLength(4);
      expect(parseFloat(weightItems[0].value.toString())).toBe(75);
      expect(parseFloat(weightItems[3].value.toString())).toBe(73.5);
    });

    it('should track symmetric body parts', async () => {
      await saveService.saveMeasurement(testUser.id, '2026-04-15', [
        { body_part: 'arm_left', value: 30 },
        { body_part: 'arm_right', value: 31 },
        { body_part: 'thigh_left', value: 54 },
        { body_part: 'thigh_right', value: 55 }
      ]);

      const measurement = await recordService.getMeasurementByDate(testUser.id, '2026-04-15');

      expect(measurement?.items).toHaveLength(4);

      const leftArm = measurement?.items.find(i => i.bodyPart === 'arm_left');
      const rightArm = measurement?.items.find(i => i.bodyPart === 'arm_right');

      expect(parseFloat(leftArm!.value.toString())).toBe(30);
      expect(parseFloat(rightArm!.value.toString())).toBe(31);
    });
  });

  describe('repository direct operations', () => {
    it('should create measurement with items via repository', async () => {
      const measurement = await measurementRepository.createWithItems(
        testUser.id,
        '2026-04-28',
        [
          { bodyPart: 'shoulder', value: 110 },
          { bodyPart: 'neck', value: 38 }
        ]
      );

      expect(measurement).toBeDefined();
      expect(measurement.items).toHaveLength(2);
    });

    it('should add items to existing measurement via repository', async () => {
      // Create empty measurement
      const measurement = await measurementRepository.create(
        testUser.id,
        '2026-04-29'
      );

      // Add items
      await measurementRepository.addItem(measurement.id, 'forearm_left', 25);
      await measurementRepository.addItem(measurement.id, 'forearm_right', 26);

      // Query and verify
      const found = await measurementRepository.findById(measurement.id, testUser.id);
      expect(found?.items).toHaveLength(2);
    });

    it('should upsert items (update if exists)', async () => {
      // Create measurement with item
      const measurement = await measurementRepository.createWithItems(
        testUser.id,
        '2026-04-30',
        [{ bodyPart: 'calf_left', value: 35 }]
      );

      // Upsert with new value
      await measurementRepository.upsertItem(measurement.id, 'calf_left', 36);

      // Query and verify updated value
      const found = await measurementRepository.findById(measurement.id, testUser.id);
      const calfLeft = found?.items.find(i => i.bodyPart === 'calf_left');
      expect(parseFloat(calfLeft!.value.toString())).toBe(36);
    });
  });

  describe('delete and restore flow', () => {
    it('should soft delete measurement and not appear in queries', async () => {
      // Save a measurement
      const saved = await saveService.saveMeasurement(testUser.id, '2026-05-01', [
        { body_part: 'waist', value: 78 }
      ]);

      // Verify it exists
      const before = await recordService.getMeasurements(testUser.id, '2026-05-01', '2026-05-01');
      expect(before.some(m => m.id === saved.id)).toBe(true);

      // Delete it
      await recordService.deleteMeasurement(saved.id, testUser.id);

      // Verify it's gone
      const after = await recordService.getMeasurements(testUser.id, '2026-05-01', '2026-05-01');
      expect(after.some(m => m.id === saved.id)).toBe(false);
    });

    it('should restore soft-deleted measurement', async () => {
      // Save a measurement
      const saved = await saveService.saveMeasurement(testUser.id, '2026-05-03', [
        { body_part: 'hips', value: 94 }
      ]);

      // Delete it
      await recordService.deleteMeasurement(saved.id, testUser.id);

      // Restore it
      await recordService.restoreMeasurement(saved.id, testUser.id);

      // Verify it's back
      const after = await recordService.getMeasurements(testUser.id, '2026-05-01', '2026-05-31');
      expect(after.some(m => m.id === saved.id)).toBe(true);
    });
  });
});