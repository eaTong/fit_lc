import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('Trends Analysis', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.login('test@example.com', 'Test123456');
  });

  test('TREND-001: 查看围度趋势图 @trends', async ({ page }) => {
    await page.goto('/trends');

    // Should show chart container
    await expect(page.locator('canvas').or(page.locator('[data-testid="chart"]'))).toBeVisible();

    // Should have body part selectors
    await expect(page.getByText('胸围')).toBeVisible();
    await expect(page.getByText('腰围')).toBeVisible();
  });

  test('TREND-002: 时间范围筛选 @trends', async ({ page }) => {
    await page.goto('/trends');

    // Select 30 days
    await page.getByRole('button', { name: '30天' }).click();

    // Chart should update
    await expect(page.locator('canvas').or(page.locator('[data-testid="chart"]'))).toBeVisible();
  });

  test('TREND-003: 查看训练统计 @trends', async ({ page }) => {
    await page.goto('/trends');

    // Switch to training stats tab
    await page.getByRole('tab', { name: '训练统计' }).click();

    // Should show bar chart for weekly workout count
    await expect(page.locator('canvas').or(page.locator('[data-testid="bar-chart"]'))).toBeVisible();
  });
});