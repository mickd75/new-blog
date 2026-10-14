#!/usr/bin/env node
/**
 * Import a WordPress export (WXR .xml) into this Astro site's content collections.
 *
 * Usage:
 *   1. WordPress admin → Tools → Export → All content → save as wordpress.xml
 *   2. node scripts/import-wp.mjs wordpress.xml [--pages]
 *      (default imports posts into src/content/blog; --pages imports pages
 *       into src/content/pages — review then wire them up in src/pages/)
 *
 * - Converts HTML to Markdown (Turndown)
 * - Downloads images referenced in the content into public/wp-images/
 * - Writes old-URL → new-URL redirects to public/_redirects (appends)
 * - Generates frontmatter matching src/content.config.ts (blog schema)
 */
import { XMLParser } from 'fast-xml-parser';
import TurndownService from 'turndown';
import { mkdir, writeFile, readFile, appendFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sanitize from 'sanitize-filename';

const wxrPath = process.argv[2];
const importPages = process.argv.includes('--pages');
if (!wxrPath) {
  console.error('Usage: node scripts/import-wp.mjs <wordpress-export.xml> [--pages]');
  process.exit(1);
}

const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
td.keep(['iframe']); // embeds stay as HTML; review manually

const xml = await readFile(wxrPath, 'utf8');
const doc = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  trimValues: true,
  processEntities: true,
  htmlEntities: true,
}).parse(xml);

const channel = doc.rss?.channel;
if (!channel) { console.error('Not a valid WXR file'); process.exit(1); }
const items = [].concat(channel.item ?? []);
const ns = { content: 'encoded', 'wp': 'wp', 'dc': 'dc', excerpt: 'excerpt' };

const text = (v) => (typeof v === 'object' && v ? (v['#text'] ?? v._ ?? '') : (v ?? '')).toString().trim();

await mkdir('public/wp-images', { recursive: true });
await mkdir(importPages ? 'src/content/pages' : 'src/content/blog', { recursive: true });

const redirects = [];
let imgCount = 0;

async function downloadImage(url, refersTo) {
  if (!/^https?:\/\//.test(url)) return url;
  let name;
  try {
    name = sanitize(new URL(url).pathname.split('/').pop() || 'image');
    if (!/\.(jpe?g|png|gif|webp|svg|avif)$/i.test(name)) name += '.jpg';
    const dest = path.join('public/wp-images', name);
    if (!existsSync(dest)) {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await writeFile(dest, Buffer.from(await res.arrayBuffer()));
      imgCount++;
    }
    return `/wp-images/${name}`;
  } catch (e) {
    console.warn(`  ! image failed (${e.message}): ${url}`);
    return url;
  }
}

let count = 0;
for (const item of items) {
  const postType = text(item['wp:post_type']);
  const status = text(item['wp:status']);
  if (importPages ? postType !== 'page' : postType !== 'post') continue;
  if (status === 'trash' || status === 'auto-draft') continue;

  const title = text(item.title) || 'Untitled';
  const date = text(item['wp:post_date']).split(' ')[0] || '1970-01-01';
  const slug = sanitize(text(item['wp:post_name']) || title.toLowerCase().replace(/[^a-z0-9]+/g, '-')).slice(0, 80);
  let html = text(item['content:encoded']);
  const excerpt = text(item['excerpt:encoded']) || text(item.description);

  // strip WP cruft
  html = html
    .replace(/<!-- wp:.*?-->/g, '')
    .replace(/<!--\/wp:.*?-->/g, '');

  // download + rewrite images
  const imgUrls = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
  for (const u of new Set(imgUrls)) {
    const local = await downloadImage(u, slug);
    html = html.split(u).join(local);
  }

  let md = td.turndown(html);
  // flag leftover shortcodes for manual review
  md = md.replace(/\[\/?\w+[^\]]*\]/g, (m) => `<!-- TODO shortcode: ${m} -->`);

  const link = text(item.link);
  if (link) {
    const old = '/' + link.replace(/^https?:\/\/[^/]+\/?/, '').replace(/\/$/, '');
    redirects.push(`${old} /${importPages ? slug : 'blog/' + slug}`);
  }

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify((excerpt || title).slice(0, 160))}`,
    `date: '${date}'`,
    importPages ? '' : 'readTime: 5',
    `originalUrl: ${JSON.stringify(link)}`,
    '---',
    '',
  ].join('\n');

  const out = path.join(importPages ? 'src/content/pages' : 'src/content/blog', `${slug}.md`);
  await writeFile(out, frontmatter + md + '\n');
  count++;
  console.log(`✓ ${out}`);
}

if (redirects.length) {
  await appendFile('public/_redirects', '\n# WordPress legacy URLs\n' + redirects.join('\n') + '\n');
  console.log(`↪ appended ${redirects.length} redirects to public/_redirects`);
}
console.log(`\nDone: ${count} ${importPages ? 'pages' : 'posts'}, ${imgCount} images.`);
console.log('Next: review generated markdown (shortcodes/embeds are flagged with TODO comments).');
