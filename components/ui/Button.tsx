import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        // Кнопка по умолчанию - светло-фиолетовая
        default: 'bg-primary-light text-on-primary hover:opacity-90 shadow-md',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        // Контурная кнопка теперь белая, для тёмного фона
        outline: 'border border-white/50 bg-transparent hover:bg-white/10 text-white',
        ghost: 'hover:bg-white/10 text-white',
      },
      size: {
        default: 'h-11 px-6',
        sm: 'h-9 px-3',
        lg: 'h-12 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
// ... остальной код компонента без изменений ...
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };