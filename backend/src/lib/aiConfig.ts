import { z } from 'zod';

export const AIProviderSchema = z.enum(['minimax', 'zhipu']);
export type AIProvider = z.infer<typeof AIProviderSchema>;

export const AIConfigSchema = z.object({
  provider: AIProviderSchema,
  minimaxApiKey: z.string().optional(),
  zhipuApiKey: z.string().optional(),
  modelName: z.string().optional(), // Override default model name
});

export type AIConfig = z.infer<typeof AIConfigSchema>;

function getEnv(key: string, fallback = ''): string {
  return process.env[key] || fallback;
}

export const aiConfig: AIConfig = {
  provider: AIProviderSchema.parse(getEnv('AI_PROVIDER', 'minimax')),
  minimaxApiKey: getEnv('MINIMAX_API_KEY'),
  zhipuApiKey: getEnv('ZHIPU_API_KEY'),
  modelName: getEnv('AI_MODEL_NAME') || undefined,
};

// Default models per provider
export const DEFAULT_MODELS = {
  minimax: {
    chat: 'MiniMax-Text-01',
    vision: 'MiniMax-VL-01',
  },
  zhipu: {
    chat: 'GLM-4-Plus',      // Free tier text model
    vision: 'GLM-4V-Flash',  // Free multimodal model
  },
} as const;

export function getCurrentProvider(): AIProvider {
  return aiConfig.provider;
}

export function getModelName(type: 'chat' | 'vision'): string {
  if (aiConfig.modelName) {
    return aiConfig.modelName;
  }
  return DEFAULT_MODELS[aiConfig.provider][type];
}

export function requireApiKey(provider: AIProvider): string {
  if (provider === 'minimax') {
    if (!aiConfig.minimaxApiKey) {
      throw new Error('MINIMAX_API_KEY environment variable is required');
    }
    return aiConfig.minimaxApiKey;
  } else if (provider === 'zhipu') {
    if (!aiConfig.zhipuApiKey) {
      throw new Error('ZHIPU_API_KEY environment variable is required');
    }
    return aiConfig.zhipuApiKey;
  }
  throw new Error(`Unknown AI provider: ${provider}`);
}
