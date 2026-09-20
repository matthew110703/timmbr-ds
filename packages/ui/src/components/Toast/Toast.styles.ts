import { cva, type VariantProps } from 'class-variance-authority';

export const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg transition-all duration-200 font-sans data-[state=open]:animate-slide-in-from-bottom data-[state=closed]:animate-fade-out',
  {
    variants: {
      variant: {
        default: 'border-grey-200 dark:border-grey-800 bg-white dark:bg-grey-900 text-foreground',
        destructive:
          'destructive group border-destructive bg-destructive text-white',
        success:
          'border-success bg-white dark:bg-grey-900 text-foreground border-l-4 border-l-success',
        warning:
          'border-warning bg-white dark:bg-grey-900 text-foreground border-l-4 border-l-warning',
        info:
          'border-info bg-white dark:bg-grey-900 text-foreground border-l-4 border-l-info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type ToastVariants = VariantProps<typeof toastVariants>;
