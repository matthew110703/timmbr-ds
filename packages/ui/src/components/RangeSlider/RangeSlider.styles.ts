import { cva, type VariantProps } from 'class-variance-authority';

export const rangeSliderRootVariants = cva(
  'relative flex w-full touch-none select-none items-center py-2'
);

export const rangeSliderTrackVariants = cva(
  'relative h-1 w-full grow overflow-hidden rounded-full bg-grey-300 dark:bg-grey-700'
);

export const rangeSliderRangeVariants = cva(
  'absolute h-full bg-primary rounded-full'
);

export const rangeSliderThumbVariants = cva(
  'block h-5 w-5 rounded-full border-2 border-primary bg-white shadow-md transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing'
);

export type RangeSliderVariants = VariantProps<typeof rangeSliderRootVariants>;
