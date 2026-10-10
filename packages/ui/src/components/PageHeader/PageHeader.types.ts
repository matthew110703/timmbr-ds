import type * as React from 'react';
import type { PageHeaderTitleVariants, PageHeaderVariants } from './PageHeader.styles';

export interface PageHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'>,
    PageHeaderVariants,
    PageHeaderTitleVariants {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Buttons or links aligned to the end of the title row. */
  actions?: React.ReactNode;
  /**
   * "‹ Back" link above the title, rendered by LinkButton (`variant="back"`).
   * Same-app links use next/link (base path aware); set `crossZone` for a
   * full navigation to another app.
   */
  back?: { href: string; label: React.ReactNode; crossZone?: boolean; ariaLabel?: string };
  /** `id` of the heading, for `aria-labelledby` on a surrounding section. */
  titleId?: string;
  /** Heading element. Defaults to `h1`; use `h2` for sections within a page. */
  as?: 'h1' | 'h2' | 'h3';
}
