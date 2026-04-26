import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('Admin - Muscle Management', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    // Login as admin user
    await loginPage.login('admin@example.com', 'Admin123456');
  });

  test('ADMIN-MUSC-001: 查看肌肉列表(管理员) @admin', async ({ page }) => {
    await page.goto('/admin/muscles');

    // Should show admin muscle management page
    await expect(page.getByText('肌肉管理')).toBeVisible();
    await expect(page.locator('[data-testid="admin-muscle-table"]')).toBeVisible();
  });

  test('ADMIN-MUSC-002: 创建新肌肉 @admin', async ({ page }) => {
    await page.goto('/admin/muscles');

    // Click add muscle button
    await page.getByRole('button', { name: '添加肌肉' }).click();

    // Fill in muscle form
    await page.getByLabel('肌肉名称').fill('胸大肌');
    await page.getByLabel('所属肌肉群').selectOption('chest');
    await page.getByLabel('排序').fill('1');
    await page.getByRole('button', { name: '保存' }).click();

    // Should show success message
    await expect(page.getByText(/创建成功|已添加/)).toBeVisible();
  });

  test('ADMIN-MUSC-003: 编辑肌肉 @admin', async ({ page }) => {
    await page.goto('/admin/muscles');

    // Click edit on first muscle
    await page.locator('[data-testid="edit-button"]').first().click();

    // Modify name
    await page.getByLabel('肌肉名称').fill('修改后的肌肉名称');
    await page.getByRole('button', { name: '保存' }).click();

    // Should show success
    await expect(page.getByText(/更新成功|已保存/)).toBeVisible();
  });

  test('ADMIN-MUSC-004: 删除肌肉 @admin', async ({ page }) => {
    await page.goto('/admin/muscles');

    // Click delete on first muscle
    await page.locator('[data-testid="delete-button"]').first().click();

    // Confirm deletion
    await page.getByRole('button', { name: '确认删除' }).click();

    // Should show success
    await expect(page.getByText(/删除成功|已删除/)).toBeVisible();
  });

  test('ADMIN-MUSC-005: AI生成肌肉详情 @admin', async ({ page }) => {
    await page.goto('/admin/muscles');

    // Select a muscle and generate details
    await page.locator('[data-testid="muscle-row"]').first().click();
    await page.getByRole('button', { name: 'AI生成详情' }).click();

    // Should show generating status then results
    await expect(page.getByText(/生成中|正在生成/)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/起点|止点|功能/)).toBeVisible({ timeout: 30000 });
  });

  test('ADMIN-MUSC-006: 批量导入肌肉 @admin', async ({ page }) => {
    await page.goto('/admin/muscles');

    // Click batch import button
    await page.getByRole('button', { name: '批量导入' }).click();

    // Should show import dialog with file upload
    await expect(page.getByText(/导入|上传文件/)).toBeVisible();
  });
});