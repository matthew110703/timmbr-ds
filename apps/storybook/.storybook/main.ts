import type { StorybookConfig } from '@storybook/nextjs-vite';
import tailwindcss from '@tailwindcss/vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../../packages/icons/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../../packages/motion/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    '@storybook/addon-mcp',
  ],
  framework: '@storybook/nextjs-vite',
  viteFinal: async (viteConfig) => {
    viteConfig.plugins = viteConfig.plugins || [];
    viteConfig.plugins.push(tailwindcss());

    // Deduplicate to ensure single instances of motion and react
    // Prevents dual-context issues with AnimatePresence, LayoutGroup, etc.
    viteConfig.resolve = viteConfig.resolve || {};
    viteConfig.resolve.dedupe = [
      ...(viteConfig.resolve.dedupe || []),
      'react',
      'react-dom',
      'motion',
      'motion/react',
    ];

    return viteConfig;
  },
};

export default config;
