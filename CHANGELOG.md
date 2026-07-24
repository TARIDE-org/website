<!--
SPDX-License-Identifier: Apache-2.0
SPDX-FileCopyrightText: 2026 Stichting TARIDE (TARIDE Foundation)
-->

# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Apache-2.0 licence applied to source code; CC-BY-4.0 applied to editorial
  content. REUSE.toml, NOTICE, THIRD_PARTY_NOTICES, README, and SPDX
  headers added across the tree.
- Security policy: GitHub private vulnerability reporting.
- Dependabot configuration for weekly npm and GitHub Actions version updates.

### Changed

- Upgraded Astro 6 to 7 (`^6.4.7` to `^7.1.3`). Astro 7 renders Markdown with
  its own pipeline by default; both site configs now set
  `markdown.processor: unified()` and depend on `@astrojs/markdown-remark`
  explicitly, so the rehype plugins and the rendered output are unchanged.

### Fixed

- Print routes (`/docs/print/<slug>/`, the WeasyPrint input for the spec PDFs)
  emitted malformed HTML under Astro 6: the `<title>` was truncated at the
  first interpolation, the `noindex` meta fell outside `<head>`, `<body>` was
  missing, and the `<h1>` was never closed so it enclosed the whole document.
  Astro 7's compiler emits correct markup.

### Security

- Cleared all open Dependabot alerts: Astro authorisation bypass
  (GHSA-vj59-8hwv-xxmv) and three Astro XSS advisories fixed only in the 7.x
  line (GHSA-f48w-9m4c-m7f5, GHSA-4g3v-8h47-v7g6, GHSA-7pw4-f3q4-r2p2), plus
  SVGO GHSA-2p49-hgcm-8545 via svgo 4.0.2.

### Removed

- Internal briefing.md handover document; no longer shipped in the public
  repository.
