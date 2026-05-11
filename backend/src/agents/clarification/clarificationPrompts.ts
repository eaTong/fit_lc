import { ClarificationSession } from './types';

const MAX_CLARIFICATION_COUNT = 3;

export function generateClarificationReply(session: ClarificationSession): string {
  const missingLabels = session.missingFields.map(f => f.label).join('、');
  const partialInfo = formatPartialInput(session.partialInput, session.toolName);

  // 如果澄清次数已达上限
  if (session.clarificationCount >= MAX_CLARIFICATION_COUNT) {
    return `抱歉，信息仍不完整。您可以：
1. 重新完整描述训练（如"卧推80公斤5组每组8个"）
2. 告诉我要跳过记录`;
  }

  // 模板生成
  if (session.toolName === 'save_workout') {
    return generateWorkoutClarification(partialInfo, missingLabels, session.clarificationCount);
  }

  if (session.toolName === 'save_measurement') {
    return generateMeasurementClarification(partialInfo, missingLabels);
  }

  // 默认模板
  return `${partialInfo}，请补充：${missingLabels}`;
}

function generateWorkoutClarification(partialInfo: string, missingLabels: string, count: number): string {
  const encouragements = ['很棒！', '没问题！', '收到！'];
  const encouragement = encouragements[count % encouragements.length];

  // 特殊处理 sets/reps 缺失
  if (missingLabels.includes('组数') || missingLabels.includes('次数')) {
    return `${partialInfo}，${encouragement}请问一共几组，每组几次？`;
  }

  return `${partialInfo}，请补充：${missingLabels}`;
}

function generateMeasurementClarification(partialInfo: string, missingLabels: string): string {
  return `${partialInfo}，请补充：${missingLabels}`;
}

function formatPartialInput(input: Record<string, any>, toolName: string): string {
  if (toolName === 'save_workout' && input.exercises?.[0]) {
    const ex = input.exercises[0];
    const parts: string[] = [];
    if (ex.name) parts.push(ex.name);
    if (ex.weight) parts.push(`${ex.weight}kg`);
    if (ex.duration) parts.push(`${ex.duration}分钟`);
    if (ex.distance) parts.push(`${ex.distance}公里`);
    return parts.join(' ');
  }

  if (toolName === 'save_measurement' && input.measurements) {
    const parts = input.measurements.map((m: any) => `${m.body_part}: ${m.value}`);
    return parts.join('、');
  }

  return JSON.stringify(input);
}

export function isClarificationEnded(session: ClarificationSession): boolean {
  return session.clarificationCount >= MAX_CLARIFICATION_COUNT;
}