import { describe, it, expect, beforeEach } from '@jest/globals';
import { workoutRepository } from '../../../src/repositories/workoutRepository';

// Mock the prisma module before importing repository
jest.mock('../../../src/config/prisma', () => ({
  __esModule: true,
  default: {
    $transaction: jest.fn(async (callback) => {
      const mockTx = {
        workout: {
          create: jest.fn(),
        },
        workoutExercise: {
          create: jest.fn(),
        },
      };
      return callback(mockTx);
    }),
    workout: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    workoutExercise: {
      create: jest.fn(),
    },
  },
}));

// Import after mock
import { default as prisma } from '../../../src/config/prisma';

describe('WorkoutRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a workout', async () => {
      const mockWorkout = {
        id: 1,
        userId: 1,
        date: new Date('2024-01-15'),
        deletedAt: null,
      };

      (prisma.workout.create as jest.Mock).mockResolvedValue(mockWorkout);

      const result = await workoutRepository.create(1, '2024-01-15');

      expect(prisma.workout.create).toHaveBeenCalledWith({
        data: {
          userId: 1,
          date: expect.any(Date),
        },
      });
      expect(result).toEqual(mockWorkout);
    });
  });

  describe('createWithExercises', () => {
    it('should create workout with exercises in transaction', async () => {
      const mockWorkout = {
        id: 1,
        userId: 1,
        date: new Date(),
        deletedAt: null,
      };

      // Mock $transaction to execute callback with mock tx
      (prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
        const mockTx = {
          workout: {
            create: jest.fn().mockResolvedValue(mockWorkout),
          },
          workoutExercise: {
            create: jest.fn().mockResolvedValue({ id: 1, workoutId: 1 }),
          },
        };
        return callback(mockTx);
      });

      const exercises = [
        { name: 'Bench Press', sets: 3, reps: 10, weight: 80 },
      ];

      const result = await workoutRepository.createWithExercises(1, '2024-01-16', exercises);

      expect(result).toBeDefined();
      expect(result.userId).toBe(1);
    });
  });

  describe('findById', () => {
    it('should find workout by id', async () => {
      const mockWorkout = {
        id: 1,
        userId: 1,
        date: new Date(),
        deletedAt: null,
      };

      (prisma.workout.findFirst as jest.Mock).mockResolvedValue(mockWorkout);

      const result = await workoutRepository.findById(1, 1);

      expect(prisma.workout.findFirst).toHaveBeenCalledWith({
        where: { id: 1, userId: 1, deletedAt: null },
      });
      expect(result).toEqual(mockWorkout);
    });

    it('should return null for non-existent workout', async () => {
      (prisma.workout.findFirst as jest.Mock).mockResolvedValue(null);

      const result = await workoutRepository.findById(999999, 1);

      expect(result).toBeNull();
    });
  });

  describe('findByUserAndDateRange', () => {
    it('should find workouts within date range', async () => {
      const mockWorkouts = [
        { id: 1, userId: 1, date: new Date('2024-01-10'), exercises: [] },
        { id: 2, userId: 1, date: new Date('2024-01-15'), exercises: [] },
      ];

      (prisma.workout.findMany as jest.Mock).mockResolvedValue(mockWorkouts);

      const result = await workoutRepository.findByUserAndDateRange(1, '2024-01-01', '2024-01-31');

      expect(result).toHaveLength(2);
    });

    it('should return empty array when no workouts in range', async () => {
      (prisma.workout.findMany as jest.Mock).mockResolvedValue([]);

      const result = await workoutRepository.findByUserAndDateRange(1, '2025-01-01', '2025-01-31');

      expect(result).toEqual([]);
    });
  });

  describe('softDelete', () => {
    it('should soft delete a workout by setting deletedAt', async () => {
      const mockDeletedWorkout = {
        id: 1,
        deletedAt: new Date(),
      };

      (prisma.workout.update as jest.Mock).mockResolvedValue(mockDeletedWorkout);

      const result = await workoutRepository.softDelete(1);

      expect(prisma.workout.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { deletedAt: expect.any(Date) },
      });
      expect(result.deletedAt).toBeDefined();
    });
  });

  describe('restore', () => {
    it('should restore a soft-deleted workout', async () => {
      const mockRestoredWorkout = {
        id: 1,
        deletedAt: null,
      };

      (prisma.workout.update as jest.Mock).mockResolvedValue(mockRestoredWorkout);

      const result = await workoutRepository.restore(1);

      expect(prisma.workout.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { deletedAt: null },
      });
      expect(result.deletedAt).toBeNull();
    });
  });

  describe('addExercise', () => {
    it('should add an exercise to a workout', async () => {
      const mockWorkout = { id: 1, userId: 1, deletedAt: null };
      const mockExercise = {
        id: 1,
        workoutId: 1,
        exerciseName: 'Deadlift',
        sets: 5,
        reps: 5,
      };

      (prisma.workout.findFirst as jest.Mock).mockResolvedValue(mockWorkout);
      (prisma.workoutExercise.create as jest.Mock).mockResolvedValue(mockExercise);

      const result = await workoutRepository.addExercise(1, 1, {
        name: 'Deadlift',
        sets: 5,
        reps: 5,
        weight: 120,
      });

      expect(result).toBeDefined();
      expect(result.exerciseName).toBe('Deadlift');
    });

    it('should throw error for non-existent workout', async () => {
      (prisma.workout.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(
        workoutRepository.addExercise(999999, 1, {
          name: 'Test',
          sets: 3,
          reps: 10,
        })
      ).rejects.toThrow('训练记录不存在或已删除');
    });
  });
});