// fitlc-mini/test/e2e/specs/calendar.spec.js
// 日历页面 E2E 测试

describe('日历页面 E2E', () => {

  test('日历页面加载成功', async () => {
    try {
      await global.miniProgram.navigateBack({ delta: 1 });
    } catch (e) { /* 忽略返回错误 */ }
    await global.miniProgram.navigateTo('/packageB/pages/calendar/index');
    const page = await global.miniProgram.currentPage();
    expect(page).toBeTruthy();
  });

  test('页面包含日历容器', async () => {
    try {
      await global.miniProgram.navigateBack({ delta: 1 });
    } catch (e) { /* 忽略返回错误 */ }
    await global.miniProgram.navigateTo('/packageB/pages/calendar/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.calendar-container, .calendar', { timeout: 5000 });
    const calendar = await page.$('.calendar-container, .calendar');
    expect(calendar).toBeTruthy();
  });
});
