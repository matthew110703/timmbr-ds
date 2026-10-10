/**
 * Formats a number with commas as thousands separators.
 */
export function formatNumber(value: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Truncates a string to a specified length and adds an ellipsis.
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
}

/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Formats an amount of money with the locale's currency format
 * (`formatCurrency(54999)` → "₹54,999"). Whole amounts drop the decimals;
 * fractional amounts keep two.
 */
export function formatCurrency(
  amount: number | string,
  currency = 'INR',
  locale = 'en-IN'
): string {
  const value = typeof amount === 'string' ? Number(amount) : amount;
  if (!Number.isFinite(value)) return '';
  const whole = Number.isInteger(value);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(value);
}

/** Preset date formats for `formatDate`. */
export const DATE_FORMATS = {
  /** 7 Oct 2026 */
  date: { day: 'numeric', month: 'short', year: 'numeric' },
  /** 7 Oct 2026, 3:45 pm */
  dateTime: { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' },
  /** 3:45 pm */
  time: { hour: 'numeric', minute: '2-digit' },
} satisfies Record<string, Intl.DateTimeFormatOptions>;

/**
 * Formats a date (Date, ISO string or timestamp) with a preset name from
 * `DATE_FORMATS` or custom Intl options. Returns '' for invalid input.
 */
export function formatDate(
  date: Date | string | number,
  format: keyof typeof DATE_FORMATS | Intl.DateTimeFormatOptions = 'date',
  locale = 'en-IN'
): string {
  const value = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(value.getTime())) return '';
  const options = typeof format === 'string' ? DATE_FORMATS[format] : format;
  return new Intl.DateTimeFormat(locale, options).format(value);
}
