import * as React from 'react';
import { cn, formatCurrency } from '@timmbr/utils';
import {
  priceAmountVariants,
  priceCompareVariants,
  priceDiscountVariants,
  priceVariants,
} from './Price.styles';
import type { PriceProps } from './Price.types';

/** Whole-number saving of `amount` against `compareAt`, or `null` when there is none. */
export function discountPercent(amount: number, compareAt?: number | null): number | null {
  if (compareAt == null || compareAt <= 0 || compareAt <= amount) return null;
  const percent = Math.round(((compareAt - amount) / compareAt) * 100);
  return percent > 0 ? percent : null;
}

const defaultFormatDiscount = (percent: number) => `${percent}% Off`;

/**
 * A price with an optional struck-through original price and the saving,
 * e.g. ₹32,999 ~~₹66,999~~ 51% Off.
 */
export const Price = React.forwardRef<HTMLDivElement, PriceProps>(
  (
    {
      amount,
      compareAt,
      currency = 'INR',
      locale = 'en-IN',
      showDiscount = true,
      formatDiscount = defaultFormatDiscount,
      srLabels,
      size,
      className,
      ...props
    },
    ref
  ) => {
    const percent = discountPercent(amount, compareAt);

    return (
      <div ref={ref} data-slot="price" className={cn(priceVariants({ size }), className)} {...props}>
        <span className={priceAmountVariants({ size })} data-slot="price-amount">
          {srLabels?.price && <span className="sr-only">{srLabels.price} </span>}
          {formatCurrency(amount, currency, locale)}
        </span>
        {percent !== null && (
          <>
            <s className={priceCompareVariants({ size })} data-slot="price-compare">
              {srLabels?.compareAt && <span className="sr-only">{srLabels.compareAt} </span>}
              {formatCurrency(compareAt as number, currency, locale)}
            </s>
            {showDiscount && (
              <span className={priceDiscountVariants({ size })} data-slot="price-discount">
                {formatDiscount(percent)}
              </span>
            )}
          </>
        )}
      </div>
    );
  }
);
Price.displayName = 'Price';
