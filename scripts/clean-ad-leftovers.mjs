#!/usr/bin/env node
/**
 * Remove literal AdSense code that WordPress left inside post content.
 * Handles the escaped form (adsbygoogle = window.adsbygoogle || \[\]).push({});
 * and variants: unescaped [], <br /> wrappers, <script> wrappers.
 *
 * Usage: node scripts/clean-ad-leftovers.mjs          # clean
 *        node scripts/clean-ad-leftovers.mjs --dry    # report only
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DIR = 'src/content/blog';
const DRY = process.argv.includes('--dry');

// the push() snippet with any bracket escaping, optional surrounding <br />
const SNIPPET = /(?:<br\s*\/?>\s*)*\(adsbygoogle\s*=\s*window\.adsbygoogle\s*\|\|\s*(?:\\\[\\\]|\[\])\)\.push\(\{\}\)\s*;?(?:<br\s*\/?>\s*)*/g;
// whole <script>…adsbygoogle…</script> wrappers (single line or multiline)
const SCRIPT_BLOCK = /<script[^>]*>\s*\(adsbygoogle[\s\S]*?\)\.push\(\{\}\);\s*<\/script>/g;

const files = (await readdir(DIR)).filter((f) => f.endsWith('.md'));
let touched = 0, removed = 0;

for (const f of files) {
  const p = path.join(DIR, f);
  const original = await readFile(p, 'utf8');
  let s = original.replace(SCRIPT_BLOCK, '');
  const hits = s.match(SNIPPET)?.length ?? 0;
  s = s.replace(SNIPPET, ' ');
  // tidy: collapse whitespace runs the removals leave behind
  s = s
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/ ?<br\s*\/?> ?<br\s*\/?>/g, '\n\n')
    .replace(/\n{3,}/g, '\n\n');
  if (s !== original) {
    touched++; removed += hits || 1;
    if (!DRY) await writeFile(p, s);
    console.log(`✓ ${f} (${hits || 'script block'} removed)`);
  }
}

console.log(`\n${DRY ? '[dry run] ' : ''}${touched} files cleaned, ~${removed} snippet occurrences removed.`);
