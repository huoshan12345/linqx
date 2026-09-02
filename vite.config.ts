import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const dir = import.meta.dirname;

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(dir, 'index.ts'),
      },
      formats: ['es'],
    },
  },
});
