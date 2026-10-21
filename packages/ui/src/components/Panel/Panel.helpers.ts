import * as React from 'react';
import { useControllableState } from '@timmbr/hooks';
import { useMotionValue, animate } from '@timmbr/motion';

// ── Default size constants ───────────────────────────────────────────────────

export const DEFAULT_H_MIN = 120;
export const DEFAULT_H_MAX = 640;
export const DEFAULT_H_SIZE = 320;
export const DEFAULT_H_COLLAPSED = 40;

export const DEFAULT_V_MIN = 80;
export const DEFAULT_V_MAX = 480;
export const DEFAULT_V_SIZE = 240;
export const DEFAULT_V_COLLAPSED = 40;

// ── resolvePanelSizes ────────────────────────────────────────────────────────

export interface PanelSizes {
  isH: boolean;
  resolvedMin: number;
  resolvedMax: number;
  resolvedDefault: number;
  resolvedCollapsedSize: number;
}

/**
 * Derives the concrete px values for min/max/default/collapsed from the
 * raw props, falling back to axis-specific defaults.
 *
 * Side panels (left/right) always collapse along the horizontal axis;
 * only inline panels with resizable='vertical' use the vertical axis.
 */
export function resolvePanelSizes(
  resizable: false | 'horizontal' | 'vertical',
  placement: 'inline' | 'left' | 'right',
  minSize?: number,
  maxSize?: number,
  defaultSize?: number,
  collapsedSize?: number,
): PanelSizes {
  const isH = resizable === 'horizontal' || placement === 'right' || placement === 'left';
  return {
    isH,
    resolvedMin:           minSize       ?? (isH ? DEFAULT_H_MIN       : DEFAULT_V_MIN),
    resolvedMax:           maxSize       ?? (isH ? DEFAULT_H_MAX       : DEFAULT_V_MAX),
    resolvedDefault:       defaultSize   ?? (isH ? DEFAULT_H_SIZE      : DEFAULT_V_SIZE),
    resolvedCollapsedSize: collapsedSize ?? (isH ? DEFAULT_H_COLLAPSED : DEFAULT_V_COLLAPSED),
  };
}

// ── Types ────────────────────────────────────────────────────────────────────

export interface UsePanelResizeOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  resizable: false | 'horizontal' | 'vertical';
  /** Which edge the panel is docked to — determines whether delta should be inverted. */
  placement?: 'inline' | 'left' | 'right';
  minSize: number;
  maxSize: number;
  defaultSize: number;
  /** Starting size for the motion value — may differ from defaultSize when initially collapsed. */
  initialValue?: number;
  onResize?: (size: number) => void;
}

export interface UsePanelResizeReturn {
  size: number;
  isResizing: boolean;
  /** Live motion value driving the panel's inline width/height — also used by the collapse spring. */
  sizeMotionValue: ReturnType<typeof useMotionValue<number>>;
  handleProps: React.HTMLAttributes<HTMLDivElement> & { 'data-resizing'?: string };
}

