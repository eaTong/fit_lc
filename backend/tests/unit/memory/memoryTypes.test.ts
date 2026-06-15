import { describe, it, expect } from '@jest/globals';
import { MemoryTypeSchema, MemorySchema, type Memory } from '../../../src/memory/memoryTypes';

describe('memoryTypes', () => {
  describe('MemoryTypeSchema', () => {
    it.each(['episodic', 'semantic', 'procedural'])('accepts %s', (type) => {
      expect(MemoryTypeSchema.parse(type)).toBe(type);
    });

    it('rejects unknown type', () => {
      expect(() => MemoryTypeSchema.parse('unknown')).toThrow();
    });
  });

  describe('MemorySchema', () => {
    const validMemory: Memory = {
      userId: 1,
      type: 'semantic',
      content: 'user cannot do squats',
      importance: 7,
    };

    it('accepts valid memory', () => {
      expect(() => MemorySchema.parse(validMemory)).not.toThrow();
    });

    it('applies default importance 5', () => {
      const result = MemorySchema.parse({ ...validMemory, importance: undefined });
      expect(result.importance).toBe(5);
    });

    it('rejects importance > 10', () => {
      expect(() => MemorySchema.parse({ ...validMemory, importance: 11 })).toThrow();
    });

    it('rejects importance < 1', () => {
      expect(() => MemorySchema.parse({ ...validMemory, importance: 0 })).toThrow();
    });

    it('accepts importance at boundaries', () => {
      expect(() => MemorySchema.parse({ ...validMemory, importance: 1 })).not.toThrow();
      expect(() => MemorySchema.parse({ ...validMemory, importance: 10 })).not.toThrow();
    });

    it('requires userId', () => {
      const { userId, ...noUser } = validMemory;
      expect(() => MemorySchema.parse(noUser)).toThrow();
    });

    it('requires content', () => {
      const { content, ...noContent } = validMemory;
      expect(() => MemorySchema.parse(noContent)).toThrow();
    });

    it('accepts optional id and dates', () => {
      const withOptionals: Memory = {
        ...validMemory,
        id: 'mem-1',
        createdAt: '2026-06-15T10:00:00Z',
        expiresAt: '2027-06-15T10:00:00Z',
      };
      expect(() => MemorySchema.parse(withOptionals)).not.toThrow();
    });
  });
});