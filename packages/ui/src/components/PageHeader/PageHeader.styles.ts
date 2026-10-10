import { cva, type VariantProps } from 'class-variance-authority';

export const pageHeaderVariants = cva('flex flex-col font-sans', {
  variants: {
    divider: {
      true: 'border-b border-border pb-4',
      false: '',
    },
  },
  defaultVariants: { divider: false },
});

export const pageHeaderTitleVariants = cva('text-foreground tracking-tight', {
  variants: {
    size: {
      sm: 'text-h5',
      default: 'text-h4',
      lg: 'text-h3',
    },
  },
  defaultVariants: { size: 'default' },
});

export type PageHeaderVariants = VariantProps<typeof pageHeaderVariants>;
export type PageHeaderTitleVariants = VariantProps<typeof pageHeaderTitleVariants>;
