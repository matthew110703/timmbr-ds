import type * as React from 'react';
import type { PriceVariants } from './Price.styles';

export interface PriceProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, PriceVariants {
  /** Selling price. */
  amount: number;
  /** Original price; shown struck through when higher than `amount`. */
  compareAt?: number | null;
  /** ISO 4217 code (default `INR`). */
  currency?: string;
  /** BCP 47 locale for formatting (default `en-IN`). */
  locale?: string;
  /** Show the saving as a percentage, e.g. "51% Off" (default `true`). */
  showDiscount?: boolean;
  /** Text of the discount, from the rounded percentage (default `"51% Off"`). */
  formatDiscount?: (percent: number) => string;
  /** Screen-reader prefixes for the two prices. */
  srLabels?: { price?: string; compareAt?: string };
}
