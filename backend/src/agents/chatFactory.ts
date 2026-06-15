/**
 * Chat Model Factory
 * Creates the appropriate chat model based on AI_PROVIDER env var
 *
 * Sprint 5 T2: zhipu provider explicitly rejected for main chat (no tool calling)
 * Sprint 5 T3: provider fallback support (optional secondary model)
 */

import { getCurrentProvider } from '../config/aiConfig';
import { createMiniMaxModel } from './chatMiniMax';
import { createZhipuChat, createZhipuVisionChat } from './chatZhipu';
import { createFallbackModel } from './chatFallback';

/**
 * Get the appropriate chat model based on configuration
 * Returns a LangChain-compatible model instance
 *
 * @param callbacks Optional LangChain callbacks (e.g. Langfuse CallbackHandler) to inject for observability
 */
export async function createChatModel(callbacks?: any[]) {
  const provider = getCurrentProvider();

  if (provider === 'minimax') {
    const primary = createMiniMaxModel({ callbacks });
    const fallback = createFallbackModel();

    // 如果有 fallback，包装 withFallbacks
    if (fallback) {
      console.log('[chatFactory] Primary minimax + fallback enabled');
      try {
        // @ts-ignore - withFallbacks API
        return primary.withFallbacks({ fallbacks: [fallback] });
      } catch (e) {
        console.warn('[chatFactory] withFallbacks failed, using primary only:', (e as Error).message);
        return primary;
      }
    }
    return primary;
  } else if (provider === 'zhipu') {
    // Sprint 5 T2: zhipu 不支持 main chat (tool calling)，明确拒绝
    // zhipu 只用于 vision 和 classifier（直接通过 chatZhipu 模块调用）
    throw new Error(
      'Zhipu provider does not support main chat (tool calling required). ' +
      'Set AI_PROVIDER=minimax, or use chatZhipu directly for vision tasks.'
    );
  }

  throw new Error(`Unsupported AI provider: ${provider}`);
}

// Re-export zhipu vision/utility functions for use by vision/classifier modules
export { createZhipuChat, createZhipuVisionChat };
