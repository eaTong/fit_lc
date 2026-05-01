// fitlc-mini/test/e2e/specs/profile.spec.js
const automator = require('miniprogram-automator');

describe('Profile Page E2E', () => {
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
    await miniProgram.navigateTo('/pages/profile/index');
    const page = await miniProgram.currentPage();

    const currentUrl = await page.url();
    expect(currentUrl).toContain('/pages/profile/index');
  });
});