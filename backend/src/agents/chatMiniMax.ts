import { ChatOpenAI } from "@langchain/openai";
import type { OpenAIChatInput } from "@langchain/openai";

const MINIMAX_BASE_URL = "https://api.minimax.chat/v1";

/**
 * 创建 MiniMax ChatOpenAI 实例
 * MiniMax 提供 OpenAI 兼容 API
 */
export function createMiniMaxModel(fields: Partial<OpenAIChatInput> & { maxTokens?: number } = {}): ChatOpenAI {
  return new ChatOpenAI(
    {
      apiKey: process.env.MINIMAX_API_KEY || '',
      model: "MiniMax-M2.7",
      temperature: fields.temperature ?? 0.7,
      maxTokens: fields.maxTokens ?? 4096,
      ...fields,
    },
    {
      basePath: MINIMAX_BASE_URL,
    }
  );
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

    super(
      {
        apiKey,
        model: (fields.model as string) || "MiniMax-M2.7",
        temperature: fields.temperature ?? 0.7,
        maxTokens: fields.maxTokens ?? 4096,
      },
      {
        basePath: MINIMAX_BASE_URL,
      }
    );

    this.minimaxApiKey = apiKey;
  }
}
