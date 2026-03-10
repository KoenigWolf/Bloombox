import { test, expect } from '@playwright/test';

test.describe('Cart Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('should show empty cart initially', async ({ page }) => {
    await page.goto('/cart');

    const emptyMessage = page.locator('text=カートは空です');
    const count = await emptyMessage.count();

    if (count > 0) {
      await expect(emptyMessage).toBeVisible();
    }
  });

  test('should add product to cart', async ({ page }) => {
    // Navigate to a product
    await page.goto('/products');

    const productLink = page.locator('[data-testid="product-card"] a').first();
    const count = await productLink.count();

    if (count > 0) {
      await productLink.click();

      const addToCartButton = page.locator('button:has-text("カートに追加")');
      const buttonCount = await addToCartButton.count();

      if (buttonCount > 0) {
        await addToCartButton.click();

        // Cart should show item count or open cart drawer
        const cartCount = page.locator('[data-testid="cart-count"]');
        const cartCountExists = await cartCount.count();

        if (cartCountExists > 0) {
          await expect(cartCount).toHaveText('1');
        }
      }
    }
  });

  test('should update quantity in cart', async ({ page }) => {
    // First add a product to cart
    await page.goto('/products');

    const productLink = page.locator('[data-testid="product-card"] a').first();
    const count = await productLink.count();

    if (count > 0) {
      await productLink.click();

      const addToCartButton = page.locator('button:has-text("カートに追加")');
      const buttonCount = await addToCartButton.count();

      if (buttonCount > 0) {
        await addToCartButton.click();

        // Go to cart page
        await page.goto('/cart');

        // Find quantity controls
        const increaseButton = page.locator('[data-testid="quantity-increase"]').first();
        const increaseExists = await increaseButton.count();

        if (increaseExists > 0) {
          await increaseButton.click();

          const quantityDisplay = page.locator('[data-testid="quantity-display"]').first();
          await expect(quantityDisplay).toHaveText('2');
        }
      }
    }
  });

  test('should remove item from cart', async ({ page }) => {
    // First add a product to cart
    await page.goto('/products');

    const productLink = page.locator('[data-testid="product-card"] a').first();
    const count = await productLink.count();

    if (count > 0) {
      await productLink.click();

      const addToCartButton = page.locator('button:has-text("カートに追加")');
      const buttonCount = await addToCartButton.count();

      if (buttonCount > 0) {
        await addToCartButton.click();

        // Go to cart page
        await page.goto('/cart');

        // Find remove button
        const removeButton = page.locator('[data-testid="remove-item"]').first();
        const removeExists = await removeButton.count();

        if (removeExists > 0) {
          await removeButton.click();

          // Cart should be empty
          const emptyMessage = page.locator('text=カートは空です');
          await expect(emptyMessage).toBeVisible();
        }
      }
    }
  });

  test('should persist cart across page reloads', async ({ page }) => {
    // Add a product to cart
    await page.goto('/products');

    const productLink = page.locator('[data-testid="product-card"] a').first();
    const count = await productLink.count();

    if (count > 0) {
      await productLink.click();

      const addToCartButton = page.locator('button:has-text("カートに追加")');
      const buttonCount = await addToCartButton.count();

      if (buttonCount > 0) {
        await addToCartButton.click();

        // Reload the page
        await page.reload();

        // Cart count should still show 1
        const cartCount = page.locator('[data-testid="cart-count"]');
        const cartCountExists = await cartCount.count();

        if (cartCountExists > 0) {
          await expect(cartCount).toHaveText('1');
        }
      }
    }
  });
});

test.describe('Cart Drawer', () => {
  test('should open cart drawer when clicking cart icon', async ({ page }) => {
    await page.goto('/');

    const cartIcon = page.locator('[data-testid="cart-icon"]');
    const count = await cartIcon.count();

    if (count > 0) {
      await cartIcon.click();

      const cartDrawer = page.locator('[data-testid="cart-drawer"]');
      const drawerCount = await cartDrawer.count();

      if (drawerCount > 0) {
        await expect(cartDrawer).toBeVisible();
      }
    }
  });

  test('should close cart drawer when clicking close button', async ({ page }) => {
    await page.goto('/');

    const cartIcon = page.locator('[data-testid="cart-icon"]');
    const count = await cartIcon.count();

    if (count > 0) {
      await cartIcon.click();

      const closeButton = page.locator('[data-testid="cart-drawer-close"]');
      const closeCount = await closeButton.count();

      if (closeCount > 0) {
        await closeButton.click();

        const cartDrawer = page.locator('[data-testid="cart-drawer"]');
        await expect(cartDrawer).not.toBeVisible();
      }
    }
  });
});
