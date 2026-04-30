# Chat Image Upload - 图片上传功能规划

**日期：** 2026-04-30
**状态：** 规划中

---

## 1. 需求概述

用户在 AI 聊天页面可以直接上传图片（如体型照片），AI 自动分析图片内容并回复（如体脂率估算、身材评估）。

**使用场景：**
- 用户发送"帮我看看我体脂率多少"，附上照片
- 用户发送"最近身材变化大吗"，附上围度照片

---

## 2. 技术方案

### 2.1 整体流程

```
用户选择图片 → 前端上传到OSS → 返回URL → 发送消息(含图片URL) → 后端调用视觉模型 → AI回复
```

### 2.2 后端改动

#### A. 新增 OSS 上传端点

**POST `/api/upload/image`**

```typescript
// Request: multipart/form-data
// - file: 图片文件 (jpg/png/webp，最大 5MB)
// Response: { url: string }
```

**实现：** 复用现有 `oss.ts`，新增 `uploadChatImage` 函数：

```typescript
export async function uploadChatImage(userId: number, file: Buffer, ext: string): Promise<string> {
  const filename = `chat-images/user-${userId}-${Date.now()}.${ext}`;
  const result = await client.put(filename, file);
  return result.url;
}
```

#### B. 修改聊天接口

**POST `/api/chat/message`** 请求体扩展：

```typescript
{
  message: string;           // 文字消息
  imageUrls?: string[];     // 图片URL数组（已上传到OSS）
  historyMessages?: any[];
}
```

#### C. Zhipu 视觉模型调用

修改 `chatZhipu.ts` 支持多模态消息：

```typescript
interface MultimodalMessage {
  role: 'user' | 'assistant' | 'system';
  content: Array<{
    type: 'text' | 'image_url';
    text?: string;
    image_url?: { url: string };
  }>;
}
```

---

### 2.3 前端改动

#### A. ChatInput 组件

```
[上传按钮 📷] [文字输入框....................] [发送按钮 ➤]
        ↓
   选择图片 → 预览 → 上传到 OSS → 附加到消息
```

**状态：**
- `uploading: boolean` - 上传中
- `previewUrl: string | null` - 预览 URL
- `imageUrls: string[]` - 已上传的图片 URL

#### B. 发送流程

1. 用户选择图片
2. 前端预览（可选）
3. 并行上传到 `/api/upload/image`
4. 将返回的 URL 附加到消息体
5. 发送消息到 `/api/chat/message`

#### C. 消息展示

用户消息气泡显示缩略图，点击可放大。

---

## 3. 文件清单

### 后端

| 文件 | 改动 |
|------|------|
| `src/lib/oss.ts` | 新增 `uploadChatImage` |
| `src/routes/upload.ts` | 新建：图片上传路由 |
| `src/routes/chat.ts` | 支持 `imageUrls` 字段 |
| `src/agents/chatFactory.ts` | 支持视觉模型 |
| `src/agents/chatZhipu.ts` | 支持多模态消息 |
| `src/agents/fitnessAgent.ts` | 透传图片 URL |

### 前端

| 文件 | 改动 |
|------|------|
| `src/store/chatStore.ts` | 添加图片相关状态 |
| `src/components/ChatInput.tsx` | 新建：带图片上传的输入框 |
| `src/components/ChatMessage.tsx` | 显示图片缩略图 |
| `src/api/chat.ts` | 支持发送图片 |
| `src/api/upload.ts` | 新建：上传 API |

---

## 4. 待确认

- [ ] 图片尺寸限制（建议 5MB）
- [ ] 支持格式（jpg/png/webp）
- [ ] 单次最多图片数（建议 1-3 张）
- [ ] 图片存储期限（OSS 生命周期策略）
- [ ] 是否需要图片压缩前端优化

---

## 5. 实施顺序

1. **Phase 1: 后端图片上传**
   - 新增 `/api/upload/image` 端点
   - 验证 OSS 上传正常

2. **Phase 2: 后端多模态对话**
   - 修改 chat 接口支持图片 URL
   - Zhipu 视觉模型调用

3. **Phase 3: 前端上传 UI**
   - ChatInput 图片上传
   - 消息预览

4. **Phase 4: 体验优化**
   - 图片预览、放大
   - 上传进度
   - 错误处理
