// @ts-nocheck
import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { planService } from '../services/planService';
import { exerciseRepository } from '../repositories/exerciseRepository';

// Types matching the Zod schema
type Goal = 'bulk' | 'cut' | 'maintain';
type Experience = 'beginner' | 'intermediate' | 'advanced';

interface UserProfile {
  name?: string;
  goal: Goal;
  frequency: number;
  experience: Experience;
  equipment: string;
  targetMuscles?: string[];
  conditions?: string;
  body_weight: number;
  body_fat?: number;
  height: number;
  duration_weeks: number;
}

interface GeneratedExercise {
  exerciseId: number | null;
  exerciseName: string;
  dayOfWeek: number;
  targetMuscles: string | null;
  sets: number;
  reps: string;
  weight: number | null;
  duration: number | null;
  restSeconds: number;
  orderIndex: number;
}

interface ToolInput {
  userId: number;
  user_profile: UserProfile;
}

/**
 * Generate exercises for workout plan based on user profile
 * Queries from Exercise table based on equipment, difficulty, and muscle groups
 */
export async function generateExercisesForProfile(userProfile: UserProfile): Promise<GeneratedExercise[]> {
  const { goal, frequency, experience, equipment, targetMuscles } = userProfile;

  // 解析器械列表
  const equipmentList = equipment
    ? equipment.split(',').map(e => e.trim().toLowerCase())
    : [];

  // 器械名称映射（中英文）
  const equipmentMapping = {
    '杠铃': 'barbell', 'barbell': 'barbell',
    '哑铃': 'dumbbell', 'dumbbell': 'dumbbell',
    '龙门架': 'cable', 'cable': 'cable',
    '器械': 'machine', 'machine': 'machine',
    '自重': 'bodyweight', 'bodyweight': 'bodyweight',
    '其他': 'other', 'other': 'other'
  };

  // 将用户输入的器械转换为枚举值
  const equipmentEnums = equipmentList
    .map(e => equipmentMapping[e])
    .filter(Boolean);

  // 如果没有指定器械，使用所有常见器械
  const equipmentFilter = equipmentEnums.length > 0
    ? { in: equipmentEnums }
    : undefined;

  // 肌肉群恢复周期（小时）
  const muscleRecoveryHours = {
    chest: 72, back: 72, legs: 72,    // 大肌群 72小时
    shoulders: 48, arms: 48, core: 48  // 小肌群 48小时
  };

  // 标准分配模式（增肌）
  const splitPatterns = {
    3: [  // 一周3练：推/拉/腿
      { day: 1, muscles: ['chest', 'shoulders', 'arms'], name: '上肢推' },
      { day: 2, muscles: ['back', 'arms'], name: '上肢拉' },
      { day: 3, muscles: ['legs', 'core'], name: '下肢' }
    ],
    4: [  // 一周4练：胸背/肩臂/腿/核心有氧
      { day: 1, muscles: ['chest', 'arms'], name: '胸部+三头' },
      { day: 2, muscles: ['back', 'arms'], name: '背部+二头' },
      { day: 3, muscles: ['legs', 'shoulders'], name: '腿部+肩部' },
      { day: 4, muscles: ['core'], name: '核心+有氧' }
    ],
    5: [  // 一周5练：胸/背/肩/腿/臂+核心
      { day: 1, muscles: ['chest'], name: '胸部' },
      { day: 2, muscles: ['back'], name: '背部' },
      { day: 3, muscles: ['shoulders', 'arms'], name: '肩+手臂' },
      { day: 4, muscles: ['legs'], name: '腿部' },
      { day: 5, muscles: ['core'], name: '核心' }
    ],
    6: [  // 一周6练：推/拉/腿/推/拉/腿
      { day: 1, muscles: ['chest', 'shoulders'], name: '推' },
      { day: 2, muscles: ['back'], name: '拉' },
      { day: 3, muscles: ['legs'], name: '腿' },
      { day: 4, muscles: ['chest', 'shoulders'], name: '推' },
      { day: 5, muscles: ['back'], name: '拉' },
      { day: 6, muscles: ['legs'], name: '腿' }
    ]
  };

  // 获取合适的训练分配模式
  const daysPerWeek = Math.min(frequency, 6);
  const splitPattern = splitPatterns[daysPerWeek] || splitPatterns[4];

  // 根据目标调整
  let exerciseSets = 3;
  let exerciseReps = '8-12';
  if (goal === 'bulk') {
    exerciseSets = 4;  // 增肌增加容量
  } else if (goal === 'cut') {
    exerciseSets = 3;
    exerciseReps = '10-15';  // 减脂提高次数
  }

  // 查询动作库
  const exercises = await exerciseRepository.findAll({
    equipment: equipmentFilter,
    difficulty: experience,
    status: 'published'
  });

  // 按肌肉群分组动作
  const exercisesByMuscle = {};
  for (const ex of exercises) {
    for (const em of ex.muscles) {
      const muscleGroup = em.muscle.group;
      if (!exercisesByMuscle[muscleGroup]) {
        exercisesByMuscle[muscleGroup] = [];
      }
      exercisesByMuscle[muscleGroup].push({
        exerciseId: ex.id,
        exerciseName: ex.name,
        muscleGroup,
        role: em.role,
        sets: exerciseSets,
        reps: exerciseReps,
        restSeconds: 60
      });
    }
  }

  // 生成计划动作
  const planExercises = [];
  let orderIndex = 0;

  for (const dayPlan of splitPattern) {
    for (const muscleGroup of dayPlan.muscles) {
      // 获取该肌肉群的动作
      const muscleExercises = exercisesByMuscle[muscleGroup] || [];

      // 优先选择主发力肌肉的动作
      const primaryExercises = muscleExercises.filter(e => e.role === 'primary');
      const secondaryExercises = muscleExercises.filter(e => e.role === 'secondary');

      // 选择动作：主+辅各1-2个
      const selectedPrimary = primaryExercises.slice(0, 2);
      const selectedSecondary = secondaryExercises.slice(0, 1);
      const selected = [...selectedPrimary, ...selectedSecondary];

      // 如果目标肌肉明确，优先选择目标肌肉的动作
      if (targetMuscles && targetMuscles.includes(muscleGroup)) {
        // 确保至少有一个动作
        if (selected.length === 0 && muscleExercises.length > 0) {
          selected.push(muscleExercises[0]);
        }
      }

      for (const ex of selected) {
        planExercises.push({
          exerciseId: ex.exerciseId,
          exerciseName: ex.exerciseName,
          dayOfWeek: dayPlan.day,
          targetMuscles: muscleGroup,
          sets: ex.sets,
          reps: ex.reps,
          weight: null,  // AI生成时不确定重量
          duration: null,
          restSeconds: ex.restSeconds,
          orderIndex: orderIndex++
        });
      }
    }

    // 增肌/减脂添加有氧
    if (goal === 'cut' || goal === 'maintain') {
      planExercises.push({
        exerciseId: null,
        exerciseName: '有氧运动',
        dayOfWeek: dayPlan.day,
        targetMuscles: 'cardio',
        sets: 1,
        reps: '1',
        weight: null,
        duration: goal === 'cut' ? 30 : 20,
        restSeconds: 0,
        orderIndex: orderIndex++
      });
    }
  }

  // 如果没有找到足够动作，使用备用硬编码动作
  if (planExercises.length < daysPerWeek * 2) {
    return generateFallbackExercises(userProfile);
  }

  return planExercises;
}

