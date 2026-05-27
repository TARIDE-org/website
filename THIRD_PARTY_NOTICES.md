# Third-party notices

This site bundles or builds against the following third-party software,
content, and assets. Licences and sources are listed for each. The
versions reflect the state pinned in `package.json` / `package-lock.json`
at the time of writing; for the authoritative current set, see
`package-lock.json` and the licence scanner output in CI.

## Build dependencies (npm)

| Component | Version | Licence | Source |
| --- | --- | --- | --- |
| astro | 5.18.1 | MIT | https://astro.build |
| @astrojs/check | 0.9.9 | MIT | https://github.com/withastro/astro/tree/main/packages/language-tools/astro-check |
| @astrojs/sitemap | 3.7.2 | MIT | https://docs.astro.build/en/guides/integrations-guide/sitemap/ |
| pagefind | 1.5.2 | MIT | https://github.com/Pagefind/pagefind |
| rehype-autolink-headings | 7.1.0 | MIT | https://github.com/rehypejs/rehype-autolink-headings |
| rehype-slug | 6.0.0 | MIT | https://github.com/rehypejs/rehype-slug |
| typescript | 5.9.3 | Apache-2.0 | https://www.typescriptlang.org/ |

Transitive dependencies are not listed here; they are pinned in
`package-lock.json` and verified by the licence scanner in CI.

## CI-only tooling

| Component | Licence | Source | Notes |
| --- | --- | --- | --- |
| reuse | Apache-2.0, GPL-3.0-or-later (cli wrapper) | https://github.com/fsfe/reuse-tool | Run by `.github/workflows/licence.yml` to verify REUSE 3.3 compliance. Installed transiently in CI; not vendored, not bundled. |
| license-checker-rseidelsohn | BSD-3-Clause | https://github.com/RSeidelsohn/license-checker-rseidelsohn | Run by `.github/workflows/licence.yml` to scan production npm licences. Installed transiently in CI via `npx`; not vendored, not bundled. |

## Build-time tooling (container image)

| Component | Version | Licence | Source |
| --- | --- | --- | --- |
| WeasyPrint | 62.3 | BSD-3-Clause | https://weasyprint.org |
| pydyf | 0.10.0 | BSD-3-Clause | https://github.com/CourtBouillon/pydyf |
| python (base image) | 3.12-slim | PSF | https://www.python.org |

The Dockerfile that builds this image is `deploy/weasyprint.Dockerfile`.

## Fonts shipped to clients

| Component | Version | Licence | Source |
| --- | --- | --- | --- |
| IBM Plex Sans, Serif, Mono (subset, woff2) | 6.x | OFL-1.1 | https://github.com/IBM/plex |

Licence text accompanies the font files at `public/fonts/LICENSE.txt`
and `LICENSES/OFL-1.1.txt`.

## Editorial content pulled at build time

| Component | Licence | Source |
| --- | --- | --- |
| TARIDE specification documents | CC-BY-4.0 | https://github.com/TARIDE-org/docs |

The `scripts/pull-docs.mjs` step copies these documents into
`src/main/content/docs/` at build time. The source repository carries
its own LICENSE; the copy shipped on the site retains the same licence.

## Build-time tooling (npm, install-only)

| Component | Licence | Source | Notes |
| --- | --- | --- | --- |
| `@img/sharp-libvips-*` (libvips binaries) | LGPL-3.0-or-later | https://github.com/lovell/sharp-libvips | Installed transitively as an optional dependency of `sharp`, which Astro lists in `optionalDependencies` for image processing. This project does not use Astro image features (all site images are SVGs served from `public/`), so libvips is never loaded at build time and is not redistributed in the built site output. The `licence` CI workflow excludes these packages from the licence-checker scan for this reason. |

## Third-party analytics

| Component | Licence | Source |
| --- | --- | --- |
| Umami (self-hosted, script reference only) | MIT | https://github.com/umami-software/umami |

This site loads the Umami tracking script from a self-hosted instance.
No Umami code is vendored in this repository.

## Adding a dependency

Before adding a runtime or build dependency, verify its licence is on
the allowed list in `CLAUDE.md`, update this file, and run the licence
scanner locally.
