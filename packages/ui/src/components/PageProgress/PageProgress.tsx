'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import { pageProgressVariants, pageProgressBarVariants } from './PageProgress.styles';
import type { PageProgressProps } from './PageProgress.types';

/**
 * NProgress-style slim line fixed at the very top of the viewport. Mount it (or set
 * `loading={true}`) to show; unmount (or `loading={false}`) to fade out.
 *
 * Indeterminate mode (no `progress`): the bar sweeps left-to-right continuously until
 * loading ends, matching the Progress component's indeterminate style.
 * Determinate mode (`progress` 0–100): bar grows to the given percentage.
 */
export const PageProgress = React.forwardRef<HTMLDivElement, PageProgressProps>(
  ({ loading = true, progress, height = 3, zIndex = 9999, color = 'bg-primary', motion }, ref) => {
    const globalMotion = useGlobalAnimation();
    const { shouldAnimate } = resolveMotion(motion, globalMotion);

    const isIndeterminate = progress === undefined;
    const safeProgress = isIndeterminate ? undefined : Math.min(Math.max(progress, 0), 100);

    const [visible, setVisible] = React.useState(loading);
    const [fading, setFading] = React.useState(false);

    React.useEffect(() => {
      if (loading) {
        setVisible(true);
        setFading(false);
      } else if (visible) {
        if (!shouldAnimate) {
          setVisible(false);
          return;
        }
        setFading(true);
        const t = setTimeout(() => {
          setVisible(false);
          setFading(false);
        }, 350);
        return () => clearTimeout(t);
      }
    }, [loading, shouldAnimate]);

    if (!visible) return null;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeProgress}
        aria-label="Page loading"
        data-slot="page-progress"
        style={{ height, zIndex }}
        className={pageProgressVariants({ fading: fading && shouldAnimate })}
      >
        <div
          data-slot="page-progress-bar"
          className={cn(
            pageProgressBarVariants({
              indeterminate: isIndeterminate && !fading,
              animated: shouldAnimate,
            }),
            color,
            !isIndeterminate && shouldAnimate && 'transition-[width] duration-300 ease-out'
          )}
          style={isIndeterminate ? undefined : { width: `${safeProgress}%` }}
        />
      </div>
    );
  }
);
PageProgress.displayName = 'PageProgress';
