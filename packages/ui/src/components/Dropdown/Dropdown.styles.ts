import { cva } from 'class-variance-authority';

export const dropdownContentVariants = cva(
  'z-50 min-w-[8rem] overflow-hidden rounded-md border border-grey-200 dark:border-grey-700 bg-white dark:bg-grey-900 p-1 text-foreground shadow-lg font-sans transition-all duration-150 data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out'
);

export const dropdownItemVariants = cva(
  'relative flex cursor-pointer select-none items-center rounded-sm px-2.5 py-1.5 text-sm outline-none transition-colors hover:bg-grey-100 dark:hover:bg-grey-800 focus:bg-grey-100 dark:focus:bg-grey-800 focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
);
