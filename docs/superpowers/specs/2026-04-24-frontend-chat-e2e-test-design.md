# 前端 Chat E2E 测试设计

> **日期：** 2026-04-24
> **目的：** 使用 Playwright 实现前端 Chat 对话保存数据的 E2E 测试

## 概述

使用 Playwright 对前端 Chat 页面进行端到端测试，验证：
1. 用户对话后 AI 正确保存数据并显示成功提示
2. 当用户输入信息不完整时，AI 正确追问，用户补充后数据正确保存

## 技术方案

| 组件 | 技术 |
|------|------|
| 测试框架 | Playwright |
| 页面封装 | Page Objects 模式 |
| 测试认证 | 先注册再登录完整流程 |
| 后端依赖 | 需运行后端 (localhost:3000) |
| 前端依赖 | 需运行前端 (localhost:5173) |

## 文件结构

```
tests/e2e/frontend/
├── playwright.config.ts      # Playwright 配置
├── page-objects/
│   ├── BasePage.ts           # 基础页面对象
│   ├── LoginPage.ts          # 登录/注册页面对象
│   └── ChatPage.ts           # Chat 页面对象
├── chat.spec.ts              # Chat 测试用例
└── fixtures/
    └── testUser.ts           # 测试用户数据
```

## Page Objects 设计

### BasePage

所有页面对象的基类，包含通用操作：

```typescript
class BasePage {
  constructor(page: Page) {}

  async navigate(path: string): Promise<void>
  async waitForSelector(selector: string): Promise<void>
  async click(selector: string): Promise<void>
  async fill(selector: string, value: string): Promise<void>
  async getText(selector: string): Promise<string>
  async isVisible(selector: string): Promise<boolean>

  // 通用选择器
  protected readonly SELECTORS = {
    emailInput: 'input[type="email"]',
    passwordInput: 'input[type="password"]',
    submitButton: 'button[type="submit"]',
    errorMessage: '.text-accent-red',
    loadingButton: 'button:disabled[type="submit"]',
  };
}
```

### LoginPage

处理用户注册和登录：

**Login 页面选择器：**
- 邮箱输入框：`input[type="email"]`
- 密码输入框：`input[type="password"]`
- 登录按钮：`button[type="submit"]`
- 注册链接：`.text-accent-orange:has-text("注册")`
- 错误提示：`.text-accent-red`

**Register 页面选择器：**
- 邮箱输入框：`input[type="email"]`
- 密码输入框：`input[type="password"]`
- 确认密码输入框：`input[type="password"]`（第二个）
- 注册按钮：`button[type="submit"]`
- 登录链接：`.text-accent-orange:has-text("登录")`
- 错误提示：`.text-accent-red`

```typescript
class LoginPage extends BasePage {
  async navigateToLogin(): Promise<void>
  async navigateToRegister(): Promise<void>

  // 注册流程
  async register(email: string, password: string): Promise<void>
  async fillRegisterForm(email: string, password: string, confirmPassword: string): Promise<void>
  async submitRegister(): Promise<void>

  // 登录流程
  async login(email: string, password: string): Promise<void>
  async fillLoginForm(email: string, password: string): Promise<void>
  async submitLogin(): Promise<void>

  // 状态检查
  async isLoggedIn(): Promise<boolean>
  async getErrorMessage(): Promise<string | null>
  async hasValidationError(): Promise<boolean>
}
```

### ChatPage

处理 Chat 页面交互：

**CSS 选择器定义：**

```typescript
const SELECTORS = {
  // 消息容器
  userMessage: '.flex.justify-end .whitespace-pre-wrap',
  assistantMessage: '.flex.justify-start .whitespace-pre-wrap',
  allMessages: '[class*="flex"][class*="mb-4"]',

  // 输入区域
  messageInput: 'input[type="text"]',
  sendButton: 'button[type="submit"]',

  // 状态
  emptyState: '.text-text-secondary',
  loadingIndicator: 'button:disabled[type="submit"]',

  // 保存成功指示器
  savedIndicator: '.text-accent-orange:has-text("撤销")',
};
```

