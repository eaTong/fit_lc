import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { queryService } from '../services/queryService';

export const queryWorkoutTool = new DynamicStructuredTool({
  name: "query_workout",
  description: `当用户询问训练记录、训练历史、统计数据时使用。

  触发示例：
  - "这周跑了多少次？"
  - "上个月深蹲总重量多少？"
  - "我的训练频率怎么样？"
  - "对比一下这周和上周"

  输入：user_id, start_date (YYYY-MM-DD), end_date (YYYY-MM-DD), exercise_type (可选)`,
  schema: z.object({
    userId: z.number().describe("用户ID"),
    start_date: z.string().describe("开始日期 YYYY-MM-DD"),
    end_date: z.string().describe("结束日期 YYYY-MM-DD"),
    exercise_type: z.string().optional().describe("运动类型(可选)")
  }),
  func: async ({ userId, start_date, end_date, exercise_type }) => {
    try {
      const result = await queryService.queryWorkouts(userId, start_date, end_date, exercise_type);

      const totalWorkouts = result.workouts?.length || 0;
      const totalVolume = result.workouts?.reduce((sum, w) => {
        return sum + (w.exercises?.reduce((es, e) => {
          return es + (e.weight || 0) * (e.reps || 0) * (e.sets || 0);
        }, 0) || 0);
      }, 0) || 0;

      const aiReply = `📈 训练记录查询结果\n\n共 ${totalWorkouts} 次训练，总容量 ${totalVolume}kg`;

      return JSON.stringify({
        aiReply,
        dataType: 'workout_query',
        result: {
          workouts: result.workouts || [],
          summary: {
            totalWorkouts,
            totalVolume,
            startDate: start_date,
            endDate: end_date
          }
        }
      });
    } catch (error) {
      throw new Error(`查询训练记录失败: ${error.message}`);
    }
  }
});