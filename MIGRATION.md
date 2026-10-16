# Migrate WordPress → Cloudflare Pages (crazymonda stack)

Same stack as crazymonda.xyz: **Astro → GitHub → Cloudflare Pages → Pages CMS**,
magazine UI (serif headings, 2-column card grid), date-based post URLs
(`/YYYY/MM/slug.html` matching WordPress permalinks → zero redirects needed).

## Status (Oct 16, 2026)
- [x] Import done: 780 posts from crazzymonday.com, 73 thin filler posts removed → **706 posts**
- [x] Categories consolidated: Fitness 226, Self-Improvement 206, Personal Finance 165,
      Lifestyle 29, Health 22, Retirement 17 (+ category intro pages)
- [x] Branding: Crazzy Monday / crazzymonday.com everywhere; repo live at
      github.com/mickd75/new-blog (no images in git — 1.6 MiB repo)
- [ ] GA4 `G-XXXXXXXXXX` in src/layouts/Base.astro (2 spots) → still to replace
- [ ] Cloudflare Pages: connect repo (Astro preset, `npm run build`, `dist/`, branch main)
- [ ] Custom domain crazzymonday.com on the Pages project, then DNS cutover
- [ ] Images: content is fully text-only (all Blogger hotlinks AND all
      `/wp-images/` refs stripped — see scripts/strip-blogger-images.mjs,
      scripts/strip-wp-images.mjs). 2234 downloaded images are staged in
      `~/Projects/new-blog-r2-images/` for R2 upload; the original post→image
      placement is recoverable from git history (commit 5170867 and earlier)
      if needed when re-inserting by hand.
- [ ] AdSense: add crazzymonday.com under Sites (pub ca-pub-9851421663198414 pre-wired)
- [ ] Sitemap in Search Console after cutover

## 1. Placeholders to replace (search the repo)
- [x] `yourdomain.com` → astro.config.mjs, src/pages/robots.txt.ts, src/pages/sitemap.xml.ts, .pages.yml
- [x] `New Blog` / `New<span class="accent">Blog</span>` → site name in src/components/Nav.astro, Footer.astro, src/layouts/Base.astro, Page.astro, src/pages/index.astro, 404.astro
- [ ] `G-XXXXXXXXXX` in src/layouts/Base.astro (2 spots) → new GA4 property Measurement ID
- [ ] AdSense: add this domain under AdSense → Sites (same account as crazymonda is fine);
      the script already carries `ca-pub-9851421663198414`; update `public/ads.txt` if Google asks
- [ ] src/content/site/site.yml (site name, copyright) and src/content/home/home.yml (hero copy)
- [ ] Pages CMS: create repo first, then set repoURL in .pages.yml
- [ ] Favicon: replace public/favicon.svg, favicon-32.png, apple-touch-icon.png (currently neutral grey)

## 2. Import WordPress content
```bash
npm install
node scripts/import-wp.mjs ~/Downloads/your-export.xml
```
Posts → src/content/blog/ with WordPress-matching URLs; images → public/wp-images/;
redirects → public/_redirects (usually zero needed). Then:
```bash
node scripts/backfill-taxonomy.mjs ~/Downloads/your-export.xml   # WP categories/tags
node scripts/clean-ad-leftovers.mjs                              # strip literal AdSense snippets
node scripts/find-short-posts.mjs                                # review thin posts (<150 words)
```
- [ ] Delete `src/content/blog/hello-world.md` after import
- [ ] Review category list; merge long-tail singletons like crazymonda if desired
- [ ] Category intro pages (optional): create src/content/categories/<slug>.md

## 3. Deploy
```bash
gh repo create YOUR_USERNAME/new-blog --public --source=. --push
```
Cloudflare → Workers & Pages → Create → Pages → connect repo → Astro preset,
`npm run build`, output `dist`, branch `main`. Verify pages.dev URL, then add
the custom domain (if the domain's DNS is already on Cloudflare, it's instant).

## 4. After cutover
- [ ] AdSense: confirm impressions return within a day (domain must be added under Sites first)
- [ ] Submit https://yourdomain.com/sitemap.xml in Google Search Console
- [ ] Keep WordPress up until DNS fully propagates; then cancel hosting (keep domain registration)

## Known quirks (same as crazymonda)
- Frontmatter dates unquoted (`date: 2024-01-05`), or the listing page breaks
- Collections must never be empty (placeholder files exist for blog/categories)
- `npm run build` before pushing — it gates the Cloudflare deploy
- Blog collection with 1000+ posts won't load in Pages CMS (502) — edit in VS Code/GitHub;
  Pages CMS works fine for Home/Site/About/Privacy/Contact pages
