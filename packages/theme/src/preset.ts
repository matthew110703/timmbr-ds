import { tokens } from './tokens';

/**
 * Shared configuration preset for Tailwind CSS.
 */
export const sharedPreset = {
  darkMode: ['class'],
  content: [
    './node_modules/@timmbr/ui/dist/**/*.js',
    './node_modules/@timmbr/icons/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: tokens.colors.primary,
        brand: tokens.colors.brand,
        bg: tokens.colors.backgrounds,
        grey: tokens.colors.greys,
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        sans: ['"Manrope"', 'sans-serif'],
        title: ['"Outfit"', 'sans-serif'],
      },
    },
  },
};

export default sharedPreset;
