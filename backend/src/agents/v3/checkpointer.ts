/**
 * V3 Checkpoint - 状态持久化
 * 使用 LangGraph 内置 MemorySaver
 */

import { MemorySaver } from '@langchain/langgraph';

/**
 * 内存 Checkpoint - 开发/测试用
 */
export const memoryCheckpointer = new MemorySaver();

/**
 * 获取 Checkpointer
 * 生产环境可替换为 PrismaCheckpointer
 */
export function getCheckpointer() {
  return memoryCheckpointer;
}

/**
 * 生成线程 ID（用户会话）
 */
export function getThreadId(userId: number, sessionId?: string): string {
  return sessionId ? `${userId}-${sessionId}` : `user-${userId}`;
}