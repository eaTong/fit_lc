import { z } from 'zod';

export type UserRole = 'normal' | 'admin';

const WHITELIST: Record<UserRole, string[]> = {
  normal: ['save_workout', 'save_measurement', 'query_workout', 'query_measurement', 'generate_plan', 'adjust_plan', 'analyze_execution'],
  admin: ['save_workout', 'save_measurement', 'query_workout', 'query_measurement', 'generate_plan', 'adjust_plan', 'analyze_execution', 'admin_export_data'],
};

// 参数范围验证函数
const validateParam = (toolName: string, args: any): { valid: boolean; error?: string; normalized?: any } => {
  // 日期格式验证
  const isValidDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);

  if (toolName === 'save_workout') {
    const schema = z.object({
      date: z.string().refine(isValidDate, { message: 'date must be YYYY-MM-DD format' }),
      exercises: z.array(z.object({
        name: z.string().min(1).max(100),
        sets: z.number().int().min(1).max(50).optional(),
        reps: z.number().int().min(1).max(1000).optional(),
        weight: z.number().min(0).max(1000).optional(),
        duration: z.number().min(0).max(600).optional(),
        distance: z.number().min(0).max(500).optional(),
      })).min(1).max(50),
    });
    const r = schema.safeParse(args);
    if (!r.success) return { valid: false, error: r.error.message };
    return { valid: true, normalized: r.data };
  }
  if (toolName === 'save_measurement') {
    const schema = z.object({
      date: z.string().refine(isValidDate, { message: 'date must be YYYY-MM-DD format' }),
      measurements: z.array(z.object({
        part: z.string().min(1).max(50),
        value: z.number().min(0).max(500),
        unit: z.enum(['cm', 'kg']).optional(),
      })).min(1).max(20),
    });
    const r = schema.safeParse(args);
    if (!r.success) return { valid: false, error: r.error.message };
    return { valid: true, normalized: r.data };
  }
  if (toolName === 'query_workout') {
    const schema = z.object({
      start_date: z.string().optional(),
      end_date: z.string().optional(),
      exercise_type: z.string().max(50).optional(),
    });
    const r = schema.safeParse(args);
    if (!r.success) return { valid: false, error: r.error.message };
    return { valid: true, normalized: r.data };
  }
  if (toolName === 'query_measurement') {
    const schema = z.object({
      start_date: z.string().optional(),
      end_date: z.string().optional(),
    });
    const r = schema.safeParse(args);
    if (!r.success) return { valid: false, error: r.error.message };
    return { valid: true, normalized: r.data };
  }
  return { valid: true, normalized: args };
};

export interface GuardResult {
  allowed: boolean;
  reason?: string;
  normalizedArgs?: any;
}

export function guardToolCall(role: UserRole, toolName: string, args: any): GuardResult {
  if (!WHITELIST[role]?.includes(toolName)) {
    return { allowed: false, reason: `tool "${toolName}" not in whitelist for role ${role}` };
  }
  const validation = validateParam(toolName, args);
  if (!validation.valid) {
    return { allowed: false, reason: `param out of range: ${validation.error}` };
  }
  return { allowed: true, normalizedArgs: validation.normalized };
}