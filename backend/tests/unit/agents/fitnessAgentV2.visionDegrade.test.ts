// @ts-nocheck
/**
 * Tests for runAgentV2 vision graceful degradation (Sprint 1 / Task 3)
 *
 * Contract:
 * - Vision failure must NOT terminate the whole agent pipeline.
 *   Instead, the main LLM is invoked with the user's original text message
 *   and a system-prompt notice that "vision is unavailable".
 * - `visionError` is propagated in the return value for client-side UI hint.
 * - Vision success path (with direct reply) is unchanged.
 */

// Hoisted mock fns so jest.mock factories can reference them
const mockPreprocessVision = jest.fn();
const mockInvoke = jest.fn();

// Mock dependencies BEFORE importing fitnessAgentV2
jest.mock('../../../src/agents/plugins/visionPreprocessor', () => ({
  preprocessVision: mockPreprocessVision,
}));

jest.mock('../../../src/agents/chatFactory', () => ({
  createChatModel: async () => ({
    bindTools: () => ({
      invoke: mockInvoke,
    }),
  }),
}));

jest.mock('../../../src/agents/clarification', () => ({
  clarificationManager: {
    getActiveSession: async () => null,
  },
}));

jest.mock('../../../src/services/userContextService', () => ({
  userContextService: {
    refreshContextWithLock: async () => ({}),
  },
}));

// toolExecutor may invoke real repos in some paths; mock to no-op so vision
// success early-return path doesn't depend on DB.
jest.mock('../../../src/agents/toolExecutor', () => ({
  executeToolsBatch: async () => ({ results: [], successCount: 0, failureCount: 0, errors: [] }),
  extractToolCallsFromResponse: () => [],
}));

// compressHistory - mock to return simple passthrough
jest.mock('../../../src/agents/historyCompressor', () => ({
  compressHistory: async (messages: any[]) => ({ recent: messages, summary: null }),
  markToolMessages: jest.fn(),
}));

// fallbackHandler - mock to no-op
jest.mock('../../../src/agents/fallbackHandler', () => ({
  tryParseUserInput: async () => ({ success: false, reply: '', toolData: null }),
}));

import { runAgentV2, clearModelCache } from '../../../src/agents/fitnessAgentV2';

describe('runAgentV2 vision graceful degradation', () => {
  beforeEach(() => {
    mockPreprocessVision.mockReset();
    mockInvoke.mockReset();
    clearModelCache();
  });

  it('vision 失败时不应提前终止，主 LLM 应被调用', async () => {
    mockPreprocessVision.mockResolvedValueOnce({
      message: '帮我看看我的训练姿势',
      imageAnalysis: null,
      error: '图片解析失败：API密钥无效',
    });

    mockInvoke.mockResolvedValueOnce({
      content: '我暂时看不到图片，但可以根据你的描述给建议……',
      tool_calls: [],
    });

    const result = await runAgentV2(
      10,
      '帮我看看我的训练姿势',
      null,
      [],
      ['https://example.com/x.jpg']
    );

    // 关键：主 LLM 必须被调用
    expect(mockInvoke).toHaveBeenCalled();
    expect(result.reply).toContain('暂时看不到图片');
    // visionError 透传
    expect(result.visionError).toBe('图片解析失败：API密钥无效');
  });

  it('vision 失败时，传给 LLM 的 system prompt 应包含 vision 不可用提示', async () => {
    mockPreprocessVision.mockResolvedValueOnce({
      message: '看下这张',
      imageAnalysis: null,
      error: '图片解析失败：请求过于频繁',
    });

    let capturedMessages: any[] = [];
    mockInvoke.mockImplementationOnce(async (messages: any[]) => {
      capturedMessages = messages;
      return { content: '好的', tool_calls: [] };
    });

    await runAgentV2(10, '看下这张', null, [], ['https://x.com/img.jpg']);

    const systemMsg = capturedMessages.find((m: any) => m._getType?.() === 'system');
    expect(systemMsg).toBeDefined();
    const systemText = typeof systemMsg.content === 'string'
      ? systemMsg.content
      : JSON.stringify(systemMsg.content);
    expect(systemText).toMatch(/图片解析(失败|不可用)/);
  });

  it('vision 成功（无 error）且 plugin 直接返回 reply 时行为不变（早退不调主 LLM）', async () => {
    mockPreprocessVision.mockResolvedValueOnce({
      message: '【图片解析结果】\n体态正常\n\n用户原始消息：看下',
      imageAnalysis: '体态正常',
      reply: '📸 **图片分析结果**\n\n体态正常',
      toolData: { aiReply: '📸 体态正常', dataType: 'image_analysis', result: { imageAnalysis: '体态正常' } },
    });

    const result = await runAgentV2(10, '看下', null, [], ['https://x.com/img.jpg']);

    // vision 成功有 reply 时，应早退不调用主 LLM
    expect(mockInvoke).not.toHaveBeenCalled();
    expect(result.reply).toContain('图片分析结果');
    expect(result.visionError).toBeUndefined();
  });
});