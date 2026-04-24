import { test, expect } from '@playwright/test';
import { LoginPage } from './page-objects/LoginPage';
import { ChatPage } from './page-objects/ChatPage';
import { generateTestUser } from './fixtures/testUser';

test.describe('Chat E2E Tests', () => {
  let loginPage: LoginPage;
  let chatPage: ChatPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    chatPage = new ChatPage(page);
  });

  test('正常保存流程 - 发送完整训练信息后 AI 保存并显示成功', async ({ page }) => {
    // 1. 注册新用户
    const testUser = generateTestUser();
    await loginPage.register(testUser.email, testUser.password);

    // 2. 验证进入 Chat 页面
    await expect(page).toHaveURL('**/chat');

    // 3. 发送完整训练消息
    await chatPage.sendMessage('深蹲100kg 5组8个');

    // 4. 等待 AI 响应
    await page.waitForTimeout(3000); // 等待 AI 处理

    // 5. 验证 AI 回复包含保存成功信息
    const lastMessage = await chatPage.getLastAssistantMessage();
    expect(
      lastMessage.includes('已保存：') || lastMessage.includes('已记录：')
    ).toBeTruthy();

    // 6. 验证显示撤销按钮（表示数据已保存）
    const hasSavedIndicator = await chatPage.hasSavedDataIndicator();
    expect(hasSavedIndicator).toBeTruthy();
  });

  test('追问补充流程 - 信息不完整时 AI 追问，用户补充后保存', async ({ page }) => {
    // 1. 注册新用户
    const testUser = generateTestUser();
    await loginPage.register(testUser.email, testUser.password);

    // 2. 验证进入 Chat 页面
    await expect(page).toHaveURL('**/chat');

    // 3. 发送不完整的训练消息
    await chatPage.sendMessage('练了腿');

    // 4. 等待 AI 响应
    await page.waitForTimeout(3000);

    // 5. 验证第一轮 AI 回复不是保存成功（应该是追问）
    const firstResponse = await chatPage.getLastAssistantMessage();
    expect(
      firstResponse.includes('已保存：') || firstResponse.includes('已记录：')
    ).toBeFalsy();

    // 6. 发送补充消息
    await chatPage.sendMessage('深蹲100kg');

    // 7. 等待 AI 响应
    await page.waitForTimeout(3000);

    // 8. 验证第二轮 AI 回复包含保存成功
    const secondResponse = await chatPage.getLastAssistantMessage();
    expect(
      secondResponse.includes('已保存：') || secondResponse.includes('已记录：')
    ).toBeTruthy();

    // 9. 验证显示撤销按钮
    const hasSavedIndicator = await chatPage.hasSavedDataIndicator();
    expect(hasSavedIndicator).toBeTruthy();
  });
});