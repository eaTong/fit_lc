/**
 * 工具输入验证工具
 * 统一校验所有工具输入的完整性和正确性
 */

export interface MissingField {
  field: string;
  label: string;
  hint: string;
}

export interface ValidationResult {
  valid: boolean;
  missingFields: MissingField[];
  errors?: string[];
}

/**
 * 校验工具输入的完整性
 * 所有工具在执行前调用此函数
 */
export function validateToolInput(
  toolName: string,
  toolInput: Record<string, any>
): ValidationResult {
  switch (toolName) {
    case 'save_workout':
      return validateWorkoutInput(toolInput);
    case 'save_measurement':
      return validateMeasurementInput(toolInput);
    case 'query_workout':
    case 'query_measurement':
      return validateQueryInput(toolInput);
    case 'generate_plan':
      return validateGeneratePlanInput(toolInput);
    case 'adjust_plan':
      return validateAdjustPlanInput(toolInput);
    case 'analyze_execution':
      return validateAnalyzeExecutionInput(toolInput);
    default:
      return { valid: true, missingFields: [] };
  }
}

// ============== save_workout 验证 ==============

function validateWorkoutInput(input: any): ValidationResult {
  const missingFields: MissingField[] = [];
  const errors: string[] = [];

  // 校验日期
  if (!input.date) {
    missingFields.push({
      field: 'date',
      label: '训练日期',
      hint: '请提供训练日期，如"今天"或"2024-05-08"'
    });
  } else if (!isValidDate(input.date)) {
    errors.push('日期格式不正确，请使用 YYYY-MM-DD 格式');
  }

  // 校验动作列表
  if (!input.exercises || !Array.isArray(input.exercises)) {
    missingFields.push({
      field: 'exercises',
      label: '训练动作',
      hint: '请提供至少一个训练动作，如"卧推80kg 5组每组8个"'
    });
  } else if (input.exercises.length === 0) {
    missingFields.push({
      field: 'exercises',
      label: '训练动作',
      hint: '请提供至少一个训练动作'
    });
  } else {
    // 校验每个动作
    input.exercises.forEach((exercise: any, index: number) => {
      if (!exercise.name) {
        missingFields.push({
          field: `exercises[${index}].name`,
          label: `第${index + 1}个动作名称`,
          hint: '请提供动作名称'
        });
      }

      const hasWeight = exercise.weight !== undefined && exercise.weight !== null;
      const hasSets = exercise.sets !== undefined && exercise.sets !== null;
      const hasReps = exercise.reps !== undefined && exercise.reps !== null;
      const hasDuration = exercise.duration !== undefined && exercise.duration !== null;
      const hasDistance = exercise.distance !== undefined && exercise.distance !== null;

      // 有氧训练：需要 duration 或 distance
      // 力量训练：需要 weight + (sets 或 reps)
      // 徒手训练：需要 sets + reps
      const isStrengthTraining = hasWeight;
      const isCardio = hasDuration || hasDistance;
      const isBodyweight = !hasWeight && !hasDuration && !hasDistance;

      if (isStrengthTraining) {
        if (!hasSets && !hasReps) {
          missingFields.push({
            field: `exercises[${index}].sets/reps`,
            label: `第${index + 1}个动作的组数或次数`,
            hint: '力量训练需要提供组数或次数，如"5组每组8个"'
          });
        }
        if (hasWeight && (exercise.weight as number) <= 0) {
          errors.push(`第${index + 1}个动作的重量必须大于0`);
        }
      } else if (isCardio) {
        // 有氧只需 duration 或 distance 之一
      } else if (isBodyweight) {
        if (!hasSets) {
          missingFields.push({
            field: `exercises[${index}].sets`,
            label: `第${index + 1}个动作的组数`,
            hint: '徒手训练需要提供组数，如"5组"'
          });
        }
        if (!hasReps) {
          missingFields.push({
            field: `exercises[${index}].reps`,
            label: `第${index + 1}个动作的次数`,
            hint: '徒手训练需要提供每组次数，如"每组10个"'
          });
        }
      } else {
        missingFields.push({
          field: `exercises[${index}].weight/duration/distance`,
          label: `第${index + 1}个动作的训练类型`,
          hint: '请提供重量（力量训练）、时长或距离（有氧训练）'
        });
      }
    });
  }

  return {
    valid: missingFields.length === 0 && errors.length === 0,
    missingFields,
    errors: errors.length > 0 ? errors : undefined
  };
}

