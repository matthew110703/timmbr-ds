import { cva } from 'class-variance-authority';

export const dialogOverlayVariants = cva(
  'fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-200 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out'
);

export const dialogContentVariants = cva(
  'relative pointer-events-auto grid w-full max-w-lg gap-4 rounded-xl border border-grey-200 dark:border-grey-800 bg-white dark:bg-grey-900 p-6 shadow-xl font-sans text-foreground data-[state=open]:animate-dialog-scale-in data-[state=closed]:animate-dialog-scale-out'
);

export const dialogHeaderVariants = cva(
  'flex flex-col space-y-1.5 text-left'
);

export const dialogFooterVariants = cva(
  'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 mt-4'
);

export const dialogTitleVariants = cva(
  'text-xl font-display font-semibold leading-none tracking-tight text-foreground'
);

export const dialogDescriptionVariants = cva(
  'text-sm text-muted-foreground font-sans leading-relaxed'
);
