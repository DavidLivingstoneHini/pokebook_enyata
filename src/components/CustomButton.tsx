import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { st } from '@/utils/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[14px] transition-colors disabled:pointer-events-none disabled:opacity-50 gap-1.5 focus-visible:outline-none focus-visible:ring focus-visible:ring-theme/50 font-sans',
  {
    variants: {
      variant: {
        default: 'bg-theme text-theme-foreground hover:bg-theme/90',
        plain: '',
      },
      size: {
        default: 'h-[46px] px-4 py-2',
        icon: 'size-[40px] rounded-[8px] focus-visible:ring-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={st(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
