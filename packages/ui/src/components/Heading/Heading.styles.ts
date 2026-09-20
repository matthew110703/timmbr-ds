import { cva, type VariantProps } from 'class-variance-authority';

export const headingVariants = cva('transition-colors leading-[1.3] text-foreground', {
  variants: {
    level: {
      1: 'text-[64px]',
      2: 'text-[48px]',
      3: 'text-[32px]',
      4: 'text-[24px] tracking-[-0.02em]',
      5: 'text-[20px]',
      6: 'text-[20px]',
    },
    font: {
      display: 'font-display font-normal',
      title: 'font-title font-bold',
    },
    foreground: {
      default: 'text-foreground',
      muted: 'text-grey-600 dark:text-grey-400',
      subtle: 'text-grey-500 dark:text-grey-500',
      primary: 'text-primary',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive',
      white: 'text-white',
      inherit: 'text-inherit',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    level: 1,
    font: 'display',
    foreground: 'default',
  },
});

export type HeadingVariants = VariantProps<typeof headingVariants>;
