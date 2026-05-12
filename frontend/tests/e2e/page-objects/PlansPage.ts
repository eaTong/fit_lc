import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PlansPage extends BasePage {
  constructor(page: Page) {
    super(page, '/plans');
  }

  async createNewPlan(): Promise<void> {
    await this.page.getByRole('button', { name: '生成新计划' }).click();
  }

  async getPlanCards(): Promise<Locator> {
    return this.page.locator('[data-testid="plan-card"], article');
  }

  async activatePlan(index: number = 0): Promise<void> {
    const cards = await this.getPlanCards();
    const activateBtn = cards.nth(index).locator('button:has-text("激活")');
    if (await activateBtn.isVisible()) {
      await activateBtn.click();
    }
  }

  async deletePlan(index: number = 0): Promise<void> {
    const cards = await this.getPlanCards();
    const deleteBtn = cards.nth(index).locator('button:has-text("删除")');
    if (await deleteBtn.isVisible()) {
      await deleteBtn.click();
    }
  }

  async filterByStatus(status: 'all' | 'draft' | 'active' | 'completed' | 'paused'): Promise<void> {
    const labels: Record<string, string> = {
      all: '全部',
      draft: '草稿',
      active: '进行中',
      completed: '已完成',
      paused: '已暂停'
    };
    await this.page.getByRole('button', { name: labels[status] }).click();
  }
}

export class PlanDetailPage extends BasePage {
  constructor(page: Page) {
    super(page, '/plans');
  }

  async gotoPlanDetail(planId: number): Promise<void> {
    await this.page.goto(`/plans/${planId}`);
  }

  async activatePlan(): Promise<void> {
    await this.page.getByRole('button', { name: '激活计划' }).click();
  }

  async startExecution(): Promise<void> {
    await this.page.getByRole('button', { name: '开始执行' }).click();
  }

  async getPlanName(): Promise<string | null> {
    return this.page.locator('h1').first().textContent();
  }

  async getExercisesCount(): Promise<number> {
    return this.page.locator('ul li').count();
  }

  async goBack(): Promise<void> {
    await this.page.getByRole('button', { name: '返回列表' }).click();
  }
}

export class PlanExecutePage extends BasePage {
  constructor(page: Page) {
    super(page, '/plans');
  }

  async gotoExecute(planId: number): Promise<void> {
    await this.page.goto(`/plans/${planId}/execute`);
  }

  async toggleExercise(index: number = 0): Promise<void> {
    await this.page.locator('.w-6.h-6.border-2').nth(index).click();
  }

  async submitCheckin(): Promise<void> {
    await this.page.getByRole('button', { name: '提交打卡' }).click();
  }

  async getTodayExercises(): Promise<Locator> {
    return this.page.locator('[class*="Card"]').filter({ has: this.page.locator('.w-6.h-6.border-2') });
  }
}