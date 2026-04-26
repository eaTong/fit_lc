// @ts-nocheck
import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { saveService } from '../services/saveService';

export const saveWorkoutTool = new DynamicStructuredTool({
  name: "save_workout",
  description: `当用户要记录健身训练时使用。不要在询问围度时使用。

  触发示例：
  - "今天跑了5公里"
  - "深蹲100kg 5组每组8个"
  - "练了30分钟hiit"
  - "做了100个俯卧撑分5组"

  输入：date (YYYY-MM-DD), exercises数组。注意：userId 会由系统自动注入。`,
  schema: z.object({
    date: z.string().describe("训练日期 YYYY-MM-DD"),
    exercises: z.array(z.object({
      name: z.string().describe("运动名称"),
      sets: z.number().optional().describe("组数"),
      reps: z.number().optional().describe("次数"),
      weight: z.number().optional().describe("重量(kg)"),
      duration: z.number().optional().describe("时长(分钟)"),
      distance: z.number().optional().describe("距离(公里)")
    }))
  }),
  func: async ({ userId, date, exercises }) => {
    try {
      // 如果没有提供日期，默认使用今天
      const finalDate = date || new Date().toISOString().split('T')[0];
      const result = await saveService.saveWorkout(userId, finalDate, exercises);
      return `__SAVED_ID__:${result.id}:workout__${result.message}`;
    } catch (error) {
      throw new Error(`保存训练记录失败: ${error.message}`);
    }
  }
});