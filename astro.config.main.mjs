import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://taride.org',
  srcDir: './src/main',
  outDir: './dist/main',
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
