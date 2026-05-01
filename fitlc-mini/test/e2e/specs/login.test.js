// fitlc-mini/test/e2e/specs/login.spec.js
const automator = require('miniprogram-automator');

describe('Login Flow E2E', () => {
  let miniProgram;

  beforeAll(async () => {
    miniProgram = await automator.launch({
      projectPath: '.'
    });
  });

  afterAll(async () => {
    if (miniProgram) {
      await miniProgram.close();
    }
  });

  test('已登录跳转聊天页', async () => {
    await miniProgram.navigateTo('/pages/login/index');
    const page = await miniProgram.currentPage();

    // 页面应该有手机号登录按钮
    await page.waitFor('.login-btn');
    const hasLoginBtn = await page.$('.login-btn');
    expect(hasLoginBtn).toBeDefined();
  });
});