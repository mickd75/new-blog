#!/usr/bin/env node
/**
 * Find blog posts with fewer than N words (default 150) in the body,
 * excluding frontmatter. Read-only — prints a report; it never deletes.
 *
 * Usage:
 *   node scripts/find-short-posts.mjs            # < 150 words
 *   node scripts/find-short-posts.mjs 100        # < 100 words
 *   node scripts/find-short-posts.mjs 150 --delete   # actually delete (moves nothing; git is your undo)
 */
import { readdir, stat, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DIR = 'src/content/blog';
const MIN_WORDS = Number(process.argv[2] ?? 150);
const DELETE = process.argv.includes('--delete');

const files = (await readdir(DIR)).filter((f) => f.endsWith('.md')).sort();
const short = [];

for (const f of files) {
  const raw = await readFileSafe(path.join(DIR, f));
  const body = raw.replace(/^---\n[\s\S]*?\n---\n/, ''); // strip frontmatter
  const words = body.split(/\s+/).filter((w) => /\w/.test(w)).length;
  if (words < MIN_WORDS) short.push({ file: f, words });
}

async function readFileSafe(p) {
  const { readFile } = await import('node:fs/promises');
  return readFile(p, 'utf8');
}

console.log(`\n${files.length} posts scanned — ${short.length} have fewer than ${MIN_WORDS} words:\n`);
for (const { file, words } of short) console.log(`${String(words).padStart(4)}  ${file}`);

if (DELETE && short.length) {
  for (const { file } of short) await unlink(path.join(DIR, file));
  console.log(`\nDeleted ${short.length} files. Run 'git checkout -- src/content/blog' to undo, or commit to keep.`);
} else if (short.length) {
  console.log(`\nTo delete them: node scripts/find-short-posts.mjs ${MIN_WORDS} --delete`);
}
