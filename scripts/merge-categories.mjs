#!/usr/bin/env node
/**
 * Consolidate long-tail WP categories into a crazymonda-style set.
 * Rewrites `category:` frontmatter and normalizes equivalent tags.
 *
 * Usage: node scripts/merge-categories.mjs [--dry]
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DRY = process.argv.includes('--dry');
const DIR = 'src/content/blog';

const MAP = {
  'Fitness Inspiration': 'Fitness',
  'Fitness Tips': 'Fitness',
  'Inspiration': 'Self-Improvement',
  'Motivation': 'Self-Improvement',
  'Productivity Hacks': 'Self-Improvement',
  'Self-improvement': 'Self-Improvement',
  'Thoughts': 'Lifestyle',
  'Journey': 'Lifestyle',
  'Travel': 'Lifestyle',
  'Technology': 'Lifestyle',
  'Career': 'Lifestyle',
  'Mental Health': 'Health',
  '401(k)': 'Personal Finance',
};
const TAG_MAP = Object.fromEntries(
  Object.entries(MAP).map(([k, v]) => [k.toLowerCase(), v.toLowerCase()])
);

const files = (await readdir(DIR)).filter((f) => f.endsWith('.md'));
const dist = new Map();
let touched = 0;

for (const f of files) {
  const p = path.join(DIR, f);
  const s = await readFile(p, 'utf8');
  const m = s.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) continue;
  let fm = m[1];

  const cat = fm.match(/^category: '(.*)'$/m);
  let newCat = cat?.[1] ?? '';
  if (newCat && MAP[newCat]) newCat = MAP[newCat];

  const tags = fm.match(/^tags: \[(.*)\]$/m);
  let newTags = tags?.[1] ?? '';
  if (newTags) {
    const list = newTags.split(',').map((t) => t.trim().replace(/^'|'$/g, ''))
      .map((t) => TAG_MAP[t] ?? t);
    newTags = [...new Set(list)].map((t) => `'${t}'`).join(', ');
  }

  if ((cat && cat[1] !== newCat) || (tags && tags[1] !== newTags)) {
    touched++;
    if (newCat) dist.set(newCat, (dist.get(newCat) ?? 0) + 1);
    fm = fm.replace(/^category: .*$/m, `category: '${newCat.replace(/'/g, "''")}'`)
           .replace(/^tags: .*$/m, `tags: [${newTags}]`);
    if (!DRY) await writeFile(p, `---\n${fm}\n---\n` + s.slice(m[0].length));
  } else if (cat?.[1]) {
    dist.set(cat[1], (dist.get(cat[1]) ?? 0) + 1);
  }
}

console.log(`${files.length} posts — ${touched} updated.`);
console.log('\nFinal category distribution:');
[...dist.entries()].sort((a, b) => b[1] - a[1]).forEach(([c, n]) => console.log(`${String(n).padStart(5)}  ${c}`));
if (DRY) console.log('\n[dry run] rerun without --dry to apply.');
