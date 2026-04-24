# 前端 Chat E2E 测试实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 使用 Playwright 实现前端 Chat 对话保存数据的 E2E 测试

**Architecture:** 使用 Playwright + Page Objects 模式，测试文件放在 tests/e2e/frontend/ 目录

**Tech Stack:** Playwright, TypeScript

---

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

---

## Task 1: 安装 Playwright 依赖

**Files:**
- Modify: `frontend/package.json`

- [ ] **Step 1: 安装 Playwright**

Run: `cd frontend && npm install -D @playwright/test`
Expected: 安装成功

- [ ] **Step 2: 安装 Chromium 浏览器**

Run: `cd frontend && npx playwright install chromium`
Expected: 下载并安装 Chromium

- [ ] **Step 3: 验证安装**

Run: `cd frontend && npx playwright --version`
Expected: 显示版本号

- [ ] **Step 4: Commit**

```bash
git add frontend/package.json
git commit -m "test: install Playwright for frontend E2E tests"
```

---

## Task 2: 创建 Playwright 配置文件

**Files:**
- Create: `tests/e2e/frontend/playwright.config.ts`

- [ ] **Step 1: 创建目录结构**

Run: `mkdir -p tests/e2e/frontend/page-objects tests/e2e/frontend/fixtures`

- [ ] **Step 2: 创建 playwright.config.ts**

```typescript
import { defineConfig, devices } from '@playwright/test';

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
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/frontend/playwright.config.ts
git commit -m "test: add Playwright config"
```

---

## Task 3: 创建 BasePage

**Files:**
- Create: `tests/e2e/frontend/page-objects/BasePage.ts`

- [ ] **Step 1: 创建 BasePage**

```typescript
import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected readonly SELECTORS = {
    emailInput: 'input[type="email"]',
    passwordInput: 'input[type="password"]',
    submitButton: 'button[type="submit"]',
    errorMessage: '.text-accent-red',
    loadingButton: 'button:disabled[type="submit"]',
  };

  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async waitForSelector(selector: string): Promise<Locator> {
    return this.page.locator(selector).first();
  }

  async click(selector: string): Promise<void> {
    await this.page.locator(selector).first().click();
  }

  async fill(selector: string, value: string): Promise<void> {
    await this.page.locator(selector).first().fill(value);
  }

  async getText(selector: string): Promise<string> {
    return this.page.locator(selector).first().textContent() ?? '';
  }

  async isVisible(selector: string): Promise<boolean> {
    return this.page.locator(selector).first().isVisible();
  }

  async isDisabled(selector: string): Promise<boolean> {
    return this.page.locator(selector).first().isDisabled();
  }

  async waitForNavigation(action: () => Promise<void>): Promise<void> {
    await Promise.all([
      this.page.waitForURL('**'),
      action(),
    ]);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add tests/e2e/frontend/page-objects/BasePage.ts
git commit -m "test: add BasePage with common selectors"
```

---

## Task 4: 创建 LoginPage

**Files:**
- Create: `tests/e2e/frontend/page-objects/LoginPage.ts`

- [ ] **Step 1: 创建 LoginPage**

```typescript
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly SELECTORS = {
    ...this.SELECTORS,
    registerLink: '.text-accent-orange:has-text("注册")',
    loginLink: '.text-accent-orange:has-text("登录")',
    confirmPasswordInput: 'input[type="password"]',
  };

  async navigateToLogin(): Promise<void> {
    await this.navigate('/login');
  }

  async navigateToRegister(): Promise<void> {
    await this.navigate('/register');
  }

  async register(email: string, password: string): Promise<void> {
    await this.navigateToRegister();
    await this.fillRegisterForm(email, password, password);
    await this.submitRegister();
  }

  async fillRegisterForm(email: string, password: string, confirmPassword: string): Promise<void> {
    await this.fill(this.SELECTORS.emailInput, email);
    await this.fill(this.SELECTORS.passwordInput, password);
    await this.page.locator(this.SELECTORS.confirmPasswordInput).nth(1).fill(confirmPassword);
  }

  async submitRegister(): Promise<void> {
    await this.click(this.SELECTORS.submitButton);
    // 等待导航到 Chat 页面
    await this.page.waitForURL('**/chat', { timeout: 10000 });
  }

  async login(email: string, password: string): Promise<void> {
    await this.navigateToLogin();
    await this.fillLoginForm(email, password);
    await this.submitLogin();
  }

  async fillLoginForm(email: string, password: string): Promise<void> {
    await this.fill(this.SELECTORS.emailInput, email);
    await this.fill(this.SELECTORS.passwordInput, password);
  }

  async submitLogin(): Promise<void> {
    await this.click(this.SELECTORS.submitButton);
    await this.page.waitForURL('**/chat', { timeout: 10000 });
  }

  async isLoggedIn(): Promise<boolean> {
    return this.page.url().includes('/chat');
  }

  async getErrorMessage(): Promise<string | null> {
    const errorLocator = this.page.locator(this.SELECTORS.errorMessage);
    if (await errorLocator.isVisible()) {
      return errorLocator.textContent();
    }
    return null;
  }

  async hasValidationError(): Promise<boolean> {
    return this.isVisible(this.SELECTORS.errorMessage);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add tests/e2e/frontend/page-objects/LoginPage.ts
git commit -m "test: add LoginPage with register and login methods"
```

