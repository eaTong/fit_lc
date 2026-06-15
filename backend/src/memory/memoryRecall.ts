/**
 * Memory Recall
 * 召回用户相关记忆供 Agent 使用
 */

import { memoryStore, type Memory, type MemoryType } from './memoryStore';

/**
 * 召回选项
 */
export interface RecallOptions {
  limit?: number;
  types?: MemoryType[];
  minImportance?: number;
}

/**
 * 召回用户记忆
 */
export async function recallMemory(
  userId: number,
  currentMessage: string,
  options: RecallOptions = {}
): Promise<Memory[]> {
  const { limit = 10, types, minImportance = 5 } = options;

  // 1. 先按关键词搜索
  const searchResult = await memoryStore.search(userId, currentMessage, { limit });

  // 2. 过滤低重要性
  let filtered = searchResult.memories.filter(m => m.importance >= minImportance);

  // 3. 如果指定了类型，进一步过滤
  if (types && types.length > 0) {
    filtered = filtered.filter(m => types.includes(m.type));
  }

  return filtered;
}

/**
 * 构建记忆上下文给 prompt
 */
export function buildMemoryContext(memories: Memory[]): string {
  if (memories.length === 0) {
    return '';
  }

  const byType: Record<string, Memory[]> = {};
  for (const m of memories) {
    if (!byType[m.type]) {
      byType[m.type] = [];
    }
    byType[m.type].push(m);
  }

  const parts: string[] = [];

  if (byType.episodic) {
    parts.push(`【重要经历】\n${byType.episodic.map(m => `- ${m.content}`).join('\n')}`);
  }
  if (byType.semantic) {
    parts.push(`【已知信息】\n${byType.semantic.map(m => `- ${m.content}`).join('\n')}`);
  }
  if (byType.procedural) {
    parts.push(`【习惯偏好】\n${byType.procedural.map(m => `- ${m.content}`).join('\n')}`);
  }

  return parts.join('\n\n');
}