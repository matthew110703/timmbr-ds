import { cva } from 'class-variance-authority';

// Colours use palette tokens from @timmbr/theme (primary-*, grey-*, border-warm,
// sand-muted, destructive) and fonts use font-display / font-sans.

export const authModalContainerVariants = cva(
  'relative flex w-full max-w-[675px] bg-grey-50 overflow-hidden rounded-sm shadow-2xl flex-col sm:flex-row sm:min-h-[454px] max-h-[calc(100dvh-24px)] sm:max-h-[calc(100dvh-32px)]'
);

export const authModalBannerVariants = cva(
  'relative hidden sm:flex shrink-0 w-[320px] flex-col justify-between p-8 overflow-hidden select-none'
);

export const authModalCardVariants = cva(
  'flex-1 min-w-0 min-h-0 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto'
);

export const authModalHeadingVariants = cva(
  'text-h4 text-grey-950 tracking-tight outline-none'
);

export const authModalSubtitleVariants = cva('text-body-2 text-grey-600 mt-1.5');

export const authModalInputVariants = cva(
  'w-full px-4 py-3 rounded-lg border bg-grey-50 text-body-1 text-grey-950 placeholder:text-sand-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50',
  {
    variants: {
      invalid: {
        true: 'border-destructive',
        false: 'border-border-warm',
      },
    },
    defaultVariants: { invalid: false },
  }
);

export const authModalSubmitButtonVariants = cva(
  'w-full py-3 px-4 rounded-lg bg-primary text-grey-50 font-medium text-body-1 hover:bg-primary-600 active:bg-primary-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-sm'
);

export const authModalSecondaryButtonVariants = cva(
  'w-full py-3 px-4 rounded-lg border border-border-warm bg-grey-50 text-grey-950 font-medium text-body-2 hover:bg-bg-2 active:bg-bg-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer'
);

export const authModalLinkVariants = cva(
  'font-sans font-medium text-primary hover:underline cursor-pointer disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed focus:outline-none focus-visible:underline'
);
