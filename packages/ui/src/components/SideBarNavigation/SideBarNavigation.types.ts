import type * as React from 'react';
import type { MotionProps } from '../../types/motion';

export type NavBadgeVariant = 'primary' | 'secondary' | 'outline' | 'destructive';

export interface NavSubItem {
  id?: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode | number | string;
  badgeVariant?: NavBadgeVariant;
  disabled?: boolean;
}

export interface NavItem {
  id?: string;
  label: string;
  href?: string;
  icon: React.ReactNode;
  badge?: React.ReactNode | number | string;
  badgeVariant?: NavBadgeVariant;
  items?: NavSubItem[];
  disabled?: boolean;
}

export interface SidebarBrandingConfig {
  logo?: React.ReactNode;
  collapsedLogo?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  href?: string;
}

export interface SidebarProfileItem {
  id?: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

export interface SidebarProfileConfig {
  name: string;
  role?: string;
  email?: string;
  avatar?: React.ReactNode;
  fallback?: string;
  items?: SidebarProfileItem[];
  onClick?: () => void;
}

export interface SideBarNavigationProps extends MotionProps {
  items: NavItem[];
  activePath?: string;
  branding?: SidebarBrandingConfig;
  footer?: React.ReactNode | ((props: { collapsed: boolean }) => React.ReactNode);
  profile?: SidebarProfileConfig;
  showProfile?: boolean;
  collapsed?: boolean;

  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  storageKey?: string | false;
  linkComponent?: React.ComponentType<{
    href: string;
    children: React.ReactNode;
    className?: string;
  }>;
  className?: string;
  style?: React.CSSProperties;
}
