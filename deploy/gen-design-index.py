#!/usr/bin/env python3
"""Generate index.html for the TARIDE design system preview pages.

Usage: gen-design-index.py <design-system-dir>

Scans <dir>/preview/*.html, groups the specimens by filename prefix, and
writes <dir>/index.html styled with the design system's own tokens so the
contents page matches everything it links to.
"""
import sys
import re
import html
from pathlib import Path

root = Path(sys.argv[1])
preview = root / "preview"

ORDER = ["Brand", "Colour", "Typography", "Components", "Layout, spacing and motion", "Other"]


def group_of(name: str) -> str:
    if name.startswith("brand-"):
        return "Brand"
    if name.startswith("colors-"):
        return "Colour"
    if name.startswith("type-"):
        return "Typography"
    if name.startswith("component"):
        return "Components"
    if name.startswith(("spacing-", "elevation", "motion", "radii")):
        return "Layout, spacing and motion"
    return "Other"


def label_of(path: Path) -> str:
    # Prefer a real <title> when the specimen has one (most are title-less
    # fragments, so this is the exception rather than the rule).
    try:
        text = path.read_text(encoding="utf-8", errors="ignore")
        m = re.search(r"<title>(.*?)</title>", text, re.S)
        if m and m.group(1).strip():
            t = html.unescape(m.group(1)).strip()
            t = re.sub(r"^TARIDE\s*[—–-]\s*", "", t)
            t = t.replace(" — ", " · ").replace(" – ", " · ")
            if t:
                return t
    except Exception:
        pass
    # Fallback: prettify the filename, dropping the redundant category prefix
    # (the group heading already carries it). "spacing-" is kept for clarity.
    stem = path.stem
    for pref in ("brand-", "colors-", "type-", "components-", "component-"):
        if stem.startswith(pref):
            stem = stem[len(pref):]
            break
    stem = stem.replace("-", " ").strip()
    return stem[:1].upper() + stem[1:] if stem else path.stem


groups: dict[str, list[tuple[str, str]]] = {}
for f in sorted(preview.glob("*.html")):
    groups.setdefault(group_of(f.name), []).append((label_of(f), f"preview/{f.name}"))

sections = []
for g in ORDER:
    items = groups.get(g)
    if not items:
        continue
    links = "\n".join(
        f'        <li><a href="{href}">{html.escape(label)}</a></li>'
        for label, href in items
    )
    sections.append(
        f'    <section class="grp">\n      <h2>{html.escape(g)}</h2>\n      <ul class="links">\n{links}\n      </ul>\n    </section>'
    )

sections_html = "\n".join(sections)
count = sum(len(v) for v in groups.values())

doc = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>TARIDE Design System</title>
<meta name="description" content="Rendered specimens of the TARIDE design system: colour, typography, components, brand, and layout tokens.">
<link rel="stylesheet" href="colors_and_type.css">
<link rel="icon" href="assets/taride-logo-mono.svg" type="image/svg+xml">
<style>
  html, body {{ margin: 0; }}
  .wrap {{ max-width: var(--container-max); margin: 0 auto; padding: var(--sp-7) var(--sp-5) var(--sp-9); }}
  header.top {{ border-bottom: 1px solid var(--border); padding-bottom: var(--sp-5); margin-bottom: var(--sp-7); }}
  .eyebrow {{ font-family: var(--font-mono); font-size: var(--fs-mono-sm); text-transform: uppercase; letter-spacing: var(--tr-eyebrow); color: var(--accent); }}
  h1 {{ font-family: var(--font-display); font-weight: 400; font-size: var(--fs-h1); letter-spacing: var(--tr-display); margin: var(--sp-3) 0 var(--sp-4); }}
  .lede {{ font-size: var(--fs-h4); line-height: var(--lh-tight); color: var(--fg-soft); max-width: 60ch; margin: 0; }}
  .extra {{ display: flex; gap: var(--sp-5); flex-wrap: wrap; margin-top: var(--sp-5); }}
  .extra a {{ color: var(--accent); font-family: var(--font-mono); font-size: var(--fs-mono-sm); text-transform: uppercase; letter-spacing: var(--tr-eyebrow); text-decoration: none; }}
  .extra a:hover {{ text-decoration: underline; text-underline-offset: 3px; }}
  .grp {{ margin-bottom: var(--sp-7); }}
  .grp h2 {{ font-family: var(--font-body); font-weight: 500; font-size: var(--fs-h3); margin: 0 0 var(--sp-4); letter-spacing: 0; }}
  ul.links {{ list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--sp-3); }}
  ul.links a {{ display: block; padding: var(--sp-3) var(--sp-4); border: 1px solid var(--border); border-radius: var(--radius-xs); background: var(--bg-raised); text-decoration: none; color: var(--fg); }}
  ul.links a:hover {{ border-color: var(--accent); color: var(--accent); }}
  footer.bot {{ border-top: 1px solid var(--border); margin-top: var(--sp-8); padding-top: var(--sp-5); font-size: var(--fs-small); color: var(--fg-muted); }}
  footer.bot a {{ color: var(--accent); }}
</style>
</head>
<body>
  <div class="wrap">
    <header class="top">
      <span class="eyebrow">TARIDE Design System</span>
      <h1>Rendered specimens</h1>
      <p class="lede">The colour, typography, component, brand, and layout tokens that the TARIDE sites are built from. Each page is a live specimen with a light and dark view.</p>
      <div class="extra">
        <a href="ui_kits/website/index.html">Website mockup</a>
        <a href="https://github.com/TARIDE-org/design-system" rel="noopener">Source on GitHub</a>
      </div>
    </header>

{sections_html}

    <footer class="bot">
      TARIDE design system. Source and licence at <a href="https://github.com/TARIDE-org/design-system" rel="noopener">github.com/TARIDE-org/design-system</a>. Part of <a href="https://taride.org">taride.org</a>.
    </footer>
  </div>
</body>
</html>
"""

(root / "index.html").write_text(doc, encoding="utf-8")
print(f"Wrote {root / 'index.html'}: {count} specimens across {len([g for g in ORDER if groups.get(g)])} groups")
