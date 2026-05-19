# Briefing: taride.org

Context, scope, and constraints for building the main Taride Foundation website. This is the umbrella brief. The companion file `commons-handover.md` covers the Commons sub-project on `commons.taride.org`. Where the two conflict, this brief wins on visual identity, hosting, and shared infrastructure; the Commons brief wins on what is specific to `commons.taride.org`.

---

## 1. Purpose

`taride.org` becomes the canonical home for the TARIDE Foundation: positioning, specification documents, governance, and the channels through which external reviewers and institutions engage. It replaces the current GitHub Pages surface attached to `TARIDE-org/docs`. The docs repository remains the editorial backend; it stops being the public face.

## 2. Audience

The site speaks to three audiences in declining order of priority for v0:

1. **Technical reviewers** – telecom providers, security researchers, privacy advocates, and the DID/SSI community whose feedback the foundation actively solicits.
2. **Institutional readers** – policymakers, regulators, procurement, journalists, partner organisations.
3. **Subsidy and grant reviewers** – NLnet, NGI, EU programmes, and other funders assessing the foundation's eligibility, governance, and deliverables. They need quick paths to legal status, board composition, and the spec's current state.
4. **Curious visitors** – anyone arriving from a link, a talk, or a search result.

The homepage routes between them with explicit paths. It does not pick one and bury the others.

## 3. URLs

- Main site: `taride.org`. `www.taride.org` 301-redirects to apex.
- Commons subsite: `commons.taride.org` – see `commons-handover.md`.
- Umami admin: `umami.taride.org`.
- DNS: TransIP. Records stay there; only A/AAAA and CNAMEs change.
- Source repositories:
  - Website: `github.com/TARIDE-org/website` (new, public, to be confirmed).
  - Docs: `github.com/TARIDE-org/docs` (retained, editorial backend).
  - Design system: `github.com/TARIDE-org/design-system` (retained, consumed as dependency).
- Language at launch: English (UK), single locale, matching the design system's typography rules and the Commons brief.

## 4. Information architecture

```
taride.org
├── /                       Homepage – positioning + routes for the three audiences
├── /docs/                  Specification entry point
│   ├── /docs/foundation/   The Taride Foundation document
│   ├── /docs/telecom/      Telecom brief
│   ├── /docs/threat-model/ Threat model
│   ├── /docs/privacy/      Privacy analysis
│   └── /docs/technical/    Technical summary
├── /updates/               Changelog / news, with RSS at /updates/rss.xml
│   └── /updates/[slug]/
├── /governance/            Foundation, board (Martin Voorzanger, Leonard Wolters, one open seat), funders, conflict-of-interest
├── /review/                Get involved – targeted technical review programme
├── /donate/                Support the foundation
├── /press/                 Press kit – logos, boilerplate, bios, assets
├── /contact/               Contact details and feedback routes
├── /privacy/               Privacy statement
├── /imprint/               Legal entity details
└── /licence/               Content licence (CC BY 4.0, inherited)
```

Each `/docs/*` page renders the source markdown from `TARIDE-org/docs` styled per the design system, with a PDF download of the same content alongside.

Commons sits at `commons.taride.org` and is linked from the footer and from one sentence on the homepage. It is not surfaced in the primary header, because it is a sub-project rather than a primary route, and the Commons brief notes it may move to its own domain later.

## 5. Navigation

**Header (sticky, single row):**
`Taride` (wordmark, links home) · `Docs` · `Review` · `Updates` · `Governance` · `Donate` · `Contact`

**Footer.** Top: a single-line newsletter signup – email field, Subscribe button, one-line description ("Occasional updates from the foundation. Double opt-in. No tracking."). Below, four columns:

1. Sitemap (the header items expanded, plus Press, Privacy, Imprint, Licence).
2. Projects – currently `Commons →` only.
3. Legal – Stichting name and KvK 42061504, location, `info@taride.org`, link to imprint. No ANBI claim.
4. Source – design system, website repo, content licence.

**On `/docs/`:** a left rail with the five document titles in reading order (foundation first), and a right rail with the current document's section headings as anchor links. On mobile both collapse into a top "Contents" disclosure.

## 6. Functionality

In scope for v0:

