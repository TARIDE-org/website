#!/usr/bin/env node
// Generate a PDF per spec doc from the build-only print routes, using
// weasyprint in a container. Skips gracefully where docker is unavailable
// (e.g. local dev); runs on the self-hosted runner.
//
// Pipeline: serve dist/main over a local HTTP server, point weasyprint at the
// /docs/print/<slug>/ pages (so absolute /fonts, /_astro, /docs/images URLs
// resolve), write /docs/<slug>.pdf, then delete the print pages from dist so
// they are not deployed.
import { execSync, spawn } from 'node:child_process';
import { existsSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist/main';
const PRINT_DIR = join(DIST, 'docs', 'print');
const IMAGE = 'taride-weasyprint';
const PORT = 8788;

function have(cmd) {
  try { execSync(cmd, { stdio: 'ignore' }); return true; } catch { return false; }
}

if (!have('docker info')) {
  console.log('[pdf] docker unavailable, skipping PDF generation');
  process.exit(0);
}
if (!existsSync(PRINT_DIR)) {
  console.log('[pdf] no print pages found, skipping');
  process.exit(0);
}

const slugs = readdirSync(PRINT_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

if (slugs.length === 0) {
  console.log('[pdf] no doc slugs, skipping');
  process.exit(0);
}

console.log('[pdf] building weasyprint image (cached after first run)');
execSync(`docker build -q -t ${IMAGE} -f deploy/weasyprint.Dockerfile deploy`, { stdio: 'inherit' });

console.log(`[pdf] serving ${DIST} on :${PORT}`);
const server = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1', '--directory', DIST], {
  stdio: 'ignore',
});

// Give the server a moment to start.
execSync('sleep 1');

try {
  for (const slug of slugs) {
    const url = `http://127.0.0.1:${PORT}/docs/print/${slug}/`;
    const out = `/out/docs/${slug}.pdf`;
    console.log(`[pdf] rendering ${slug}`);
    execSync(
      `docker run --rm --network host -v "${process.cwd()}/${DIST}:/out" ${IMAGE} "${url}" "${out}" --quiet`,
      { stdio: 'inherit' },
    );
  }
} finally {
  server.kill();
  // Do not ship the intermediate print pages.
  rmSync(PRINT_DIR, { recursive: true, force: true });
}

console.log(`[pdf] done: ${slugs.length} PDFs at ${DIST}/docs/<slug>.pdf`);
