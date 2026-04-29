import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TriggerPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.page.goto('/triggers');
  }

  async getTriggerHistory() {
    return this.page.locator('[data-testid="trigger-item"]').all();
  }

  async deleteTrigger(id: number) {
    await this.page.locator(`[data-testid="trigger-delete-${id}"]`).click();
  }
}
