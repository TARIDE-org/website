// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2026 Stichting TARIDE (TARIDE Foundation)
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';

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
  // No-op image service: this site uses only static SVGs, so sharp/libvips
  // is never loaded. See THIRD_PARTY_NOTICES.md for the licence rationale.
  image: {
    service: { entrypoint: 'astro/assets/services/noop' },
  },
  // Astro 7 renders Markdown with its native pipeline by default. The
  // organisation entries were authored against the unified pipeline, so
  // keep it here too and render exactly as on Astro 6.
  markdown: {
    processor: unified(),
  },
  integrations: [
    sitemap(),
  ],
});
