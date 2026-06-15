// @ts-nocheck
import { describe, it, expect, jest, beforeEach } from '@jest/globals';

// Mock dependencies before imports
const mockWithLock = jest.fn();
const mockGetByUserId = jest.fn();
const mockCreate = jest.fn();
const mockUpdateContextText = jest.fn();
const mockUpdateSnapshot = jest.fn();
const mockWorkoutFind = jest.fn();
const mockMeasurementFind = jest.fn();
const mockPlanFind = jest.fn();
const mockUserFind = jest.fn();
const mockCreateModel = jest.fn();

jest.mock('../../../src/infrastructure/distributedLock', () => ({
  withLock: mockWithLock,
}));

jest.mock('../../../src/repositories/userContextRepository', () => ({
  userContextRepository: {
    getByUserId: mockGetByUserId,
    create: mockCreate,
    updateContextText: mockUpdateContextText,
    updateSnapshot: mockUpdateSnapshot,
  },
}));

jest.mock('../../../src/repositories/workoutRepository', () => ({
  workoutRepository: {
    findByUserAndDateRange: mockWorkoutFind,
  },
}));

jest.mock('../../../src/repositories/measurementRepository', () => ({
  measurementRepository: {
    findByUserAndDateRange: mockMeasurementFind,
  },
}));

jest.mock('../../../src/repositories/planRepository', () => ({
  planRepository: {
    findActive: mockPlanFind,
  },
}));

jest.mock('../../../src/repositories/userRepository', () => ({
  userRepository: {
    findById: mockUserFind,
  },
}));

jest.mock('../../../src/agents/chatMiniMax', () => ({
  createModel: mockCreateModel,
}));

import { userContextService } from '../../../src/services/userContextService';

describe('userContextService - distributed lock', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('refreshContextWithLock', () => {
    it('should use withLock with correct key', async () => {
      mockWithLock.mockResolvedValueOnce(undefined);

      await userContextService.refreshContextWithLock(123, 'test dialogue');

      expect(mockWithLock).toHaveBeenCalledWith(
        'uc:lock:123',
        30_000,
        expect.any(Function),
        10_000
      );
    });

    it('should call inner refresh function', async () => {
      let innerFn: (() => Promise<any>) | undefined;
      mockWithLock.mockImplementationOnce(async (_key, _ttl, fn) => {
        innerFn = fn;
        return await fn();
      });

      mockGetByUserId.mockResolvedValueOnce({
        context_text: 'existing context',
      });
      mockCreateModel.mockReturnValueOnce({
        invoke: async () => ({ content: 'new context text' }),
      });

      await userContextService.refreshContextWithLock(456, 'I did squats');

      expect(innerFn).toBeDefined();
      expect(mockGetByUserId).toHaveBeenCalledWith(456);
      expect(mockUpdateContextText).toHaveBeenCalledWith(456, 'new context text');
    });

    it('should log warning when lock not acquired', async () => {
      mockWithLock.mockResolvedValueOnce(null);
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      await userContextService.refreshContextWithLock(789, 'test');

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Failed to acquire lock for user 789')
      );
      consoleSpy.mockRestore();
    });
  });

  describe('refreshContext', () => {
    it('should not run when no current context', async () => {
      mockGetByUserId.mockResolvedValueOnce(null);

      await userContextService.refreshContext(1, 'test');

      expect(mockUpdateContextText).not.toHaveBeenCalled();
    });
  });
});