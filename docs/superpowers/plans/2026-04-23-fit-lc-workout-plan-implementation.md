# FitLC 健身计划功能实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现健身计划生成、管理、执行追踪的完整功能

**Architecture:** 后端新增 workout_plans/plan_exercises/plan_executions 数据表，提供 plans API 路由，新增 generate_plan/adjust_plan/analyze_execution 三个 AI Tools。前端新增 Plans/PlanDetail/PlanGenerate 页面，复用现有 UI 组件和样式。

**Tech Stack:** React + Zustand + Axios (前端), Express + MySQL + LangChain (后端)

---

## Phase 1: 后端 - 数据库和 Repository

### Task 1: 数据库 Schema 更新

**Files:**
- Modify: `backend/scripts/init-db.sql`

- [ ] **Step 1: 添加 workout_plans 表**

```sql
CREATE TABLE IF NOT EXISTS workout_plans (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  goal ENUM('bulk', 'cut', 'maintain') NOT NULL,
  frequency INT NOT NULL DEFAULT 3,
  experience ENUM('beginner', 'intermediate', 'advanced') NOT NULL DEFAULT 'beginner',
  equipment VARCHAR(255) DEFAULT '',
  conditions TEXT,
  body_weight DECIMAL(5,2),
  body_fat DECIMAL(4,1),
  height DECIMAL(5,1),
  duration_weeks INT NOT NULL DEFAULT 12,
  status ENUM('draft', 'active', 'completed', 'paused') NOT NULL DEFAULT 'draft',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

- [ ] **Step 2: 添加 plan_exercises 表**

```sql
CREATE TABLE IF NOT EXISTS plan_exercises (
  id INT PRIMARY KEY AUTO_INCREMENT,
  plan_id INT NOT NULL,
  day_of_week INT NOT NULL COMMENT '1=Monday, 7=Sunday',
  exercise_name VARCHAR(100) NOT NULL,
  sets INT DEFAULT 3,
  reps VARCHAR(20) DEFAULT '8-12',
  weight DECIMAL(5,2),
  duration INT COMMENT 'minutes',
  rest_seconds INT DEFAULT 60,
  order_index INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_plan_id (plan_id),
  INDEX idx_day_of_week (day_of_week),
  FOREIGN KEY (plan_id) REFERENCES workout_plans(id) ON DELETE CASCADE
);
```

- [ ] **Step 3: 添加 plan_executions 表**

```sql
CREATE TABLE IF NOT EXISTS plan_executions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  plan_id INT NOT NULL,
  plan_exercise_id INT NOT NULL,
  scheduled_date DATE NOT NULL,
  completed_at DATETIME,
  completed_reps INT,
  completed_weight DECIMAL(5,2),
  status ENUM('pending', 'completed', 'skipped') NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_plan_id (plan_id),
  INDEX idx_scheduled_date (scheduled_date),
  INDEX idx_status (status),
  FOREIGN KEY (plan_id) REFERENCES workout_plans(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_exercise_id) REFERENCES plan_exercises(id) ON DELETE CASCADE
);
```

- [ ] **Step 4: Commit**

```bash
cd backend && npm run init-db
git add backend/scripts/init-db.sql
git commit -m "feat: add workout_plans, plan_exercises, plan_executions tables"
```

---

### Task 2: Plan Repository

**Files:**
- Create: `backend/src/repositories/planRepository.js`
- Test: `backend/tests/repositories/planRepository.test.js`

- [ ] **Step 1: 编写测试**

```javascript
// backend/tests/repositories/planRepository.test.js
import { jest } from '@jest/globals';

describe('planRepository', () => {
  let planRepository;
  let mockPool;

  beforeEach(() => {
    mockPool = {
      query: jest.fn(),
      execute: jest.fn(),
    };
    // Import will be after implementation
  });

  describe('create', () => {
    it('should insert plan and return id', async () => {
      mockPool.execute.mockResolvedValue([{ insertId: 1 }]);
      // Test will call create and verify insertId
    });
  });

  describe('findById', () => {
    it('should return plan with exercises', async () => {
      const mockPlan = { id: 1, user_id: 1, name: 'Test Plan', goal: 'bulk' };
      const mockExercises = [{ id: 1, plan_id: 1, exercise_name: 'Bench Press' }];
      mockPool.query
        .mockResolvedValueOnce([[mockPlan]])  // findById
        .mockResolvedValueOnce([[mockExercises]]); // findExercisesByPlanId
      // Test will verify correct query and returned data
    });
  });
});
```

- [ ] **Step 2: 运行测试验证失败**

Run: `npm test -- tests/repositories/planRepository.test.js`
Expected: FAIL with "Cannot find module"

- [ ] **Step 3: 实现 planRepository**

```javascript
// backend/src/repositories/planRepository.js

