import { cva } from 'class-variance-authority';

export const alertDialogOverlayVariants = cva(
  'fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-200 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out'
);

export const alertDialogContentVariants = cva(
  'relative pointer-events-auto flex flex-col w-full max-w-lg rounded-xl border border-grey-200 dark:border-grey-800 bg-white dark:bg-grey-900 shadow-xl font-sans text-foreground overflow-hidden p-6 gap-4 data-[state=open]:animate-dialog-scale-in data-[state=closed]:animate-dialog-scale-out'
);

export const alertDialogHeaderVariants = cva(
  'flex flex-col space-y-1.5 text-left'
);

export const alertDialogBodyVariants = cva(
  'flex flex-col space-y-3 min-h-0'
);

export const alertDialogFooterVariants = cva(
  'flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 pt-2'
);

export const alertDialogTitleVariants = cva(
  'text-lg font-display font-semibold leading-none tracking-tight text-foreground'
);

export const alertDialogDescriptionVariants = cva(
  'text-sm text-muted-foreground font-sans leading-relaxed'
);

