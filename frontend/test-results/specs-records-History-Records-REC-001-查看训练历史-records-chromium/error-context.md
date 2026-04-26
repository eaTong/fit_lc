# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: specs/records.spec.ts >> History Records >> REC-001: 查看训练历史 @records
- Location: tests/e2e/specs/records.spec.ts:15:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('训练')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('训练')

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
  3  | import { HistoryPage } from '../page-objects/HistoryPage';
  4  | 
  5  | test.describe('History Records', () => {
  6  |   let loginPage: LoginPage;
  7  |   let historyPage: HistoryPage;
  8  | 
  9  |   test.beforeEach(async ({ page }) => {
  10 |     loginPage = new LoginPage(page);
  11 |     historyPage = new HistoryPage(page);
  12 |     await loginPage.login('test@example.com', 'Test123456');
  13 |   });
  14 | 
  15 |   test('REC-001: 查看训练历史 @records', async ({ page }) => {
  16 |     await historyPage.open();
  17 | 
  18 |     // Should have tabs for workout and measurement
> 19 |     await expect(page.getByText('训练')).toBeVisible();
     |                                        ^ Error: expect(locator).toBeVisible() failed
  20 |     await expect(page.getByText('围度')).toBeVisible();
  21 | 
  22 |     // Workout tab should be active by default
  23 |     await expect(page.getByRole('tab', { name: '训练' })).toHaveAttribute('aria-selected', 'true');
  24 |   });
  25 | 
  26 |   test('REC-002: 查看围度历史 @records', async ({ page }) => {
  27 |     await historyPage.open();
  28 | 
  29 |     // Click measurement tab
  30 |     await historyPage.switchToMeasurementTab();
  31 | 
  32 |     // Should show measurement list
  33 |     await expect(page.getByText('围度')).toBeVisible();
  34 |   });
  35 | 
  36 |   test('REC-003: 删除训练记录 @records', async ({ page }) => {
  37 |     await historyPage.open();
  38 | 
  39 |     // Find first workout record
  40 |     const firstRecord = page.locator('[data-testid="workout-record"]').first();
  41 | 
  42 |     if (await firstRecord.isVisible()) {
  43 |       // Click delete button
  44 |       await historyPage.deleteFirstRecord();
  45 | 
  46 |       // Should show confirmation dialog or toast
  47 |       await expect(page.getByText(/确认删除|删除成功/)).toBeVisible();
  48 |     }
  49 |   });
  50 | 
  51 |   test('REC-004: 恢复训练记录 @records', async ({ page }) => {
  52 |     await historyPage.open();
  53 | 
  54 |     // Look for deleted/recoverable records
  55 |     const recoverButton = page.getByText('恢复').first();
  56 | 
  57 |     if (await recoverButton.isVisible()) {
  58 |       await historyPage.restoreFirstRecord();
  59 | 
  60 |       // Should show recovery confirmation
  61 |       await expect(page.getByText(/恢复成功|已恢复/)).toBeVisible();
  62 |     }
  63 |   });
  64 | });
```