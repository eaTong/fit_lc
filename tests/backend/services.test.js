import { jest } from '@jest/globals';

// Mock repositories
const mockWorkoutRepo = {
  create: jest.fn(),
  addExercise: jest.fn(),
  findByUserAndDateRange: jest.fn()
};

const mockMeasurementRepo = {
  create: jest.fn(),
  addItem: jest.fn(),
  findByUserAndDateRange: jest.fn()
};

jest.unstable_mockModule('../src/repositories/workoutRepository.js', () => ({
  workoutRepository: mockWorkoutRepo
}));

jest.unstable_mockModule('../src/repositories/measurementRepository.js', () => ({
  measurementRepository: mockMeasurementRepo
}));

describe('Save Service', () => {
  let saveService;

  beforeAll(async () => {
    const module = await import('../src/services/saveService.js');
    saveService = module.saveService;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveWorkout', () => {
    it('should save workout with exercises', async () => {
      mockWorkoutRepo.create.mockResolvedValue(1);
      mockWorkoutRepo.addExercise.mockResolvedValue(1);

      const result = await saveService.saveWorkout(1, '2026-04-23', [
        { name: '深蹲', sets: 5, reps: 8, weight: 100 }
      ]);

      expect(result).toHaveProperty('id', 1);
      expect(result).toHaveProperty('message');
      expect(result.message).toContain('深蹲');
    });
  });

  describe('saveMeasurement', () => {
    it('should save measurement with items', async () => {
      mockMeasurementRepo.create.mockResolvedValue(1);
      mockMeasurementRepo.addItem.mockResolvedValue(1);

      const result = await saveService.saveMeasurement(1, '2026-04-23', [
        { body_part: 'chest', value: 94 },
        { body_part: 'waist', value: 78 }
      ]);

      expect(result).toHaveProperty('id', 1);
      expect(result.message).toContain('chest');
      expect(result.message).toContain('94cm');
    });
  });
});

describe('Query Service', () => {
  let queryService;

  beforeAll(async () => {
    const module = await import('../src/services/queryService.js');
    queryService = module.queryService;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('queryWorkouts', () => {
    it('should return formatted workout list', async () => {
      mockWorkoutRepo.findByUserAndDateRange.mockResolvedValue([
        { id: 1, date: '2026-04-23', exercise_name: '跑步', duration: 30, distance: 5 },
        { id: 1, date: '2026-04-23', exercise_name: '深蹲', sets: 5, reps: 8, weight: 100 }
      ]);

      const result = await queryService.queryWorkouts(1, '2026-04-01', '2026-04-30');

      expect(result).toContain('2026-04-23');
      expect(result).toContain('跑步');
      expect(result).toContain('深蹲');
    });

    it('should return "暂无训练记录" when empty', async () => {
      mockWorkoutRepo.findByUserAndDateRange.mockResolvedValue([]);

      const result = await queryService.queryWorkouts(1, '2026-04-01', '2026-04-30');

      expect(result).toBe('暂无训练记录');
    });
  });

  describe('queryMeasurements', () => {
    it('should return formatted measurement list with data', async () => {
      mockMeasurementRepo.findByUserAndDateRange.mockResolvedValue([
        { id: 1, date: '2026-04-23', body_part: 'chest', value: 94 },
        { id: 1, date: '2026-04-23', body_part: 'waist', value: 78 }
      ]);

      const result = await queryService.queryMeasurements(1, '2026-04-01', '2026-04-30');

      expect(result).toContain('2026-04-23');
      expect(result).toContain('chest');
      expect(result).toContain('waist');
    });

    it('should return "暂无围度记录" when empty', async () => {
      mockMeasurementRepo.findByUserAndDateRange.mockResolvedValue([]);

      const result = await queryService.queryMeasurements(1, '2026-04-01', '2026-04-30');

      expect(result).toBe('暂无围度记录');
    });
  });
});