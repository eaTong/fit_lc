import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page, '/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.open();
    // 使用 placeholder 而非 label（Input 组件的 placeholder 属性）
    await this.page.getByPlaceholder('your@email.com').fill(email);
    await this.page.getByPlaceholder('••••••••').fill(password);
    await this.page.getByRole('button', { name: '登录' }).click();
    // Wait for navigation after login (skip if already on chat page)
    await this.page.waitForURL(/\/(chat|register)/, { timeout: 10000 }).catch(() => {});
  }

  async goToRegister(): Promise<void> {
    await this.page.getByText('注册').click();
  }
}

export class RegisterPage extends BasePage {
  constructor(page: Page) {
    super(page, '/register');
  }

  async register(email: string, password: string): Promise<void> {
    await this.open();
    await this.page.getByPlaceholder('your@email.com').fill(email);
    await this.page.getByPlaceholder('至少6位').fill(password);
    await this.page.getByPlaceholder('再次输入密码').fill(password);
    await this.page.getByRole('button', { name: '注册' }).click();
  }
}