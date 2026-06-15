/**
 * Fallback Model (Sprint 5 T3)
 * 主模型（minimax）失败时自动降级到备用模型
 *
 * 配置：
 * - FALLBACK_ENABLED=true 启用
 * - FALLBACK_BASE_URL 备用 API base URL
 * - FALLBACK_API_KEY 备用 API key
 * - FALLBACK_MODEL 备用模型名
 */

import { ChatOpenAI } from '@langchain/openai';

export interface FallbackConfig {
  enabled: boolean;
  baseURL: string;
  apiKey: string;
  model: string;
}

export const fallbackConfig: FallbackConfig = {
  enabled: process.env.FALLBACK_ENABLED === 'true',
  baseURL: process.env.FALLBACK_BASE_URL || '',
  apiKey: process.env.FALLBACK_API_KEY || '',
  model: process.env.FALLBACK_MODEL || '',
};

/**
 * 创建 Fallback Model（如果配置启用）
 * 返回 null 表示不启用 fallback
 */
export function createFallbackModel(): ChatOpenAI | null {
  if (!fallbackConfig.enabled) return null;
  if (!fallbackConfig.baseURL || !fallbackConfig.apiKey || !fallbackConfig.model) {
    console.warn(
      '[chatFallback] FALLBACK_ENABLED=true but missing required config. ' +
      'Need FALLBACK_BASE_URL, FALLBACK_API_KEY, FALLBACK_MODEL.'
    );
    return null;
  }

  return new ChatOpenAI({
    apiKey: fallbackConfig.apiKey,
    model: fallbackConfig.model,
    temperature: 0.7,
    maxTokens: 4096,
    timeout: 30_000,
    maxRetries: 1, // 备用模型只重试 1 次
    configuration: { baseURL: fallbackConfig.baseURL },
  });
}

/**
 * 判断当前是否启用了 fallback
 */
export function isFallbackEnabled(): boolean {
  return createFallbackModel() !== null;
}
