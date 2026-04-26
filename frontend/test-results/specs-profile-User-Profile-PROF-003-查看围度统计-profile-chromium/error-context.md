# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: specs/profile.spec.ts >> User Profile >> PROF-003: 查看围度统计 @profile
- Location: tests/e2e/specs/profile.spec.ts:29:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/围度记录|测量次数/)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/围度记录|测量次数/)

```

# Page snapshot

```yaml
- generic [ref=e5]:
  - heading "FITLC" [level=1] [ref=e6]
  - generic [ref=e7]:
    - generic [ref=e8]:
      - generic [ref=e9]: 邮箱
      - textbox "your@email.com" [ref=e10]
    - generic [ref=e11]:
      - generic [ref=e12]: 密码
      - textbox "••••••••" [ref=e13]
    - button "登录" [ref=e14] [cursor=pointer]
  - paragraph [ref=e15]:
    - text: 还没有账户？
    - link "注册" [ref=e16] [cursor=pointer]:
      - /url: /register
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { LoginPage } from '../page-objects/LoginPage';
  3  | import { ProfilePage } from '../page-objects/HistoryPage';
  4  | 
  5  | test.describe('User Profile', () => {
  6  |   let loginPage: LoginPage;
  7  |   let profilePage: ProfilePage;
  8  | 
  9  |   test.beforeEach(async ({ page }) => {
  10 |     loginPage = new LoginPage(page);
  11 |     profilePage = new ProfilePage(page);
  12 |     await loginPage.login('test@example.com', 'Test123456');
  13 |   });
  14 | 
  15 |   test('PROF-001: 查看个人信息 @profile', async ({ page }) => {
  16 |     await profilePage.open();
  17 | 
  18 |     // Should show user email
  19 |     await expect(page.getByText('test@example.com')).toBeVisible();
  20 |   });
  21 | 
  22 |   test('PROF-002: 查看训练统计 @profile', async ({ page }) => {
  23 |     await profilePage.open();
  24 | 
  25 |     // Should show workout statistics
  26 |     await expect(page.getByText(/训练次数|总训练/)).toBeVisible();
  27 |   });
  28 | 
  29 |   test('PROF-003: 查看围度统计 @profile', async ({ page }) => {
  30 |     await profilePage.open();
  31 | 
  32 |     // Should show measurement statistics
> 33 |     await expect(page.getByText(/围度记录|测量次数/)).toBeVisible();
     |                                               ^ Error: expect(locator).toBeVisible() failed
  34 |   });
  35 | 
  36 |   test('PROF-004: 修改密码-成功 @profile', async ({ page }) => {
  37 |     await profilePage.open();
  38 | 
  39 |     // Change password
  40 |     await profilePage.changePassword('Test123456', 'NewTest123456');
  41 | 
  42 |     // Should show success message
  43 |     await expect(page.getByText(/修改成功|密码已更新/)).toBeVisible();
  44 |   });
  45 | 
  46 |   test('PROF-005: 修改密码-失败(密码不匹配) @profile', async ({ page }) => {
  47 |     await profilePage.open();
  48 | 
  49 |     // Click change password
  50 |     await profilePage.clickButton('修改密码');
  51 | 
  52 |     // Fill with mismatched passwords
  53 |     await profilePage.fillInput('当前密码', 'Test123456');
  54 |     await profilePage.fillInput('新密码', 'NewTest123456');
  55 |     await profilePage.fillInput('确认密码', 'DifferentPass123');
  56 |     await profilePage.clickButton('确认');
  57 | 
  58 |     // Should show error
  59 |     await expect(page.getByText(/密码不匹配|确认密码/)).toBeVisible();
  60 |   });
  61 | 
  62 |   test('PROF-006: 退出登录 @profile', async ({ page }) => {
  63 |     await profilePage.open();
  64 | 
  65 |     // Click logout button
  66 |     await profilePage.clickButton('退出登录');
  67 | 
  68 |     // Should redirect to login page
  69 |     await expect(page).toHaveURL(/\/login/);
  70 |   });
  71 | });
```