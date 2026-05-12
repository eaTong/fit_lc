// fitlc-mini/test/e2e/specs/badges.spec.js
// 徽章墙页面 E2E 测试

describe('徽章墙页面 E2E', () => {

  test('徽章页面加载成功', async () => {
    try {
      await global.miniProgram.navigateBack({ delta: 1 });
    } catch (e) { /* 忽略返回错误 */ }
    await global.miniProgram.navigateTo('/packageC/pages/badges/index');
    const page = await global.miniProgram.currentPage();
    expect(page).toBeTruthy();
  });

  test('页面包含页面标题', async () => {
    try {
      await global.miniProgram.navigateBack({ delta: 1 });
    } catch (e) { /* 忽略返回错误 */ }
    await global.miniProgram.navigateTo('/packageC/pages/badges/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.header-title', { timeout: 5000 });
    const headerTitle = await page.$('.header-title');
    expect(headerTitle).toBeTruthy();
  });

  test('页面包含徽章容器或加载中', async () => {
    try {
      await global.miniProgram.navigateBack({ delta: 1 });
    } catch (e) { /* 忽略返回错误 */ }
    await global.miniProgram.navigateTo('/packageC/pages/badges/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.badges-container, .loading-container', { timeout: 5000 });
    const container = await page.$('.badges-container, .loading-container');
    expect(container).toBeTruthy();
  });
});
