#!/usr/bin/env node
/**
 * Backfill category/tags frontmatter on imported posts from the WordPress WXR.
 *
 * Usage: node scripts/backfill-taxonomy.mjs ~/Downloads/wordpress.xml [--dry]
 *
 * Rules:
 * - Posts matched to md files by originalUrl (or wp slug).
 * - category  = the first meaningful WP category (title-cased, "Uncategorized" skipped)
 * - tags      = remaining WP categories + WP tags (e.g. age brackets land here)
 * - Existing category/tags lines in frontmatter are replaced.
 */
import { XMLParser } from 'fast-xml-parser';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const [wxrPath] = process.argv.slice(2);
const DRY = process.argv.includes('--dry');
if (!wxrPath) { console.error('Usage: node scripts/backfill-taxonomy.mjs <export.xml> [--dry]'); process.exit(1); }

const SKIP = new Set(['uncategorized', '']);
const AGE = /^(\d{2})s$/i; // age brackets (20s, 30s) belong in tags
const titleCase = (s) =>
  s.toLowerCase().split(/\s+/).map((w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w.toUpperCase())).join(' ');

const doc = new XMLParser({
  ignoreAttributes: false, attributeNamePrefix: '@_', processEntities: true, htmlEntities: true,
}).parse(await readFile(wxrPath, 'utf8'));

const items = [].concat(doc.rss?.channel?.item ?? []);
const text = (v) => (typeof v === 'object' && v ? (v['#text'] ?? '') : (v ?? '')).toString().trim();
const listOf = (v) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

// build lookup: original URL -> { categories, tags }
const taxByUrl = new Map();
const taxBySlug = new Map();
for (const item of items) {
  if (text(item['wp:post_type']) !== 'post') continue;
  const terms = listOf(item.category).map((c) => ({
    name: text(typeof c === 'object' ? (c['#text'] ?? '') : c),
    domain: typeof c === 'object' ? c['@_domain'] : '',
  }));
  const cats = terms.filter((t) => t.domain === 'category').map((t) => t.name);
  const tags = terms.filter((t) => t.domain === 'post_tag').map((t) => t.name);
  const entry = { cats, tags };
  const link = text(item.link);
  if (link) taxByUrl.set(link.replace(/\/$/, ''), entry);
  const slug = text(item['wp:post_name']);
  if (slug) taxBySlug.set(slug, entry);
}

const dir = 'src/content/blog';
const files = (await readdir(dir)).filter((f) => f.endsWith('.md'));
let updated = 0, categorized = 0, skipped = 0;
const catCount = new Map();

for (const f of files) {
  const p = path.join(dir, f);
  let s = await readFile(p, 'utf8');
  const fmMatch = s.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fmMatch) { skipped++; continue; }
  const fm = fmMatch[1];

  const urlMatch = fm.match(/^originalUrl:\s*['"]?([^'"\n]*)['"]?\s*$/m);
  const slug = f.replace(/\.md$/, '');
  let entry = (urlMatch?.[1] && taxByUrl.get(urlMatch[1].replace(/\/$/, ''))) || taxBySlug.get(slug);
  if (!entry) { skipped++; continue; }

  const cleanCats = entry.cats
    .filter((c) => !SKIP.has(c.toLowerCase()) && !AGE.test(c))
    .map(titleCase);
  const cleanTags = [...new Set([
    ...entry.cats.filter((c) => !SKIP.has(c.toLowerCase())).map((c) => c.toLowerCase()),
    ...cleanCats.slice(1),                      // extra categories become tags
    ...entry.tags.map((t) => t.toLowerCase()),
  ])].filter(Boolean);

  const category = cleanCats[0] ?? '';
  if (category) categorized++;

  // strip any existing category/tags lines, then append fresh ones
  let newFm = fm.replace(/^category:.*$\n?/gm, '').replace(/^tags:.*$\n?/gm, '').replace(/\n{3,}/g, '\n\n');
  newFm += `\ncategory: ${category ? `'${category.replace(/'/g, "''")}'` : "''"}\ntags: [${cleanTags.map((t) => `'${t.replace(/'/g, "''")}'`).join(', ')}]`;

  const out = `---\n${newFm.trim()}\n---\n` + s.slice(fmMatch[0].length);
  if (out !== s) {
    updated++;
    if (category) catCount.set(category, (catCount.get(category) ?? 0) + 1);
    if (!DRY) await writeFile(p, out);
  }
}

console.log(`\n${files.length} files scanned — ${updated} updated, ${categorized} got a category, ${skipped} unmatched.`);
console.log('\nCategory distribution:');
[...catCount.entries()].sort((a, b) => b[1] - a[1]).forEach(([c, n]) => console.log(`${String(n).padStart(5)}  ${c}`));
if (DRY) console.log('\n[dry run] rerun without --dry to apply.');
