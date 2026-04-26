import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('Workout Plan', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.login('test@example.com', 'Test123456');
  });

  test('PLAN-001: AI生成计划 @plans', async ({ page }) => {
    await page.goto('/plans');

    // Click generate new plan button
    await page.getByRole('button', { name: '生成计划' }).click();

    // Fill in plan requirements
    await page.getByPlaceholder('描述你的健身目标').fill('我想增肌，每周训练3次');
    await page.getByRole('button', { name: '生成' }).click();

    // Should show generated plan
    await expect(page.getByText(/计划详情|训练动作/)).toBeVisible({ timeout: 30000 });
  });

  test('PLAN-002: 查看计划详情 @plans', async ({ page }) => {
    await page.goto('/plans');

    // Click on existing plan
    const firstPlan = page.locator('[data-testid="plan-card"]').first();

    if (await firstPlan.isVisible()) {
      await firstPlan.click();

      // Should show plan details
      await expect(page.getByText(/训练日|动作/)).toBeVisible();
    }
  });

  test('PLAN-003: 激活计划 @plans', async ({ page }) => {
    await page.goto('/plans');

    // Click on existing plan
    const firstPlan = page.locator('[data-testid="plan-card"]').first();

    if (await firstPlan.isVisible()) {
      await firstPlan.click();

      // Click activate button
      await page.getByRole('button', { name: '激活计划' }).click();

      // Should show confirmation
      await expect(page.getByText(/激活成功|进行中/)).toBeVisible();
    }
  });

  test('PLAN-004: 执行打卡 @plans', async ({ page }) => {
    await page.goto('/plans');

    // Find an active plan
    const activePlan = page.locator('[data-testid="plan-card"]:has([data-testid="status-active"])').first();

    if (await activePlan.isVisible()) {
      await activePlan.click();

      // Click check-in button
      await page.getByRole('button', { name: '打卡' }).click();

      // Fill in completion info
      await page.getByLabel('完成组数').fill('3');
      await page.getByRole('button', { name: '确认' }).click();

      // Should show success
      await expect(page.getByText(/打卡成功|已完成/)).toBeVisible();
    }
  });
});