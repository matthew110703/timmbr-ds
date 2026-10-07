import { cva, type VariantProps } from 'class-variance-authority';

export const labelVariants = cva(
  'font-sans font-semibold tracking-wide text-foreground select-none leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      size: {
        sm: 'text-body-3',
        default: 'text-body-2',
        md: 'text-body-2',
        lg: 'text-body-1',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type LabelVariants = VariantProps<typeof labelVariants>;
