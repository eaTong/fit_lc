import { describe, it, expect } from '@jest/globals';
import { chatMessageRepository } from '../../../src/repositories/chatMessageRepository';

describe('ChatMessageRepository', () => {
  it('should be importable', () => {
    expect(chatMessageRepository).toBeDefined();
  });

  it('should have create method', () => {
    expect(typeof chatMessageRepository.create).toBe('function');
  });

  it('should have getRecentMessages method', () => {
    expect(typeof chatMessageRepository.getRecentMessages).toBe('function');
  });
});