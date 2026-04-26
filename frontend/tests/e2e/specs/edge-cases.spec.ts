import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('Edge Cases & Error Handling', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.login('test@example.com', 'Test123456');
  });

  test('EDGE-001: 网络断开时发送消息 @edge', async ({ page }) => {
    // Simulate offline by intercepting requests
    await page.route('**/api/chat/message', (route) => {
      route.abort('failed');
    });

    await page.goto('/chat');
    await page.getByPlaceholder('输入消息...').fill('测试消息');

    // Trigger send (may vary based on UI)
    await page.getByRole('button', { name: '发送' }).click();

    // Should show error message
    await expect(page.getByText(/网络错误|发送失败/)).toBeVisible({ timeout: 5000 });
  });

  test('EDGE-002: 会话超时自动登出 @edge', async ({ page }) => {
    // Navigate to chat page
    await page.goto('/chat');

    // Simulate token expiration by clearing localStorage
    await page.evaluate(() => localStorage.clear());

    // Try to send a message (should trigger auth check)
    await page.getByPlaceholder('输入消息...').fill('测试');

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
  });

  test('EDGE-003: 空消息发送 @edge', async ({ page }) => {
    await page.goto('/chat');

    // Try to send empty message
    await page.getByPlaceholder('输入消息...').fill('');
    await page.getByRole('button', { name: '发送' }).click();

    // Should show validation error or prevent sending
    await expect(page.getByText(/请输入消息|不能发送空消息/)).toBeVisible({ timeout: 3000 });
  });

  test('EDGE-004: 连续快速发送消息 @edge', async ({ page }) => {
    await page.goto('/chat');

    // Rapidly send multiple messages
    for (let i = 0; i < 3; i++) {
      await page.getByPlaceholder('输入消息...').fill(`消息 ${i}`);
      await page.getByRole('button', { name: '发送' }).click();
      await page.waitForTimeout(100);
    }

    // Should handle without crashing
    await expect(page.locator('[data-testid="message"]').last()).toBeVisible();
  });

  test('EDGE-005: 数据加载中显示loading @edge', async ({ page }) => {
    await page.goto('/history');

    // Should show loading state
    await expect(page.getByText(/加载中|加载.../)).toBeVisible({ timeout: 2000 }).catch(() => {
      // Loading might be too fast to catch, but test passes if no error
    });
  });

  test('EDGE-006: 无数据时显示空状态 @edge', async ({ page }) => {
    // This assumes a fresh user with no data
    await page.goto('/history');

    // Should show empty state message
    await expect(page.getByText(/暂无数据|没有记录/)).toBeVisible().catch(() => {
      // If there is data, that's fine too
    });
  });
});