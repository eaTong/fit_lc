# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: specs/workout-plan.spec.ts >> Workout Plan >> PLAN-001: AI生成计划 @plans
- Location: tests/e2e/specs/workout-plan.spec.ts:12:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: '生成计划' })

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
  4  | test.describe('Workout Plan', () => {
  5  |   let loginPage: LoginPage;
  6  | 
  7  |   test.beforeEach(async ({ page }) => {
  8  |     loginPage = new LoginPage(page);
  9  |     await loginPage.login('test@example.com', 'Test123456');
  10 |   });
  11 | 
  12 |   test('PLAN-001: AI生成计划 @plans', async ({ page }) => {
  13 |     await page.goto('/plans');
  14 | 
  15 |     // Click generate new plan button
> 16 |     await page.getByRole('button', { name: '生成计划' }).click();
     |                                                      ^ Error: locator.click: Test timeout of 30000ms exceeded.
  17 | 
  18 |     // Fill in plan requirements
  19 |     await page.getByPlaceholder('描述你的健身目标').fill('我想增肌，每周训练3次');
  20 |     await page.getByRole('button', { name: '生成' }).click();
  21 | 
  22 |     // Should show generated plan
  23 |     await expect(page.getByText(/计划详情|训练动作/)).toBeVisible({ timeout: 30000 });
  24 |   });
  25 | 
  26 |   test('PLAN-002: 查看计划详情 @plans', async ({ page }) => {
  27 |     await page.goto('/plans');
  28 | 
  29 |     // Click on existing plan
  30 |     const firstPlan = page.locator('[data-testid="plan-card"]').first();
  31 | 
  32 |     if (await firstPlan.isVisible()) {
  33 |       await firstPlan.click();
  34 | 
  35 |       // Should show plan details
  36 |       await expect(page.getByText(/训练日|动作/)).toBeVisible();
  37 |     }
  38 |   });
  39 | 
  40 |   test('PLAN-003: 激活计划 @plans', async ({ page }) => {
  41 |     await page.goto('/plans');
  42 | 
  43 |     // Click on existing plan
  44 |     const firstPlan = page.locator('[data-testid="plan-card"]').first();
  45 | 
  46 |     if (await firstPlan.isVisible()) {
  47 |       await firstPlan.click();
  48 | 
  49 |       // Click activate button
  50 |       await page.getByRole('button', { name: '激活计划' }).click();
  51 | 
  52 |       // Should show confirmation
  53 |       await expect(page.getByText(/激活成功|进行中/)).toBeVisible();
  54 |     }
  55 |   });
  56 | 
  57 |   test('PLAN-004: 执行打卡 @plans', async ({ page }) => {
  58 |     await page.goto('/plans');
  59 | 
  60 |     // Find an active plan
  61 |     const activePlan = page.locator('[data-testid="plan-card"]:has([data-testid="status-active"])').first();
  62 | 
  63 |     if (await activePlan.isVisible()) {
  64 |       await activePlan.click();
  65 | 
  66 |       // Click check-in button
  67 |       await page.getByRole('button', { name: '打卡' }).click();
  68 | 
  69 |       // Fill in completion info
  70 |       await page.getByLabel('完成组数').fill('3');
  71 |       await page.getByRole('button', { name: '确认' }).click();
  72 | 
  73 |       // Should show success
  74 |       await expect(page.getByText(/打卡成功|已完成/)).toBeVisible();
  75 |     }
  76 |   });
  77 | });
```