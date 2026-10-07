import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import preserveDirectives from 'rollup-plugin-preserve-directives';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        'react-dom',
        'tailwindcss',
        /^@radix-ui\/.*/,
        /^next(\/.*)?$/,
        '@timmbr/utils',
        '@timmbr/theme',
        '@timmbr/icons',
        '@timmbr/hooks',
        '@timmbr/motion',
        'motion',
        'motion/react',
        'lucide-react',
        'class-variance-authority',
        'input-otp',
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
      plugins: [
        preserveDirectives(),
      ],
    },
    emptyOutDir: false,
  },
});
