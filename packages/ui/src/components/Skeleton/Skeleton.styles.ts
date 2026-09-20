import { cva, type VariantProps } from 'class-variance-authority';

export const skeletonVariants = cva(
  'bg-grey-200 dark:bg-grey-800 font-sans select-none',
  {
    variants: {
      variant: {
        text: 'h-4 w-full rounded-sm',
        circular: 'rounded-full aspect-square shrink-0',
        rectangular: 'rounded-md w-full',
        card: 'rounded-xl w-full p-4 border border-grey-200 dark:border-grey-800',
      },
      animation: {
        pulse: 'animate-pulse',
        wave: 'relative overflow-hidden before:absolute before:inset-0 before:content-[\'\'] before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/60 dark:before:via-white/15 before:to-transparent',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'text',
      animation: 'pulse',
    },
  }
);

export type SkeletonVariants = VariantProps<typeof skeletonVariants>;
