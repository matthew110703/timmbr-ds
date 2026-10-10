import { cva, type VariantProps } from 'class-variance-authority';

export const priceVariants = cva('inline-flex flex-wrap items-baseline font-sans text-foreground', {
  variants: {
    size: {
      sm: 'gap-x-1.5',
      md: 'gap-x-1',
      lg: 'gap-x-2',
    },
  },
  defaultVariants: { size: 'md' },
});

export const priceAmountVariants = cva('font-semibold', {
  variants: {
    size: {
      sm: 'text-body-1',
      md: 'text-subtitle-1',
      lg: 'text-h5 font-sans',
    },
  },
  defaultVariants: { size: 'md' },
});

export const priceCompareVariants = cva('text-muted-foreground line-through', {
  variants: {
    size: {
      sm: 'text-body-3',
      md: 'text-body-3',
      lg: 'text-body-2',
    },
  },
  defaultVariants: { size: 'md' },
});

export const priceDiscountVariants = cva('font-semibold text-success', {
  variants: {
    size: {
      sm: 'text-body-3',
      md: 'ms-1 text-body-2',
      lg: 'text-body-1',
    },
  },
  defaultVariants: { size: 'md' },
});

export type PriceVariants = VariantProps<typeof priceVariants>;
