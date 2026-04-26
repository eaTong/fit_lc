import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ExercisesPage extends BasePage {
  constructor(page: Page) {
    super(page, '/exercises');
  }

  async filterByMuscle(muscle: string): Promise<void> {
    await this.page.getByRole('button', { name: muscle }).click();
  }

  async filterByEquipment(equipment: string): Promise<void> {
    await this.page.getByRole('button', { name: equipment }).click();
  }

  async filterByDifficulty(difficulty: string): Promise<void> {
    await this.page.getByRole('button', { name: difficulty }).click();
  }

  async searchExercise(name: string): Promise<void> {
    await this.page.getByPlaceholder('搜索动作').fill(name);
  }

  async clickFirstExercise(): Promise<void> {
    await this.page.locator('[data-testid="exercise-card"]').first().click();
  }

  async getExerciseCount(): Promise<number> {
    return this.page.locator('[data-testid="exercise-card"]').count();
  }
}

export class MusclesPage extends BasePage {
  constructor(page: Page) {
    super(page, '/muscles');
  }

  async expandMuscleGroup(groupName: string): Promise<void> {
    await this.page.getByText(groupName).click();
  }

  async clickMuscle(muscleName: string): Promise<void> {
    await this.page.getByText(muscleName).click();
  }
}

export class PlansPage extends BasePage {
  constructor(page: Page) {
    super(page, '/plans');
  }

  async clickGeneratePlan(): Promise<void> {
    await this.page.getByRole('button', { name: '生成计划' }).click();
  }

  async fillPlanRequirements(requirements: string): Promise<void> {
    await this.page.getByPlaceholder('描述你的健身目标').fill(requirements);
  }

  async clickFirstPlan(): Promise<void> {
    await this.page.locator('[data-testid="plan-card"]').first().click();
  }

  async activatePlan(): Promise<void> {
    await this.page.getByRole('button', { name: '激活计划' }).click();
  }

  async checkIn(exerciseName: string): Promise<void> {
    await this.page.getByRole('button', { name: '打卡' }).click();
    await this.fillInput('完成组数', '3');
    await this.clickButton('确认');
  }
}