/**
 * 备用动作生成（当动作库为空时使用）
 */
function generateFallbackExercises(userProfile: UserProfile): GeneratedExercise[] {
  const { goal, frequency, experience } = userProfile;

  const exerciseSets = goal === 'bulk' ? 4 : 3;
  const exerciseReps = goal === 'cut' ? '10-15' : '8-12';

  // 基础动作库（硬编码备用）
  const fallbackExercises = {
    chest: [
      { exerciseName: '杠铃卧推', targetMuscles: 'chest', default_sets: exerciseSets, default_reps: exerciseReps },
      { exerciseName: '哑铃飞鸟', targetMuscles: 'chest', default_sets: 3, default_reps: '12-15' }
    ],
    back: [
      { exerciseName: '引体向上', targetMuscles: 'back', default_sets: exerciseSets, default_reps: '8-10' },
      { exerciseName: '杠铃划船', targetMuscles: 'back', default_sets: exerciseSets, default_reps: exerciseReps }
    ],
    shoulders: [
      { exerciseName: '哑铃肩推', targetMuscles: 'shoulders', default_sets: exerciseSets, default_reps: exerciseReps },
      { exerciseName: '侧平举', targetMuscles: 'shoulders', default_sets: 3, default_reps: '12-15' }
    ],
    legs: [
      { exerciseName: '杠铃深蹲', targetMuscles: 'legs', default_sets: exerciseSets, default_reps: '6-8' },
      { exerciseName: '腿弯举', targetMuscles: 'legs', default_sets: 3, default_reps: exerciseReps }
    ],
    arms: [
      { exerciseName: '杠铃弯举', targetMuscles: 'arms', default_sets: exerciseSets, default_reps: exerciseReps },
      { exerciseName: '绳索下压', targetMuscles: 'arms', default_sets: 3, default_reps: exerciseReps }
    ],
    core: [
      { exerciseName: '平板支撑', targetMuscles: 'core', default_sets: 3, default_reps: '60秒' },
      { exerciseName: '卷腹', targetMuscles: 'core', default_sets: 3, default_reps: '20' }
    ]
  };

  const daysPerWeek = Math.min(frequency, 6);
  const muscleGroups = ['chest', 'back', 'shoulders', 'legs', 'arms', 'core'];
  const exercises = [];
  let orderIndex = 0;

  for (let day = 1; day <= daysPerWeek; day++) {
    const muscleGroup = muscleGroups[(day - 1) % muscleGroups.length];
    const dayExercises = fallbackExercises[muscleGroup] || [];

    for (const ex of dayExercises.slice(0, 2)) {
      exercises.push({
        exerciseId: null,
        exerciseName: ex.exerciseName,
        dayOfWeek: day,
        targetMuscles: ex.targetMuscles,
        sets: ex.default_sets,
        reps: ex.default_reps,
        weight: null,
        duration: null,
        restSeconds: 60,
        orderIndex: orderIndex++
      });
    }
  }

  return exercises;
}

