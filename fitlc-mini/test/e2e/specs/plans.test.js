// fitlc-mini/test/e2e/specs/plans.spec.js
// 健身计划页面 E2E 测试
// 分包页面：导航前尝试返回上一页

describe('健身计划页面 E2E', () => {

  test('计划页面加载成功', async () => {
    try {
      await global.miniProgram.navigateBack({ delta: 1 });
    } catch (e) { /* 忽略返回错误 */ }
    await global.miniProgram.navigateTo('/packageA/pages/plans/index');
    const page = await global.miniProgram.currentPage();
    expect(page).toBeTruthy();
  });

  test('页面包含页面标题', async () => {
    try {
      await global.miniProgram.navigateBack({ delta: 1 });
    } catch (e) { /* 忽略返回错误 */ }
    await global.miniProgram.navigateTo('/packageA/pages/plans/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.page-title', { timeout: 5000 });
    const title = await page.$('.page-title');
    expect(title).toBeTruthy();
  });

  test('页面包含创建计划按钮', async () => {
    try {
      await global.miniProgram.navigateBack({ delta: 1 });
    } catch (e) { /* 忽略返回错误 */ }
    await global.miniProgram.navigateTo('/packageA/pages/plans/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.create-btn', { timeout: 5000 });
    const createBtn = await page.$('.create-btn');
    expect(createBtn).toBeTruthy();
  });

  test('页面包含标签切换器', async () => {
    try {
      await global.miniProgram.navigateBack({ delta: 1 });
    } catch (e) { /* 忽略返回错误 */ }
    await global.miniProgram.navigateTo('/packageA/pages/plans/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.tab-switcher', { timeout: 5000 });
    const tabSwitcher = await page.$('.tab-switcher');
    expect(tabSwitcher).toBeTruthy();
  });

  test('页面包含计划列表或空状态', async () => {
    try {
      await global.miniProgram.navigateBack({ delta: 1 });
    } catch (e) { /* 忽略返回错误 */ }
    await global.miniProgram.navigateTo('/packageA/pages/plans/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.plans-list, .empty-state', { timeout: 5000 });
    const content = await page.$('.plans-list, .empty-state');
    expect(content).toBeTruthy();
  });
});
