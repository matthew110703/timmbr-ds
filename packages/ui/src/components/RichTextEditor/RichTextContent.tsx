import * as React from 'react';
import { cn } from '@timmbr/utils';
import { proseViewerStyles } from './RichTextEditor.styles';
import type { RichTextContentProps } from './RichTextEditor.types';

/**
 * SSR-safe viewer for HTML content produced by RichTextEditor.
 * Applies the same DS prose typography as the editor without loading TipTap.
 */
export function RichTextContent({ content, className, style }: RichTextContentProps) {
  if (!content) return null;

  return (
    <div
      data-slot="rte-content"
      className={cn(proseViewerStyles, className)}
      style={style}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: intentional rich content rendering
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
