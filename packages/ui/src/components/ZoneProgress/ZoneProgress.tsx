'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { PageProgress } from '../PageProgress';

/**
 * Mount once in each zone's root layout (inside TimmbrConfigProvider).
 *
 * Handles three cases:
 * 1. Within-zone navigation — detects navigation start via a document click
 *    listener (fires synchronously before React commits, avoiding the race
 *    condition where usePathname updates in the same batch as pushState).
 *    Completes when usePathname reports the new path.
 * 2. Cross-zone click — same click listener picks up same-origin cross-zone
 *    links; the bar stays until the browser unloads the page.
 * 3. Cross-zone hover prefetch — on first mouseover of a cross-zone link, injects
 *    <link rel="prefetch"> so the target page is warm in the browser cache.
 */
/** Trickle increment table — slows as progress approaches the stall ceiling. */
function trickle(p: number): number {
  if (p < 20) return p + 5;
  if (p < 50) return p + 3;
  if (p < 70) return p + 2;
  if (p < 85) return p + 1;
  return p; // stall at 85 until navigation completes
}

export function ZoneProgress() {
  const pathname = usePathname();
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState<number | undefined>(undefined);
  const tickRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  // Track the last committed pathname so the popstate handler can guard against
  // hash-only back/forward (which fire popstate but don't change the route).
  const committedPathnameRef = React.useRef(pathname);
  React.useLayoutEffect(() => {
    committedPathnameRef.current = pathname;
  });

  const startProgress = React.useCallback(() => {
    if (tickRef.current) clearInterval(tickRef.current);
    setLoading(true);
    setProgress(5);
    tickRef.current = setInterval(() => {
      setProgress((p) => (p !== undefined ? trickle(p) : p));
    }, 200);
  }, []);

  const finishProgress = React.useCallback(() => {
    if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null; }
    setProgress(100);
    // Let PageProgress animate to 100% before fading out.
    setTimeout(() => { setLoading(false); setProgress(undefined); }, 400);
  }, []);

  // Detect navigation start via a document click listener. This fires before
  // React processes the navigation, ensuring loading=true is committed before
  // usePathname updates — eliminating the race condition that history patching
  // (pushState/replaceState) had with Next.js's useInsertionEffect.
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (anchor.target === '_blank') return;
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
      try {
        const url = new URL(href, location.origin);
        if (url.origin !== location.origin) return;
        if (url.pathname + url.search === location.pathname + location.search) return;
      } catch { return; }
      startProgress();
    };

    const handlePopState = () => {
      if (location.pathname !== committedPathnameRef.current) {
        startProgress();
      }
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handlePopState);
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [startProgress]);

  // Pathname change = navigation complete → finish bar.
  React.useEffect(() => {
    if (loading) finishProgress();
  }, [pathname, finishProgress]);

  // Cross-zone hover prefetch — injects <link rel="prefetch"> on first hover.
  React.useEffect(() => {
    const onHover = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a[data-cross-zone="true"]');
      if (!(a instanceof HTMLAnchorElement)) return;
      const { href } = a;
      if (!href) return;
      const escaped = href.replace(/"/g, '\\"');
      if (!document.querySelector(`link[rel="prefetch"][href="${escaped}"]`)) {
        const el = document.createElement('link');
        el.rel = 'prefetch';
        el.href = href;
        document.head.appendChild(el);
      }
    };

    document.addEventListener('mouseover', onHover);
    return () => document.removeEventListener('mouseover', onHover);
  }, []);

  return <PageProgress loading={loading} progress={progress} />;
}

ZoneProgress.displayName = 'ZoneProgress';
