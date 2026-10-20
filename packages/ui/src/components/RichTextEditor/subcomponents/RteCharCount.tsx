'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { useRteContext } from '../RichTextEditor.context';
import { charCountVariants } from '../RichTextEditor.styles';
import type { RteCharCountProps } from '../RichTextEditor.types';

interface CharacterCountStorage {
  characters: () => number;
  words: () => number;
}

export function RteCharCount({
  maxCharacters,
  showCharacterCount = true,
  showWordCount = false,
  className,
}: RteCharCountProps) {
  const { editor } = useRteContext();

  if (!editor) return null;

  const storage = editor.storage.characterCount as CharacterCountStorage | undefined;
  const charCount = storage?.characters?.() ?? 0;
  const wordCount = storage?.words?.() ?? 0;
  const isOverLimit = maxCharacters !== undefined && charCount > maxCharacters;

  return (
    <div className={cn(charCountVariants({ overLimit: isOverLimit }), className)}>
      {showWordCount && (
        <span>{wordCount} {wordCount === 1 ? 'word' : 'words'}</span>
      )}
      {showCharacterCount && (
        <span>
          {charCount}
          {maxCharacters !== undefined && (
            <span className="text-muted-foreground"> / {maxCharacters}</span>
          )}
          {' '}chars
        </span>
      )}
    </div>
  );
}
