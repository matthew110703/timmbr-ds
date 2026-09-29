import { cva } from 'class-variance-authority';

export const dialogOverlayVariants = cva(
  'fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-200 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out'
);

export const dialogContentVariants = cva(
  'relative pointer-events-auto flex flex-col w-full max-w-lg max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] rounded-xl border border-grey-200 dark:border-grey-800 bg-white dark:bg-grey-900 shadow-xl font-sans text-foreground overflow-hidden data-[state=open]:animate-dialog-scale-in data-[state=closed]:animate-dialog-scale-out'
);

export const dialogHeaderVariants = cva(
  'flex flex-col space-y-1.5 text-left p-6 pb-4 border-b border-grey-100 dark:border-grey-800/60 shrink-0 bg-white dark:bg-grey-900 pr-12'
);

export const dialogBodyVariants = cva(
  'flex-1 overflow-y-auto p-6 min-h-0'
);

export const dialogFooterVariants = cva(
  'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 p-6 pt-4 border-t border-grey-100 dark:border-grey-800/60 shrink-0 bg-white dark:bg-grey-900'
);

export const dialogTitleVariants = cva(
  'text-xl font-display font-semibold leading-none tracking-tight text-foreground'
);

export const dialogDescriptionVariants = cva(
  'text-sm text-muted-foreground font-sans leading-relaxed'
);