- **Docs renderer.** Astro content collections, anchored headings, copy-anchor-on-click, prev/next links between briefs.
- **Full-text search across docs.** Pagefind, built at deploy time. Static, no server. Keyboard shortcut `/` to focus.
- **Versioning signal.** Each doc renders its current version (e.g. `v0.51`) and a "last updated" timestamp from the most recent git commit to that file.
- **Updates feed.** Markdown posts, list view, per-post pages, RSS at `/updates/rss.xml`.
- **Outbound click counting via self-hosted Umami** for the Commons subsite (per the Commons brief). On the main site, page views only.
- **Anchor-aware redirects.** Old GitHub Pages URLs 301 to their new paths.
- **Donate page.** Static page presenting bank transfer (Triodos IBAN) and a hosted-checkout link to Mollie. No embedded payment widget; the rule against third-party scripts holds. Page states plainly that the foundation has no ANBI status and donations are not tax-deductible in the Netherlands.
- **Mailing list signup.** Form posts to self-hosted Listmonk on the same Hetzner infrastructure. Double opt-in, EU-resident data, no cookies on the marketing site, no tracking pixels, unsubscribe link in every email.
- **PDF builds.** Each `/docs/*` page has a downloadable PDF generated at build time from the same markdown source, using paged.js + headless Chromium so the design system's CSS renders directly without a parallel template.
- **Custom 404.** Plain page with the search input and a link home.

Deferred (see §13):

- On-site contact form. Contact happens via email or PR.
- Inline annotation or comments on spec pages.

## 7. Content sources and sync

- **Specification docs.** `TARIDE-org/docs` remains the editorial source. The website consumes those markdown files at build time via a pinned dependency or a CI checkout step. A push to docs triggers a website rebuild. No copy-paste duplication.
- **Updates.** Authored in the website repo under `content/updates/*.md`. PR per post.
- **Governance, press, review, donate, contact pages.** Authored in the website repo. Short, mostly static.
- **Commons content.** Per the Commons brief: per-organisation markdown files under `content/commons/` in the same repo (one Astro project, two outputs).

## 8. Tech stack

- **Astro** as the static site generator. One project, two site outputs (`taride.org` and `commons.taride.org`) built into separate `dist/` directories from the same codebase, with the design system consumed as a versioned dependency.
- **Design system** from `TARIDE-org/design-system`, pinned to a git tag (avoids the drift you get with submodules).
- **Self-hosted IBM Plex** (Serif / Sans / Mono) woff2 served from the design-system bundle. No Google Fonts, no third-party font CDN.
- **Hosting on Hetzner.** Existing Taride Hetzner infrastructure. Reverse proxy with automatic Let's Encrypt TLS serves both static sites on their respective subdomains. Umami, Listmonk, and any future services run alongside.
- **Analytics: self-hosted Umami** on the same infrastructure, Postgres alongside, admin at `umami.taride.org`.
- **Mailing list: self-hosted Listmonk** on the same infrastructure. Postgres alongside (shared instance acceptable). SMTP via a sovereign EU relay (to confirm, §13).
- **Donate flow:** foundation account at Triodos Bank, hosted checkout via Mollie. Server-rendered page links out to Mollie and shows the Triodos IBAN for direct transfer. No client-side payment script.
- **CI/CD.** GitHub Actions builds both site outputs, rsyncs over SSH to the Hetzner host, atomic swap via symlink.
- **DNS.** TransIP. A/AAAA and CNAME records updated; nameservers unchanged.
- **Repo visibility.** Public.

**Explicitly avoided:** React / Next / Nuxt, Vercel, Netlify, Cloudflare in front of the origin (acceptable only as a fallback if Hetzner egress proves a problem, and a deliberate decision then), any US analytics, any cookies at launch, any third-party scripts.

## 9. Design constraints

Inherited from the locked Taride design system (Direction A). Repeated here only to flag the points that govern site-level decisions:

- IBM Plex Serif (display), Sans (body), Mono (labels and code), self-hosted woff2.
- Palette: Ink `#10100B`, Paper `#F7F4ED`, Accent `#0A55C7`, Verified `#E8B43A`. The verified yellow is reserved for credential-verification markers and is not used as a decorative site accent.
- Breakpoints 640 / 900 / 1200. Reading column 680px. Container 1200px.
- No gradients, no background images behind text, no decorative icon sets. Bracket motif and typographic punctuation per the design system.
- Light and dark modes via the system's semantic tokens. Respect `prefers-color-scheme`; no manual toggle.
- Voice: declarative, sober, document-like, UK English, sentence-case headings, no exclamation marks, no emoji, no second-person marketing framing.

Commons inherits the same system with one Commons-specific accent in section labels, defined in its own brief and remaining within the system's tokens.

## 10. Privacy and analytics

