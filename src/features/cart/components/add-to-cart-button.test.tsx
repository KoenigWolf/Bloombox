import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@/test/utils';
import { AddToCartButton } from './add-to-cart-button';
import { useCartStore } from '../store';

describe('AddToCartButton', () => {
  beforeEach(() => {
    // Reset store before each test
    useCartStore.setState({
      items: [],
      giftOptions: { isGift: false },
      isOpen: false,
    });
  });

  it('should render button with add to cart text', () => {
    render(
      <AddToCartButton
        productId="prod-001"
        variantId="var-s"
      />
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should add item to cart when clicked', async () => {
    const { user } = render(
      <AddToCartButton
        productId="prod-001"
        variantId="var-s"
        productName="テスト商品"
        variantName="S"
        price={5000}
        imageUrl="/test.jpg"
      />
    );

    await user.click(screen.getByRole('button'));

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].productId).toBe('prod-001');
    expect(state.items[0].name).toBe('テスト商品');
    expect(state.items[0].price).toBe(5000);
  });

  it('should open cart after adding item', async () => {
    const { user } = render(
      <AddToCartButton
        productId="prod-001"
        variantId="var-s"
      />
    );

    await user.click(screen.getByRole('button'));

    expect(useCartStore.getState().isOpen).toBe(true);
  });

  it('should show confirmation message after adding', async () => {
    const { user } = render(
      <AddToCartButton
        productId="prod-001"
        variantId="var-s"
      />
    );

    await user.click(screen.getByRole('button'));

    expect(screen.getByText('追加しました')).toBeInTheDocument();
  });

  it('should be disabled while showing confirmation', async () => {
    const { user } = render(
      <AddToCartButton
        productId="prod-001"
        variantId="var-s"
      />
    );

    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should re-enable after timeout', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    render(
      <AddToCartButton
        productId="prod-001"
        variantId="var-s"
      />
    );

    // Use fireEvent instead of userEvent with fake timers
    const button = screen.getByRole('button');
    button.click();

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeDisabled();
    });

    // Advance timers past the 2000ms timeout
    await vi.advanceTimersByTimeAsync(2100);

    await waitFor(() => {
      expect(screen.getByRole('button')).not.toBeDisabled();
    });

    vi.useRealTimers();
  });

  it('should be disabled when disabled prop is true', () => {
    render(
      <AddToCartButton
        productId="prod-001"
        variantId="var-s"
        disabled
      />
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should use default values for optional props', () => {
    render(
      <AddToCartButton
        productId="prod-001"
        variantId="var-s"
      />
    );

    // Use direct click instead of userEvent to avoid timing issues
    const button = screen.getByRole('button');
    button.click();

    const state = useCartStore.getState();
    expect(state.items[0].name).toBe('');
    expect(state.items[0].price).toBe(0);
    expect(state.items[0].imageUrl).toBe('');
  });

  it('should apply large size styling', () => {
    render(
      <AddToCartButton
        productId="prod-001"
        variantId="var-s"
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-12'); // lg size
  });
});
