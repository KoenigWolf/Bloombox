import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/utils';
import { Input } from './input';

describe('Input', () => {
  it('should render input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  describe('types', () => {
    it('should render text input by default', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      // Browser defaults to 'text' even without explicit attribute
      const inputType = input.getAttribute('type') ?? 'text';
      expect(inputType).toBe('text');
    });

    it('should render email input', () => {
      render(<Input type="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('should render password input', () => {
      render(<Input type="password" />);
      // Password inputs don't have textbox role
      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });

    it('should render number input', () => {
      render(<Input type="number" />);
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('type', 'number');
    });

    it('should render tel input', () => {
      render(<Input type="tel" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'tel');
    });
  });

  describe('value handling', () => {
    it('should accept value prop', () => {
      render(<Input value="test value" readOnly />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('test value');
    });

    it('should handle onChange', async () => {
      const handleChange = vi.fn();
      const { user } = render(<Input onChange={handleChange} />);

      await user.type(screen.getByRole('textbox'), 'hello');

      expect(handleChange).toHaveBeenCalled();
    });

    it('should update value on user input', async () => {
      const { user } = render(<Input />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'hello');

      expect(input).toHaveValue('hello');
    });
  });

  describe('error state', () => {
    it('should apply error styles when error is true', () => {
      render(<Input error />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-error');
    });

    it('should not have error styles by default', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).not.toHaveClass('border-error');
    });
  });

  describe('disabled state', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('should have disabled styles', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('disabled:opacity-50');
      expect(input).toHaveClass('disabled:cursor-not-allowed');
    });
  });

  describe('className', () => {
    it('should merge custom className', () => {
      render(<Input className="custom-class" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
    });
  });

  describe('ref forwarding', () => {
    it('should forward ref to input element', () => {
      const ref = { current: null as HTMLInputElement | null };
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('accessibility', () => {
    it('should have proper base styling', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('rounded-lg');
      expect(input).toHaveClass('border');
    });

    it('should support aria-label', () => {
      render(<Input aria-label="Email address" />);
      const input = screen.getByRole('textbox', { name: 'Email address' });
      expect(input).toBeInTheDocument();
    });

    it('should support aria-describedby', () => {
      render(
        <>
          <Input aria-describedby="help-text" />
          <span id="help-text">Enter your email</span>
        </>
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'help-text');
    });
  });
});
