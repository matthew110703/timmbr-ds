import { cva } from 'class-variance-authority';
import { cn } from '@timmbr/utils';

// ── Outer wrapper ─────────────────────────────────────────────────────────────

export const editorWrapperVariants = cva(
  [
    'flex flex-col w-full rounded-md border border-border bg-card text-foreground font-sans',
    'transition-shadow duration-150',
    'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1',
  ],
  {
    variants: {
      disabled: {
        true: 'opacity-50 pointer-events-none select-none',
        false: '',
      },
    },
    defaultVariants: { disabled: false },
  },
);

// ── Toolbar ───────────────────────────────────────────────────────────────────

export const toolbarVariants = cva(
  'flex items-center flex-wrap gap-0.5 px-2 py-1.5 border-b border-border bg-card rounded-t-[2px]',
);

// ── Character count footer ────────────────────────────────────────────────────

export const charCountVariants = cva(
  'flex items-center justify-end gap-3 px-3 py-1.5 border-t border-border text-caption text-muted-foreground select-none rounded-b-[2px]',
  {
    variants: {
      overLimit: {
        true: 'text-destructive',
        false: '',
      },
    },
    defaultVariants: { overLimit: false },
  },
);

// ── Prose styles for the editor (ProseMirror class selectors) ─────────────────
// These string literals are scanned by Tailwind v4's @source in consuming apps.

export const proseEditorStyles = cn(
  // Editor focus reset
  '[&_.ProseMirror]:outline-none',
  '[&_.ProseMirror]:cursor-text',
  // Paragraph
  '[&_.ProseMirror_p]:text-body-1 [&_.ProseMirror_p]:text-foreground [&_.ProseMirror_p]:my-2 [&_.ProseMirror_p]:leading-relaxed',
  // Headings — DS display font + scale
  '[&_.ProseMirror_h2]:font-display [&_.ProseMirror_h2]:text-h2 [&_.ProseMirror_h2]:font-normal [&_.ProseMirror_h2]:text-foreground [&_.ProseMirror_h2]:my-4 [&_.ProseMirror_h2]:leading-tight',
  '[&_.ProseMirror_h3]:font-display [&_.ProseMirror_h3]:text-h3 [&_.ProseMirror_h3]:font-normal [&_.ProseMirror_h3]:text-foreground [&_.ProseMirror_h3]:my-3 [&_.ProseMirror_h3]:leading-tight',
  // Lists
  '[&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ul]:my-2',
  '[&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_ol]:my-2',
  '[&_.ProseMirror_li]:text-body-1 [&_.ProseMirror_li]:text-foreground [&_.ProseMirror_li]:mb-1',
  '[&_.ProseMirror_li_p]:my-0',
  // Blockquote
  '[&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-primary [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:text-muted-foreground [&_.ProseMirror_blockquote]:my-3',
  // Inline marks
  '[&_.ProseMirror_strong]:font-semibold',
  '[&_.ProseMirror_em]:italic',
  '[&_.ProseMirror_u]:underline [&_.ProseMirror_u]:underline-offset-2',
  '[&_.ProseMirror_s]:line-through',
  // Links
  '[&_.ProseMirror_a]:text-primary [&_.ProseMirror_a]:underline [&_.ProseMirror_a]:underline-offset-2 [&_.ProseMirror_a]:cursor-pointer [&_.ProseMirror_a]:transition-opacity [&_.ProseMirror_a:hover]:opacity-80',
  // Horizontal rule
  '[&_.ProseMirror_hr]:border-t [&_.ProseMirror_hr]:border-border [&_.ProseMirror_hr]:my-6',
  // Placeholder via TipTap's .is-empty class on the paragraph node
  '[&_.ProseMirror_p.is-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-empty:first-child::before]:text-muted-foreground [&_.ProseMirror_p.is-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-empty:first-child::before]:float-left [&_.ProseMirror_p.is-empty:first-child::before]:h-0',
  // Selected text
  '[&_.ProseMirror_::selection]:bg-primary/20',
  // First/last margin reset so the editor doesn't have extra outer gap
  '[&_.ProseMirror_>*:first-child]:mt-0',
  '[&_.ProseMirror_>*:last-child]:mb-0',
);

// ── Prose styles for viewer components (direct element selectors) ─────────────
// Used by RichTextContent and RichTextJsonContent — no ProseMirror class needed.

export const proseViewerStyles = cn(
  // Paragraph
  '[&_p]:text-body-1 [&_p]:text-foreground [&_p]:my-2 [&_p]:leading-relaxed',
  // Headings
  '[&_h2]:font-display [&_h2]:text-h2 [&_h2]:font-normal [&_h2]:text-foreground [&_h2]:my-4 [&_h2]:leading-tight',
  '[&_h3]:font-display [&_h3]:text-h3 [&_h3]:font-normal [&_h3]:text-foreground [&_h3]:my-3 [&_h3]:leading-tight',
  // Lists
  '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2',
  '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2',
  '[&_li]:text-body-1 [&_li]:text-foreground [&_li]:mb-1',
  '[&_li_p]:my-0',
  // Blockquote
  '[&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-3',
  // Inline marks
  '[&_strong]:font-semibold',
  '[&_em]:italic',
  '[&_u]:underline [&_u]:underline-offset-2',
  '[&_s]:line-through',
  // Links
  '[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:cursor-pointer [&_a]:transition-opacity [&_a:hover]:opacity-80',
  // Horizontal rule
  '[&_hr]:border-t [&_hr]:border-border [&_hr]:my-6',
  // First/last margin reset
  '[&_>*:first-child]:mt-0',
  '[&_>*:last-child]:mb-0',
);
