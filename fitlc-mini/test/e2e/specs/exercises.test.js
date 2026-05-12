// fitlc-mini/test/e2e/specs/exercises.spec.js
// 动作库页面 E2E 测试

describe('动作库页面 E2E', () => {

  test('动作库页面加载成功', async () => {
    await global.miniProgram.switchTab('/pages/exercises/index');
    const page = await global.miniProgram.currentPage();
    expect(page).toBeTruthy();
  });

  test('页面包含搜索框', async () => {
    await global.miniProgram.switchTab('/pages/exercises/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.search-input', { timeout: 5000 });
    const searchInput = await page.$('.search-input');
    expect(searchInput).toBeTruthy();
  });

  test('页面包含器械筛选器', async () => {
    await global.miniProgram.switchTab('/pages/exercises/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.filter-group', { timeout: 5000 });
    const filterGroup = await page.$('.filter-group');
    expect(filterGroup).toBeTruthy();
  });

  test('器械筛选包含多个标签', async () => {
    await global.miniProgram.switchTab('/pages/exercises/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.filter-tag', { timeout: 5000 });
    const filterTags = await page.$$('.filter-tag');
    expect(filterTags.length).toBeGreaterThanOrEqual(4);
  });

  test('页面包含肌肉侧边栏', async () => {
    await global.miniProgram.switchTab('/pages/exercises/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.muscle-sidebar', { timeout: 5000 });
    const sidebar = await page.$('.muscle-sidebar');
    expect(sidebar).toBeTruthy();
  });

  test('肌肉侧边栏包含全部选项', async () => {
    await global.miniProgram.switchTab('/pages/exercises/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.muscle-item', { timeout: 5000 });
    const muscleItems = await page.$$('.muscle-item');
    expect(muscleItems.length).toBeGreaterThanOrEqual(1);
  });

  test('页面包含动作列表', async () => {
    await global.miniProgram.switchTab('/pages/exercises/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.exercise-list', { timeout: 5000 });
    const exerciseList = await page.$('.exercise-list');
    expect(exerciseList).toBeTruthy();
  });

  test('页面包含内容区域', async () => {
    await global.miniProgram.switchTab('/pages/exercises/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.content-area', { timeout: 5000 });
    const contentArea = await page.$('.content-area');
    expect(contentArea).toBeTruthy();
  });

  test('页面包含头部筛选区域', async () => {
    await global.miniProgram.switchTab('/pages/exercises/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.exercises-header', { timeout: 5000 });
    const header = await page.$('.exercises-header');
    expect(header).toBeTruthy();
  });
});
