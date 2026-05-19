import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
  integrations: [
    sitemap(),
  ],
});
