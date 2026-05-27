// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2026 Stichting TARIDE (TARIDE Foundation)
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/main/content/docs' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    version: z.string(),
    lastUpdated: z.string(),
    source: z.string().url(),
  }),
});

export const collections = { docs };
