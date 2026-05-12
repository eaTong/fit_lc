// fitlc-mini/test/e2e/specs/gallery.spec.js
// 相册页面 E2E 测试

describe('相册页面 E2E', () => {

  test('相册页面加载成功', async () => {
    try {
      await global.miniProgram.navigateBack({ delta: 1 });
    } catch (e) { /* 忽略返回错误 */ }
    await global.miniProgram.navigateTo('/packageC/pages/gallery/index');
    const page = await global.miniProgram.currentPage();
    expect(page).toBeTruthy();
  });

  test('页面包含相册容器', async () => {
    try {
      await global.miniProgram.navigateBack({ delta: 1 });
    } catch (e) { /* 忽略返回错误 */ }
    await global.miniProgram.navigateTo('/packageC/pages/gallery/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.gallery-container, .gallery-grid, .empty-state', { timeout: 5000 });
    const gallery = await page.$('.gallery-container, .gallery-grid, .empty-state');
    expect(gallery).toBeTruthy();
  });
});
