'use client';

import * as React from 'react';
import { SmilePlus } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { Popover, PopoverContent, PopoverTrigger } from '../../Popover';
import { Tooltip } from '../../Tooltip';
import { useRteContext } from '../RichTextEditor.context';

interface EmojiEntry {
  e: string; // emoji character
  k: string; // search keywords (space-separated, lowercase)
}

interface EmojiCategory {
  id: string;
  label: string;
  entries: EmojiEntry[];
}

const CATEGORIES: EmojiCategory[] = [
  {
    id: 'smileys',
    label: 'Smileys',
    entries: [
      { e: '😊', k: 'smile happy' },
      { e: '😂', k: 'laugh funny joy' },
      { e: '🥰', k: 'love adore hearts' },
      { e: '😍', k: 'love eyes star' },
      { e: '🤩', k: 'star struck amazing' },
      { e: '😎', k: 'cool sunglasses' },
      { e: '🥳', k: 'party celebrate' },
      { e: '🤔', k: 'thinking hmm' },
      { e: '😅', k: 'sweat nervous' },
      { e: '😆', k: 'grin laugh' },
      { e: '🙂', k: 'slight smile' },
      { e: '😉', k: 'wink' },
      { e: '🤣', k: 'rolling laugh floor' },
      { e: '😇', k: 'angel innocent' },
      { e: '🥹', k: 'tearful touched' },
      { e: '🤗', k: 'hug hugging' },
      { e: '😋', k: 'yum delicious' },
      { e: '🙃', k: 'upside down silly' },
      { e: '😤', k: 'triumph steam' },
      { e: '🥺', k: 'pleading eyes cute' },
    ],
  },
  {
    id: 'hands',
    label: 'Hands',
    entries: [
      { e: '👍', k: 'thumbs up good like' },
      { e: '👌', k: 'ok perfect' },
      { e: '🙌', k: 'raising hands celebrate' },
      { e: '💪', k: 'muscle strong flex' },
      { e: '🤝', k: 'handshake deal' },
      { e: '👏', k: 'clap applause' },
      { e: '🙏', k: 'pray thanks please' },
      { e: '✌️', k: 'peace victory two' },
      { e: '🤞', k: 'fingers crossed luck' },
      { e: '🫶', k: 'heart hands love' },
      { e: '👋', k: 'wave hello hi' },
      { e: '☝️', k: 'point one up' },
      { e: '🤙', k: 'call shaka hang loose' },
      { e: '👆', k: 'point up' },
      { e: '✋', k: 'raised hand stop' },
      { e: '🖐️', k: 'five fingers' },
    ],
  },
  {
    id: 'hearts',
    label: 'Hearts',
    entries: [
      { e: '❤️', k: 'red heart love' },
      { e: '🧡', k: 'orange heart' },
      { e: '💛', k: 'yellow heart' },
      { e: '💚', k: 'green heart' },
      { e: '💙', k: 'blue heart' },
      { e: '💜', k: 'purple heart' },
      { e: '🖤', k: 'black heart' },
      { e: '🤍', k: 'white heart' },
      { e: '💕', k: 'two hearts' },
      { e: '💖', k: 'sparkling heart' },
      { e: '💗', k: 'growing heart' },
      { e: '💓', k: 'beating heart' },
      { e: '💝', k: 'heart ribbon' },
      { e: '❤️‍🔥', k: 'heart fire passion' },
      { e: '💞', k: 'revolving hearts' },
      { e: '💘', k: 'heart arrow cupid' },
    ],
  },
  {
    id: 'stars',
    label: 'Stars',
    entries: [
      { e: '⭐', k: 'star gold' },
      { e: '🌟', k: 'glowing star' },
      { e: '✨', k: 'sparkles magic' },
      { e: '💫', k: 'dizzy star spin' },
      { e: '🏆', k: 'trophy winner award' },
      { e: '🥇', k: 'gold medal first' },
      { e: '🎯', k: 'bullseye target' },
      { e: '🔥', k: 'fire hot trending' },
      { e: '💥', k: 'boom explosion' },
      { e: '🌈', k: 'rainbow colors' },
      { e: '🎉', k: 'party popper celebration' },
      { e: '🎊', k: 'confetti ball party' },
      { e: '🚀', k: 'rocket launch' },
      { e: '💡', k: 'lightbulb idea' },
    ],
  },
  {
    id: 'nature',
    label: 'Nature',
    entries: [
      { e: '🌸', k: 'cherry blossom flower pink' },
      { e: '🌺', k: 'hibiscus flower' },
      { e: '🌻', k: 'sunflower yellow' },
      { e: '🌹', k: 'rose red flower' },
      { e: '🌷', k: 'tulip flower' },
      { e: '🌿', k: 'herb leaf green' },
      { e: '🌱', k: 'seedling sprout grow' },
      { e: '🌲', k: 'tree pine evergreen' },
      { e: '🍃', k: 'leaves wind' },
      { e: '🌊', k: 'wave ocean sea' },
      { e: '💧', k: 'droplet water' },
      { e: '🍀', k: 'four leaf clover luck' },
      { e: '🪴', k: 'potted plant' },
      { e: '🌙', k: 'moon night' },
      { e: '☀️', k: 'sun sunny bright' },
      { e: '🌤️', k: 'sun behind cloud' },
    ],
  },
  {
    id: 'objects',
    label: 'Objects',
    entries: [
      { e: '🎁', k: 'gift present wrapped' },
      { e: '🛍️', k: 'shopping bag store' },
      { e: '💎', k: 'diamond gem jewel' },
      { e: '🏷️', k: 'label tag price' },
      { e: '🔑', k: 'key unlock' },
      { e: '🪄', k: 'magic wand' },
      { e: '🎨', k: 'art paint palette' },
      { e: '📦', k: 'box package delivery' },
      { e: '🧿', k: 'eye protection amulet' },
      { e: '👗', k: 'dress fashion clothing' },
      { e: '👟', k: 'sneaker shoe running' },
      { e: '👒', k: 'hat fashion' },
      { e: '💍', k: 'ring engagement jewel' },
      { e: '👜', k: 'handbag purse' },
      { e: '🕶️', k: 'sunglasses cool' },
      { e: '🧴', k: 'lotion cream bottle' },
    ],
  },
  {
    id: 'symbols',
    label: 'Symbols',
    entries: [
      { e: '✅', k: 'check done complete' },
      { e: '❌', k: 'cross no wrong' },
      { e: '💯', k: 'hundred percent perfect' },
      { e: '♻️', k: 'recycle eco sustainable' },
      { e: '➡️', k: 'right arrow' },
      { e: '⬆️', k: 'up arrow' },
      { e: '⬇️', k: 'down arrow' },
      { e: '⬅️', k: 'left arrow' },
      { e: '🔝', k: 'top up above' },
      { e: '🆕', k: 'new' },
      { e: '🆓', k: 'free' },
      { e: '🔴', k: 'red circle dot' },
      { e: '🟡', k: 'yellow circle dot' },
      { e: '🟢', k: 'green circle dot' },
      { e: '🔵', k: 'blue circle dot' },
      { e: '⚡', k: 'lightning bolt fast energy' },
    ],
  },
];

