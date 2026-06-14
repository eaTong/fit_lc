/**
 * 保存围度测量记录工具
 * 验证输入完整性和数值有效性
 */

import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { Decimal } from '@prisma/client/runtime/client';
import prisma from '../config/prisma';
import { achievementService } from '../services/achievementService';
import { statsService } from '../services/statsService';
import { validateToolInput, formatValidationError } from './utils/validation';
import { saveMeasurementWithIdempotency } from '../services/saveMeasurementService';

// 类型定义
type BodyPart = "chest" | "waist" | "hips" | "biceps" | "thighs" | "calves" | "other" | "weight" | "bodyFat";

interface MeasurementInput {
  body_part: BodyPart;
  value: number;
}

interface ToolInput {
  userId: number;
  date?: string;
  measurements: MeasurementInput[];
  idempotency_key?: string;
}

// 有效的身体部位
const VALID_BODY_PARTS = ['chest', 'waist', 'hips', 'biceps', 'biceps_l', 'biceps_r', 'thighs', 'thigh_l', 'thigh_r', 'calves', 'calf_l', 'calf_r', 'weight', 'bodyFat'];

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

  【可选字段】
  - idempotency_key: 客户端生成的去重键。同一 user_id + idempotency_key 重复调用只保存一次。LLM 不要自己编造此字段，仅当用户或上游系统显式传入时使用。

  输入：date (YYYY-MM-DD 或 YYYY-MM-DDTHH:mm:ss，不提供默认今天), measurements数组。
  注意：userId 会由系统自动注入。
  体重和体脂率可以一天记录多次（使用不同时间戳）。`,
  schema: z.object({
    date: z.string().describe("测量日期时间 YYYY-MM-DD 或 YYYY-MM-DDTHH:mm:ss，支持同一天多次记录"),
    measurements: z.array(z.object({
      body_part: z.enum(["chest", "waist", "hips", "biceps", "biceps_l", "biceps_r", "thighs", "thigh_l", "thigh_r", "calves", "calf_l", "calf_r", "weight", "bodyFat"])
        .describe("身体部位：chest/waist/hips/biceps/biceps_l/biceps_r/thighs/thigh_l/thigh_r/calves/calf_l/calf_r/weight/bodyFat"),
      value: z.number().describe("数值(cm)或(kg/%)")
    })),
    idempotency_key: z.string().optional().describe("客户端生成的去重键，LLM 不应自行构造"),
  }),
  func: async ({ userId, date, measurements, idempotency_key }: ToolInput) => {
    try {
      // 预校验输入
      const validation = validateToolInput('save_measurement', { userId, date, measurements });
      if (!validation.valid) {
        const missingLabels = validation.missingFields.map(f => f.label).join('、');
        return JSON.stringify({
          aiReply: `信息不完整，需要补充：${missingLabels}`,
          dataType: 'measurement',
          status: 'needs_more_info',
          missingFields: validation.missingFields
        });
      }

      // 如果没有提供日期，默认使用今天
      const finalDate = date || new Date().toISOString().split('T')[0];

      // 解析日期
      let dateObj: Date;
      if (finalDate.includes('T')) {
        dateObj = new Date(finalDate);
      } else {
        const [year, month, day] = finalDate.split('-').map(Number);
        const now = new Date();
        dateObj = new Date(year, month - 1, day, now.getHours(), now.getMinutes(), now.getSeconds());
      }

      // 1. 幂等写入（service 层：命中 key 时直接返回旧记录，不再写入）
      const { measurement: result, isReplay } = await saveMeasurementWithIdempotency({
        userId,
        date: dateObj.toISOString(),
        measurements: measurements
          .filter(m => m && m.body_part !== undefined && m.value !== undefined)
          .map(m => ({ body_part: m.body_part, value: m.value })),
        idempotencyKey: idempotency_key,
      });

      // 2. 重放命中：短路返回，避免重复触发累计统计 / 徽章 / 里程碑
      if (isReplay) {
        return JSON.stringify({
          aiReply: `✅ 已经保存过这次围度记录了（${finalDate}），无需重复提交。`,
          dataType: 'measurement',
          status: 'success',
          isReplay: true,
          result: {
            id: result.id,
            date: finalDate,
            measurements: measurements.map(m => ({
              body_part: m.body_part,
              value: m.value
            })),
          },
        });
      }

      // 3. 首次写入：继续走原有累计统计 / 徽章 / 里程碑流程
      // 更新累计统计（在独立事务中）
      await statsService.updateAggregatedStats(userId);

      // 检查是否首次围度记录（在保存之前查询）
      const measurementCountBefore = await prisma.bodyMeasurement.count({
        where: { userId, deletedAt: null }
      });
      const isFirstMeasurement = measurementCountBefore === 0;

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

      const message = `已保存：${measurements.map(m => `${m.body_part} ${m.value}cm`).join('，')}`;
      const aiReply = `${message}${achievementMsg}`;

      return JSON.stringify({
        aiReply,
        dataType: 'measurement',
        result: {
          id: result.id,
          date: finalDate,
          measurements: measurements.map(m => ({
            body_part: m.body_part,
            value: m.value
          })),
          isFirstMeasurement,
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