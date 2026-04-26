import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ChatPage extends BasePage {
  constructor(page: Page) {
    super(page, '/chat');
  }

  async sendMessage(content: string): Promise<void> {
    await this.page.getByPlaceholder('输入健身记录或问题...').fill(content);
    await this.page.getByRole('button', { name: '发送' }).click();
  }

  async getLastAssistantMessage(): Promise<string> {
    const messages = this.page.locator('[data-testid="message-assistant"]');
    const lastMessage = messages.last();
    return lastMessage.textContent() || '';
  }

  async clickUndo(): Promise<void> {
    await this.page.getByText('撤销').click();
  }

  async expectSaveSuccess(): Promise<void> {
    await this.page.getByText('已保存').waitFor({ state: 'visible' });
  }

  async expectMessageContains(text: string): Promise<void> {
    await this.page.getByText(text).last().waitFor({ state: 'visible' });
  }
}