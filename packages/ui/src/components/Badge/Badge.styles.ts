import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 whitespace-nowrap rounded-[2px] font-sans transition-colors select-none font-normal leading-[1.3]',
  {
    variants: {
      variant: {
        primary: 'bg-primary-300 text-white',
        brand: 'bg-primary text-white',
        default: 'bg-primary text-white',
        secondary: 'bg-secondary text-secondary-foreground',
        outline: 'border border-grey-300 dark:border-grey-700 bg-transparent text-foreground',
        subtle: 'bg-bg-subtle text-foreground',
        success: 'bg-emerald-600 text-white',
        destructive: 'bg-destructive text-white',
      },
      size: {
        sm: 'px-1.5 py-0.5 text-xs',
        md: 'px-2 py-1 text-[14px]',
        lg: 'px-3 py-1.5 text-base font-medium',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
