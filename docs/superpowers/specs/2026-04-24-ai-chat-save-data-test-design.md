# AI 对话保存数据测试设计

> **日期：** 2026-04-24
> **目的：** 测试 AI 对话后能否正常保存数据，以及数据不明确时能否正常追问补充信息后保存

## 测试架构

```
测试分层：
├── 单轮测试 (single-round)
│   ├── 验证 AI 识别信息缺失 → 返回追问
│   └── 验证 AI 识别信息完整 → 返回 tool call
│
└── 端到端测试 (end-to-end)
    ├── 多轮对话完整流程
    ├── 数据库验证
    └── 数据补充后保存
```

## 技术方案

### 测试环境

- **数据库：** 真实 MySQL，本地测试实例
- **AI 模型：** 真实 MiniMax API（需配置 MINIMAX_API_KEY）
- **测试框架：** Jest
- **数据库清理：** 测试前清理指定表，测试后保留数据

### 测试文件结构

```
backend/tests/
├── chat/
│   ├── single-round/
│   │   ├── saveWorkout.single.test.js    # 训练保存单轮测试
│   │   ├── saveMeasurement.single.test.js # 围度保存单轮测试
│   │   └── helpers/
│   │       └── mockAI.js                 # AI 响应模拟器
│   │
│   └── end-to-end/
│       ├── saveWorkout.e2e.test.js       # 训练保存端到端测试
│       ├── saveMeasurement.e2e.test.js  # 围度保存端到端测试
│       └── data-supplement.test.js      # 数据补充场景测试
│
└── setup.js                              # 数据库清理逻辑
```

### 单轮测试（Single-Round）

#### 目标
- 验证 AI 对用户输入的响应行为
- 不涉及多轮对话状态

#### 测试用例

**saveWorkout.single.test.js：**

| 测试用例 | 用户输入 | 期望 AI 行为 |
|---------|---------|-------------|
| 信息完整 | "今天跑了5公里" | 调用 save_workout，distance=5 |
| 信息完整 | "深蹲100kg 5组每组8个" | 调用 save_workout |
| 信息缺失 | "今天练了深蹲" | 返回追问（重量？组数？） |
| 信息缺失 | "做了俯卧撑" | 返回追问（组数？每组多少次？） |
| 日期模糊 | "昨天跑了步" | 追问确认日期或自动解析 |

**saveMeasurement.single.test.js：**

| 测试用例 | 用户输入 | 期望 AI 行为 |
|---------|---------|-------------|
| 信息完整 | "胸围90腰围75臀围88" | 调用 save_measurement |
| 信息缺失 | "今天测了围度" | 返回追问（具体部位和数值） |
| 部分信息 | "胸围90" | 追问其他部位 |

### 端到端测试（End-to-End）

#### 目标
- 验证完整多轮对话流程
- 验证数据库正确保存数据

#### 重要原则：AI 行为灵活性

AI 可能在多轮对话中：
- 多次追问（先问重量 → 再问组数 → 再问每组次数）
- 分多次 tool call 保存
- 一次性保存多个训练项

**因此，端到端测试只验证最终数据库结果，不假定 AI 调用 tool 的次数或方式。**

#### 测试用例

**saveWorkout.e2e.test.js：**

| 测试用例 | 对话流程 | 期望结果 |
|---------|---------|---------|
| 正常保存 | 用户："深蹲100kg 5组8个" → AI保存 | 数据库有1条workout记录，含1条exercise |
| 追问补充 | 用户："练了腿" → AI追问 → 用户："深蹲100kg" → AI保存 | 数据库有1条workout记录 |
| 放弃保存 | 用户："练了腿" → AI追问 → 用户："算了不记了" | 数据库无workout记录 |
| 多项训练 | 用户："跑步5公里，然后深蹲100kg" → AI保存 | 数据库有1条workout记录，含2条exercise（跑步+深蹲），或2条分开的workout |

**验证方式（不关心 AI 调用几次 tool）：**

```javascript
it('should save workout after supplement dialog', async () => {
  // 1. 执行多轮对话
  const result = await runFullDialog(userId, [
    '练了腿',
    '深蹲100kg'
  ]);

  // 2. 只验证最终数据库状态，不关心 AI 调用了几次 tool
  const workouts = await workoutRepository.findByUserId(userId);
  const latestWorkout = workouts[0]; // 按时间排序取最新的

  expect(latestWorkout).not.toBeNull();
  // 验证训练项目包含深蹲
  const exercises = await workoutRepository.findExercisesByWorkoutId(latestWorkout.id);
  const squat = exercises.find(e => e.name.includes('深蹲'));
  expect(squat.weight).toBe(100);
});
```

**data-supplement.test.js：**

| 测试用例 | 对话流程 | 期望结果 |
|---------|---------|---------|
| 补充重量 | 用户："深蹲5组" → AI追问 → 用户："100kg" → AI保存 | 任意一条 workout 的 exercise 包含 weight=100 |
| 补充组数 | 用户："深蹲100kg" → AI追问 → 用户："5组" → AI保存 | 任意一条 workout 的 exercise 包含 sets=5 |
| 补充日期 | 用户："上周跑了步" → AI追问 → 用户："上周三" → AI保存 | workout.date 在期望范围内 |

## 数据库验证

每个端到端测试后验证：

```javascript
// 验证训练记录
const workout = await workoutRepository.findById(workoutId, userId);
expect(workout).not.toBeNull();
expect(workout.date).toBe(expectedDate);

// 验证训练项目
const exercises = await workoutRepository.findExercisesByWorkoutId(workoutId);
expect(exercises.length).toBe(expectedCount);
expect(exercises[0].name).toBe('深蹲');
expect(exercises[0].weight).toBe(100);
```

## 数据库清理

```javascript
// setup.js
export async function clearTestData() {
  const pool = getPool();
  // 按依赖顺序删除（外键约束）
  await pool.execute('DELETE FROM workout_exercises WHERE workout_id IN (SELECT id FROM workouts WHERE user_id = 1)');
  await pool.execute('DELETE FROM workouts WHERE user_id = 1');
  await pool.execute('DELETE FROM body_measurements WHERE user_id = 1');
  await pool.execute('DELETE FROM measurement_items WHERE measurement_id IN (SELECT id FROM body_measurements WHERE user_id = 1)');
}
```

## AI Mock vs 真实

- **单轮测试：** 使用 mockAI 模拟 AI 响应行为，控制返回追问或调用 tool
- **端到端测试：** 使用真实 MiniMax API，验证真实 AI 行为

## 成功标准

1. ✅ 单轮测试：AI 正确识别信息完整/缺失，返回正确响应
2. ✅ 端到端测试：多轮对话后数据正确保存到数据库
3. ✅ 数据补充测试：追问后用户补充信息，数据正确保存
4. ✅ 所有测试可重复运行，不互相影响

## 后续扩展

- 测试 query_workout / query_measurement 的对话场景
- 测试 generate_plan / adjust_plan / analyze_execution 的对话场景
