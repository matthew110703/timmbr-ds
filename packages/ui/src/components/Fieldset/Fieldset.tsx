import * as React from 'react';
import { cn } from '@timmbr/utils';
import { formatGap, type GapValue } from '../../utils/gap';
import { Text } from '../Text';

export interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /** Group title (an overline label above the fields). */
  legend: React.ReactNode;
  /** Space between the fields. @default 4 */
  gap?: GapValue;
}

/**
 * Groups related form fields under a label ("Contact", "Address"…). Fixes the
 * fieldset quirks: it can shrink (`min-w-0`) and the legend gets its spacing.
 */
export const Fieldset = React.forwardRef<HTMLFieldSetElement, FieldsetProps>(
  ({ legend, gap = 4, className, children, ...props }, ref) => (
    <fieldset
      ref={ref}
      data-slot="fieldset"
      className={cn('flex min-w-0 flex-col border-0 p-0 m-0', formatGap(gap), className)}
      {...props}
    >
      {/* A legend is not a flex item, so it carries its own bottom margin. */}
      <Text asChild variant="overline" foreground="muted">
        <legend data-slot="fieldset-legend" className="mb-3 p-0">
          {legend}
        </legend>
      </Text>
      {children}
    </fieldset>
  )
);
Fieldset.displayName = 'Fieldset';
