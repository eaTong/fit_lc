import { test, expect } from '@playwright/test';
import { LoginPage, RegisterPage } from '../page-objects/LoginPage';

test.describe('Authentication', () => {
  let loginPage: LoginPage;
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);
  });

  test('AUTH-001: 用户注册 @auth', async ({ page }) => {
    await registerPage.register(`test${Date.now()}@example.com`, 'Test123456');

    // Should redirect to chat page after successful registration
    await expect(page).toHaveURL(/\/chat/);
    await expect(page.getByText('欢迎')).toBeVisible();
  });

  test('AUTH-002: 用户登录 @auth', async ({ page }) => {
    // Use a pre-seeded test account
    await loginPage.login('test@example.com', 'Test123456');

    // Should redirect to chat page after successful login
    await expect(page).toHaveURL(/\/chat/);
  });

  test('AUTH-003: 登录失败-错误密码 @auth', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();

    await loginPage.login('test@example.com', 'WrongPassword');

    // Should show error message
    await expect(page.getByText('无效的凭据')).toBeVisible();
    // Should stay on login page
    await expect(page).toHaveURL(/\/login/);
  });

  test('AUTH-004: 登录失败-未注册用户 @auth', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();

    await loginPage.login('nonexistent@example.com', 'SomePassword');

    // Should show error message (same message for security - don't reveal if user exists)
    await expect(page.getByText('无效的凭据')).toBeVisible();
  });

  test('AUTH-005: 退出登录 @auth', async ({ page }) => {
    // First login
    await loginPage.login('test@example.com', 'Test123456');
    await expect(page).toHaveURL(/\/chat/);

    // Click logout
    await page.getByRole('button', { name: '退出' }).click();

    // Should redirect to login page
    await expect(page).toHaveURL(/\/login/);
  });
});