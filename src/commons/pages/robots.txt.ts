import type { APIRoute } from 'astro';

const body = `# Commons curates non-profits keeping European digital infrastructure
# independent. We are happy to be indexed by search engines and answered
# by live-answer assistants, but we do not consent to having this content
# scraped for training AI models. Blocked agents are the four most-used
# training crawlers (per their public documentation).

User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Anthropic-AI
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: *
Allow: /

Sitemap: https://commons.taride.org/sitemap-index.xml
`;

export const GET: APIRoute = () =>
  new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
