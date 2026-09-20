import { cva, type VariantProps } from 'class-variance-authority';

export const inlineVariants = cva('flex flex-row', {
  variants: {
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
  },
  defaultVariants: {
    align: 'center',
    justify: 'start',
    wrap: true,
  },
});

export type InlineVariants = VariantProps<typeof inlineVariants>;
