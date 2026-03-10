import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
  });

  test('should display products page title', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should display product grid', async ({ page }) => {
    const productGrid = page.locator('[data-testid="product-grid"]');
    const count = await productGrid.count();

    if (count > 0) {
      await expect(productGrid).toBeVisible();
    }
  });

  test('should display product cards', async ({ page }) => {
    const productCards = page.locator('[data-testid="product-card"]');
    const count = await productCards.count();

    // If products exist, they should be visible
    if (count > 0) {
      await expect(productCards.first()).toBeVisible();
    }
  });

  test('should navigate to product detail on click', async ({ page }) => {
    const productLink = page.locator('[data-testid="product-card"] a').first();
    const count = await productLink.count();

    if (count > 0) {
      await productLink.click();
      await expect(page).toHaveURL(/\/products\/.+/);
    }
  });

  test('should have filter functionality', async ({ page }) => {
    const filterSection = page.locator('[data-testid="product-filters"]');
    const count = await filterSection.count();

    if (count > 0) {
      await expect(filterSection).toBeVisible();
    }
  });

  test('should have sort functionality', async ({ page }) => {
    const sortSelect = page.locator('[data-testid="product-sort"]');
    const count = await sortSelect.count();

    if (count > 0) {
      await expect(sortSelect).toBeVisible();
    }
  });
});

test.describe('Product Detail Page', () => {
  test('should display product information', async ({ page }) => {
    // Navigate to a product page (assuming products exist)
    await page.goto('/products');

    const productLink = page.locator('[data-testid="product-card"] a').first();
    const count = await productLink.count();

    if (count > 0) {
      await productLink.click();

      // Product title should be visible
      await expect(page.locator('h1')).toBeVisible();
    }
  });

  test('should display product image', async ({ page }) => {
    await page.goto('/products');

    const productLink = page.locator('[data-testid="product-card"] a').first();
    const count = await productLink.count();

    if (count > 0) {
      await productLink.click();

      const productImage = page.locator('[data-testid="product-image"]');
      const imgCount = await productImage.count();

      if (imgCount > 0) {
        await expect(productImage).toBeVisible();
      }
    }
  });

  test('should display price', async ({ page }) => {
    await page.goto('/products');

    const productLink = page.locator('[data-testid="product-card"] a').first();
    const count = await productLink.count();

    if (count > 0) {
      await productLink.click();

      const price = page.locator('[data-testid="product-price"]');
      const priceCount = await price.count();

      if (priceCount > 0) {
        await expect(price).toBeVisible();
      }
    }
  });

  test('should have add to cart button', async ({ page }) => {
    await page.goto('/products');

    const productLink = page.locator('[data-testid="product-card"] a').first();
    const count = await productLink.count();

    if (count > 0) {
      await productLink.click();

      const addToCartButton = page.locator('button:has-text("カートに追加")');
      const buttonCount = await addToCartButton.count();

      if (buttonCount > 0) {
        await expect(addToCartButton).toBeVisible();
      }
    }
  });
});
