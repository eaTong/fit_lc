# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: specs/trends.spec.ts >> Trends Analysis >> TREND-002: 时间范围筛选 @trends
- Location: tests/e2e/specs/trends.spec.ts:23:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: '30天' })

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
  4  | test.describe('Trends Analysis', () => {
  5  |   let loginPage: LoginPage;
  6  | 
  7  |   test.beforeEach(async ({ page }) => {
  8  |     loginPage = new LoginPage(page);
  9  |     await loginPage.login('test@example.com', 'Test123456');
  10 |   });
  11 | 
  12 |   test('TREND-001: 查看围度趋势图 @trends', async ({ page }) => {
  13 |     await page.goto('/trends');
  14 | 
  15 |     // Should show chart container
  16 |     await expect(page.locator('canvas').or(page.locator('[data-testid="chart"]'))).toBeVisible();
  17 | 
  18 |     // Should have body part selectors
  19 |     await expect(page.getByText('胸围')).toBeVisible();
  20 |     await expect(page.getByText('腰围')).toBeVisible();
  21 |   });
  22 | 
  23 |   test('TREND-002: 时间范围筛选 @trends', async ({ page }) => {
  24 |     await page.goto('/trends');
  25 | 
  26 |     // Select 30 days
> 27 |     await page.getByRole('button', { name: '30天' }).click();
     |                                                     ^ Error: locator.click: Test timeout of 30000ms exceeded.
  28 | 
  29 |     // Chart should update
  30 |     await expect(page.locator('canvas').or(page.locator('[data-testid="chart"]'))).toBeVisible();
  31 |   });
  32 | 
  33 |   test('TREND-003: 查看训练统计 @trends', async ({ page }) => {
  34 |     await page.goto('/trends');
  35 | 
  36 |     // Switch to training stats tab
  37 |     await page.getByRole('tab', { name: '训练统计' }).click();
  38 | 
  39 |     // Should show bar chart for weekly workout count
  40 |     await expect(page.locator('canvas').or(page.locator('[data-testid="bar-chart"]'))).toBeVisible();
  41 |   });
  42 | });
```