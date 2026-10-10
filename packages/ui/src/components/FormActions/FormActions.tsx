import * as React from 'react';
import { cn } from '@timmbr/utils';

export interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Line above the buttons. */
  divider?: boolean;
  /** Where the buttons sit from `sm` up. @default 'end' */
  align?: 'start' | 'end' | 'between';
}

const ALIGN = { start: 'sm:justify-start', end: 'sm:justify-end', between: 'sm:justify-between' } as const;

/**
 * The buttons at the end of a form. Small screens stack them full width with
 * the primary (last) button on top; from `sm` up they sit in a row.
 */
export const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(
  ({ divider = false, align = 'end', className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="form-actions"
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:items-center',
        ALIGN[align],
        divider && 'border-t border-border pt-4',
        className
      )}
      {...props}
    />
  )
);
FormActions.displayName = 'FormActions';
