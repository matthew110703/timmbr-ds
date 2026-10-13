import type * as React from 'react';

export interface StockMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Units that can still be bought. */
  available: number;
  /** Shows at or below this many units. Defaults to 5. */
  threshold?: number;
  /** Message for a count; defaults to "Hurry! Only N left in stock". */
  label?: (available: number) => string;
}
