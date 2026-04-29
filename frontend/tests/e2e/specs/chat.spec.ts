import { test, expect } from '@playwright/test';
import { ChatPage } from '../page-objects/ChatPage';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('AI Chat', () => {
  let chatPage: ChatPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    chatPage = new ChatPage(page);
    loginPage = new LoginPage(page);

    // Login before each chat test
    await loginPage.login('test@example.com', 'Test123456');
    // Wait for navigation to complete after login
    await page.waitForURL(/\/chat/, { timeout: 10000 });
    await chatPage.open();
  });

  test('CHAT-001: 记录训练-跑步 @chat', async () => {
    await chatPage.sendMessage('今天跑了5公里');

    // Should show save success
    await chatPage.expectSaveSuccess();
    // Should contain distance info
    await chatPage.expectMessageContains('5公里');
  });

  test('CHAT-002: 记录训练-力量 @chat', async () => {
    await chatPage.sendMessage('深蹲100kg 5组每组8个');

    // Should show save success
    await chatPage.expectSaveSuccess();
    // Should contain weight info
    await chatPage.expectMessageContains('100kg');
  });

  test('CHAT-003: 记录围度 @chat', async () => {
    await chatPage.sendMessage('今天胸围94，腰围78');

    // Should show save success
    await chatPage.expectSaveSuccess();
    // Should contain measurement info
    await chatPage.expectMessageContains('胸围');
  });

  test('CHAT-004: 查询训练历史 @chat', async () => {
    await chatPage.sendMessage('这周跑了多少次？');

    // Should get a response (may or may not contain specific data)
    const lastMessage = await chatPage.getLastAssistantMessage();
    expect(lastMessage.length).toBeGreaterThan(0);
  });

  test('CHAT-005: 查询围度历史 @chat', async ({ page }) => {
    // Ensure we're logged in
    await page.goto('/chat');

    await chatPage.sendMessage('我的围度有什么变化？');

    // Wait for assistant message to appear (with longer timeout)
    await chatPage.waitForAssistantMessage();

    // Should get a response
    const lastMessage = await chatPage.getLastAssistantMessage();
    expect(lastMessage.length).toBeGreaterThan(0);
  });

  test('CHAT-006: 撤销训练记录 @chat', async ({ page }) => {
    // First record a workout
    await chatPage.sendMessage('深蹲100kg 5组');
    await chatPage.expectSaveSuccess();

    // Click undo button if available
    const undoButton = page.getByText('撤销').first();
    if (await undoButton.isVisible()) {
      await undoButton.click();
      // Should show undo confirmation
      await expect(page.getByText(/撤销成功|已撤销/)).toBeVisible();
    }
  });

  test('CHAT-007: PR突破反馈 @chat @pr', async () => {
    // Record a workout that might set a PR
    await chatPage.sendMessage('卧推60kg 4组每组10个');

    // Should show save success
    await chatPage.expectSaveSuccess();

    // Should contain PR feedback if achieved
    const lastMessage = await chatPage.getLastAssistantMessage();
    // Check if PR was broken (message may contain personal record feedback)
    if (lastMessage.includes('个人纪录') || lastMessage.includes('PR')) {
      await expect(page.getByText(/个人纪录|PR|突破/)).toBeVisible();
    }
  });
});