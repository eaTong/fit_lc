import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { queryService } from '../services/queryService';
import { validateToolInput, formatValidationError } from './utils/validation';

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
      // 预校验输入
      const validation = validateToolInput('query_measurement', { userId, start_date, end_date, body_part });
      if (!validation.valid) {
        return JSON.stringify({
          aiReply: `查询参数不完整：${formatValidationError(validation)}`,
          dataType: 'measurement_query',
          status: 'needs_more_info',
          missingFields: validation.missingFields
        });
      }

      const result = await queryService.queryMeasurements(userId, start_date, end_date, body_part);

      const aiReply = `📊 围度记录查询结果\n\n共 ${result.measurements?.length || 0} 条记录`;

      return JSON.stringify({
        aiReply,
        dataType: 'measurement_query',
        result: {
          measurements: result.measurements || [],
          summary: {
            totalRecords: result.measurements?.length || 0,
            startDate: start_date,
            endDate: end_date,
            bodyPart: body_part || 'all'
          }
        }
      });
    } catch (error) {
      throw new Error(`查询围度记录失败: ${error.message}`);
    }
  }
});