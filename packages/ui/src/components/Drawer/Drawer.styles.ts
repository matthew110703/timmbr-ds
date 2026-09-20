import { cva, type VariantProps } from 'class-variance-authority';

export const drawerOverlayVariants = cva(
  'fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out'
);

export const drawerContentVariants = cva(
  'fixed z-50 gap-4 bg-white dark:bg-grey-900 p-6 shadow-2xl transition ease-in-out duration-300 font-sans text-foreground border-grey-200 dark:border-grey-800',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=open]:animate-slide-in-from-top data-[state=closed]:animate-slide-out-to-top',
        bottom: 'inset-x-0 bottom-0 border-t rounded-t-2xl max-h-[85vh] data-[state=open]:animate-slide-in-from-bottom data-[state=closed]:animate-slide-out-to-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 max-w-sm border-r data-[state=open]:animate-slide-in-from-left data-[state=closed]:animate-slide-out-to-left',
        right: 'inset-y-0 right-0 h-full w-3/4 max-w-md border-l data-[state=open]:animate-slide-in-from-right data-[state=closed]:animate-slide-out-to-right',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);

export const drawerHeaderVariants = cva(
  'flex flex-col space-y-1.5 text-left'
);

export const drawerFooterVariants = cva(
  'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 mt-auto pt-4'
);

export type DrawerContentVariants = VariantProps<typeof drawerContentVariants>;
