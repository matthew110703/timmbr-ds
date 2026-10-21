'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';
import { motion } from '@timmbr/motion';
import { usePrevious } from '@timmbr/hooks';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import { panelVariants } from './Panel.styles';
import {
  usePanelResize,
  usePanelCollapse,
  animatePanelSize,
  resolvePanelSizes,
  usePanelSnapCoordination,
} from './Panel.helpers';
import { PanelContext } from './Panel.context';
import type { PanelPadding } from './Panel.context';
import { PanelResizeHandle } from './subcomponents/PanelResizeHandle';
import type { PanelProps } from './Panel.types';

export const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  (
    {
      className,
      variant,
      padding,
      placement = 'inline',
      sectioned = false,
      asChild = false,
      resizable = false,
      minSize,
      maxSize,
      defaultSize,
      onResize,
      collapsible = false,
      collapsed: controlledCollapsed,
      defaultCollapsed = false,
      collapsedSize,
      onCollapsedChange,
      snapToCollapse = true,
      motion: motionProp,
      children,
      ...props
    },
    ref
  ) => {
    const globalMotion = useGlobalAnimation();
    const { shouldAnimate, motionClass } = resolveMotion(motionProp, globalMotion);

    const rawId = React.useId();
    const panelId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');

    const containerRef = React.useRef<HTMLDivElement>(null);

    const resolvedPlacement = placement ?? 'inline';

    const { isH, resolvedMin, resolvedMax, resolvedDefault, resolvedCollapsedSize } =
      resolvePanelSizes(resizable, resolvedPlacement, minSize, maxSize, defaultSize, collapsedSize);

    // Motion value starts at the correct size for the initial collapsed state.
    const isInitiallyCollapsed = collapsible && (defaultCollapsed || controlledCollapsed === true);
    const initialMotionValue = isInitiallyCollapsed ? resolvedCollapsedSize : resolvedDefault;

    // Tracks the last expanded size so collapse→expand always returns to where
    // the user left off rather than the defaultSize.
    const expandedSizeRef = React.useRef(isInitiallyCollapsed ? resolvedDefault : initialMotionValue);

    const { isResizing, sizeMotionValue, handleProps } = usePanelResize({
      containerRef,
      resizable,
      placement: resolvedPlacement,
      minSize: resolvedMin,
      maxSize: resolvedMax,
      defaultSize: resolvedDefault,
      initialValue: initialMotionValue,
      onResize: (newSize) => {
        expandedSizeRef.current = newSize;
        onResize?.(newSize);
      },
    });

    const { collapsed, toggle } = usePanelCollapse({
      collapsible,
      collapsed: controlledCollapsed,
      defaultCollapsed,
      onCollapsedChange,
    });

    // Animate the panel size when collapse state changes.
    // prevCollapsed guards against firing on initial mount and on re-renders
    // where collapsed itself didn't change (e.g. only shouldAnimate changed).
    const prevCollapsed = usePrevious(collapsed);
    React.useEffect(() => {
      if (!collapsible || prevCollapsed === undefined || prevCollapsed === collapsed) return;
      animatePanelSize(
        sizeMotionValue,
        collapsed ? resolvedCollapsedSize : expandedSizeRef.current,
        shouldAnimate
      );
    }, [collapsed, collapsible, resolvedCollapsedSize, sizeMotionValue, shouldAnimate]);

    const coordHandleProps = usePanelSnapCoordination({
      activelySnapping: collapsible && resizable !== false && snapToCollapse,
      handleProps,
      collapsed,
      sizeMotionValue,
      resolvedMin,
      resolvedCollapsedSize,
      toggle,
      isH,
      placement: resolvedPlacement,
      expandedSizeRef,
    });

    const context = React.useMemo(
      () => ({
        sectioned,
        padding: (padding ?? 'default') as PanelPadding,
        collapsed,
        collapsible,
        shouldAnimate,
        panelId,
        placement: resolvedPlacement,
        onToggleCollapse: toggle,
      }),
      [sectioned, padding, collapsed, collapsible, shouldAnimate, panelId, resolvedPlacement, toggle]
    );

    const needsSizeControl = resizable !== false || collapsible;
    const dimension = isH ? 'width' : 'height';

    // Compute which edge the handle sits on based on placement.
    const handleEdge: 'left' | 'right' | 'bottom' =
      resizable === 'horizontal'
        ? resolvedPlacement === 'right' ? 'left' : 'right'
        : 'bottom';

    const rootClasses = cn(
      panelVariants({ variant, padding, sectioned, placement }),
      needsSizeControl && 'overflow-hidden',
      !shouldAnimate && 'transition-none animate-none',
      motionClass,
      className
    );

    const combinedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    const rootContent = (
      <PanelContext.Provider value={context}>
        {children}
        {resizable !== false && (
          <PanelResizeHandle
            direction={handleEdge}
            isResizing={isResizing}
            handleProps={coordHandleProps}
          />
        )}
      </PanelContext.Provider>
    );

    if (asChild) {
      return (
        <Slot
          ref={ref}
          data-slot="panel"
          data-collapsed={collapsed || undefined}
          className={rootClasses}
          {...props}
        >
          {rootContent}
        </Slot>
      );
    }

    // When resize or collapsible, bind the motion value to the size dimension.
    // Cast via unknown to bridge the React/motion event-handler type gap.
    if (needsSizeControl && shouldAnimate) {
      type MotionDivProps = React.ComponentPropsWithoutRef<typeof motion.div>;
      return (
        <motion.div
          ref={combinedRef as React.Ref<HTMLDivElement>}
          data-slot="panel"
          data-collapsed={collapsed || undefined}
          className={rootClasses}
          style={{ [dimension]: sizeMotionValue } as React.CSSProperties}
          {...(props as unknown as MotionDivProps)}
        >
          {rootContent}
        </motion.div>
      );
    }

    // Static path: plain div with inline style for size.
    const staticStyle = needsSizeControl
      ? { [dimension]: collapsed ? resolvedCollapsedSize : sizeMotionValue.get(), ...(props.style ?? {}) }
      : (props.style ?? undefined);

    return (
      <div
        ref={combinedRef}
        data-slot="panel"
        data-collapsed={collapsed || undefined}
        className={rootClasses}
        style={staticStyle}
        {...props}
      >
        {rootContent}
      </div>
    );
  }
);
Panel.displayName = 'Panel';