**保存成功关键词：**
- 主要关键词：`已保存：`
- 次要关键词：`已记录`、`保存成功`、`✅`

```typescript
class ChatPage extends BasePage {
  async navigateToChat(): Promise<void>

  // 消息发送
  async sendMessage(message: string): Promise<void>
  async typeMessage(message: string): Promise<void>
  async submitMessage(): Promise<void>

  // 消息读取
  async getLastUserMessage(): Promise<string>
  async getLastAssistantMessage(): Promise<string>
  async getAllMessages(): Promise<{role: string, content: string}[]>

  // 保存状态验证
  async hasSavedDataIndicator(): Promise<boolean>
  async waitForSaveConfirmation(timeout?: number): Promise<boolean>
  async getSaveConfirmationText(): Promise<string | null>
  async getLastAssistantMessageIncludes(keyword: string): Promise<boolean>

  // UI 状态
  async isLoading(): Promise<boolean>
  async isInputEnabled(): Promise<boolean>
  async getEmptyStateText(): Promise<string | null>
}
```

## 测试用例

### 测试一：正常保存流程

**目的：** 验证用户发送完整训练信息后，AI 正确保存并显示成功

**步骤：**
1. 注册新用户
2. 登录
3. 进入 Chat 页面
4. 发送消息："深蹲100kg 5组8个"
5. 等待 AI 响应
6. 验证 AI 回复包含保存成功信息（关键词：`已保存：` 或 `已记录：`）

**期望结果：**
- AI 回复包含 `已保存：` 或 `已记录：`
- 消息出现在聊天列表中
- 消息下方显示"撤销"按钮

### 测试二：追问补充流程

**目的：** 验证当用户输入不完整时，AI 正确追问，用户补充后数据保存

**步骤：**
1. 注册新用户
2. 登录
3. 进入 Chat 页面
4. 发送消息："练了腿"
5. 等待 AI 响应（应该包含追问，可能是"请提供具体训练内容"等）
6. 发送补充消息："深蹲100kg"
7. 等待 AI 响应
8. 验证数据保存成功（AI 回复包含 `已保存：` 或 `已记录：`）

**期望结果：**
- 第一轮 AI 回复包含追问内容（不是 `已保存：`）
- 第二轮 AI 回复显示训练已记录
- 消息下方显示"撤销"按钮

## 配置

### playwright.config.ts

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e/frontend',
  timeout: 60000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 120000,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
```

## 运行命令

```bash
# 运行所有 E2E 测试
npx playwright test

# 运行 Chat 测试
npx playwright test chat.spec.ts

# 运行带 UI 的测试
npx playwright test --ui

# 调试模式
npx playwright test --debug
```

## 依赖安装

需要在 frontend 目录安装 Playwright：

```bash
npm install -D @playwright/test
npx playwright install chromium
```

## 注意事项

1. **后端必须运行** - 测试需要后端 API 响应
2. **唯一邮箱** - 每次测试使用唯一邮箱避免冲突
3. **超时设置** - AI 响应可能较慢，超时设置为 60s
4. **测试隔离** - 每个测试使用新注册用户避免数据污染

## 成功标准

1. ✅ 正常保存测试通过
   - 用户发送 "深蹲100kg 5组8个"
   - AI 回复包含 `已保存：` 或 `已记录：`
   - 消息下方出现"撤销"按钮

2. ✅ 追问补充测试通过
   - 用户发送 "练了腿"
   - AI 回复不包含 `已保存：`
   - 用户发送 "深蹲100kg"
   - AI 回复包含 `已保存：` 或 `已记录：`

3. ✅ 测试可重复运行
   - 每次使用新注册用户
   - 数据隔离，不互相影响
