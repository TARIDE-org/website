// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2026 Stichting TARIDE (TARIDE Foundation)
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const organisations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/commons/content/organisations' }),
  schema: z.object({
    name: z.string(),
    country: z.string(),
    theme: z.enum([
      'privacy-and-digital-rights',
      'open-source-and-open-standards',
      'free-knowledge',
      'independent-media',
      'open-ai-and-digital-infrastructure',
    ]),
    fiscal_status: z.string().optional(),
    url: z.string().url(),
    order: z.number(),
  }),
});

export const collections = { organisations };
