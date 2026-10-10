/**
 * Gap props → Tailwind classes.
 *
 * Every class is a literal string (never built with a template), so Tailwind
 * in the consuming app finds them when it scans this package. Values off the
 * scale fall back to arbitrary classes, which only work if the app's own
 * sources contain the same class.
 */

/** Responsive gap: a scale step per breakpoint (`base` = all sizes). */
export interface ResponsiveGap {
  base?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export type GapValue = number | string | ResponsiveGap;

const GAP: Record<string, string> = {
  "0": "gap-0",
  "0.5": "gap-0.5",
  "1": "gap-1",
  "1.5": "gap-1.5",
  "2": "gap-2",
  "2.5": "gap-2.5",
  "3": "gap-3",
  "4": "gap-4",
  "5": "gap-5",
  "6": "gap-6",
  "7": "gap-7",
  "8": "gap-8",
  "9": "gap-9",
  "10": "gap-10",
  "11": "gap-11",
  "12": "gap-12",
  "14": "gap-14",
  "16": "gap-16",
  "20": "gap-20",
  "24": "gap-24",
  "28": "gap-28",
  "32": "gap-32",
  "36": "gap-36",
  "40": "gap-40",
  "44": "gap-44",
  "48": "gap-48",
  "52": "gap-52",
  "56": "gap-56",
  "60": "gap-60",
  "64": "gap-64",
  "72": "gap-72",
  "80": "gap-80",
  "96": "gap-96",
};
const GAP_X: Record<string, string> = {
  "0": "gap-x-0",
  "0.5": "gap-x-0.5",
  "1": "gap-x-1",
  "1.5": "gap-x-1.5",
  "2": "gap-x-2",
  "2.5": "gap-x-2.5",
  "3": "gap-x-3",
  "4": "gap-x-4",
  "5": "gap-x-5",
  "6": "gap-x-6",
  "7": "gap-x-7",
  "8": "gap-x-8",
  "9": "gap-x-9",
  "10": "gap-x-10",
  "11": "gap-x-11",
  "12": "gap-x-12",
  "14": "gap-x-14",
  "16": "gap-x-16",
  "20": "gap-x-20",
  "24": "gap-x-24",
};
const GAP_Y: Record<string, string> = {
  "0": "gap-y-0",
  "0.5": "gap-y-0.5",
  "1": "gap-y-1",
  "1.5": "gap-y-1.5",
  "2": "gap-y-2",
  "2.5": "gap-y-2.5",
  "3": "gap-y-3",
  "4": "gap-y-4",
  "5": "gap-y-5",
  "6": "gap-y-6",
  "7": "gap-y-7",
  "8": "gap-y-8",
  "9": "gap-y-9",
  "10": "gap-y-10",
  "11": "gap-y-11",
  "12": "gap-y-12",
  "14": "gap-y-14",
  "16": "gap-y-16",
  "20": "gap-y-20",
  "24": "gap-y-24",
};

const RESPONSIVE: Record<string, Record<string, Record<string, string>>> = {
  "gap": {
    sm: {
      "0": "sm:gap-0",
      "0.5": "sm:gap-0.5",
      "1": "sm:gap-1",
      "1.5": "sm:gap-1.5",
      "2": "sm:gap-2",
      "2.5": "sm:gap-2.5",
      "3": "sm:gap-3",
      "4": "sm:gap-4",
      "5": "sm:gap-5",
      "6": "sm:gap-6",
      "8": "sm:gap-8",
      "10": "sm:gap-10",
      "12": "sm:gap-12",
      "16": "sm:gap-16",
    },
    md: {
      "0": "md:gap-0",
      "0.5": "md:gap-0.5",
      "1": "md:gap-1",
      "1.5": "md:gap-1.5",
      "2": "md:gap-2",
      "2.5": "md:gap-2.5",
      "3": "md:gap-3",
      "4": "md:gap-4",
      "5": "md:gap-5",
      "6": "md:gap-6",
      "8": "md:gap-8",
      "10": "md:gap-10",
      "12": "md:gap-12",
      "16": "md:gap-16",
    },
    lg: {
      "0": "lg:gap-0",
      "0.5": "lg:gap-0.5",
      "1": "lg:gap-1",
      "1.5": "lg:gap-1.5",
      "2": "lg:gap-2",
      "2.5": "lg:gap-2.5",
      "3": "lg:gap-3",
      "4": "lg:gap-4",
      "5": "lg:gap-5",
      "6": "lg:gap-6",
      "8": "lg:gap-8",
      "10": "lg:gap-10",
      "12": "lg:gap-12",
      "16": "lg:gap-16",
    },
    xl: {
      "0": "xl:gap-0",
      "0.5": "xl:gap-0.5",
      "1": "xl:gap-1",
      "1.5": "xl:gap-1.5",
      "2": "xl:gap-2",
      "2.5": "xl:gap-2.5",
      "3": "xl:gap-3",
      "4": "xl:gap-4",
      "5": "xl:gap-5",
      "6": "xl:gap-6",
      "8": "xl:gap-8",
      "10": "xl:gap-10",
      "12": "xl:gap-12",
      "16": "xl:gap-16",
    },
  },
  "gap-x": {
    sm: {
      "0": "sm:gap-x-0",
      "0.5": "sm:gap-x-0.5",
      "1": "sm:gap-x-1",
      "1.5": "sm:gap-x-1.5",
      "2": "sm:gap-x-2",
      "2.5": "sm:gap-x-2.5",
      "3": "sm:gap-x-3",
      "4": "sm:gap-x-4",
      "5": "sm:gap-x-5",
      "6": "sm:gap-x-6",
      "8": "sm:gap-x-8",
      "10": "sm:gap-x-10",
      "12": "sm:gap-x-12",
      "16": "sm:gap-x-16",
    },
    md: {
      "0": "md:gap-x-0",
      "0.5": "md:gap-x-0.5",
      "1": "md:gap-x-1",
      "1.5": "md:gap-x-1.5",
      "2": "md:gap-x-2",
      "2.5": "md:gap-x-2.5",
      "3": "md:gap-x-3",
      "4": "md:gap-x-4",
      "5": "md:gap-x-5",
      "6": "md:gap-x-6",
      "8": "md:gap-x-8",
      "10": "md:gap-x-10",
      "12": "md:gap-x-12",
      "16": "md:gap-x-16",
    },
    lg: {
      "0": "lg:gap-x-0",
      "0.5": "lg:gap-x-0.5",
      "1": "lg:gap-x-1",
      "1.5": "lg:gap-x-1.5",
      "2": "lg:gap-x-2",
      "2.5": "lg:gap-x-2.5",
      "3": "lg:gap-x-3",
      "4": "lg:gap-x-4",
      "5": "lg:gap-x-5",
      "6": "lg:gap-x-6",
      "8": "lg:gap-x-8",
      "10": "lg:gap-x-10",
      "12": "lg:gap-x-12",
      "16": "lg:gap-x-16",
    },
    xl: {
      "0": "xl:gap-x-0",
      "0.5": "xl:gap-x-0.5",
      "1": "xl:gap-x-1",
      "1.5": "xl:gap-x-1.5",
      "2": "xl:gap-x-2",
      "2.5": "xl:gap-x-2.5",
      "3": "xl:gap-x-3",
      "4": "xl:gap-x-4",
      "5": "xl:gap-x-5",
      "6": "xl:gap-x-6",
      "8": "xl:gap-x-8",
      "10": "xl:gap-x-10",
      "12": "xl:gap-x-12",
      "16": "xl:gap-x-16",
    },
  },
  "gap-y": {
    sm: {
      "0": "sm:gap-y-0",
      "0.5": "sm:gap-y-0.5",
      "1": "sm:gap-y-1",
      "1.5": "sm:gap-y-1.5",
      "2": "sm:gap-y-2",
      "2.5": "sm:gap-y-2.5",
      "3": "sm:gap-y-3",
      "4": "sm:gap-y-4",
      "5": "sm:gap-y-5",
      "6": "sm:gap-y-6",
      "8": "sm:gap-y-8",
      "10": "sm:gap-y-10",
      "12": "sm:gap-y-12",
      "16": "sm:gap-y-16",
    },
    md: {
      "0": "md:gap-y-0",
      "0.5": "md:gap-y-0.5",
      "1": "md:gap-y-1",
      "1.5": "md:gap-y-1.5",
      "2": "md:gap-y-2",
      "2.5": "md:gap-y-2.5",
      "3": "md:gap-y-3",
      "4": "md:gap-y-4",
      "5": "md:gap-y-5",
      "6": "md:gap-y-6",
      "8": "md:gap-y-8",
      "10": "md:gap-y-10",
      "12": "md:gap-y-12",
      "16": "md:gap-y-16",
    },
    lg: {
      "0": "lg:gap-y-0",
      "0.5": "lg:gap-y-0.5",
      "1": "lg:gap-y-1",
      "1.5": "lg:gap-y-1.5",
      "2": "lg:gap-y-2",
      "2.5": "lg:gap-y-2.5",
      "3": "lg:gap-y-3",
      "4": "lg:gap-y-4",
      "5": "lg:gap-y-5",
      "6": "lg:gap-y-6",
      "8": "lg:gap-y-8",
      "10": "lg:gap-y-10",
      "12": "lg:gap-y-12",
      "16": "lg:gap-y-16",
    },
    xl: {
      "0": "xl:gap-y-0",
      "0.5": "xl:gap-y-0.5",
      "1": "xl:gap-y-1",
      "1.5": "xl:gap-y-1.5",
      "2": "xl:gap-y-2",
      "2.5": "xl:gap-y-2.5",
      "3": "xl:gap-y-3",
      "4": "xl:gap-y-4",
      "5": "xl:gap-y-5",
      "6": "xl:gap-y-6",
      "8": "xl:gap-y-8",
      "10": "xl:gap-y-10",
      "12": "xl:gap-y-12",
      "16": "xl:gap-y-16",
    },
  },
};

function stepKey(value: number | string): string | undefined {
  const num = typeof value === 'number' ? value : Number(value.trim());
  return Number.isNaN(num) ? undefined : String(num);
}

function resolve(kind: 'gap' | 'gap-x' | 'gap-y', gap: GapValue | undefined): string | undefined {
  if (gap === undefined || gap === null) return undefined;
  const base = kind === 'gap' ? GAP : kind === 'gap-x' ? GAP_X : GAP_Y;

  if (typeof gap === 'object') {
    const classes: string[] = [];
    if (gap.base !== undefined) classes.push(base[String(gap.base)] ?? `${kind}-[${gap.base}px]`);
    for (const bp of ['sm', 'md', 'lg', 'xl'] as const) {
      const step = gap[bp];
      if (step !== undefined) {
        const cls = RESPONSIVE[kind][bp][String(step)];
        if (cls) classes.push(cls);
      }
    }
    return classes.join(' ') || undefined;
  }

  const key = stepKey(gap);
  if (key !== undefined && base[key]) return base[key];
  if (typeof gap === 'string') {
    const trimmed = gap.trim();
    // Already a class list, e.g. "gap-x-3 gap-y-1".
    if (trimmed.startsWith('gap-')) return trimmed;
    return `${kind}-[${trimmed}]`;
  }
  return `${kind}-[${gap}px]`;
}

/** `gap` of Stack / Inline / Grid: a step, a responsive object, or a CSS length. */
export function formatGap(gap: GapValue | undefined): string | undefined {
  return resolve('gap', gap);
}

/** Row (`y`) or column (`x`) gap, same values as `formatGap`. */
export function formatAxisGap(axis: 'x' | 'y', gap: GapValue | undefined): string | undefined {
  return resolve(axis === 'x' ? 'gap-x' : 'gap-y', gap);
}
