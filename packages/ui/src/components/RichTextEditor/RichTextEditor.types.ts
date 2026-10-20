import type * as React from 'react';
import type { Editor, JSONContent } from '@tiptap/core';
import type { MotionProps } from '../../types/motion';

export interface RichTextEditorProps extends MotionProps {
  /** Controlled HTML string value */
  value?: string;
  /** Uncontrolled initial HTML string */
  defaultValue?: string;
  /** Called with the HTML string on every content change */
  onChange?: (html: string) => void;
  /** Called with TipTap's JSON document on every content change */
  onChangeJson?: (json: JSONContent) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  /** Hard character limit; enables the CharacterCount extension limit */
  maxCharacters?: number;
  /** Show character count footer */
  showCharacterCount?: boolean;
  /** Show word count in the footer */
  showWordCount?: boolean;
  /** Show the toolbar — default true */
  toolbar?: boolean;
  toolbarClassName?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  editorClassName?: string;
  style?: React.CSSProperties;
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export interface RichTextContentProps {
  /** Raw HTML string to render */
  content: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface RichTextJsonContentProps {
  /** TipTap JSONContent document to render */
  content: JSONContent;
  className?: string;
  style?: React.CSSProperties;
}

export interface RteContextValue {
  editor: Editor | null;
  shouldAnimate: boolean;
  disabled: boolean;
  readOnly: boolean;
}

export interface RteToolbarButtonProps {
  /** Tooltip label and aria-label */
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface RteToolbarGroupProps {
  children: React.ReactNode;
  /** Show leading vertical divider — default true */
  showLeadingDivider?: boolean;
}

export interface RteCharCountProps {
  maxCharacters?: number;
  showCharacterCount?: boolean;
  showWordCount?: boolean;
  className?: string;
}
