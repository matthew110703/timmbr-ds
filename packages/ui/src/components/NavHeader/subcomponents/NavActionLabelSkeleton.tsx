import * as React from 'react';
import { cn } from '@timmbr/utils';
import { skeletonVariants } from '../../Skeleton/Skeleton.styles';

/** Placeholder for an action label that isn't known yet (fills the label slot). */
export function NavActionLabelSkeleton() {
  return (
    <span
      aria-hidden="true"
      data-slot="nav-action-label-skeleton"
      className={cn(skeletonVariants({ variant: 'text' }), 'block h-3 align-middle')}
    />
  );
}
