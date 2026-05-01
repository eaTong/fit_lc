# 聊天页面输入框实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现聊天页面底部输入框，支持语音/文字模式切换，按住说话功能

**Architecture:** 复用现有 input-area 结构，改造为支持双模式的灵活布局。语音/文字切换通过 Page data 中的 `inputMode` 状态控制，WXML 条件渲染展示对应 UI。录音交互使用 WeChat 原生 API。

**Tech Stack:** WeChat Mini Program (WXML/WXSS/JS)

---

## 文件结构

| 文件 | 职责 |
|------|------|
| `fitlc-mini/pages/chat/index.wxml` | 输入框模板，条件渲染语音/文字模式 |
| `fitlc-mini/pages/chat/index.wxss` | 输入框容器及按钮样式 |
| `fitlc-mini/pages/chat/index.js` | 页面逻辑，状态管理，录音控制 |

---

## 实现任务

### Task 1: 修改 WXML 模板结构

**Files:**
- Modify: `fitlc-mini/pages/chat/index.wxml:38-56`

- [ ] **Step 1: 替换 input-area 部分**

将现有的 input-area 部分替换为：

```xml
  <!-- Input Area -->
  <view class="input-area">
    <!-- 文字模式 -->
    <view wx:if="{{inputMode === 'text'}}" class="input-container">
      <textarea
        class="chat-textarea"
        value="{{inputValue}}"
        placeholder="输入训练内容..."
        bindinput="onInput"
        auto-height
        maxlength="2000"
      />
      <view class="input-actions">
        <text class="action-btn switch-btn" bindtap="onSwitchMode">🎤</text>
        <text class="action-btn image-btn" bindtap="onImageTap">📷</text>
        <text class="action-btn send-btn" bindtap="onSend">➤</text>
      </view>
    </view>

    <!-- 语音模式 -->
    <view wx:if="{{inputMode === 'voice'}}" class="input-container voice-mode">
      <text class="action-btn switch-btn" bindtap="onSwitchMode">⌨️</text>
      <view
        class="voice-hint {{isRecording ? 'recording' : ''}}"
        bindtouchstart="onVoiceTouchStart"
        bindtouchend="onVoiceTouchEnd"
      >
        <text>{{isRecording ? '松开发送' : '按住说话'}}</text>
      </view>
      <view class="input-actions">
        <text class="action-btn image-btn" bindtap="onImageTap">📷</text>
      </view>
    </view>
  </view>
```

- [ ] **Step 2: 验证文件语法**

确认 WXML 结构正确，无遗漏标签。

---

### Task 2: 更新 WXSS 样式

**Files:**
- Modify: `fitlc-mini/pages/chat/index.wxss`

- [ ] **Step 1: 添加 textarea 样式**

在 `.input-container` 后添加：

```wxss
.chat-textarea {
  flex: 1;
  min-height: 80rpx;
  max-height: 200rpx;
  padding: 16rpx 20rpx;
  font-size: 32rpx;
  line-height: 1.5;
  background-color: transparent;
}
```

- [ ] **Step 2: 添加语音模式样式**

在 `.voice-btn.recording` 后添加：

```wxss
.voice-mode {
  justify-content: flex-start;
}

.voice-hint {
  flex: 1;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: var(--color-text-secondary);
  background-color: var(--color-bg-tertiary);
  border-radius: 40rpx;
  margin: 0 8rpx;
}

.voice-hint.recording {
  color: var(--color-accent-red);
  background-color: rgba(220, 20, 60, 0.1);
}
```

- [ ] **Step 3: 调整按钮布局**

更新 `.input-actions` 确保右侧对齐：

```wxss
.input-actions {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
```

---

### Task 3: 更新 JS 逻辑

**Files:**
- Modify: `fitlc-mini/pages/chat/index.js`

- [ ] **Step 1: 添加 inputMode 到 data**

将 `data` 对象中的 `isRecording` 后添加：

```javascript
isRecording: false,
inputMode: 'text',  // 'text' | 'voice'
```

- [ ] **Step 2: 添加模式切换方法**

在 `onVoiceTap` 方法后添加：

```javascript
onSwitchMode() {
  const newMode = this.data.inputMode === 'text' ? 'voice' : 'text';
  // 如果正在录音，停止
  if (this.data.isRecording && newMode === 'text') {
    this.stopRecording();
  }
  this.setData({ inputMode: newMode });
},
```

- [ ] **Step 3: 更新录音交互方法**

将 `onVoiceTap` 方法替换为触摸事件处理：

```javascript
onVoiceTouchStart() {
  if (this.data.inputMode !== 'voice') return;
  this.startRecording();
},

onVoiceTouchEnd() {
  if (this.data.inputMode !== 'voice' || !this.data.isRecording) return;
  this.stopRecording();
  // 发送语音消息
  this.sendVoiceMessage();
},
```

- [ ] **Step 4: 添加发送语音消息方法**

在 `stopRecording` 方法后添加：

```javascript
sendVoiceMessage() {
  // TODO: 上传录音文件并发送
  wx.showToast({ title: '语音发送功能开发中', icon: 'none' });
},
```

- [ ] **Step 5: 更新 onSend 方法支持多行**

确保 `onSend` 方法正确处理：

```javascript
onSend() {
  const message = this.data.inputValue.trim();
  if (!message || this.data.isLoading) return;

  this.setData({ inputValue: '', isLoading: true });

  chatActions.sendMessage(message).then(res => {
    this.setData({ isLoading: false });
    this.scrollToBottom();
  }).catch(err => {
    this.setData({ isLoading: false });
    wx.showToast({ title: '发送失败', icon: 'none' });
  });
},
```

---

### Task 4: 测试验证

- [ ] **Step 1: 启动开发服务器**

Run: `cd fitlc-mini && npm run dev` (或微信开发者工具打开项目)

- [ ] **Step 2: 手动测试**

1. 打开聊天页面，确认输入框显示正常
2. 点击切换按钮，验证语音/文字模式切换
3. 语音模式下按住输入区，确认显示"松开发送"
4. 松开手指，确认录音停止
5. 图片按钮始终可见
6. 文字模式下 textarea 可正常输入

---

### Task 5: 提交代码

- [ ] **Step 1: 提交更改**

```bash
git add fitlc-mini/pages/chat/index.wxml fitlc-mini/pages/chat/index.wxss fitlc-mini/pages/chat/index.js
git commit -m "feat(mini): add voice/text input mode toggle in chat

- Add inputMode state to control input type
- Add voice recording with touch start/end events
- Style voice hint with recording state visual feedback

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## 验收标准

- [ ] 切换按钮可正常在语音/文字模式间切换
- [ ] 语音模式下按住说话，松开发送
- [ ] 语音超时 60 秒自动发送
- [ ] 文字模式下多行输入框正常输入
- [ ] 图片上传按钮始终可见
- [ ] 切换模式时正确重置状态