// TODO: 补充信息完整性校验逻辑
export const generatePlanTool = new DynamicStructuredTool({
  name: "generate_plan",
  description: `当用户请求生成健身计划时使用此工具。

  触发示例：
  - "帮我生成一个健身计划"
  - "我想增肌，给我做个计划"
  - "生成一个12周的训练计划"
  - "我是初学者，想要一周三练的计划"

  输入：user_id 和用户资料（目标、训练频率、经验水平、可用设备等）`,
  schema: z.object({
    userId: z.number().describe("用户ID"),
    user_profile: z.object({
      name: z.string().optional().describe("计划名称"),
      goal: z.enum(["bulk", "cut", "maintain"]).describe("健身目标：bulk增肌, cut减脂, maintain保持"),
      frequency: z.number().describe("每周训练次数"),
      experience: z.enum(["beginner", "intermediate", "advanced"]).describe("训练经验水平"),
      equipment: z.string().describe("可用健身设备列表，逗号分隔"),
      targetMuscles: z.array(z.string()).optional().describe("优先训练的肌肉群"),
      conditions: z.string().optional().describe("身体状况或限制"),
      body_weight: z.number().describe("体重(kg)"),
      body_fat: z.number().optional().describe("体脂率(%)"),
      height: z.number().describe("身高(cm)"),
      duration_weeks: z.number().describe("计划周期(周)")
    })
  }),
  func: async ({ userId, user_profile }: ToolInput) => {
    try {
      // Generate exercises based on user profile
      const exercises = await generateExercisesForProfile(user_profile);

      // Create plan in database
      const planId = await planService.createPlan(userId, user_profile, exercises);

      // Generate response message
      const goalText = user_profile.goal === 'bulk' ? '增肌' : user_profile.goal === 'cut' ? '减脂' : '保持';
      const expText = user_profile.experience === 'beginner' ? '初级' : user_profile.experience === 'intermediate' ? '中级' : '高级';

      let message = `健身计划已生成！\n\n`;
      message += `计划周期：${user_profile.duration_weeks}周\n`;
      message += `训练频率：每周${user_profile.frequency}次\n`;
      message += `目标：${goalText}\n`;
      message += `经验水平：${expText}\n\n`;

      // 按训练日分组展示
      const byDay = {};
      for (const ex of exercises) {
        if (!byDay[ex.dayOfWeek]) byDay[ex.dayOfWeek] = [];
        byDay[ex.dayOfWeek].push(ex.exerciseName);
      }

      message += `训练安排：\n`;
      const dayNames = ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];
      for (const [day, dayExercises] of Object.entries(byDay)) {
        message += `${dayNames[parseInt(day)] || day}：${dayExercises.join('、')}\n`;
      }

      message += `\n你可以查看计划详情，或让我调整某些训练动作。`;

      const schedule = [];
      for (const [day, dayExercises] of Object.entries(byDay)) {
        schedule.push({
          dayOfWeek: parseInt(day),
          dayName: dayNames[parseInt(day)] || day,
          exercises: dayExercises
        });
      }

      return JSON.stringify({
        aiReply: message,
        dataType: 'plan',
        result: {
          planId,
          planName: user_profile.name || '健身计划',
          durationWeeks: user_profile.duration_weeks,
          frequency: user_profile.frequency,
          goal: goalText,
          experience: expText,
          schedule
        }
      });
    } catch (error) {
      throw new Error(`生成健身计划失败: ${error.message}`);
    }
  }
});
