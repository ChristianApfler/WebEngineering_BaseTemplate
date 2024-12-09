import { defineConfig } from 'vite';

const repoName = 'WebEngineering_BaseTemplate';
export default defineConfig({
  root: 'src',
  build: {
    outDir: '../build',
  },
  base: `/${repoName}/`,
  /* test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },*/
  // include: ['**/*.test.ts', '**/*.spec.ts', '../test/**/*.test.ts'],
  // },
});
