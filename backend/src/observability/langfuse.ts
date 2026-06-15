import { Langfuse } from 'langfuse';
import { CallbackHandler } from 'langfuse-langchain';
import type { TraceMetadata } from './langfuse.types';

let cached: Langfuse | null | undefined; // undefined = uninitialized, null = disabled

/**
 * 获取 Langfuse 单例。未配置或显式禁用时返回 null（让上游降级 noop）。
 */
export function getLangfuse(): Langfuse | null {
  if (cached !== undefined) return cached;

  const enabled = process.env.LANGFUSE_ENABLED !== 'false';
  const publicKey = process.env.LANGFUSE_PUBLIC_KEY;
  const secretKey = process.env.LANGFUSE_SECRET_KEY;
  const baseUrl = process.env.LANGFUSE_HOST;

  if (!enabled || !publicKey || !secretKey || !baseUrl) {
    if (enabled && (!publicKey || !secretKey || !baseUrl)) {
      console.warn('[Langfuse] disabled: missing PUBLIC_KEY / SECRET_KEY / HOST');
    }
    cached = null;
    return null;
  }

  cached = new Langfuse({
    publicKey,
    secretKey,
    baseUrl,
    flushAt: 10,
    flushInterval: 2000,
  });
  console.log('[Langfuse] initialized:', baseUrl);
  return cached;
}

/**
 * 创建一个 CallbackHandler 给 LangChain 调用注入（LLM/tool 自动 trace）
 */
export function createTraceCallbacks(meta: TraceMetadata): any[] {
  const fuse = getLangfuse();
  if (!fuse) return [];

  const handler = new CallbackHandler({
    publicKey: process.env.LANGFUSE_PUBLIC_KEY!,
    secretKey: process.env.LANGFUSE_SECRET_KEY!,
    baseUrl: process.env.LANGFUSE_HOST!,
    userId: String(meta.userId),
    sessionId: meta.sessionId,
    metadata: {
      agentVersion: meta.agentVersion,
      messageId: meta.messageId,
      imageCount: meta.imageCount,
      hasClarificationContext: meta.hasClarificationContext,
    },
  });

  return [handler];
}

/**
 * 进程退出时调用，确保未发送的 events 被 flush
 */
export async function shutdownLangfuse(): Promise<void> {
  const fuse = getLangfuse();
  if (fuse) {
    await fuse.shutdownAsync();
  }
}

/**
 * 测试用：重置缓存
 */
export function _resetForTest(): void {
  cached = undefined;
}
