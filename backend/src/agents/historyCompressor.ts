/**
 * 历史消息压缩器 (Hybrid 方案)
 * 在保留关键信息和控制 token 成本之间取得平衡
 */

import { createChatModel } from './chatFactory';

// 消息类型
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
  tool_call_id?: string;
  tool_called?: boolean;  // 标记是否包含工具调用结果
}

export interface CompressionResult {
  recent: Message[];           // 保留的最近消息
  summary: string | null;        // 历史摘要（如果有）
  originalCount: number;         // 原始消息数
  compressedCount: number;       // 压缩后消息数
  wasCompressed: boolean;       // 是否进行了压缩
}

// 压缩配置
export interface CompressionConfig {
  maxRecentMessages: number;     // 保留最近 N 条消息
  maxTokens: number;            // 最大 token 估计
  enableSummarization: boolean; // 是否启用摘要
  preserveToolResults: number;  // 保留最近 N 条工具调用结果
}

// 默认配置
export const DEFAULT_COMPRESSION_CONFIG: CompressionConfig = {
  maxRecentMessages: 10,         // 保留最近 10 条
  maxTokens: 3500,             // 最大 3500 token（约 14000 字符）
  enableSummarization: true,    // 启用摘要
  preserveToolResults: 5       // 保留最近 5 条工具结果
};

// 健身场景关键信息模式
const KEY_PATTERNS = {
  // 训练数据
  workouts: /(深蹲|卧推|硬拉|划船|推举|训练|组|次|kg|跑步|公里|有氧|hiit)/i,
  // 围度数据
  measurements: /(胸围|腰围|臀围|臂围|腿围|小腿|体重|体脂|围度)/i,
  // 成就
  achievements: /(PR|突破|纪录|个人最佳|徽章|里程碑|完成)/i,
  // 目标/计划
  goals: /(增肌|减脂|目标|计划|周)/i,
  // 反馈
  feedback: /(进步|提升|增加|减少|完成)/i
};

// 可压缩的模式（一般性对话）
const COMPRESSIBLE_PATTERNS = {
  greetings: /^(你好|嗨|hi|hello|hey|您好)/i,
  acknowledgements: /^(好的|收到|明白|ok|好嘞|知道了)/i,
  encouragement: /^(加油|坚持|不错|很好|厉害|棒)/i,
  casual: /^(哈哈|嘿嘿|嗯嗯|哦哦|呃)/i
};

/**
 * 估算消息的 token 数量（粗略估计：中文约 2 字符/token，英文约 4 字符/token）
 */
function estimateTokens(text: string): number {
  const chineseChars = (text.match(/[一-鿿]/g) || []).length;
  const otherChars = text.length - chineseChars;
  return Math.ceil(chineseChars / 2) + Math.ceil(otherChars / 4);
}

/**
 * 估算消息列表的总 token
 */
function estimateMessagesTokens(messages: Message[]): number {
  return messages.reduce((sum, msg) => sum + estimateTokens(msg.content), 0);
}

/**
 * 检查消息是否包含关键信息
 */
function isKeyMessage(message: Message): boolean {
  const content = message.content;

  for (const pattern of Object.values(KEY_PATTERNS)) {
    if (pattern.test(content)) return true;
  }

  // 工具调用结果总是关键信息
  if (message.tool_called) return true;

  return false;
}

/**
 * 检查消息是否可压缩（一般性对话）
 */
function isCompressible(message: Message): boolean {
  const content = message.content;

  for (const pattern of Object.values(COMPRESSIBLE_PATTERNS)) {
    if (pattern.test(content)) return true;
  }

  // 工具调用结果不可压缩
  if (message.tool_called) return false;

  return false;
}

/**
 * 从消息列表中提取关键健身信息
 */
function extractKeyFitnessInfo(messages: Message[]): {
  workouts: string[];
  measurements: string[];
  achievements: string[];
  questions: string[];
} {
  const workouts: string[] = [];
  const measurements: string[] = [];
  const achievements: string[] = [];
  const questions: string[] = [];

  for (const msg of messages) {
    const content = msg.content;

    // 提取训练记录
    if (KEY_PATTERNS.workouts.test(content)) {
      // 简化训练信息
      const simplified = simplifyWorkoutInfo(content);
      if (simplified) workouts.push(simplified);
    }

    // 提取围度记录
    if (KEY_PATTERNS.measurements.test(content)) {
      const simplified = simplifyMeasurementInfo(content);
      if (simplified) measurements.push(simplified);
    }

    // 提取成就
    if (KEY_PATTERNS.achievements.test(content)) {
      achievements.push(content.substring(0, 100));
    }

    // 提取问题（用户询问）
    if (msg.role === 'user' && content.includes('?')) {
      questions.push(content.substring(0, 80));
    }
  }

  return { workouts, measurements, achievements, questions };
}

