#!/usr/bin/env node
/**
 * Repair two defects left by import-wp.mjs on this export:
 *
 * A. Mangled markdown links: the shortcode flagger wrapped link TEXT that
 *    happened to contain brackets, producing
 *      <!-- TODO shortcode: [text] -->(url "title")
 *    Restore to [text](url "title").
 *
 * B. Blogger images: posts reference relative paths like
 *      img/b/R29vZ2xl/<token>/<size>/<file>.jpg
 *    (source site was itself broken). Download each from
 *    https://blogger.googleusercontent.com/<path> — largest referenced
 *    size per unique filename — into public/wp-images/ and rewrite refs.
 *
 * Usage: node scripts/fix-import-defects.mjs [--dry]
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sanitize from 'sanitize-filename';

const DRY = process.argv.includes('--dry');
const DIR = 'src/content/blog';

const files = (await readdir(DIR)).filter((f) => f.endsWith('.md'));
let restoredLinks = 0;
const sizeByFile = new Map(); // filename -> {size, url}
const urlsByFile = new Map(); // filename -> Set of full remote URLs

// --- A. restore links + collect Blogger refs ---
for (const f of files) {
  const p = path.join(DIR, f);
  let s = await readFile(p, 'utf8');
  const before = s;

  s = s.replace(/<!-- TODO shortcode: (\[[^\]]*\]) -->\s*\(/g, (m, text) => {
    restoredLinks++;
    return `${text}(`;
  });

  for (const m of s.matchAll(/img\/b\/[A-Za-z0-9_\-./]+/g)) {
    const rel = m[0];
    const parts = rel.split('/');
    let filename = sanitize(parts.pop() || 'image');
    if (!/\.(jpe?g|png|gif|webp|svg|avif)$/i.test(filename)) filename += '.jpg';
    const sizeTok = parts.pop() || 's0';
    const size = sizeTok === 's0' ? Infinity
      : /^s\d+$/i.test(sizeTok) ? Number(sizeTok.slice(1))
      : /^w(\d+)-h(\d+)$/i.test(sizeTok) ? Math.max(Number(sizeTok.replace(/^w(\d+)-h(\d+)$/i, '$1')), Number(sizeTok.replace(/^w(\d+)-h(\d+)$/i, '$2')))
      : 0;
    const url = `https://blogger.googleusercontent.com/${rel}`;
    if (!sizeByFile.has(filename) || size > (sizeByFile.get(filename)?.size ?? -1)) {
      sizeByFile.set(filename, { size, url });
    }
    if (!urlsByFile.has(filename)) urlsByFile.set(filename, new Set());
    urlsByFile.get(filename).add(rel);
  }

  if (s !== before && !DRY) await writeFile(p, s);
}
console.log(`A. ${restoredLinks} mangled links restored`);

// --- B. download Blogger images ---
let ok = 0, failed = [];
const entries = [...sizeByFile.entries()];
const POOL = 8;
let idx = 0;
async function worker() {
  while (idx < entries.length) {
    const [filename, { url }] = entries[idx++];
    const dest = path.join('public/wp-images', filename);
    if (existsSync(dest)) { ok++; continue; }
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 1000) throw new Error(`suspiciously small (${buf.length}B)`);
      if (!DRY) await (await import('node:fs/promises')).writeFile(dest, buf);
      ok++;
    } catch (e) {
      failed.push(`${filename}: ${e.message}`);
    }
  }
}
await Promise.all(Array.from({ length: POOL }, worker));
console.log(`B. ${ok}/${entries.length} images downloaded, ${failed.length} failed`);
failed.slice(0, 20).forEach((f) => console.log(`  ! ${f}`));

// --- rewrite refs ---
if (!DRY) {
  let rewritten = 0;
  for (const f of files) {
    const p = path.join(DIR, f);
    let s = await readFile(p, 'utf8');
    const before = s;
    for (const [filename, refs] of urlsByFile) {
      for (const rel of refs) s = s.split(rel).join(`/wp-images/${filename}`);
    }
    if (s !== before) { await writeFile(p, s); rewritten++; }
  }
  console.log(`   refs rewritten in ${rewritten} files`);
}
if (DRY) console.log('\n[dry run] rerun without --dry to apply.');
