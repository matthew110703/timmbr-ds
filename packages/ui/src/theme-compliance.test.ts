/// <reference types="vite/client" />
import { describe, expect, it } from 'vitest';

/**
 * Guards that components only use @timmbr/theme tokens for colour and type.
 * Stories and tests are exempt (demo scaffolding).
 */

// Raw source of every component file.
const SOURCES = import.meta.glob<string>('./components/**/*.{ts,tsx}', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const RULES: { name: string; pattern: RegExp; fix: string }[] = [
  {
    name: 'arbitrary colour',
    pattern: /\b[a-z-]+-\[(?:#[0-9a-f]{3,8}|rgba?\(|hsla?\()/gi,
    fix: 'use a theme colour (primary-*, grey-*, bg-*, border-warm, foreground, …)',
  },
  {
    name: 'Tailwind default palette',
    pattern:
      /\b(?:bg|text|border|ring|fill|stroke|from|to|via|outline|divide|placeholder|caret|decoration)-(?:red|green|blue|yellow|amber|orange|gray|slate|zinc|neutral|stone|emerald|teal|sky|indigo|violet|purple|pink|rose|lime|cyan|fuchsia)-\d{2,3}\b/g,
    fix: 'use destructive / success / warning / info / grey-*',
  },
  {
    name: 'raw white/black',
    pattern: /\b(?:bg|text|border|ring|fill|stroke|outline|divide|from|via|to)-(?:white|black)\b/g,
    fix: 'use grey-50 / grey-1000 (or a semantic token)',
  },
  {
    name: 'Tailwind font size',
    pattern: /(?:^|[\s"'`:])text-(?:xs|sm|base|lg|xl|[2-9]xl)\b/g,
    fix: 'use a theme text style (text-body-1, text-h4, text-caption, …)',
  },
  {
    name: 'arbitrary font size',
    pattern: /\btext-\[\d+(?:\.\d+)?(?:px|rem|em)\]/g,
    fix: 'use a theme text style',
  },
  {
    name: 'non-theme font family',
    pattern: /\bfont-(?:serif|mono|\[[^\]]+\])/g,
    fix: 'use font-sans / font-display / font-title (tabular-nums for aligned digits)',
  },
];

const componentFiles = Object.entries(SOURCES).filter(
  ([path]) => !/\.(test|stories)\.tsx?$/.test(path)
);

describe('theme compliance', () => {
  it('scans the component sources', () => {
    expect(componentFiles.length).toBeGreaterThan(50);
  });

  it.each(RULES)('no $name in components', ({ pattern, fix }) => {
    const violations = componentFiles.flatMap(([path, source]) =>
      source
        .split('\n')
        .flatMap((line, i) =>
          [...line.matchAll(pattern)].map((m) => `${path}:${i + 1}  ${m[0].trim()}`)
        )
    );

    expect(violations, `Fix: ${fix}\n${violations.join('\n')}`).toEqual([]);
  });
});
