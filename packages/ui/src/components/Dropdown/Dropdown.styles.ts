import { cva } from 'class-variance-authority';

export const dropdownContentVariants = cva(
  'z-50 min-w-[8rem] overflow-hidden rounded-md border border-grey-200 dark:border-grey-700 bg-grey-50 dark:bg-grey-900 p-1 text-foreground shadow-lg font-sans transition-all duration-150 data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out'
);

export const dropdownItemVariants = cva(
  'relative flex cursor-pointer select-none items-center rounded-sm px-2.5 py-1.5 text-body-2 outline-none transition-colors hover:bg-grey-100 dark:hover:bg-grey-800 focus:bg-grey-100 dark:focus:bg-grey-800 focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  {
    variants: {
      destructive: {
        true: 'text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive dark:hover:bg-destructive/15 dark:focus:bg-destructive/15',
        false: '',
      },
    },
    defaultVariants: { destructive: false },
  }
);

/** Leading icon of a menu item. */
export const dropdownItemIconVariants = cva('flex size-4 shrink-0 items-center justify-center [&_svg]:size-4');
