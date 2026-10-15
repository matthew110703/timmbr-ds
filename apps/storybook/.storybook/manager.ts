import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const timmbrTheme = create({
  base: 'light',

  // Brand
  brandTitle: 'Timmbr DS',
  brandUrl: '/',
  brandTarget: '_self',

  // Core palette — warm terracotta + off-white
  colorPrimary: '#C47A4A',
  colorSecondary: '#C47A4A',

  // App chrome
  appBg: '#F0E8DA',
  appContentBg: '#FDFAF6',
  appPreviewBg: '#FFFFFF',
  appBorderColor: '#DDD3C3',
  appBorderRadius: 6,

  // Typography
  fontBase: '"Manrope", system-ui, sans-serif',
  fontCode: '"JetBrains Mono", "Fira Code", monospace',

  // Text
  textColor: '#3C3C3C',
  textInverseColor: '#FDFAF6',
  textMutedColor: '#7A6B5A',

  // Toolbar
  barTextColor: '#5C4E3D',
  barHoverColor: '#C47A4A',
  barSelectedColor: '#C47A4A',
  barBg: '#F7F1E6',

  // Form controls
  inputBg: '#FDFAF6',
  inputBorder: '#CEC0AF',
  inputTextColor: '#3C3C3C',
  inputBorderRadius: 4,

  // Buttons
  buttonBg: '#F7F1E6',
  buttonBorder: '#CEC0AF',
  booleanBg: '#EDE4D6',
  booleanSelectedBg: '#C47A4A',
});

addons.setConfig({
  theme: timmbrTheme,
  sidebar: {
    showRoots: true,
  },
});
