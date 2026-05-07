import { describe, it, expect } from '@jest/globals';
import { chatHistoryService } from '../../../src/services/chatHistoryService';

// Mock repositories
jest.mock('../../../src/repositories/chatMessageRepository');

describe('ChatHistoryService', () => {
  describe('method existence', () => {
    it('should have saveMessage method', () => {
      expect(typeof chatHistoryService.saveMessage).toBe('function');
    });

    it('should have getMessages method', () => {
      expect(typeof chatHistoryService.getMessages).toBe('function');
    });
  });
});