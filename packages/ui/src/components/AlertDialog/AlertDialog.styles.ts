import { cva } from 'class-variance-authority';

export const alertDialogOverlayVariants = cva(
  'fixed inset-0 z-50 bg-grey-1000/60 backdrop-blur-xs transition-opacity duration-200 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out'
);

export const alertDialogContentVariants = cva(
  'relative pointer-events-auto flex flex-col w-full rounded-xl border border-grey-200 dark:border-grey-800 bg-grey-50 dark:bg-grey-900 shadow-xl font-sans text-foreground overflow-hidden p-6 gap-4 data-[state=open]:animate-dialog-scale-in data-[state=closed]:animate-dialog-scale-out',
  {
    variants: {
      size: {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

/** Title and description; a leading AlertDialogMedia gets more room. */
export const alertDialogHeaderVariants = cva(
  'flex flex-col gap-1.5 text-left has-[>[data-slot=alert-dialog-media]]:gap-3'
);

export const alertDialogBodyVariants = cva(
  'flex flex-col space-y-3 min-h-0'
);

export const alertDialogFooterVariants = cva(
  'flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 pt-2'
);

export const alertDialogTitleVariants = cva(
  'text-h6 font-semibold leading-none tracking-tight text-foreground'
);

export const alertDialogDescriptionVariants = cva(
  'text-body-2 text-muted-foreground leading-relaxed'
);


export const alertDialogMediaVariants = cva(
  'flex size-12 shrink-0 items-center justify-center rounded-full [&_svg]:size-6',
  {
    variants: {
      tone: {
        default: 'bg-primary/10 text-primary',
        destructive: 'bg-destructive/10 text-destructive',
        warning: 'bg-warning/15 text-warning-foreground',
      },
    },
    defaultVariants: { tone: 'default' },
  }
);
