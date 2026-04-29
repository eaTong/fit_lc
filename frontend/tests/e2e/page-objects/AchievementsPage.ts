import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AchievementsPage extends BasePage {
  constructor(page: Page) {
    super(page, '/badges');
  }

  async open() {
    await this.page.goto('/badges');
  }

  async getBadgeGrid(): Promise<Locator> {
    return this.page.locator('[data-testid="badge-grid"]');
  }

  async getAllBadges(): Promise<Locator[]> {
    return this.page.locator('[data-testid="badge-item"]').all();
  }

  async getBadgeByName(name: string): Promise<Locator> {
    return this.page.locator('[data-testid="badge-item"]').filter({ hasText: name }).first();
  }

  async getBadgeCount(): Promise<number> {
    return this.page.locator('[data-testid="badge-item"]').count();
  }

  async getLockedBadgeCount(): Promise<number> {
    return this.page.locator('[data-testid="badge-locked"]').count();
  }

  async getUnlockedBadgeCount(): Promise<number> {
    return this.page.locator('[data-testid="badge-unlocked"]').count();
  }

  async getBadgesByTier(tier: 'bronze' | 'silver' | 'gold' | 'platinum'): Promise<Locator[]> {
    return this.page.locator(`[data-testid="badge-tier-${tier}"]`).all();
  }

  async getProgressBar(): Promise<Locator> {
    return this.page.locator('[data-testid="badge-progress"]');
  }
}