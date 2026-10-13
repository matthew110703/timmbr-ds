'use client';

import * as React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import {
  snackbarActionVariants,
  snackbarCloseVariants,
  snackbarIconVariants,
  snackbarVariants,
} from './Snackbar.styles';
import type { SnackbarProps } from './Snackbar.types';

const ICONS = {
  default: Info,
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  destructive: AlertCircle,
};

/** A drag this far (sideways or down) dismisses the snackbar. */
const SWIPE_DISMISS_PX = 48;

/**
 * One snackbar: message (and an optional second line), one inline action, a small close button.
 * It leaves on its own after `duration` (paused while hovered, focused or touched), when swiped
 * sideways or down, or when its action is used.
 */
export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  ({ item, onDismiss, dismissLabel = 'Dismiss', className, style, ...props }, ref) => {
    const variant = item.variant ?? 'default';
    const Icon = ICONS[variant];
    const duration = item.duration ?? (item.action ? 6000 : 4000);

    // Auto-dismiss, paused while the shopper is engaging with it.
    const [paused, setPaused] = React.useState(false);
    const remaining = React.useRef(duration);
    // A re-show of the same id (updated in place) gets a fresh countdown.
    React.useEffect(() => {
      remaining.current = duration;
    }, [item, duration]);
    React.useEffect(() => {
      if (!item.open || paused || duration === Infinity) return;
      const started = Date.now();
      const timer = setTimeout(onDismiss, remaining.current);
      return () => {
        clearTimeout(timer);
        remaining.current -= Date.now() - started;
      };
    }, [item, paused, duration, onDismiss]);

    // Swipe to dismiss (pointer events: touch, pen or mouse drag).
    const start = React.useRef<{ x: number; y: number } | null>(null);
    const [drag, setDrag] = React.useState({ x: 0, y: 0 });
    const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
      if ((event.target as HTMLElement).closest('button')) return;
      start.current = { x: event.clientX, y: event.clientY };
      event.currentTarget.setPointerCapture?.(event.pointerId);
      setPaused(true);
    };
    const onPointerMove = (event: React.PointerEvent) => {
      if (!start.current) return;
      setDrag({
        x: event.clientX - start.current.x,
        y: Math.max(0, event.clientY - start.current.y),
      });
    };
    const onPointerEnd = () => {
      if (!start.current) return;
      start.current = null;
      setPaused(false);
      if (Math.abs(drag.x) > SWIPE_DISMISS_PX || drag.y > SWIPE_DISMISS_PX) onDismiss();
      else setDrag({ x: 0, y: 0 });
    };
    const dragging = drag.x !== 0 || drag.y !== 0;

    return (
      <div
        ref={ref}
        data-slot="snackbar"
        data-variant={variant}
        data-state={item.open ? 'open' : 'closed'}
        className={cn(snackbarVariants({ open: item.open }), dragging && 'transition-none', className)}
        style={{
          ...style,
          ...(dragging && {
            transform: `translate(${drag.x}px, ${drag.y}px)`,
            opacity: Math.max(0.3, 1 - Math.max(Math.abs(drag.x), drag.y) / 200),
          }),
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        {...props}
      >
        <Icon aria-hidden="true" className={snackbarIconVariants({ variant })} />
        <div className="min-w-0 flex-1 py-1">
          <p className="text-body-2 font-medium leading-snug">{item.message}</p>
          {item.description && <p className="mt-0.5 text-body-3 leading-snug text-grey-300">{item.description}</p>}
        </div>
        {item.action && (
          <button
            type="button"
            className={snackbarActionVariants()}
            onClick={(event) => {
              item.action?.onClick(event);
              onDismiss();
            }}
          >
            {item.action.label}
          </button>
        )}
        <button type="button" aria-label={dismissLabel} className={snackbarCloseVariants()} onClick={onDismiss}>
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>
    );
  }
);
Snackbar.displayName = 'Snackbar';
