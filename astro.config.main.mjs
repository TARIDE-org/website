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
    sitemap(),
  ],
});
