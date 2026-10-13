'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { Snackbar } from './Snackbar';
import { snackbarHostVariants } from './Snackbar.styles';
import { snackbarStore } from './snackbarStore';
import type { SnackbarHostProps } from './Snackbar.types';

/**
 * Where snackbars appear. Mounted once by TimmbrConfigProvider. The live regions are always in
 * the page, so screen readers announce each new snackbar (errors assertively).
 */
// Layout effects run before any child's mount effect, so toasts fired on mount already see the host.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

export function SnackbarHost({ dismissLabel, className }: SnackbarHostProps) {
  const current = React.useSyncExternalStore(snackbarStore.subscribe, snackbarStore.getCurrent, () => null);
  useIsomorphicLayoutEffect(() => snackbarStore.registerHost(), []);
  const urgent = current?.variant === 'destructive';
  const dismiss = React.useCallback(() => {
    if (current) snackbarStore.dismiss(current.id);
  }, [current]);

  const content = current && (
    <Snackbar key={current.id} item={current} onDismiss={dismiss} dismissLabel={dismissLabel} />
  );

  return (
    <div className={cn(snackbarHostVariants(), className)} data-slot="snackbar-host">
      <div role="status" aria-live="polite" aria-atomic="true" className="contents">
        {!urgent && content}
      </div>
      <div role="alert" aria-live="assertive" aria-atomic="true" className="contents">
        {urgent && content}
      </div>
    </div>
  );
}
