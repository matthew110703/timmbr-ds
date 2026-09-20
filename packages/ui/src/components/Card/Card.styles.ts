import { cva, type VariantProps } from 'class-variance-authority';

export const cardVariants = cva(
  'rounded-[4px] text-foreground font-sans transition-all',
  {
    variants: {
      variant: {
        outline:
          'border border-grey-200 dark:border-grey-800 bg-white dark:bg-grey-900 shadow-sm',
        elevated:
          'border border-transparent bg-white dark:bg-grey-900 shadow-md hover:shadow-lg',
        subtle:
          'border border-transparent bg-grey-50 dark:bg-grey-950',
        interactive:
          'border border-grey-200 dark:border-grey-800 bg-white dark:bg-grey-900 shadow-sm hover:border-primary hover:shadow-md cursor-pointer',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        default: 'p-6',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'outline',
      padding: 'default',
    },
  }
);

export const cardHeaderVariants = cva('flex flex-col gap-1.5 mb-4');
export const cardTitleVariants = cva('text-lg font-serif font-bold text-foreground leading-tight tracking-tight');
export const cardDescriptionVariants = cva('text-sm text-muted leading-relaxed');
export const cardContentVariants = cva('flex flex-col gap-4');
export const cardFooterVariants = cva('flex items-center justify-between pt-4 mt-4 border-t border-grey-100 dark:border-grey-800');

export type CardVariants = VariantProps<typeof cardVariants>;
