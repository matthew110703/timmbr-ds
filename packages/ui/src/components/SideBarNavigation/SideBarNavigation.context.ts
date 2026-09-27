'use client';

import * as React from 'react';

export interface SidebarContextValue {
  collapsed: boolean;
  shouldAnimate: boolean;
  motionClass?: string;
  activePath?: string;
  linkComponent?: React.ComponentType<{
    href: string;
    children: React.ReactNode;
    className?: string;
  }>;
}

export const SidebarContext = React.createContext<SidebarContextValue>({
  collapsed: false,
  shouldAnimate: true,
});

export const useSidebarContext = () => React.useContext(SidebarContext);
