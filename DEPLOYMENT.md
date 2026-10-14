# Deployment Guide — Cloudflare Pages

This guide walks through deploying your personal website to Cloudflare Pages.

## Prerequisites

- GitHub account
- Cloudflare account (free tier works)
- Domain name (optional — you get a `.pages.dev` subdomain by default)

---

## Step 1: Push to GitHub

### 1.1 Initialize Git repository (if not already done)

```bash
cd "/Users/manhhungdo/Personal website"
git init
git add .
git commit -m "Initial commit: Personal website"
```

### 1.2 Create GitHub repository

1. Go to https://github.com/new
2. Create a new repository named `personal-website`
3. Don't initialize with README (you already have files)
4. Click "Create repository"

### 1.3 Push your code

```bash
git remote add origin https://github.com/YOUR_USERNAME/personal-website.git
git branch -M main
git push -u origin main
```

---

## Step 2: Connect to Cloudflare Pages

### 2.1 Create new project

1. Go to https://dash.cloudflare.com/
2. Select **Workers & Pages** → **Create application**
3. Choose **Pages** tab → **Connect to Git**
4. Select your `personal-website` repository
5. Click **Begin setup**

### 2.2 Configure build settings

| Setting | Value |
|---------|-------|
| **Project name** | `hungdev-personal-website` (or any name) |
| **Production branch** | `main` |
| **Framework preset** | `Astro` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |

### 2.3 Environment variables (optional)

None needed for this project.

### 2.4 Deploy

Click **Save and Deploy**. Cloudflare will:
1. Install dependencies (`npm install`)
2. Build the site (`npm run build`)
3. Deploy the `dist/` folder to their global edge network

First deployment takes 1-2 minutes. You'll get a URL like:
`https://hungdev-personal-website.pages.dev`

---

## Step 3: Custom Domain (Optional)

### 3.1 Add your domain

1. In Cloudflare Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter `hungdev.com`
4. Click **Activate domain**

### 3.2 Update DNS

If your domain is already on Cloudflare:
- DNS records are added automatically

If your domain is elsewhere:
- Update nameservers to Cloudflare's
- Or add CNAME record pointing to your `.pages.dev` URL

### 3.3 Update site URL in code

After setting your custom domain, update the site URL:

**File:** `astro.config.mjs`
```javascript
export default defineConfig({
  site: 'https://hungdev.com',  // Update this
  // ...
});
```

**File:** `cms.json`
```json
{
  "siteURL": "https://hungdev.com",  // Update this
  // ...
}
```

Commit and push changes to trigger redeployment.

---

## Automatic Deployments

Once connected, Cloudflare automatically rebuilds and deploys whenever you push to the `main` branch.

**Workflow:**
1. Make changes locally
2. Commit: `git commit -m "Update blog post"`
3. Push: `git push`
4. Cloudflare detects push → builds → deploys
5. Site updates in ~60 seconds

---

## Preview Deployments

Every pull request gets a preview URL. Test changes before merging to main.

---

## Environment-specific Notes

### For Mac (your current setup)

Everything works as documented. No special configuration needed.

---

## Troubleshooting

### Build fails

1. Check **Build logs** in Cloudflare dashboard
2. Locally test: `npm run build` (should succeed)
3. Ensure `package.json` has correct build script

### Pages not found (404)

- Check `build.output: "directory"` in `astro.config.mjs`
- Verify files exist in `dist/` after local build

### Site not updating

- Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
- Check deployment status in Cloudflare dashboard
- Verify push was successful on GitHub

---

## Summary

| Action | Command |
|--------|---------|
| Start dev server | `npm run dev` |
| Build locally | `npm run build` |
| Preview build | `npm run preview` |
| Deploy | `git push` (automatic) |

Your site is now live globally with zero server maintenance.
