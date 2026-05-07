import { describe, it, expect, beforeEach } from '@jest/globals';
import { measurementRepository } from '../../../src/repositories/measurementRepository';

// Mock the prisma module before importing repository
jest.mock('../../../src/config/prisma', () => ({
  __esModule: true,
  default: {
    bodyMeasurement: {
      create: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
    },
    measurementItem: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}));

// Import after mock
import { default as prisma } from '../../../src/config/prisma';

describe('MeasurementRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a measurement record', async () => {
      const mockMeasurement = {
        id: 1,
        userId: 1,
        date: new Date(),
        deletedAt: null,
      };

      (prisma.bodyMeasurement.create as jest.Mock).mockResolvedValue(mockMeasurement);

      const result = await measurementRepository.create(1, '2024-01-15');

      expect(prisma.bodyMeasurement.create).toHaveBeenCalledWith({
        data: {
          userId: 1,
          date: expect.any(Date),
        },
      });
      expect(result).toEqual(mockMeasurement);
    });
  });

  describe('createWithItems', () => {
    it('should create measurement with items', async () => {
      const mockMeasurement = {
        id: 1,
        userId: 1,
        date: new Date(),
        deletedAt: null,
        items: [
          { id: 1, bodyPart: 'chest', value: 100 },
          { id: 2, bodyPart: 'waist', value: 80 },
        ],
      };

      (prisma.bodyMeasurement.create as jest.Mock).mockResolvedValue(mockMeasurement);

      const items = [
        { bodyPart: 'chest', value: 100 },
        { bodyPart: 'waist', value: 80 },
      ];

      const result = await measurementRepository.createWithItems(1, '2024-01-16', items);

      expect(result).toBeDefined();
      expect(result.items).toHaveLength(2);
    });
  });

  describe('findByDate', () => {
    it('should find measurement by date', async () => {
      const mockMeasurement = {
        id: 1,
        userId: 1,
        date: new Date('2024-01-15'),
        deletedAt: null,
        items: [],
      };

      (prisma.bodyMeasurement.findFirst as jest.Mock).mockResolvedValue(mockMeasurement);

      const found = await measurementRepository.findByDate(1, '2024-01-15');

      expect(found).toBeDefined();
      expect(found?.userId).toBe(1);
    });

    it('should return null for non-existent date', async () => {
      (prisma.bodyMeasurement.findFirst as jest.Mock).mockResolvedValue(null);

      const found = await measurementRepository.findByDate(1, '2025-01-01');

      expect(found).toBeNull();
    });
  });

  describe('findById', () => {
    it('should find measurement by id for user', async () => {
      const mockMeasurement = {
        id: 1,
        userId: 1,
        date: new Date(),
        deletedAt: null,
        items: [],
      };

      (prisma.bodyMeasurement.findFirst as jest.Mock).mockResolvedValue(mockMeasurement);

      const found = await measurementRepository.findById(1, 1);

      expect(prisma.bodyMeasurement.findFirst).toHaveBeenCalledWith({
        where: { id: 1, userId: 1, deletedAt: null },
        include: { items: true },
      });
      expect(found).toBeDefined();
    });

    it('should return null for non-existent id', async () => {
      (prisma.bodyMeasurement.findFirst as jest.Mock).mockResolvedValue(null);

      const found = await measurementRepository.findById(999999, 1);

      expect(found).toBeNull();
    });
  });

  describe('findByUserAndDateRange', () => {
    it('should find measurements within date range', async () => {
      const mockMeasurements = [
        { id: 1, userId: 1, date: new Date('2024-01-10'), items: [] },
        { id: 2, userId: 1, date: new Date('2024-01-15'), items: [] },
      ];

      (prisma.bodyMeasurement.findMany as jest.Mock).mockResolvedValue(mockMeasurements);

      const result = await measurementRepository.findByUserAndDateRange(
        1,
        '2024-01-01',
        '2024-01-31'
      );

      expect(result).toHaveLength(2);
    });

    it('should return empty array when no measurements in range', async () => {
      (prisma.bodyMeasurement.findMany as jest.Mock).mockResolvedValue([]);

      const result = await measurementRepository.findByUserAndDateRange(
        1,
        '2025-01-01',
        '2025-01-31'
      );

      expect(result).toEqual([]);
    });
  });

  describe('softDelete', () => {
    it('should soft delete a measurement by setting deletedAt', async () => {
      const mockDeleted = {
        id: 1,
        deletedAt: new Date(),
      };

      (prisma.bodyMeasurement.update as jest.Mock).mockResolvedValue(mockDeleted);

      const result = await measurementRepository.softDelete(1);

      expect(prisma.bodyMeasurement.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { deletedAt: expect.any(Date) },
      });
      expect(result.deletedAt).toBeDefined();
    });
  });

  describe('restore', () => {
    it('should restore a soft-deleted measurement', async () => {
      const mockRestored = {
        id: 1,
        deletedAt: null,
      };

      (prisma.bodyMeasurement.update as jest.Mock).mockResolvedValue(mockRestored);

      const result = await measurementRepository.restore(1);

      expect(prisma.bodyMeasurement.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { deletedAt: null },
      });
      expect(result.deletedAt).toBeNull();
    });
  });
});