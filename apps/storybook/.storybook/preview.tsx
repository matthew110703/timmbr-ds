import type { Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-themes';
import * as React from 'react';
import { TimmbrConfigProvider } from '@timmbr/ui';
import '../src/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#090d16' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <TimmbrConfigProvider>
        <div className="p-6">
          <Story />
        </div>
      </TimmbrConfigProvider>
    ),
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
