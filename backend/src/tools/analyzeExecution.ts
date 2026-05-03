import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { planService } from '../services/planService';

export const analyzeExecutionTool = new DynamicStructuredTool({
  name: "analyze_execution",
  description: `当用户询问计划执行情况、进度、或请求优化建议时使用。

  触发示例：
  - "计划执行得怎么样？"
  - "我的训练进度如何？"
  - "有什么建议吗？"
  - "分析一下我的计划执行情况"

  输入：user_id 和 plan_id`,
  schema: z.object({
    userId: z.number().describe("用户ID"),
    planId: z.number().describe("计划ID")
  }),
  func: async ({ userId, planId }) => {
    try {
      const analysis = await planService.getPlanAnalysis(planId, userId);

      // Build response message with stats and suggestions
      let message = `计划执行分析报告\n\n`;
      message += `执行进度：${analysis.stats.completionRate}%\n`;
      message += `已完成：${analysis.stats.completed}次\n`;
      message += `跳过：${analysis.stats.skipped}次\n`;
      message += `待完成：${analysis.stats.pending}次\n\n`;

      if (analysis.suggestions && analysis.suggestions.length > 0) {
        message += `建议：\n`;
        analysis.suggestions.forEach((s, i) => {
          message += `${i + 1}. ${s}\n`;
        });
      } else {
        message += `继续保持当前节奏！`;
      }

      return JSON.stringify({
        aiReply: message,
        dataType: 'execution_analysis',
        result: {
          planId,
          stats: {
            completionRate: analysis.stats.completionRate,
            completed: analysis.stats.completed,
            skipped: analysis.stats.skipped,
            pending: analysis.stats.pending
          },
          suggestions: analysis.suggestions || []
        }
      });
    } catch (error) {
      throw new Error(`分析计划执行失败: ${error.message}`);
    }
  }
});