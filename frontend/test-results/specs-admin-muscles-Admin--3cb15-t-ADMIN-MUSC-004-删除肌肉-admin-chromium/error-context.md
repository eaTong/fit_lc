# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: specs/admin-muscles.spec.ts >> Admin - Muscle Management >> ADMIN-MUSC-004: 删除肌肉 @admin
- Location: tests/e2e/specs/admin-muscles.spec.ts:51:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[data-testid="delete-button"]').first()

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
  4  | test.describe('Admin - Muscle Management', () => {
  5  |   let loginPage: LoginPage;
  6  | 
  7  |   test.beforeEach(async ({ page }) => {
  8  |     loginPage = new LoginPage(page);
  9  |     // Login as admin user
  10 |     await loginPage.login('admin@example.com', 'Admin123456');
  11 |   });
  12 | 
  13 |   test('ADMIN-MUSC-001: 查看肌肉列表(管理员) @admin', async ({ page }) => {
  14 |     await page.goto('/admin/muscles');
  15 | 
  16 |     // Should show admin muscle management page
  17 |     await expect(page.getByText('肌肉管理')).toBeVisible();
  18 |     await expect(page.locator('[data-testid="admin-muscle-table"]')).toBeVisible();
  19 |   });
  20 | 
  21 |   test('ADMIN-MUSC-002: 创建新肌肉 @admin', async ({ page }) => {
  22 |     await page.goto('/admin/muscles');
  23 | 
  24 |     // Click add muscle button
  25 |     await page.getByRole('button', { name: '添加肌肉' }).click();
  26 | 
  27 |     // Fill in muscle form
  28 |     await page.getByLabel('肌肉名称').fill('胸大肌');
  29 |     await page.getByLabel('所属肌肉群').selectOption('chest');
  30 |     await page.getByLabel('排序').fill('1');
  31 |     await page.getByRole('button', { name: '保存' }).click();
  32 | 
  33 |     // Should show success message
  34 |     await expect(page.getByText(/创建成功|已添加/)).toBeVisible();
  35 |   });
  36 | 
  37 |   test('ADMIN-MUSC-003: 编辑肌肉 @admin', async ({ page }) => {
  38 |     await page.goto('/admin/muscles');
  39 | 
  40 |     // Click edit on first muscle
  41 |     await page.locator('[data-testid="edit-button"]').first().click();
  42 | 
  43 |     // Modify name
  44 |     await page.getByLabel('肌肉名称').fill('修改后的肌肉名称');
  45 |     await page.getByRole('button', { name: '保存' }).click();
  46 | 
  47 |     // Should show success
  48 |     await expect(page.getByText(/更新成功|已保存/)).toBeVisible();
  49 |   });
  50 | 
  51 |   test('ADMIN-MUSC-004: 删除肌肉 @admin', async ({ page }) => {
  52 |     await page.goto('/admin/muscles');
  53 | 
  54 |     // Click delete on first muscle
> 55 |     await page.locator('[data-testid="delete-button"]').first().click();
     |                                                                 ^ Error: locator.click: Test timeout of 30000ms exceeded.
  56 | 
  57 |     // Confirm deletion
  58 |     await page.getByRole('button', { name: '确认删除' }).click();
  59 | 
  60 |     // Should show success
  61 |     await expect(page.getByText(/删除成功|已删除/)).toBeVisible();
  62 |   });
  63 | 
  64 |   test('ADMIN-MUSC-005: AI生成肌肉详情 @admin', async ({ page }) => {
  65 |     await page.goto('/admin/muscles');
  66 | 
  67 |     // Select a muscle and generate details
  68 |     await page.locator('[data-testid="muscle-row"]').first().click();
  69 |     await page.getByRole('button', { name: 'AI生成详情' }).click();
  70 | 
  71 |     // Should show generating status then results
  72 |     await expect(page.getByText(/生成中|正在生成/)).toBeVisible({ timeout: 5000 });
  73 |     await expect(page.getByText(/起点|止点|功能/)).toBeVisible({ timeout: 30000 });
  74 |   });
  75 | 
  76 |   test('ADMIN-MUSC-006: 批量导入肌肉 @admin', async ({ page }) => {
  77 |     await page.goto('/admin/muscles');
  78 | 
  79 |     // Click batch import button
  80 |     await page.getByRole('button', { name: '批量导入' }).click();
  81 | 
  82 |     // Should show import dialog with file upload
  83 |     await expect(page.getByText(/导入|上传文件/)).toBeVisible();
  84 |   });
  85 | });
```