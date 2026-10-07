import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    // Unminified (like @timmbr/ui) so the 'use client' banner survives intact.
    minify: false,
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        // Types + constants only: importable from server code (route handlers).
        contract: resolve(__dirname, 'src/contract/index.ts'),
      },
      formats: ['es'],
      // contract/index.js sits next to its .d.ts files (dist/contract/), so
      // `./contract` resolves to typed code from both JS and TS.
      fileName: (_format, name) => (name === "contract" ? "contract/index.js" : `${name}.js`),
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        /^@timmbr\/(ui|hooks|utils)(\/.*)?$/,
      ],
      output: {
        // Only the client entry is a client module; `contract` must stay
        // importable from server code.
        banner: (chunk) => (chunk.name === 'index' ? "'use client';" : ''),
      },
    },
    emptyOutDir: false,
  },
});
