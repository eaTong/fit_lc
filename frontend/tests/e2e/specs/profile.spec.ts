import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { ProfilePage } from '../page-objects/HistoryPage';

test.describe('User Profile', () => {
  let loginPage: LoginPage;
  let profilePage: ProfilePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    profilePage = new ProfilePage(page);
    await loginPage.login('test@example.com', 'Test123456');
  });

  test('PROF-001: 查看个人信息 @profile', async ({ page }) => {
    await profilePage.open();

    // Should show user email
    await expect(page.getByText('test@example.com')).toBeVisible();
  });

  test('PROF-002: 查看训练统计 @profile', async ({ page }) => {
    await profilePage.open();

    // Should show workout statistics
    await expect(page.getByText(/训练次数|总训练/)).toBeVisible();
  });

  test('PROF-003: 查看围度统计 @profile', async ({ page }) => {
    await profilePage.open();

    // Should show measurement statistics
    await expect(page.getByText(/围度记录|测量次数/)).toBeVisible();
  });

  test('PROF-004: 修改密码-成功 @profile', async ({ page }) => {
    await profilePage.open();

    // Change password
    await profilePage.changePassword('Test123456', 'NewTest123456');

    // Should show success message
    await expect(page.getByText(/修改成功|密码已更新/)).toBeVisible();
  });

  test('PROF-005: 修改密码-失败(密码不匹配) @profile', async ({ page }) => {
    await profilePage.open();

    // Click change password
    await profilePage.clickButton('修改密码');

    // Fill with mismatched passwords
    await profilePage.fillInput('当前密码', 'Test123456');
    await profilePage.fillInput('新密码', 'NewTest123456');
    await profilePage.fillInput('确认密码', 'DifferentPass123');
    await profilePage.clickButton('确认');

    // Should show error
    await expect(page.getByText(/密码不匹配|确认密码/)).toBeVisible();
  });

  test('PROF-006: 退出登录 @profile', async ({ page }) => {
    await profilePage.open();

    // Switch to security tab first (logout button is there)
    await profilePage.switchToSecurityTab();

    // Click logout button
    await profilePage.clickButton('退出登录');

    // Should redirect to login page
    await expect(page).toHaveURL(/\/login/);
  });
});