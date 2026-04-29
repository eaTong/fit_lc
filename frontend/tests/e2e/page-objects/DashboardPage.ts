import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page, '/history?tab=dashboard');
  }

  async getStatCard(title: string): Promise<Locator> {
    return this.page.locator('[data-testid="stat-card"]').filter({ hasText: title }).first();
  }

  async getRecentWorkoutList(): Promise<Locator> {
    return this.page.locator('[data-testid="recent-workout-item"]');
  }

  async getPRSection(): Promise<Locator> {
    return this.page.locator('[data-testid="pr-section"]');
  }

  async getCumulativeStatsCard(): Promise<Locator> {
    return this.page.locator('[data-testid="cumulative-stats-card"]');
  }

  async clickStartTraining(): Promise<void> {
    await this.page.getByRole('link', { name: '开始训练' }).click();
  }
}