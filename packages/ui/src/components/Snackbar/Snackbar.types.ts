import type * as React from 'react';

export type SnackbarVariant = 'default' | 'success' | 'info' | 'warning' | 'destructive';

export interface SnackbarAction {
  label: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface SnackbarOptions {
  /** Re-showing the same id replaces it instead of queueing another. */
  id?: string;
  /** Second line, smaller (keep it short: snackbars are glanceable). */
  description?: React.ReactNode;
  variant?: SnackbarVariant;
  /** One inline action, e.g. "View cart". Tapping it also dismisses the snackbar. */
  action?: SnackbarAction;
  /** Milliseconds on screen. Defaults to 4000, or 6000 with an action (time to reach it). */
  duration?: number;
  onDismiss?: () => void;
}

export interface SnackbarItem extends SnackbarOptions {
  id: string;
  message: React.ReactNode;
  /** False while it animates out. */
  open: boolean;
}

export interface SnackbarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  item: SnackbarItem;
  onDismiss: () => void;
  /** Labels for assistive tech. */
  dismissLabel?: string;
}

export interface SnackbarHostProps {
  /** Accessible name of the dismiss control (snackbars can be swiped away too). */
  dismissLabel?: string;
  className?: string;
}
