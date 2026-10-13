import * as React from 'react';
import { cn } from '@timmbr/utils';
import { stockMeterFillVariants, stockMeterTrackVariants, stockMeterVariants } from './StockMeter.styles';
import type { StockMeterProps } from './StockMeter.types';

/**
 * "Only 3 left" urgency line with a short bar. Renders nothing above `threshold` or when sold
 * out (urgency only helps while it's true and the item can still be bought).
 */
export const StockMeter = React.forwardRef<HTMLDivElement, StockMeterProps>(
  ({ available, threshold = 5, label, className, ...props }, ref) => {
    if (available <= 0 || available > threshold) return null;
    const text = label ? label(available) : `Hurry! Only ${available} left in stock`;
    // Fewer left → shorter bar; never empty, so one unit still reads as a sliver.
    const fill = Math.max(8, Math.round((available / (threshold * 2)) * 100));
    return (
      <div ref={ref} data-slot="stock-meter" className={cn(stockMeterVariants(), className)} {...props}>
        <p className="text-body-2 font-semibold text-primary">{text}</p>
        <div className={stockMeterTrackVariants()} aria-hidden="true">
          <div className={stockMeterFillVariants()} style={{ width: `${fill}%` }} />
        </div>
      </div>
    );
  }
);
StockMeter.displayName = 'StockMeter';
