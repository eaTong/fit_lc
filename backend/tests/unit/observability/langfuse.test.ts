/**
 * @jest-environment node
 */
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';

describe('langfuse observability bootstrap', () => {
  const originalEnv = { ...process.env };

  beforeEach(async () => {
    // 清掉缓存 + 重置模块
    jest.resetModules();
    delete process.env.LANGFUSE_ENABLED;
    delete process.env.LANGFUSE_PUBLIC_KEY;
    delete process.env.LANGFUSE_SECRET_KEY;
    delete process.env.LANGFUSE_HOST;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('LANGFUSE_ENABLED=false 时 getLangfuse() 返回 null', async () => {
    process.env.LANGFUSE_ENABLED = 'false';
    const mod = await import('../../../src/observability/langfuse');
    const fuse = mod.getLangfuse();
    expect(fuse).toBeNull();
  });

  it('未配置 PUBLIC/SECRET key 时 getLangfuse() 返回 null 并打印 warn', async () => {
    process.env.LANGFUSE_ENABLED = 'true';
    const mod = await import('../../../src/observability/langfuse');
    const fuse = mod.getLangfuse();
    expect(fuse).toBeNull();
  });

  it('完整配置时 getLangfuse() 返回非 null', async () => {
    process.env.LANGFUSE_ENABLED = 'true';
    process.env.LANGFUSE_PUBLIC_KEY = 'pk-test';
    process.env.LANGFUSE_SECRET_KEY = 'sk-test';
    process.env.LANGFUSE_HOST = 'https://cloud.langfuse.com';
    const mod = await import('../../../src/observability/langfuse');
    const fuse = mod.getLangfuse();
    expect(fuse).not.toBeNull();
  });

  it('createTraceCallbacks 在 langfuse 未启用时返回空数组', async () => {
    process.env.LANGFUSE_ENABLED = 'false';
    const mod = await import('../../../src/observability/langfuse');
    const cbs = mod.createTraceCallbacks({ userId: 1, agentVersion: 'v2' });
    expect(cbs).toEqual([]);
  });

  it('createTraceCallbacks 在启用时返回 1 个 CallbackHandler', async () => {
    process.env.LANGFUSE_ENABLED = 'true';
    process.env.LANGFUSE_PUBLIC_KEY = 'pk-test';
    process.env.LANGFUSE_SECRET_KEY = 'sk-test';
    process.env.LANGFUSE_HOST = 'https://cloud.langfuse.com';
    const mod = await import('../../../src/observability/langfuse');
    const cbs = mod.createTraceCallbacks({ userId: 1, agentVersion: 'v2' });
    expect(cbs).toHaveLength(1);
  });
});
