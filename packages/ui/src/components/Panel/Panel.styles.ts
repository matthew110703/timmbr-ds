import { cva, type VariantProps } from 'class-variance-authority';

export const panelVariants = cva(
  'relative flex flex-col text-foreground font-sans',
  {
    variants: {
      variant: {
        outline:  'border border-grey-200 dark:border-grey-800 bg-card shadow-sm',
        elevated: 'border border-transparent bg-card shadow-md',
        subtle:   'border border-transparent bg-card',
        ghost:    'bg-transparent',
      },
      padding: {
        none:    'p-0',
        sm:      'p-4',
        default: 'p-6',
        lg:      'p-8',
      },
      sectioned: {
        true:  'p-0',
        false: '',
      },
      placement: {
        inline: 'rounded-[4px]',
        left:   'rounded-r-[4px] h-full shrink-0',
        right:  'rounded-l-[4px] h-full shrink-0',
      },
    },
    defaultVariants: {
      variant:   'outline',
      padding:   'default',
      sectioned: false,
      placement: 'inline',
    },
  }
);

export const panelSectionPadding = {
  none: '',
  sm: 'p-4',
  default: 'p-6',
  lg: 'p-8',
} as const;

export const panelSectionFooterPadding = {
  none: '',
  sm: 'px-4 py-2',
  default: 'px-6 py-3',
  lg: 'px-8 py-4',
} as const;

export const panelHeaderVariants = cva('flex flex-col gap-1.5', {
  variants: {
    sectioned: {
      true: '',
      false: 'mb-4',
    },
    divider: {
      true: 'border-b border-border',
      false: '',
    },
  },
  compoundVariants: [{ sectioned: false, divider: true, className: 'pb-4' }],
  defaultVariants: { sectioned: false, divider: false },
});

export const panelTitleVariants = cva(
  'text-h6 font-bold text-foreground leading-tight tracking-tight'
);

export const panelDescriptionVariants = cva(
  'text-body-2 text-muted-foreground leading-relaxed'
);

export const panelBodyVariants = cva('flex-1 min-h-0', {
  variants: {
    overflow: {
      auto: 'overflow-auto',
      hidden: 'overflow-hidden',
      visible: 'overflow-visible',
    },
    sectioned: {
      true: '',
      false: '',
    },
  },
  defaultVariants: { overflow: 'auto', sectioned: false },
});

export const panelFooterVariants = cva(
  'flex items-center gap-2 border-t border-border',
  {
    variants: {
      sectioned: {
        true: '',
        false: 'pt-4 mt-4',
      },
      justify: {
        start: 'justify-start',
        between: 'justify-between',
        end: 'justify-end',
      },
    },
    defaultVariants: { sectioned: false, justify: 'between' },
  }
);

export const panelResizeHandleVariants = cva(
  'absolute z-10 flex items-center justify-center select-none touch-none group transition-colors duration-100 hover:bg-primary/10 active:bg-primary/15',
  {
    variants: {
      direction: {
        left:   'left-0 inset-y-0 w-2 cursor-ew-resize',
        right:  'right-0 inset-y-0 w-2 cursor-ew-resize',
        bottom: 'bottom-0 inset-x-0 h-2 cursor-ns-resize',
      },
      resizing: {
        true:  'bg-primary/15',
        false: '',
      },
    },
    defaultVariants: { direction: 'left', resizing: false },
  }
);

export type PanelVariants = VariantProps<typeof panelVariants>;
export type PanelBodyVariants = VariantProps<typeof panelBodyVariants>;
export type PanelFooterVariants = VariantProps<typeof panelFooterVariants>;
export type PanelResizeHandleVariants = VariantProps<typeof panelResizeHandleVariants>;
