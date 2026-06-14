/**
 * @jest-environment node
 */
import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';

describe('chatMiniMax model name', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('createMiniMaxModel 应使用 aiConfig.getModelName("chat") 作为 model', async () => {
    process.env.AI_PROVIDER = 'minimax';
    process.env.MINIMAX_API_KEY = 'test-key';
    delete process.env.MINIMAX_CHAT_MODEL; // 用默认值
    delete process.env.AI_MODEL_NAME;

    const { createMiniMaxModel } = await import('../../../src/agents/chatMiniMax');
    const { getModelName } = await import('../../../src/config/aiConfig');

    const model = createMiniMaxModel();
    // ChatOpenAI 的 model 字段（v1.x 用 model，老版本可能用 modelName）
    const actualModel = (model as any).model ?? (model as any).modelName;

    expect(actualModel).toBe(getModelName('chat'));
  });

  it('当环境变量 MINIMAX_CHAT_MODEL 被设置时，应使用该值', async () => {
    process.env.AI_PROVIDER = 'minimax';
    process.env.MINIMAX_API_KEY = 'test-key';
    process.env.MINIMAX_CHAT_MODEL = 'MiniMax-Custom-X';
    delete process.env.AI_MODEL_NAME;

    const { createMiniMaxModel } = await import('../../../src/agents/chatMiniMax');

    const model = createMiniMaxModel();
    const actualModel = (model as any).model ?? (model as any).modelName;

    expect(actualModel).toBe('MiniMax-Custom-X');
  });

  it('当 AI_MODEL_NAME 被设置时，应优先于 MINIMAX_CHAT_MODEL', async () => {
    process.env.AI_PROVIDER = 'minimax';
    process.env.MINIMAX_API_KEY = 'test-key';
    process.env.MINIMAX_CHAT_MODEL = 'MiniMax-Custom-X';
    process.env.AI_MODEL_NAME = 'MiniMax-Override';

    const { createMiniMaxModel } = await import('../../../src/agents/chatMiniMax');

    const model = createMiniMaxModel();
    const actualModel = (model as any).model ?? (model as any).modelName;

    expect(actualModel).toBe('MiniMax-Override');
  });
});
