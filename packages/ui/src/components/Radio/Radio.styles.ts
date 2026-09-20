import { cva, type VariantProps } from 'class-variance-authority';

export const radioItemVariants = cva(
  'aspect-square rounded-full border border-grey-300 dark:border-grey-700 bg-white dark:bg-grey-900 text-primary transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer flex items-center justify-center data-[state=checked]:border-primary',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        default: 'h-5 w-5',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export const radioIndicatorVariants = cva(
  'rounded-full bg-primary flex items-center justify-center transition-transform',
  {
    variants: {
      size: {
        sm: 'h-2 w-2',
        default: 'h-2.5 w-2.5',
        md: 'h-2.5 w-2.5',
        lg: 'h-3 w-3',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type RadioItemVariants = VariantProps<typeof radioItemVariants>;
