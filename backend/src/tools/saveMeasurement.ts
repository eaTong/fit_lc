// @ts-nocheck
import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { saveService } from '../services/saveService';
import { achievementService } from '../services/achievementService';
import { statsService } from '../services/statsService';

// TODO: 补充必填字段说明，当信息不完整时让 AI 先追问用户
export const saveMeasurementTool = new DynamicStructuredTool({
  name: "save_measurement",
  description: `当用户要记录身体围度时使用。不要在记录训练时使用。

  触发示例：
  - "今天胸围94，腰围78"
  - "测了一下臂围34"
  - "腰又粗了，现在是80"
  - "今早体重70.5kg"
  - "晚上称体重69.8kg"

  支持部位：chest(胸), waist(腰), hips(臀), biceps(臂), thighs(腿), calves(小腿), weight(体重kg), bodyFat(体脂率%)

  输入：date (YYYY-MM-DD 或 YYYY-MM-DDTHH:mm:ss，不提供默认今天), measurements数组。
  注意：userId 会由系统自动注入。
  体重和体脂率可以一天记录多次（使用不同时间戳）。`,
  schema: z.object({
    date: z.string().describe("测量日期时间 YYYY-MM-DD 或 YYYY-MM-DDTHH:mm:ss，支持同一天多次记录"),
    measurements: z.array(z.object({
      body_part: z.enum(["chest", "waist", "hips", "biceps", "thighs", "calves", "other", "weight", "bodyFat"])
        .describe("身体部位"),
      value: z.number().describe("数值(cm)或(kg/%)")
    }))
  }),
  func: async ({ userId, date, measurements }) => {
    try {
      // 如果没有提供日期，默认使用今天
      const finalDate = date || new Date().toISOString().split('T')[0];
      const result = await saveService.saveMeasurement(userId, finalDate, measurements);

      // 更新累计统计
      await statsService.updateAggregatedStats(userId);

      // 检查徽章和里程碑
      const achievements = await achievementService.checkBadges(userId, { type: 'measurement' });
      const milestones = achievements.length > 0 ? await achievementService.checkMilestones(userId) : [];

      // 构建成就反馈消息
      let achievementMsg = '';
      if (achievements.length > 0) {
        const badgeNames = achievements.map(b => `🎖️ ${b.name}`).join('、');
        achievementMsg += `\n\n🎉 **获得徽章！** ${badgeNames}`;
      }
      if (milestones.length > 0) {
        const milestoneNames = milestones.map(m => `⭐ ${m.name}`).join('、');
        achievementMsg += `\n\n🎯 **里程碑达成！** ${milestoneNames}`;
      }

      const aiReply = `${result.message}${achievementMsg}`;
      const measurementsData = measurements.map(m => ({
        body_part: m.body_part,
        value: m.value
      }));

      return JSON.stringify({
        aiReply,
        dataType: 'measurement',
        result: {
          id: result.id,
          date: finalDate,
          measurements: measurementsData,
          achievements: achievements.length > 0 || milestones.length > 0 ? {
            badges: achievements.map(b => b.name),
            milestones: milestones.map(m => m.name)
          } : undefined
        }
      });
    } catch (error) {
      throw new Error(`保存围度记录失败: ${error.message}`);
    }
  }
});