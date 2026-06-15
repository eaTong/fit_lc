/**
 * Redis 单例
 * 用于分布式锁、缓存、Pub/Sub
 */

import Redis from 'ioredis';

let cached: Redis | null = null;

/**
 * 获取 Redis 单例
 * 优先使用 REDIS_URL，未配置时返回 null（让上游降级为本地锁）
 */
export function getRedis(): Redis | null {
  if (cached) return cached;
  const url = process.env.REDIS_URL;
  if (!url) {
    return null; // 无 Redis 配置，降级
  }
  cached = new Redis(url, {
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    lazyConnect: false,
    connectTimeout: 5000,
  });
  cached.on('error', (e) => console.error('[redis]', e.message));
  return cached;
}

export async function closeRedis(): Promise<void> {
  if (cached) {
    await cached.quit();
    cached = null;
  }
}

/**
 * 检查 Redis 是否可用
 */
export function isRedisEnabled(): boolean {
  return !!process.env.REDIS_URL;
}
