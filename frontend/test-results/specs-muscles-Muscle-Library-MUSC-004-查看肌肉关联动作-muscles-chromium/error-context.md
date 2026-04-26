# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: specs/muscles.spec.ts >> Muscle Library >> MUSC-004: 查看肌肉关联动作 @muscles
- Location: tests/e2e/specs/muscles.spec.ts:42:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByText('胸部')

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
  4  | test.describe('Muscle Library', () => {
  5  |   let loginPage: LoginPage;
  6  | 
  7  |   test.beforeEach(async ({ page }) => {
  8  |     loginPage = new LoginPage(page);
  9  |     await loginPage.login('test@example.com', 'Test123456');
  10 |   });
  11 | 
  12 |   test('MUSC-001: 查看肌肉层级结构 @muscles', async ({ page }) => {
  13 |     await page.goto('/muscles');
  14 | 
  15 |     // Should show muscle group hierarchy
  16 |     await expect(page.getByText('胸部')).toBeVisible();
  17 |     await expect(page.getByText('背部')).toBeVisible();
  18 |     await expect(page.getByText('腿部')).toBeVisible();
  19 |   });
  20 | 
  21 |   test('MUSC-002: 展开肌肉子节点 @muscles', async ({ page }) => {
  22 |     await page.goto('/muscles');
  23 | 
  24 |     // Click to expand chest group
  25 |     await page.getByText('胸部').click();
  26 | 
  27 |     // Should show child muscles
  28 |     await expect(page.getByText('胸大肌')).toBeVisible();
  29 |     await expect(page.getByText('胸小肌')).toBeVisible();
  30 |   });
  31 | 
  32 |   test('MUSC-003: 查看肌肉详情 @muscles', async ({ page }) => {
  33 |     await page.goto('/muscles');
  34 | 
  35 |     // Click on a specific muscle
  36 |     await page.getByText('胸大肌').click();
  37 | 
  38 |     // Should show muscle details (origin, insertion, function)
  39 |     await expect(page.getByText(/起点|止点|功能/)).toBeVisible({ timeout: 5000 });
  40 |   });
  41 | 
  42 |   test('MUSC-004: 查看肌肉关联动作 @muscles', async ({ page }) => {
  43 |     await page.goto('/muscles');
  44 | 
  45 |     // Expand and click on a muscle
> 46 |     await page.getByText('胸部').click();
     |                                ^ Error: locator.click: Test timeout of 30000ms exceeded.
  47 |     await page.getByText('胸大肌').click();
  48 | 
  49 |     // Should show related exercises
  50 |     await expect(page.getByText(/相关动作|训练动作/)).toBeVisible({ timeout: 5000 });
  51 |   });
  52 | 
  53 |   test('MUSC-005: 折叠肌肉组 @muscles', async ({ page }) => {
  54 |     await page.goto('/muscles');
  55 | 
  56 |     // Expand chest first
  57 |     await page.getByText('胸部').click();
  58 |     await expect(page.getByText('胸大肌')).toBeVisible();
  59 | 
  60 |     // Collapse chest
  61 |     await page.getByText('胸部').click();
  62 | 
  63 |     // Child muscles should be hidden
  64 |     await expect(page.getByText('胸大肌')).not.toBeVisible();
  65 |   });
  66 | });
```