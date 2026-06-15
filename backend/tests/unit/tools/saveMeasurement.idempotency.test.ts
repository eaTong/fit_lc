// @ts-nocheck
/**
 * saveMeasurementWithIdempotency unit tests
 * Verifies idempotency: same (userId, idempotencyKey) does not create duplicate records.
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

// Mock the prisma module before importing service
jest.mock('../../../src/config/prisma', () => ({
  __esModule: true,
  default: {
    bodyMeasurement: {
      findFirst: jest.fn(),
    },
    $transaction: jest.fn(async (callback: any) => {
      const mockTx = {
        bodyMeasurement: {
          create: jest.fn(),
        },
        measurementItem: {
          create: jest.fn(),
        },
      };
      return callback(mockTx);
    }),
  },
}));

// Import after mock
import { default as prisma } from '../../../src/config/prisma';
import { saveMeasurementWithIdempotency } from '../../../src/services/saveMeasurementService';

describe('saveMeasurementWithIdempotency', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (prisma.$transaction as jest.Mock).mockImplementation(async (callback: any) => {
      const mockTx = {
        bodyMeasurement: { create: jest.fn() },
        measurementItem: { create: jest.fn() },
      };
      return callback(mockTx);
    });
  });

  it('未传 idempotency_key 时正常写入', async () => {
    const mockMeasurement = {
      id: 1,
      userId: 10,
      date: new Date('2026-06-15'),
      idempotencyKey: null,
    };

    (prisma.$transaction as jest.Mock).mockImplementation(async (callback: any) => {
      const mockTx = {
        bodyMeasurement: { create: jest.fn().mockResolvedValue(mockMeasurement) },
        measurementItem: { create: jest.fn() },
      };
      return callback(mockTx);
    });

    const result = await saveMeasurementWithIdempotency({
      userId: 10,
      date: '2026-06-15',
      measurements: [{ body_part: 'chest', value: 94 }],
    });

    expect(result.isReplay).toBe(false);
    expect(result.measurement.id).toBe(1);
    expect(prisma.bodyMeasurement.findFirst).not.toHaveBeenCalled();
    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
  });

  it('传入 idempotency_key 且记录不存在时正常写入并保存 key', async () => {
    (prisma.bodyMeasurement.findFirst as jest.Mock).mockResolvedValue(null);

    const mockMeasurement = {
      id: 2,
      userId: 10,
      date: new Date('2026-06-15'),
      idempotencyKey: 'ms-key-1',
    };

    const txnCreateMock = jest.fn().mockResolvedValue(mockMeasurement);
    (prisma.$transaction as jest.Mock).mockImplementation(async (callback: any) => {
      const mockTx = {
        bodyMeasurement: { create: txnCreateMock },
        measurementItem: { create: jest.fn() },
      };
      return callback(mockTx);
    });

    const result = await saveMeasurementWithIdempotency({
      userId: 10,
      date: '2026-06-15',
      measurements: [{ body_part: 'waist', value: 78 }],
      idempotencyKey: 'ms-key-1',
    });

    expect(result.isReplay).toBe(false);
    expect(result.measurement.idempotencyKey).toBe('ms-key-1');
    expect(prisma.bodyMeasurement.findFirst).toHaveBeenCalledWith({
      where: { userId: 10, idempotencyKey: 'ms-key-1', deletedAt: null },
    });
    expect(txnCreateMock).toHaveBeenCalledWith({
      data: expect.objectContaining({ idempotencyKey: 'ms-key-1' }),
    });
  });

  it('传入 idempotency_key 且记录已存在时返回 isReplay=true 不再写入', async () => {
    (prisma.bodyMeasurement.findFirst as jest.Mock).mockResolvedValue({
      id: 99,
      userId: 10,
      date: new Date('2026-06-15'),
      idempotencyKey: 'ms-key-1',
    });

    const txnCreateMock = jest.fn();
    const txnItemCreateMock = jest.fn();
    (prisma.$transaction as jest.Mock).mockImplementation(async (callback: any) => {
      const mockTx = {
        bodyMeasurement: { create: txnCreateMock },
        measurementItem: { create: txnItemCreateMock },
      };
      return callback(mockTx);
    });

    const result = await saveMeasurementWithIdempotency({
      userId: 10,
      date: '2026-06-15',
      measurements: [{ body_part: 'chest', value: 94 }],
      idempotencyKey: 'ms-key-1',
    });

    expect(result.isReplay).toBe(true);
    expect(result.measurement.id).toBe(99);
    expect(txnCreateMock).not.toHaveBeenCalled();
    expect(txnItemCreateMock).not.toHaveBeenCalled();
  });
});
