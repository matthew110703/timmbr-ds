import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Hide the child element instead (e.g. a heading that only screen readers need). */
  asChild?: boolean;
}

/** Content for screen readers only (kept in the accessibility tree, not shown). */
export const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';
    return <Comp ref={ref} data-slot="visually-hidden" className={cn('sr-only', className)} {...props} />;
  }
);
VisuallyHidden.displayName = 'VisuallyHidden';
