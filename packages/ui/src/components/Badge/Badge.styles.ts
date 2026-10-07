import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 whitespace-nowrap rounded-[2px] font-sans transition-colors select-none font-normal leading-[1.3]',
  {
    variants: {
      variant: {
        primary: 'bg-primary-300 text-grey-50',
        brand: 'bg-primary text-grey-50',
        default: 'bg-primary text-grey-50',
        secondary: 'bg-secondary text-secondary-foreground',
        outline: 'border border-grey-300 dark:border-grey-700 bg-transparent text-foreground',
        subtle: 'bg-bg-subtle text-foreground',
        success: 'bg-success text-grey-50',
        destructive: 'bg-destructive text-grey-50',
      },
      size: {
        sm: 'px-1.5 py-0.5 text-body-3',
        md: 'px-2 py-1 text-body-2',
        lg: 'px-3 py-1.5 text-body-1 font-medium',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
