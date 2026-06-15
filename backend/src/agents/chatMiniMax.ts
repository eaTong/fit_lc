import { ChatOpenAI } from "@langchain/openai";
import type { OpenAIChatInput } from "@langchain/openai";
import { getModelName, requireApiKey } from "../config/aiConfig";

const MINIMAX_BASE_URL = "https://api.minimax.chat/v1";

/**
 * 创建 MiniMax ChatOpenAI 实例
 * MiniMax 提供 OpenAI 兼容 API
 *
 * 模型 ID 统一通过 aiConfig.getModelName('chat') 取，避免硬编码漂移（Sprint 1 T1）。
 * 30s 单次 HTTP 超时 + 2 次底层重试（Sprint 1 T4）。
 * 新增 callbacks 可选参数（Sprint 1 Task 8 Langfuse 观测）。
 * 接受 LangChain callbacks（如 Langfuse CallbackHandler）以透传至 invoke()。
 */
export interface CreateModelOptions extends Partial<OpenAIChatInput> {
  maxTokens?: number;
  callbacks?: any[];
}

export function createMiniMaxModel(fields: CreateModelOptions = {}): ChatOpenAI {
  const { callbacks, ...openAiFields } = fields;
  return new ChatOpenAI({
    apiKey: requireApiKey('minimax'),
    model: getModelName('chat'),
    temperature: openAiFields.temperature ?? 0.7,
    maxTokens: openAiFields.maxTokens ?? 4096,
    timeout: 30_000,        // Sprint 1 T4: 单次 HTTP 30s
    maxRetries: 2,          // Sprint 1 T4: 底层 SDK 重试 2 次
    callbacks,               // Sprint 1 T8: Langfuse CallbackHandler
    configuration: {
      baseURL: MINIMAX_BASE_URL,
    },
    ...openAiFields,
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
