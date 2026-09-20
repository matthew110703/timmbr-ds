'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@timmbr/utils';
import { motion, LayoutGroup } from '@timmbr/motion';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import {
  tabsListVariants,
  tabsTriggerVariants,
  tabsContentVariants,
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

export const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant: localVariant, size: localSize, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  const variant = localVariant ?? context.variant;
  const size = localSize ?? context.size;

  return (
    <TabsPrimitive.List
      ref={ref}
      data-slot="tabs-list"
      className={cn(tabsListVariants({ variant, size }), className)}
      {...props}
    />
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
          !shouldAnimate && isActive && variant === 'pills' && 'bg-primary text-white shadow-sm',
          !shouldAnimate && isActive && variant === 'underline' && 'border-b-2 border-primary text-primary font-semibold',
          !shouldAnimate && isActive && variant === 'outline' && 'bg-grey-200 dark:bg-grey-700 text-foreground',
          // Text styling when active with animation
          shouldAnimate && isActive && variant === 'pills' && 'text-white',
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
