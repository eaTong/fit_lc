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
    await expect(page).toHaveURL(/\/chat/);

    // 3. 发送完整训练消息（包含日期）
    await chatPage.sendMessage('2026年4月24日深蹲100kg 5组8个');

    // 4. 等待 AI 响应并验证保存成功
    const hasSaved = await chatPage.waitForSaveConfirmation(30000);
    expect(hasSaved).toBeTruthy();

    // 5. 获取 AI 回复并打印用于调试
    const lastMessage = await chatPage.getLastAssistantMessage();
    console.log('AI Response:', lastMessage);

    // 6. 验证 AI 回复包含保存成功关键词
    expect(
      lastMessage.includes('已保存') || lastMessage.includes('已记录') || lastMessage.includes('保存成功') || lastMessage.includes('✅')
    ).toBeTruthy();

    // 7. 等待一小段时间让 UI 更新
    await page.waitForTimeout(1000);

    // 8. 验证显示撤销按钮（表示数据已保存）
    const hasSavedIndicator = await chatPage.hasSavedDataIndicator();
    expect(hasSavedIndicator).toBeTruthy();
  });

  test('追问补充流程 - 信息不完整时 AI 追问，用户补充后保存', async ({ page }) => {
    // 1. 注册新用户
    const testUser = generateTestUser();
    await loginPage.register(testUser.email, testUser.password);

    // 2. 验证进入 Chat 页面
    await expect(page).toHaveURL(/\/chat/);

    // 3. 发送模糊的训练消息（AI 应该会追问具体内容而不是直接保存）
    await chatPage.sendMessage('我运动了一下');

    // 4. 等待 AI 响应（应该包含追问，不是保存成功）
    // 先等待一小段时间让消息发送
    await page.waitForTimeout(2000);

    // 然后轮询直到获得非空回复
    let firstResponse = '';
    const startTime = Date.now();
    while (Date.now() - startTime < 15000) {
      firstResponse = await chatPage.getLastAssistantMessage();
      if (firstResponse && firstResponse.length > 0) {
        break;
      }
      await page.waitForTimeout(500);
    }

    console.log('First AI Response:', firstResponse);

    // 5. 验证第一轮 AI 回复不为空
    expect(firstResponse.length).toBeGreaterThan(0);

    // 6. 验证第一轮 AI 回复不是保存成功（应该是追问）
    expect(
      firstResponse.includes('已保存') || firstResponse.includes('已记录')
    ).toBeFalsy();

    // 7. 发送补充消息（包含日期和重量）
    await chatPage.sendMessage('2026年4月24日深蹲100kg 5组8个');

    // 8. 等待第二轮 AI 响应
    const hasSaved = await chatPage.waitForSaveConfirmation(30000);
    expect(hasSaved).toBeTruthy();

    // 9. 获取第二轮 AI 回复
    const secondResponse = await chatPage.getLastAssistantMessage();
    console.log('Second AI Response:', secondResponse);

    // 10. 验证第二轮 AI 回复包含保存成功
    expect(
      secondResponse.includes('已保存') || secondResponse.includes('已记录') || secondResponse.includes('保存成功') || secondResponse.includes('✅')
    ).toBeTruthy();

    // 11. 等待一小段时间让 UI 更新
    await page.waitForTimeout(1000);

    // 12. 验证显示撤销按钮
    const hasSavedIndicator = await chatPage.hasSavedDataIndicator();
    expect(hasSavedIndicator).toBeTruthy();
  });
});