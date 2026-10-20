'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Pilcrow,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Quote,
  Minus,
  RemoveFormatting,
} from '@timmbr/icons';
import { useRteContext } from '../RichTextEditor.context';
import { toolbarVariants } from '../RichTextEditor.styles';
import { RteToolbarButton } from './RteToolbarButton';
import { RteToolbarGroup } from './RteToolbarGroup';
import { RteLinkPopover } from './RteLinkPopover';
import { RteEmojiPicker } from './RteEmojiPicker';

const ICON_SIZE = 14;

interface RteToolbarProps {
  className?: string;
}

function handleToolbarKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
  if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
  const toolbar = e.currentTarget;
  const focusable = Array.from(
    toolbar.querySelectorAll<HTMLButtonElement>('button:not([disabled])'),
  );
  const idx = focusable.indexOf(document.activeElement as HTMLButtonElement);
  if (idx === -1) return;
  e.preventDefault();
  const len = focusable.length;
  const next =
    e.key === 'ArrowRight' ? focusable[(idx + 1) % len]
    : e.key === 'ArrowLeft' ? focusable[(idx - 1 + len) % len]
    : e.key === 'Home' ? focusable[0]
    : focusable[len - 1];
  next?.focus();
}

export function RteToolbar({ className }: RteToolbarProps) {
  const { editor, disabled, readOnly } = useRteContext();

  if (!editor) return null;

  const isDisabled = disabled || readOnly;

  return (
    <div
      data-slot="rte-toolbar"
      role="toolbar"
      aria-label="Text formatting"
      onKeyDown={handleToolbarKeyDown}
      className={cn(toolbarVariants(), className)}
    >
      {/* Group 1 — History */}
      <div className="flex items-center gap-0.5">
        <RteToolbarButton
          label="Undo"
          icon={<Undo2 size={ICON_SIZE} />}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={isDisabled || !editor.can().undo()}
        />
        <RteToolbarButton
          label="Redo"
          icon={<Redo2 size={ICON_SIZE} />}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={isDisabled || !editor.can().redo()}
        />
      </div>

      {/* Group 2 — Block type */}
      <RteToolbarGroup>
        <RteToolbarButton
          label="Paragraph"
          icon={<Pilcrow size={ICON_SIZE} />}
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={editor.isActive('paragraph') && !editor.isActive('heading')}
          disabled={isDisabled}
        />
        <RteToolbarButton
          label="Heading 2"
          icon={<Heading2 size={ICON_SIZE} />}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          disabled={isDisabled}
        />
        <RteToolbarButton
          label="Heading 3"
          icon={<Heading3 size={ICON_SIZE} />}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          disabled={isDisabled}
        />
      </RteToolbarGroup>

      {/* Group 3 — Marks */}
      <RteToolbarGroup>
        <RteToolbarButton
          label="Bold"
          icon={<Bold size={ICON_SIZE} />}
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          disabled={isDisabled}
        />
        <RteToolbarButton
          label="Italic"
          icon={<Italic size={ICON_SIZE} />}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          disabled={isDisabled}
        />
        <RteToolbarButton
          label="Underline"
          icon={<Underline size={ICON_SIZE} />}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          disabled={isDisabled}
        />
        <RteToolbarButton
          label="Strikethrough"
          icon={<Strikethrough size={ICON_SIZE} />}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          disabled={isDisabled}
        />
      </RteToolbarGroup>

      {/* Group 4 — Lists + Blockquote */}
      <RteToolbarGroup>
        <RteToolbarButton
          label="Bullet list"
          icon={<List size={ICON_SIZE} />}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          disabled={isDisabled}
        />
        <RteToolbarButton
          label="Ordered list"
          icon={<ListOrdered size={ICON_SIZE} />}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          disabled={isDisabled}
        />
        <RteToolbarButton
          label="Blockquote"
          icon={<Quote size={ICON_SIZE} />}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          disabled={isDisabled}
        />
      </RteToolbarGroup>

      {/* Group 5 — Alignment */}
      <RteToolbarGroup>
        <RteToolbarButton
          label="Align left"
          icon={<AlignLeft size={ICON_SIZE} />}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          disabled={isDisabled}
        />
        <RteToolbarButton
          label="Align center"
          icon={<AlignCenter size={ICON_SIZE} />}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          disabled={isDisabled}
        />
        <RteToolbarButton
          label="Align right"
          icon={<AlignRight size={ICON_SIZE} />}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          disabled={isDisabled}
        />
        <RteToolbarButton
          label="Justify"
          icon={<AlignJustify size={ICON_SIZE} />}
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          isActive={editor.isActive({ textAlign: 'justify' })}
          disabled={isDisabled}
        />
      </RteToolbarGroup>

      {/* Group 6 — Insert */}
      <RteToolbarGroup>
        <RteLinkPopover />
        <RteEmojiPicker />
        <RteToolbarButton
          label="Horizontal rule"
          icon={<Minus size={ICON_SIZE} />}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          disabled={isDisabled}
        />
      </RteToolbarGroup>

      {/* Group 7 — Utility */}
      <RteToolbarGroup>
        <RteToolbarButton
          label="Clear formatting"
          icon={<RemoveFormatting size={ICON_SIZE} />}
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          disabled={isDisabled}
        />
      </RteToolbarGroup>
    </div>
  );
}
