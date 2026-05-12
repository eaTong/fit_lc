// fitlc-mini/test/e2e/specs/measurements.spec.js
// 围度记录页面 E2E 测试

describe('围度记录页面 E2E', () => {

  test('围度页面加载成功', async () => {
    try {
      await global.miniProgram.navigateBack({ delta: 1 });
    } catch (e) { /* 忽略返回错误 */ }
    await global.miniProgram.navigateTo('/packageB/pages/measurements/index');
    const page = await global.miniProgram.currentPage();
    expect(page).toBeTruthy();
  });

  test('页面包含标签切换器', async () => {
    try {
      await global.miniProgram.navigateBack({ delta: 1 });
    } catch (e) { /* 忽略返回错误 */ }
    await global.miniProgram.navigateTo('/packageB/pages/measurements/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.tab-container', { timeout: 5000 });
    const tabContainer = await page.$('.tab-container');
    expect(tabContainer).toBeTruthy();
  });

  test('页面包含记录和趋势标签', async () => {
    try {
      await global.miniProgram.navigateBack({ delta: 1 });
    } catch (e) { /* 忽略返回错误 */ }
    await global.miniProgram.navigateTo('/packageB/pages/measurements/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.tab-item', { timeout: 5000 });
    const tabItems = await page.$$('.tab-item');
    expect(tabItems.length).toBeGreaterThanOrEqual(2);
  });

  test('页面包含内容区域', async () => {
    try {
      await global.miniProgram.navigateBack({ delta: 1 });
    } catch (e) { /* 忽略返回错误 */ }
    await global.miniProgram.navigateTo('/packageB/pages/measurements/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.latest-card, .content-container', { timeout: 5000 });
    const content = await page.$('.latest-card, .content-container');
    expect(content).toBeTruthy();
  });
});
