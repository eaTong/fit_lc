import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HistoryPage extends BasePage {
  private workoutTab = this.page.getByRole('tab', { name: '训练' });
  private measurementTab = this.page.getByRole('tab', { name: '围度' });

  constructor(page: Page) {
    super(page, '/history');
  }

  async switchToWorkoutTab(): Promise<void> {
    await this.workoutTab.click();
  }

  async switchToMeasurementTab(): Promise<void> {
    await this.measurementTab.click();
  }

  async deleteFirstRecord(): Promise<void> {
    await this.page.locator('[data-testid="delete-button"]').first().click();
  }

  async restoreFirstRecord(): Promise<void> {
    await this.page.locator('[data-testid="restore-button"]').first().click();
  }
}

export class TrendsPage extends BasePage {
  constructor(page: Page) {
    super(page, '/trends');
  }

  async selectTimeRange(range: string): Promise<void> {
    await this.page.getByRole('button', { name: range }).click();
  }

  async switchToTrainingStats(): Promise<void> {
    await this.page.getByRole('tab', { name: '训练统计' }).click();
  }

  async getChartCanvas(): Promise<Locator> {
    return this.page.locator('canvas').or(this.page.locator('[data-testid="chart"]'));
  }
}

export class ProfilePage extends BasePage {
  constructor(page: Page) {
    super(page, '/profile');
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await this.clickButton('修改密码');
    await this.fillInput('当前密码', currentPassword);
    await this.fillInput('新密码', newPassword);
    await this.fillInput('确认密码', newPassword);
    await this.clickButton('确认');
  }
}