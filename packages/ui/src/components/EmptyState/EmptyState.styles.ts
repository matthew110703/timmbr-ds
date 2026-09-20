import { cva, type VariantProps } from 'class-variance-authority';

export const emptyStateVariants = cva(
  'flex flex-col items-center justify-center text-center font-sans transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'p-8',
        bordered:
          'p-8 border border-dashed border-grey-300 dark:border-grey-700 rounded-xl bg-card/50',
        subtle:
          'p-8 bg-grey-50 dark:bg-grey-900/50 rounded-xl border border-grey-200 dark:border-grey-800',
      },
      size: {
        sm: 'py-6 px-4 max-w-sm',
        default: 'py-10 px-6 max-w-md',
        lg: 'py-16 px-8 max-w-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export const emptyStateIconWrapperVariants = cva(
  'flex items-center justify-center rounded-full bg-grey-100 dark:bg-grey-800 text-primary mb-4 shrink-0 transition-transform duration-200 group-hover:scale-105',
  {
    variants: {
      size: {
        sm: 'size-10 text-lg',
        default: 'size-14 text-2xl',
        lg: 'size-20 text-3xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type EmptyStateVariants = VariantProps<typeof emptyStateVariants>;
