# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: specs/edge-cases.spec.ts >> Edge Cases & Error Handling >> EDGE-002: 会话超时自动登出 @edge
- Location: tests/e2e/specs/edge-cases.spec.ts:28:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByPlaceholder('输入消息...')

```

# Page snapshot

```yaml
- generic [ref=e5]:
  - heading "FITLC" [level=1] [ref=e6]
  - generic [ref=e7]:
    - generic [ref=e8]:
      - generic [ref=e9]: 邮箱
      - textbox "your@email.com" [ref=e10]
    - generic [ref=e11]:
      - generic [ref=e12]: 密码
      - textbox "••••••••" [ref=e13]
    - button "登录" [ref=e14] [cursor=pointer]
  - paragraph [ref=e15]:
    - text: 还没有账户？
    - link "注册" [ref=e16] [cursor=pointer]:
      - /url: /register
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { LoginPage } from '../page-objects/LoginPage';
  3  | 
  4  | test.describe('Edge Cases & Error Handling', () => {
  5  |   let loginPage: LoginPage;
  6  | 
  7  |   test.beforeEach(async ({ page }) => {
  8  |     loginPage = new LoginPage(page);
  9  |     await loginPage.login('test@example.com', 'Test123456');
  10 |   });
  11 | 
  12 |   test('EDGE-001: 网络断开时发送消息 @edge', async ({ page }) => {
  13 |     // Simulate offline by intercepting requests
  14 |     await page.route('**/api/chat/message', (route) => {
  15 |       route.abort('failed');
  16 |     });
  17 | 
  18 |     await page.goto('/chat');
  19 |     await page.getByPlaceholder('输入消息...').fill('测试消息');
  20 | 
  21 |     // Trigger send (may vary based on UI)
  22 |     await page.getByRole('button', { name: '发送' }).click();
  23 | 
  24 |     // Should show error message
  25 |     await expect(page.getByText(/网络错误|发送失败/)).toBeVisible({ timeout: 5000 });
  26 |   });
  27 | 
  28 |   test('EDGE-002: 会话超时自动登出 @edge', async ({ page }) => {
  29 |     // Navigate to chat page
  30 |     await page.goto('/chat');
  31 | 
  32 |     // Simulate token expiration by clearing localStorage
  33 |     await page.evaluate(() => localStorage.clear());
  34 | 
  35 |     // Try to send a message (should trigger auth check)
> 36 |     await page.getByPlaceholder('输入消息...').fill('测试');
     |                                            ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  37 | 
  38 |     // Should redirect to login
  39 |     await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
  40 |   });
  41 | 
  42 |   test('EDGE-003: 空消息发送 @edge', async ({ page }) => {
  43 |     await page.goto('/chat');
  44 | 
  45 |     // Try to send empty message
  46 |     await page.getByPlaceholder('输入消息...').fill('');
  47 |     await page.getByRole('button', { name: '发送' }).click();
  48 | 
  49 |     // Should show validation error or prevent sending
  50 |     await expect(page.getByText(/请输入消息|不能发送空消息/)).toBeVisible({ timeout: 3000 });
  51 |   });
  52 | 
  53 |   test('EDGE-004: 连续快速发送消息 @edge', async ({ page }) => {
  54 |     await page.goto('/chat');
  55 | 
  56 |     // Rapidly send multiple messages
  57 |     for (let i = 0; i < 3; i++) {
  58 |       await page.getByPlaceholder('输入消息...').fill(`消息 ${i}`);
  59 |       await page.getByRole('button', { name: '发送' }).click();
  60 |       await page.waitForTimeout(100);
  61 |     }
  62 | 
  63 |     // Should handle without crashing
  64 |     await expect(page.locator('[data-testid="message"]').last()).toBeVisible();
  65 |   });
  66 | 
  67 |   test('EDGE-005: 数据加载中显示loading @edge', async ({ page }) => {
  68 |     await page.goto('/history');
  69 | 
  70 |     // Should show loading state
  71 |     await expect(page.getByText(/加载中|加载.../)).toBeVisible({ timeout: 2000 }).catch(() => {
  72 |       // Loading might be too fast to catch, but test passes if no error
  73 |     });
  74 |   });
  75 | 
  76 |   test('EDGE-006: 无数据时显示空状态 @edge', async ({ page }) => {
  77 |     // This assumes a fresh user with no data
  78 |     await page.goto('/history');
  79 | 
  80 |     // Should show empty state message
  81 |     await expect(page.getByText(/暂无数据|没有记录/)).toBeVisible().catch(() => {
  82 |       // If there is data, that's fine too
  83 |     });
  84 |   });
  85 | });
```