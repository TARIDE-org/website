// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2026 Stichting TARIDE (TARIDE Foundation)
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// Shift markdown headings down by one, but only if the doc contains any
// h1. Keeps the page's chrome h1 unique without introducing an h1 -> h3
// skip on docs that already start at ##.
function rehypeShiftHeadings() {
  return (tree) => {
    let hasH1 = false;
    const find = (node) => {
      if (hasH1) return;
      if (node.type === 'element' && node.tagName === 'h1') hasH1 = true;
      else if (node.children) node.children.forEach(find);
    };
    find(tree);
    if (!hasH1) return;
    const shift = (node) => {
      if (node.type === 'element' && /^h[1-5]$/.test(node.tagName)) {
        const n = parseInt(node.tagName.slice(1), 10);
        node.tagName = `h${n + 1}`;
      }
      if (node.children) node.children.forEach(shift);
    };
    shift(tree);
  };
}

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
      rehypeShiftHeadings,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { class: 'heading-anchor', ariaHidden: 'true', tabIndex: -1 },
          // No text content: the visible `#` is rendered via a CSS ::after
          // on .heading-anchor, so it does not appear in Astro's headings.text
          // (which would otherwise leak into the TOC).
          content: () => [],
        },
      ],
    ],
  },
  integrations: [
    sitemap({ filter: (page) => !page.includes('/docs/print/') }),
  ],
});
