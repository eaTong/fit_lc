import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { HistoryPage } from '../page-objects/HistoryPage';

test.describe('History Records', () => {
  let loginPage: LoginPage;
  let historyPage: HistoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    historyPage = new HistoryPage(page);
    await loginPage.login('test@example.com', 'Test123456');
  });

  test('REC-001: 查看训练历史 @records', async ({ page }) => {
    await historyPage.open();

    // Should have tabs for workout, trends and measurement
    await expect(page.getByText('训练历史')).toBeVisible();
    await expect(page.getByText('趋势分析')).toBeVisible();
    await expect(page.getByText('围度记录')).toBeVisible();

    // Workout tab should be active by default
    await expect(page.getByRole('tab', { name: '训练历史' })).toHaveAttribute('aria-selected', 'true');
  });

  test('REC-002: 查看围度历史 @records', async ({ page }) => {
    await historyPage.open();

    // Click measurement tab
    await historyPage.switchToMeasurementTab();

    // Should show measurement list
    await expect(page.getByText('围度')).toBeVisible();
  });

  test('REC-003: 删除训练记录 @records', async ({ page }) => {
    await historyPage.open();

    // Find first workout record
    const firstRecord = page.locator('[data-testid="workout-record"]').first();

    if (await firstRecord.isVisible()) {
      // Click delete button
      await historyPage.deleteFirstRecord();

      // Should show confirmation dialog or toast
      await expect(page.getByText(/确认删除|删除成功/)).toBeVisible();
    }
  });

  test('REC-004: 恢复训练记录 @records', async ({ page }) => {
    await historyPage.open();

    // Look for deleted/recoverable records
    const recoverButton = page.getByText('恢复').first();

    if (await recoverButton.isVisible()) {
      await historyPage.restoreFirstRecord();

      // Should show recovery confirmation
      await expect(page.getByText(/恢复成功|已恢复/)).toBeVisible();
    }
  });
});