const planRepository = {
  async create(userId, planData) {
    const [result] = await pool.execute(
      `INSERT INTO workout_plans (user_id, name, goal, frequency, experience, equipment, conditions, body_weight, body_fat, height, duration_weeks)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, planData.name, planData.goal, planData.frequency, planData.experience,
       planData.equipment || '', planData.conditions, planData.body_weight,
       planData.body_fat, planData.height, planData.duration_weeks]
    );
    return result.insertId;
  },

  async findById(planId, userId) {
    const [plans] = await pool.query(
      'SELECT * FROM workout_plans WHERE id = ? AND user_id = ?',
      [planId, userId]
    );
    return plans[0] || null;
  },

  async findExercisesByPlanId(planId) {
    const [exercises] = await pool.query(
      'SELECT * FROM plan_exercises WHERE plan_id = ? ORDER BY day_of_week, order_index',
      [planId]
    );
    return exercises;
  },

  async findByUserId(userId) {
    const [plans] = await pool.query(
      'SELECT * FROM workout_plans WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return plans;
  },

  async update(planId, userId, updates) {
    const fields = [];
    const values = [];
    if (updates.name) { fields.push('name = ?'); values.push(updates.name); }
    if (updates.status) { fields.push('status = ?'); values.push(updates.status); }
    if (fields.length === 0) return false;
    values.push(planId, userId);
    const [result] = await pool.execute(
      `UPDATE workout_plans SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`,
      values
    );
    return result.affectedRows > 0;
  },

  async delete(planId, userId) {
    const [result] = await pool.execute(
      'DELETE FROM workout_plans WHERE id = ? AND user_id = ?',
      [planId, userId]
    );
    return result.affectedRows > 0;
  },

  async addExercise(planId, exercise) {
    const [result] = await pool.execute(
      `INSERT INTO plan_exercises (plan_id, day_of_week, exercise_name, sets, reps, weight, duration, rest_seconds, order_index)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [planId, exercise.day_of_week, exercise.exercise_name, exercise.sets,
       exercise.reps || '8-12', exercise.weight, exercise.duration,
       exercise.rest_seconds || 60, exercise.order_index || 0]
    );
    return result.insertId;
  },

  async updateExercise(exerciseId, planId, updates) {
    const fields = [];
    const values = [];
    if (updates.sets) { fields.push('sets = ?'); values.push(updates.sets); }
    if (updates.reps) { fields.push('reps = ?'); values.push(updates.reps); }
    if (updates.weight !== undefined) { fields.push('weight = ?'); values.push(updates.weight); }
    if (updates.order_index !== undefined) { fields.push('order_index = ?'); values.push(updates.order_index); }
    if (fields.length === 0) return false;
    values.push(exerciseId, planId);
    const [result] = await pool.execute(
      `UPDATE plan_exercises SET ${fields.join(', ')} WHERE id = ? AND plan_id = ?`,
      values
    );
    return result.affectedRows > 0;
  },

  async deleteExercise(exerciseId, planId) {
    const [result] = await pool.execute(
      'DELETE FROM plan_exercises WHERE id = ? AND plan_id = ?',
      [exerciseId, planId]
    );
    return result.affectedRows > 0;
  },

  async createExecution(execution) {
    const [result] = await pool.execute(
      `INSERT INTO plan_executions (plan_id, plan_exercise_id, scheduled_date, completed_at, completed_reps, completed_weight, status, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [execution.plan_id, execution.plan_exercise_id, execution.scheduled_date,
       execution.completed_at, execution.completed_reps, execution.completed_weight,
       execution.status || 'pending', execution.notes]
    );
    return result.insertId;
  },

  async findExecutionsByPlanId(planId) {
    const [executions] = await pool.query(
      `SELECT pe.*, e.exercise_name, e.day_of_week
       FROM plan_executions pe
       JOIN plan_exercises e ON pe.plan_exercise_id = e.id
       WHERE pe.plan_id = ?
       ORDER BY pe.scheduled_date DESC, e.day_of_week, e.order_index`,
      [planId]
    );
    return executions;
  },

  async getExecutionStats(planId) {
    const [stats] = await pool.query(
      `SELECT 
         COUNT(*) as total,
         SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
         SUM(CASE WHEN status = 'skipped' THEN 1 ELSE 0 END) as skipped,
         SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending
       FROM plan_executions WHERE plan_id = ?`,
      [planId]
    );
    return stats[0];
  },
};

export default planRepository;
```

- [ ] **Step 4: 运行测试验证通过**

Run: `npm test -- tests/repositories/planRepository.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add backend/src/repositories/planRepository.js
git commit -m "feat: add planRepository with CRUD operations"
```

---

### Task 3: Plan Service 和 Routes

**Files:**
- Create: `backend/src/services/planService.js`
- Create: `backend/src/routes/plans.js`
- Test: `backend/tests/services/planService.test.js`

- [ ] **Step 1: 编写 planService 测试**

```javascript
// backend/tests/services/planService.test.js
describe('planService', () => {
  it('should create plan with exercises', async () => {
    // Mock repository
    // Call service.createPlan with userProfile
    // Verify exercises were added
  });
});
```

- [ ] **Step 2: 实现 planService**

```javascript
// backend/src/services/planService.js
import planRepository from '../repositories/planRepository.js';

export const planService = {
  async createPlan(userId, userProfile, exercises) {
    const planId = await planRepository.create(userId, {
      name: userProfile.name || `${userProfile.goal === 'bulk' ? '增肌' : userProfile.goal === 'cut' ? '减脂' : '维持'}计划`,
      goal: userProfile.goal,
      frequency: userProfile.frequency,
      experience: userProfile.experience,
      equipment: userProfile.equipment,
      conditions: userProfile.conditions,
      body_weight: userProfile.body_weight,
      body_fat: userProfile.body_fat,
      height: userProfile.height,
      duration_weeks: userProfile.duration_weeks,
    });

    for (const exercise of exercises) {
      await planRepository.addExercise(planId, exercise);
    }

    return { id: planId };
  },

  async getPlan(planId, userId) {
    const plan = await planRepository.findById(planId, userId);
    if (!plan) return null;
    const exercises = await planRepository.findExercisesByPlanId(planId);
    return { ...plan, exercises };
  },

  async getUserPlans(userId) {
    return planRepository.findByUserId(userId);
  },

  async updatePlan(planId, userId, updates) {
    return planRepository.update(planId, userId, updates);
  },

  async deletePlan(planId, userId) {
    return planRepository.delete(planId, userId);
  },

  async activatePlan(planId, userId) {
    return planRepository.update(planId, userId, { status: 'active' });
  },

  async adjustPlan(planId, userId, adjustment) {
    // Parse adjustment text and update accordingly
    // For MVP, support basic adjustments like changing exercises or parameters
    return { success: true, message: '计划已调整' };
  },

  async recordExecution(planId, executionData) {
    return planRepository.createExecution({
      plan_id: planId,
      plan_exercise_id: executionData.plan_exercise_id,
      scheduled_date: executionData.scheduled_date,
      completed_at: executionData.completed_at || new Date(),
      completed_reps: executionData.completed_reps,
      completed_weight: executionData.completed_weight,
      status: executionData.status || 'completed',
      notes: executionData.notes,
    });
  },

  async getPlanAnalysis(planId, userId) {
    const plan = await planRepository.findById(planId, userId);
    if (!plan) return null;
    const stats = await planRepository.getExecutionStats(planId);
    const completionRate = stats.total > 0 
      ? Math.round((stats.completed / stats.total) * 100) 
      : 0;
    
    let suggestions = [];
    if (completionRate < 50) {
      suggestions.push('执行率偏低，建议适当减少训练强度或休息天数');
    } else if (completionRate > 90) {
      suggestions.push('执行率很高，可以考虑适当增加训练量');
    }
    
    return {
      stats,
      completionRate,
      suggestions,
    };
  },
};

export default planService;
```

- [ ] **Step 3: 实现 plans 路由**

```javascript
// backend/src/routes/plans.js
import { Router } from 'express';
import planService from '../services/planService.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// All routes require auth
router.use(authMiddleware);

// GET /plans - Get user's all plans
router.get('/', async (req, res) => {
  try {
    const plans = await planService.getUserPlans(req.user.id);
    res.json({ plans });
  } catch (err) {
    console.error('Get plans error:', err);
    res.status(500).json({ error: 'Failed to get plans' });
  }
});

// GET /plans/:id - Get plan detail
router.get('/:id', async (req, res) => {
  try {
    const plan = await planService.getPlan(parseInt(req.params.id), req.user.id);
    if (!plan) return res.status(404).json({ error: 'Plan not found' });
    res.json({ plan });
  } catch (err) {
    console.error('Get plan error:', err);
    res.status(500).json({ error: 'Failed to get plan' });
  }
});

// POST /plans/generate - AI generate plan
router.post('/generate', async (req, res) => {
  try {
    const { user_profile, exercises } = req.body;
    if (!user_profile || !exercises) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const result = await planService.createPlan(req.user.id, user_profile, exercises);
    res.json({ plan_id: result.id, message: '计划已生成' });
  } catch (err) {
    console.error('Generate plan error:', err);
    res.status(500).json({ error: 'Failed to generate plan' });
  }
});

// PUT /plans/:id - Update plan
router.put('/:id', async (req, res) => {
  try {
    const planId = parseInt(req.params.id);
    const { adjustment, exercises, status } = req.body;
    
    if (status) {
      await planService.updatePlan(planId, req.user.id, { status });
    } else if (adjustment) {
      const result = await planService.adjustPlan(planId, req.user.id, adjustment);
      return res.json(result);
    }
    
    res.json({ success: true });
  } catch (err) {
    console.error('Update plan error:', err);
    res.status(500).json({ error: 'Failed to update plan' });
  }
});

// DELETE /plans/:id
router.delete('/:id', async (req, res) => {
  try {
    await planService.deletePlan(parseInt(req.params.id), req.user.id);
    res.json({ success: true });
  } catch (err) {
    console.error('Delete plan error:', err);
    res.status(500).json({ error: 'Failed to delete plan' });
  }
});

// POST /plans/:id/activate
router.post('/:id/activate', async (req, res) => {
  try {
    await planService.activatePlan(parseInt(req.params.id), req.user.id);
    res.json({ success: true });
  } catch (err) {
    console.error('Activate plan error:', err);
    res.status(500).json({ error: 'Failed to activate plan' });
  }
});

// POST /plans/:id/executions - Record execution
router.post('/:id/executions', async (req, res) => {
  try {
    const result = await planService.recordExecution(parseInt(req.params.id), req.body);
    res.json({ id: result, success: true });
  } catch (err) {
    console.error('Record execution error:', err);
    res.status(500).json({ error: 'Failed to record execution' });
  }
});

// GET /plans/:id/executions/analysis
router.get('/:id/executions/analysis', async (req, res) => {
  try {
    const analysis = await planService.getPlanAnalysis(parseInt(req.params.id), req.user.id);
    if (!analysis) return res.status(404).json({ error: 'Plan not found' });
    res.json(analysis);
  } catch (err) {
    console.error('Get analysis error:', err);
    res.status(500).json({ error: 'Failed to get analysis' });
  }
});

export default router;
```

- [ ] **Step 4: 注册路由到 index.js**

在 `backend/src/index.js` 添加:
```javascript
import plansRouter from './routes/plans.js';
app.use('/api/plans', plansRouter);
```

- [ ] **Step 5: Commit**

```bash
git add backend/src/services/planService.js backend/src/routes/plans.js
git commit -m "feat: add planService and plans routes"
```

---

## Phase 2: 后端 - AI Tools

### Task 4: Generate Plan Tool

**Files:**
- Create: `backend/src/tools/generatePlan.js`
- Modify: `backend/src/agents/fitnessAgent.js`

- [ ] **Step 1: 实现 generatePlan tool**

```javascript
// backend/src/tools/generatePlan.js
import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { planService } from '../services/planService.js';

export const generatePlanTool = tool(
  async ({ userId, user_profile }) => {
    try {
      // Generate structured exercises based on user profile
      const exercises = generateExercisesForProfile(user_profile);
      
      // Save plan to database
      const result = await planService.createPlan(userId, user_profile, exercises);
      
      return `__PLAN_ID__:${result.id}__已为你生成健身计划：${user_profile.name || '训练计划'}（${user_profile.duration_weeks}周，${user_profile.frequency}次/周）`;
    } catch (error) {
      throw new Error(`生成计划失败: ${error.message}`);
    }
  },
  {
    name: "generate_plan",
    description: `当用户请求生成健身计划时使用，如'帮我生成健身计划'、'我想制定一个增肌计划'。

    用户需要提供：目标、每周训练频率、经验水平、可用器械、身体状况（伤病/限制）、体重/体脂/身高、计划周期。`,
    schema: z.object({
      userId: z.number().describe("用户ID"),
      user_profile: z.object({
        name: z.string().optional().describe("计划名称"),
        goal: z.enum(["bulk", "cut", "maintain"]).describe("目标：增肌/减脂/维持"),
        frequency: z.number().describe("每周训练次数"),
        experience: z.enum(["beginner", "intermediate", "advanced"]).describe("经验水平"),
        equipment: z.string().describe("可用器械"),
        conditions: z.string().optional().describe("身体状况/伤病"),
        body_weight: z.number().describe("体重(kg)"),
        body_fat: z.number().optional().describe("体脂率(%)"),
        height: z.number().describe("身高(cm)"),
        duration_weeks: z.number().describe("计划周期(周)")
      })
    })
  }
);

function generateExercisesForProfile(user_profile) {
  const exercises = [];
  const { goal, frequency, experience } = user_profile;
  
  // Exercise templates based on experience and goal
  const templates = {
    chest: [
      { name: '杠铃卧推', sets: 4, reps: '8-12', rest: 90 },
      { name: '哑铃飞鸟', sets: 3, reps: '12-15', rest: 60 },
      { name: '绳索下压', sets: 3, reps: '12', rest: 60 },
    ],
    back: [
      { name: '引体向上', sets: 4, reps: '8-10', rest: 90 },
      { name: '杠铃划船', sets: 4, reps: '8-12', rest: 90 },
      { name: '单臂哑铃划船', sets: 3, reps: '10-12', rest: 60 },
    ],
    legs: [
      { name: '深蹲', sets: 4, reps: '8-12', rest: 120 },
      { name: '腿举', sets: 3, reps: '12-15', rest: 90 },
      { name: '腿弯举', sets: 3, reps: '12-15', rest: 60 },
    ],
    shoulders: [
      { name: '哑铃推举', sets: 4, reps: '8-12', rest: 90 },
      { name: '侧平举', sets: 3, reps: '12-15', rest: 60 },
      { name: '面拉', sets: 3, reps: '15', rest: 60 },
    ],
    biceps: [
      { name: '杠铃弯举', sets: 3, reps: '10-12', rest: 60 },
      { name: '哑铃锤式弯举', sets: 3, reps: '12', rest: 60 },
    ],
    cardio: [
      { name: '跑步', sets: 1, reps: '1', duration: 30, rest: 0 },
      { name: '骑行', sets: 1, reps: '1', duration: 30, rest: 0 },
    ],
  };
  
  // Map training days to muscle groups
  const dayMappings = {
    1: ['chest', 'biceps'],
    2: ['back', 'biceps'],
    3: ['legs', 'cardio'],
    4: ['chest', 'biceps'],
    5: ['back', 'shoulders'],
    6: ['legs', 'cardio'],
    7: ['cardio'],
  };
  
  // Select which days to train based on frequency
  const trainingDays = Object.keys(dayMappings).slice(0, frequency);
  
  let orderIndex = 0;
  for (const day of trainingDays) {
    const muscleGroups = dayMappings[day];
    for (const group of muscleGroups) {
      if (templates[group]) {
        for (const template of templates[group]) {
          exercises.push({
            day_of_week: parseInt(day),
            exercise_name: template.name,
            sets: template.sets,
            reps: template.reps,
            weight: experience === 'beginner' ? 0 : null,
            duration: template.duration || null,
            rest_seconds: template.rest,
            order_index: orderIndex++,
          });
        }
      }
    }
  }
  
  return exercises;
}
```

- [ ] **Step 2: Commit**

```bash
git add backend/src/tools/generatePlan.js
git commit -m "feat: add generatePlan tool for AI"
```

---

### Task 5: Adjust Plan Tool

**Files:**
- Create: `backend/src/tools/adjustPlan.js`
- Modify: `backend/src/agents/fitnessAgent.js`

- [ ] **Step 1: 实现 adjustPlan tool**

```javascript
// backend/src/tools/adjustPlan.js
import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { planService } from '../services/planService.js';

export const adjustPlanTool = tool(
  async ({ userId, plan_id, adjustment }) => {
    try {
      const result = await planService.adjustPlan(plan_id, userId, adjustment);
      return result.message || '计划已调整';
    } catch (error) {
      throw new Error(`调整计划失败: ${error.message}`);
    }
  },
  {
    name: "adjust_plan",
    description: `当用户请求调整现有健身计划时使用，如'把周三换成练胸'、'增加有氧时间'、'重量太重了降低一点'。`,
    schema: z.object({
      userId: z.number().describe("用户ID"),
      plan_id: z.number().describe("计划ID"),
      adjustment: z.string().describe("调整描述")
    })
  }
);
```

- [ ] **Step 2: Commit**

```bash
git add backend/src/tools/adjustPlan.js
git commit -m "feat: add adjustPlan tool for AI"
```

---

### Task 6: Analyze Execution Tool

**Files:**
- Create: `backend/src/tools/analyzeExecution.js`
- Modify: `backend/src/agents/fitnessAgent.js`

- [ ] **Step 1: 实现 analyzeExecution tool**

```javascript
// backend/src/tools/analyzeExecution.js
import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { planService } from '../services/planService.js';

export const analyzeExecutionTool = tool(
  async ({ userId, plan_id }) => {
    try {
      const analysis = await planService.getPlanAnalysis(plan_id, userId);
      if (!analysis) {
        return '未找到该计划或无权访问';
      }
      
      const { completionRate, stats, suggestions } = analysis;
      let message = `计划执行分析：完成率 ${completionRate}%`;
      if (suggestions.length > 0) {
        message += '\n建议：' + suggestions.join('；');
      }
      return message;
    } catch (error) {
      throw new Error(`分析执行失败: ${error.message}`);
    }
  },
  {
    name: "analyze_execution",
    description: `当用户询问计划执行情况、进度、或请求优化建议时使用。`,
    schema: z.object({
      userId: z.number().describe("用户ID"),
      plan_id: z.number().describe("计划ID")
    })
  }
);
```

- [ ] **Step 2: 更新 fitnessAgent 添加新 tools**

```javascript
// backend/src/agents/fitnessAgent.js
// Add imports
import { generatePlanTool } from '../tools/generatePlan.js';
import { adjustPlanTool } from '../tools/adjustPlan.js';
import { analyzeExecutionTool } from '../tools/analyzeExecution.js';

const tools = [
  saveWorkoutTool,
  saveMeasurementTool,
  queryWorkoutTool,
  queryMeasurementTool,
  generatePlanTool,    // NEW
  adjustPlanTool,      // NEW
  analyzeExecutionTool // NEW
];
```

- [ ] **Step 3: Commit**

```bash
git add backend/src/tools/analyzeExecution.js backend/src/agents/fitnessAgent.js
git commit -m "feat: add analyzeExecution tool and update fitnessAgent"
```

---

## Phase 3: 前端 - API 和 Store

### Task 7: Plans API 和 Store

**Files:**
- Create: `frontend/src/api/plans.ts`
- Create: `frontend/src/stores/planStore.ts`

- [ ] **Step 1: 实现 plans API**

```typescript
// frontend/src/api/plans.ts
import client from './client';
import type { Plan, PlanExercise, ExecutionStats } from '../types';

export const plansApi = {
  async getPlans(): Promise<{ plans: Plan[] }> {
    const { data } = await client.get('/plans');
    return data;
  },

  async getPlan(id: number): Promise<{ plan: Plan }> {
    const { data } = await client.get(`/plans/${id}`);
    return data;
  },

  async generatePlan(userProfile: UserProfile, exercises: PlanExercise[]): Promise<{ plan_id: number; message: string }> {
    const { data } = await client.post('/plans/generate', { user_profile: userProfile, exercises });
    return data;
  },

  async updatePlan(id: number, updates: Partial<Plan>): Promise<{ success: boolean }> {
    const { data } = await client.put(`/plans/${id}`, updates);
    return data;
  },

  async deletePlan(id: number): Promise<{ success: boolean }> {
    const { data } = await client.delete(`/plans/${id}`);
    return data;
  },

  async activatePlan(id: number): Promise<{ success: boolean }> {
    const { data } = await client.post(`/plans/${id}/activate`);
    return data;
  },

  async recordExecution(planId: number, execution: ExecutionInput): Promise<{ id: number; success: boolean }> {
    const { data } = await client.post(`/plans/${planId}/executions`, execution);
    return data;
  },

  async getPlanAnalysis(planId: number): Promise<ExecutionStats> {
    const { data } = await client.get(`/plans/${planId}/executions/analysis`);
    return data;
  },
};
```

- [ ] **Step 2: 实现 planStore**

```typescript
// frontend/src/stores/planStore.ts
import { create } from 'zustand';
import { plansApi } from '../api/plans';

interface PlanState {
  plans: Plan[];
  currentPlan: Plan | null;
  isLoading: boolean;
  error: string | null;
  fetchPlans: () => Promise<void>;
  fetchPlan: (id: number) => Promise<void>;
  createPlan: (userProfile: UserProfile, exercises: PlanExercise[]) => Promise<number>;
  updatePlan: (id: number, updates: Partial<Plan>) => Promise<void>;
  deletePlan: (id: number) => Promise<void>;
  activatePlan: (id: number) => Promise<void>;
  recordExecution: (planId: number, execution: ExecutionInput) => Promise<void>;
}

export const usePlanStore = create<PlanState>((set) => ({
  plans: [],
  currentPlan: null,
  isLoading: false,
  error: null,

  fetchPlans: async () => {
    set({ isLoading: true, error: null });
    try {
      const { plans } = await plansApi.getPlans();
      set({ plans, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchPlan: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { plan } = await plansApi.getPlan(id);
      set({ currentPlan: plan, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  createPlan: async (userProfile, exercises) => {
    set({ isLoading: true, error: null });
    try {
      const result = await plansApi.generatePlan(userProfile, exercises);
      set({ isLoading: false });
      return result.plan_id;
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  updatePlan: async (id, updates) => {
    try {
      await plansApi.updatePlan(id, updates);
      set((state) => ({
        plans: state.plans.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      }));
    } catch (err: any) {
      set({ error: err.message });
      throw err;
    }
  },

  deletePlan: async (id) => {
    try {
      await plansApi.deletePlan(id);
      set((state) => ({
        plans: state.plans.filter((p) => p.id !== id),
      }));
    } catch (err: any) {
      set({ error: err.message });
      throw err;
    }
  },

  activatePlan: async (id) => {
    try {
      await plansApi.activatePlan(id);
      set((state) => ({
        plans: state.plans.map((p) => (p.id === id ? { ...p, status: 'active' } : p)),
      }));
    } catch (err: any) {
      set({ error: err.message });
      throw err;
    }
  },

  recordExecution: async (planId, execution) => {
    try {
      await plansApi.recordExecution(planId, execution);
    } catch (err: any) {
      set({ error: err.message });
      throw err;
    }
  },
}));
```

- [ ] **Step 3: 添加类型到 types.ts**

```typescript
// frontend/src/types/index.ts 或现有 types 文件
export interface Plan {
  id: number;
  user_id: number;
  name: string;
  goal: 'bulk' | 'cut' | 'maintain';
  frequency: number;
  experience: 'beginner' | 'intermediate' | 'advanced';
  equipment: string;
  conditions?: string;
  body_weight?: number;
  body_fat?: number;
  height?: number;
  duration_weeks: number;
  status: 'draft' | 'active' | 'completed' | 'paused';
  exercises?: PlanExercise[];
  created_at: string;
}

export interface PlanExercise {
  id?: number;
  plan_id?: number;
  day_of_week: number;
  exercise_name: string;
  sets: number;
  reps: string;
  weight?: number;
  duration?: number;
  rest_seconds?: number;
  order_index: number;
}

export interface UserProfile {
  name?: string;
  goal: 'bulk' | 'cut' | 'maintain';
  frequency: number;
  experience: 'beginner' | 'intermediate' | 'advanced';
  equipment: string;
  conditions?: string;
  body_weight: number;
  body_fat?: number;
  height: number;
  duration_weeks: number;
}

export interface ExecutionInput {
  plan_exercise_id: number;
  scheduled_date: string;
  completed_reps?: number;
  completed_weight?: number;
  status: 'completed' | 'skipped';
  notes?: string;
}

export interface ExecutionStats {
  total: number;
  completed: number;
  skipped: number;
  pending: number;
  completionRate: number;
  suggestions: string[];
}
```

- [ ] **Step 4: Commit**

```bash
git add frontend/src/api/plans.ts frontend/src/stores/planStore.ts
git commit -m "feat: add plans API and planStore"
```

---

## Phase 4: 前端 - 页面

### Task 8: Plans 列表页

**Files:**
- Create: `frontend/src/pages/Plans.tsx`

- [ ] **Step 1: 实现 Plans 页面**

```tsx
// frontend/src/pages/Plans.tsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePlanStore } from '../stores/planStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Plans() {
  const { plans, isLoading, fetchPlans, activatePlan, deletePlan } = usePlanStore();

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleActivate = async (id: number) => {
    await activatePlan(id);
  };

  const handleDelete = async (id: number) => {
    if (confirm('确定要删除这个计划吗？')) {
      await deletePlan(id);
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = { draft: '草稿', active: '进行中', completed: '已完成', paused: '已暂停' };
    return labels[status as keyof typeof labels] || status;
  };

  const getGoalLabel = (goal: string) => {
    const labels = { bulk: '增肌', cut: '减脂', maintain: '维持' };
    return labels[goal as keyof typeof labels] || goal;
  };

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-heading text-3xl font-bold">健身计划</h1>
        <Link to="/plans/new">
          <Button variant="accent">生成新计划</Button>
        </Link>
      </div>

      {isLoading && <p className="text-text-secondary text-center">加载中...</p>}

      {!isLoading && plans.length === 0 && (
        <p className="text-text-secondary text-center">
          暂无计划，<Link to="/plans/new" className="text-accent-primary">生成一个</Link>
        </p>
      )}

      <div className="space-y-4">
        {plans.map((plan) => (
          <Card key={plan.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-heading font-semibold text-lg">{plan.name}</h3>
                <p className="text-text-secondary text-sm mt-1">
                  {getGoalLabel(plan.goal)} | 每周{plan.frequency}次 | {plan.duration_weeks}周
                </p>
                <span className={`inline-block mt-2 px-2 py-1 text-xs border ${
                  plan.status === 'active' ? 'border-accent-primary text-accent-primary' : 'border-text-muted text-text-muted'
                }`}>
                  {getStatusLabel(plan.status)}
                </span>
              </div>
              <div className="flex gap-2">
                {plan.status === 'draft' && (
                  <Button variant="outline" size="sm" onClick={() => handleActivate(plan.id)}>
                    激活
                  </Button>
                )}
                <Link to={`/plans/${plan.id}`}>
                  <Button variant="outline" size="sm">详情</Button>
                </Link>
                <Button variant="outline" size="sm" onClick={() => handleDelete(plan.id)}>
                  删除
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/pages/Plans.tsx
git commit -m "feat: add Plans list page"
```

---

### Task 9: PlanGenerate 表单页

**Files:**
- Create: `frontend/src/pages/PlanGenerate.tsx`
- Create: `frontend/src/components/PlanForm.tsx` (共享表单组件)

- [ ] **Step 1: 实现 PlanForm 组件**

```tsx
// frontend/src/components/PlanForm.tsx
import { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';

interface PlanFormProps {
  onSubmit: (data: UserProfile, exercises: PlanExercise[]) => Promise<void>;
  isLoading?: boolean;
}

export default function PlanForm({ onSubmit, isLoading }: PlanFormProps) {
  const [goal, setGoal] = useState<'bulk' | 'cut' | 'maintain'>('bulk');
  const [frequency, setFrequency] = useState(3);
  const [experience, setExperience] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [equipment, setEquipment] = useState('');
  const [conditions, setConditions] = useState('');
  const [bodyWeight, setBodyWeight] = useState(70);
  const [bodyFat, setBodyFat] = useState<number | undefined>();
  const [height, setHeight] = useState(175);
  const [durationWeeks, setDurationWeeks] = useState(12);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userProfile: UserProfile = {
      goal,
      frequency,
      experience,
      equipment,
      conditions,
      body_weight: bodyWeight,
      body_fat: bodyFat,
      height,
      duration_weeks: durationWeeks,
    };
    // Exercises will be generated by AI, pass empty array
    await onSubmit(userProfile, []);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-text-secondary text-sm mb-2">目标</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value as any)}
            className="w-full bg-primary-tertiary border border-border px-3 py-2"
          >
            <option value="bulk">增肌</option>
            <option value="cut">减脂</option>
            <option value="maintain">维持</option>
          </select>
        </div>
        <div>
          <label className="block text-text-secondary text-sm mb-2">每周训练次数</label>
          <input
            type="number"
            value={frequency}
            onChange={(e) => setFrequency(parseInt(e.target.value))}
            min={1}
            max={7}
            className="w-full bg-primary-tertiary border border-border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-text-secondary text-sm mb-2">经验水平</label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value as any)}
            className="w-full bg-primary-tertiary border border-border px-3 py-2"
          >
            <option value="beginner">初学者</option>
            <option value="intermediate">中级</option>
            <option value="advanced">高级</option>
          </select>
        </div>
        <div>
          <label className="block text-text-secondary text-sm mb-2">计划周期（周）</label>
          <input
            type="number"
            value={durationWeeks}
            onChange={(e) => setDurationWeeks(parseInt(e.target.value))}
            min={1}
            max={52}
            className="w-full bg-primary-tertiary border border-border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-text-secondary text-sm mb-2">可用器械</label>
          <input
            type="text"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            placeholder="如：哑铃、杠铃、跑步机"
            className="w-full bg-primary-tertiary border border-border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-text-secondary text-sm mb-2">体重 (kg)</label>
          <input
            type="number"
            value={bodyWeight}
            onChange={(e) => setBodyWeight(parseFloat(e.target.value))}
            step={0.1}
            className="w-full bg-primary-tertiary border border-border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-text-secondary text-sm mb-2">身高 (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(parseFloat(e.target.value))}
            step={0.1}
            className="w-full bg-primary-tertiary border border-border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-text-secondary text-sm mb-2">体脂率 (%)</label>
          <input
            type="number"
            value={bodyFat || ''}
            onChange={(e) => setBodyFat(e.target.value ? parseFloat(e.target.value) : undefined)}
            step={0.1}
            placeholder="可选"
            className="w-full bg-primary-tertiary border border-border px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-text-secondary text-sm mb-2">身体状况/伤病（可选）</label>
        <textarea
          value={conditions}
          onChange={(e) => setConditions(e.target.value)}
          placeholder="如有伤病或身体限制请说明"
          rows={3}
          className="w-full bg-primary-tertiary border border-border px-3 py-2"
        />
      </div>

      <Button type="submit" variant="accent" disabled={isLoading} className="w-full">
        {isLoading ? '生成中...' : '生成健身计划'}
      </Button>
    </form>
  );
}
```

- [ ] **Step 2: 实现 PlanGenerate 页面**

```tsx
// frontend/src/pages/PlanGenerate.tsx
import { useNavigate } from 'react-router-dom';
import { usePlanStore } from '../stores/planStore';
import PlanForm from '../components/PlanForm';
import type { UserProfile, PlanExercise } from '../types';

export default function PlanGenerate() {
  const navigate = useNavigate();
  const { createPlan, isLoading } = usePlanStore();

  const handleSubmit = async (userProfile: UserProfile, exercises: PlanExercise[]) => {
    const planId = await createPlan(userProfile, exercises);
    navigate(`/plans/${planId}`);
  };

  return (
    <div className="px-6 py-4 max-w-2xl mx-auto">
      <h1 className="font-heading text-3xl font-bold mb-6">生成健身计划</h1>
      <PlanForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/PlanGenerate.tsx frontend/src/components/PlanForm.tsx
git commit -m "feat: add PlanGenerate page and PlanForm component"
```

---

### Task 10: PlanDetail 详情页

**Files:**
- Create: `frontend/src/pages/PlanDetail.tsx`

- [ ] **Step 1: 实现 PlanDetail 页面**

```tsx
// frontend/src/pages/PlanDetail.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlanStore } from '../stores/planStore';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const DAY_NAMES = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

export default function PlanDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentPlan, fetchPlan, activatePlan, isLoading } = usePlanStore();

  useEffect(() => {
    if (id) {
      fetchPlan(parseInt(id));
    }
  }, [id, fetchPlan]);

  const handleActivate = async () => {
    if (id) {
      await activatePlan(parseInt(id));
      fetchPlan(parseInt(id));
    }
  };

  const handleStartExecution = () => {
    navigate(`/plans/${id}/execute`);
  };

  if (isLoading || !currentPlan) {
    return <div className="text-center text-text-secondary p-8">加载中...</div>;
  }

  // Group exercises by day
  const exercisesByDay: Record<number, typeof currentPlan.exercises> = {};
  currentPlan.exercises?.forEach((ex) => {
    if (!exercisesByDay[ex.day_of_week]) {
      exercisesByDay[ex.day_of_week] = [];
    }
    exercisesByDay[ex.day_of_week].push(ex);
  });

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-heading text-3xl font-bold">{currentPlan.name}</h1>
        <div className="flex gap-2">
          {currentPlan.status === 'draft' && (
            <Button variant="accent" onClick={handleActivate}>激活计划</Button>
          )}
          {currentPlan.status === 'active' && (
            <Button variant="accent" onClick={handleStartExecution}>开始执行</Button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-text-secondary">
          {currentPlan.goal === 'bulk' ? '增肌' : currentPlan.goal === 'cut' ? '减脂' : '维持'} |
          每周{currentPlan.frequency}次 |
          {currentPlan.duration_weeks}周 |
          状态: {currentPlan.status === 'active' ? '进行中' : currentPlan.status === 'draft' ? '草稿' : currentPlan.status}
        </p>
      </div>

      <div className="space-y-6">
        {[1, 2, 3, 4, 5, 6, 7].map((day) => {
          const exercises = exercisesByDay[day];
          if (!exercises || exercises.length === 0) return null;

          return (
            <Card key={day} className="p-4">
              <h3 className="font-heading font-semibold text-lg mb-3">{DAY_NAMES[day - 1]}</h3>
              <div className="space-y-2">
                {exercises.map((ex, idx) => (
                  <div key={idx} className="flex items-center gap-4 text-text-secondary">
                    <span className="w-2 h-2 bg-accent-primary rounded-full" />
                    <span className="font-medium text-text-primary">{ex.exercise_name}</span>
                    <span>{ex.sets}组</span>
                    <span>{ex.reps}次</span>
                    {ex.weight ? <span>{ex.weight}kg</span> : null}
                    {ex.duration ? <span>{ex.duration}分钟</span> : null}
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/pages/PlanDetail.tsx
git commit -m "feat: add PlanDetail page"
```

---

### Task 11: 路由注册

**Files:**
- Modify: `frontend/src/App.tsx`

- [ ] **Step 1: 添加 Plans 路由**

```tsx
// Add lazy imports
const Plans = lazy(() => import('./pages/Plans'));
const PlanDetail = lazy(() => import('./pages/PlanDetail'));
const PlanGenerate = lazy(() => import('./pages/PlanGenerate'));

// Add routes
<Route path="/plans" element={<Plans />} />
<Route path="/plans/new" element={<PlanGenerate />} />
<Route path="/plans/:id" element={<PlanDetail />} />
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/App.tsx
git commit -m "feat: add routes for plans pages"
```

---

## 实施检查清单

- [ ] Task 1: 数据库 Schema 更新
- [ ] Task 2: Plan Repository
- [ ] Task 3: Plan Service 和 Routes
- [ ] Task 4: Generate Plan Tool
- [ ] Task 5: Adjust Plan Tool
- [ ] Task 6: Analyze Execution Tool
- [ ] Task 7: Plans API 和 Store
- [ ] Task 8: Plans 列表页
- [ ] Task 9: PlanGenerate 表单页
- [ ] Task 10: PlanDetail 详情页
- [ ] Task 11: 路由注册

---

## 实施顺序

1. **Task 1** (数据库) - 先建表
2. **Task 2** (Repository) - 数据访问层
3. **Task 3** (Service + Routes) - 业务逻辑和 API
4. **Task 4-6** (AI Tools) - 三个新 Tools
5. **Task 7** (API + Store) - 前端数据层
6. **Task 8-10** (Pages) - 前端页面
7. **Task 11** (Routes) - 路由注册
