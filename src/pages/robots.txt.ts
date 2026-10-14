export const prerender = true;

import type { APIRoute } from 'astro';

const ROBOTS_TXT = `
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
`.trim();

export const GET: APIRoute = () => {
  return new Response(ROBOTS_TXT, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
