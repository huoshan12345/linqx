import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'node',
    setupFiles: ['test/setup-files.ts'],
    globals: true,
    env: {
      NODE_ENV: 'test',
    },
  },
  plugins: [
  ],
});
