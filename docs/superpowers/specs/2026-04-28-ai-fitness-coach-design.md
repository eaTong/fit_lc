# AI 健身私教系统设计

## 背景与目标

基于行为设计学 Hook 模型（触发→行动→多变得赏→投入），结合现有 LangChain AI 能力，为 FitLC 构建一个虚拟健身私教角色，提升用户留存和记录完成率。

**核心问题**：用户缺乏持续记录的动力

**设计原则**：
1. AI 驱动：复用现有 LangChain + MiniMax AI 能力
2. 渐进式：MVP 优先，快速验证核心假设
3. 隐私优先：健身是私人场景，AI 比社交更适合

---

## 一、触发机制（Trigger）

### 1.1 外部触发
现有能力：Chat 对话，用户主动发起

**新增能力**：

| 触发类型 | 实现方式 | 优先级 |
|---------|---------|-------|
| 定时提醒 | 后台定时任务，每天固定时间发系统消息 | P0 |
| 目标达成提醒 | 达成里程碑时 AI 主动发消息祝贺 | P0 |
| 连续中断预警 | 用户超过 X 天未记录，AI 主动询问 | P1 |
| 计划执行提醒 | 计划执行节点前 30 分钟提醒 | P2 |

### 1.2 内部触发
通过满足用户心理需求触发

| 触发场景 | AI 行为 |
|---------|--------|
| 用户打开 Chat | AI 根据上下文主动问候/询问 |
| 用户完成训练 | AI 即时反馈 + 鼓励 |
| 用户查询进度 | AI 展示对比数据 + 肯定 |
| 用户表现消极 | AI 变换语气，用更轻松的方式互动 |

### 1.3 AI 私教人设

**名字**：小Fit（可配置）

**性格设定**：
- 专业但不死板，用通俗语言解释健身知识
- 积极鼓励，不批评用户
- 会适度使用emoji（符合暗色主题的橙色/红色系）
- 记住用户历史，给出个性化建议

**对话策略**：
```
用户沉默 → 主动发起轻松话题（"今天练了吗？"
用户疲劳 → 降低强度建议或缩短计划
用户沮丧 → 强调进步而非差距
用户兴奋 → 顺势推进目标
```

---

## 二、行动（Action）

### 2.1 降低行动门槛

**现有流程**：用户需要用自然语言准确描述训练
**优化后**：AI 主动追问 + 快捷选择

```
AI：今天练什么了？
用户：练了胸
AI：好的！是做了卧推吗？我看到你上周做过这个动作。
     这次做了多少组？每组多少次？
用户：4组 每组10个 60kg
AI：💪 卧推60kg 4×10！比上周多了2组，继续保持！
     记录完成，还有什么要补充的吗？
```

### 2.2 快捷指令

在 ChatInput 添加快捷按钮：

| 快捷按钮 | 功能 |
|---------|-----|
| 🎤 语音 | 一键录音转文字 |
| 📅 今天训练 | 快速记录今日训练 |
| 📊 查进度 | 查看本周/本月数据 |
| 💬 聊聊 | 自由对话 |

---

## 三、多变酬赏（Variable Reward）

### 3.1 即时反馈（AI 反馈）

训练记录后 AI 即时评价：

```typescript
// 反馈维度
interface WorkoutFeedback {
  pr_detected: boolean;        // 是否破个人纪录
  volume_change: 'up' | 'same' | 'down';  // 训练量变化
  consistency_streak: number;   // 连续记录天数
  personalized_comment: string; // 个性化评价
}
```

**示例反馈**：
- PR 破纪录：「🔥 60kg卧推！这是你的新个人纪录！」
- 坚持记录：「📈 连续第7天记录，你已经养成习惯了！」
- 训练量提升：「💪 今天训练量比上周多了15%，状态不错！」

### 3.2 进度可视化

**围度进度卡**（新增组件 `ProgressCard`）：

```
┌─────────────────────────────┐
│  胸围进度                    │
│  ████████░░░░ 80%           │
│  当前: 96cm → 目标: 100cm    │
│  已进步 +2cm，加油！          │
└─────────────────────────────┘
```

**训练趋势卡**：
- 本周 vs 上周训练次数对比
- 重量/组数变化趋势图
- 肌肉群覆盖雷达图

### 3.3 成就系统（简化版）

| 成就 | 条件 | 奖励 |
|-----|-----|-----|
| 初学者 | 完成第一次训练记录 | 解锁「开始」徽章 |
| 连续7天 | 连续记录7天 | 解锁「坚持」徽章 + AI 特别祝贺 |
| 连续30天 | 连续记录30天 | 解锁「自律」徽章 + 称号「健身达人」 |
| PR 破纪录 | 某动作突破个人最佳 | 即时庆祝动画 |
| 全身覆盖 | 记录覆盖所有主要肌群 | 解锁「全能」徽章 |

