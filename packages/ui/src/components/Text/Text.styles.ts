import { cva, type VariantProps } from 'class-variance-authority';

export const textVariants = cva('transition-colors', {
  variants: {
    variant: {
      // Each variant is the matching @timmbr/theme text style (size, line-height, weight, font).
      'body-1': 'text-body-1',
      'body-2': 'text-body-2',
      'body-2-medium': 'text-body-2-medium',
      'body-2-semibold': 'text-body-2-semibold',
      'body-2-light': 'text-body-2-light',
      'body-3': 'text-body-3',
      'body-3-light': 'text-body-3-light',
      'subtitle-1': 'text-subtitle-1',
      'subtitle-2': 'text-subtitle-2',
      caption: 'text-caption-lg tracking-wide',
      /** Small uppercase label above content (the caption token, semibold). */
      overline: 'text-caption-lg tracking-wide uppercase font-semibold',
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
    font: {
      // Text styles already use the sans font; other families override it.
      sans: '',
      display: 'font-display!',
      title: 'font-title!',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    /** Same-width digits (prices, coordinates, counters). */
    tabular: {
      true: 'tabular-nums',
      false: '',
    },
    /** One line, cut with an ellipsis. */
    truncate: {
      true: 'truncate',
      false: '',
    },
    italic: {
      true: 'italic',
      false: 'not-italic',
    },
  },
  defaultVariants: {
    variant: 'body-1',
    foreground: 'default',
    font: 'sans',
  },
});

export type TextVariants = VariantProps<typeof textVariants>;
