import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly SELECTORS = {
    ...this.SELECTORS,
    registerLink: '.text-accent-orange:has-text("注册")',
    loginLink: '.text-accent-orange:has-text("登录")',
    confirmPasswordInput: 'input[type="password"]',
  };

  async navigateToLogin(): Promise<void> {
    await this.navigate('/login');
  }

  async navigateToRegister(): Promise<void> {
    await this.navigate('/register');
  }

  async register(email: string, password: string): Promise<void> {
    await this.navigateToRegister();
    await this.fillRegisterForm(email, password, password);
    await this.submitRegister();
  }

  async fillRegisterForm(email: string, password: string, confirmPassword: string): Promise<void> {
    await this.fill(this.SELECTORS.emailInput, email);
    await this.fill(this.SELECTORS.passwordInput, password);
    await this.page.locator(this.SELECTORS.confirmPasswordInput).nth(1).fill(confirmPassword);
  }

  async submitRegister(): Promise<void> {
    await this.click(this.SELECTORS.submitButton);
    // 等待导航到 Chat 页面
    await this.page.waitForURL('**/chat', { timeout: 10000 });
  }

  async login(email: string, password: string): Promise<void> {
    await this.navigateToLogin();
    await this.fillLoginForm(email, password);
    await this.submitLogin();
  }

  async fillLoginForm(email: string, password: string): Promise<void> {
    await this.fill(this.SELECTORS.emailInput, email);
    await this.fill(this.SELECTORS.passwordInput, password);
  }

  async submitLogin(): Promise<void> {
    await this.click(this.SELECTORS.submitButton);
    await this.page.waitForURL('**/chat', { timeout: 10000 });
  }

  async isLoggedIn(): Promise<boolean> {
    return this.page.url().includes('/chat');
  }

  async getErrorMessage(): Promise<string | null> {
    const errorLocator = this.page.locator(this.SELECTORS.errorMessage);
    if (await errorLocator.isVisible()) {
      return errorLocator.textContent();
    }
    return null;
  }

  async hasValidationError(): Promise<boolean> {
    return this.isVisible(this.SELECTORS.errorMessage);
  }
}