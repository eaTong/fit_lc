# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: specs/chat.spec.ts >> AI Chat >> CHAT-006: 撤销训练记录 @chat
- Location: tests/e2e/specs/chat.spec.ts:61:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByPlaceholder('输入健身记录或问题...')

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
  4  | export class ChatPage extends BasePage {
  5  |   constructor(page: Page) {
  6  |     super(page, '/chat');
  7  |   }
  8  | 
  9  |   async sendMessage(content: string): Promise<void> {
> 10 |     await this.page.getByPlaceholder('输入健身记录或问题...').fill(content);
     |                                                      ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  11 |     await this.page.getByRole('button', { name: '发送' }).click();
  12 |   }
  13 | 
  14 |   async getLastAssistantMessage(): Promise<string> {
  15 |     const messages = this.page.locator('[data-testid="message-assistant"]');
  16 |     const lastMessage = messages.last();
  17 |     return lastMessage.textContent() || '';
  18 |   }
  19 | 
  20 |   async clickUndo(): Promise<void> {
  21 |     await this.page.getByText('撤销').click();
  22 |   }
  23 | 
  24 |   async expectSaveSuccess(): Promise<void> {
  25 |     await this.page.getByText('已保存').waitFor({ state: 'visible' });
  26 |   }
  27 | 
  28 |   async expectMessageContains(text: string): Promise<void> {
  29 |     await this.page.getByText(text).last().waitFor({ state: 'visible' });
  30 |   }
  31 | }
```