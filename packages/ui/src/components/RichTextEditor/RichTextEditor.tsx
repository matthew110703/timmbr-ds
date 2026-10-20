'use client';

import * as React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import type { JSONContent } from '@tiptap/core';
import { cn } from '@timmbr/utils';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import { RteContext } from './RichTextEditor.context';
import { editorWrapperVariants, proseEditorStyles } from './RichTextEditor.styles';
import { getEditorExtensions, normalizeHtml } from './RichTextEditor.helpers';
import { RteToolbar } from './subcomponents/RteToolbar';
import { RteCharCount } from './subcomponents/RteCharCount';
import type { RichTextEditorProps } from './RichTextEditor.types';

export function RichTextEditor({
  value,
  defaultValue,
  onChange,
  onChangeJson,
  onFocus,
  onBlur,
  placeholder,
  maxCharacters,
  showCharacterCount = false,
  showWordCount = false,
  toolbar = true,
  toolbarClassName,
  disabled = false,
  readOnly = false,
  className,
  editorClassName,
  style,
  id,
  motion: motionProp,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
}: RichTextEditorProps) {
  const globalMotion = useGlobalAnimation();
  const { shouldAnimate, motionClass, dataAttributes } = resolveMotion(motionProp, globalMotion);

  const isControlled = value !== undefined;

  // Track the last HTML we emitted so we can skip echoed-back controlled updates
  const lastEmittedHtmlRef = React.useRef<string>(
    isControlled ? (value ?? '') : (defaultValue ?? ''),
  );

  // Stable refs for callbacks — prevents stale closures without recreating the editor
  const onChangeRef = React.useRef(onChange);
  const onChangeJsonRef = React.useRef(onChangeJson);
  const onFocusRef = React.useRef(onFocus);
  const onBlurRef = React.useRef(onBlur);
  // useEffect (not useLayoutEffect) — ref updates don't drive rendering; useLayoutEffect
  // triggers an SSR warning in Next.js App Router client-component pre-render passes.
  React.useEffect(() => {
    onChangeRef.current = onChange;
    onChangeJsonRef.current = onChangeJson;
    onFocusRef.current = onFocus;
    onBlurRef.current = onBlur;
  });

  // Mount flag to gate animate-in classes (prevents SSR/hydration mismatch)
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);

  // Memoize extensions — TipTap reads this only at mount; recalculating every render
  // wastes allocations and silently ignores later changes to these options.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const extensions = React.useMemo(
    () => getEditorExtensions({
      placeholder,
      maxCharacters,
      showCount: showCharacterCount || showWordCount,
    }),
    // intentionally omit showCharacterCount/showWordCount from deps: extensions are
    // frozen at mount and cannot be hot-swapped; changing count visibility after mount
    // requires remounting the editor, which is not a supported use-case.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [placeholder, maxCharacters],
  );

  const editor = useEditor({
    immediatelyRender: false, // SSR safety — defers DOM init to useEffect
    editable: !disabled && !readOnly,
    content: isControlled ? (value ?? '') : (defaultValue ?? ''),
    extensions,
    onUpdate: ({ editor: e }) => {
      const html = normalizeHtml(e.getHTML());
      const json = e.getJSON() as JSONContent;
      lastEmittedHtmlRef.current = html;
      onChangeRef.current?.(html);
      onChangeJsonRef.current?.(json);
    },
    onFocus: () => { onFocusRef.current?.(); },
    onBlur: () => { onBlurRef.current?.(); },
  });

  // Sync controlled value changes that come from outside (not echoes of our own updates)
  React.useEffect(() => {
    if (!editor || !isControlled || value === undefined) return;
    if (value === lastEmittedHtmlRef.current) return;
    editor.commands.setContent(value, false);
    lastEmittedHtmlRef.current = value;
    // isControlled is derived from `value !== undefined`; it's already captured by `value`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  // Sync editable flag when disabled/readOnly props change
  React.useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled && !readOnly);
  }, [editor, disabled, readOnly]);

  const showCount = showCharacterCount || showWordCount;

  // Memoize context — inline object literals create a new reference every render,
  // cascading unnecessary re-renders to all toolbar consumers.
  const contextValue = React.useMemo(
    () => ({ editor, shouldAnimate, disabled, readOnly }),
    [editor, shouldAnimate, disabled, readOnly],
  );

  return (
    <RteContext.Provider value={contextValue}>
      <div
        data-slot="rte"
        style={style}
        className={cn(
          editorWrapperVariants({ disabled }),
          motionClass,
          className,
        )}
        {...dataAttributes}
      >
        {toolbar && (
          <RteToolbar
            className={cn(
              shouldAnimate && mounted ? 'animate-in fade-in duration-150' : undefined,
              toolbarClassName,
            )}
          />
        )}

        <EditorContent
          editor={editor}
          id={id}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          aria-multiline="true"
          aria-readonly={readOnly || undefined}
          className={cn(
            proseEditorStyles,
            'min-h-[120px] px-4 py-3 flex-1',
            editorClassName,
          )}
        />

        {showCount && (
          <RteCharCount
            maxCharacters={maxCharacters}
            showCharacterCount={showCharacterCount}
            showWordCount={showWordCount}
          />
        )}
      </div>
    </RteContext.Provider>
  );
}
