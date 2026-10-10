import * as React from 'react';
import { cn } from '@timmbr/utils';
import { Star } from '@timmbr/icons';
import { ratingVariants } from './Rating.styles';
import type { RatingProps } from './Rating.types';

/** Read-only average rating: "4.5 ★ (817)". */
export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({ value, max = 5, count, locale = 'en-IN', label, size, className, ...props }, ref) => {
    const shown = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value);
    const counted = count !== undefined ? new Intl.NumberFormat(locale).format(count) : undefined;
    const accessibleName =
      label ?? `Rated ${shown} out of ${max}${counted !== undefined ? ` from ${counted} ratings` : ''}`;

    return (
      <div
        ref={ref}
        role="img"
        aria-label={accessibleName}
        data-slot="rating"
        className={cn(ratingVariants({ size }), className)}
        {...props}
      >
        <span aria-hidden="true" className="inline-flex items-center gap-0.5">
          <span className="font-medium">{shown}</span>
          <Star className="fill-warning text-warning" />
        </span>
        {counted !== undefined && (
          <span aria-hidden="true" className="text-muted-foreground">
            ({counted})
          </span>
        )}
      </div>
    );
  }
);
Rating.displayName = 'Rating';
