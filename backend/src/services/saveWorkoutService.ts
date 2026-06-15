import prisma from '../config/prisma';

export interface SaveWorkoutInput {
  userId: number;
  date: string; // YYYY-MM-DD
  exercises: Array<{
    name: string;
    sets?: number;
    reps?: number;
    weight?: number;
    duration?: number;
    distance?: number;
  }>;
  idempotencyKey?: string;
}

export interface SaveWorkoutResult {
  workout: { id: number; date: Date; userId: number; idempotencyKey: string | null };
  isReplay: boolean; // true 表示命中幂等，返回的是已有记录
}

/**
 * 保存训练记录（幂等）
 *
 * 如果传入 idempotencyKey 且该 (userId, idempotencyKey) 已存在，
 * 不再写入，直接返回已有记录。
 */
export async function saveWorkoutWithIdempotency(
  input: SaveWorkoutInput
): Promise<SaveWorkoutResult> {
  const { userId, date, exercises, idempotencyKey } = input;

  // 1. 幂等检查
  if (idempotencyKey) {
    const existing = await prisma.workout.findFirst({
      where: { userId, idempotencyKey, deletedAt: null },
    });
    if (existing) {
      return {
        workout: {
          id: existing.id,
          date: existing.date,
          userId: existing.userId,
          idempotencyKey: existing.idempotencyKey,
        },
        isReplay: true,
      };
    }
  }

  // 2. 事务写入
  const workout = await prisma.$transaction(async (tx) => {
    const w = await tx.workout.create({
      data: {
        userId,
        date: new Date(date),
        idempotencyKey: idempotencyKey ?? null,
      },
    });

    for (const ex of exercises) {
      await tx.workoutExercise.create({
        data: {
          workoutId: w.id,
          exerciseName: ex.name,
          sets: ex.sets ?? null,
          reps: ex.reps ?? null,
          weight: ex.weight ?? null,
          duration: ex.duration ?? null,
          distance: ex.distance ?? null,
        },
      });
    }

    return w;
  });

  return {
    workout: {
      id: workout.id,
      date: workout.date,
      userId: workout.userId,
      idempotencyKey: workout.idempotencyKey,
    },
    isReplay: false,
  };
}
