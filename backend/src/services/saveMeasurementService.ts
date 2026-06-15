import prisma from '../config/prisma';

export interface SaveMeasurementInput {
  userId: number;
  date: string; // YYYY-MM-DD 或 YYYY-MM-DDTHH:mm:ss
  measurements: Array<{ body_part: string; value: number }>;
  idempotencyKey?: string;
}

export interface SaveMeasurementResult {
  measurement: { id: number; date: Date; userId: number; idempotencyKey: string | null };
  isReplay: boolean;
}

/**
 * 保存围度记录（幂等）
 *
 * 如果传入 idempotencyKey 且该 (userId, idempotencyKey) 已存在，
 * 不再写入，直接返回已有记录。
 */
export async function saveMeasurementWithIdempotency(
  input: SaveMeasurementInput
): Promise<SaveMeasurementResult> {
  const { userId, date, measurements, idempotencyKey } = input;

  // 1. 幂等检查
  if (idempotencyKey) {
    const existing = await prisma.bodyMeasurement.findFirst({
      where: { userId, idempotencyKey, deletedAt: null },
    });
    if (existing) {
      return {
        measurement: {
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
  const measurement = await prisma.$transaction(async (tx) => {
    const m = await tx.bodyMeasurement.create({
      data: {
        userId,
        date: new Date(date),
        idempotencyKey: idempotencyKey ?? null,
      },
    });

    for (const item of measurements) {
      await tx.measurementItem.create({
        data: {
          measurementId: m.id,
          bodyPart: item.body_part,
          value: item.value,
        },
      });
    }
    return m;
  });

  return {
    measurement: {
      id: measurement.id,
      date: measurement.date,
      userId: measurement.userId,
      idempotencyKey: measurement.idempotencyKey,
    },
    isReplay: false,
  };
}