const ALL_ENTRIES: EmojiEntry[] = CATEGORIES.flatMap((c) => c.entries);

export function RteEmojiPicker() {
  const { editor, disabled, readOnly } = useRteContext();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('all');
  const searchRef = React.useRef<HTMLInputElement>(null);

  const isDisabled = disabled || readOnly || !editor;

  const displayEmojis = React.useMemo<string[]>(() => {
    const pool =
      activeCategory === 'all'
        ? ALL_ENTRIES
        : (CATEGORIES.find((c) => c.id === activeCategory)?.entries ?? []);
    if (!search.trim()) return pool.map((e) => e.e);
    const q = search.toLowerCase();
    return pool.filter((e) => e.k.includes(q) || e.e.includes(q)).map((e) => e.e);
  }, [activeCategory, search]);

  function handleSelect(emoji: string) {
    editor?.chain().focus().insertContent(emoji).run();
    setOpen(false);
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setSearch('');
      setActiveCategory('all');
    }
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <Tooltip content="Insert emoji" side="bottom" delayDuration={400}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Insert emoji"
            disabled={isDisabled}
            className="h-7 w-7 rounded-[2px] data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
          >
            <SmilePlus size={14} />
          </Button>
        </PopoverTrigger>
      </Tooltip>
      <PopoverContent
        className="w-72 max-w-[calc(100vw-1.5rem)] p-3"
        side="bottom"
        align="start"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          searchRef.current?.focus();
        }}
      >
        <div className="flex flex-col gap-2">
          <Input
            ref={searchRef}
            placeholder="Search emoji…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="sm"
          />

          {/* Category pills */}
          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={cn(
                'rounded px-2 py-0.5 text-caption transition-colors outline-none',
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
                activeCategory === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'rounded px-2 py-0.5 text-caption transition-colors outline-none',
                  'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Emoji grid — auto-fill so cells reflow when popover narrows on mobile */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(2rem,1fr))] gap-0.5 max-h-44 overflow-y-auto">
            {displayEmojis.length > 0 ? (
              displayEmojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleSelect(emoji)}
                  aria-label={emoji}
                  className="flex h-8 w-full items-center justify-center rounded hover:bg-accent transition-colors select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 outline-none"
                >
                  {emoji}
                </button>
              ))
            ) : (
              <p className="col-span-full text-center text-caption text-muted-foreground py-4">
                No results
              </p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
