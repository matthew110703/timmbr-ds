import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: {
        index:       resolve(__dirname, 'src/index.ts'),
        transitions: resolve(__dirname, 'src/transitions/index.ts'),
        variants:    resolve(__dirname, 'src/variants/index.ts'),
        presence:    resolve(__dirname, 'src/presence/index.ts'),
        gestures:    resolve(__dirname, 'src/gestures/index.ts'),
        layout:      resolve(__dirname, 'src/layout/index.ts'),
      },
      formats: ['es'],
      fileName: (_fmt, name) => name === 'index' ? 'index.js' : `${name}/index.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'motion',
        'motion/react',
        '@timmbr/utils',
      ],
    },
    emptyOutDir: false,
  },
});
