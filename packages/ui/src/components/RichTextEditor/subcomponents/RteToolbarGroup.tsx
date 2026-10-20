'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { Divider } from '../../Divider';
import type { RteToolbarGroupProps } from '../RichTextEditor.types';

export function RteToolbarGroup({ children, showLeadingDivider = true }: RteToolbarGroupProps) {
  return (
    <>
      {showLeadingDivider && (
        <Divider orientation="vertical" className="h-5 mx-0.5 self-center" />
      )}
      <div className={cn('flex items-center gap-0.5')}>
        {children}
      </div>
    </>
  );
}
