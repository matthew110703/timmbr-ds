import * as React from 'react';
import { cn } from '@timmbr/utils';
import { ChevronLeft } from '@timmbr/icons';
import { LinkButton } from '../LinkButton';
import { Text } from '../Text';
import { pageHeaderTitleVariants, pageHeaderVariants } from './PageHeader.styles';
import type { PageHeaderProps } from './PageHeader.types';

/**
 * Title block at the top of a page or section: heading, optional description,
 * a back link and actions (buttons) aligned to the end.
 */
export const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  (
    {
      title,
      description,
      actions,
      back,
      as: Heading = 'h1',
      size = 'default',
      divider = false,
      titleId,
      className,
      ...props
    },
    ref
  ) => (
    <header
      ref={ref}
      data-slot="page-header"
      className={cn(pageHeaderVariants({ divider }), className)}
      {...props}
    >
      {back && (
        <LinkButton
          href={back.href}
          crossZone={back.crossZone}
          variant="back"
          aria-label={back.ariaLabel}
          leftIcon={<ChevronLeft size={18} aria-hidden="true" />}
          className="mb-2 w-fit"
          data-slot="page-header-back"
        >
          {back.label}
        </LinkButton>
      )}
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div className="min-w-0 flex-1">
          <Heading id={titleId} className={pageHeaderTitleVariants({ size })} data-slot="page-header-title">
            {title}
          </Heading>
          {description && (
            <Text asChild variant="body-2" foreground="muted">
              <div className="mt-1" data-slot="page-header-description">
                {description}
              </div>
            </Text>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 flex-wrap items-center gap-2" data-slot="page-header-actions">
            {actions}
          </div>
        )}
      </div>
    </header>
  )
);
PageHeader.displayName = 'PageHeader';
