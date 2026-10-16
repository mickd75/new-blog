#!/usr/bin/env node
/**
 * Rewrite remaining RELATIVE image URLs (which break the Astro build —
 * vite tries to resolve them as module imports) to absolute hotlinks.
 *
 * Families in this import:
 *   img/a/<token>=<size>                     -> https://blogger.googleusercontent.com/img/a/...
 *   -<h1>/<h2>/AAAAAAA.../<size>/<file>.jpg  -> https://1.bp.blogspot.com/-<h1>/...
 *
 * (img/b/... was already localized to /wp-images/ for the future R2 move.)
 *
 * Usage: node scripts/fix-relative-images.mjs [--dry]
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DRY = process.argv.includes('--dry');
const DIR = 'src/content/blog';

const files = (await readdir(DIR)).filter((f) => f.endsWith('.md'));
let a = 0, b = 0;

for (const f of files) {
  const p = path.join(DIR, f);
  let s = await readFile(p, 'utf8');
  const before = s;

  s = s.replace(/\]\((img\/a\/[^)]+)\)/g, (m, rel) => {
    a++;
    return `](https://blogger.googleusercontent.com/${rel})`;
  });

  // legacy bp.blogspot.com shape: starts with "-<hash>/<hash>/AAAA..."
  s = s.replace(/\]\((-[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+\/AAAA[A-Za-z0-9_\/.-]+)\)/g, (m, rel) => {
    b++;
    return `](https://1.bp.blogspot.com/${rel})`;
  });

  if (s !== before && !DRY) await writeFile(p, s);
}
console.log(`${a} img/a refs -> blogger.googleusercontent.com, ${b} legacy refs -> 1.bp.blogspot.com`);
