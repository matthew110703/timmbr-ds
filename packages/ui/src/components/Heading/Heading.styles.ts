import { cva, type VariantProps } from 'class-variance-authority';

// Sizes, line-height and default family/weight come from the @timmbr/theme scale.
export const headingVariants = cva('transition-colors text-foreground', {
  variants: {
    level: {
      1: 'text-h1',
      2: 'text-h2',
      3: 'text-h3',
      4: 'text-h4',
      5: 'text-h5',
      6: 'text-h6',
    },
    font: {
      // The h* tokens already use the display font.
      display: '',
      // Override the token's family ("!" so it wins regardless of CSS order).
      title: 'font-title! font-bold',
    },
    foreground: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      subtle: 'text-grey-500 dark:text-grey-500',
      primary: 'text-primary',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive',
      success: 'text-success',
      warning: 'text-warning',
      white: 'text-grey-50',
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
