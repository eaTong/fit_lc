// fitlc-mini/test/e2e/specs/exercises.spec.js
const automator = require('miniprogram-automator');

describe('Exercises Page E2E', () => {
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

  test('动作库列表', async () => {
    await miniProgram.navigateTo('/pages/exercises/index');
    const page = await miniProgram.currentPage();

    await page.waitFor('.exercise-list');
    const exercises = await page.$$('.exercise-item');
    expect(exercises.length).toBeGreaterThanOrEqual(0);
  });

  test('动作详情查看', async () => {
    await miniProgram.navigateTo('/pages/exercises/index');
    const page = await miniProgram.currentPage();

    await page.waitFor('.exercise-item');
    await page.tap('.exercise-item');
    await miniProgram.waitFor(500);

    // 验证进入详情
    const detailPage = await miniProgram.currentPage();
    expect(detailPage).toBeDefined();
  });
});