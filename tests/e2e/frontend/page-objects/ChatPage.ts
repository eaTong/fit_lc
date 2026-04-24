import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ChatPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly SELECTORS = {
    messageInput: 'input[type="text"]',
    sendButton: 'button[type="submit"]',
    userMessage: '.flex.justify-end .whitespace-pre-wrap',
    assistantMessage: '.flex.justify-start .whitespace-pre-wrap',
    emptyState: '.text-text-secondary',
    savedIndicator: '.text-accent-orange:has-text("撤销")',
  };

  // 保存成功关键词
  readonly SAVED_KEYWORDS = ['已保存：', '已记录：', '保存成功', '✅'];

  async navigateToChat(): Promise<void> {
    await this.navigate('/chat');
  }

  async sendMessage(message: string): Promise<void> {
    await this.typeMessage(message);
    await this.submitMessage();
  }

  async typeMessage(message: string): Promise<void> {
    await this.fill(this.SELECTORS.messageInput, message);
  }

  async submitMessage(): Promise<void> {
    await this.click(this.SELECTORS.sendButton);
    // 等待消息发送（按钮恢复可点击状态）
    await this.page.waitForFunction(
      () => !document.querySelector('button[type="submit"]')?.getAttribute('disabled'),
      { timeout: 10000 }
    ).catch(() => {}); // 忽略超时，继续执行
  }

  async getLastUserMessage(): Promise<string> {
    const messages = await this.page.locator(this.SELECTORS.userMessage).all();
    if (messages.length === 0) return '';
    return messages[messages.length - 1].textContent() ?? '';
  }

  async getLastAssistantMessage(): Promise<string> {
    const messages = await this.page.locator(this.SELECTORS.assistantMessage).all();
    if (messages.length === 0) return '';
    return messages[messages.length - 1].textContent() ?? '';
  }

  async getAllMessages(): Promise<{ role: string; content: string }[]> {
    const userMessages = await this.page.locator(this.SELECTORS.userMessage).allTextContents();
    const assistantMessages = await this.page.locator(this.SELECTORS.assistantMessage).allTextContents();

    const result: { role: string; content: string }[] = [];
    for (let i = 0; i < Math.max(userMessages.length, assistantMessages.length); i++) {
      if (i < assistantMessages.length) {
        result.push({ role: 'assistant', content: assistantMessages[i] });
      }
      if (i < userMessages.length) {
        result.push({ role: 'user', content: userMessages[i] });
      }
    }
    return result;
  }

  async hasSavedDataIndicator(): Promise<boolean> {
    return this.isVisible(this.SELECTORS.savedIndicator);
  }

  async waitForSaveConfirmation(timeout: number = 30000): Promise<boolean> {
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      const message = await this.getLastAssistantMessage();
      if (this.SAVED_KEYWORDS.some(keyword => message.includes(keyword))) {
        return true;
      }
      // 等待一小段时间后重试
      await this.page.waitForTimeout(1000);
    }
    return false;
  }

  async getSaveConfirmationText(): Promise<string | null> {
    const message = await this.getLastAssistantMessage();
    for (const keyword of this.SAVED_KEYWORDS) {
      if (message.includes(keyword)) {
        return message;
      }
    }
    return null;
  }

  async getLastAssistantMessageIncludes(keyword: string): Promise<boolean> {
    const message = await this.getLastAssistantMessage();
    return message.includes(keyword);
  }

  async isLoading(): Promise<boolean> {
    return this.isDisabled(this.SELECTORS.sendButton);
  }

  async isInputEnabled(): Promise<boolean> {
    return !(await this.isDisabled(this.SELECTORS.messageInput));
  }

  async getEmptyStateText(): Promise<string | null> {
    const emptyState = this.page.locator(this.SELECTORS.emptyState);
    if (await emptyState.isVisible()) {
      return emptyState.textContent();
    }
    return null;
  }
}