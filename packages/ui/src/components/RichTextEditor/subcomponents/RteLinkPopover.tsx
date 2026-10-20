'use client';

import * as React from 'react';
import { Link2, Unlink2 } from '@timmbr/icons';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { Popover, PopoverContent, PopoverTrigger } from '../../Popover';
import { Tooltip } from '../../Tooltip';
import { useRteContext } from '../RichTextEditor.context';
import { normalizeUrl } from '../RichTextEditor.helpers';

export function RteLinkPopover() {
  const { editor, disabled, readOnly } = useRteContext();
  const [open, setOpen] = React.useState(false);
  const [urlInput, setUrlInput] = React.useState('');

  const isActive = editor?.isActive('link') ?? false;
  const isDisabled = disabled || readOnly || !editor;

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen && editor) {
      const existing = editor.getAttributes('link').href ?? '';
      setUrlInput(existing);
    } else {
      setUrlInput('');
    }
    setOpen(nextOpen);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editor || !urlInput.trim()) return;
    const href = normalizeUrl(urlInput);
    editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
    setOpen(false);
  }

  function handleUnlink() {
    editor?.chain().focus().extendMarkRange('link').unsetLink().run();
  }

  return (
    <div className="flex items-center gap-0.5">
      <Popover open={open} onOpenChange={handleOpenChange}>
        <Tooltip content="Insert link" side="bottom" delayDuration={400}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Insert link"
              aria-pressed={isActive}
              disabled={isDisabled}
              className="h-7 w-7 rounded-[2px] data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
            >
              <Link2 size={14} />
            </Button>
          </PopoverTrigger>
        </Tooltip>
        <PopoverContent className="w-80 max-w-[calc(100vw-1.5rem)] p-3" side="bottom" align="start">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <p className="text-body-2-semibold text-foreground mb-1">Insert link</p>
            <Input
              placeholder="https://example.com"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              autoFocus
              size="sm"
            />
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={!urlInput.trim()}>
                Apply
              </Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>

      <Tooltip content="Remove link" side="bottom" delayDuration={400}>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Remove link"
          disabled={isDisabled || !isActive}
          onClick={handleUnlink}
          className="h-7 w-7 rounded-[2px]"
        >
          <Unlink2 size={14} />
        </Button>
      </Tooltip>
    </div>
  );
}
