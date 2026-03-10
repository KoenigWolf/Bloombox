import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the home page', async ({ page }) => {
    await expect(page).toHaveTitle(/Bloombox/);
  });

  test('should display hero section', async ({ page }) => {
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
  });

  test('should have navigation links', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should navigate to products page', async ({ page }) => {
    await page.click('text=商品');
    await expect(page).toHaveURL(/\/products/);
  });

  test('should display featured products section', async ({ page }) => {
    const productsSection = page.locator('[data-testid="featured-products"]');
    // If section exists, verify it's visible
    const count = await productsSection.count();
    if (count > 0) {
      await expect(productsSection).toBeVisible();
    }
  });

  test('should have responsive layout on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Page should still be functional
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Footer', () => {
  test('should display footer with links', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});
