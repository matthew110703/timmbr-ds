'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { Button } from '../../Button';
import { Tooltip } from '../../Tooltip';
import { useRteContext } from '../RichTextEditor.context';
import type { RteToolbarButtonProps } from '../RichTextEditor.types';

export function RteToolbarButton({
  label,
  icon,
  onClick,
  isActive,
  disabled = false,
  className,
}: RteToolbarButtonProps) {
  const { shouldAnimate } = useRteContext();

  return (
    <Tooltip content={label} side="bottom" delayDuration={400}>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={label}
        aria-pressed={isActive !== undefined ? isActive : undefined}
        disabled={disabled}
        onClick={onClick}
        className={cn(
          'h-7 w-7 rounded-[2px]',
          isActive === true && 'bg-accent text-accent-foreground',
          shouldAnimate ? 'active:scale-[0.92]' : 'active:scale-100',
          className,
        )}
      >
        {icon}
      </Button>
    </Tooltip>
  );
}
