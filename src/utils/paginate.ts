import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export const POSTS_PER_PAGE = 10;

export type BlogPost = CollectionEntry<'blog'>;

export async function getAllPosts(): Promise<BlogPost[]> {
  return (await getCollection('blog'))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function paginate<T>(items: T[], page: number, perPage = POSTS_PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  return {
    page: safePage,
    totalPages,
    totalItems: items.length,
    slice: items.slice((safePage - 1) * perPage, safePage * perPage),
  };
}

export function excerpt(text: string, max = 180): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > max ? clean.slice(0, clean.lastIndexOf(' ', max)) + '…' : clean;
}
