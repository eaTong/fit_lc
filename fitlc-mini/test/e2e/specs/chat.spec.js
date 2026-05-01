// fitlc-mini/test/e2e/specs/chat.spec.js
const automator = require('miniprogram-automator');

describe('Chat Page E2E', () => {
  let miniProgram;

  beforeAll(async () => {
    miniProgram = await automator.launch({
      projectPath: './fitlc-mini'
    });
    // 先登录
    await miniProgram.navigateTo('/pages/login/index');
    const page = await miniProgram.currentPage();
    await page.input('.phone-input', 'test@example.com');
    await page.input('.password-input', 'Test123456');
    await page.tap('.login-btn');
    await miniProgram.waitFor(1000);
  });

  afterAll(async () => {
    if (miniProgram) {
      await miniProgram.close();
    }
  });

  test('发送消息', async () => {
    await miniProgram.navigateTo('/pages/chat/index');
    const page = await miniProgram.currentPage();

    await page.waitFor('.message-input');
    await page.input('.message-input', '卧推 100kg 10次');
    await page.tap('.send-btn');

    await miniProgram.waitFor(2000);
  });

  test('页面跳转（聊天 -> 个人中心）', async () => {
    await miniProgram.navigateTo('/pages/chat/index');
    const page = await miniProgram.currentPage();

    await page.tap('.profile-tab');
    await miniProgram.waitFor(1000);

    const currentUrl = await page.url();
    expect(currentUrl).toContain('/pages/profile/index');
  });

  test('消息列表加载', async () => {
    await miniProgram.navigateTo('/pages/chat/index');
    const page = await miniProgram.currentPage();

    await page.waitFor('.message-list');
    const messages = await page.$$('.message-item');
    expect(messages.length).toBeGreaterThanOrEqual(0);
  });
});