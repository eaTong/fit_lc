# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: specs/admin-exercises.spec.ts >> Admin - Exercise Management >> ADMIN-EXER-006: AI生成动作详情 @admin
- Location: tests/e2e/specs/admin-exercises.spec.ts:78:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[data-testid="exercise-row"]').first()

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
  4  | test.describe('Admin - Exercise Management', () => {
  5  |   let loginPage: LoginPage;
  6  | 
  7  |   test.beforeEach(async ({ page }) => {
  8  |     loginPage = new LoginPage(page);
  9  |     // Login as admin user
  10 |     await loginPage.login('admin@example.com', 'Admin123456');
  11 |   });
  12 | 
  13 |   test('ADMIN-EXER-001: 查看动作列表(管理员) @admin', async ({ page }) => {
  14 |     await page.goto('/admin/exercises');
  15 | 
  16 |     // Should show admin exercise management page
  17 |     await expect(page.getByText('动作管理')).toBeVisible();
  18 |     await expect(page.locator('[data-testid="admin-exercise-table"]')).toBeVisible();
  19 |   });
  20 | 
  21 |   test('ADMIN-EXER-002: 创建新动作 @admin', async ({ page }) => {
  22 |     await page.goto('/admin/exercises');
  23 | 
  24 |     // Click add exercise button
  25 |     await page.getByRole('button', { name: '添加动作' }).click();
  26 | 
  27 |     // Fill in exercise form
  28 |     await page.getByLabel('动作名称').fill('测试动作');
  29 |     await page.getByLabel('肌肉群').selectOption('chest');
  30 |     await page.getByLabel('器械').selectOption('barbell');
  31 |     await page.getByLabel('难度').selectOption('beginner');
  32 |     await page.getByRole('button', { name: '保存' }).click();
  33 | 
  34 |     // Should show success message
  35 |     await expect(page.getByText(/创建成功|已添加/)).toBeVisible();
  36 |   });
  37 | 
  38 |   test('ADMIN-EXER-003: 编辑动作 @admin', async ({ page }) => {
  39 |     await page.goto('/admin/exercises');
  40 | 
  41 |     // Click edit on first exercise
  42 |     await page.locator('[data-testid="edit-button"]').first().click();
  43 | 
  44 |     // Modify name
  45 |     await page.getByLabel('动作名称').fill('修改后的动作名称');
  46 |     await page.getByRole('button', { name: '保存' }).click();
  47 | 
  48 |     // Should show success
  49 |     await expect(page.getByText(/更新成功|已保存/)).toBeVisible();
  50 |   });
  51 | 
  52 |   test('ADMIN-EXER-004: 删除动作 @admin', async ({ page }) => {
  53 |     await page.goto('/admin/exercises');
  54 | 
  55 |     // Click delete on first exercise
  56 |     await page.locator('[data-testid="delete-button"]').first().click();
  57 | 
  58 |     // Confirm deletion
  59 |     await page.getByRole('button', { name: '确认删除' }).click();
  60 | 
  61 |     // Should show success
  62 |     await expect(page.getByText(/删除成功|已删除/)).toBeVisible();
  63 |   });
  64 | 
  65 |   test('ADMIN-EXER-005: 发布动作 @admin', async ({ page }) => {
  66 |     await page.goto('/admin/exercises');
  67 | 
  68 |     // Find a draft exercise and publish it
  69 |     const draftExercise = page.locator('[data-testid="status-draft"]').first();
  70 |     if (await draftExercise.isVisible()) {
  71 |       await draftExercise.getByRole('button', { name: '发布' }).click();
  72 | 
  73 |       // Should show success
  74 |       await expect(page.getByText(/发布成功|已发布/)).toBeVisible();
  75 |     }
  76 |   });
  77 | 
  78 |   test('ADMIN-EXER-006: AI生成动作详情 @admin', async ({ page }) => {
  79 |     await page.goto('/admin/exercises');
  80 | 
  81 |     // Select an exercise and generate details
> 82 |     await page.locator('[data-testid="exercise-row"]').first().click();
     |                                                                ^ Error: locator.click: Test timeout of 30000ms exceeded.
  83 |     await page.getByRole('button', { name: 'AI生成详情' }).click();
  84 | 
  85 |     // Should show generating status then results
  86 |     await expect(page.getByText(/生成中|正在生成/)).toBeVisible({ timeout: 5000 });
  87 |     await expect(page.getByText(/安全提示|动作步骤/)).toBeVisible({ timeout: 30000 });
  88 |   });
  89 | });
```