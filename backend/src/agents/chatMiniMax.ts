import { ChatOpenAI } from "@langchain/openai";
import type { OpenAIChatInput } from "@langchain/openai";
import { getModelName, requireApiKey } from "../config/aiConfig";

const MINIMAX_BASE_URL = "https://api.minimax.chat/v1";

/**
 * 创建 MiniMax ChatOpenAI 实例
 * 模型 ID 统一通过 aiConfig.getModelName('chat') 取，避免硬编码漂移。
 */
export function createMiniMaxModel(fields: Partial<OpenAIChatInput> & { maxTokens?: number } = {}): ChatOpenAI {
  return new ChatOpenAI({
    apiKey: requireApiKey('minimax'),
    model: getModelName('chat'),
    temperature: fields.temperature ?? 0.7,
    maxTokens: fields.maxTokens ?? 4096,
    timeout: 30_000,        // 单次 HTTP 30s
    maxRetries: 2,          // 底层 SDK 重试 2 次
    configuration: {
      baseURL: MINIMAX_BASE_URL,
    },
    ...fields,
  });
}

/**
 * 单例缓存
 */
let cachedModel: ChatOpenAI | null = null;

export async function createModel(): Promise<ChatOpenAI> {
  if (cachedModel) {
    return cachedModel;
  }
  cachedModel = createMiniMaxModel();
  return cachedModel;
}

/**
 * 测试用：重置单例缓存
 */
export function _resetCachedModel(): void {
  cachedModel = null;
}

// Legacy export for backwards compatibility
export class ChatMiniMax extends ChatOpenAI {
  minimaxApiKey: string;

  constructor(fields: Partial<OpenAIChatInput> & { maxTokens?: number } = {}) {
    const apiKey = (fields.apiKey as string) || requireApiKey('minimax');

    super({
      apiKey,
      model: (fields.model as string) || getModelName('chat'),
      temperature: fields.temperature ?? 0.7,
      maxTokens: fields.maxTokens ?? 4096,
      timeout: 30_000,        // 单次 HTTP 30s
      maxRetries: 2,          // 底层 SDK 重试 2 次
      configuration: {
        baseURL: MINIMAX_BASE_URL,
      },
    });

    this.minimaxApiKey = apiKey;
  }
}
