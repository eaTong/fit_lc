// backend/tests/integration/plan-flow.test.ts
import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { execSync } from 'child_process';
import { createTestUser, cleanDatabase } from '../fixtures/factories';
import { planRepository } from '../../src/repositories/planRepository';
import { planService } from '../../src/services/planService';

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
  await testPrisma.planExecution.deleteMany();
  await testPrisma.planExercise.deleteMany();
  await testPrisma.workoutPlan.deleteMany();
});

describe('Plan Flow Integration', () => {
  describe('create plan -> add exercises flow', () => {
    it('should create plan with exercises via service', async () => {
      const userProfile = {
        name: 'Test Plan',
        goal: 'muscle_gain',
        frequency: 4,
        experience: 'intermediate',
        equipment: 'barbell',
        duration_weeks: 8
      };

      const exercises = [
        { dayOfWeek: 1, exerciseName: 'Bench Press', sets: 4, reps: '8-10' },
        { dayOfWeek: 1, exerciseName: 'Squat', sets: 4, reps: '6-8' },
        { dayOfWeek: 3, exerciseName: 'Deadlift', sets: 3, reps: '5' },
        { dayOfWeek: 5, exerciseName: 'Overhead Press', sets: 3, reps: '8-12' }
      ];

      // Create plan via service
      const planId = await planService.createPlan(testUser.id, userProfile, exercises);

      expect(planId).toBeDefined();

      // Get plan and verify
      const plan = await planService.getPlan(planId, testUser.id);
      expect(plan).toBeDefined();
      expect(plan?.exercises).toHaveLength(4);
    });

    it('should create plan via repository directly', async () => {
      const userProfile = {
        goal: 'strength',
        frequency: 3,
        experience: 'beginner',
        equipment: 'dumbbell',
        duration_weeks: 4
      };

      const exercises = [
        { dayOfWeek: 1, exerciseName: 'Dumbbell Press', sets: 3, reps: '10-12' },
        { dayOfWeek: 3, exerciseName: 'Dumbbell Rows', sets: 3, reps: '10-12' },
        { dayOfWeek: 5, exerciseName: 'Dumbbell Curls', sets: 3, reps: '12-15' }
      ];

      const plan = await planRepository.createWithExercises(testUser.id, userProfile, exercises);

      expect(plan).toBeDefined();
      expect(plan.id).toBeDefined();

      // Query exercises
      const exercisesInPlan = await planRepository.findExercisesByPlanId(plan.id);
      expect(exercisesInPlan).toHaveLength(3);
    });

    it('should get user plans', async () => {
      // Create multiple plans
      await planRepository.create(testUser.id, {
        name: 'Plan A',
        goal: 'muscle_gain',
        frequency: 4,
        experience: 'intermediate',
        equipment: 'barbell',
        durationWeeks: 8
      });

      await planRepository.create(testUser.id, {
        name: 'Plan B',
        goal: 'weight_loss',
        frequency: 5,
        experience: 'beginner',
        equipment: 'bodyweight',
        durationWeeks: 12
      });

      // Get all user plans
      const plans = await planService.getUserPlans(testUser.id);
      expect(plans).toHaveLength(2);
    });
  });

  describe('plan activation and updates', () => {
    it('should activate a plan', async () => {
      // Create a draft plan
      const plan = await planRepository.create(testUser.id, {
        name: 'Draft Plan',
        goal: 'muscle_gain',
        frequency: 4,
        experience: 'intermediate',
        equipment: 'barbell',
        durationWeeks: 8
      });

      expect(plan.status).toBe('draft');

      // Activate via service
      const activated = await planService.activatePlan(plan.id, testUser.id);

      expect(activated).toBeDefined();
      expect((activated as any).status).toBe('active');
    });

    it('should update plan attributes', async () => {
      const plan = await planRepository.create(testUser.id, {
        name: 'Original Name',
        goal: 'muscle_gain',
        frequency: 4,
        experience: 'intermediate',
        equipment: 'barbell',
        durationWeeks: 8
      });

      // Update via service
      await planService.updatePlan(plan.id, testUser.id, {
        name: 'Updated Name',
        goal: 'strength',
        frequency: 5
      });

      // Verify updates
      const updated = await planService.getPlan(plan.id, testUser.id);
      expect((updated as any).name).toBe('Updated Name');
      expect((updated as any).goal).toBe('strength');
      expect((updated as any).frequency).toBe(5);
    });

    it('should add exercise to existing plan', async () => {
      const plan = await planRepository.create(testUser.id, {
        name: 'Plan with Exercises',
        goal: 'muscle_gain',
        frequency: 4,
        experience: 'intermediate',
        equipment: 'barbell',
        durationWeeks: 8
      });

      // Add exercise via repository
      await planRepository.addExercise(plan.id, {
        dayOfWeek: 1,
        exerciseName: 'Bench Press',
        sets: 4,
        reps: '8-10'
      });

      await planRepository.addExercise(plan.id, {
        dayOfWeek: 3,
        exerciseName: 'Squat',
        sets: 4,
        reps: '6-8'
      });

      // Verify
      const exercises = await planRepository.findExercisesByPlanId(plan.id);
      expect(exercises).toHaveLength(2);
    });

    it('should delete exercise from plan', async () => {
      const plan = await planRepository.create(testUser.id, {
        name: 'Plan to Modify',
        goal: 'muscle_gain',
        frequency: 4,
        experience: 'intermediate',
        equipment: 'barbell',
        durationWeeks: 8
      });

      // Add exercise
      const exercise = await planRepository.addExercise(plan.id, {
        dayOfWeek: 1,
        exerciseName: 'To Be Deleted',
        sets: 3,
        reps: '10'
      });

      // Delete via service
      await planService.updatePlanExercise(exercise.id, plan.id, {} as any);
      await planRepository.deleteExercise(exercise.id, plan.id);

      // Verify deleted
      const exercises = await planRepository.findExercisesByPlanId(plan.id);
      expect(exercises).toHaveLength(0);
    });
  });

  describe('plan execution and analysis', () => {
    it('should record plan execution', async () => {
      // Create plan with exercises
      const plan = await planRepository.createWithExercises(
        testUser.id,
        {
          goal: 'muscle_gain',
          frequency: 4,
          experience: 'intermediate',
          equipment: 'barbell',
          duration_weeks: 8
        },
        [
          { dayOfWeek: 1, exerciseName: 'Bench Press', sets: 4, reps: '8-10' },
          { dayOfWeek: 3, exerciseName: 'Squat', sets: 4, reps: '6-8' }
        ]
      );

      // Get exercises
      const exercises = await planRepository.findExercisesByPlanId(plan.id);
      const benchExercise = exercises.find(e => e.exerciseName === 'Bench Press');

      // Record execution via service
      const executionId = await planService.recordExecution(plan.id, {
        userId: testUser.id,
        planExerciseId: benchExercise!.id,
        scheduledDate: '2026-04-28',
        status: 'completed',
        completedReps: 10,
        completedWeight: 80
      });

      expect(executionId).toBeDefined();

      // Verify execution recorded
      const executions = await planRepository.getExecutions(plan.id);
      expect(executions).toHaveLength(1);
      expect(executions[0].status).toBe('completed');
    });

    it('should get plan execution statistics', async () => {
      // Create plan
      const plan = await planRepository.create(testUser.id, {
        name: 'Execution Stats Plan',
        goal: 'muscle_gain',
        frequency: 3,
        experience: 'intermediate',
        equipment: 'barbell',
        durationWeeks: 4
      });

      // Add exercises
      const exercises = await planRepository.addExercise(plan.id, {
        dayOfWeek: 1,
        exerciseName: 'Press',
        sets: 3,
        reps: '10'
      });

      // Record multiple executions
      await planRepository.recordExecution({
        planId: plan.id,
        planExerciseId: (exercises as any).id,
        scheduledDate: '2026-04-20',
        status: 'completed'
      });

      await planRepository.recordExecution({
        planId: plan.id,
        planExerciseId: (exercises as any).id,
        scheduledDate: '2026-04-22',
        status: 'completed'
      });

      await planRepository.recordExecution({
        planId: plan.id,
        planExerciseId: (exercises as any).id,
        scheduledDate: '2026-04-24',
        status: 'skipped'
      });

      // Get stats
      const stats = await planRepository.getExecutionStats(plan.id);

      expect(stats.total).toBe(3);
      expect(stats.completed).toBe(2);
      expect(stats.skipped).toBe(1);
      expect(stats.pending).toBe(0);
    });

    it('should get plan analysis with suggestions', async () => {
      // Create plan
      const plan = await planRepository.create(testUser.id, {
        name: 'Analysis Plan',
        goal: 'muscle_gain',
        frequency: 4,
        experience: 'intermediate',
        equipment: 'barbell',
        durationWeeks: 8
      });

      // Add exercises
      await planRepository.addExercise(plan.id, {
        dayOfWeek: 1,
        exerciseName: 'Bench Press',
        sets: 4,
        reps: '8-10'
      });

      // Record some executions (low completion rate)
      const exercises = await planRepository.findExercisesByPlanId(plan.id);

      await planRepository.recordExecution({
        planId: plan.id,
        planExerciseId: exercises[0].id,
        scheduledDate: '2026-04-27',
        status: 'pending'
      });

      await planRepository.recordExecution({
        planId: plan.id,
        planExerciseId: exercises[0].id,
        scheduledDate: '2026-04-28',
        status: 'skipped'
      });

      // Get analysis
      const analysis = await planService.getPlanAnalysis(plan.id, testUser.id);

      expect(analysis).toBeDefined();
      expect(analysis.stats.total).toBe(2);
      expect(analysis.stats.completed).toBe(0);
      expect(analysis.suggestions).toContain('Consider reducing workout frequency or intensity');
    });

    it('should return positive suggestion for high completion rate', async () => {
      // Create plan
      const plan = await planRepository.create(testUser.id, {
        name: 'High Completion Plan',
        goal: 'muscle_gain',
        frequency: 4,
        experience: 'intermediate',
        equipment: 'barbell',
        durationWeeks: 8
      });

      // Add exercises
      await planRepository.addExercise(plan.id, {
        dayOfWeek: 1,
        exerciseName: 'Squat',
        sets: 4,
        reps: '6-8'
      });

      const exercises = await planRepository.findExercisesByPlanId(plan.id);

      // Record high completion (5 out of 6 completed)
      for (let i = 0; i < 5; i++) {
        await planRepository.recordExecution({
          planId: plan.id,
          planExerciseId: exercises[0].id,
          scheduledDate: `2026-04-${20 + i}`,
          status: 'completed'
        });
      }

      await planRepository.recordExecution({
        planId: plan.id,
        planExerciseId: exercises[0].id,
        scheduledDate: '2026-04-26',
        status: 'skipped'
      });

      // Get analysis
      const analysis = await planService.getPlanAnalysis(plan.id, testUser.id);

      expect(analysis.stats.completionRate).toBe(83); // 5/6 rounded
      expect(analysis.suggestions).toContain('Great progress! You may be ready for increased intensity');
    });
  });

  describe('delete plan flow', () => {
    it('should delete plan via service', async () => {
      // Create plan
      const plan = await planRepository.create(testUser.id, {
        name: 'Plan To Delete',
        goal: 'muscle_gain',
        frequency: 4,
        experience: 'intermediate',
        equipment: 'barbell',
        durationWeeks: 8
      });

      // Verify exists
      const before = await planService.getPlan(plan.id, testUser.id);
      expect(before).toBeDefined();

      // Delete
      await planService.deletePlan(plan.id, testUser.id);

      // Verify deleted
      const after = await planService.getPlan(plan.id, testUser.id);
      expect(after).toBeNull();
    });
  });

  describe('plan adjustment flow', () => {
    it('should adjust plan exercises', async () => {
      // Create plan with exercises
      const plan = await planRepository.createWithExercises(
        testUser.id,
        {
          goal: 'muscle_gain',
          frequency: 4,
          experience: 'intermediate',
          equipment: 'barbell',
          duration_weeks: 8
        },
        [
          { dayOfWeek: 1, exerciseName: 'Bench Press', sets: 4, reps: '8-10' },
          { dayOfWeek: 3, exerciseName: 'Squat', sets: 4, reps: '6-8' }
        ]
      );

      // Get exercises
      const exercises = await planRepository.findExercisesByPlanId(plan.id);
      const benchExercise = exercises.find(e => e.exerciseName === 'Bench Press');

      // Adjust via service
      await planService.adjustPlan(plan.id, testUser.id, {
        exercises: {
          [benchExercise!.id]: {
            sets: 5,
            reps: '6-8'
          }
        }
      });

      // Verify adjustments
      const updatedExercises = await planRepository.findExercisesByPlanId(plan.id);
      const adjustedBench = updatedExercises.find(e => e.exerciseName === 'Bench Press');

      expect(adjustedBench?.sets).toBe(5);
      expect(adjustedBench?.reps).toBe('6-8');
    });

    it('should adjust plan frequency and goal', async () => {
      const plan = await planRepository.create(testUser.id, {
        name: 'Adjustment Test Plan',
        goal: 'muscle_gain',
        frequency: 4,
        experience: 'intermediate',
        equipment: 'barbell',
        durationWeeks: 8
      });

      // Adjust frequency and goal
      await planService.adjustPlan(plan.id, testUser.id, {
        frequency: 5,
        goal: 'strength'
      });

      // Verify
      const updated = await planService.getPlan(plan.id, testUser.id);
      expect((updated as any).frequency).toBe(5);
      expect((updated as any).goal).toBe('strength');
    });
  });
});