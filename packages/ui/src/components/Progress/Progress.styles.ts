import { cva, type VariantProps } from 'class-variance-authority';

export const progressRootVariants = cva(
  'relative w-full overflow-hidden rounded-full bg-grey-200 dark:bg-grey-800 transition-all font-sans',
  {
    variants: {
      size: {
        sm: 'h-1.5',
        default: 'h-2.5',
        lg: 'h-4',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export const progressIndicatorVariants = cva(
  'h-full rounded-full transition-all duration-300 ease-out',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        primary: 'bg-primary',
        success: 'bg-success',
        warning: 'bg-warning',
        destructive: 'bg-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type ProgressVariants = VariantProps<typeof progressIndicatorVariants> &
  VariantProps<typeof progressRootVariants>;
