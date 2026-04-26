# FitLC L1 基础功能层实施计划

**创建时间：** 2026-04-26
**状态：** 规划中

---

## 一、概述

本计划覆盖 6 个 L1 基础功能层功能的完整实施：

| ID | 功能名称 | 优先级 | 依赖关系 |
|----|---------|--------|---------|
| F-004 | 一键记录模式 | P0 | 无依赖，可最先开发 |
| F-001 | 保存成功视觉卡片 | P0 | F-004 的视觉反馈载体 |
| F-006 | 撤销后重新记录 | P0 | 依赖 F-004、F-001 |
| F-012 | 智能总结先行 | P0 | 依赖 L2 数据层 |
| F-013 | 重点变化Highlight | P0 | 依赖 F-012 |
| F-017 | 你可能想提示 | P0 | 无依赖 |

---

## 二、阶段划分

### 阶段 0：核心入口（F-004 + F-001）

**目标：** 实现语音记录 → 转文字 → AI解析 → 视觉卡片反馈 的完整闭环

**开发顺序：**
1. F-004 后端：新增 `/api/voice/transcribe` 接口
2. F-001 前端：SaveSuccessCard 组件
3. F-004 前端：按住说话按钮 + 状态管理
4. F-004 集成：转文字 → chat API → 视觉卡片全链路

**里程碑：** 用户可按住说话完成一次训练记录，看到视觉卡片

---

### 阶段 1：撤销功能（F-006）

**目标：** 实现撤销 + 上下文保留

**开发内容：**
1. 撤销入口：用户气泡 hover 显示撤销图标
2. 撤销逻辑：调用 DELETE /api/records/workout/:id
3. 样式变更：灰色 + 删除线
4. 上下文保留：输入框不清空

**里程碑：** 用户可撤销刚保存的记录并重新编辑

---

### 阶段 2：趋势基础（F-012 + F-013）

**目标：** 趋势页 AI 总结 + 重点变化Highlight

**开发顺序：**
1. D-004 数据服务：累计统计数据
2. F-012 前端：AIInsightSummary 组件（折叠/展开）
3. F-013 前端：KeyChangesHighlight 组件
4. AI 生成服务：调用 LLM 生成总结文字

**里程碑：** 趋势页顶部展示 AI 总结 + 重点变化列表

---

### 阶段 3：启动提示（F-017）

**目标：** 顶部横幅提示

**开发内容：**
1. 判断逻辑：今日建议 vs 欢迎回来
2. 频率控制：24 小时沉默周期
3. AppTipBanner 组件
4. localStorage 存储关闭状态

**里程碑：** 打开 App 显示个性化提示

---

## 三、技术依赖

```
后端新增接口：
- POST /api/voice/transcribe        ← F-004
- DELETE /api/records/workout/:id  ← F-006（已存在）
- POST /api/records/workout/:id/restore ← F-006（已存在）

前端新增组件：
- SaveSuccessCard                   ← F-001
- VoiceRecordButton                 ← F-004
- AIInsightSummary                  ← F-012
- KeyChangesHighlight               ← F-013
- AppTipBanner                      ← F-017

数据层需求：
- D-004 累计统计数据                 ← F-012, F-013
```

---

## 四、开发详细清单

### F-004 一键记录模式

**后端：**
- [ ] POST /api/voice/transcribe
  - 接收 WAV 音频文件
  - 调用 MiniMax 语音转文字 API
  - 返回 { text, success }

**前端：**
- [ ] VoiceRecordButton 组件
  - MediaRecorder API 录音
  - 状态管理：idle/recording/processing/success/partial/failed
  - WAV 格式录制
- [ ] 转文字流程
  - 录音完成 → POST /api/voice/transcribe
  - 获取文字 → POST /api/chat
  - 检测 savedData.type === 'workout' → 显示视觉卡片
- [ ] 音效反馈（可选）
  - 成功时播放音效

### F-001 保存成功视觉卡片

**前端：**
- [ ] SaveSuccessCard 组件
  - 深色毛玻璃风格
  - 展示：动作名称、重量/组数/次数、标签
  - 操作按钮：修改、查看详情
