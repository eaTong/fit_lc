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

  // 保存成功关键词 - 按优先级排序
  readonly SAVED_KEYWORDS = ['已保存', '已记录', '保存成功', '✅'];

  async navigateToChat(): Promise<void> {
    await this.navigate('/chat');
  }

  async sendMessage(message: string): Promise<void> {
    await this.typeMessage(message);
    await this.submitMessage();
  }

  async typeMessage(message: string): Promise<void> {
    console.log('Typing message:', message);
    await this.fill(this.SELECTORS.messageInput, message);
    const inputValue = await this.page.locator(this.SELECTORS.messageInput).inputValue();
    console.log('Input value after typing:', inputValue);
  }

  async submitMessage(): Promise<void> {
    await this.click(this.SELECTORS.sendButton);
    // 等待一下让消息发送
    await this.page.waitForTimeout(500);
  }

  async getLastUserMessage(): Promise<string> {
    const messages = await this.page.locator(this.SELECTORS.userMessage).all();
    if (messages.length === 0) return '';
    return messages[messages.length - 1].textContent() ?? '';
  }

  async getLastAssistantMessage(): Promise<string> {
    // Use evaluate for reliable text content retrieval from the DOM
    return this.page.evaluate(() => {
      const msgs = document.querySelectorAll('.flex.justify-start.mb-4');
      if (msgs.length === 0) return '';
      const lastMsg = msgs[msgs.length - 1];
      const p = lastMsg?.querySelector('.whitespace-pre-wrap');
      return p?.textContent ?? '';
    });
  }

  async getAllMessages(): Promise<{ role: string; content: string }[]> {
    return this.page.evaluate(() => {
      const userMsgs = document.querySelectorAll('.flex.justify-end .whitespace-pre-wrap');
      const assistantMsgs = document.querySelectorAll('.flex.justify-start .whitespace-pre-wrap');

      const result: { role: string; content: string }[] = [];
      const maxLen = Math.max(userMsgs.length, assistantMsgs.length);
      for (let i = 0; i < maxLen; i++) {
        if (i < assistantMsgs.length) {
          result.push({ role: 'assistant', content: assistantMsgs[i]?.textContent ?? '' });
        }
        if (i < userMsgs.length) {
          result.push({ role: 'user', content: userMsgs[i]?.textContent ?? '' });
        }
      }
      return result;
    });
  }

  async hasSavedDataIndicator(): Promise<boolean> {
    return this.isVisible(this.SELECTORS.savedIndicator);
  }

  async waitForSaveConfirmation(timeout: number = 30000): Promise<boolean> {
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      const message = await this.getLastAssistantMessage();
      if (message && this.SAVED_KEYWORDS.some(keyword => message.includes(keyword))) {
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