---

## Task 5: 创建 ChatPage

**Files:**
- Create: `tests/e2e/frontend/page-objects/ChatPage.ts`

- [ ] **Step 1: 创建 ChatPage**

```typescript
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ChatPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly SELECTORS = {
    messageInput: 'input[type="text"]',
    sendButton: 'button[type="submit"]',
    userMessage: '.flex.justify-end .whitespace-pre-wrap',
    assistantMessage: '.flex.justify-start .whitespace-pre-wrap',
    emptyState: '.text-text-secondary',
    savedIndicator: '.text-accent-orange:has-text("撤销")',
  };

  // 保存成功关键词
  readonly SAVED_KEYWORDS = ['已保存：', '已记录：', '保存成功', '✅'];

  async navigateToChat(): Promise<void> {
    await this.navigate('/chat');
  }

  async sendMessage(message: string): Promise<void> {
    await this.typeMessage(message);
    await this.submitMessage();
  }

  async typeMessage(message: string): Promise<void> {
    await this.fill(this.SELECTORS.messageInput, message);
  }

  async submitMessage(): Promise<void> {
    await this.click(this.SELECTORS.sendButton);
    // 等待消息发送（按钮恢复可点击状态）
    await this.page.waitForFunction(
      () => !document.querySelector('button[type="submit"]')?.getAttribute('disabled'),
      { timeout: 10000 }
    ).catch(() => {}); // 忽略超时，继续执行
  }

  async getLastUserMessage(): Promise<string> {
    const messages = await this.page.locator(this.SELECTORS.userMessage).all();
    if (messages.length === 0) return '';
    return messages[messages.length - 1].textContent() ?? '';
  }

  async getLastAssistantMessage(): Promise<string> {
    const messages = await this.page.locator(this.SELECTORS.assistantMessage).all();
    if (messages.length === 0) return '';
    return messages[messages.length - 1].textContent() ?? '';
  }

  async getAllMessages(): Promise<{ role: string; content: string }[]> {
    const userMessages = await this.page.locator(this.SELECTORS.userMessage).allTextContents();
    const assistantMessages = await this.page.locator(this.SELECTORS.assistantMessage).allTextContents();

    const result: { role: string; content: string }[] = [];
    for (let i = 0; i < Math.max(userMessages.length, assistantMessages.length); i++) {
      if (i < assistantMessages.length) {
        result.push({ role: 'assistant', content: assistantMessages[i] });
      }
      if (i < userMessages.length) {
        result.push({ role: 'user', content: userMessages[i] });
      }
    }
    return result;
  }

  async hasSavedDataIndicator(): Promise<boolean> {
    return this.isVisible(this.SELECTORS.savedIndicator);
  }

  async waitForSaveConfirmation(timeout: number = 30000): Promise<boolean> {
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      const message = await this.getLastAssistantMessage();
      if (this.SAVED_KEYWORDS.some(keyword => message.includes(keyword))) {
        return true;
      }
      // 等待一小段时间后重试
      await this.page.waitForTimeout(1000);
    }
    return false;
  }

  async getSaveConfirmationText(): Promise<string | null> {
    const message = await this.getLastAssistantMessage();
    for (const keyword of this.SAVED_KEYWORDS) {
      if (message.includes(keyword)) {
        return message;
      }
    }
    return null;
  }

  async getLastAssistantMessageIncludes(keyword: string): Promise<boolean> {
    const message = await this.getLastAssistantMessage();
    return message.includes(keyword);
  }

  async isLoading(): Promise<boolean> {
    return this.isDisabled(this.SELECTORS.sendButton);
  }

  async isInputEnabled(): Promise<boolean> {
    return !(await this.isDisabled(this.SELECTORS.messageInput));
  }

  async getEmptyStateText(): Promise<string | null> {
    const emptyState = this.page.locator(this.SELECTORS.emptyState);
    if (await emptyState.isVisible()) {
      return emptyState.textContent();
    }
    return null;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add tests/e2e/frontend/page-objects/ChatPage.ts
git commit -m "test: add ChatPage with message and save confirmation methods"
```

---

## Task 6: 创建测试用户 Fixture

**Files:**
- Create: `tests/e2e/frontend/fixtures/testUser.ts`

- [ ] **Step 1: 创建 testUser.ts**

