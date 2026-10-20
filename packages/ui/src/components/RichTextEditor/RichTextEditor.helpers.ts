import type { Extensions } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';

interface EditorExtensionConfig {
  placeholder?: string;
  maxCharacters?: number;
  /** When true, loads CharacterCount extension even without a hard limit */
  showCount?: boolean;
}

/**
 * Full extension set for the interactive editor.
 * TextAlign must come after StarterKit to correctly extend paragraph/heading nodes.
 */
export function getEditorExtensions(config: EditorExtensionConfig = {}): Extensions {
  return [
    StarterKit.configure({
      codeBlock: false,
      heading: { levels: [2, 3] },
    }),
    Underline,
    Link.configure({
      openOnClick: false,
      autolink: true,
      HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
    }),
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Placeholder.configure({
      placeholder: config.placeholder ?? 'Start writing…',
      showOnlyWhenEditable: true,
    }),
    ...(config.showCount || config.maxCharacters !== undefined
      ? [CharacterCount.configure({ limit: config.maxCharacters })]
      : []),
  ];
}

/**
 * Minimal extension set for SSR/viewer use with generateHTML.
 * Excludes extensions that require browser APIs (Placeholder, CharacterCount).
 */
export function getViewerExtensions(): Extensions {
  return [
    StarterKit.configure({
      codeBlock: false,
      heading: { levels: [2, 3] },
    }),
    Underline,
    Link.configure({ openOnClick: false }),
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
  ];
}

/**
 * TipTap can emit several representations of an empty document.
 * Strip all <br> variants and whitespace, then check for a single empty paragraph.
 */
export function normalizeHtml(html: string): string {
  const stripped = html.replace(/<br\s*\/?>/gi, '').replace(/\s/g, '');
  if (stripped === '<p></p>' || stripped === '') return '';
  return html;
}

/**
 * Normalise a user-typed URL: add https:// if no scheme and not a relative path.
 */
export function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('/') || trimmed.startsWith('#')) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}
