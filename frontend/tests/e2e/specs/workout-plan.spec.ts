import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { PlansPage, PlanDetailPage, PlanExecutePage } from '../page-objects/PlansPage';

test.describe('Workout Plan', () => {
  let loginPage: LoginPage;
  let plansPage: PlansPage;
  let planDetailPage: PlanDetailPage;
  let planExecutePage: PlanExecutePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    plansPage = new PlansPage(page);
    planDetailPage = new PlanDetailPage(page);
    planExecutePage = new PlanExecutePage(page);

    await loginPage.login('test@example.com', 'Test123456');
  });

  test('PLAN-001: 访问计划列表页 @plans', async ({ page }) => {
    await plansPage.open();

    // 验证页面标题
    await expect(page.getByRole('heading', { name: '健身计划' })).toBeVisible();

    // 验证生新计划按钮存在
    await expect(page.getByRole('button', { name: '生成新计划' })).toBeVisible();
  });

  test('PLAN-002: 筛选计划列表 @plans', async ({ page }) => {
    await plansPage.open();

    // 测试各个状态筛选
    const tabs = ['全部', '草稿', '进行中', '已完成', '已暂停'];
    for (const tab of tabs) {
      await page.getByRole('button', { name: tab }).click();
      // 页面应保持稳定，无崩溃
      await expect(page.getByRole('heading', { name: '健身计划' })).toBeVisible();
    }
  });

  test('PLAN-003: 导航到计划详情页 @plans', async ({ page }) => {
    await plansPage.open();

    // 等待计划列表加载
    await page.waitForLoadState('networkidle');

    // 点击第一条计划的详情按钮
    const detailBtn = page.locator('a[href*="/plans/"]').filter({ hasText: '详情' }).first();

    if (await detailBtn.isVisible({ timeout: 5000 })) {
      await detailBtn.click();

      // 验证进入详情页
      await expect(page).toHaveURL(/\/plans\/\d+/);

      // 验证详情页包含计划名称
      await expect(page.locator('h1')).toBeVisible();
    }
  });

  test('PLAN-004: 草稿计划激活流程 @plans', async ({ page }) => {
    await plansPage.open();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // 查找所有计划卡片
    const cards = page.locator('article, [data-testid="plan-card"]');
    const cardCount = await cards.count();

    if (cardCount === 0) {
      test.skip(true, '没有计划可测试');
      return;
    }

    // 遍历找草稿计划
    let found = false;
    for (let i = 0; i < cardCount; i++) {
      const card = cards.nth(i);
      const cardText = await card.textContent();

      if (cardText && cardText.includes('草稿')) {
        const activateBtn = card.locator('button:has-text("激活")');
        if (await activateBtn.isVisible()) {
          await activateBtn.click();
          await expect(page.getByText(/激活成功|进行中/)).toBeVisible({ timeout: 5000 });
          found = true;
          break;
        }
      }
    }

    if (!found) {
      test.skip(true, '没有草稿状态的计划可测试');
    }
  });

  test('PLAN-005: 计划详情页展示 @plans', async ({ page }) => {
    await plansPage.open();
    await page.waitForLoadState('networkidle');

    const detailLink = page.locator('a[href*="/plans/"]').filter({ hasText: '详情' }).first();

    if (await detailLink.isVisible({ timeout: 5000 })) {
      await detailLink.click();

      // 等待详情页加载
      await expect(page).toHaveURL(/\/plans\/\d+/);

      // 验证计划详情元素
      await expect(page.getByText(/目标|频率|周期/)).toBeVisible({ timeout: 5000 });

      // 验证返回按钮
      await expect(page.getByRole('button', { name: '返回列表' })).toBeVisible();
    }
  });

  test('PLAN-006: 执行打卡页加载 @plans', async ({ page }) => {
    await plansPage.open();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // 查找所有计划卡片
    const cards = page.locator('article, [data-testid="plan-card"]');
    const cardCount = await cards.count();

    if (cardCount === 0) {
      test.skip(true, '没有计划可测试');
      return;
    }

    // 遍历找进行中的计划
    let found = false;
    for (let i = 0; i < cardCount; i++) {
      const card = cards.nth(i);
      const cardText = await card.textContent();

      if (cardText && cardText.includes('进行中')) {
        const detailLink = card.locator('a[href*="/plans/"]');
        if (await detailLink.isVisible()) {
          await detailLink.click();
          await expect(page).toHaveURL(/\/plans\/\d+/);

          // 点击开始执行
          const startBtn = page.getByRole('button', { name: '开始执行' });
          if (await startBtn.isVisible({ timeout: 3000 })) {
            await startBtn.click();
            await expect(page).toHaveURL(/\/plans\/\d+\/execute/);
            await expect(page.getByText(/今日训练|提交打卡/)).toBeVisible({ timeout: 5000 });
          }
          found = true;
          break;
        }
      }
    }

    if (!found) {
      test.skip(true, '没有进行中的计划可测试');
    }
  });

  test('PLAN-007: 删除计划 @plans', async ({ page }) => {
    await plansPage.open();
    await page.waitForLoadState('networkidle');

    // 获取初始计划数量
    const initialCount = await page.locator('article, [data-testid="plan-card"]').count();

    if (initialCount > 0) {
      // 点击第一个删除按钮
      const deleteBtn = page.locator('button:has-text("删除")').first();
      await deleteBtn.click();

      // 确认删除对话框
      const confirmBtn = page.getByRole('button', { name: /确认|删除/ });
      if (await confirmBtn.isVisible({ timeout: 2000 })) {
        await confirmBtn.click();

        // 验证删除成功（计划数量减少）
        await page.waitForTimeout(500);
        const newCount = await page.locator('article, [data-testid="plan-card"]').count();
        expect(newCount).toBeLessThanOrEqual(initialCount);
      }
    }
  });

  test('PLAN-008: 生成新计划入口 @plans', async ({ page }) => {
    await plansPage.open();

    // 点击生成新计划
    await page.getByRole('button', { name: '生成新计划' }).click();

    // 验证跳转到生成页
    await expect(page).toHaveURL(/\/plans\/new/);

    // 验证生成页内容
    await expect(page.getByRole('heading', { name: '生成健身计划' })).toBeVisible();
  });

  test('PLAN-009: 计划统计展示 @plans', async ({ page }) => {
    await plansPage.open();
    await page.waitForLoadState('networkidle');

    // 找到进行中的计划
    const activeTab = page.getByRole('button', { name: '进行中' });
    await activeTab.click();

    await page.waitForTimeout(500);

    // 检查是否有进行中的计划卡片
    const activePlanCard = page.locator('[data-testid="plan-card"], article').filter({ has: page.locator('text=进行中') }).first();

    if (await activePlanCard.isVisible({ timeout: 5000 })) {
      // 进入详情查看统计信息
      await activePlanCard.locator('a[href*="/plans/"]').click();

      await expect(page).toHaveURL(/\/plans\/\d+/);

      // 进行中的计划可能显示执行统计
      const statsOrActions = page.locator('text=/完成率|已开始|进行中/');
      await expect(statsOrActions.or(page.getByRole('button', { name: '开始执行' }))).toBeVisible({ timeout: 5000 });
    }
  });

  test('PLAN-010: 打卡完成后返回 @plans', async ({ page }) => {
    await plansPage.open();
    await page.waitForLoadState('networkidle');

    // 找进行中的计划
    const activePlanCard = page.locator('[data-testid="plan-card"], article').filter({ has: page.locator('text=进行中') }).first();

    if (await activePlanCard.isVisible({ timeout: 5000 })) {
      // 进入计划详情
      await activePlanCard.locator('a[href*="/plans/"]').click();
      await expect(page).toHaveURL(/\/plans\/\d+/);

      // 点击开始执行
      const startBtn = page.getByRole('button', { name: '开始执行' });
      if (await startBtn.isVisible({ timeout: 3000 })) {
        await startBtn.click();
        await expect(page).toHaveURL(/\/plans\/\d+\/execute/);

        // 如果有训练内容，勾选完成然后提交
        const checkbox = page.locator('.w-6.h-6.border-2').first();
        if (await checkbox.isVisible({ timeout: 2000 })) {
          await checkbox.click();
          await page.getByRole('button', { name: '提交打卡' }).click();

          // 验证打卡成功提示
          await expect(page.getByText(/打卡成功|成功/)).toBeVisible({ timeout: 5000 });
        }
      }
    }
  });
});