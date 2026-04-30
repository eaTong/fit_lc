import { test, expect } from '@playwright/test';
import { GalleryPage } from '../page-objects/GalleryPage';
import { LoginPage } from '../page-objects/LoginPage';

test.describe('Gallery', () => {
  let galleryPage: GalleryPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    galleryPage = new GalleryPage(page);
    loginPage = new LoginPage(page);

    // Login before each gallery test
    await loginPage.login('test@example.com', 'Test123456');
    // Navigate to gallery page
    await galleryPage.open();
  });

  test('GALLERY-001: should display photos by month', async ({ page }) => {
    // Should display the photo grid after navigation
    await expect(galleryPage.photoGrid).toBeVisible();
  });

  test('GALLERY-002: should switch month', async ({ page }) => {
    // Click on a different month button
    await galleryPage.switchMonth(2026, 3);
    // The month picker should update and trigger photo reload
    await expect(galleryPage.photoGrid).toBeVisible();
    // Verify the month button is now active/selected
    const monthButton = page.locator(`button:has-text("3月")`);
    await expect(monthButton).toBeVisible();
  });

  test('GALLERY-003: should open photo viewer on click', async ({ page }) => {
    test.skip(true, 'Requires photos to be present - blocked by test data setup');
    const photoCount = await galleryPage.photoGrid.locator('img').count();
    expect(photoCount).toBeGreaterThan(0);
    await galleryPage.clickFirstPhoto();
    await expect(galleryPage.viewer).toBeVisible();
  });

  test('GALLERY-004: should close photo viewer on escape', async ({ page }) => {
    test.skip(true, 'Requires photos to be present - blocked by test data setup');
    const photoCount = await galleryPage.photoGrid.locator('img').count();
    expect(photoCount).toBeGreaterThan(0);
    await galleryPage.clickFirstPhoto();
    await expect(galleryPage.viewer).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(galleryPage.viewer).not.toBeVisible();
  });

  test('GALLERY-005: should close photo viewer on backdrop click', async ({ page }) => {
    test.skip(true, 'Requires photos to be present - blocked by test data setup');
    const photoCount = await galleryPage.photoGrid.locator('img').count();
    expect(photoCount).toBeGreaterThan(0);
    await galleryPage.clickFirstPhoto();
    await expect(galleryPage.viewer).toBeVisible();
    // Click outside the image (on the backdrop)
    await galleryPage.viewer.click({ position: { x: 10, y: 10 } });
    await expect(galleryPage.viewer).not.toBeVisible();
  });
});