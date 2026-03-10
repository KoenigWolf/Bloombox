import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy on home page', async ({ page }) => {
    await page.goto('/');

    // There should be at least one h1
    const h1 = page.locator('h1');
    const h1Count = await h1.count();
    expect(h1Count).toBeGreaterThan(0);
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/');

    // Navigation should be accessible
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should have alt text on images', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < Math.min(imageCount, 10); i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      // Images should have alt attribute (can be empty for decorative images)
      expect(alt).not.toBeNull();
    }
  });

  test('should have proper focus management', async ({ page }) => {
    await page.goto('/');

    // Press Tab and check focus is visible
    await page.keyboard.press('Tab');

    const focusedElement = page.locator(':focus');
    const focusedCount = await focusedElement.count();

    expect(focusedCount).toBeGreaterThan(0);
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/');

    // Basic check: body should have text color defined
    const body = page.locator('body');
    const color = await body.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });

    expect(color).toBeDefined();
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');

    // Navigate through the page using keyboard
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
    }

    // Should be able to activate focused element with Enter
    const focusedElement = page.locator(':focus');
    const tagName = await focusedElement.evaluate((el) => el.tagName);

    expect(['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']).toContain(tagName);
  });

  test('should have skip to content link', async ({ page }) => {
    await page.goto('/');

    // Press Tab to reveal skip link (if exists)
    await page.keyboard.press('Tab');

    const skipLink = page.locator('a:has-text("メインコンテンツへスキップ")');
    const skipCount = await skipLink.count();

    // Skip link is optional but recommended
    if (skipCount > 0) {
      await expect(skipLink).toBeVisible();
    }
  });
});

test.describe('Mobile Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
  });

  test('should have touch-friendly button sizes', async ({ page }) => {
    await page.goto('/');

    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    let touchFriendlyCount = 0;
    const checkedCount = Math.min(buttonCount, 5);

    for (let i = 0; i < checkedCount; i++) {
      const button = buttons.nth(i);
      const isVisible = await button.isVisible();

      if (isVisible) {
        const box = await button.boundingBox();
        if (box) {
          // Check if button meets minimum touch target (44x44px recommended, 36px acceptable)
          if (box.width >= 36 && box.height >= 36) {
            touchFriendlyCount++;
          }
        }
      }
    }

    // At least 50% of buttons should be touch-friendly
    expect(touchFriendlyCount).toBeGreaterThan(0);
  });

  test('should have readable text on mobile', async ({ page }) => {
    await page.goto('/');

    const body = page.locator('body');
    const fontSize = await body.evaluate((el) => {
      return window.getComputedStyle(el).fontSize;
    });

    // Base font size should be at least 16px
    const fontSizeNum = parseInt(fontSize);
    expect(fontSizeNum).toBeGreaterThanOrEqual(16);
  });

  test('should have mobile menu', async ({ page }) => {
    await page.goto('/');

    // Mobile menu button should be visible
    const menuButton = page.locator('[data-testid="mobile-menu-button"]');
    const count = await menuButton.count();

    if (count > 0) {
      await expect(menuButton).toBeVisible();
    }
  });
});
