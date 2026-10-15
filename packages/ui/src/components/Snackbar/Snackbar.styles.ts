import { cva } from 'class-variance-authority';

/**
 * Bottom of the screen, above anything pinned there (pages set --toast-offset-bottom to a bar's
 * height) and the home indicator. Full width minus margins on phones; a compact bar centred on
 * wider screens.
 */
export const snackbarHostVariants = cva(
  'pointer-events-none fixed inset-x-3 z-[110] flex justify-center bottom-[calc(0.75rem+env(safe-area-inset-bottom)+var(--toast-offset-bottom,0px))] transition-[bottom] duration-200 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2'
);

/** Inverse surface (dark bar, light text), as on Android and most shopping apps. */
export const snackbarVariants = cva(
  'pointer-events-auto flex w-full min-h-12 touch-pan-y select-none items-center gap-3 rounded-md bg-grey-950 py-2.5 pl-4 pr-2 font-sans text-grey-50 shadow-xl sm:w-auto sm:min-w-[22rem] sm:max-w-[36rem]',
  {
    variants: {
      open: {
        true: 'translate-y-0 opacity-100',
        false: 'translate-y-2 opacity-0',
      },
      animated: {
        true: 'transition-[transform,opacity] duration-200',
        false: 'transition-none',
      },
    },
    defaultVariants: { open: true, animated: true },
  }
);

export const snackbarIconVariants = cva('size-5 shrink-0', {
  variants: {
    variant: {
      default: 'hidden',
      info: 'text-grey-300',
      success: 'text-success',
      warning: 'text-warning',
      destructive: 'text-destructive',
    },
  },
  defaultVariants: { variant: 'default' },
});

/** Text action: light primary on the dark bar (high contrast), no button chrome. */
export const snackbarActionVariants = cva(
  'cursor-pointer shrink-0 rounded-sm px-2.5 py-2 text-body-3 font-bold uppercase tracking-wide text-primary-200 transition-colors hover:bg-grey-50/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grey-50'
);

export const snackbarCloseVariants = cva(
  'cursor-pointer flex size-8 shrink-0 items-center justify-center rounded-full text-grey-400 transition-colors hover:bg-grey-50/10 hover:text-grey-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grey-50'
);