---

## 四、投入（Investment）

### 4.1 数据积累 → 个性化

用户记录越多，AI 越懂用户：

```typescript
interface UserContext {
  preferred_exercises: string[];    // 常做动作
  typical_workout_time: string;      // 通常训练时段
  recent_goals: string;             // 最近目标
  motivation_level: 'high' | 'medium' | 'low';
  last_workout: Date;
  total_workouts: number;
  pr_records: Record<string, number>; // 个人纪录
}
```

AI 基于上下文给出越来越精准的建议。

### 4.2 目标承诺机制

用户设定目标后，AI 帮助追踪：

```
用户：我想3个月练出腹肌
AI：好的！我帮你记下了。目标：3个月后有明显腹肌。
     我们从今天开始追踪你的进度。
     第一周先从核心训练开始，保持每周3次，你会看到变化的！
```

### 4.3 成长日历

新增「成长日历」页面：
- 每日打卡标记
- 连续记录火焰连接
- 月度成就总结

---

## 五、技术实现

### 5.1 新增数据模型

```prisma
// 后台任务调度
model CoachTask {
  id          Int      @id @default(autoincrement())
  userId      Int
  type        String   // 'reminder' | 'achievement' | 'checkin'
  scheduledAt DateTime
  executedAt  DateTime?
  payload     Json?    // 额外参数
  createdAt  DateTime @default(now())

  @@index([userId, scheduledAt])
}

// 用户成就
model UserAchievement {
  id           Int      @id @default(autoincrement())
  userId       Int
  achievementId String
  earnedAt     DateTime @default(now())

  @@unique([userId, achievementId])
}

// AI 私教配置
model CoachConfig {
  id        Int     @id @default(autoincrement())
  userId    Int     @unique
  name      String  @default("小Fit")
  enabled   Boolean @default(true)
  reminderTime String? // 每天提醒时间 "09:00"
}
```

### 5.2 新增 AI Tool

```typescript
// sendCoachMessage - AI 主动发消息（由后台任务触发，非对话场景）
export const sendCoachMessageTool = new DynamicStructuredTool({
  name: "send_coach_message",
  description: "当 AI 私教需要主动给用户发消息时使用（如定时提醒、成就通知）。此工具由系统后台调用，不在用户对话中使用。",
  schema: z.object({
    message: z.string().describe("发送给用户的消息内容"),
    type: z.enum(['reminder', 'achievement', 'encouragement', 'checkin']).describe("消息类型"),
    metadata: z.record(z.any()).optional().describe("额外元数据")
  }),
  func: async ({ message, type, metadata }) => {
    // userId 从调用方（后台调度器）获取，不通过 Tool 参数传递
    const userId = metadata?.userId;
    if (!userId) throw new Error("缺少 userId");

    // 存储消息到 ChatMessage，isFromCoach=true
    const savedMessage = await chatMessageRepo.create({
      userId,
      role: 'assistant',
      content: message,
      isFromCoach: true,
      coachMessageType: type
    });

    // 触发实时推送（WebSocket 或 轮询）
    await pushToUser(userId, savedMessage);

    return `消息已发送给用户`;
  }
});
```

### 5.3 后台调度实现

使用 `node-cron` 在现有 Express 进程中实现轻量级调度：

```typescript
// backend/src/coach/scheduler.ts
import cron from 'node-cron';
import { coachService } from './coachService';

// 每天 9:00 检查需要发送提醒的用户
cron.schedule('0 9 * * *', async () => {
  console.log('[Coach Scheduler] Processing daily reminders');
  await coachService.processDailyReminders();
}, { timezone: "Asia/Shanghai" });

// 每小时检查一次连续中断预警
cron.schedule('0 * * * *', async () => {
  console.log('[Coach Scheduler] Checking inactive users');
  await coachService.processInactivityCheck();
});
```

### 5.4 新增 Service

```typescript
// backend/src/coach/coachService.ts
export const coachService = {
  // 处理每日定时提醒
  async processDailyReminders(): Promise<void>

  // 处理连续中断预警（用户超过2天未记录）
  async processInactivityCheck(): Promise<void>

  // 检查成就并通知
  async checkAchievements(userId: number): Promise<Achievement[]>

  // 生成个性化反馈
  async generateWorkoutFeedback(userId: number, workout: Workout): Promise<WorkoutFeedback>

  // 主动发消息给用户
  async sendMessageToUser(userId: number, message: string, type: string): Promise<void>
}
```

### 5.5 WebSocket 实时推送

使用 `socket.io` 实现实时消息推送：

