import { describe, it, expect, jest } from '@jest/globals';
import { chunkBySentence, sleep } from '../../../src/agents/streamChunker';

describe('chunkBySentence', () => {
  it('should yield empty for empty input', () => {
    const chunks = Array.from(chunkBySentence(''));
    expect(chunks).toEqual([]);
  });

  it('should yield whole text if smaller than chunk size', () => {
    const chunks = Array.from(chunkBySentence('hi', 20));
    expect(chunks.join('')).toBe('hi');
  });

  it('should yield at least one chunk for non-empty text', () => {
    const text = 'abcdefghijklmnopqrstuvwxyz';
    const chunks = Array.from(chunkBySentence(text, 10));
    expect(chunks.length).toBeGreaterThan(0);
  });

  it('should keep punctuation attached to preceding text', () => {
    const chunks = Array.from(chunkBySentence('你好。', 20));
    const joined = chunks.join('');
    // 。 should not be split from 你好
    expect(joined).toBe('你好。');
  });

  it('should handle Chinese periods (。)', () => {
    const chunks = Array.from(chunkBySentence('第一句。第二句。', 20));
    const joined = chunks.join('');
    expect(joined).toBe('第一句。第二句。');
  });

  it('should handle exclamation (！)', () => {
    const chunks = Array.from(chunkBySentence('哇！好棒！', 20));
    const joined = chunks.join('');
    expect(joined).toBe('哇！好棒！');
  });

  it('should handle question marks (？)', () => {
    const chunks = Array.from(chunkBySentence('是吗？你确定？', 20));
    const joined = chunks.join('');
    expect(joined).toBe('是吗？你确定？');
  });

  it('should handle semicolons (；)', () => {
    const chunks = Array.from(chunkBySentence('一；二；三', 20));
    const joined = chunks.join('');
    expect(joined).toBe('一；二；三');
  });

  it('should handle newlines (\\n)', () => {
    const chunks = Array.from(chunkBySentence('第一行\n第二行', 20));
    const joined = chunks.join('');
    expect(joined).toBe('第一行\n第二行');
  });

  it('should preserve all content for long text', () => {
    const text = '一二三四五六七八九十一二三四五六七八九十';
    const chunks = Array.from(chunkBySentence(text, 5));
    const joined = chunks.join('');
    expect(joined).toBe(text);
  });

  it('should preserve all content (no chars lost)', () => {
    const text = '一二三四五六七八九十。十一十二十三十四十五。';
    const chunks = Array.from(chunkBySentence(text, 5));
    const joined = chunks.join('');
    expect(joined).toBe(text);
  });

  it('should handle mixed punctuation and ASCII', () => {
    const text = 'Hello world. 你好世界。';
    const chunks = Array.from(chunkBySentence(text, 20));
    const joined = chunks.join('');
    expect(joined).toBe('Hello world. 你好世界。');
  });

  it('should handle text with no punctuation', () => {
    const chunks = Array.from(chunkBySentence('一二三四五六七八九十', 5));
    const joined = chunks.join('');
    expect(joined).toBe('一二三四五六七八九十');
  });
});

describe('sleep', () => {
  it('should resolve after specified ms', async () => {
    const start = Date.now();
    await sleep(50);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(45); // Allow 5ms tolerance
  });

  it('should return a Promise', () => {
    const result = sleep(10);
    expect(result).toBeInstanceOf(Promise);
  });

  it('should handle 0 ms', async () => {
    await expect(sleep(0)).resolves.toBeUndefined();
  });

  it('should use setTimeout under the hood', async () => {
    const spy = jest.spyOn(global, 'setTimeout');
    await sleep(0);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});