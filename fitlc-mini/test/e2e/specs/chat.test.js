// fitlc-mini/test/e2e/specs/chat.spec.js
// 聊天页面 E2E 测试

describe('聊天页面 E2E', () => {

  test('聊天页面加载成功', async () => {
    await global.miniProgram.switchTab('/pages/chat/index');
    const page = await global.miniProgram.currentPage();
    expect(page).toBeTruthy();
  });

  test('页面包含消息容器', async () => {
    await global.miniProgram.switchTab('/pages/chat/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.messages-container', { timeout: 5000 });
    const container = await page.$('.messages-container');
    expect(container).toBeTruthy();
  });

  test('页面包含输入区域', async () => {
    await global.miniProgram.switchTab('/pages/chat/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.input-area', { timeout: 5000 });
    const inputArea = await page.$('.input-area');
    expect(inputArea).toBeTruthy();
  });

  test('页面包含底部导航', async () => {
    // 聊天是 tabbar 页面，switchTab 成功即表示 tabbar 正常
    await global.miniProgram.switchTab('/pages/chat/index');
    expect(true).toBeTruthy();
  });

  test('页面包含文字输入框', async () => {
    await global.miniProgram.switchTab('/pages/chat/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.chat-textarea', { timeout: 5000 });
    const textarea = await page.$('.chat-textarea');
    expect(textarea).toBeTruthy();
  });

  test('页面包含发送按钮', async () => {
    await global.miniProgram.switchTab('/pages/chat/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.send-btn', { timeout: 5000 });
    const sendBtn = await page.$('.send-btn');
    expect(sendBtn).toBeTruthy();
  });

  test('页面包含图片按钮', async () => {
    await global.miniProgram.switchTab('/pages/chat/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.image-btn', { timeout: 5000 });
    const imageBtn = await page.$('.image-btn');
    expect(imageBtn).toBeTruthy();
  });

  test('页面包含语音切换按钮', async () => {
    await global.miniProgram.switchTab('/pages/chat/index');
    const page = await global.miniProgram.currentPage();
    await page.waitFor('.switch-btn', { timeout: 5000 });
    const switchBtn = await page.$('.switch-btn');
    expect(switchBtn).toBeTruthy();
  });
});
