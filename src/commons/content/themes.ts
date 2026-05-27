// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2026 Stichting TARIDE (TARIDE Foundation)
export const themes = [
  { key: 'privacy-and-digital-rights',        title: 'Privacy and digital rights' },
  { key: 'open-source-and-open-standards',    title: 'Open source and open standards' },
  { key: 'free-knowledge',                    title: 'Free knowledge' },
  { key: 'independent-media',                 title: 'Independent media' },
  { key: 'open-ai-and-digital-infrastructure', title: 'Open AI and digital infrastructure' },
] as const;

export type ThemeKey = typeof themes[number]['key'];
