import { z } from 'zod';

export const AIProviderSchema = z.enum(['minimax', 'zhipu']);
export type AIProvider = z.infer<typeof AIProviderSchema>;

export const AIConfigSchema = z.object({
  provider: AIProviderSchema,
  minimaxApiKey: z.string().optional(),
  zhipuApiKey: z.string().optional(),
  modelName: z.string().optional(),
  models: z.object({
    minimax: z.object({
      chat: z.string(),
      vision: z.string(),
    }),
    zhipu: z.object({
      chat: z.string(),
      vision: z.string(),
    }),
  }),
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
  models: {
    minimax: {
      chat: getEnv('MINIMAX_CHAT_MODEL', 'MiniMax-Text-01'),
      vision: getEnv('MINIMAX_VISION_MODEL', 'MiniMax-VL-01'),
    },
    zhipu: {
      chat: getEnv('ZHIPU_CHAT_MODEL', 'glm-4-plus'),
      vision: getEnv('ZHIPU_VISION_MODEL', 'glm-4v-flash'),
    },
  },
};

export function getCurrentProvider(): AIProvider {
  return aiConfig.provider;
}

export function getModelName(type: 'chat' | 'vision'): string {
  if (aiConfig.modelName) {
    return aiConfig.modelName;
  }
  return aiConfig.models[aiConfig.provider][type];
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
