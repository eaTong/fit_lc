import { describe, it, expect, beforeEach } from '@jest/globals';
import { exerciseRepository } from '../../../src/repositories/exerciseRepository';

// Mock the prisma module before importing repository
jest.mock('../../../src/config/prisma', () => ({
  __esModule: true,
  default: {
    exercise: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    exerciseMuscle: {
      create: jest.fn(),
      deleteMany: jest.fn(),
      findMany: jest.fn(),
    },
    muscle: {
      create: jest.fn(),
    },
  },
}));

// Import after mock
import { default as prisma } from '../../../src/config/prisma';

describe('ExerciseRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return paginated exercises', async () => {
      const mockExercises = [
        { id: 1, name: 'Bench Press', category: 'chest', muscles: [] },
        { id: 2, name: 'Squat', category: 'legs', muscles: [] },
      ];

      (prisma.exercise.findMany as jest.Mock).mockResolvedValue(mockExercises);
      (prisma.exercise.count as jest.Mock).mockResolvedValue(2);

      const result = await exerciseRepository.findAll();

      expect(result.exercises).toBeDefined();
      expect(result.pagination).toBeDefined();
      expect(result.pagination.total).toBe(2);
    });

    it('should filter by category', async () => {
      const mockExercises = [
        { id: 1, name: 'Bench Press', category: 'chest', muscles: [] },
      ];

      (prisma.exercise.findMany as jest.Mock).mockResolvedValue(mockExercises);
      (prisma.exercise.count as jest.Mock).mockResolvedValue(1);

      const result = await exerciseRepository.findAll({ category: 'chest' });

      expect(result.exercises).toHaveLength(1);
      expect(result.exercises[0].category).toBe('chest');
    });

    it('should filter by equipment', async () => {
      const mockExercises = [
        { id: 1, name: 'Bench Press', equipment: 'barbell', muscles: [] },
      ];

      (prisma.exercise.findMany as jest.Mock).mockResolvedValue(mockExercises);
      (prisma.exercise.count as jest.Mock).mockResolvedValue(1);

      const result = await exerciseRepository.findAll({ equipment: 'barbell' });

      expect(result.exercises).toHaveLength(1);
      expect(result.exercises[0].equipment).toBe('barbell');
    });

    it('should filter by difficulty', async () => {
      const mockExercises = [
        { id: 1, name: 'Easy Exercise', difficulty: 'beginner', muscles: [] },
      ];

      (prisma.exercise.findMany as jest.Mock).mockResolvedValue(mockExercises);
      (prisma.exercise.count as jest.Mock).mockResolvedValue(1);

      const result = await exerciseRepository.findAll({ difficulty: 'beginner' });

      expect(result.exercises).toHaveLength(1);
      expect(result.exercises[0].difficulty).toBe('beginner');
    });

    it('should paginate results', async () => {
      const mockExercises = [
        { id: 1, name: 'Exercise 1', muscles: [] },
        { id: 2, name: 'Exercise 2', muscles: [] },
      ];

      (prisma.exercise.findMany as jest.Mock).mockResolvedValue(mockExercises);
      (prisma.exercise.count as jest.Mock).mockResolvedValue(5);

      const result = await exerciseRepository.findAll({ page: 1, pageSize: 2 });

      expect(result.exercises).toHaveLength(2);
      expect(result.pagination.page).toBe(1);
      expect(result.pagination.pageSize).toBe(2);
      expect(result.pagination.totalPages).toBe(3);
    });
  });

  describe('findById', () => {
    it('should find exercise by id with muscles and variants', async () => {
      const mockExercise = {
        id: 1,
        name: 'Bench Press',
        category: 'chest',
        muscles: [],
        variants: [],
      };

      (prisma.exercise.findUnique as jest.Mock).mockResolvedValue(mockExercise);

      const found = await exerciseRepository.findById(1);

      expect(prisma.exercise.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          muscles: { include: { muscle: true } },
          variants: {
            select: {
              id: true,
              variantId: true,
              variantType: true,
              differenceNotes: true,
              variant: { select: { id: true, name: true } },
            },
          },
        },
      });
      expect(found).toBeDefined();
      expect(found?.id).toBe(1);
    });

    it('should return null for non-existent id', async () => {
      (prisma.exercise.findUnique as jest.Mock).mockResolvedValue(null);

      const found = await exerciseRepository.findById(999999);

      expect(found).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new exercise', async () => {
      const mockExercise = {
        id: 1,
        name: 'New Exercise',
        category: 'chest',
        equipment: 'barbell',
        difficulty: 'intermediate',
      };

      (prisma.exercise.create as jest.Mock).mockResolvedValue(mockExercise);

      const data = {
        name: 'New Exercise',
        category: 'chest',
        equipment: 'barbell',
        difficulty: 'intermediate',
        description: 'A great exercise',
      };

      const exercise = await exerciseRepository.create(data);

      expect(prisma.exercise.create).toHaveBeenCalled();
      expect(exercise).toBeDefined();
      expect(exercise.name).toBe(data.name);
    });

    it('should create exercise with tags', async () => {
      const mockExercise = {
        id: 1,
        name: 'Tagged Exercise',
        tags: '["mass","strength"]',
      };

      (prisma.exercise.create as jest.Mock).mockResolvedValue(mockExercise);

      const data = {
        name: 'Tagged Exercise',
        category: 'back',
        equipment: 'cable',
        difficulty: 'beginner',
        tags: ['mass', 'strength'],
      };

      const exercise = await exerciseRepository.create(data);

      expect(prisma.exercise.create).toHaveBeenCalled();
      expect(exercise).toBeDefined();
    });
  });

  describe('update', () => {
    it('should update exercise fields', async () => {
      const mockExercise = {
        id: 1,
        name: 'New Name',
        difficulty: 'advanced',
      };

      (prisma.exercise.update as jest.Mock).mockResolvedValue(mockExercise);

      const updated = await exerciseRepository.update(1, {
        name: 'New Name',
        difficulty: 'advanced',
      });

      expect(prisma.exercise.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { name: 'New Name', difficulty: 'advanced' },
      });
      expect(updated.name).toBe('New Name');
    });

    it('should update tags', async () => {
      const mockExercise = {
        id: 1,
        tags: '["new-tag"]',
      };

      (prisma.exercise.update as jest.Mock).mockResolvedValue(mockExercise);

      await exerciseRepository.update(1, { tags: ['new-tag'] });

      expect(prisma.exercise.update).toHaveBeenCalled();
    });

    it('should throw error for non-existent exercise', async () => {
      (prisma.exercise.update as jest.Mock).mockRejectedValue(new Error('Record not found'));

      await expect(exerciseRepository.update(999999, { name: 'Test' })).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('should delete an exercise', async () => {
      const mockExercise = { id: 1, name: 'To Delete' };

      (prisma.exercise.delete as jest.Mock).mockResolvedValue(mockExercise);

      const deleted = await exerciseRepository.delete(1);

      expect(prisma.exercise.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(deleted).toBeDefined();
    });
  });

  describe('addMuscle', () => {
    it('should add muscle to exercise', async () => {
      const mockExerciseMuscle = {
        id: 1,
        exerciseId: 1,
        muscleId: 1,
        role: 'primary',
      };

      (prisma.exerciseMuscle.create as jest.Mock).mockResolvedValue(mockExerciseMuscle);

      const result = await exerciseRepository.addMuscle(1, 1, 'primary');

      expect(result).toBeDefined();
    });
  });

  describe('removeMuscle', () => {
    it('should remove muscle from exercise', async () => {
      (prisma.exerciseMuscle.deleteMany as jest.Mock).mockResolvedValue({ count: 1 });

      const result = await exerciseRepository.removeMuscle(1, 1);

      expect(result.count).toBe(1);
    });
  });

  describe('getMusclesByExerciseId', () => {
    it('should return muscles for an exercise', async () => {
      const mockMuscles = [
        { id: 1, muscleId: 1, muscle: { name: 'Chest' } },
      ];

      (prisma.exerciseMuscle.findMany as jest.Mock).mockResolvedValue(mockMuscles);

      const muscles = await exerciseRepository.getMusclesByExerciseId(1);

      expect(muscles).toHaveLength(1);
    });
  });
});