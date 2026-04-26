import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('Admin - Exercise Management', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    // Login as admin user
    await loginPage.login('admin@example.com', 'Admin123456');
  });

  test('ADMIN-EXER-001: 查看动作列表(管理员) @admin', async ({ page }) => {
    await page.goto('/admin/exercises');

    // Should show admin exercise management page
    await expect(page.getByText('动作管理')).toBeVisible();
    await expect(page.locator('[data-testid="admin-exercise-table"]')).toBeVisible();
  });

  test('ADMIN-EXER-002: 创建新动作 @admin', async ({ page }) => {
    await page.goto('/admin/exercises');

    // Click add exercise button
    await page.getByRole('button', { name: '添加动作' }).click();

    // Fill in exercise form
    await page.getByLabel('动作名称').fill('测试动作');
    await page.getByLabel('肌肉群').selectOption('chest');
    await page.getByLabel('器械').selectOption('barbell');
    await page.getByLabel('难度').selectOption('beginner');
    await page.getByRole('button', { name: '保存' }).click();

    // Should show success message
    await expect(page.getByText(/创建成功|已添加/)).toBeVisible();
  });

  test('ADMIN-EXER-003: 编辑动作 @admin', async ({ page }) => {
    await page.goto('/admin/exercises');

    // Click edit on first exercise
    await page.locator('[data-testid="edit-button"]').first().click();

    // Modify name
    await page.getByLabel('动作名称').fill('修改后的动作名称');
    await page.getByRole('button', { name: '保存' }).click();

    // Should show success
    await expect(page.getByText(/更新成功|已保存/)).toBeVisible();
  });

  test('ADMIN-EXER-004: 删除动作 @admin', async ({ page }) => {
    await page.goto('/admin/exercises');

    // Click delete on first exercise
    await page.locator('[data-testid="delete-button"]').first().click();

    // Confirm deletion
    await page.getByRole('button', { name: '确认删除' }).click();

    // Should show success
    await expect(page.getByText(/删除成功|已删除/)).toBeVisible();
  });

  test('ADMIN-EXER-005: 发布动作 @admin', async ({ page }) => {
    await page.goto('/admin/exercises');

    // Find a draft exercise and publish it
    const draftExercise = page.locator('[data-testid="status-draft"]').first();
    if (await draftExercise.isVisible()) {
      await draftExercise.getByRole('button', { name: '发布' }).click();

      // Should show success
      await expect(page.getByText(/发布成功|已发布/)).toBeVisible();
    }
  });

  test('ADMIN-EXER-006: AI生成动作详情 @admin', async ({ page }) => {
    await page.goto('/admin/exercises');

    // Select an exercise and generate details
    await page.locator('[data-testid="exercise-row"]').first().click();
    await page.getByRole('button', { name: 'AI生成详情' }).click();

    // Should show generating status then results
    await expect(page.getByText(/生成中|正在生成/)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/安全提示|动作步骤/)).toBeVisible({ timeout: 30000 });
  });
});