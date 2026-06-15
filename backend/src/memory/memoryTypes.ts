/**
 * Memory Types
 * 用户长期记忆类型定义
 */

import { z } from 'zod';

/**
 * Memory 类型
 */
export const MemoryTypeSchema = z.enum(['episodic', 'semantic', 'procedural']);
export type MemoryType = z.infer<typeof MemoryTypeSchema>;

/**
 * 单条记忆
 */
export const MemorySchema = z.object({
  id: z.string().optional(),
  userId: z.number(),
  type: MemoryTypeSchema,
  content: z.string(),
  importance: z.number().min(1).max(10).default(5),
  createdAt: z.string().optional(),
  expiresAt: z.string().optional(),
});

export type Memory = z.infer<typeof MemorySchema>;

/**
 * Memory 搜索结果
 */
export const MemorySearchResultSchema = z.object({
  memories: z.array(MemorySchema),
  query: z.string(),
});

export type MemorySearchResult = z.infer<typeof MemorySearchResultSchema>;

/**
 * Memory Store 接口
 */
export interface IMemoryStore {
  /**
   * 添加记忆
   */
  add(memory: Memory): Promise<void>;

  /**
   * 搜索记忆
   */
  search(userId: number, query: string, options?: { limit?: number; type?: MemoryType }): Promise<MemorySearchResult>;

  /**
   * 获取用户所有记忆
   */
  getAll(userId: number, options?: { limit?: number; type?: MemoryType }): Promise<Memory[]>;

  /**
   * 删除记忆
   */
  delete(memoryId: string): Promise<void>;

  /**
   * 清理过期记忆
   */
  cleanup(userId: number): Promise<number>;
}