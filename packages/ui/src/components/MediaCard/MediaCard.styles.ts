import { cva, type VariantProps } from 'class-variance-authority';

export const mediaCardVariants = cva('group/media-card flex min-w-0 font-sans text-foreground', {
  variants: {
    orientation: {
      vertical: 'flex-col',
      horizontal: 'flex-row items-start',
    },
    variant: {
      plain: '',
      outline: 'rounded-lg border border-border bg-card p-3',
    },
    size: {
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-5',
    },
  },
  defaultVariants: { orientation: 'vertical', variant: 'plain', size: 'md' },
});

export const mediaCardMediaVariants = cva(
  'relative shrink-0 overflow-hidden rounded-md bg-muted [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>img]:transition-transform [&>img]:duration-500 [&>img]:ease-out',
  {
    variants: {
      orientation: {
        vertical: 'w-full',
        horizontal: '',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
      ratio: {
        square: 'aspect-square',
        portrait: 'aspect-[4/5]',
        landscape: 'aspect-[4/3]',
      },
    },
    compoundVariants: [
      { orientation: 'horizontal', size: 'sm', className: 'w-16' },
      { orientation: 'horizontal', size: 'md', className: 'w-20 sm:w-24' },
      { orientation: 'horizontal', size: 'lg', className: 'w-28 sm:w-32' },
    ],
    defaultVariants: { orientation: 'vertical', size: 'md', ratio: 'square' },
  }
);

export const mediaCardOverlayVariants = cva('absolute top-2 z-10 flex items-center gap-1', {
  variants: {
    position: {
      start: 'start-2',
      end: 'end-2',
    },
  },
});

export type MediaCardVariants = VariantProps<typeof mediaCardVariants>;
export type MediaCardMediaVariants = Pick<VariantProps<typeof mediaCardMediaVariants>, 'ratio'>;
