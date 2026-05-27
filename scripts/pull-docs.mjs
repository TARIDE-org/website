#!/usr/bin/env node
// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2026 Stichting TARIDE (TARIDE Foundation)
// Pull the TARIDE spec documents from TARIDE-org/docs into the main site's
// content collection. Run before `astro build` (CI and local). Prose is kept
// verbatim; the script only injects render frontmatter and rewrites relative
// image paths to absolute ones served from /docs/images/.
import { execSync } from 'node:child_process';
import { mkdirSync, rmSync, readFileSync, writeFileSync, copyFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DOCS_REPO = 'https://github.com/TARIDE-org/docs.git';
const TMP = '/tmp/taride-docs-pull';
const CONTENT_DIR = 'src/main/content/docs';
const IMAGES_OUT = 'public/docs/images';

// The five spec documents, in reading order, with display titles.
const DOCS = [
  { src: 'taride_foundation.md',        slug: 'foundation',    title: 'Foundation document', order: 1 },
  { src: 'briefs/telecom_brief.md',     slug: 'telecom',       title: 'Telecom brief',       order: 2 },
  { src: 'briefs/threat_model.md',      slug: 'threat-model',  title: 'Threat model',        order: 3 },
  { src: 'briefs/privacy_analysis.md',  slug: 'privacy',       title: 'Privacy analysis',    order: 4 },
  { src: 'briefs/technical_summary.md', slug: 'technical',     title: 'Technical summary',   order: 5 },
];

const VERSION = 'v0.51';

function sh(cmd) {
  return execSync(cmd, { encoding: 'utf8' }).trim();
}

console.log('Cloning TARIDE-org/docs ...');
rmSync(TMP, { recursive: true, force: true });
sh(`git clone --depth 1 ${DOCS_REPO} ${TMP}`);

mkdirSync(CONTENT_DIR, { recursive: true });
mkdirSync(IMAGES_OUT, { recursive: true });

// Copy referenced images, served from /docs/images/.
const imgDir = join(TMP, 'images');
if (existsSync(imgDir)) {
  for (const f of readdirSync(imgDir)) {
    copyFileSync(join(imgDir, f), join(IMAGES_OUT, f));
  }
  console.log(`Copied ${readdirSync(imgDir).length} images to ${IMAGES_OUT}`);
}

const yamlEscape = (s) => s.replace(/"/g, '\\"');

for (const doc of DOCS) {
  const srcPath = join(TMP, doc.src);
  let body = readFileSync(srcPath, 'utf8');

  // Rewrite relative image paths to the absolute served path.
  body = body.replace(/\]\(images\//g, '](/docs/images/');

  // Rewrite cross-document links (e.g. ../taride_foundation.md) to site paths.
  const LINK_MAP = {
    'taride_foundation.md': '/docs/foundation/',
    'telecom_brief.md': '/docs/telecom/',
    'threat_model.md': '/docs/threat-model/',
    'privacy_analysis.md': '/docs/privacy/',
    'technical_summary.md': '/docs/technical/',
  };
  for (const [base, path] of Object.entries(LINK_MAP)) {
    body = body.replace(new RegExp('\\]\\([^)]*' + base.replace(/\./g, '\\.') + '\\)', 'g'), `](${path})`);
  }

  // Strip the leading title/meta block. The page chrome already shows the
  // title, version, last-updated, and source link, so repeating it in the
  // body is redundant. Foundation: drop the intro block before the first
  // heading. Briefs: drop the leading "# TARIDE..." title heading.
  if (doc.slug === 'foundation') {
    const idx = body.search(/^# /m);
    if (idx > 0) body = body.slice(idx);
  } else {
    body = body.replace(/^#\s+TARIDE[^\n]*\n+/, '');
  }
  body = body.replace(/^\s+/, '');

  // Last-updated from the most recent commit touching this file.
  let lastUpdated = '';
  try {
    lastUpdated = sh(`git -C ${TMP} log -1 --format=%cs -- ${doc.src}`);
  } catch {
    lastUpdated = '';
  }

  const frontmatter = [
    '---',
    `title: "${yamlEscape(doc.title)}"`,
    `order: ${doc.order}`,
    `version: "${VERSION}"`,
    `lastUpdated: "${lastUpdated}"`,
    `source: "https://github.com/TARIDE-org/docs/blob/main/${doc.src}"`,
    '---',
    '',
  ].join('\n');

  writeFileSync(join(CONTENT_DIR, `${doc.slug}.md`), frontmatter + body);
  console.log(`Wrote ${doc.slug}.md (updated ${lastUpdated || 'unknown'})`);
}

console.log('Done.');
