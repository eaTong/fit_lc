import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class GalleryPage extends BasePage {
  constructor(page: Page) {
    super(page, '/gallery');
  }

  readonly photoGrid = this.page.locator('[data-testid="photo-grid"]');
  readonly viewer = this.page.locator('[data-testid="photo-viewer"]');
  readonly photoCount = this.page.locator('.photo-count');

  async switchMonth(year: number, month: number): Promise<void> {
    // MonthPicker shows month as "X月" format
    await this.page.click(`button:has-text("${month}月")`);
  }

  async clickFirstPhoto(): Promise<void> {
    await this.page.locator('[data-testid="photo-grid"] img').first().click();
  }

  async deleteFirstPhoto(): Promise<void> {
    // Register handler BEFORE clicking to avoid race condition
    this.page.once('dialog', dialog => dialog.accept());
    await this.page.locator('[data-testid="photo-grid"] img').first().click({ button: 'right' });
    await this.page.click('button:has-text("删除")');
  }

  async getPhotoCount(): Promise<number> {
    const countText = await this.photoCount.textContent();
    return parseInt(countText || '0', 10);
  }
}