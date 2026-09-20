import type * as React from 'react';
import type { AvatarVariants } from './Avatar.styles';

export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    AvatarVariants {
  /**
   * URL of the avatar image.
   */
  src?: string;
  /**
   * Accessible description for the image.
   */
  alt?: string;
  /**
   * Initials to display when image is loading or unavailable (e.g. "M", "JD").
   */
  initials?: string;
  /**
   * Optional presence / activity status indicator.
   */
  status?: AvatarStatus;
  /**
   * If true, renders child element via Radix Slot.
   */
  asChild?: boolean;
}
