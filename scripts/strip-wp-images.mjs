#!/usr/bin/env node
/**
 * Remove all /wp-images/ references from imported posts so the content is
 * clean text-only; images will be re-inserted by hand later from R2.
 *
 * Handles:
 *   [![alt](/wp-images/x)](/wp-images/y)   linked image
 *   ![](/wp-images/x)                      bare image
 *   [filename](/wp-images/x)               text link (e.g. filename as text)
 *   [](/wp-images/x)                       empty link shell
 *
 * Usage: node scripts/strip-wp-images.mjs [--dry]
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DRY = process.argv.includes('--dry');
const DIR = 'src/content/blog';
const URL = String.raw`\(\/wp-images\/[^)\s]*\)`;

const files = (await readdir(DIR)).filter((f) => f.endsWith('.md'));
let linked = 0, bare = 0, text = 0;

for (const f of files) {
  const p = path.join(DIR, f);
  let s = await readFile(p, 'utf8');
  const before = s;

  // linked image: [![alt](inner)](/wp-images/outer)
  s = s.replace(new RegExp(String.raw`\[!\[[^\]]*\]\([^)]*\)\]${URL}`, 'g'), () => { linked++; return ''; });
  // bare image
  s = s.replace(new RegExp(String.raw`!\[[^\]]*\]${URL}`, 'g'), () => { bare++; return ''; });
  // any remaining link with any text (incl. empty) — filename links, shells
  s = s.replace(new RegExp(String.raw`\[[^\]]*\]${URL}`, 'g'), () => { text++; return ''; });

  s = s.replace(/[ \t]+$/gm, '').replace(/\n{3,}/g, '\n\n');

  if (s !== before && !DRY) await writeFile(p, s);
}
console.log(`${linked} linked images, ${bare} bare images, ${text} text links removed.`);
