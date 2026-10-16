#!/usr/bin/env node
/**
 * Final shortcode cleanup after fix-import-defects.mjs:
 * - [x-batch]/[ig-batch] blocks (tweet/IG embed lists): drop the flags,
 *   turn the URL run into a markdown bullet list of autolinks.
 * - Any other <!-- TODO shortcode: [x] --> flag: restore the plain [x] text.
 *
 * Usage: node scripts/fix-remaining-shortcodes.mjs [--dry]
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DRY = process.argv.includes('--dry');
const DIR = 'src/content/blog';
const unesc = (s) => s.replace(/\\([_[\]<>*])/g, '$1');

const files = (await readdir(DIR)).filter((f) => f.endsWith('.md'));
let batches = 0, restored = 0;

for (const f of files) {
  const p = path.join(DIR, f);
  let s = await readFile(p, 'utf8');
  const before = s;

  // drop batch open/close flags
  s = s.replace(/\\?<!-- TODO shortcode: \[\/?(?:x|ig)-batch\\\] --> ?/g, '');

  // URL-only lines → bullet list of autolinks
  s = s.replace(/^(\s*)((?:https?:\S+)(?:\s+(?:https?:\S+))*)\s*$/gm, (m, indent, run) => {
    batches++;
    return run.trim().split(/\s+/).map((u) => `- <${unesc(u)}>`).join('\n');
  });

  // restore any remaining flag as plain bracket text
  s = s.replace(/\\?<!-- TODO shortcode: \[(.*?)\\\] --> ?/g, (m, inner) => {
    restored++;
    return `[${unesc(inner)}]`;
  });

  if (s !== before && !DRY) await writeFile(p, s);
}
console.log(`${batches} URL batches converted to link lists, ${restored} flags restored to text.`);
