/**
 * MySQL-based Memory Store
 * 简化版记忆存储（基于 MySQL 表）
 */

import { IMemoryStore, Memory, MemorySearchResult, MemoryType } from './memoryTypes';
import prisma from '../config/prisma';

export type { Memory, MemoryType };

/**
 * MySQL 记忆存储实现
 */
export class MySQLMemoryStore implements IMemoryStore {
  async add(memory: Memory): Promise<void> {
    await prisma.userMemory.create({
      data: {
        userId: memory.userId,
        type: memory.type,
        content: memory.content,
        importance: memory.importance,
        expiresAt: memory.expiresAt ? new Date(memory.expiresAt) : null,
      },
    });
  }

  async search(userId: number, query: string, options?: { limit?: number; type?: MemoryType }): Promise<MemorySearchResult> {
    // 简化实现：按关键词匹配
    const where: any = {
      userId,
      content: { contains: query },
    };
    if (options?.type) {
      where.type = options.type;
    }

    const memories = await prisma.userMemory.findMany({
      where,
      orderBy: { importance: 'desc' },
      take: options?.limit || 10,
    });

    return {
      memories: memories.map(m => ({
        id: String(m.id),
        userId: m.userId,
        type: m.type as MemoryType,
        content: m.content,
        importance: m.importance,
        createdAt: m.createdAt?.toISOString(),
        expiresAt: m.expiresAt?.toISOString(),
      })),
      query,
    };
  }

  async getAll(userId: number, options?: { limit?: number; type?: MemoryType }): Promise<Memory[]> {
    const where: any = { userId };
    if (options?.type) {
      where.type = options.type;
    }

    const memories = await prisma.userMemory.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: options?.limit || 100,
    });

    return memories.map(m => ({
      id: String(m.id),
      userId: m.userId,
      type: m.type as MemoryType,
      content: m.content,
      importance: m.importance,
      createdAt: m.createdAt?.toISOString(),
      expiresAt: m.expiresAt?.toISOString(),
    }));
  }

  async delete(memoryId: string): Promise<void> {
    await prisma.userMemory.delete({
      where: { id: parseInt(memoryId, 10) },
    });
  }

  async cleanup(userId: number): Promise<number> {
    const result = await prisma.userMemory.deleteMany({
      where: {
        userId,
        expiresAt: { lt: new Date() },
      },
    });
    return result.count;
  }
}

/**
 * 单例
 */
export const memoryStore = new MySQLMemoryStore();