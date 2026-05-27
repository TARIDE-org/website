<!--
SPDX-License-Identifier: Apache-2.0
SPDX-FileCopyrightText: 2026 Stichting TARIDE (TARIDE Foundation)
-->

# Project handover

This document sets the ground rules for working on this project. Read it before making changes. If anything here conflicts with a user instruction, stop and ask.

## Project context

- Name: TARIDE website
- Purpose: Source for the TARIDE Foundation public sites `taride.org` and `commons.taride.org`. One Astro project, two outputs. Spec documents are pulled at build time from `TARIDE-org/docs`; the design system is consumed from `TARIDE-org/design-system`.
- Target license: Apache-2.0 for source code; CC-BY-4.0 for editorial content (Markdown documents, page copy, diagrams). Per-file mapping in `REUSE.toml`.
- Languages and stack: Astro 5 (TypeScript), npm, Node 22. PDF generation uses WeasyPrint via a Docker image (`deploy/weasyprint.Dockerfile`).
- Public repository: yes (`github.com/TARIDE-org/website`).
- Owner / point of contact: Stichting TARIDE. Security reports via GitHub's private vulnerability reporting; see `SECURITY.md`.

## Licensing

- Every source file starts with an SPDX header (see "File conventions" below).
- The repository root has a single `LICENSE` file. Do not introduce a second one.
- Match the target license set above. If you think a file needs a different license, ask first.
- The project follows the REUSE specification: https://reuse.software

## Dependencies

Before adding any dependency:

1. Check its license. Allowed without asking: MIT, BSD-2-Clause, BSD-3-Clause, Apache-2.0, ISC, Unlicense, CC0-1.0, MPL-2.0.
2. Not allowed without explicit approval: GPL-2.0, GPL-3.0, LGPL, AGPL, SSPL, BUSL, "no license" repositories, and custom non-OSI licenses.
3. Add the dependency to `THIRD_PARTY_NOTICES.md` with name, version, license, and source URL.
4. Prefer well-maintained packages over obscure ones. If unsure, suggest two options and let the owner pick.

Never `curl | sh` something from the internet, and do not copy code from blogs, Stack Overflow, or other repositories directly. If an external source inspires an approach, write the code from scratch in your own words.

## Code originality

- Write implementations from scratch.
- For well-known algorithms, work from the public description, not from memory of a specific famous implementation.
- Do not reach for "the standard implementation of X" when X has a single famous source (for example, the Quake fast inverse square root).
- If a piece of generated code feels suspiciously polished or oddly specific, flag it so the owner can run a similarity check.

## Test data and fixtures

- Test data must be synthetic, or come from a clearly public-domain source (CC0, open government data, and so on).
- Do not include real production data, screenshots from copyrighted applications, copyrighted sample files, or branded assets.
- Images, fonts, and icons need a clear license. Prefer CC0 or MIT-licensed sets. Add them to `THIRD_PARTY_NOTICES.md`.

## File conventions

Every source file starts with these two lines (adjusted for the file's comment syntax):

<!-- REUSE-IgnoreStart -->

    SPDX-License-Identifier: <license>
    SPDX-FileCopyrightText: <year> <copyright holder>

<!-- REUSE-IgnoreEnd -->

For files that genuinely cannot carry a header (binaries, some config formats), add an entry to `REUSE.toml` instead.

Other conventions:

- Use sentence case for headings in Markdown.
- Keep commit messages factual and short. No marketing language.
- Prefer plain prose over heavy formatting in documentation.

## Tooling and CI

Keep these checks passing:

- `reuse lint`
- License scanner: `license-checker --failOn 'GPL;AGPL;SSPL'` for Node, `pip-licenses --fail-on 'GPL'` for Python, or the equivalent for the stack in use.
- SBOM generation: `syft` or `cyclonedx`, output committed or attached to releases.
- Unit and integration tests.
- Linter and formatter.

If you add or change a dependency, run the license scan locally before committing.

## Ask before doing any of these

- Adding a dependency with a license outside the allowed list.
- Changing the project license.
- Adding a non-trivial block of code adapted from an external source.
- Adding any binary asset larger than a few kilobytes.
- Editing or removing `LICENSE`, `NOTICE`, or `THIRD_PARTY_NOTICES.md`.
- Adding telemetry, analytics, crash reporting, or any network call to a third-party service.
- Adding code that handles personal data, payments, or authentication.

## Release checklist

Before tagging a release:

- [ ] `LICENSE` present at the repository root and matches the target license.
- [ ] `README.md` states the license clearly.
- [ ] `THIRD_PARTY_NOTICES.md` is up to date.
- [ ] `reuse lint` passes.
- [ ] License scanner passes with no warnings.
- [ ] SBOM is committed or attached to the release.
- [ ] No copyrighted test data, fixtures, or assets in the repository.
- [ ] CHANGELOG is updated.
- [ ] Version number bumped following SemVer.

## Working style

- Small, reviewable changes are better than large ones.
- Tests in the same change as the code they cover.
- When unsure about scope, ask before expanding it.
- A short clarification now beats a cleanup three months later.

## Out of scope for this assistant

Do not:

- Push to remote branches without confirmation.
- Open or merge pull requests without confirmation.
- Run destructive commands (`rm -rf`, `git reset --hard`, `git push --force`) without confirmation.
- Modify CI secrets, environment variables, or deployment configuration without confirmation.
