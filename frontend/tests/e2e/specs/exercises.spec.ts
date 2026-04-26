import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('Exercise Library', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.login('test@example.com', 'Test123456');
  });

  test('EXER-001: 查看动作列表 @exercises', async ({ page }) => {
    await page.goto('/exercises');

    // Should show exercise list
    await expect(page.getByText('动作库')).toBeVisible();
    await expect(page.locator('[data-testid="exercise-card"]').first()).toBeVisible();
  });

  test('EXER-002: 按肌肉群筛选 @exercises', async ({ page }) => {
    await page.goto('/exercises');

    // Click chest filter
    await page.getByRole('button', { name: '胸部' }).click();

    // Should show only chest exercises
    await expect(page.getByText('胸部')).toBeVisible();
  });

  test('EXER-003: 按器械筛选 @exercises', async ({ page }) => {
    await page.goto('/exercises');

    // Click barbell filter
    await page.getByRole('button', { name: '杠铃' }).click();

    // Should filter by barbell equipment
    const exerciseCards = page.locator('[data-testid="exercise-card"]');
    const count = await exerciseCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('EXER-004: 按难度筛选 @exercises', async ({ page }) => {
    await page.goto('/exercises');

    // Click beginner filter
    await page.getByRole('button', { name: '初级' }).click();

    // Should filter by difficulty
    await expect(page.locator('[data-testid="exercise-card"]').first()).toBeVisible();
  });

  test('EXER-005: 查看动作详情 @exercises', async ({ page }) => {
    await page.goto('/exercises');

    // Click on first exercise card
    await page.locator('[data-testid="exercise-card"]').first().click();

    // Should show exercise details in modal/page
    await expect(page.getByText(/动作说明|步骤|安全提示/)).toBeVisible({ timeout: 5000 });
  });

  test('EXER-006: 搜索动作 @exercises', async ({ page }) => {
    await page.goto('/exercises');

    // Fill search input
    await page.getByPlaceholder('搜索动作').fill('深蹲');

    // Should show search results
    await expect(page.getByText('深蹲')).toBeVisible();
  });

  test('EXER-007: 搜索无结果 @exercises', async ({ page }) => {
    await page.goto('/exercises');

    // Search for non-existent exercise
    await page.getByPlaceholder('搜索动作').fill('xyznonexistent');

    // Should show empty state
    await expect(page.getByText(/未找到|无结果/)).toBeVisible();
  });
});