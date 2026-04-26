# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: specs/profile.spec.ts >> User Profile >> PROF-005: 修改密码-失败(密码不匹配) @profile
- Location: tests/e2e/specs/profile.spec.ts:46:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: '修改密码' })

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
  1  | import { Page, Locator, expect } from '@playwright/test';
  2  | 
  3  | export class BasePage {
  4  |   protected page: Page;
  5  |   protected pagePath?: string;
  6  | 
  7  |   constructor(page: Page, pagePath?: string) {
  8  |     this.page = page;
  9  |     this.pagePath = pagePath;
  10 |   }
  11 | 
  12 |   async open(path?: string): Promise<void> {
  13 |     await this.page.goto(path || this.pagePath || '/');
  14 |     await this.page.waitForLoadState('networkidle');
  15 |   }
  16 | 
  17 |   async clickButton(name: string): Promise<void> {
> 18 |     await this.page.getByRole('button', { name }).click();
     |                                                   ^ Error: locator.click: Test timeout of 30000ms exceeded.
  19 |   }
  20 | 
  21 |   async fillInput(label: string, value: string): Promise<void> {
  22 |     await this.page.getByLabel(label).fill(value);
  23 |   }
  24 | 
  25 |   async selectOption(label: string, value: string): Promise<void> {
  26 |     await this.page.getByLabel(label).selectOption(value);
  27 |   }
  28 | 
  29 |   async waitForText(text: string, timeout: number = 5000): Promise<void> {
  30 |     await expect(this.page.getByText(text)).toBeVisible({ timeout });
  31 |   }
  32 | 
  33 |   async isVisible(selector: string): Promise<boolean> {
  34 |     return this.page.locator(selector).isVisible();
  35 |   }
  36 | }
```