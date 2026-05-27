<!--
SPDX-License-Identifier: Apache-2.0
SPDX-FileCopyrightText: 2026 Stichting TARIDE (TARIDE Foundation)
-->

# Security policy

## Reporting a vulnerability

If you believe you have found a security vulnerability affecting the
TARIDE website (`taride.org`, `commons.taride.org`), please report it
privately through GitHub:

- Go to the repository at https://github.com/TARIDE-org/website
- Click the **Security** tab
- Choose **Report a vulnerability**

This opens a private advisory visible only to you and the maintainers.
Please do not open a public issue or pull request for security
vulnerabilities.

If GitHub's private reporting is not available to you, contact the
foundation through the channels listed at https://taride.org/contact and
mark the message as a security report.

## What to include

When reporting, please include:

- A description of the vulnerability and its potential impact.
- The URL or component affected.
- Steps to reproduce, including any proof-of-concept code or payloads.
- The version, commit, or deployment timestamp where you observed the
  issue, if known.

## What to expect

- We aim to acknowledge new reports within five working days.
- We will keep you informed as we investigate and decide on remediation.
- We will credit reporters in the advisory unless asked otherwise.

## Scope

In scope:

- The two production sites `taride.org` and `commons.taride.org`.
- Source code in this repository.
- The build pipeline as configured in `.github/workflows/`.

Out of scope:

- Issues that require physical access to a maintainer's machine.
- Reports based purely on missing best-practice HTTP headers without a
  demonstrated exploit.
- Vulnerabilities in third-party services we link to but do not operate.
- Spam, phishing, or social-engineering attacks unrelated to the site
  itself.

## Supported versions

This site is a single rolling deployment built from the `main` branch.
Only the current deployment is supported. There are no release branches
to maintain.
