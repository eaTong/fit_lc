import { test, expect } from '@playwright/test';
import { ChatPage } from '../page-objects/ChatPage';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('意图澄清机制', () => {
  let chatPage: ChatPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    chatPage = new ChatPage(page);
    loginPage = new LoginPage(page);

    // Login before each test
    await loginPage.login('test@example.com', 'Test123456');
    await page.waitForURL(/\/chat/, { timeout: 10000 });
    await chatPage.open();
  });

  test('CLAR-001: 部分信息时应该追问 @clarification', async () => {
    // 发送部分训练信息，只有重量没有组数和次数
    await chatPage.sendMessage('卧推80公斤');

    // 等待助手回复
    await chatPage.waitForAssistantMessage();
    const reply = await chatPage.getLastAssistantMessage();

    // 应该追问组数和次数
    expect(reply).toMatch(/组数|次数|几组|做几组/);
  });

  test('CLAR-002: 回复澄清后应该保存记录 @clarification', async () => {
    // 先发送部分信息触发澄清
    await chatPage.sendMessage('卧推80公斤');
    await chatPage.waitForAssistantMessage();

    // 回复澄清，提供组数和次数
    await chatPage.sendMessage('5组每组8个');

    // 应该保存成功
    await chatPage.expectSaveSuccess(45000);
  });

  test('CLAR-003: 围度部分信息时应该追问 @clarification', async () => {
    // 发送部分围度信息
    await chatPage.sendMessage('今天胸围94');

    // 等待助手回复
    await chatPage.waitForAssistantMessage();
    const reply = await chatPage.getLastAssistantMessage();

    // 应该追问其他部位
    expect(reply).toMatch(/腰围|臀围|其他|还有/);
  });

  test('CLAR-004: 训练计划不完整时应该澄清 @clarification', async () => {
    // 发送不完整的计划请求
    await chatPage.sendMessage('帮我生成一个增肌计划');

    // 等待助手回复
    await chatPage.waitForAssistantMessage();
    const reply = await chatPage.getLastAssistantMessage();

    // 应该询问具体需求
    expect(reply).toMatch(/训练基础|每周几天|有什么|目标/);
  });

  test('CLAR-005: 超时后应该允许重新开始 @clarification', async ({ page }) => {
    // 发送部分信息触发澄清流程
    await chatPage.sendMessage('硬拉100公斤');
    await chatPage.waitForAssistantMessage();

    const firstReply = await chatPage.getLastAssistantMessage();

    // 澄清回复应该询问组数次数
    expect(firstReply).toMatch(/组数|次数|几组/);

    // 完成这个对话
    await chatPage.sendMessage('5组每组5个');
    await chatPage.expectSaveSuccess(45000);

    // 开始新的对话（模拟超时后重新开始）
    await chatPage.sendMessage('深蹲');
    await chatPage.waitForAssistantMessage();

    // 新对话应该能正常进行
    const newReply = await chatPage.getLastAssistantMessage();
    expect(newReply.length).toBeGreaterThan(0);
  });
});