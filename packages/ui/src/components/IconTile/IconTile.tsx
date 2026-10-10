import * as React from 'react';
import { cn } from '@timmbr/utils';
import { iconTileVariants } from './IconTile.styles';
import type { IconTileProps } from './IconTile.types';

/**
 * An icon in a tinted circle: list rows, section cards, settings rows.
 * Decorative by default; pass `label` when the icon carries meaning alone.
 */
export const IconTile = React.forwardRef<HTMLSpanElement, IconTileProps>(
  ({ className, size, tone, label, children, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="icon-tile"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(iconTileVariants({ size, tone }), className)}
      {...props}
    >
      {children}
    </span>
  )
);
IconTile.displayName = 'IconTile';
