import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { queryService } from '../services/queryService';

export const queryMeasurementTool = new DynamicStructuredTool({
  name: "query_measurement",
  description: `当用户询问身体围度、围度变化、对比时使用。

  触发示例：
  - "我的围度有什么变化？"
  - "胸围对比三个月前？"
  - "最近腰有没有变细？"

  输入：user_id, start_date (YYYY-MM-DD), end_date (YYYY-MM-DD), body_part (可选)`,
  schema: z.object({
    userId: z.number().describe("用户ID"),
    start_date: z.string().describe("开始日期 YYYY-MM-DD"),
    end_date: z.string().describe("结束日期 YYYY-MM-DD"),
    body_part: z.string().optional().describe("部位(可选)")
  }),
  func: async ({ userId, start_date, end_date, body_part }) => {
    try {
      const result = await queryService.queryMeasurements(userId, start_date, end_date, body_part);
      return result;
    } catch (error) {
      throw new Error(`查询围度记录失败: ${error.message}`);
    }
  }
});