import { cva, type VariantProps } from 'class-variance-authority';

export const dataListVariants = cva('font-sans text-foreground', {
  variants: {
    orientation: {
      horizontal: 'flex flex-col',
      vertical: 'flex flex-col',
    },
    size: {
      sm: 'text-xs gap-1.5',
      default: 'text-sm gap-2.5',
      lg: 'text-base gap-3.5',
    },
    divided: {
      true: 'divide-y divide-grey-200 dark:divide-grey-800',
      false: '',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'default',
    divided: false,
  },
});

export const dataListItemVariants = cva('flex', {
  variants: {
    orientation: {
      horizontal: 'flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6',
      vertical: 'flex-col gap-1',
    },
    align: {
      baseline: 'sm:items-baseline',
      center: 'sm:items-center',
      start: 'sm:items-start',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    align: 'baseline',
  },
});

export const dataListLabelVariants = cva(
  'font-medium text-grey-500 dark:text-grey-400 shrink-0 flex items-center gap-1.5 select-none'
);

export const dataListValueVariants = cva(
  'font-normal text-foreground flex-1 min-w-0'
);

export type DataListVariants = VariantProps<typeof dataListVariants>;
