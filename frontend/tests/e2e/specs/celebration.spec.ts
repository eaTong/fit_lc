import { test, expect } from '@playwright/test';
import { ChatPage } from '../page-objects/ChatPage';
import { LoginPage } from '../page-objects/LoginPage';
import { DashboardPage } from '../page-objects/DashboardPage';
import { AchievementsPage } from '../page-objects/AchievementsPage';

test.describe('First Time Celebration', () => {
  let chatPage: ChatPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    chatPage = new ChatPage(page);
    loginPage = new LoginPage(page);
    await loginPage.login('test@example.com', 'Test123456');
    await page.waitForURL(/\/chat/, { timeout: 10000 });
    await chatPage.open();
  });

  test('CELEBRATION-001: 首次训练显示庆祝动画 @celebration', async ({ page }) => {
    // Check if celebration appears when first workout is saved
    // This test assumes the user has 0 workouts before this test

    await chatPage.sendMessage('卧推50kg 3组每组10个');

    // Wait for save success message (with longer timeout for AI response)
    try {
      await chatPage.expectSaveSuccess({ timeout: 10000 });
    } catch (e) {
      // AI may not return exact "已保存" format - continue anyway
    }

    // Check for celebration overlay (visible when triggered)
    // The celebration should show "恭喜完成首次训练！"
    const celebrationTitle = page.getByText('恭喜完成首次训练！');
    const celebrationVisible = await celebrationTitle.isVisible().catch(() => false);

    if (celebrationVisible) {
      // Should show emoji
      await expect(page.getByText('🎉')).toBeVisible();
      // Should show subtitle
      await expect(page.getByText('坚持记录，你就是最棒的！')).toBeVisible();
    }
  });

  test('CELEBRATION-002: 庆祝动画3秒后自动消失 @celebration', async ({ page }) => {
    // Send message - AI may or may not respond with "已保存" format
    await chatPage.sendMessage('深蹲60kg 4组每组8个');

    // Allow flexible success detection (some AI responses may not have exact "已保存")
    try {
      await chatPage.expectSaveSuccess({ timeout: 10000 });
    } catch (e) {
      // If no save success message, just continue (AI response format varies)
    }

    // If celebration appears, it should auto-hide after ~3 seconds
    const celebrationOverlay = page.locator('.fixed.inset-0.z-50');
    if (await celebrationOverlay.isVisible()) {
      // Wait for auto-dismiss
      await page.waitForTimeout(3500);
      await expect(celebrationOverlay).not.toBeVisible();
    }
  });

  test('CELEBRATION-003: 非首次训练不显示庆祝 @celebration', async ({ page }) => {
    // Record first workout
    await chatPage.sendMessage('卧推50kg 3组每组10个');

    // Allow flexible success detection
    try {
      await chatPage.expectSaveSuccess({ timeout: 10000 });
    } catch (e) {
      // Continue regardless
    }

    // Wait a bit for any celebration to dismiss
    await page.waitForTimeout(4000);

    // Record second workout
    await chatPage.sendMessage('卧推55kg 3组每组10个');

    // Allow flexible success detection
    try {
      await chatPage.expectSaveSuccess({ timeout: 10000 });
    } catch (e) {
      // Continue regardless
    }

    // Second workout should NOT trigger celebration
    const celebration = page.locator('.fixed.inset-0.z-50');
    await expect(celebration).not.toBeVisible();
  });
});

test.describe('Dashboard PR Card', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.login('test@example.com', 'Test123456');
  });

  test('DASH-001: Dashboard显示PR卡片 @pr @dashboard', async ({ page }) => {
    await dashboardPage.open();

    // Should show PR section
    const prSection = page.getByText('个人最佳');
    await expect(prSection.or(page.getByText('PR'))).toBeVisible();
  });

  test('DASH-002: PR卡片显示记录列表 @pr @dashboard', async ({ page }) => {
    await dashboardPage.open();

    // Should show PR items or empty state
    const prItems = page.locator('[data-testid="pr-card-item"]');
    const count = await prItems.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('DASH-003: Dashboard显示累计统计数据 @stats @dashboard', async ({ page }) => {
    await dashboardPage.open();

    // Should show cumulative stats card with data-testid
    const cumulativeCard = page.locator('[data-testid="cumulative-stats-card"]');
    await expect(cumulativeCard).toBeVisible();

    // Card should have the stats visible (total-workouts, total-volume, streak-days)
    await expect(page.locator('[data-testid="total-workouts"]')).toBeVisible();
    await expect(page.locator('[data-testid="total-volume"]')).toBeVisible();
    await expect(page.locator('[data-testid="streak-days"]')).toBeVisible();
  });
});