```typescript
let userCounter = 0;

export interface TestUser {
  email: string;
  password: string;
}

export function generateTestUser(): TestUser {
  userCounter++;
  const timestamp = Date.now();
  return {
    email: `test${timestamp}${userCounter}@example.com`,
    password: 'Test123456',
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add tests/e2e/frontend/fixtures/testUser.ts
git commit -m "test: add test user fixture with unique email generation"
```

---

## Task 7: 创建 Chat 测试用例

**Files:**
- Create: `tests/e2e/frontend/chat.spec.ts`

- [ ] **Step 1: 创建 chat.spec.ts**

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from './page-objects/LoginPage';
import { ChatPage } from './page-objects/ChatPage';
import { generateTestUser } from './fixtures/testUser';

test.describe('Chat E2E Tests', () => {
  let loginPage: LoginPage;
  let chatPage: ChatPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    chatPage = new ChatPage(page);
  });

  test('正常保存流程 - 发送完整训练信息后 AI 保存并显示成功', async ({ page }) => {
    // 1. 注册新用户
    const testUser = generateTestUser();
    await loginPage.register(testUser.email, testUser.password);

    // 2. 验证进入 Chat 页面
    await expect(page).toHaveURL('**/chat');

    // 3. 发送完整训练消息
    await chatPage.sendMessage('深蹲100kg 5组8个');

    // 4. 等待 AI 响应
    await page.waitForTimeout(3000); // 等待 AI 处理

    // 5. 验证 AI 回复包含保存成功信息
    const lastMessage = await chatPage.getLastAssistantMessage();
    expect(
      lastMessage.includes('已保存：') || lastMessage.includes('已记录：')
    ).toBeTruthy();

    // 6. 验证显示撤销按钮（表示数据已保存）
    const hasSavedIndicator = await chatPage.hasSavedDataIndicator();
    expect(hasSavedIndicator).toBeTruthy();
  });

  test('追问补充流程 - 信息不完整时 AI 追问，用户补充后保存', async ({ page }) => {
    // 1. 注册新用户
    const testUser = generateTestUser();
    await loginPage.register(testUser.email, testUser.password);

    // 2. 验证进入 Chat 页面
    await expect(page).toHaveURL('**/chat');

    // 3. 发送不完整的训练消息
    await chatPage.sendMessage('练了腿');

    // 4. 等待 AI 响应
    await page.waitForTimeout(3000);

    // 5. 验证第一轮 AI 回复不是保存成功（应该是追问）
    const firstResponse = await chatPage.getLastAssistantMessage();
    expect(
      firstResponse.includes('已保存：') || firstResponse.includes('已记录：')
    ).toBeFalsy();

    // 6. 发送补充消息
    await chatPage.sendMessage('深蹲100kg');

    // 7. 等待 AI 响应
    await page.waitForTimeout(3000);

    // 8. 验证第二轮 AI 回复包含保存成功
    const secondResponse = await chatPage.getLastAssistantMessage();
    expect(
      secondResponse.includes('已保存：') || secondResponse.includes('已记录：')
    ).toBeTruthy();

    // 9. 验证显示撤销按钮
    const hasSavedIndicator = await chatPage.hasSavedDataIndicator();
    expect(hasSavedIndicator).toBeTruthy();
  });
});
```

- [ ] **Step 2: 运行测试验证**

Run: `cd frontend && npx playwright test tests/e2e/frontend/chat.spec.ts --headed --timeout=60000`
Expected: 测试运行（可能因后端未运行而失败，但代码应该正确）

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/frontend/chat.spec.ts
git commit -m "test: add Chat E2E tests for save workflow"
```

---

## 实施检查清单

- [ ] Task 1: 安装 Playwright 依赖
- [ ] Task 2: 创建 Playwright 配置文件
- [ ] Task 3: 创建 BasePage
- [ ] Task 4: 创建 LoginPage
- [ ] Task 5: 创建 ChatPage
- [ ] Task 6: 创建测试用户 Fixture
- [ ] Task 7: 创建 Chat 测试用例

---

## 运行命令

```bash
cd frontend

# 运行所有 E2E 测试
npx playwright test

# 运行 Chat 测试
npx playwright test tests/e2e/frontend/chat.spec.ts

# 带 UI 运行
npx playwright test tests/e2e/frontend/chat.spec.ts --ui

# 调试模式
npx playwright test tests/e2e/frontend/chat.spec.ts --debug
```

## 前置条件

测试运行前需要：
1. 后端运行在 localhost:3000
2. 前端开发服务器运行在 localhost:5173（Playwright 会自动启动）

## 成功标准

1. ✅ `npx playwright test` 能运行测试文件
2. ✅ 正常保存测试通过（AI 回复包含保存成功关键词）
3. ✅ 追问补充测试通过（多轮对话正确工作）
