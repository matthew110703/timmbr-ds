import { cva, type VariantProps } from 'class-variance-authority';

export const stepperVariants = cva('font-sans', {
  variants: {
    orientation: {
      horizontal: 'flex items-start',
      vertical: 'flex flex-col',
    },
  },
  defaultVariants: { orientation: 'horizontal' },
});

export const stepIndicatorVariants = cva(
  'relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-caption-lg font-semibold tabular-nums transition-colors',
  {
    variants: {
      state: {
        complete: 'border-primary bg-primary text-primary-foreground',
        current: 'border-primary bg-background text-primary',
        error: 'border-destructive bg-destructive text-destructive-foreground',
        upcoming: 'border-muted-foreground/40 bg-background text-muted-foreground',
      },
    },
    defaultVariants: { state: 'upcoming' },
  }
);

/** Line to the next step, behind the indicators. */
export const stepConnectorVariants = cva('absolute', {
  variants: {
    orientation: {
      horizontal: 'left-1/2 top-3.5 h-0.5 w-full',
      vertical: 'left-3.5 top-7 h-full w-0.5 -translate-x-1/2',
    },
    complete: {
      true: 'bg-primary',
      false: 'bg-border',
    },
  },
  defaultVariants: { orientation: 'horizontal', complete: false },
});

export type StepperVariants = VariantProps<typeof stepperVariants>;

// ── Progress variant styles ──────────────────────────────────────────────────

export const stepProgressIndicatorVariants = cva(
  'relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
  {
    variants: {
      state: {
        complete: 'border-primary bg-primary text-primary-foreground',
        current:  'border-primary bg-background text-primary ring-4 ring-primary/15',
        error:    'border-destructive bg-destructive text-destructive-foreground',
        upcoming: 'border-dashed border-muted-foreground/30 bg-background text-muted-foreground',
      },
    },
    defaultVariants: { state: 'upcoming' },
  }
);

export const stepProgressConnectorVariants = cva(
  'absolute left-1/2 top-5 h-0.5 w-full',
  {
    variants: {
      state: {
        complete: 'bg-primary',
        current:  'bg-primary',
        error:    'bg-destructive',
        upcoming: 'bg-border',
      },
    },
    defaultVariants: { state: 'upcoming' },
  }
);

export const stepProgressBadgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-caption-lg font-medium',
  {
    variants: {
      state: {
        complete: 'border-transparent bg-success/10 text-success',
        current:  'border-transparent bg-primary/10 text-primary',
        error:    'border-transparent bg-destructive/10 text-destructive',
        upcoming: 'border border-border bg-transparent text-muted-foreground',
      },
    },
    defaultVariants: { state: 'upcoming' },
  }
);