/**
 * 简化训练信息
 */
function simplifyWorkoutInfo(content: string): string | null {
  // 匹配 "卧推80kg 5组每组8个" 格式
  const patterns = [
    /([一-鿿]+)(\d+)(?:kg|公斤).*?(\d+)(?:组|个).*?(\d+)(?:次|个)/,
    /(深蹲|卧推|硬拉|划船|推举|引体向上).*?(\d+)(?:kg|公斤)/,
    /(跑步|步行|游泳|骑行)(\d+)(?:公里|km|米|m|分钟|min)/
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      return content.match(/[一-鿿]+/)?.[0] || match[0];
    }
  }

  return null;
}

/**
 * 简化围度信息
 */
function simplifyMeasurementInfo(content: string): string | null {
  const patterns = [
    /(胸围|腰围|臀围|臂围|腿围|小腿|体重).*?(\d+(?:\.\d+)?)/,
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      return match[0].substring(0, 30);
    }
  }

  return null;
}

/**
 * 生成历史摘要
 */
async function summarizeMessages(
  olderMessages: Message[],
  recentMessages: Message[]
): Promise<string> {
  const keyInfo = extractKeyFitnessInfo(olderMessages);

  // 如果是关键信息丰富，直接构建摘要
  if (keyInfo.workouts.length > 0 || keyInfo.measurements.length > 0 || keyInfo.achievements.length > 0) {
    const parts: string[] = [];

    if (keyInfo.workouts.length > 0) {
      const uniqueWorkouts = [...new Set(keyInfo.workouts)].slice(-5);
      parts.push(`【训练】${uniqueWorkouts.join('、')}`);
    }

    if (keyInfo.measurements.length > 0) {
      const uniqueMeasurements = [...new Set(keyInfo.measurements)].slice(-5);
      parts.push(`【围度】${uniqueMeasurements.join('、')}`);
    }

    if (keyInfo.achievements.length > 0) {
      const uniqueAchievements = [...new Set(keyInfo.achievements)].slice(-3);
      parts.push(`【成就】${uniqueAchievements.join('、')}`);
    }

    return parts.join(' | ');
  }

  // 如果没有关键信息，使用 LLM 摘要
  if (keyInfo.questions.length > 0) {
    return `【用户询问过的内容】${keyInfo.questions.slice(-3).join(' | ')}`;
  }

  return '';
}

/**
 * 主要压缩函数
 */
export async function compressHistory(
  messages: Message[],
  config: CompressionConfig = DEFAULT_COMPRESSION_CONFIG
): Promise<CompressionResult> {
  // 1. 快速路径：消息数量未超限
  if (messages.length <= config.maxRecentMessages) {
    return {
      recent: messages,
      summary: null,
      originalCount: messages.length,
      compressedCount: messages.length,
      wasCompressed: false
    };
  }

  // 2. 估算当前 token
  const currentTokens = estimateMessagesTokens(messages);

  // 3. 未超 token 限制，检查消息数量
  if (currentTokens < config.maxTokens && messages.length <= config.maxRecentMessages * 2) {
    return {
      recent: messages,
      summary: null,
      originalCount: messages.length,
      compressedCount: messages.length,
      wasCompressed: false
    };
  }

  // 4. 需要压缩
  // 分离：最近消息、工具结果、更早的消息
  const recent = messages.slice(-config.maxRecentMessages);
  const toolResults = messages.filter(m => m.tool_called).slice(-config.preserveToolResults);
  const older = messages.slice(0, -config.maxRecentMessages);

  // 5. 生成摘要
  let summary: string | null = null;
  if (config.enableSummarization && older.length > 0) {
    summary = await summarizeMessages(older, recent);
  }

  // 6. 构建最终消息列表（去重 + 排序）
  const finalRecent = deduplicateAndSort([...toolResults, ...recent]);

  return {
    recent: finalRecent,
    summary,
    originalCount: messages.length,
    compressedCount: finalRecent.length,
    wasCompressed: true
  };
}

/**
 * 去重并按时间排序
 */
function deduplicateAndSort(messages: Message[]): Message[] {
  const seen = new Set<string>();
  const result: Message[] = [];

  // 按时间顺序排序
  const sorted = [...messages].sort((a, b) =>
    (a.timestamp || 0) - (b.timestamp || 0)
  );

  for (const msg of sorted) {
    // 使用前50字符作为去重键
    const key = msg.content.substring(0, 50);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(msg);
    }
  }

  return result;
}

/**
 * 标记消息是否为工具调用结果
 */
export function markToolMessages(messages: Message[]): Message[] {
  return messages.map(msg => ({
    ...msg,
    tool_called: msg.tool_call_id !== undefined
  }));
}