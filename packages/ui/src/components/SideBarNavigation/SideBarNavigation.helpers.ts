import type { NavItem, NavSubItem } from './SideBarNavigation.types';

export const DEFAULT_STORAGE_KEY = 'timmbr_sidebar_collapsed';

/**
 * Checks if a specific route matches the current activePath.
 */
export function isRouteActive(href?: string, activePath?: string): boolean {
  let path = activePath;
  if (!path && typeof window !== 'undefined') {
    path = window.location.pathname;
  }

  if (!href || !path) return false;

  // Clean trailing slashes for normalized matching
  const cleanHref = href.length > 1 && href.endsWith('/') ? href.slice(0, -1) : href;
  const cleanActive = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;

  if (cleanHref === '/' || cleanHref === '') {
    return cleanActive === '/' || cleanActive === '';
  }

  return cleanActive === cleanHref || cleanActive.startsWith(`${cleanHref}/`);
}

/**
 * Checks if a NavItem or any of its nested children are active.
 */
export function isNavItemActive(item: NavItem, activePath?: string): boolean {
  if (item.href && isRouteActive(item.href, activePath)) {
    return true;
  }

  if (item.items && item.items.length > 0) {
    return item.items.some((sub: NavSubItem) => isRouteActive(sub.href, activePath));
  }

  return false;
}

/**
 * Reads the stored collapsed state from localStorage (guarded against SSR).
 */
export function readStoredCollapsed(storageKey: string | false, fallback: boolean): boolean {
  if (typeof window === 'undefined' || storageKey === false) {
    return fallback;
  }

  try {
    const item = window.localStorage.getItem(storageKey);
    if (item !== null) {
      return item === 'true';
    }
  } catch {
    // Ignore storage access errors (e.g. private browsing mode)
  }

  return fallback;
}

/**
 * Persists the collapsed state to both localStorage and a lightweight document cookie.
 */
export function writeStoredCollapsed(storageKey: string | false, isCollapsed: boolean): void {
  if (typeof window === 'undefined' || storageKey === false) {
    return;
  }

  try {
    window.localStorage.setItem(storageKey, String(isCollapsed));
    // Persist as cookie for server-side layout hydration
    document.cookie = `${storageKey}=${isCollapsed}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {
    // Ignore storage access errors
  }
}
