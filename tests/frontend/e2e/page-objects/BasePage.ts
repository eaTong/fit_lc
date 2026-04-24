import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;
  protected baseURL = 'http://localhost:5173';

  constructor(page: Page) {
    this.page = page;
  }

  protected readonly SELECTORS = {
    emailInput: 'input[type="email"]',
    passwordInput: 'input[type="password"]',
    submitButton: 'button[type="submit"]',
    errorMessage: '.text-accent-red',
    loadingButton: 'button:disabled[type="submit"]',
  };

  async navigate(path: string): Promise<void> {
    await this.page.goto(new URL(path, this.baseURL).toString());
  }

  async waitForSelector(selector: string): Promise<Locator> {
    return this.page.locator(selector).first();
  }

  async click(selector: string): Promise<void> {
    await this.page.locator(selector).first().click();
  }

  async fill(selector: string, value: string): Promise<void> {
    await this.page.locator(selector).first().fill(value);
  }

  async getText(selector: string): Promise<string> {
    return this.page.locator(selector).first().textContent() ?? '';
  }

  async isVisible(selector: string): Promise<boolean> {
    return this.page.locator(selector).first().isVisible();
  }

  async isDisabled(selector: string): Promise<boolean> {
    return this.page.locator(selector).first().isDisabled();
  }

  async waitForNavigation(action: () => Promise<void>): Promise<void> {
    await Promise.all([
      this.page.waitForURL('**'),
      action(),
    ]);
  }
}