- **No cookies at launch.** Designing for zero avoids the EU banner requirement entirely.
- **Self-hosted Umami** for aggregate page views, EU-hosted.
- **No third-party scripts.** None.
- **Outbound link tracking** on the Commons subsite only, aggregate-only.
- **Mailing list** runs on self-hosted Listmonk on EU infrastructure. Double opt-in, no tracking pixels in sent mail, unsubscribe link in every message.
- **Donate flow** does not embed third-party payment scripts. Payment processing happens on the provider's own domain; nothing on `taride.org` itself handles a transaction.
- **Privacy statement at `/privacy/`** stating the above in plain terms.

## 11. Accessibility and performance

- **WCAG 2.2 AA** as a floor. The design system's audit already meets this; the site must not regress it. Verified per page in CI via axe or Pa11y before deploy.
- **Lighthouse:** accessibility ≥ 95, performance ≥ 90 mobile.
- **Initial page weight under 150 KB** on docs pages (HTML + CSS + one font subset); Commons under 100 KB per its brief.
- **TTFB < 200 ms** from European endpoints.
- **CLS < 0.05.**
- Keyboard-first: visible focus rings per design system, skip-to-content link, search shortcut.

## 12. Editorial workflow

- All content lives in markdown. No CMS.
- PR to add or change a doc, an update, a press item, or a Commons entry. Build previews on PR.
- "Last updated" rendered from the most recent commit to the file's directory.
- Doc version (e.g. `v0.51`) read from frontmatter on the foundation doc; briefs inherit unless they override.
- Maintainers and merge rights: to be confirmed (see §13).

## 13. Open decisions (defer to Martin)

These are not for Claude Code to resolve. Surface them as TODOs at the end of the build.

1. **Exact registered name** of the foundation for the imprint. KvK 42061504 confirmed. No ANBI status.
2. **Hetzner infrastructure details** – which host, current reverse-proxy stack, existing services, SSH key handling.
3. **Maintainer set** – who can merge to the website repo, who can deploy.
4. **Updates cadence** – realistic posting rhythm. If quarterly or less, fold into the foundation doc's changelog rather than a standalone section.
5. **Press boilerplate** – one-line and one-paragraph organisation descriptions. To be supplied.
6. **Board bios** – photos (optional) and short bios for Martin Voorzanger, Leonard Wolters, and the third board seat once filled.
7. **Repo location** – `TARIDE-org/website` proposed; confirm name.
8. **Mailing list software and SMTP relay** – Listmonk on the same Hetzner infrastructure suggested. Confirm choice and which EU sender handles outbound mail.
9. **Donate flow** – Mollie account setup; Triodos IBAN to display once the bank account is open; donation-reference convention.

## 14. Definition of done for v0

- `taride.org` and `commons.taride.org` both resolve from Hetzner over HTTPS with valid Let's Encrypt certificates.
- Homepage, five docs pages, updates index, governance, review, press, contact, privacy, imprint, licence, 404 all render.
- All content sourced from markdown; rebuilding from a fresh checkout reproduces the live site bit-for-bit.
- Pagefind search works across docs pages.
- Umami dashboard reachable at the admin domain; page views recording; outbound clicks recording on Commons.
- Lighthouse: accessibility ≥ 95, performance ≥ 90 mobile.
- No third-party scripts load. Verified in the DevTools network tab.
- Old GitHub Pages URLs 301 to their new homes.
- Mobile and desktop layouts readable without horizontal scrolling.
- `Last updated` timestamps render correctly on docs pages and on Commons.
- Donate page resolves; IBAN visible; hosted-checkout link reaches the provider.
- Newsletter signup posts to Listmonk; double opt-in mail arrives within 60 seconds.
- Each `/docs/*` page has a working PDF download generated from the same markdown source.

## 15. Out of scope for v0, candidates for later

- On-site contact or feedback form. Contact happens via email.
- Per-section commenting or annotation on spec documents.
- Multilingual content. No additional languages planned.
- Search across Commons (the curated list is short enough not to need it).
- A dedicated docs versioning UI – current version only at launch; older versions remain accessible via git history.

---

## 16. Notes for Claude Code

- Before writing any code, confirm the open decisions in §13 with Martin.
- Read `commons-handover.md` and `commons.md` for the Commons-specific scope; this brief governs the umbrella.
- Where this brief and the design system conflict, the design system wins on visual identity. Where this brief and `commons-handover.md` conflict, the Commons brief wins on `commons.taride.org`.
- Do not invent copy. Pull from `TARIDE-org/docs` for specification content and ask Martin for homepage, governance, and press copy if it does not exist.
