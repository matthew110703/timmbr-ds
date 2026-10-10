import type * as React from 'react';
import type * as TabsPrimitive from '@radix-ui/react-tabs';
import type { TabsListVariants, TabsTriggerVariants } from './Tabs.styles';
import type { MotionProp } from '../../types/motion';

export interface TabsProps extends TabsPrimitive.TabsProps {
  /**
   * Visual variant style for the tab strip.
   * @default 'pills'
   */
  variant?: 'underline' | 'pills' | 'outline';
  /**
   * Tab size.
   * @default 'default'
   */
  size?: 'sm' | 'default' | 'md' | 'lg';
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
}

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    TabsListVariants {
  /**
   * Let the tabs scroll sideways when they don't fit (e.g. on phones). Round
   * chevron buttons appear at the edges while there is more to scroll.
   * @default false
   */
  scrollable?: boolean;
  /** Accessible names of the scroll buttons. */
  scrollLabels?: { previous?: string; next?: string };
  /** Content for the selected tab is loading (e.g. after a URL change): dims the tabs and sets aria-busy. */
  loading?: boolean;
}

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    TabsTriggerVariants {
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
}

export interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
}
