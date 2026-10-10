import { cva, type VariantProps } from 'class-variance-authority';

export const ratingVariants = cva('inline-flex items-center font-sans text-foreground', {
  variants: {
    size: {
      sm: 'gap-1 text-body-3 [&_svg]:size-3.5',
      md: 'gap-1.5 text-body-2 [&_svg]:size-4',
    },
  },
  defaultVariants: { size: 'sm' },
});

export type RatingVariants = VariantProps<typeof ratingVariants>;
