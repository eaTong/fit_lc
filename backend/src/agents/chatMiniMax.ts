import { ChatOpenAI } from "@langchain/openai";
import type { OpenAIChatInput } from "@langchain/openai";

const MINIMAX_BASE_URL = "https://api.minimax.chat/v1";

/**
 * 创建 MiniMax ChatOpenAI 实例
 * MiniMax 提供 OpenAI 兼容 API
 *
 * S1 T8: 新增 callbacks 可选参数（Sprint 1 Task 8 Langfuse 观测）。
 * 接受 LangChain callbacks（如 Langfuse CallbackHandler）以透传至 invoke()。
 */
export interface CreateModelOptions extends Partial<OpenAIChatInput> {
  maxTokens?: number;
  callbacks?: any[];
}

export function createMiniMaxModel(fields: CreateModelOptions = {}): ChatOpenAI {
  const { callbacks, ...openAiFields } = fields;
  return new ChatOpenAI({
    apiKey: process.env.MINIMAX_API_KEY || '',
    model: "MiniMax-M3",
    temperature: openAiFields.temperature ?? 0.7,
    maxTokens: openAiFields.maxTokens ?? 4096,
    callbacks,                          // ← Sprint 1 T8 新增
    configuration: {
      baseURL: MINIMAX_BASE_URL,
    },
    ...openAiFields,
  });
}

/**
 * Create a cached model instance for MiniMax using OpenAI-compatible API
 */
let cachedModel: ChatOpenAI | null = null;

export async function createModel(): Promise<ChatOpenAI> {
  if (cachedModel) {
    return cachedModel;
  }

  cachedModel = createMiniMaxModel();
  return cachedModel;
}

// Legacy export for backwards compatibility
export class ChatMiniMax extends ChatOpenAI {
  minimaxApiKey: string;

  constructor(fields: Partial<OpenAIChatInput> & { maxTokens?: number } = {}) {
    const apiKey = (fields.apiKey as string) || process.env.MINIMAX_API_KEY || '';

    super({
      apiKey,
      model: (fields.model as string) || "MiniMax-M3",
      temperature: fields.temperature ?? 0.7,
      maxTokens: fields.maxTokens ?? 4096,
      configuration: {
        baseURL: MINIMAX_BASE_URL,
      },
    });

    this.minimaxApiKey = apiKey;
  }
}
