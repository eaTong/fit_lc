/**
 * @jest-environment node
 */
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';

describe('chatMiniMax timeout configuration', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env.AI_PROVIDER = 'minimax';
    process.env.MINIMAX_API_KEY = 'test-key';
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('createMiniMaxModel 应配置 timeout=30000', async () => {
    const { createMiniMaxModel } = await import('../../../src/agents/chatMiniMax');
    const model = createMiniMaxModel();

    // ChatOpenAI 把 timeout 存到 model.timeout（顶层）和 model.lc_kwargs.timeout
    const timeout = (model as any).timeout ?? (model as any).lc_kwargs?.timeout;
    expect(timeout).toBe(30_000);
  });

  it('createMiniMaxModel 应配置 maxRetries=2', async () => {
    const { createMiniMaxModel } = await import('../../../src/agents/chatMiniMax');
    const model = createMiniMaxModel();

    // LangChain v1.x 把 maxRetries 存到 lc_kwargs（底层 OpenAI client 透传）
    const retries = (model as any).maxRetries ?? (model as any).lc_kwargs?.maxRetries;
    expect(retries).toBe(2);
  });
});
