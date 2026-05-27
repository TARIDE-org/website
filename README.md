<!--
SPDX-License-Identifier: Apache-2.0
SPDX-FileCopyrightText: 2026 Stichting TARIDE (TARIDE Foundation)
-->

# TARIDE website

Source for the TARIDE Foundation public website. One Astro project, two outputs:

- `taride.org` (the main site, including the spec documentation)
- `commons.taride.org` (the European digital commons sub-project)

The TARIDE specification documents themselves live in
[`TARIDE-org/docs`](https://github.com/TARIDE-org/docs) and are pulled in at
build time by `scripts/pull-docs.mjs`. The shared visual design system lives in
[`TARIDE-org/design-system`](https://github.com/TARIDE-org/design-system).

## Building

Prerequisites: Node 22, npm.

    npm ci
    npm run build         # builds both sites into dist/main/ and dist/commons/
    npm run dev:main      # local dev server for the main site
    npm run dev:commons   # local dev server for Commons

PDF generation for the spec documents uses WeasyPrint via Docker; see
`deploy/weasyprint.Dockerfile`. The PDF build step is skipped automatically
where Docker is unavailable.

## Repository layout

    src/main/         Pages, layouts, and content for taride.org
    src/commons/      Pages, layouts, and content for commons.taride.org
    src/shared/       Components and design tokens used by both sites
    public/           Static assets shipped as-is (fonts, logos, scripts)
    scripts/          Build helpers (pull-docs, build-pdfs)
    deploy/           Deployment configuration (nginx vhost, container image)
    .github/workflows Deployment pipelines

## Licensing

This project follows the [REUSE specification](https://reuse.software):

- Source code is licensed under the **Apache License, Version 2.0** (see
  [LICENSE](LICENSE) and [LICENSES/Apache-2.0.txt](LICENSES/Apache-2.0.txt)).
- Editorial content (Markdown documents, page copy, diagrams) is licensed
  under **Creative Commons Attribution 4.0 International** (see
  [LICENSES/CC-BY-4.0.txt](LICENSES/CC-BY-4.0.txt)).
- IBM Plex font files under `public/fonts/` are licensed under the
  **SIL Open Font License 1.1** (see
  [LICENSES/OFL-1.1.txt](LICENSES/OFL-1.1.txt)).
- The TARIDE name, wordmark, and bracket motif are trademarks of
  Stichting TARIDE. See [NOTICE](NOTICE).

Per-file licence assignments are encoded in SPDX headers and in
[REUSE.toml](REUSE.toml). A summary of third-party components is in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Contributing

Working rules and project conventions are in [CLAUDE.md](CLAUDE.md). Before
adding a dependency, check its licence against the allowed list there and
update `THIRD_PARTY_NOTICES.md`.

## Security

To report a security vulnerability, please use GitHub's private
vulnerability reporting (Security tab on the repository). See
[SECURITY.md](SECURITY.md) for details.
