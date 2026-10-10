import { cva, type VariantProps } from 'class-variance-authority';

export const iconTileVariants = cva(
  'inline-flex shrink-0 items-center justify-center rounded-full',
  {
    variants: {
      size: {
        sm: 'size-8 [&_svg]:size-4',
        md: 'size-10 [&_svg]:size-5',
        lg: 'size-12 [&_svg]:size-6',
      },
      tone: {
        primary: 'bg-secondary text-secondary-foreground',
        neutral: 'bg-muted text-foreground',
        success: 'bg-success/10 text-success',
        warning: 'bg-warning/15 text-warning-foreground',
        destructive: 'bg-destructive/10 text-destructive',
      },
    },
    defaultVariants: { size: 'md', tone: 'primary' },
  }
);

export type IconTileVariants = VariantProps<typeof iconTileVariants>;
