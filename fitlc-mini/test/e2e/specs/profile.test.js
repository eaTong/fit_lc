// fitlc-mini/test/e2e/specs/profile.spec.js
// 个人中心页面 E2E 测试

describe('个人中心页面 E2E', () => {

  test('个人中心页面加载成功', async () => {
    await global.miniProgram.switchTab('/pages/profile/index');
    const page = await global.miniProgram.currentPage();
    expect(page).toBeTruthy();
  });

  test('页面包含用户信息区域', async () => {
    await global.miniProgram.switchTab('/pages/profile/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.user-section', { timeout: 5000 });
    const userSection = await page.$('.user-section');
    expect(userSection).toBeTruthy();
  });

  test('页面包含用户头像', async () => {
    await global.miniProgram.switchTab('/pages/profile/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.user-avatar', { timeout: 5000 });
    const avatar = await page.$('.user-avatar');
    expect(avatar).toBeTruthy();
  });

  test('页面包含用户名称', async () => {
    await global.miniProgram.switchTab('/pages/profile/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.user-name', { timeout: 5000 });
    const userName = await page.$('.user-name');
    expect(userName).toBeTruthy();
  });

  test('页面包含统计数据行', async () => {
    await global.miniProgram.switchTab('/pages/profile/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.stats-row', { timeout: 5000 });
    const statsRow = await page.$('.stats-row');
    expect(statsRow).toBeTruthy();
  });

  test('统计数据包含训练计数', async () => {
    await global.miniProgram.switchTab('/pages/profile/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.stat-item', { timeout: 5000 });
    const statItems = await page.$$('.stat-item');
    expect(statItems.length).toBeGreaterThanOrEqual(4);
  });

  test('页面包含快捷入口', async () => {
    await global.miniProgram.switchTab('/pages/profile/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.quick-access', { timeout: 5000 });
    const quickAccess = await page.$('.quick-access');
    expect(quickAccess).toBeTruthy();
  });

  test('快捷入口包含多个功能入口', async () => {
    await global.miniProgram.switchTab('/pages/profile/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.access-item', { timeout: 5000 });
    const accessItems = await page.$$('.access-item');
    expect(accessItems.length).toBeGreaterThanOrEqual(4);
  });

  test('页面包含设置按钮', async () => {
    await global.miniProgram.switchTab('/pages/profile/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.settings-btn', { timeout: 5000 });
    const settingsBtn = await page.$('.settings-btn');
    expect(settingsBtn).toBeTruthy();
  });

  test('页面包含退出登录按钮', async () => {
    await global.miniProgram.switchTab('/pages/profile/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.logout-btn', { timeout: 5000 });
    const logoutBtn = await page.$('.logout-btn');
    expect(logoutBtn).toBeTruthy();
  });

  test('页面包含身体数据区域', async () => {
    await global.miniProgram.switchTab('/pages/profile/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.metrics-section', { timeout: 5000 });
    const metricsSection = await page.$('.metrics-section');
    expect(metricsSection).toBeTruthy();
  });
});
