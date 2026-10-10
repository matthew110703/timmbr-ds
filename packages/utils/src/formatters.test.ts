import { describe, expect, it } from 'vitest';
import { formatCurrency, formatDate } from './formatters';

describe('formatCurrency', () => {
  it('formats rupees with Indian grouping and no decimals for whole amounts', () => {
    expect(formatCurrency(154999)).toBe('₹1,54,999');
  });

  it('keeps two decimals for fractional amounts', () => {
    expect(formatCurrency(340.5)).toBe('₹340.50');
  });

  it('accepts numeric strings (e.g. Decimal values from the API)', () => {
    expect(formatCurrency('2000')).toBe('₹2,000');
  });

  it('supports other currencies and locales', () => {
    expect(formatCurrency(340, 'USD', 'en-US')).toBe('$340');
  });

  it('returns an empty string for non-numbers', () => {
    expect(formatCurrency('abc')).toBe('');
  });
});

describe('formatDate', () => {
  const date = new Date(2026, 9, 7, 15, 45);

  it('uses the short date preset by default', () => {
    expect(formatDate(date)).toBe('7 Oct 2026');
  });

  it('accepts ISO strings and presets', () => {
    expect(formatDate(date.toISOString(), 'time')).toMatch(/3:45\s?pm/i);
  });

  it('accepts custom Intl options', () => {
    expect(formatDate(date, { month: 'long' })).toBe('October');
  });

  it('returns an empty string for invalid dates', () => {
    expect(formatDate('not a date')).toBe('');
  });
});
