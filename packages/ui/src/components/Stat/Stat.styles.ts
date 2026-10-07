import { cva, type VariantProps } from 'class-variance-authority';

export const statVariants = cva(
  'flex flex-col gap-1 font-sans text-foreground rounded-xl transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'p-0',
        bordered: 'p-5 border border-grey-200 dark:border-grey-800 bg-card shadow-xs',
        subtle: 'p-5 bg-grey-50 dark:bg-grey-900/50 rounded-xl border border-grey-200/60 dark:border-grey-800/60',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const statLabelVariants = cva(
  'text-body-3 font-semibold text-muted-foreground uppercase tracking-wider select-none'
);

export const statValueVariants = cva(
  'text-h3 font-semibold text-foreground tracking-tight'
);

export const statHelpTextVariants = cva(
  'flex items-center gap-1.5 text-body-3 text-muted-foreground mt-1'
);

export const statIndicatorVariants = cva(
  'inline-flex items-center gap-1 font-semibold text-body-3',
  {
    variants: {
      type: {
        increase: 'text-success',
        decrease: 'text-destructive',
      },
    },
    defaultVariants: {
      type: 'increase',
    },
  }
);

export type StatVariants = VariantProps<typeof statVariants>;
export type StatIndicatorVariants = VariantProps<typeof statIndicatorVariants>;
