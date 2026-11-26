# Riti Handlooms

React + Vite storefront for Riti Handlooms. Product catalogue data is managed in Sanity; customer enquiries are handled through WhatsApp.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Replaceable content

- Store details and contact links are configured in `src/lib/config.js` and Sanity site settings.
- Products, categories, and homepage banner content are managed in Sanity.
- The default social preview is `public/riti-social-placeholder.png`; replace it with an approved 1200×630 brand image using `VITE_SOCIAL_IMAGE_URL` and `VITE_SOCIAL_IMAGE_ALT`.
- The location image is an explicit placeholder at `public/riti-store-photo-placeholder.svg`; replace it only with a verified store photograph.
- Default editorial hero images use external sample imagery and should be replaced with approved brand photography when available.
- Cart and wishlist state persist in localStorage.

## SEO assets and search-console setup

- `npm run build` fetches published Sanity categories and products, generates route-specific HTML metadata snapshots, and writes `dist/sitemap.xml` and `dist/robots.txt`. A successful production build therefore requires public read access to the configured Sanity dataset.
- The route snapshots preserve the existing React SPA while giving crawlers and social preview bots initial product/category metadata and content. Vercel `cleanUrls` serves those static files at their canonical routes.
- Set `VITE_SITE_URL` to the canonical production origin. It defaults to `https://ritihandloom.in`; the current browser origin is never used for canonical URLs.
- Optional `VITE_SOCIAL_IMAGE_URL` and `VITE_SOCIAL_IMAGE_ALT` configure the default Open Graph and Twitter/X image.
- After deployment, a client with access to the domain DNS can verify the site in Google Search Console and Bing Webmaster Tools, then submit `https://ritihandloom.in/sitemap.xml`.
- A client with owner access to the Google Business Profile must confirm the store address, map pin, telephone, and hours there. Do not add unconfirmed hours or coordinates to the website structured data.
