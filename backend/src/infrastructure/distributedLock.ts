/**
 * 分布式锁（基于 Redis SET NX EX + Lua 释放）
 * Fallback 到进程内锁（无 Redis 时）
 */

import { randomBytes } from 'crypto';
import { getRedis, isRedisEnabled } from './redis';

// 进程内锁（fallback）
const localLocks = new Map<string, { token: string; expiresAt: number }>();

const RELEASE_LUA = `
if redis.call("get", KEYS[1]) == ARGV[1] then
  return redis.call("del", KEYS[1])
else
  return 0
end`;

export interface LockHandle {
  key: string;
  token: string;
  release: () => Promise<boolean>;
}

/**
 * 尝试获取锁，立即返回（不等待）
 */
async function tryAcquireRedis(key: string, token: string, ttlMs: number): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;
  const ok = await redis.set(key, token, 'PX', ttlMs, 'NX');
  return ok === 'OK';
}

/**
 * 释放 Redis 锁（仅当 token 匹配时）
 */
async function releaseRedis(key: string, token: string): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;
  const r = (await redis.eval(RELEASE_LUA, 1, key, token)) as number;
  return r === 1;
}

/**
 * 获取锁
 * @param key 锁 key
 * @param ttlMs 锁过期时间（防止死锁）
 * @param waitMs 最长等待时间（0 = 立即返回）
 */
export async function acquireLock(
  key: string,
  ttlMs: number,
  waitMs = 0,
  pollMs = 50
): Promise<LockHandle | null> {
  const token = randomBytes(12).toString('hex');
  const start = Date.now();

  if (isRedisEnabled()) {
    // Redis 模式
    while (true) {
      if (await tryAcquireRedis(key, token, ttlMs)) {
        return {
          key,
          token,
          release: async () => releaseRedis(key, token),
        };
      }
      if (Date.now() - start >= waitMs) return null;
      await new Promise((r) => setTimeout(r, pollMs));
    }
  }

  // 进程内模式（fallback）
  while (true) {
    const existing = localLocks.get(key);
    if (!existing || existing.expiresAt < Date.now()) {
      localLocks.set(key, { token, expiresAt: Date.now() + ttlMs });
      return {
        key,
        token,
        release: async () => {
          const e = localLocks.get(key);
          if (e && e.token === token) {
            localLocks.delete(key);
            return true;
          }
          return false;
        },
      };
    }
    if (Date.now() - start >= waitMs) return null;
    await new Promise((r) => setTimeout(r, pollMs));
  }
}

/**
 * 释放锁
 */
export async function releaseLock(h: LockHandle): Promise<boolean> {
  return h.release();
}

/**
 * 在锁内执行函数
 * 获取失败返回 null
 */
export async function withLock<T>(
  key: string,
  ttlMs: number,
  fn: () => Promise<T>,
  waitMs = 5000
): Promise<T | null> {
  const lock = await acquireLock(key, ttlMs, waitMs);
  if (!lock) return null;
  try {
    return await fn();
  } finally {
    await releaseLock(lock);
  }
}

/**
 * 测试用：清理所有进程内锁
 */
export function _resetLocalLocksForTest() {
  localLocks.clear();
}