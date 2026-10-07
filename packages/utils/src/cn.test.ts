import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('keeps a theme text style next to a text colour', () => {
    expect(cn('text-body-2 text-primary')).toBe('text-body-2 text-primary');
  });

  it('lets a later text style override an earlier one', () => {
    expect(cn('text-body-3', 'text-body-1')).toBe('text-body-1');
  });

  it('lets a later colour override an earlier colour', () => {
    expect(cn('text-foreground', 'text-primary')).toBe('text-primary');
  });
});
