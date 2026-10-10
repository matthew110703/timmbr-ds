import { cva, type VariantProps } from 'class-variance-authority';

export const drawerOverlayVariants = cva(
  'fixed inset-0 z-50 bg-grey-1000/60 backdrop-blur-xs transition-opacity duration-300 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out'
);

export const drawerContentVariants = cva(
  'fixed z-50 flex flex-col gap-4 bg-grey-50 dark:bg-grey-900 p-6 shadow-2xl transition ease-in-out duration-300 font-sans text-foreground border-grey-200 dark:border-grey-800',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=open]:animate-slide-in-from-top data-[state=closed]:animate-slide-out-to-top',
        bottom: 'inset-x-0 bottom-0 border-t rounded-t-2xl max-h-[90dvh] pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] data-[state=open]:animate-slide-in-from-bottom data-[state=closed]:animate-slide-out-to-bottom',
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
  'flex shrink-0 flex-col space-y-1.5 text-left pr-8'
);

export const drawerFooterVariants = cva(
  'flex shrink-0 flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 mt-auto pt-4'
);

/** Scrolls on its own so the header and footer stay in view (bottom sheets with long forms). */
export const drawerBodyVariants = cva('-mx-6 min-h-0 flex-1 overflow-y-auto overscroll-contain px-6');

export const drawerTitleVariants = cva('text-h5 font-semibold leading-none tracking-tight text-foreground');

export const drawerDescriptionVariants = cva('text-body-2 text-muted-foreground leading-relaxed');

export type DrawerContentVariants = VariantProps<typeof drawerContentVariants>;
