import { describe, it, expect, beforeEach } from '@jest/globals';
import { saveService } from '../../../src/services/saveService';
import { workoutRepository } from '../../../src/repositories/workoutRepository';
import { measurementRepository } from '../../../src/repositories/measurementRepository';

// Mock repositories
jest.mock('../../../src/repositories/workoutRepository');
jest.mock('../../../src/repositories/measurementRepository');

const mockWorkoutRepository = workoutRepository as jest.Mocked<typeof workoutRepository>;
const mockMeasurementRepository = measurementRepository as jest.Mocked<typeof measurementRepository>;

describe('SaveService', () => {
  const testUserId = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveWorkout', () => {
    it('should save workout and return formatted response', async () => {
      const mockWorkout = {
        id: 1,
        userId: testUserId,
        date: new Date(),
        createdAt: new Date(),
        deletedAt: null
      };
      mockWorkoutRepository.createWithExercises.mockResolvedValue(mockWorkout);

      const exercises = [{ name: '卧推', sets: 3, reps: 10, weight: 80 }];
      const result = await saveService.saveWorkout(testUserId, '2024-01-15', exercises);

      expect(result).toHaveProperty('id', 1);
      expect(result).toHaveProperty('date', '2024-01-15');
      expect(result).toHaveProperty('exercises', exercises);
      expect(result.message).toContain('卧推');
      expect(mockWorkoutRepository.createWithExercises).toHaveBeenCalledWith(
        testUserId,
        '2024-01-15',
        exercises
      );
    });

    it('should save multiple exercises', async () => {
      const mockWorkout = {
        id: 2,
        userId: testUserId,
        date: new Date(),
        createdAt: new Date(),
        deletedAt: null
      };
      mockWorkoutRepository.createWithExercises.mockResolvedValue(mockWorkout);

      const exercises = [
        { name: '卧推', sets: 3, reps: 10, weight: 80 },
        { name: '深蹲', sets: 4, reps: 8, weight: 100 },
        { name: '硬拉', sets: 3, reps: 5, weight: 120 }
      ];
      const result = await saveService.saveWorkout(testUserId, '2024-01-16', exercises);

      expect(result.exercises).toHaveLength(3);
      expect(result.message).toContain('卧推');
      expect(result.message).toContain('深蹲');
      expect(result.message).toContain('硬拉');
    });
  });

  describe('saveMeasurement', () => {
    it('should save measurement and return formatted response', async () => {
      const mockMeasurement = {
        id: 1,
        userId: testUserId,
        date: new Date(),
        createdAt: new Date(),
        deletedAt: null,
        items: []
      };
      mockMeasurementRepository.createWithItems.mockResolvedValue(mockMeasurement);

      const measurements = [
        { body_part: 'chest', value: 100 },
        { body_part: 'waist', value: 80 }
      ];
      const result = await saveService.saveMeasurement(testUserId, '2024-01-15', measurements);

      expect(result).toHaveProperty('id', 1);
      expect(result).toHaveProperty('date', '2024-01-15');
      expect(result.measurements).toEqual(measurements);
      expect(result.message).toContain('chest');
      expect(result.message).toContain('100cm');
    });

    it('should throw error for invalid userId', async () => {
      const measurements = [{ body_part: 'chest', value: 100 }];

      await expect(
        saveService.saveMeasurement(undefined as any, '2024-01-15', measurements)
      ).rejects.toThrow('无效的 userId');
    });

    it('should handle empty measurements array', async () => {
      const mockMeasurement = {
        id: 2,
        userId: testUserId,
        date: new Date(),
        createdAt: new Date(),
        deletedAt: null,
        items: []
      };
      mockMeasurementRepository.createWithItems.mockResolvedValue(mockMeasurement);

      const result = await saveService.saveMeasurement(testUserId, '2024-01-15', []);

      expect(result).toHaveProperty('id', 2);
      expect(result.measurements).toEqual([]);
      expect(result.message).toBe('已保存：');
    });
  });
});