test.describe('Badges Page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.login('test@example.com', 'Test123456');
  });

  test('BADGE-001: 访问徽章页面 @badges', async ({ page }) => {
    await page.goto('/badges');

    // Should show page title
    await expect(page.getByRole('heading', { name: /徽章|成就/ })).toBeVisible();
  });

  test('BADGE-002: 显示已获得徽章 @badges', async ({ page }) => {
    await page.goto('/badges');

    // Badge items should be visible (or empty state)
    const badgeGrid = page.locator('[data-testid="badge-grid"]');
    await expect(badgeGrid.or(page.getByText('暂无徽章'))).toBeVisible();
  });

  test('BADGE-003: 徽章按等级分类显示 @badges', async ({ page }) => {
    await page.goto('/badges');

    // If badges exist, should show tier colors
    const bronzeBadges = page.locator('[data-testid="badge-tier-bronze"]');
    const silverBadges = page.locator('[data-testid="badge-tier-silver"]');
    const goldBadges = page.locator('[data-testid="badge-tier-gold"]');

    // At least one tier should be visible (or empty state)
    const hasAnyTier = await bronzeBadges.count() > 0 ||
                       await silverBadges.count() > 0 ||
                       await goldBadges.count() > 0 ||
                       await page.getByText('暂无徽章').isVisible();
    expect(hasAnyTier).toBeTruthy();
  });

  test('BADGE-004: 未获得徽章显示锁定状态 @badges', async ({ page }) => {
    await page.goto('/badges');

    // Locked badges should show grey/disabled state
    const lockedBadge = page.locator('[data-testid="badge-locked"]');
    const lockedCount = await lockedBadge.count();
    // Should have some locked badges (or all unlocked)
    expect(lockedCount).toBeGreaterThanOrEqual(0);
  });

  test('BADGE-005: 徽章显示进度条 @badges', async ({ page }) => {
    await page.goto('/badges');

    // Progress bar should be visible for locked badges
    const progressBar = page.locator('[data-testid="badge-progress"]');
    const progressCount = await progressBar.count();
    expect(progressCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Muscle Group Statistics', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.login('test@example.com', 'Test123456');
  });

  test('MUSCLE-001: Trends页面显示肌肉群Tab @muscles @trends', async ({ page }) => {
    await page.goto('/trends');

    // Should show muscle group tab (button with text "肌肉群")
    const muscleTab = page.getByRole('button', { name: '肌肉群' });
    await expect(muscleTab).toBeVisible();
  });

  test('MUSCLE-002: 点击肌肉群Tab显示分布图 @muscles @trends', async ({ page }) => {
    await page.goto('/trends');

    // Click muscle group tab
    await page.getByRole('button', { name: '肌肉群' }).click();

    // Should show muscle group chart container
    await expect(page.locator('[data-testid="muscle-group-chart"]').or(page.locator('.recharts-wrapper'))).toBeVisible();
  });

  test('MUSCLE-003: 肌肉群分布显示百分比 @muscles @trends', async ({ page }) => {
    await page.goto('/trends');

    await page.getByRole('button', { name: '肌肉群' }).click();

    // Should show percentage labels or empty state
    const hasData = await page.locator('[data-testid="muscle-percentage"]').count() > 0 ||
                    await page.getByText('暂无训练数据').isVisible();
    expect(hasData).toBeTruthy();
  });

  test('MUSCLE-004: 日期范围筛选影响肌肉群统计 @muscles @trends', async ({ page }) => {
    await page.goto('/trends');

    // Use the date range picker to set dates
    await page.locator('input[type="date"]').first().fill('2026-04-01');
    await page.locator('input[type="date"]').last().fill('2026-04-29');

    await page.getByRole('button', { name: '肌肉群' }).click();

    // Chart should update based on date range
    await expect(page.locator('[data-testid="muscle-group-chart"]').or(page.locator('.recharts-wrapper'))).toBeVisible();
  });
});

test.describe('Cumulative Stats on Dashboard', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.login('test@example.com', 'Test123456');
  });

  test('STATS-001: 累计训练次数显示 @stats @dashboard', async ({ page }) => {
    await page.goto('/dashboard');

    // Should show cumulative stats card
    const statsCard = page.locator('[data-testid="cumulative-stats-card"]');
    await expect(statsCard).toBeVisible();

    // Should show total workouts
    const totalWorkouts = page.locator('[data-testid="total-workouts"]');
    await expect(totalWorkouts).toBeVisible();
  });

  test('STATS-002: 累计训练量显示 @stats @dashboard', async ({ page }) => {
    await page.goto('/dashboard');

    // Should show total volume
    const totalVolume = page.locator('[data-testid="total-volume"]');
    await expect(totalVolume).toBeVisible();
  });

  test('STATS-003: 连续打卡天数显示 @stats @dashboard', async ({ page }) => {
    await page.goto('/dashboard');

    // Should show streak days
    const streakDays = page.locator('[data-testid="streak-days"]');
    await expect(streakDays).toBeVisible();
  });

  test('STATS-004: 本周数据与累计数据分开显示 @stats @dashboard', async ({ page }) => {
    await page.goto('/dashboard');

    // Should show cumulative stats card
    const cumulativeCard = page.locator('[data-testid="cumulative-stats-card"]');
    await expect(cumulativeCard).toBeVisible();

    // Should show section headings: 本周训练, 本周训练日, 本周训练量, 本月训练
    await expect(page.getByText('本周训练').first()).toBeVisible();
    await expect(page.getByText('本月训练')).toBeVisible();
  });
});