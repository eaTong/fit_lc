import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { planService } from '../services/planService';

/**
 * Adjust an existing workout plan
 * @param {number} planId - Plan ID to adjust
 * @param {string} adjustment - Adjustment description (e.g., "把周三换成练胸", "重量太重了降低一点")
 * @returns {string} Result message
 */
export const adjustPlanTool = new DynamicStructuredTool({
  name: "adjust_plan",
  description: `当用户请求调整现有健身计划时使用此工具。

  触发示例：
  - "把周三换成练胸"
  - "增加有氧时间"
  - "重量太重了降低一点"
  - "把训练频率从3次改成4次"
  - "周一的动作换成肩膀"

  输入：user_id、plan_id 和调整内容描述`,
  schema: z.object({
    userId: z.number().describe("用户ID"),
    plan_id: z.number().describe("要调整的计划ID"),
    adjustment: z.string().describe("调整内容描述，可以是自然语言或JSON格式")
  }),
  func: async ({ userId, plan_id, adjustment }) => {
    try {
      // Parse adjustment string - MVP implementation
      let adjustmentData = {};

      try {
        adjustmentData = JSON.parse(adjustment);
      } catch {
        adjustmentData = { description: adjustment };
      }

      // Call plan service to adjust plan
      await planService.adjustPlan(plan_id, userId, adjustmentData);

      // Generate response message
      let message = `计划已调整！\n\n`;
      message += `调整内容：${adjustment}\n`;
      message += `你可以查看更新后的计划详情。`;

      return JSON.stringify({
        aiReply: message,
        dataType: 'plan_adjustment',
        result: {
          planId: plan_id,
          adjustment,
          success: true
        }
      });
    } catch (error) {
      throw new Error(`调整健身计划失败: ${error.message}`);
    }
  }
});