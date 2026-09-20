import { cva } from 'class-variance-authority';

export const popoverContentVariants = cva(
  'z-50 w-72 rounded-md border border-grey-200 dark:border-grey-700 bg-white dark:bg-grey-900 p-4 text-foreground shadow-md outline-none font-sans transition-all duration-150 data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out'
);