export interface UsePanelCollapseOptions {
  collapsible: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export interface UsePanelCollapseReturn {
  collapsed: boolean;
  toggle: () => void;
}

// ── usePanelResize ───────────────────────────────────────────────────────────

/**
 * Manages drag-to-resize behaviour for the Panel.
 *
 * During drag, `sizeMotionValue` is updated directly for zero-stutter 60fps
 * tracking. The collapse spring in Panel.tsx reuses the same motion value so
 * both interactions drive the element through a single binding.
 *
 * When animations are disabled, the same code path runs — motion values still
 * work as plain reactive values; only the spring in the collapse path is skipped.
 */
export function usePanelResize({
  containerRef: _containerRef,
  resizable,
  placement = 'inline',
  minSize,
  maxSize,
  defaultSize,
  initialValue,
  onResize,
}: UsePanelResizeOptions): UsePanelResizeReturn {
  const [size, setSize] = React.useState(defaultSize);
  const [isResizing, setIsResizing] = React.useState(false);
  const sizeMotionValue = useMotionValue(initialValue ?? defaultSize);

  const dragStartPos = React.useRef(0);
  const dragStartSize = React.useRef(defaultSize);

  const clamp = React.useCallback(
    (v: number) => Math.min(maxSize, Math.max(minSize, v)),
    [minSize, maxSize]
  );

  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (resizable === false) return;
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dragStartPos.current = resizable === 'horizontal' ? e.clientX : e.clientY;
      dragStartSize.current = sizeMotionValue.get();
      setIsResizing(true);
    },
    [resizable, sizeMotionValue]
  );

  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!e.buttons || resizable === false) return;
      const rawDelta =
        (resizable === 'horizontal' ? e.clientX : e.clientY) - dragStartPos.current;
      // Right-docked panels have their handle on the LEFT edge.
      // Dragging left (negative clientX delta) should grow the panel → invert.
      const delta = placement === 'right' ? -rawDelta : rawDelta;
      const next = clamp(dragStartSize.current + delta);
      sizeMotionValue.set(next);
    },
    [resizable, placement, clamp, sizeMotionValue]
  );

  const handlePointerUp = React.useCallback(() => {
    if (!isResizing) return;
    const final = sizeMotionValue.get();
    setIsResizing(false);
    setSize(final);
    onResize?.(final);
  }, [isResizing, sizeMotionValue, onResize]);

  const handleProps: UsePanelResizeReturn['handleProps'] = {
    role: 'separator',
    'aria-label': resizable === 'horizontal' ? 'Resize panel width' : 'Resize panel height',
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
    ...(isResizing ? { 'data-resizing': 'true' } : {}),
  };

  return { size, isResizing, sizeMotionValue, handleProps };
}

// ── animateCollapse ──────────────────────────────────────────────────────────

/**
 * Imperatively spring-animates the panel size motion value to a target.
 * Called from Panel.tsx when the collapse state changes.
 */
export function animatePanelSize(
  motionValue: ReturnType<typeof useMotionValue<number>>,
  target: number,
  shouldAnimate: boolean
): void {
  if (shouldAnimate) {
    animate(motionValue, target, {
      type: 'tween',
      duration: 0.2,
      ease: [0.25, 1, 0.5, 1],
    });
  } else {
    motionValue.set(target);
  }
}

// ── usePanelCollapse ─────────────────────────────────────────────────────────

/**
 * Manages controlled/uncontrolled collapse state for the Panel toggle button.
 */
export function usePanelCollapse({
  collapsible,
  collapsed,
  defaultCollapsed = false,
  onCollapsedChange,
}: UsePanelCollapseOptions): UsePanelCollapseReturn {
  const [isCollapsed, setIsCollapsed] = useControllableState({
    value: collapsed,
    defaultValue: defaultCollapsed,
    onChange: onCollapsedChange,
  });

  const toggle = React.useCallback(() => {
    if (!collapsible) return;
    setIsCollapsed((prev) => !prev);
  }, [collapsible, setIsCollapsed]);

  return { collapsed: isCollapsed ?? false, toggle };
}

// ── usePanelSnapCoordination ─────────────────────────────────────────────────

export interface UsePanelSnapCoordinationOptions {
  /** Whether snap-to-collapse coordination is active (requires collapsible + resizable + snapToCollapse). */
  activelySnapping: boolean;
  handleProps: UsePanelResizeReturn['handleProps'];
  collapsed: boolean;
  sizeMotionValue: ReturnType<typeof useMotionValue<number>>;
  resolvedMin: number;
  resolvedCollapsedSize: number;
  toggle: () => void;
  isH: boolean;
  placement: 'inline' | 'left' | 'right';
  /** Mutable ref tracking the last expanded size — owned by Panel root, shared here. */
  expandedSizeRef: React.MutableRefObject<number>;
}

