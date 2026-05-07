import { userContextRepository } from '../repositories/userContextRepository';
import { workoutRepository } from '../repositories/workoutRepository';
import { measurementRepository } from '../repositories/measurementRepository';
import { planRepository } from '../repositories/planRepository';
import { userRepository } from '../repositories/userRepository';
import { createModel } from '../agents/chatMiniMax';

interface AIMessageContent {
  type: 'text';
  text: string;
}

interface AIMessage {
  content: string | AIMessageContent[];
}

const locks = new Map<number, boolean>();

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function extractText(response: AIMessage): string {
  if (typeof response.content === 'string') return response.content;
  if (Array.isArray(response.content)) {
    return response.content.find(p => p.type === 'text')?.text || '';
  }
  return '';
}

export const userContextService = {
  async getOrCreateContext(userId: number) {
    let ctx = await userContextRepository.getByUserId(userId);
    if (!ctx) {
      await userContextRepository.create(userId);
      ctx = await userContextRepository.getByUserId(userId);
      setImmediate(() => this.generateInitialContext(userId));
    }
    return ctx;
  },

  async refreshContextWithLock(userId: number, latestDialogue: string) {
    while (locks.get(userId)) {
      await sleep(100);
    }
    locks.set(userId, true);
    try {
      await this.refreshContext(userId, latestDialogue);
    } finally {
      locks.delete(userId);
    }
  },

  async refreshContext(userId: number, latestDialogue: string) {
    const current = await userContextRepository.getByUserId(userId);
    if (!current) return;

    const prompt = `【当前用户压缩上下文】
${current.context_text || '（首次生成）'}

【本次对话信息】
${latestDialogue}

【任务】
根据"本次对话信息"更新"当前用户压缩上下文"。规则：
- 包含新的训练记录 → 更新训练趋势（动作、重量、频率）
- 包含新的围度数据 → 更新体型数据
- 涉及训练计划 → 更新计划信息
- 保持简洁，控制在 200 字以内
- 只输出更新后的完整上下文，不要解释`;

    const model = await createModel();
    const response = await model.invoke([{ role: 'user', content: prompt }]);
    const newText = extractText(response);
    await userContextRepository.updateContextText(userId, newText);
  },

  async generateInitialContext(userId) {
    // Get user profile
    const user = await userRepository.findById(userId);
    if (!user) return;

    // Get recent workouts (last 90 days)
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    const workouts = await workoutRepository.findByUserAndDateRange(
      userId,
      ninetyDaysAgo.toISOString().split('T')[0],
      new Date().toISOString().split('T')[0]
    );

    // Get recent measurements (last 90 days)
    const measurements = await measurementRepository.findByUserAndDateRange(
      userId,
      ninetyDaysAgo.toISOString().split('T')[0],
      new Date().toISOString().split('T')[0]
    );

    // Get active plan
    const activePlan = await planRepository.findActive(userId);

    // Calculate stats
    const profile = {
      goal: user.goal || '未知',
      experience: user.experience || '未知',
      frequency: user.frequency || 0,
      body_weight: user.body_weight || '未知',
      totalWorkouts: workouts.length,
      totalMeasurements: measurements.length,
      lastWorkoutDate: workouts[0]?.date || null,
      lastMeasurementDate: measurements[0]?.date || null
    };

    await userContextRepository.updateSnapshot(userId, profile, activePlan);

    // Generate context text
    const dataPrompt = `根据以下用户数据，生成一段简洁的用户背景描述（100-200字）：
    用户：${JSON.stringify(profile)}
    训练记录：${JSON.stringify(workouts.slice(0, 10))}
    围度记录：${JSON.stringify(measurements.slice(0, 5))}
    当前计划：${JSON.stringify(activePlan)}
    重点：训练经验、目标、频率，主要动作及重量趋势、体型数据。`;

    const model = await createModel();
    const response = await model.invoke([{ role: 'user', content: dataPrompt }]);
    const contextText = extractText(response);
    await userContextRepository.updateContextText(userId, contextText);
  }
};