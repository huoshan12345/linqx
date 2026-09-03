import { resolve } from 'node:path';

const dir = import.meta.dirname;

export default {
  build: {
    lib: {
      entry: {
        index: resolve(dir, 'src/index.ts'),
      },
      formats: ['es'],
    },
  },
};
