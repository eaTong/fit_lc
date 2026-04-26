import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('Muscle Library', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.login('test@example.com', 'Test123456');
  });

  test('MUSC-001: 查看肌肉层级结构 @muscles', async ({ page }) => {
    await page.goto('/muscles');

    // Should show muscle group hierarchy
    await expect(page.getByText('胸部')).toBeVisible();
    await expect(page.getByText('背部')).toBeVisible();
    await expect(page.getByText('腿部')).toBeVisible();
  });

  test('MUSC-002: 展开肌肉子节点 @muscles', async ({ page }) => {
    await page.goto('/muscles');

    // Click to expand chest group
    await page.getByText('胸部').click();

    // Should show child muscles
    await expect(page.getByText('胸大肌')).toBeVisible();
    await expect(page.getByText('胸小肌')).toBeVisible();
  });

  test('MUSC-003: 查看肌肉详情 @muscles', async ({ page }) => {
    await page.goto('/muscles');

    // Click on a specific muscle
    await page.getByText('胸大肌').click();

    // Should show muscle details (origin, insertion, function)
    await expect(page.getByText(/起点|止点|功能/)).toBeVisible({ timeout: 5000 });
  });

  test('MUSC-004: 查看肌肉关联动作 @muscles', async ({ page }) => {
    await page.goto('/muscles');

    // Expand and click on a muscle
    await page.getByText('胸部').click();
    await page.getByText('胸大肌').click();

    // Should show related exercises
    await expect(page.getByText(/相关动作|训练动作/)).toBeVisible({ timeout: 5000 });
  });

  test('MUSC-005: 折叠肌肉组 @muscles', async ({ page }) => {
    await page.goto('/muscles');

    // Expand chest first
    await page.getByText('胸部').click();
    await expect(page.getByText('胸大肌')).toBeVisible();

    // Collapse chest
    await page.getByText('胸部').click();

    // Child muscles should be hidden
    await expect(page.getByText('胸大肌')).not.toBeVisible();
  });
});