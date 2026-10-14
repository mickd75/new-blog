import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const unslug = (slug: string) =>
  slug.split('-').map((w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w)).join(' ');

export async function getByTaxonomy(
  field: 'category' | 'tags',
  name: string
): Promise<BlogPost[]> {
  const all = (await getCollection('blog'))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  if (field === 'category')
    return all.filter((p) => p.data.category && slugify(p.data.category) === slugify(name));
  return all.filter((p) =>
    Array.isArray(p.data.tags) && p.data.tags.some((t: string) => slugify(t) === slugify(name))
  );
}

export async function listTaxonomy(
  field: 'category' | 'tags'
): Promise<{ slug: string; name: string; count: number }[]> {
  const all = await getCollection('blog');
  const map = new Map<string, number>();
  for (const p of all) {
    const raw = field === 'category' ? p.data.category : p.data.tags;
    const values = Array.isArray(raw) ? raw : typeof raw === 'string' && raw ? [raw] : [];
    for (const v of values) {
      if (!v) continue;
      map.set(v, (map.get(v) ?? 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([name, count]) => ({ slug: slugify(name), name, count }))
    .sort((a, b) => b.count - a.count);
}

export { unslug };
