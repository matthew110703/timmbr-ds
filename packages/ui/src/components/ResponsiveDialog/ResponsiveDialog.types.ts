import type * as React from 'react';
import type { DialogProps } from '../Dialog/Dialog.types';
import type { MotionProp } from '../../types/motion';

export type ResponsiveDialogMode = 'dialog' | 'drawer';

export interface ResponsiveDialogProps extends DialogProps {
  /**
   * Media query from which the centred dialog is used; below it the content
   * opens as a bottom sheet. Default `(min-width: 640px)` (Tailwind `sm`).
   */
  breakpoint?: string;
}

export interface ResponsiveDialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Dialog width on larger screens: sm (28rem), md (32rem, default), lg (42rem). */
  size?: 'sm' | 'md' | 'lg';
  /** Extra classes in dialog mode only (e.g. `max-w-2xl`). */
  dialogClassName?: string;
  /** Extra classes in bottom-sheet mode only. */
  drawerClassName?: string;
  motion?: MotionProp;
  onOpenAutoFocus?: (event: Event) => void;
  onCloseAutoFocus?: (event: Event) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onInteractOutside?: (event: Event) => void;
}

export type ResponsiveDialogSectionProps = React.HTMLAttributes<HTMLDivElement>;

export type ResponsiveDialogFormProps = React.FormHTMLAttributes<HTMLFormElement>;
