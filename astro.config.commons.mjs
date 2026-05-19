import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://commons.taride.org',
  srcDir: './src/commons',
  outDir: './dist/commons',
  publicDir: './public',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
