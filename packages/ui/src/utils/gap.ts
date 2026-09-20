/**
 * Translates any gap prop (standard integer, arbitrary number in px, or custom CSS string)
 * into the corresponding Tailwind CSS utility class.
 */
const STANDARD_GAP_MAP: Record<number, string> = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  7: 'gap-7',
  8: 'gap-8',
  9: 'gap-9',
  10: 'gap-10',
  11: 'gap-11',
  12: 'gap-12',
  14: 'gap-14',
  16: 'gap-16',
  20: 'gap-20',
  24: 'gap-24',
  28: 'gap-28',
  32: 'gap-32',
  36: 'gap-36',
  40: 'gap-40',
  44: 'gap-44',
  48: 'gap-48',
  52: 'gap-52',
  56: 'gap-56',
  60: 'gap-60',
  64: 'gap-64',
  72: 'gap-72',
  80: 'gap-80',
  96: 'gap-96',
};

export function formatGap(gap: number | string | undefined): string | undefined {
  if (gap === undefined || gap === null) return undefined;
  
  if (typeof gap === 'number') {
    if (gap in STANDARD_GAP_MAP) {
      return STANDARD_GAP_MAP[gap];
    }
    return `gap-[${gap}px]`;
  }

  if (typeof gap === 'string') {
    const trimmed = gap.trim();
    const num = Number(trimmed);
    if (!isNaN(num) && num in STANDARD_GAP_MAP) {
      return STANDARD_GAP_MAP[num];
    }
    if (trimmed.startsWith('gap-')) {
      return trimmed;
    }
    return `gap-[${trimmed}]`;
  }

  return undefined;
}
