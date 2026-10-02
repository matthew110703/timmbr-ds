'use client';

import * as React from 'react';
import type { NavHeaderProps, NavHeaderItem } from './NavHeader.types';

export interface NavHeaderContextValue {
  activeItemId: string | null;
  setActiveItemId: (id: string | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  shouldAnimate: boolean;
  motionClass?: string;
  linkComponent?: NavHeaderProps['linkComponent'];
  handleItemMouseEnter: (id: string) => void;
  handleItemMouseLeave: () => void;
  handleItemClick: (id: string, item: NavHeaderItem) => void;
  handleSearchSubmit: (query: string) => void;
}

export const NavHeaderContext = React.createContext<NavHeaderContextValue | null>(null);

export function useNavHeaderContext(): NavHeaderContextValue {
  const context = React.useContext(NavHeaderContext);
  if (!context) {
    throw new Error('useNavHeaderContext must be used within a NavHeader component tree');
  }
  return context;
}
