import { describe, it, expect } from '@jest/globals';
import {
  PlanStatus,
  ExerciseDifficulty,
  ExerciseCategory,
  Equipment,
  UserGoal,
  UserExperience,
  ExecutionStatus
} from '../../../src/constants';

describe('constants', () => {
  describe('PlanStatus', () => {
    it('should have correct values', () => {
      expect(PlanStatus.DRAFT).toBe('draft');
      expect(PlanStatus.ACTIVE).toBe('active');
      expect(PlanStatus.COMPLETED).toBe('completed');
      expect(PlanStatus.PAUSED).toBe('paused');
    });

    it('should have 4 values', () => {
      expect(Object.values(PlanStatus)).toHaveLength(4);
    });
  });

  describe('ExerciseDifficulty', () => {
    it('should have correct values', () => {
      expect(ExerciseDifficulty.BEGINNER).toBe('beginner');
      expect(ExerciseDifficulty.INTERMEDIATE).toBe('intermediate');
      expect(ExerciseDifficulty.ADVANCED).toBe('advanced');
    });

    it('should have 3 values', () => {
      expect(Object.values(ExerciseDifficulty)).toHaveLength(3);
    });
  });

  describe('ExerciseCategory', () => {
    it('should have correct values', () => {
      expect(ExerciseCategory.CHEST).toBe('chest');
      expect(ExerciseCategory.BACK).toBe('back');
      expect(ExerciseCategory.LEGS).toBe('legs');
      expect(ExerciseCategory.SHOULDERS).toBe('shoulders');
      expect(ExerciseCategory.ARMS).toBe('arms');
      expect(ExerciseCategory.CORE).toBe('core');
    });

    it('should have 6 values', () => {
      expect(Object.values(ExerciseCategory)).toHaveLength(6);
    });
  });

  describe('Equipment', () => {
    it('should have correct values', () => {
      expect(Equipment.BARBELL).toBe('barbell');
      expect(Equipment.DUMBBELL).toBe('dumbbell');
      expect(Equipment.CABLE).toBe('cable');
      expect(Equipment.MACHINE).toBe('machine');
      expect(Equipment.BODYWEIGHT).toBe('bodyweight');
      expect(Equipment.KETTLEBELL).toBe('kettlebell');
      expect(Equipment.BANDS).toBe('bands');
      expect(Equipment.OTHER).toBe('other');
    });

    it('should have 8 values', () => {
      expect(Object.values(Equipment)).toHaveLength(8);
    });
  });

  describe('UserGoal', () => {
    it('should have correct values', () => {
      expect(UserGoal.BULK).toBe('bulk');
      expect(UserGoal.CUT).toBe('cut');
      expect(UserGoal.MAINTAIN).toBe('maintain');
    });

    it('should have 3 values', () => {
      expect(Object.values(UserGoal)).toHaveLength(3);
    });
  });

  describe('UserExperience', () => {
    it('should have correct values', () => {
      expect(UserExperience.BEGINNER).toBe('beginner');
      expect(UserExperience.INTERMEDIATE).toBe('intermediate');
      expect(UserExperience.ADVANCED).toBe('advanced');
    });

    it('should match ExerciseDifficulty values', () => {
      expect(UserExperience.BEGINNER).toBe(ExerciseDifficulty.BEGINNER);
      expect(UserExperience.INTERMEDIATE).toBe(ExerciseDifficulty.INTERMEDIATE);
      expect(UserExperience.ADVANCED).toBe(ExerciseDifficulty.ADVANCED);
    });
  });

  describe('ExecutionStatus', () => {
    it('should have correct values', () => {
      expect(ExecutionStatus.PENDING).toBe('pending');
      expect(ExecutionStatus.COMPLETED).toBe('completed');
      expect(ExecutionStatus.SKIPPED).toBe('skipped');
    });

    it('should have 3 values', () => {
      expect(Object.values(ExecutionStatus)).toHaveLength(3);
    });
  });
});
