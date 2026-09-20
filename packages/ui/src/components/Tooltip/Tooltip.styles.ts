import { cva } from 'class-variance-authority';

export const tooltipContentVariants = cva(
  'z-50 overflow-hidden rounded-md bg-grey-900 dark:bg-grey-100 px-3 py-1.5 text-xs text-white dark:text-grey-900 shadow-md font-sans transition-all duration-150 data-[state=delayed-open]:animate-scale-in data-[state=closed]:animate-scale-out'
);