/**
 * Wraps the resize handle props to coordinate snap-to-collapse behaviour:
 *
 * EXPANDING (panel is collapsed):
 *   - A bare click must NOT expand. Panel stays at collapsedSize until drag crosses minSize.
 *   - Once the threshold is crossed the panel expands and normal resize takes over.
 *
 * COLLAPSING (panel is expanded):
 *   - When the user releases at minSize (the clamped floor), they wanted to go smaller —
 *     the panel smooth-animates to collapsedSize.
 */
export function usePanelSnapCoordination({
  activelySnapping,
  handleProps,
  collapsed,
  sizeMotionValue,
  resolvedMin,
  resolvedCollapsedSize,
  toggle,
  isH,
  placement,
  expandedSizeRef,
}: UsePanelSnapCoordinationOptions): UsePanelResizeReturn['handleProps'] {
  // Whether the current drag started from a collapsed state (expand direction).
  const dragFromCollapsedRef = React.useRef(false);
  // Whether we are waiting for the drag to cross minSize before expanding.
  const pendingExpandRef = React.useRef(false);
  // Pointer position at the start of a pending-expand drag.
  const pendingDragStartPos = React.useRef(0);

  return React.useMemo(() => {
    if (!activelySnapping) return handleProps;

    type HP = React.HTMLAttributes<HTMLDivElement>;
    const origDown = handleProps.onPointerDown as HP['onPointerDown'];
    const origMove = handleProps.onPointerMove as HP['onPointerMove'];
    const origUp   = handleProps.onPointerUp   as HP['onPointerUp'];

    return {
      ...handleProps,

      onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
        if (collapsed) {
          // Start watching the drag — but do NOT expand yet.
          pendingExpandRef.current     = true;
          dragFromCollapsedRef.current = true;
          pendingDragStartPos.current  = isH ? e.clientX : e.clientY;
          // Don't toggle, don't move sizeMotionValue — origDown records
          // sizeMotionValue.get() = collapsedSize as the drag start size.
        } else {
          pendingExpandRef.current     = false;
          dragFromCollapsedRef.current = false;
        }
        origDown?.(e);
      },

      onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => {
        if (!pendingExpandRef.current) {
          // Normal expanded resize — delegate entirely.
          origMove?.(e);
          return;
        }
        // Pending-expand mode: measure how far the user has dragged.
        const curPos   = isH ? e.clientX : e.clientY;
        const rawDelta = curPos - pendingDragStartPos.current;
        // Invert for right-panel (dragging LEFT increases size).
        const delta   = placement === 'right' ? -rawDelta : rawDelta;
        const wouldBe = resolvedCollapsedSize + delta;

        if (wouldBe >= resolvedMin) {
          // Threshold crossed — expand now and hand off to normal resize.
          pendingExpandRef.current = false;
          expandedSizeRef.current  = resolvedMin;
          toggle();      // collapsed → false (effect animates resolvedMin→resolvedMin, a no-op)
          origMove?.(e); // usePanelResize computes the same position independently ✓
        }
        // Below threshold: do nothing — panel stays at collapsedSize.
      },

      onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => {
        const wasPending = pendingExpandRef.current;
        pendingExpandRef.current = false;

        origUp?.(e); // always fires setIsResizing(false) etc.

        if (wasPending) {
          // Released before reaching minSize — panel stays collapsed.
          // Repair expandedSizeRef which origUp may have clobbered with collapsedSize.
          expandedSizeRef.current      = resolvedMin;
          dragFromCollapsedRef.current = false;
          return;
        }

        if (dragFromCollapsedRef.current) {
          // This drag expanded the panel — skip the collapse check.
          dragFromCollapsedRef.current = false;
          return;
        }

        // Expanded drag released at minSize → smooth collapse.
        if (!collapsed && sizeMotionValue.get() <= resolvedMin) {
          expandedSizeRef.current = resolvedMin;
          toggle(); // effect tweens from minSize → collapsedSize
        }
      },
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activelySnapping, handleProps, collapsed, sizeMotionValue, resolvedMin, resolvedCollapsedSize, toggle, isH, placement]);
}