// ============== save_measurement 验证 ==============

function validateMeasurementInput(input: any): ValidationResult {
  const missingFields: MissingField[] = [];
  const errors: string[] = [];

  // 校验日期（可选）
  if (input.date && !isValidDate(input.date) && !isValidDateTime(input.date)) {
    errors.push('日期格式不正确，请使用 YYYY-MM-DD 或 YYYY-MM-DDTHH:mm:ss 格式');
  }

  // 校验测量数据
  if (!input.measurements || !Array.isArray(input.measurements)) {
    missingFields.push({
      field: 'measurements',
      label: '测量数据',
      hint: '请提供至少一个部位的数据，如"胸围94"'
    });
  } else if (input.measurements.length === 0) {
    missingFields.push({
      field: 'measurements',
      label: '测量数据',
      hint: '请提供至少一个部位的数据'
    });
  } else {
    const validBodyParts = ['chest', 'waist', 'hips', 'biceps', 'biceps_l', 'biceps_r', 'thighs', 'thigh_l', 'thigh_r', 'calves', 'calf_l', 'calf_r', 'weight', 'bodyFat'];

    input.measurements.forEach((m: any, index: number) => {
      if (!m.body_part) {
        missingFields.push({
          field: `measurements[${index}].body_part`,
          label: `第${index + 1}个测量部位`,
          hint: '请指定测量部位（chest/waist/hips/biceps/thighs/calves/weight/bodyFat）'
        });
      } else if (!validBodyParts.includes(m.body_part)) {
        errors.push(`第${index + 1}个测量部位无效：${m.body_part}`);
      }

      if (m.value === undefined || m.value === null) {
        missingFields.push({
          field: `measurements[${index}].value`,
          label: `第${index + 1}个测量值`,
          hint: '请提供测量值'
        });
      } else if (typeof m.value !== 'number' || isNaN(m.value)) {
        errors.push(`第${index + 1}个测量值必须是数字`);
      } else if (m.value <= 0) {
        errors.push(`第${index + 1}个测量值必须大于0`);
      }
    });
  }

  return {
    valid: missingFields.length === 0 && errors.length === 0,
    missingFields,
    errors: errors.length > 0 ? errors : undefined
  };
}

// ============== query 验证 ==============

function validateQueryInput(input: any): ValidationResult {
  const missingFields: MissingField[] = [];
  const errors: string[] = [];

  if (!input.start_date) {
    missingFields.push({
      field: 'start_date',
      label: '开始日期',
      hint: '请提供查询的开始日期'
    });
  } else if (!isValidDate(input.start_date)) {
    errors.push('开始日期格式不正确，请使用 YYYY-MM-DD 格式');
  }

  if (!input.end_date) {
    missingFields.push({
      field: 'end_date',
      label: '结束日期',
      hint: '请提供查询的结束日期'
    });
  } else if (!isValidDate(input.end_date)) {
    errors.push('结束日期格式不正确，请使用 YYYY-MM-DD 格式');
  }

  if (input.start_date && input.end_date && isValidDate(input.start_date) && isValidDate(input.end_date)) {
    if (new Date(input.start_date) > new Date(input.end_date)) {
      errors.push('开始日期不能晚于结束日期');
    }
  }

  return {
    valid: missingFields.length === 0 && errors.length === 0,
    missingFields,
    errors: errors.length > 0 ? errors : undefined
  };
}

// ============== generate_plan 验证 ==============

