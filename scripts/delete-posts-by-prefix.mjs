#!/usr/bin/env node
/**
 * Delete blog posts whose filename starts with any of the given prefixes.
 *
 * Usage:
 *   node scripts/delete-posts-by-prefix.mjs inspiration fitness-mix fitness-inspiration --dry
 *   node scripts/delete-posts-by-prefix.mjs inspiration fitness-mix fitness-inspiration   # deletes
 * Undo before committing: git checkout -- src/content/blog
 */
import { readdir, unlink } from 'node:fs/promises';
import path from 'node:path';

const DIR = 'src/content/blog';
const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const prefixes = args.filter((a) => !a.startsWith('--'));

if (!prefixes.length) {
  console.error('Usage: node scripts/delete-posts-by-prefix.mjs <prefix...> [--dry]');
  process.exit(1);
}

const files = (await readdir(DIR)).filter(
  (f) => f.endsWith('.md') && prefixes.some((p) => f.startsWith(p))
);

for (const f of files) {
  if (!DRY) await unlink(path.join(DIR, f));
  console.log(`${DRY ? '[dry] ' : '✓ deleted '}${f}`);
}

console.log(`\n${DRY ? '[dry run] would delete' : 'Deleted'} ${files.length} posts.`);
