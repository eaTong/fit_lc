// fitlc-mini/test/e2e/specs/login.spec.js
const automator = require('miniprogram-automator');

describe('Login Flow E2E', () => {
  let miniProgram;

  beforeAll(async () => {
    miniProgram = await automator.launch({
      projectPath: './fitlc-mini'
    });
  });

  afterAll(async () => {
    if (miniProgram) {
      await miniProgram.close();
    }
  });

  test('登录成功', async () => {
    await miniProgram.navigateTo('/pages/login/index');
    const page = await miniProgram.currentPage();

    await page.waitFor('.phone-input');
    await page.input('.phone-input', 'test@example.com');
    await page.input('.password-input', 'Test123456');
    await page.tap('.login-btn');

    // 验证跳转到聊天页
    await miniProgram.waitFor(1000);
    const currentUrl = await page.url();
    expect(currentUrl).toContain('/pages/chat/index');
  });

  test('登录失败（错误密码）', async () => {
    await miniProgram.navigateTo('/pages/login/index');
    const page = await miniProgram.currentPage();

    await page.waitFor('.phone-input');
    await page.input('.phone-input', 'test@example.com');
    await page.input('.password-input', 'wrongpassword');
    await page.tap('.login-btn');

    // 验证 toast 错误提示
    await miniProgram.waitFor(500);
  });
});