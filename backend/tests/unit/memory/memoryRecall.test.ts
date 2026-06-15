// @ts-nocheck
import { describe, it, expect, jest, beforeEach } from '@jest/globals';

const mockSearch = jest.fn();
const mockAdd = jest.fn();
const mockGetAll = jest.fn();
const mockDelete = jest.fn();
const mockCleanup = jest.fn();

jest.mock('../../../src/memory/memoryStore', () => ({
  memoryStore: {
    search: mockSearch,
    add: mockAdd,
    getAll: mockGetAll,
    delete: mockDelete,
    cleanup: mockCleanup,
  },
}));

import { recallMemory, buildMemoryContext } from '../../../src/memory/memoryRecall';

describe('recallMemory', () => {
  beforeEach(() => {
    mockSearch.mockReset();
  });

  it('should return empty array when no memories', async () => {
    mockSearch.mockResolvedValueOnce({ memories: [], query: 'test' });
    const result = await recallMemory(1, 'test');
    expect(result).toEqual([]);
  });

  it('should call memoryStore.search with query', async () => {
    mockSearch.mockResolvedValueOnce({ memories: [], query: '膝盖' });
    await recallMemory(1, '膝盖受伤');
    expect(mockSearch).toHaveBeenCalledWith(1, '膝盖受伤', expect.any(Object));
  });

  it('should filter out low importance memories', async () => {
    mockSearch.mockResolvedValueOnce({
      memories: [
        { id: '1', userId: 1, type: 'semantic' as const, content: 'high', importance: 8 },
        { id: '2', userId: 1, type: 'semantic' as const, content: 'low', importance: 3 },
      ],
      query: 'test',
    });
    const result = await recallMemory(1, 'test', { minImportance: 5 });
    expect(result).toHaveLength(1);
    expect(result[0].content).toBe('high');
  });

  it('should respect limit option', async () => {
    mockSearch.mockResolvedValueOnce({ memories: [], query: 'test' });
    await recallMemory(1, 'test', { limit: 5 });
    expect(mockSearch).toHaveBeenCalledWith(1, 'test', { limit: 5 });
  });

  it('should filter by type when specified', async () => {
    mockSearch.mockResolvedValueOnce({
      memories: [
        { id: '1', userId: 1, type: 'episodic' as const, content: 'a', importance: 8 },
        { id: '2', userId: 1, type: 'semantic' as const, content: 'b', importance: 8 },
        { id: '3', userId: 1, type: 'episodic' as const, content: 'c', importance: 8 },
      ],
      query: 'test',
    });
    const result = await recallMemory(1, 'test', {
      minImportance: 5,
      types: ['episodic'],
    });
    expect(result).toHaveLength(2);
    expect(result.every(m => m.type === 'episodic')).toBe(true);
  });

  it('should return all types if types not specified', async () => {
    mockSearch.mockResolvedValueOnce({
      memories: [
        { id: '1', userId: 1, type: 'episodic' as const, content: 'a', importance: 8 },
        { id: '2', userId: 1, type: 'semantic' as const, content: 'b', importance: 8 },
        { id: '3', userId: 1, type: 'procedural' as const, content: 'c', importance: 8 },
      ],
      query: 'test',
    });
    const result = await recallMemory(1, 'test', { minImportance: 5 });
    expect(result).toHaveLength(3);
  });

  it('should use default limit=10', async () => {
    mockSearch.mockResolvedValueOnce({ memories: [], query: 'test' });
    await recallMemory(1, 'test');
    expect(mockSearch).toHaveBeenCalledWith(1, 'test', { limit: 10 });
  });

  it('should use default minImportance=5', async () => {
    mockSearch.mockResolvedValueOnce({
      memories: [
        { id: '1', userId: 1, type: 'semantic' as const, content: 'high-7', importance: 7 },
        { id: '2', userId: 1, type: 'semantic' as const, content: 'low-4', importance: 4 },
      ],
      query: 'test',
    });
    const result = await recallMemory(1, 'test');
    expect(result.map(m => m.content)).toEqual(['high-7']);
  });
});

describe('buildMemoryContext', () => {
  it('should return empty string for empty memories', () => {
    expect(buildMemoryContext([])).toBe('');
  });

  it('should throw on null (current behavior)', () => {
    // Current implementation doesn't handle null
    expect(() => buildMemoryContext(null as any)).toThrow();
  });

  it('should group episodic memories', () => {
    const result = buildMemoryContext([
      { id: '1', userId: 1, type: 'episodic', content: '上次膝盖受伤' },
    ]);
    expect(result).toContain('重要经历');
    expect(result).toContain('上次膝盖受伤');
  });

  it('should group semantic memories', () => {
    const result = buildMemoryContext([
      { id: '1', userId: 1, type: 'semantic', content: '不能做深蹲' },
    ]);
    expect(result).toContain('已知信息');
    expect(result).toContain('不能做深蹲');
  });

  it('should group procedural memories', () => {
    const result = buildMemoryContext([
      { id: '1', userId: 1, type: 'procedural', content: '习惯早上训练' },
    ]);
    expect(result).toContain('习惯偏好');
    expect(result).toContain('习惯早上训练');
  });

  it('should render all three groups when present', () => {
    const result = buildMemoryContext([
      { id: '1', userId: 1, type: 'episodic', content: 'e1' },
      { id: '2', userId: 1, type: 'semantic', content: 's1' },
      { id: '3', userId: 1, type: 'procedural', content: 'p1' },
    ]);
    expect(result).toContain('重要经历');
    expect(result).toContain('已知信息');
    expect(result).toContain('习惯偏好');
  });

  it('should render multiple memories in same group', () => {
    const result = buildMemoryContext([
      { id: '1', userId: 1, type: 'semantic', content: 'injury A' },
      { id: '2', userId: 1, type: 'semantic', content: 'injury B' },
    ]);
    expect(result).toContain('injury A');
    expect(result).toContain('injury B');
  });

  it('should use bullet points', () => {
    const result = buildMemoryContext([
      { id: '1', userId: 1, type: 'episodic', content: 'a' },
      { id: '2', userId: 1, type: 'episodic', content: 'b' },
    ]);
    expect(result).toMatch(/- a\n- b/);
  });
});