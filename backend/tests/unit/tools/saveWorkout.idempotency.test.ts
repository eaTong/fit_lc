// @ts-nocheck
/**
 * saveWorkoutWithIdempotency unit tests
 * Verifies idempotency: same (userId, idempotencyKey) does not create duplicate records.
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

// Mock the prisma module before importing service
jest.mock('../../../src/config/prisma', () => ({
  __esModule: true,
  default: {
    workout: {
      findFirst: jest.fn(),
    },
    $transaction: jest.fn(async (callback: any) => {
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
  },
}));

// Import after mock
import { default as prisma } from '../../../src/config/prisma';
import { saveWorkoutWithIdempotency } from '../../../src/services/saveWorkoutService';

describe('saveWorkoutWithIdempotency', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Re-define $transaction to call back with mock tx on each test
    (prisma.$transaction as jest.Mock).mockImplementation(async (callback: any) => {
      const mockTx = {
        workout: { create: jest.fn() },
        workoutExercise: { create: jest.fn() },
      };
      return callback(mockTx);
    });
  });

  it('未传 idempotency_key 时正常写入', async () => {
    const mockWorkout = {
      id: 1,
      userId: 10,
      date: new Date('2026-06-15'),
      idempotencyKey: null,
    };

    (prisma.$transaction as jest.Mock).mockImplementation(async (callback: any) => {
      const mockTx = {
        workout: { create: jest.fn().mockResolvedValue(mockWorkout) },
        workoutExercise: { create: jest.fn() },
      };
      return callback(mockTx);
    });

    const result = await saveWorkoutWithIdempotency({
      userId: 10,
      date: '2026-06-15',
      exercises: [{ name: '深蹲', sets: 5, reps: 8, weight: 80 }],
    });

    expect(result.isReplay).toBe(false);
    expect(result.workout.id).toBe(1);
    expect(prisma.workout.findFirst).not.toHaveBeenCalled();
    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
  });

  it('传入 idempotency_key 且记录不存在时正常写入并保存 key', async () => {
    (prisma.workout.findFirst as jest.Mock).mockResolvedValue(null);

    const mockWorkout = {
      id: 2,
      userId: 10,
      date: new Date('2026-06-15'),
      idempotencyKey: 'abc-123',
    };

    const txnCreateMock = jest.fn().mockResolvedValue(mockWorkout);
    (prisma.$transaction as jest.Mock).mockImplementation(async (callback: any) => {
      const mockTx = {
        workout: { create: txnCreateMock },
        workoutExercise: { create: jest.fn() },
      };
      return callback(mockTx);
    });

    const result = await saveWorkoutWithIdempotency({
      userId: 10,
      date: '2026-06-15',
      exercises: [{ name: '深蹲', sets: 5, reps: 8, weight: 80 }],
      idempotencyKey: 'abc-123',
    });

    expect(result.isReplay).toBe(false);
    expect(result.workout.idempotencyKey).toBe('abc-123');
    expect(prisma.workout.findFirst).toHaveBeenCalledWith({
      where: { userId: 10, idempotencyKey: 'abc-123', deletedAt: null },
    });
    expect(txnCreateMock).toHaveBeenCalledWith({
      data: expect.objectContaining({ idempotencyKey: 'abc-123' }),
    });
  });

  it('传入 idempotency_key 且记录已存在时返回 isReplay=true 不再写入', async () => {
    (prisma.workout.findFirst as jest.Mock).mockResolvedValue({
      id: 99,
      userId: 10,
      date: new Date('2026-06-15'),
      idempotencyKey: 'abc-123',
    });

    const txnCreateMock = jest.fn();
    const txnExerciseCreateMock = jest.fn();
    (prisma.$transaction as jest.Mock).mockImplementation(async (callback: any) => {
      const mockTx = {
        workout: { create: txnCreateMock },
        workoutExercise: { create: txnExerciseCreateMock },
      };
      return callback(mockTx);
    });

    const result = await saveWorkoutWithIdempotency({
      userId: 10,
      date: '2026-06-15',
      exercises: [{ name: '深蹲', sets: 5, reps: 8, weight: 80 }],
      idempotencyKey: 'abc-123',
    });

    expect(result.isReplay).toBe(true);
    expect(result.workout.id).toBe(99);
    expect(txnCreateMock).not.toHaveBeenCalled();
    expect(txnExerciseCreateMock).not.toHaveBeenCalled();
  });
});
