import { cva, type VariantProps } from 'class-variance-authority';

export const textVariants = cva('font-sans transition-colors leading-[1.3]', {
  variants: {
    variant: {
      'body-1': 'text-[16px] font-normal',
      'body-2': 'text-[14px] font-normal',
      'body-2-medium': 'text-[14px] font-medium',
      'body-2-semibold': 'text-[14px] font-semibold',
      'body-2-light': 'text-[14px] font-light',
      'body-3': 'text-[12px] font-normal',
      'body-3-light': 'text-[12px] font-light',
      'subtitle-1': 'text-[18px] font-semibold',
      'subtitle-2': 'text-[18px] font-semibold',
      caption: 'text-[11px] font-normal tracking-wide',
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
    italic: {
      true: 'italic',
      false: 'not-italic',
    },
  },
  defaultVariants: {
    variant: 'body-1',
    foreground: 'default',
  },
});

export type TextVariants = VariantProps<typeof textVariants>;
