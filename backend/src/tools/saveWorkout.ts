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

  【必填字段】
  - date: 日期，格式 YYYY-MM-DD，不提供则默认今天
  - exercises: 至少包含一个动作，每个动作必须包含：
    * name: 动作名称（必填）
    * 以下三选一（至少提供一项）：
      - weight + sets 或 reps: 力量训练（如"卧推80kg 5组每组8个"）
      - duration: 有氧训练（如"跑步30分钟"）
      - distance: 有氧训练（如"跑了5公里"）
    * 如果是徒手训练（俯卧撑、引体向上等），至少需要 sets + reps

  【信息不完整时】
  如果用户输入缺少上述必填字段，请先追问用户补充完整信息再调用此 Tool。
  例如：
  - 用户说"卧推80公斤" → 追问："卧推80公斤，几组每组几次呢？"
  - 用户说"做了俯卧撑" → 追问："做了多少组，每组几次？"

  触发示例：
  - "今天跑了5公里" → 调用 Tool (distance: 5)
  - "深蹲100kg 5组每组8个" → 调用 Tool (weight: 100, sets: 5, reps: 8)
  - "练了30分钟hiit" → 调用 Tool (duration: 30)
  - "做了100个俯卧撑分5组" → 追问用户每组几次

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
        const prResultList = await personalRecordService.checkAndUpdatePR(
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
        // 将所有新 PR 加入结果
        prResults.push(...prResultList);
      }

      // 更新累计统计
      await statsService.updateAggregatedStats(userId);

      // 检查徽章和里程碑
      const achievements = await achievementService.checkBadges(userId, { type: 'workout' });
      const milestones = achievements.length > 0 ? await achievementService.checkMilestones(userId) : [];

      // 构建成就反馈消息
      let achievementMsg = '';
      if (prResults.length > 0) {
        const prList = prResults.map(pr => {
          const typeLabel = {
            'max_weight': '重量',
            'max_volume': '容量',
            'max_distance': '距离',
            'max_duration': '时长',
            'max_speed': '速度'
          }[pr.recordType] || pr.recordType;
          const unit = {
            'max_weight': 'kg',
            'max_volume': 'kg',
            'max_distance': 'km',
            'max_duration': 'min',
            'max_speed': 'km/h'
          }[pr.recordType] || '';
          return `🏆 ${pr.exerciseName} ${typeLabel}: ${pr.oldValue || 0}${unit} → ${pr.newValue}${unit}`;
        }).join('\n');
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

      const feedbackMsg = feedback.personalized_comment;
      const aiReply = `${result.message}\n\n${feedbackMsg}${achievementMsg}`;

      return JSON.stringify({
        aiReply,
        dataType: 'workout',
        result: {
          id: result.id,
          date: finalDate,
          exercises: exercises.map(e => ({
            name: e.name,
            sets: e.sets,
            reps: e.reps,
            weight: e.weight,
            duration: e.duration,
            distance: e.distance
          })),
          feedback: {
            personalized_comment: feedback.personalized_comment,
            comparison_with_last: feedback.comparison_with_last
          },
          achievements: prResults.length > 0 || achievements.length > 0 || milestones.length > 0 ? {
            isNewPR: prResults.length > 0,
            prRecords: prResults,
            badges: achievements.map(b => b.name),
            milestones: milestones.map(m => m.name)
          } : undefined
        }
      });
    } catch (error) {
      throw new Error(`保存训练记录失败: ${error.message}`);
    }
  }
});