- [ ] 编辑弹窗
  - 展示当前保存数据
  - 支持修改后覆盖保存

### F-006 撤销后重新记录

**前端：**
- [ ] 撤销图标（用户气泡 hover 显示）
- [ ] 撤销样式变更
  - 灰色文字 + 删除线
  - "已撤销"标签
- [ ] 输入框上下文保留
- [ ] 乐观更新

**后端：**
- [ ] DELETE /api/records/workout/:id（已存在）
- [ ] POST /api/records/workout/:id/restore（已存在）

### F-012 智能总结先行

**数据层：**
- [ ] D-004 累计统计数据
  - 本周训练次数
  - 累计训练量
  - 各动作统计

**前端：**
- [ ] AIInsightSummary 组件
  - 简洁总结文字（默认折叠）
  - 展开后：详细数据 + 趋势图表 + 历史对比
- [ ] AI 生成服务
  - 调用 LLM 生成总结
  - 缓存策略

### F-013 重点变化Highlight

**前端：**
- [ ] KeyChangesHighlight 组件
  - 进步（绿色 ↑）
  - 退步（红色 ↓）
  - 持平（灰色 →）
- [ ] 筛选规则
  - 变化幅度超过 ±5%
  - 最多显示 5-7 条
  - 进步优先排序

### F-017 你可能想提示

**前端：**
- [ ] AppTipBanner 组件
  - 顶部横幅
  - 关闭按钮
- [ ] 判断逻辑
  - 今日建议（优先）
  - 欢迎回来（超过2天）
- [ ] 频率控制
  - localStorage 记录
  - 24 小时沉默周期

---

## 五、接口契约

### POST /api/voice/transcribe

**请求：**
```
Content-Type: multipart/form-data
Authorization: Bearer <jwt>
audio: <WAV file>
```

**响应：**
```json
{
  "success": true,
  "text": "深蹲100公斤5组8个"
}
```

### GET /api/records/stats (D-004)

**响应：**
```json
{
  "weeklyWorkouts": 4,
  "monthlyWorkouts": 15,
  "totalVolume": 18000,
  "changes": [
    { "name": "深蹲", "previousWeight": 95, "currentWeight": 100, "unit": "kg" }
  ]
}
```

---

## 六、文件结构

```
frontend/src/
├── components/
│   ├── SaveSuccessCard.tsx          ← F-001
│   ├── VoiceRecordButton.tsx        ← F-004
│   ├── AIInsightSummary.tsx         ← F-012
│   ├── KeyChangesHighlight.tsx      ← F-013
│   ├── AppTipBanner.tsx              ← F-017
│   └── UndoableMessage.tsx           ← F-006
├── hooks/
│   ├── useVoiceRecord.ts            ← F-004
│   ├── useAppTip.ts                 ← F-017
│   └── useStats.ts                  ← F-012, F-013
└── pages/
    └── TrendPage.tsx                ← F-012, F-013

backend/src/
├── routes/
│   └── voice.ts                     ← F-004
├── services/
│   └── voiceService.ts              ← F-004
└── repositories/
    └── statsRepository.ts           ← D-004
```

---

## 七、测试计划

| 功能 | 测试场景 |
|------|---------|
| F-004 | 语音"深蹲100公斤5组8个" → 保存成功 |
| F-004 | 语音"练了腿" → 部分保存，标记待补充 |
| F-004 | 语音"啦啦啦" → 提示重试 |
| F-001 | 视觉卡片显示正确数据 |
| F-001 | 修改按钮 → 弹窗编辑 → 覆盖保存 |
| F-006 | 点击撤销 → 气泡变灰 → 输入框保留 |
| F-006 | 撤销后重新发送 → 保存新记录 |
| F-012 | 趋势页显示 AI 总结 |
| F-013 | 进步项绿色显示 |
| F-017 | 首次打开显示提示 |
| F-017 | 关闭后 24 小时内不重复显示 |

---

## 八、状态

- [ ] 计划完成
- [ ] 待用户确认
- [ ] 开始实施
