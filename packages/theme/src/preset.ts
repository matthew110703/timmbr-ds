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
        brand: tokens.colors.brand,
      },
    },
  },
};

export default sharedPreset;
