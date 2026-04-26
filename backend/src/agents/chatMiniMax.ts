import { ChatAnthropic, ChatAnthropicInput } from "@langchain/anthropic";

/**
 * Create a cached model instance for MiniMax using Anthropic-compatible API
 */
let cachedModel: ChatAnthropic | null = null;

export async function createModel() {
  if (cachedModel) {
    return cachedModel;
  }

  const fields: ChatAnthropicInput = {
    apiKey: process.env.MINIMAX_API_KEY || '',
    model: "MiniMax-M2.7",
    temperature: 0.7,
    maxTokens: 4096,
  };

  cachedModel = new ChatAnthropic(fields);

  return cachedModel;
}

// Legacy export for backwards compatibility
export class ChatMiniMax extends ChatAnthropic {
  minimaxApiKey: string;

  constructor(fields: ChatAnthropicInput = {}) {
    const minimaxApiKey = (fields.apiKey as string) || process.env.MINIMAX_API_KEY || '';

    super({
      apiKey: minimaxApiKey,
      model: (fields.model as string) || "MiniMax-M2.7",
      temperature: fields.temperature ?? 0.7,
      maxTokens: fields.maxTokens ?? 4096,
    });

    this.minimaxApiKey = minimaxApiKey;
  }
}