// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2026 Stichting TARIDE (TARIDE Foundation)
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

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
  // No-op image service: this site uses only static SVGs, so sharp/libvips
  // is never loaded. See THIRD_PARTY_NOTICES.md for the licence rationale.
  image: {
    service: { entrypoint: 'astro/assets/services/noop' },
  },
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { class: 'heading-anchor', ariaHidden: 'true', tabIndex: -1 },
          content: { type: 'text', value: '#' },
        },
      ],
    ],
  },
  integrations: [
    sitemap({ filter: (page) => !page.includes('/docs/print/') }),
  ],
});
