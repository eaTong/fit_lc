import { jest } from '@jest/globals';

// Mock pool
const mockPool = {
  execute: jest.fn()
};

jest.unstable_mockModule('../src/config/database.js', () => ({
  default: mockPool
}));

describe('Measurement Repository', () => {
  let measurementRepository;

  beforeAll(async () => {
    const module = await import('../src/repositories/measurementRepository.js');
    measurementRepository = module.measurementRepository;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should insert measurement and return id', async () => {
      mockPool.execute.mockResolvedValue([{ insertId: 42 }]);

      const id = await measurementRepository.create(1, '2026-04-23');

      expect(mockPool.execute).toHaveBeenCalledWith(
        'INSERT INTO body_measurements (user_id, date) VALUES (?, ?)',
        [1, '2026-04-23']
      );
      expect(id).toBe(42);
    });
  });

  describe('findById', () => {
    it('should return measurement when found', async () => {
      const mockMeasurement = { id: 1, user_id: 1, date: '2026-04-23', deleted_at: null };
      mockPool.execute.mockResolvedValue([[mockMeasurement]]);

      const result = await measurementRepository.findById(1);

      expect(result).toEqual(mockMeasurement);
      expect(mockPool.execute).toHaveBeenCalledWith(
        'SELECT * FROM body_measurements WHERE id = ? AND deleted_at IS NULL',
        [1]
      );
    });

    it('should return null when not found', async () => {
      mockPool.execute.mockResolvedValue([[]]);

      const result = await measurementRepository.findById(999);

      expect(result).toBeNull();
    });
  });

  describe('softDelete', () => {
    it('should set deleted_at and return true', async () => {
      mockPool.execute.mockResolvedValue([{ affectedRows: 1 }]);

      const result = await measurementRepository.softDelete(1);

      expect(result).toBe(true);
      expect(mockPool.execute).toHaveBeenCalledWith(
        'UPDATE body_measurements SET deleted_at = NOW() WHERE id = ?',
        [1]
      );
    });

    it('should return false if not found', async () => {
      mockPool.execute.mockResolvedValue([{ affectedRows: 0 }]);

      const result = await measurementRepository.softDelete(999);

      expect(result).toBe(false);
    });
  });

  describe('addItem', () => {
    it('should add item to measurement and return id', async () => {
      const mockMeasurement = { id: 1, user_id: 1, date: '2026-04-23', deleted_at: null };
      mockPool.execute
        .mockResolvedValueOnce([[mockMeasurement]])
        .mockResolvedValueOnce([{ insertId: 10 }]);

      const itemId = await measurementRepository.addItem(1, 'weight', 75.5);

      expect(itemId).toBe(10);
      expect(mockPool.execute).toHaveBeenCalledTimes(2);
    });

    it('should throw error if measurement not found', async () => {
      mockPool.execute.mockResolvedValue([[]]);

      await expect(measurementRepository.addItem(999, 'weight', 75.5))
        .rejects.toThrow('Measurement not found or has been deleted');
    });
  });
});

describe('Workout Repository', () => {
  let workoutRepository;

  beforeAll(async () => {
    const module = await import('../src/repositories/workoutRepository.js');
    workoutRepository = module.workoutRepository;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should insert workout and return id', async () => {
      mockPool.execute.mockResolvedValue([{ insertId: 42 }]);

      const id = await workoutRepository.create(1, '2026-04-23');

      expect(mockPool.execute).toHaveBeenCalledWith(
        'INSERT INTO workouts (user_id, date) VALUES (?, ?)',
        [1, '2026-04-23']
      );
      expect(id).toBe(42);
    });
  });

  describe('findByUserAndDateRange', () => {
    it('should return workouts within date range', async () => {
      const mockRows = [
        { id: 1, user_id: 1, date: '2026-04-20', exercise_name: '深蹲', sets: 5, reps: 8 },
        { id: 2, user_id: 1, date: '2026-04-19', exercise_name: '跑步', duration: 30 }
      ];
      mockPool.execute.mockResolvedValue([mockRows]);

      const result = await workoutRepository.findByUserAndDateRange(1, '2026-04-01', '2026-04-30');

      expect(result).toHaveLength(2);
      expect(result[0].exercise_name).toBe('深蹲');
    });
  });

  describe('softDelete', () => {
    it('should set deleted_at and return true', async () => {
      mockPool.execute.mockResolvedValue([{ affectedRows: 1 }]);

      const result = await workoutRepository.softDelete(1);

      expect(result).toBe(true);
    });

    it('should return false if not found', async () => {
      mockPool.execute.mockResolvedValue([{ affectedRows: 0 }]);

      const result = await workoutRepository.softDelete(999);

      expect(result).toBe(false);
    });
  });

  describe('addExercise', () => {
    it('should add exercise to workout and return id', async () => {
      const mockWorkout = { id: 1, user_id: 1, date: '2026-04-23', deleted_at: null };
      mockPool.execute
        .mockResolvedValueOnce([[mockWorkout]])
        .mockResolvedValueOnce([{ insertId: 10 }]);

      const exerciseId = await workoutRepository.addExercise(1, { name: '深蹲', sets: 3, reps: 10 });

      expect(exerciseId).toBe(10);
      expect(mockPool.execute).toHaveBeenCalledTimes(2);
    });

    it('should throw error if workout not found', async () => {
      mockPool.execute.mockResolvedValue([[]]);

      await expect(workoutRepository.addExercise(999, { name: '深蹲' }))
        .rejects.toThrow('Workout not found or has been deleted');
    });
  });
});