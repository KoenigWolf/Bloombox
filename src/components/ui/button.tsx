import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-bold uppercase tracking-[0.05em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-foreground active:translate-y-0.5 active:shadow-none hover:-translate-y-1 hover:shadow-[4px_4px_0px_var(--color-foreground)]',
  {
    variants: {
      variant: {
        default:
          'bg-primary-500 text-white hover:bg-primary-600',
        secondary:
          'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
        outline:
          'bg-transparent hover:bg-primary-50 hover:text-primary-600',
        ghost: 'border-transparent hover:bg-neutral-100 hover:border-foreground',
        link: 'border-transparent text-primary-500 underline-offset-4 hover:underline hover:shadow-none hover:-translate-y-0 active:translate-y-0',
        destructive:
          'bg-error text-white hover:bg-red-600',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
