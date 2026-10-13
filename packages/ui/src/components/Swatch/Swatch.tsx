import * as React from 'react';
import { cn } from '@timmbr/utils';
import { swatchVariants } from './Swatch.styles';
import type { SwatchProps } from './Swatch.types';

/** Relative luminance of a #RRGGBB colour (0 dark … 1 light); null when not a hex colour. */
export function swatchLuminance(color: string): number | null {
  const match = /^#?([0-9a-f]{6})$/i.exec(color.trim());
  if (!match) return null;
  const n = parseInt(match[1], 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * A colour dot (finish, fabric, colour options). The colour comes from data, so it's passed as a
 * CSS variable rather than a class. Light colours get a border so they stay visible on white.
 * Decorative by default; pass `label` when the swatch is the only way the colour is named.
 */
export const Swatch = React.forwardRef<HTMLSpanElement, SwatchProps>(
  ({ color, size, selected, label, className, style, ...props }, ref) => {
    const luminance = swatchLuminance(color);
    return (
      <span
        ref={ref}
        data-slot="swatch"
        data-selected={selected ? '' : undefined}
        role={label ? 'img' : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
        className={cn(
          swatchVariants({ size, selected: !!selected, light: luminance !== null && luminance > 0.8 }),
          className
        )}
        style={{ ...style, ['--swatch' as string]: color }}
        {...props}
      />
    );
  }
);
Swatch.displayName = 'Swatch';
