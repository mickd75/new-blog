import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    readTime: z.number().optional(),
    category: z.string().default(''),
    tags: z
      .union([z.array(z.string()), z.string()])
      .transform((v) =>
        Array.isArray(v) ? v.map((t) => t.trim()).filter(Boolean)
                         : v.split(',').map((t) => t.trim()).filter(Boolean)
      )
      .default([]),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    lastUpdated: z.string().default(''),
  }),
});

const home = defineCollection({
  type: 'data',
  schema: z.object({
    heroTitle: z.string(),
    heroSubtitle: z.string(),
    currentlyBuilding: z.string(),
  }),
});

const site = defineCollection({
  type: 'data',
  schema: z.object({
    copyrightText: z.string(),
    footerLinks: z.string(),
    siteName: z.string(),
    siteUrl: z.string().url().optional(),
  }),
});

const categories = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
  }),
});

export const collections = { blog, home, site, pages, categories };