function validateGeneratePlanInput(input: any): ValidationResult {
  const missingFields: MissingField[] = [];
  const errors: string[] = [];

  const userProfile = input.user_profile;
  if (!userProfile) {
    missingFields.push({
      field: 'user_profile',
      label: '用户信息',
      hint: '请提供用户信息以生成计划'
    });
    return { valid: false, missingFields };
  }

  const requiredFields = [
    { name: 'goal', label: '健身目标' },
    { name: 'frequency', label: '训练频率' },
    { name: 'experience', label: '健身经验' },
    { name: 'body_weight', label: '体重' }
  ];

  requiredFields.forEach(field => {
    if (userProfile[field.name] === undefined || userProfile[field.name] === null) {
      missingFields.push({
        field: `user_profile.${field.name}`,
        label: field.label,
        hint: `请提供您的${field.label}`
      });
    }
  });

  // 校验枚举值
  if (userProfile.goal && !['bulk', 'cut', 'maintain'].includes(userProfile.goal)) {
    errors.push('健身目标必须是：bulk（增肌）、cut（减脂）或 maintain（维持）');
  }
  if (userProfile.experience && !['beginner', 'intermediate', 'advanced'].includes(userProfile.experience)) {
    errors.push('健身经验必须是：beginner（初级）、intermediate（中级）或 advanced（高级）');
  }
  if (userProfile.frequency && (userProfile.frequency < 1 || userProfile.frequency > 7)) {
    errors.push('训练频率必须在 1-7 次/周之间');
  }
  if (userProfile.body_weight && userProfile.body_weight <= 0) {
    errors.push('体重必须大于0');
  }

  return {
    valid: missingFields.length === 0 && errors.length === 0,
    missingFields,
    errors: errors.length > 0 ? errors : undefined
  };
}

// ============== adjust_plan 验证 ==============

function validateAdjustPlanInput(input: any): ValidationResult {
  const missingFields: MissingField[] = [];
  const errors: string[] = [];

  if (!input.plan_id && !input.planId) {
    missingFields.push({
      field: 'plan_id',
      label: '计划ID',
      hint: '请提供要调整的计划ID'
    });
  }

  if (!input.adjustment && !input.adjustment_description) {
    missingFields.push({
      field: 'adjustment',
      label: '调整内容',
      hint: '请描述您想要如何调整计划'
    });
  }

  return {
    valid: missingFields.length === 0 && errors.length === 0,
    missingFields,
    errors: errors.length > 0 ? errors : undefined
  };
}

// ============== analyze_execution 验证 ==============

function validateAnalyzeExecutionInput(input: any): ValidationResult {
  const missingFields: MissingField[] = [];
  const errors: string[] = [];

  if (!input.plan_id && !input.planId) {
    missingFields.push({
      field: 'plan_id',
      label: '计划ID',
      hint: '请提供要分析的计划ID'
    });
  }

  // 注意：execution_date 是可选的，工具 schema 中没有此字段
  // 如果后续需要特定日期分析，可扩展此验证

  return {
    valid: missingFields.length === 0,
    missingFields,
    errors: errors.length > 0 ? errors : undefined
  };
}

// ============== 辅助函数 ==============

function isValidDate(dateStr: string): boolean {
  if (!dateStr) return false;
  // YYYY-MM-DD 格式
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;

  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date.getTime());
}

function isValidDateTime(dateStr: string): boolean {
  if (!dateStr) return false;
  // YYYY-MM-DDTHH:mm:ss 格式
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?$/;
  if (!regex.test(dateStr)) return false;

  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * 从验证结果生成人类可读的错误消息
 */
export function formatValidationError(result: ValidationResult): string {
  const parts: string[] = [];

  if (result.missingFields.length > 0) {
    const fieldLabels = result.missingFields.map(f => f.label).join('、');
    parts.push(`缺少必要信息：${fieldLabels}`);
  }

  if (result.errors && result.errors.length > 0) {
    parts.push(result.errors.join('；'));
  }

  return parts.join('；');
}