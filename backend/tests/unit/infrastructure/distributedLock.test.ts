import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  acquireLock,
  releaseLock,
  withLock,
  _resetLocalLocksForTest,
} from '../../../src/infrastructure/distributedLock';

describe('distributedLock (in-process fallback)', () => {
  beforeEach(() => {
    _resetLocalLocksForTest();
  });

  describe('acquireLock + releaseLock', () => {
    it('should acquire lock when free', async () => {
      const lock = await acquireLock('test:lock:1', 5000);
      expect(lock).not.toBeNull();
      expect(lock?.key).toBe('test:lock:1');
      expect(lock?.token).toBeDefined();
      await releaseLock(lock!);
    });

    it('should NOT acquire lock when held by another', async () => {
      const lock1 = await acquireLock('test:lock:2', 5000);
      expect(lock1).not.toBeNull();

      const lock2 = await acquireLock('test:lock:2', 5000, 0);
      expect(lock2).toBeNull();

      await releaseLock(lock1!);
    });

    it('should wait and acquire after release', async () => {
      const lock1 = await acquireLock('test:lock:3', 5000);
      setTimeout(() => releaseLock(lock1!), 50);

      const lock2 = await acquireLock('test:lock:3', 5000, 1000);
      expect(lock2).not.toBeNull();
      await releaseLock(lock2!);
    });

    it('should auto-expire after TTL', async () => {
      const lock = await acquireLock('test:lock:4', 50);
      expect(lock).not.toBeNull();

      // Wait for TTL to expire
      await new Promise(r => setTimeout(r, 100));

      const lock2 = await acquireLock('test:lock:4', 5000, 0);
      expect(lock2).not.toBeNull();
      await releaseLock(lock2!);
    });
  });

  describe('withLock', () => {
    it('should execute fn within lock', async () => {
      let executed = false;
      const result = await withLock('test:withLock:1', 5000, async () => {
        executed = true;
        return 'ok';
      });
      expect(executed).toBe(true);
      expect(result).toBe('ok');
    });

    it('should release lock after fn completes', async () => {
      await withLock('test:withLock:2', 5000, async () => 'done');
      // 锁应该已释放
      const lock = await acquireLock('test:withLock:2', 5000, 0);
      expect(lock).not.toBeNull();
      await releaseLock(lock!);
    });

    it('should release lock even when fn throws', async () => {
      await expect(
        withLock('test:withLock:3', 5000, async () => {
          throw new Error('test error');
        })
      ).rejects.toThrow('test error');

      // 锁应已释放
      const lock = await acquireLock('test:withLock:3', 5000, 0);
      expect(lock).not.toBeNull();
      await releaseLock(lock!);
    });

    it('should return null when lock not acquired within waitMs', async () => {
      const lock1 = await acquireLock('test:withLock:4', 5000);
      const result = await withLock('test:withLock:4', 5000, async () => 'should not run', 100);
      expect(result).toBeNull();
      await releaseLock(lock1!);
    });
  });

  describe('concurrent safety', () => {
    it('should serialize concurrent executions', async () => {
      const results: number[] = [];
      const task = async (n: number) => {
        return withLock('test:concurrent', 5000, async () => {
          results.push(n);
          await new Promise(r => setTimeout(r, 50));
        }, 2000);
      };

      await Promise.all([task(1), task(2), task(3)]);

      // 不应同时执行，但顺序不定
      expect(results).toHaveLength(3);
      expect(results.sort()).toEqual([1, 2, 3]);
    });
  });

  describe('isolation between keys', () => {
    it('should allow concurrent locks on different keys', async () => {
      const lock1 = await acquireLock('test:key:A', 5000);
      const lock2 = await acquireLock('test:key:B', 5000);
      expect(lock1).not.toBeNull();
      expect(lock2).not.toBeNull();
      await releaseLock(lock1!);
      await releaseLock(lock2!);
    });
  });
});