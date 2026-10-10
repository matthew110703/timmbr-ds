'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@timmbr/utils';
import { motion } from '@timmbr/motion';
import { ChevronLeft, ChevronRight } from '@timmbr/icons';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import {
  tabsListVariants,
  tabsTriggerVariants,
  tabsContentVariants,
  tabsScrollButtonVariants,
  tabsScrollEdgeVariants,
  TABS_SCROLL_FADE,
} from './Tabs.styles';
import type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from './Tabs.types';

interface TabsContextValue {
  variant: 'pills' | 'underline' | 'outline';
  size: 'sm' | 'default' | 'md' | 'lg';
  activeTab?: string;
  setActiveTab: (val: string) => void;
  shouldAnimate: boolean;
  instanceId: string;
}

const TabsContext = React.createContext<TabsContextValue>({
  variant: 'pills',
  size: 'default',
  setActiveTab: () => {},
  shouldAnimate: true,
  instanceId: 'default',
});

export const Tabs = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Root>,
  TabsProps
>(
  (
    {
      className,
      variant = 'pills',
      size = 'default',
      motion: localMotion,
      value: controlledValue,
      defaultValue,
      onValueChange,
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string>(
      controlledValue ?? defaultValue ?? ''
    );

    const activeTab = controlledValue !== undefined ? controlledValue : internalValue;
    const globalMotion = useGlobalAnimation();
    const { shouldAnimate } = resolveMotion(localMotion, globalMotion);
    const rawId = React.useId();
    const instanceId = React.useMemo(() => rawId.replace(/[^a-zA-Z0-9_-]/g, ''), [rawId]);

    const handleValueChange = (val: string) => {
      if (controlledValue === undefined) {
        setInternalValue(val);
      }
      onValueChange?.(val);
    };

    return (
      <TabsContext.Provider
        value={{
          variant,
          size,
          activeTab,
          setActiveTab: handleValueChange,
          shouldAnimate,
          instanceId,
        }}
      >
        <TabsPrimitive.Root
          ref={ref}
          value={activeTab || undefined}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          data-slot="tabs"
          className={cn('w-full font-sans', className)}
          {...props}
        >
          {children}
        </TabsPrimitive.Root>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = TabsPrimitive.Root.displayName;

/** Which edges of a horizontally scrolling element still have content beyond them. */
function useScrollEdges(ref: React.RefObject<HTMLElement | null>, enabled: boolean) {
  const [edges, setEdges] = React.useState({ start: false, end: false });

  React.useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    const measure = () => {
      const max = el.scrollWidth - el.clientWidth;
      const next = { start: el.scrollLeft > 1, end: el.scrollLeft < max - 1 };
      setEdges((prev) => (prev.start === next.start && prev.end === next.end ? prev : next));
    };
    const frame = requestAnimationFrame(measure);
    el.addEventListener('scroll', measure, { passive: true });
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('scroll', measure);
      observer?.disconnect();
    };
  }, [ref, enabled]);

  return edges;
}

export const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant: localVariant, size: localSize, scrollable = false, scrollLabels, loading = false, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  const variant = localVariant ?? context.variant;
  const size = localSize ?? context.size;
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const edges = useScrollEdges(listRef, scrollable);

  const setRefs = (node: HTMLDivElement | null) => {
    listRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  // Fade the tabs out under the scroll buttons (works on any page background).
  const fade =
    scrollable && (edges.start || edges.end)
      ? `linear-gradient(to right, ${edges.start ? 'transparent' : '#000'}, #000 ${edges.start ? TABS_SCROLL_FADE : '0px'}, #000 calc(100% - ${edges.end ? TABS_SCROLL_FADE : '0px'}), ${edges.end ? 'transparent' : '#000'})`
      : undefined;

  const list = (
    <TabsPrimitive.List
      ref={setRefs}
      data-slot="tabs-list"
      aria-busy={loading || undefined}
      className={cn(
        tabsListVariants({ variant, size }),
        loading && 'opacity-70 transition-opacity',
        scrollable &&
          'max-w-full justify-start overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>*]:shrink-0',
        className
      )}
      {...props}
      style={fade ? { ...props.style, maskImage: fade, WebkitMaskImage: fade } : props.style}
    />
  );
  if (!scrollable) return list;

  // Pointer helpers only: keyboard users move between tabs with the arrow keys.
  const scrollByPage = (direction: -1 | 1) =>
    listRef.current?.scrollBy({ left: direction * listRef.current.clientWidth * 0.7, behavior: 'smooth' });

  return (
    <div className="relative" data-slot="tabs-scroll">
      {edges.start && (
        <div className={tabsScrollEdgeVariants({ side: 'start' })}>
          <button
            type="button"
            tabIndex={-1}
            aria-label={scrollLabels?.previous ?? 'Scroll tabs back'}
            data-slot="tabs-scroll-previous"
            className={tabsScrollButtonVariants()}
            onClick={() => scrollByPage(-1)}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
        </div>
      )}
      {list}
      {edges.end && (
        <div className={tabsScrollEdgeVariants({ side: 'end' })}>
          <button
            type="button"
            tabIndex={-1}
            aria-label={scrollLabels?.next ?? 'Scroll tabs forward'}
            data-slot="tabs-scroll-next"
            className={tabsScrollButtonVariants()}
            onClick={() => scrollByPage(1)}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(
  (
    {
      className,
      value,
      variant: localVariant,
      size: localSize,
      motion: triggerMotion,
      children,
      ...props
    },
    ref
  ) => {
    const context = React.useContext(TabsContext);
    const variant = localVariant ?? context.variant;
    const size = localSize ?? context.size;

    const globalMotion = useGlobalAnimation();
    const { shouldAnimate: triggerShouldAnimate, motionClass } = resolveMotion(
      triggerMotion,
      globalMotion
    );
    const shouldAnimate = context.shouldAnimate && triggerShouldAnimate;

    React.useEffect(() => {
      if (!context.activeTab && value) {
        context.setActiveTab(value);
      }
    }, []);

    const isActive = context.activeTab === value;

    return (
      <TabsPrimitive.Trigger
        ref={ref}
        value={value}
        data-slot="tabs-trigger"
        className={cn(
          'relative',
          tabsTriggerVariants({ variant, size }),
          !shouldAnimate && 'transition-none active:scale-100',
          // Static active styles when animation is disabled
          !shouldAnimate && isActive && variant === 'pills' && 'bg-primary text-grey-50 shadow-sm',
          !shouldAnimate && isActive && variant === 'underline' && 'border-b-2 border-primary text-primary font-semibold',
          !shouldAnimate && isActive && variant === 'outline' && 'bg-grey-200 dark:bg-grey-700 text-foreground',
          // Text styling when active with animation
          shouldAnimate && isActive && variant === 'pills' && 'text-grey-50',
          shouldAnimate && isActive && variant === 'underline' && 'text-primary font-semibold',
          shouldAnimate && isActive && variant === 'outline' && 'text-foreground',
          motionClass,
          className
        )}
        {...props}
      >
        {isActive && shouldAnimate && (
          <motion.div
            layoutId={`tabs-indicator-${context.instanceId}`}
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            className={cn(
              'absolute inset-0 pointer-events-none z-0',
              variant === 'pills' && 'rounded-sm bg-primary shadow-sm',
              variant === 'underline' && 'bottom-0 top-auto h-0.5 bg-primary rounded-none',
              variant === 'outline' && 'rounded-sm bg-grey-200 dark:bg-grey-700'
            )}
          />
        )}
        <span className="relative z-10 flex items-center justify-center gap-1.5">
          {children}
        </span>
      </TabsPrimitive.Trigger>
    );
  }
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, motion: contentMotion, ...props }, ref) => {
  const globalMotion = useGlobalAnimation();
  const { shouldAnimate, motionClass } = resolveMotion(contentMotion, globalMotion);

  return (
    <TabsPrimitive.Content
      ref={ref}
      data-slot="tabs-content"
      className={cn(
        tabsContentVariants(),
        !shouldAnimate && 'transition-none animate-none',
        motionClass,
        className
      )}
      {...props}
    />
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;
