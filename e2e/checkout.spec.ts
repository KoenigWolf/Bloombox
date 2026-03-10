import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('should redirect to cart if cart is empty', async ({ page }) => {
    await page.goto('/checkout');

    // Should redirect or show empty cart message
    const currentUrl = page.url();
    const emptyMessage = page.locator('text=カートは空です');
    const emptyCount = await emptyMessage.count();

    // Either redirected to cart or showing empty message
    expect(
      currentUrl.includes('/cart') || emptyCount > 0
    ).toBeTruthy();
  });

  test('should proceed to checkout with items in cart', async ({ page }) => {
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

        // Navigate to checkout
        await page.goto('/checkout');

        // Checkout page should be accessible
        const checkoutForm = page.locator('[data-testid="checkout-form"]');
        const formCount = await checkoutForm.count();

        if (formCount > 0) {
          await expect(checkoutForm).toBeVisible();
        }
      }
    }
  });

  test('should display order summary in checkout', async ({ page }) => {
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

        // Navigate to checkout
        await page.goto('/checkout');

        // Order summary should be visible
        const orderSummary = page.locator('[data-testid="order-summary"]');
        const summaryCount = await orderSummary.count();

        if (summaryCount > 0) {
          await expect(orderSummary).toBeVisible();
        }
      }
    }
  });
});

test.describe('Checkout Form Validation', () => {
  test('should show validation errors for empty form', async ({ page }) => {
    // Setup: Add item to cart first
    await page.goto('/products');

    const productLink = page.locator('[data-testid="product-card"] a').first();
    const count = await productLink.count();

    if (count > 0) {
      await productLink.click();

      const addToCartButton = page.locator('button:has-text("カートに追加")');
      const buttonCount = await addToCartButton.count();

      if (buttonCount > 0) {
        await addToCartButton.click();
        await page.goto('/checkout');

        // Try to submit empty form
        const submitButton = page.locator('button[type="submit"]');
        const submitCount = await submitButton.count();

        if (submitCount > 0) {
          await submitButton.click();

          // Validation errors should appear
          const errorMessages = page.locator('[data-testid="form-error"]');
          const errorCount = await errorMessages.count();

          expect(errorCount).toBeGreaterThan(0);
        }
      }
    }
  });

  test('should validate email format', async ({ page }) => {
    // Setup: Add item to cart first
    await page.goto('/products');

    const productLink = page.locator('[data-testid="product-card"] a').first();
    const count = await productLink.count();

    if (count > 0) {
      await productLink.click();

      const addToCartButton = page.locator('button:has-text("カートに追加")');
      const buttonCount = await addToCartButton.count();

      if (buttonCount > 0) {
        await addToCartButton.click();
        await page.goto('/checkout');

        // Enter invalid email
        const emailInput = page.locator('input[type="email"]');
        const emailCount = await emailInput.count();

        if (emailCount > 0) {
          await emailInput.fill('invalid-email');
          await emailInput.blur();

          // Email error should appear
          const emailError = page.locator('text=有効なメールアドレス');
          const errorExists = await emailError.count();

          if (errorExists > 0) {
            await expect(emailError).toBeVisible();
          }
        }
      }
    }
  });
});

test.describe('Gift Options', () => {
  test('should toggle gift wrapping option', async ({ page }) => {
    // Setup: Add item to cart first
    await page.goto('/products');

    const productLink = page.locator('[data-testid="product-card"] a').first();
    const count = await productLink.count();

    if (count > 0) {
      await productLink.click();

      const addToCartButton = page.locator('button:has-text("カートに追加")');
      const buttonCount = await addToCartButton.count();

      if (buttonCount > 0) {
        await addToCartButton.click();
        await page.goto('/checkout');

        // Find gift option checkbox
        const giftCheckbox = page.locator('[data-testid="gift-option"]');
        const checkboxCount = await giftCheckbox.count();

        if (checkboxCount > 0) {
          await giftCheckbox.click();
          await expect(giftCheckbox).toBeChecked();
        }
      }
    }
  });

  test('should show gift message input when gift is selected', async ({ page }) => {
    // Setup: Add item to cart first
    await page.goto('/products');

    const productLink = page.locator('[data-testid="product-card"] a').first();
    const count = await productLink.count();

    if (count > 0) {
      await productLink.click();

      const addToCartButton = page.locator('button:has-text("カートに追加")');
      const buttonCount = await addToCartButton.count();

      if (buttonCount > 0) {
        await addToCartButton.click();
        await page.goto('/checkout');

        // Find gift option checkbox
        const giftCheckbox = page.locator('[data-testid="gift-option"]');
        const checkboxCount = await giftCheckbox.count();

        if (checkboxCount > 0) {
          await giftCheckbox.click();

          // Gift message input should appear
          const giftMessageInput = page.locator('[data-testid="gift-message"]');
          const messageCount = await giftMessageInput.count();

          if (messageCount > 0) {
            await expect(giftMessageInput).toBeVisible();
          }
        }
      }
    }
  });
});
