# FitLC L1 功能研究笔记

**创建时间：** 2026-04-26

---

## 一、技术选型

### 语音转文字

**方案：** MiniMax API
- 现有 API Key 复用
- 接口：`/v1/audio/speech`（转写模式）
- 优势：统一使用 MiniMax，无需引入新服务商

### 前端录音

**方案：** MediaRecorder API
- 支持 WAV 格式
- 浏览器兼容性良好
- 代码示例：
```javascript
const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
const recorder = new MediaRecorder(stream, { mimeType: 'audio/wav' });
```

---

## 二、现有 API 盘点

### 已存在接口（可复用）

| 接口 | 用途 | 说明 |
|------|------|------|
| DELETE /api/records/workout/:id | 软删除 | F-006 撤销 |
| POST /api/records/workout/:id/restore | 恢复 | F-006 撤销恢复 |
| POST /api/chat/message | AI 解析 | 返回 savedData |

### 需新增接口

| 接口 | 用途 | 说明 |
|------|------|------|
| POST /api/voice/transcribe | 语音转文字 | F-004 |
| GET /api/records/stats | 累计统计 | F-012, F-013, D-004 |

---

## 三、数据层需求

### D-004 累计统计数据

**数据结构：**
```sql
CREATE TABLE cumulative_stats (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  stat_type VARCHAR(50),  -- 'weekly_workouts', 'total_volume', etc.
  value DECIMAL(10,2),
  period_start DATE,
  period_end DATE,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**统计类型：**
- `weekly_workouts` - 本周训练次数
- `monthly_workouts` - 本月训练次数
- `total_volume` - 累计训练量
- `exercise_best_{name}` - 各动作最佳成绩

---

## 四、组件设计决策

### SaveSuccessCard 视觉风格

**决策：** 深色毛玻璃卡片
- 背景：rgba(255,255,255,0.08)
- 边框：1px solid rgba(255,255,255,0.15)
- 模糊：backdrop-filter: blur(12px)
- 圆角：16px

**原因：**
- 适配暗色主题
- 与聊天界面融合
- 现代感强

### VoiceRecordButton 状态

| 状态 | UI | 说明 |
|------|-----|------|
| idle | 麦克风可点击 | 空闲 |
| recording | 红色 + 波形动画 | 录音中 |
| processing | 加载动画 | 解析中 |
| success | 显示卡片 | 成功 |
| partial | 可编辑卡片 | 部分成功 |
| failed | 错误提示 | 失败 |

---

## 五、依赖关系图

```
                    F-017 (AppTipBanner)
                           │
                           │
    ┌──────────────────────┴──────────────────────┐
    │                                             │
F-004 (一键记录) ───────────────────────→ F-001 (视觉卡片)
    │                                             │
    │                                             │
    └─────── → F-006 (撤销) ←─────────────────────┘
                           │
                           │
                    ┌──────┴──────┐
                    │             │
               D-004 (累计统计)   │
                    │             │
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              │                         │
        F-012 (智能总结)          F-013 (Highlight)
```

---

## 六、关键实现点

### 1. 语音 → 文字 → 保存 全链路

```
录音(WAV) → POST /api/voice/transcribe → text
  → POST /api/chat { message: text } → { reply, savedData }
    → 检测 savedData.type === 'workout' → 渲染 SaveSuccessCard
```

### 2. 撤销后上下文保留

- 后端软删除（deleted_at 更新）
- 前端保留输入框内容（不清空）
- 样式变更（灰色 + 删除线）
- 可通过 restore 接口恢复

### 3. AI 总结生成

- 调用 LLM 时提供：本周数据、上周数据、变化趋势
- 缓存：首次生成后缓存 N 小时
- 新增记录时更新缓存

### 4. 重点变化筛选

- 变化幅度超过 ±5% 或绝对值 ±0.5kg/cm
- 最多显示 5-7 条
- 进步优先排序

---

## 七、风险点

| 风险 | 影响 | 缓解措施 |
|------|------|---------|
| MiniMax 语音转文字准确率 | 记录失败 | 提供手动输入备选 |
| 复杂语音解析失败 | 部分保存 | 支持"待补充"状态 |
| 趋势数据计算量大 | 加载慢 | 后端预计算 + 缓存 |

---

## 八、代码审查发现

### 现有可复用代码

| 位置 | 说明 | 可复用性 |
|------|------|---------|
| `backend/src/agents/fitnessAgent.js` | LangChain Agent 核心 | F-004 复用 chat API 流程 |
| `backend/src/tools/saveWorkout.js` | save_workout 工具 | F-001 savedData 格式参考 |
| `frontend/src/stores/chatStore.ts` | 消息状态管理 | F-006 已有 removeLastSavedData |
| `frontend/src/components/ChatMessage.tsx` | 消息气泡 | F-006 需修改撤销入口 |
| `frontend/src/pages/Trends.tsx` | 趋势页 | F-012/F-013 基础 |

### 需要新增的接口

| 接口 | 位置 | 说明 |
|------|------|------|
| POST /api/voice/transcribe | `backend/src/routes/voice.js` | F-004 核心接口 |
| GET /api/records/stats | `backend/src/routes/records.js` 或新文件 | D-004 累计统计 |

### F-006 现有实现问题

**当前实现：** ([ChatMessage.tsx:24-31](frontend/src/components/ChatMessage.tsx#L24-L31))
- 撤销按钮在 assistant 消息上
- 静态文本按钮样式

**Spec 要求：**
- 撤销图标在用户气泡 hover 时显示
- 撤销后气泡变灰 + 删除线（#94a3b8 + text-decoration: line-through）
- 输入框保留上下文（当前已通过 store 实现）

**需要修改：**
1. 撤销入口从 assistant 移到 user 气泡
2. 添加 hover 显示逻辑
3. 撤销样式变更

### MiniMax 语音 API

**接口信息（需验证）：**
- 端点：`POST /v1/audio/speech`（或类似转写接口）
- 复用现有 `MINIMAX_API_KEY`
- 需要确认是否支持 audio/wav 格式输入

---

## 九、已验证决策

1. **语音转文字用 MiniMax** - 复用现有 API Key
2. **WAV 格式录音** - MediaRecorder 支持
3. **软删除撤销** - 数据可恢复
4. **localStorage 控制提示频率** - 简单有效
5. **复用 /api/chat** - F-004 转文字后调用现有 chat API 解析
