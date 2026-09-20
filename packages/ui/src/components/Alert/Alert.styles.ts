import { cva, type VariantProps } from 'class-variance-authority';

export const alertVariants = cva(
  'relative flex w-full gap-3 p-4 rounded-lg border text-sm font-sans transition-all duration-200',
  {
    variants: {
      variant: {
        default:
          'border-grey-200 dark:border-grey-800 bg-grey-50 dark:bg-grey-900/50 text-foreground',
        info:
          'border-info/30 bg-info/10 text-foreground dark:border-info/40 dark:bg-info/15',
        success:
          'border-success/30 bg-success/10 text-foreground dark:border-success/40 dark:bg-success/15',
        warning:
          'border-warning/30 bg-warning/10 text-foreground dark:border-warning/40 dark:bg-warning/15',
        destructive:
          'border-destructive/30 bg-destructive/10 text-foreground dark:border-destructive/40 dark:bg-destructive/15',
      },
      size: {
        sm: 'p-3 text-xs gap-2.5',
        default: 'p-4 text-sm gap-3',
        lg: 'p-5 text-base gap-3.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export const alertIconVariants = cva('shrink-0 transition-colors', {
  variants: {
    variant: {
      default: 'text-grey-700 dark:text-grey-300',
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      destructive: 'text-destructive',
    },
    size: {
      sm: 'size-4 mt-0.5',
      default: 'size-5 mt-0.5',
      lg: 'size-6 mt-0.5',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export type AlertVariants = VariantProps<typeof alertVariants>;
