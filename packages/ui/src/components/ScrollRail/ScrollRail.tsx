'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import { motion, Presence, fadeVariants, hoverGestures, tapGestures } from '@timmbr/motion';
import { useGlobalAnimation } from '../../providers';
import {
  scrollRailWrapperVariants,
  scrollRailVariants,
  scrollRailChevronVariants,
} from './ScrollRail.styles';
import type { ScrollRailProps } from './ScrollRail.types';

const SCROLL_THRESHOLD = 4;

export const ScrollRail = React.forwardRef<HTMLDivElement, ScrollRailProps>(
  (
    {
      gap,
      scrollAmount,
      hideChevrons = false,
      labelPrev = 'Scroll left',
      labelNext = 'Scroll right',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const globalMotion = useGlobalAnimation();
    const trackRef = React.useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(false);

    const updateScrollState = React.useCallback(() => {
      const t = trackRef.current;
      if (!t) return;
      setCanScrollLeft(t.scrollLeft > SCROLL_THRESHOLD);
      setCanScrollRight(t.scrollLeft + t.clientWidth < t.scrollWidth - SCROLL_THRESHOLD);
    }, []);

    React.useLayoutEffect(() => {
      updateScrollState();
    }, [updateScrollState]);

    React.useEffect(() => {
      const t = trackRef.current;
      if (!t || typeof ResizeObserver === 'undefined') return;
      const ro = new ResizeObserver(updateScrollState);
      ro.observe(t);
      return () => ro.disconnect();
    }, [updateScrollState]);

    const getScrollAmount = () =>
      scrollAmount ?? (trackRef.current?.clientWidth ?? 320) * 0.8;

    const gestureProps = globalMotion
      ? { whileHover: hoverGestures.scale, whileTap: tapGestures.compress }
      : {};

    return (
      <div
        ref={ref}
        data-slot="scroll-rail"
        className={cn(scrollRailWrapperVariants(), className)}
        {...props}
      >
        <div
          ref={trackRef}
          data-slot="scroll-rail-track"
          className={scrollRailVariants({ gap })}
          onScroll={updateScrollState}
        >
          {children}
        </div>

        {!hideChevrons && (
          <Presence initial={false}>
            {canScrollLeft && (
              <motion.button
                key="scroll-rail-prev"
                type="button"
                aria-label={labelPrev}
                data-slot="scroll-rail-prev"
                className={scrollRailChevronVariants({ side: 'left' })}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeVariants}
                onClick={() =>
                  trackRef.current?.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' })
                }
                {...gestureProps}
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
              </motion.button>
            )}
          </Presence>
        )}

        {!hideChevrons && (
          <Presence initial={false}>
            {canScrollRight && (
              <motion.button
                key="scroll-rail-next"
                type="button"
                aria-label={labelNext}
                data-slot="scroll-rail-next"
                className={scrollRailChevronVariants({ side: 'right' })}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeVariants}
                onClick={() =>
                  trackRef.current?.scrollBy({ left: getScrollAmount(), behavior: 'smooth' })
                }
                {...gestureProps}
              >
                <ChevronRight aria-hidden="true" className="size-5" />
              </motion.button>
            )}
          </Presence>
        )}
      </div>
    );
  },
);

ScrollRail.displayName = 'ScrollRail';
