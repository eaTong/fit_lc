import { randomUUID } from 'crypto';
import { ClarificationSession, ClarificationResult } from './types';
import { clarificationStore } from './clarificationStore';
import { generateClarificationReply, isClarificationEnded } from './clarificationPrompts';
import { MissingField } from '../../tools/utils/validation';

const TTL_MS = 5 * 60 * 1000;
const MAX_CLARIFICATION_COUNT = 3;

export class ClarificationManager {
  async createSession(params: {
    toolName: string;
    userId: number;
    partialInput: Record<string, any>;
    missingFields: MissingField[];
    userMessage: string;
    llmInterpretation: string;
  }): Promise<ClarificationSession> {
    // 检查是否已有进行中的会话
    const existing = await clarificationStore.getActive(params.userId);
    if (existing) {
      // 增加澄清计数
      existing.clarificationCount++;
      existing.partialInput = this.mergePartialInput(existing.partialInput, params.partialInput);
      existing.missingFields = params.missingFields;
      await clarificationStore.update(existing);
      return existing;
    }

    const session: ClarificationSession = {
      id: randomUUID(),
      toolName: params.toolName,
      userId: params.userId,
      status: 'pending',
      createdAt: Date.now(),
      expiresAt: Date.now() + TTL_MS,
      partialInput: params.partialInput,
      missingFields: params.missingFields,
      originalContext: {
        userMessage: params.userMessage,
        llmInterpretation: params.llmInterpretation
      },
      clarificationCount: 1
    };

    await clarificationStore.save(session);
    return session;
  }

  async completeSession(
    sessionId: string,
    userId: number,
    additionalInput: Record<string, any>
  ): Promise<ClarificationResult> {
    const session = await clarificationStore.getActive(userId);
    if (!session || session.id !== sessionId) {
      throw new Error('澄清会话不存在或已过期');
    }

    const completedInput = this.mergePartialInput(session.partialInput, additionalInput);

    session.status = 'completed';
    await clarificationStore.update(session);

    return {
      success: true,
      completedInput,
      reply: '信息已补充完整，正在执行...',
      sessionId: session.id
    };
  }

  async getActiveSession(userId: number): Promise<ClarificationSession | null> {
    return clarificationStore.getActive(userId);
  }

  async generateReply(session: ClarificationSession): Promise<string> {
    return generateClarificationReply(session);
  }

  async markSessionExpired(sessionId: string, userId: number): Promise<void> {
    const session = await clarificationStore.get(userId);
    if (session && session.id === sessionId) {
      session.status = 'expired';
      await clarificationStore.update(session);
    }
  }

  shouldEndClarification(session: ClarificationSession): boolean {
    return isClarificationEnded(session);
  }

  private mergePartialInput(
    existing: Record<string, any>,
    additional: Record<string, any>
  ): Record<string, any> {
    const merged = { ...existing };

    // 特殊处理 exercises 数组
    if (existing.exercises && additional.exercises?.[0]) {
      merged.exercises = [{
        ...existing.exercises[0],
        ...additional.exercises[0]
      }];
    } else if (additional.exercises) {
      merged.exercises = additional.exercises;
    }

    // 特殊处理 measurements 数组
    if (existing.measurements && additional.measurements?.[0]) {
      merged.measurements = [{
        ...existing.measurements[0],
        ...additional.measurements[0]
      }];
    } else if (additional.measurements) {
      merged.measurements = additional.measurements;
    }

    // 其他字段直接合并
    for (const [key, value] of Object.entries(additional)) {
      if (key !== 'exercises' && key !== 'measurements' && value !== undefined) {
        merged[key] = value;
      }
    }

    return merged;
  }
}

export const clarificationManager = new ClarificationManager();