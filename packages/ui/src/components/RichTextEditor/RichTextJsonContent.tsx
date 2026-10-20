import * as React from 'react';
import { generateHTML } from '@tiptap/core';
import { cn } from '@timmbr/utils';
import { proseViewerStyles } from './RichTextEditor.styles';
import { getViewerExtensions } from './RichTextEditor.helpers';
import type { RichTextJsonContentProps } from './RichTextEditor.types';

/**
 * SSR-safe viewer for TipTap JSONContent.
 * Uses generateHTML from @tiptap/core — a pure function with no browser dependency.
 * Falls back silently on malformed input.
 */
export function RichTextJsonContent({ content, className, style }: RichTextJsonContentProps) {
  if (!content) return null;

  let html = '';
  try {
    html = generateHTML(content, getViewerExtensions());
  } catch {
    return null;
  }

  if (!html) return null;

  return (
    <div
      data-slot="rte-json-content"
      className={cn(proseViewerStyles, className)}
      style={style}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: intentional rich content rendering
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
