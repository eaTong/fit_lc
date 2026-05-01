// fitlc-mini/test/e2e/specs/profile.spec.js
const automator = require('miniprogram-automator');

describe('Profile Page E2E', () => {
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

  test('个人资料展示', async () => {
    await miniProgram.navigateTo('/pages/profile/index');
    const page = await miniProgram.currentPage();

    await page.waitFor('.user-name');
    const userName = await page.text('.user-name');
    expect(userName).toBeDefined();
  });
});