# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: specs/records.spec.ts >> History Records >> REC-002: 查看围度历史 @records
- Location: tests/e2e/specs/records.spec.ts:26:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('tab', { name: '围度' })

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
  1  | import { Page } from '@playwright/test';
  2  | import { BasePage } from './BasePage';
  3  | 
  4  | export class HistoryPage extends BasePage {
  5  |   private workoutTab = this.page.getByRole('tab', { name: '训练' });
  6  |   private measurementTab = this.page.getByRole('tab', { name: '围度' });
  7  | 
  8  |   constructor(page: Page) {
  9  |     super(page, '/history');
  10 |   }
  11 | 
  12 |   async switchToWorkoutTab(): Promise<void> {
  13 |     await this.workoutTab.click();
  14 |   }
  15 | 
  16 |   async switchToMeasurementTab(): Promise<void> {
> 17 |     await this.measurementTab.click();
     |                               ^ Error: locator.click: Test timeout of 30000ms exceeded.
  18 |   }
  19 | 
  20 |   async deleteFirstRecord(): Promise<void> {
  21 |     await this.page.locator('[data-testid="delete-button"]').first().click();
  22 |   }
  23 | 
  24 |   async restoreFirstRecord(): Promise<void> {
  25 |     await this.page.locator('[data-testid="restore-button"]').first().click();
  26 |   }
  27 | }
  28 | 
  29 | export class TrendsPage extends BasePage {
  30 |   constructor(page: Page) {
  31 |     super(page, '/trends');
  32 |   }
  33 | 
  34 |   async selectTimeRange(range: string): Promise<void> {
  35 |     await this.page.getByRole('button', { name: range }).click();
  36 |   }
  37 | 
  38 |   async switchToTrainingStats(): Promise<void> {
  39 |     await this.page.getByRole('tab', { name: '训练统计' }).click();
  40 |   }
  41 | 
  42 |   async getChartCanvas(): Promise<Locator> {
  43 |     return this.page.locator('canvas').or(this.page.locator('[data-testid="chart"]'));
  44 |   }
  45 | }
  46 | 
  47 | export class ProfilePage extends BasePage {
  48 |   constructor(page: Page) {
  49 |     super(page, '/profile');
  50 |   }
  51 | 
  52 |   async changePassword(currentPassword: string, newPassword: string): Promise<void> {
  53 |     await this.clickButton('修改密码');
  54 |     await this.fillInput('当前密码', currentPassword);
  55 |     await this.fillInput('新密码', newPassword);
  56 |     await this.fillInput('确认密码', newPassword);
  57 |     await this.clickButton('确认');
  58 |   }
  59 | }
```