```typescript
// backend/src/index.ts (新增)
import { Server } from 'socket.io';

const io = new Server(httpServer, {
  cors: { origin: "*" }
});

// 用户认证后加入房间
io.on('connection', (socket) => {
  const userId = socket.handshake.auth.userId;
  socket.join(`user:${userId}`);

  socket.on('disconnect', () => {
    socket.leave(`user:${userId}`);
  });
});

// 推送函数
export async function pushToUser(userId: number, message: ChatMessage) {
  io.to(`user:${userId}`).emit('coach:message', message);
}
```

前端在 Chat 页面建立 WebSocket 连接，接收实时消息并追加到消息列表。

> **备选方案**：如果不想引入 WebSocket，可改为前端轮询（每30秒拉取一次新消息），简单但延迟更高。

### 5.4 新增前端组件

### 5.6 消息 Thread 关联机制

当 AI 主动发送消息后，用户回复需要关联到该消息上下文：

```typescript
// ChatMessage 表新增字段
model ChatMessage {
  // ... existing fields
  parentId         Int?     // 关联到 AI 主动发送的消息
  coachMessageType String?  // 'reminder' | 'achievement' | 'encouragement' | 'checkin'
}
```

用户回复时，AI 自动识别 `parentId` 并延续上下文。

### 5.7 用户控制面板

在 `/profile` 页面新增 AI 私教设置：

| 设置项 | 说明 |
|-------|-----|
| 开启 AI 主动提醒 | 开关，控制是否接收 AI 主动消息 |
| 每日提醒时间 | 时间选择器，默认 09:00 |
| 提醒频率限制 | 每天最多 N 条（默认3条） |

### 5.8 新增前端组件

| 组件 | 路径 | 说明 |
|-----|-----|-----|
| ProgressCard | components/ProgressCard.tsx | 围度/训练进度展示 |
| AchievementBadge | components/AchievementBadge.tsx | 成就徽章展示 |
| CoachMessage | components/chat/CoachMessage.tsx | AI 私教消息卡片（区分普通AI消息和教练消息） |
| QuickActions | components/QuickActions.tsx | 快捷操作按钮组 |
| StreakCalendar | pages/StreakCalendar.tsx | 连续打卡日历 |

### 5.9 新增页面

| 页面 | 路径 | 说明 |
|-----|-----|-----|
| 成长日历 | /streak | 查看连续打卡记录 |

---

## 六、实现计划（分阶段）

### Phase 1: MVP（P0）

#### Phase 1a: 对话内功能（无后台任务依赖）
- [ ] AI 私教人设 + 对话策略（扩展 System Prompt）
- [ ] 即时反馈（saveWorkout 后 AI 评价）
- [ ] 用户控制面板（开启/关闭 AI 主动提醒）

#### Phase 1b: 后台任务支持（需要调度器）
- [ ] `node-cron` 集成
- [ ] 定时提醒（每天固定时间）
- [ ] 成就徽章系统（基础5个 + UserAchievement 表）
- [ ] WebSocket 实时推送（或轮询备选）

### Phase 2: 增强（P1）
- [ ] 进度可视化（ProgressCard）
- [ ] 目标承诺追踪
- [ ] 连续中断预警（超过2天未记录）
- [ ] 个性化上下文积累

### Phase 3: 完善（P2）
- [ ] 成长日历页面 `/streak`
- [ ] 高级成就解锁
- [ ] AI 私教配置（名字、提醒时间）

---

## 七、关键假设与验证

| 假设 | 验证方式 |
|-----|---------|
| 用户希望 AI 主动提醒 | Phase1 上线后统计打开率 |
| 即时反馈能提升满足感 | 对比有/无反馈的7日留存 |
| 成就系统能驱动持续使用 | 追踪获得成就用户的留存率 |

---

## 八、风险与缓解

| 风险 | 缓解措施 |
|-----|---------|
| AI 主动发消息打扰用户 | 可关闭 + 频率限制（每天最多3条） |
| 消息太频繁导致卸载 | MVP 阶段控制触发频率 |
| 用户隐私顾虑 | 明确告知数据用途 |

---

## 九、验收标准

| 指标 | 目标值 | 测量方式 |
|-----|-------|---------|
| AI 反馈延迟 | P99 < 3s | 记录 saveWorkout 到 AI 反馈的时间戳 |
| 连续3天+留存率 | 提升 20% | 对比开启/关闭 AI 私教的用户群 |
| 定时提醒打开率 | > 40% | 提醒消息的查看率 |
| 投诉/卸载率 | < 1% | 用户反馈和卸载统计 |
| 成就解锁率 | 首周 > 30% 用户获得至少1个成就 | UserAchievement 表统计 |

**性能要求**：
- AI 即时反馈：saveWorkout 后同步返回，P99 < 3s
- 定时提醒：消息在设定时间后 5 分钟内发出
- WebSocket 推送延迟：< 500ms
