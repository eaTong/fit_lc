/**
 * V3 Agent State Definition
 * LangGraph 状态类型定义
 */

import { z } from 'zod';

export const MessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
});

export const VisionResultSchema = z.object({
  message: z.string(),
  imageAnalysis: z.string().optional(),
  error: z.string().optional(),
});

export const ToolResultSchema = z.object({
  toolName: z.string(),
  success: z.boolean(),
  result: z.any().optional(),
  error: z.string().optional(),
});

export const AgentStateSchema = z.object({
  userId: z.number(),
  message: z.string(),
  imageUrls: z.array(z.string()).default([]),
  visionResult: VisionResultSchema.optional(),
  history: z.array(MessageSchema).default([]),
  historySummary: z.string().optional(),
  llmMessages: z.array(z.any()).default([]),
  toolCalls: z.array(z.any()).default([]),
  toolResults: z.array(ToolResultSchema).default([]),
  needsClarification: z.boolean().default(false),
  reply: z.string().optional(),
  toolData: z.any().optional(),
  visionError: z.string().optional(),
  errors: z.array(z.string()).default([]),
  isFinal: z.boolean().default(false),
});

export type AgentState = z.infer<typeof AgentStateSchema>;