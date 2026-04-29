// @ts-nocheck
import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { saveService } from '../services/saveService';
import { generateWorkoutFeedback } from '../services/coachFeedbackService';
import { personalRecordService } from '../services/personalRecordService';
import { achievementService } from '../services/achievementService';
import { statsService } from '../services/statsService';

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

      // 生成 AI 即时反馈
      const feedback = await generateWorkoutFeedback(userId, result.id);

      // 检查 PR 突破
      const prResults = [];
      for (const exercise of exercises) {
        const prResult = await personalRecordService.checkAndUpdatePR(
          userId,
          exercise.name,
          result.id,
          {
            weight: exercise.weight,
            reps: exercise.reps,
            duration: exercise.duration,
            distance: exercise.distance
          }
        );
        if (prResult.isNewPR) {
          prResults.push(prResult);
        }
      }

      // 更新累计统计
      await statsService.updateAggregatedStats(userId);

      // 检查徽章和里程碑
      const achievements = await achievementService.checkBadges(userId, { type: 'workout' });
      const milestones = achievements.length > 0 ? await achievementService.checkMilestones(userId) : [];

      // 构建成就反馈消息
      let achievementMsg = '';
      if (prResults.length > 0) {
        const prList = prResults.map(pr => `🏆 ${pr.exerciseName} ${pr.recordType}: ${pr.oldValue || 0}kg → ${pr.newValue}kg`).join('\n');
        achievementMsg += `\n\n🔥 **个人纪录突破！**\n${prList}`;
      }
      if (achievements.length > 0) {
        const badgeNames = achievements.map(b => `🎖️ ${b.name}`).join('、');
        achievementMsg += `\n\n🎉 **获得徽章！** ${badgeNames}`;
      }
      if (milestones.length > 0) {
        const milestoneNames = milestones.map(m => `⭐ ${m.name}`).join('、');
        achievementMsg += `\n\n🎯 **里程碑达成！** ${milestoneNames}`;
      }

      // 将反馈信息附加到返回消息
      const feedbackMsg = feedback.personalized_comment;
      return `__SAVED_TYPE__:workout:${result.id}:{}__MESSAGE__${result.message}\n\n${feedbackMsg}${achievementMsg}`;
    } catch (error) {
      throw new Error(`保存训练记录失败: ${error.message}`);
    }
  }
});