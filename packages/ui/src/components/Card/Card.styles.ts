import { cva, type VariantProps } from 'class-variance-authority';

export const cardVariants = cva(
  'rounded-[4px] text-foreground font-sans transition-all',
  {
    variants: {
      variant: {
        outline:
          'border border-grey-200 dark:border-grey-800 bg-card shadow-sm',
        elevated:
          'border border-transparent bg-card shadow-md hover:shadow-lg',
        subtle:
          'border border-transparent bg-card',
        interactive:
          'border border-grey-200 dark:border-grey-800 bg-card shadow-sm hover:border-primary hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        /** Flat, recessed panel inside other surfaces (forms, dialogs). */
        inset:
          'border border-border bg-bg-subtle',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        default: 'p-6',
        md: 'p-6',
        lg: 'p-8',
      },
      /** Highlighted (e.g. the default address, a chosen option). */
      selected: {
        true: 'border-primary/50',
        false: '',
      },
      /** Header / content / footer get the padding instead, with full-width dividers. */
      sectioned: {
        true: 'flex flex-col p-0',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'outline',
      padding: 'default',
      selected: false,
      sectioned: false,
    },
  }
);

/** Section padding of a `sectioned` card (follows the Card's `padding`). */
export const cardSectionPadding = {
  none: '',
  sm: 'p-4',
  default: 'p-6',
  md: 'p-6',
  lg: 'p-8',
} as const;

/** Footer of a `sectioned` card: the same side padding, shorter vertically. */
export const cardSectionFooterPadding = {
  none: '',
  sm: 'px-4 py-2',
  default: 'px-6 py-3',
  md: 'px-6 py-3',
  lg: 'px-8 py-4',
} as const;

export const cardHeaderVariants = cva('flex flex-col gap-1.5', {
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
export const cardTitleVariants = cva('text-h6 font-bold text-foreground leading-tight tracking-tight');
export const cardDescriptionVariants = cva('text-body-2 text-muted-foreground leading-relaxed');
export const cardContentVariants = cva('flex flex-col gap-4', {
  variants: {
    sectioned: { true: 'flex-1', false: '' },
  },
  defaultVariants: { sectioned: false },
});
export const cardFooterVariants = cva(
  'flex items-center gap-2 border-t border-border',
  {
    variants: {
      sectioned: { true: '', false: 'pt-4 mt-4' },
      justify: {
        start: 'justify-start',
        between: 'justify-between',
        end: 'justify-end',
      },
    },
    defaultVariants: { sectioned: false, justify: 'between' },
  }
);

export type CardVariants = VariantProps<typeof cardVariants>;
export type CardFooterVariants = VariantProps<typeof cardFooterVariants>;
