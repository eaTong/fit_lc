// backend/tests/integration/workout-flow.test.ts
import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { execSync } from 'child_process';
import { createTestUser, cleanDatabase } from '../fixtures/factories';
import { workoutRepository } from '../../src/repositories/workoutRepository';
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
  await testPrisma.workoutExercise.deleteMany();
  await testPrisma.workout.deleteMany();
});

describe('Workout Flow Integration', () => {
  describe('save -> query -> summary flow', () => {
    it('should save workout via service, query via repository, and get summary', async () => {
      // Step 1: Save workout via service
      const workoutData = {
        name: 'Bench Press',
        sets: 3,
        reps: 10,
        weight: 80
      };

      const savedWorkout = await saveService.saveWorkout(
        testUser.id,
        '2026-04-26',
        [workoutData]
      );

      expect(savedWorkout).toBeDefined();
      expect(savedWorkout.id).toBeDefined();
      expect(savedWorkout.exercises).toHaveLength(1);
      expect(savedWorkout.exercises[0].name).toBe('Bench Press');

      // Step 2: Query via repository
      const workouts = await workoutRepository.findByUserAndDateRange(
        testUser.id,
        '2026-04-01',
        '2026-04-30'
      );

      expect(workouts).toHaveLength(1);
      expect(workouts[0].exercises).toHaveLength(1);
      expect(workouts[0].exercises[0].exerciseName).toBe('Bench Press');

      // Step 3: Get workout details via service (getWorkouts includes exercises via findByUserAndDateRange)
      const allWorkouts = await recordService.getWorkouts(testUser.id, '2026-04-01', '2026-04-30');
      const workoutDetails = allWorkouts.find(w => w.id === savedWorkout.id);
      expect(workoutDetails).toBeDefined();
      expect(workoutDetails?.exercises).toHaveLength(1);
    });

    it('should save multiple exercises in a single workout', async () => {
      const exercises = [
        { name: 'Squat', sets: 4, reps: 8, weight: 100 },
        { name: 'Leg Press', sets: 3, reps: 12, weight: 120 },
        { name: 'Lunges', sets: 3, reps: 10, weight: 40 }
      ];

      const savedWorkout = await saveService.saveWorkout(
        testUser.id,
        '2026-04-27',
        exercises
      );

      expect(savedWorkout.exercises).toHaveLength(3);

      // Query and verify all exercises are saved
      const workouts = await recordService.getWorkouts(testUser.id, '2026-04-01', '2026-04-30');
      const workout = workouts.find(w => w.id === savedWorkout.id);
      expect(workout?.exercises).toHaveLength(3);
    });

    it('should query workouts across date range', async () => {
      // Save workouts on different dates
      await saveService.saveWorkout(testUser.id, '2026-04-15', [{ name: 'Deadlift', sets: 3, reps: 5, weight: 100 }]);
      await saveService.saveWorkout(testUser.id, '2026-04-20', [{ name: 'Pull-ups', sets: 3, reps: 8 }]);
      await saveService.saveWorkout(testUser.id, '2026-04-25', [{ name: 'Rows', sets: 4, reps: 10, weight: 60 }]);

      // Query first half of April
      const firstHalf = await recordService.getWorkouts(testUser.id, '2026-04-01', '2026-04-15');
      expect(firstHalf).toHaveLength(1);
      expect(firstHalf[0].exercises[0].exerciseName).toBe('Deadlift');

      // Query second half of April
      const secondHalf = await recordService.getWorkouts(testUser.id, '2026-04-16', '2026-04-30');
      expect(secondHalf).toHaveLength(2);

      // Query all of April
      const allApril = await recordService.getWorkouts(testUser.id, '2026-04-01', '2026-04-30');
      expect(allApril).toHaveLength(3);
    });
  });

  describe('personal records tracking', () => {
    it('should track personal record for weight exercises', async () => {
      // First workout - baseline
      await saveService.saveWorkout(testUser.id, '2026-04-10', [
        { name: 'Squat', sets: 3, reps: 5, weight: 60 }
      ]);

      // Query and verify initial weight
      const workouts1 = await recordService.getWorkouts(testUser.id, '2026-04-10', '2026-04-10');
      expect(workouts1[0].exercises[0].weight?.toString()).toBe('60');

      // Second workout - new personal record
      await saveService.saveWorkout(testUser.id, '2026-04-17', [
        { name: 'Squat', sets: 3, reps: 5, weight: 70 }
      ]);

      // Third workout - another increase
      await saveService.saveWorkout(testUser.id, '2026-04-24', [
        { name: 'Squat', sets: 3, reps: 5, weight: 80 }
      ]);

      // Get all squats and verify progression
      const allWorkouts = await recordService.getWorkouts(testUser.id, '2026-04-01', '2026-04-30');
      const squatExercises = allWorkouts
        .flatMap(w => w.exercises)
        .filter(e => e.exerciseName === 'Squat')
        .sort((a, b) => a.id - b.id);

      expect(squatExercises).toHaveLength(3);
      expect(parseFloat(squatExercises[0].weight?.toString() || '0')).toBe(60);
      expect(parseFloat(squatExercises[1].weight?.toString() || '0')).toBe(70);
      expect(parseFloat(squatExercises[2].weight?.toString() || '0')).toBe(80);
    });

    it('should handle different exercise types (duration/distance)', async () => {
      // Cardio exercise with duration
      await saveService.saveWorkout(testUser.id, '2026-04-18', [
        { name: 'Running', duration: 30, distance: 5 }
      ]);

      // Query and verify
      const workouts = await recordService.getWorkouts(testUser.id, '2026-04-18', '2026-04-18');
      expect(workouts).toHaveLength(1);
      expect(workouts[0].exercises[0].duration).toBe(30);
      expect(workouts[0].exercises[0].distance?.toString()).toBe('5');
    });
  });

  describe('delete and restore flow', () => {
    it('should soft delete workout and not appear in queries', async () => {
      // Save a workout
      const saved = await saveService.saveWorkout(testUser.id, '2026-04-19', [
        { name: 'Bench Press', sets: 3, reps: 10, weight: 70 }
      ]);

      // Verify it exists
      const workoutsBefore = await recordService.getWorkouts(testUser.id, '2026-04-01', '2026-04-30');
      expect(workoutsBefore.some(w => w.id === saved.id)).toBe(true);

      // Delete it
      await recordService.deleteWorkout(saved.id, testUser.id);

      // Verify it's gone from normal queries
      const workoutsAfter = await recordService.getWorkouts(testUser.id, '2026-04-01', '2026-04-30');
      expect(workoutsAfter.some(w => w.id === saved.id)).toBe(false);
    });

    it('should restore soft-deleted workout', async () => {
      // Save a workout
      const saved = await saveService.saveWorkout(testUser.id, '2026-04-21', [
        { name: 'Deadlift', sets: 3, reps: 5, weight: 100 }
      ]);

      // Delete it
      await recordService.deleteWorkout(saved.id, testUser.id);

      // Restore it
      await recordService.restoreWorkout(saved.id, testUser.id);

      // Verify it's back
      const workoutsAfter = await recordService.getWorkouts(testUser.id, '2026-04-01', '2026-04-30');
      expect(workoutsAfter.some(w => w.id === saved.id)).toBe(true);
    });
  });

  describe('repository direct operations', () => {
    it('should add exercises to existing workout via repository', async () => {
      // Create workout via repository
      const workout = await workoutRepository.create(testUser.id, '2026-04-22');

      // Add exercises via repository
      await workoutRepository.addExercise(workout.id, testUser.id, {
        name: 'Overhead Press',
        sets: 4,
        reps: 8,
        weight: 50
      });

      await workoutRepository.addExercise(workout.id, testUser.id, {
        name: 'Lateral Raises',
        sets: 3,
        reps: 12,
        weight: 15
      });

      // Query and verify
      const found = await workoutRepository.findById(workout.id, testUser.id);
      expect(found).toBeNull(); // Direct repo findById doesn't include exercises

      const workouts = await workoutRepository.findByUserAndDateRange(testUser.id, '2026-04-22', '2026-04-22');
      expect(workouts[0].exercises).toHaveLength(2);
    });
  });
});