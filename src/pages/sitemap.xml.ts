export const prerender = true;

import { getCollection } from 'astro:content';
import { postUrl } from '../utils/postUrl';

const SITE = 'https://crazzymonday.com';

export const GET = async () => {
  const posts = await getCollection('blog');
  const totalPages = Math.ceil(posts.length / 10);

  const urls: { loc: string; priority: string; lastmod?: string }[] = [
    { loc: `${SITE}/`, priority: '1.0' },
    { loc: `${SITE}/about`, priority: '0.5' },
    { loc: `${SITE}/privacy`, priority: '0.3' },
    { loc: `${SITE}/blog`, priority: '0.8' },
  ];

  for (let p = 2; p <= totalPages; p++) {
    urls.push({ loc: `${SITE}/page/${p}`, priority: '0.3' });
    urls.push({ loc: `${SITE}/blog/page/${p}`, priority: '0.3' });
  }
  for (const post of posts) {
    urls.push({ loc: `${SITE}${postUrl(post.slug, post.data.date)}`, priority: "0.7", lastmod: post.data.date.toISOString() });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}<priority>${u.priority}</priority></url>`).join('\n')}
</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
