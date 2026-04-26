import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;
  protected pagePath?: string;

  constructor(page: Page, pagePath?: string) {
    this.page = page;
    this.pagePath = pagePath;
  }

  async open(path?: string): Promise<void> {
    await this.page.goto(path || this.pagePath || '/');
    await this.page.waitForLoadState('networkidle');
  }

  async clickButton(name: string): Promise<void> {
    await this.page.getByRole('button', { name }).click();
  }

  async fillInput(label: string, value: string): Promise<void> {
    await this.page.getByLabel(label).fill(value);
  }

  async selectOption(label: string, value: string): Promise<void> {
    await this.page.getByLabel(label).selectOption(value);
  }

  async waitForText(text: string, timeout: number = 5000): Promise<void> {
    await expect(this.page.getByText(text)).toBeVisible({ timeout });
  }

  async isVisible(selector: string): Promise<boolean> {
    return this.page.locator(selector).isVisible();
  }
}