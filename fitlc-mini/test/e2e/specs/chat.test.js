// fitlc-mini/test/e2e/specs/chat.spec.js
const automator = require('miniprogram-automator');

describe('Chat Page E2E', () => {
  let miniProgram;

  beforeAll(async () => {
    miniProgram = await automator.launch({
      projectPath: '.'
    });
    // 先登录
    await miniProgram.navigateTo('/pages/login/index');
    const page = await miniProgram.currentPage();
    await page.waitFor('.login-btn');
    await page.tap('.login-btn');
    await miniProgram.waitFor(1000);
  });

  afterAll(async () => {
    if (miniProgram) {
      await miniProgram.close();
    }
  });

  test('页面加载成功', async () => {
    await miniProgram.navigateTo('/pages/chat/index');
    const page = await miniProgram.currentPage();

    // 验证页面存在
    const currentUrl = await page.url();
    expect(currentUrl).toContain('/pages/chat/index');
  });

  test('底部导航存在', async () => {
    await miniProgram.navigateTo('/pages/chat/index');
    const page = await miniProgram.currentPage();

    await page.waitFor('.tab-bar');
    const tabBar = await page.$('.tab-bar');
    expect(tabBar).toBeDefined();
  });
});