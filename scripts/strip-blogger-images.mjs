#!/usr/bin/env node
/**
 * Remove Blogger-hosted image hotlinks from imported posts.
 *
 * Handles (for both blogger.googleusercontent.com and *.bp.blogspot.com):
 *   [![](thumb)](full)   linked image — image first, then the empty link shell
 *   ![](url)             bare image
 *   [](url)              empty-text link shell left after image removal
 * Text links with visible text are kept and reported for review.
 *
 * Usage: node scripts/strip-blogger-images.mjs [--dry]
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DRY = process.argv.includes('--dry');
const DIR = 'src/content/blog';
const BLOGGER = String.raw`(?:blogger\.googleusercontent\.com|(?:\d\.)?bp\.blogspot\.com)`;
const URL = String.raw`https?:\/\/[^)\s]*${BLOGGER}[^)\s]*`;

const files = (await readdir(DIR)).filter((f) => f.endsWith('.md'));
let images = 0, shells = 0, bare = 0;
const textLinks = [];

for (const f of files) {
  const p = path.join(DIR, f);
  let s = await readFile(p, 'utf8');
  const before = s;

  // linked image: [![alt](thumb)](full)  (alt may be empty; thumb/full any host)
  s = s.replace(new RegExp(String.raw`\[!\[[^\]]*\]\([^)]*\)\]\(${URL}\)`, 'g'), () => { images++; return ''; });
  // bare image on a blogger URL
  s = s.replace(new RegExp(String.raw`!\[[^\]]*\]\(${URL}\)`, 'g'), () => { bare++; return ''; });
  // empty-text link shell pointing at blogger (e.g. left from [![...]()](url))
  s = s.replace(new RegExp(String.raw`\[\s*\]\(${URL}\)`, 'g'), () => { shells++; return ''; });

  // report remaining links with visible text
  for (const m of s.matchAll(new RegExp(String.raw`\[([^\]]+)\]\((${URL})\)`, 'g'))) {
    textLinks.push(`${f}: [${m[1].slice(0, 40)}]`);
  }

  // tidy: trailing spaces, 3+ blank lines, leading blank lines after frontmatter
  s = s.replace(/[ \t]+$/gm, '').replace(/\n{3,}/g, '\n\n');

  if (s !== before && !DRY) await writeFile(p, s);
}
console.log(`${images} linked images, ${bare} bare images, ${shells} empty shells removed.`);
console.log(`${textLinks.length} text links to Blogger remain (kept for review):`);
textLinks.slice(0, 20).forEach((t) => console.log('  ' + t));
