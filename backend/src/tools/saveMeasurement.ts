// @ts-nocheck
import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { saveService } from '../services/saveService';

export const saveMeasurementTool = new DynamicStructuredTool({
  name: "save_measurement",
  description: `当用户要记录身体围度时使用。不要在记录训练时使用。

  触发示例：
  - "今天胸围94，腰围78"
  - "测了一下臂围34"
  - "腰又粗了，现在是80"

  支持部位：chest(胸), waist(腰), hips(臀), biceps(臂), thighs(腿), calves(小腿)

  输入：date (YYYY-MM-DD), measurements数组。注意：userId 会由系统自动注入。`,
  schema: z.object({
    date: z.string().describe("测量日期 YYYY-MM-DD"),
    measurements: z.array(z.object({
      body_part: z.enum(["chest", "waist", "hips", "biceps", "thighs", "calves", "other"])
        .describe("身体部位"),
      value: z.number().describe("数值(cm)")
    }))
  }),
  func: async ({ userId, date, measurements }) => {
    try {
      // 如果没有提供日期，默认使用今天
      const finalDate = date || new Date().toISOString().split('T')[0];
      const result = await saveService.saveMeasurement(userId, finalDate, measurements);
      return `__SAVED_TYPE__:measurement:${result.id}:{}__MESSAGE__${result.message}`;
    } catch (error) {
      throw new Error(`保存围度记录失败: ${error.message}`);
    }
  }
});