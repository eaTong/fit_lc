# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: specs/exercises.spec.ts >> Exercise Library >> EXER-006: 搜索动作 @exercises
- Location: tests/e2e/specs/exercises.spec.ts:62:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByPlaceholder('搜索动作')

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
  4  | test.describe('Exercise Library', () => {
  5  |   let loginPage: LoginPage;
  6  | 
  7  |   test.beforeEach(async ({ page }) => {
  8  |     loginPage = new LoginPage(page);
  9  |     await loginPage.login('test@example.com', 'Test123456');
  10 |   });
  11 | 
  12 |   test('EXER-001: 查看动作列表 @exercises', async ({ page }) => {
  13 |     await page.goto('/exercises');
  14 | 
  15 |     // Should show exercise list
  16 |     await expect(page.getByText('动作库')).toBeVisible();
  17 |     await expect(page.locator('[data-testid="exercise-card"]').first()).toBeVisible();
  18 |   });
  19 | 
  20 |   test('EXER-002: 按肌肉群筛选 @exercises', async ({ page }) => {
  21 |     await page.goto('/exercises');
  22 | 
  23 |     // Click chest filter
  24 |     await page.getByRole('button', { name: '胸部' }).click();
  25 | 
  26 |     // Should show only chest exercises
  27 |     await expect(page.getByText('胸部')).toBeVisible();
  28 |   });
  29 | 
  30 |   test('EXER-003: 按器械筛选 @exercises', async ({ page }) => {
  31 |     await page.goto('/exercises');
  32 | 
  33 |     // Click barbell filter
  34 |     await page.getByRole('button', { name: '杠铃' }).click();
  35 | 
  36 |     // Should filter by barbell equipment
  37 |     const exerciseCards = page.locator('[data-testid="exercise-card"]');
  38 |     const count = await exerciseCards.count();
  39 |     expect(count).toBeGreaterThan(0);
  40 |   });
  41 | 
  42 |   test('EXER-004: 按难度筛选 @exercises', async ({ page }) => {
  43 |     await page.goto('/exercises');
  44 | 
  45 |     // Click beginner filter
  46 |     await page.getByRole('button', { name: '初级' }).click();
  47 | 
  48 |     // Should filter by difficulty
  49 |     await expect(page.locator('[data-testid="exercise-card"]').first()).toBeVisible();
  50 |   });
  51 | 
  52 |   test('EXER-005: 查看动作详情 @exercises', async ({ page }) => {
  53 |     await page.goto('/exercises');
  54 | 
  55 |     // Click on first exercise card
  56 |     await page.locator('[data-testid="exercise-card"]').first().click();
  57 | 
  58 |     // Should show exercise details in modal/page
  59 |     await expect(page.getByText(/动作说明|步骤|安全提示/)).toBeVisible({ timeout: 5000 });
  60 |   });
  61 | 
  62 |   test('EXER-006: 搜索动作 @exercises', async ({ page }) => {
  63 |     await page.goto('/exercises');
  64 | 
  65 |     // Fill search input
> 66 |     await page.getByPlaceholder('搜索动作').fill('深蹲');
     |                                         ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  67 | 
  68 |     // Should show search results
  69 |     await expect(page.getByText('深蹲')).toBeVisible();
  70 |   });
  71 | 
  72 |   test('EXER-007: 搜索无结果 @exercises', async ({ page }) => {
  73 |     await page.goto('/exercises');
  74 | 
  75 |     // Search for non-existent exercise
  76 |     await page.getByPlaceholder('搜索动作').fill('xyznonexistent');
  77 | 
  78 |     // Should show empty state
  79 |     await expect(page.getByText(/未找到|无结果/)).toBeVisible();
  80 |   });
  81 | });
```