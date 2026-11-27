# Riti Handlooms (riti-handloom)

Official web storefront, Sanity CMS architecture, and Local/GEO/AEO search engine optimization for **Riti Handloom** — premier home furnishing and handloom retailer in Jagat Farm, Gamma 1, Greater Noida.

---

## 🌐 Production URLs & Verified Entities

- **Production Website:** [https://www.ritihandloom.com/](https://www.ritihandloom.com/)  
  *(Vercel deployment with Hostinger DNS and automatic 308 redirect from root `ritihandloom.com` to `www.ritihandloom.com`)*
- **Sanity Studio (Cloud):** [https://ritihandloom.sanity.studio/](https://ritihandloom.sanity.studio/)
  - **Project ID:** `15jlzurr`
  - **Dataset:** `production`
- **Google Business Profile (Primary):**
  - **Store Name:** Riti Handloom
  - **Location:** Shop No. 14, GM Mall, Jagat Farm, Block E, Chandila, Gamma 1, Greater Noida, Uttar Pradesh 201310
  - **Google CID:** `15851598683298363234`
  - **Direct Customer Review Link:** [https://g.page/r/CWJ3DGAEMfzbEAE/review](https://g.page/r/CWJ3DGAEMfzbEAE/review)
- **Separate Entity Notice:**  
  *Do NOT modify, delete, merge, or close the distinct `Kurlon Mattress Store (Shop No. 9)` Google listing (Store Code: 509854).*

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React 19 + Vite 8 Single Page Application (`react-router-dom` v7)
- **Icons & Styling:** Lucide React + Tailwind CSS
- **Headless CMS:** Sanity Studio v3 (`@sanity/client`, `@sanity/image-url`)
- **Static Pre-Rendering (SEO):** Node.js build pipeline (`scripts/generate-seo-assets.mjs` & `scripts/sitemap.js`) pre-renders route-specific HTML metadata snapshots for search engines and social crawlers.
- **Testing & Quality:** Node.js native test runner (`node --test`), Oxlint (`oxlint`)

---

## 📋 Core Storefront Specifications

1. **WhatsApp-First Enquiries:**  
   The storefront operates on a WhatsApp-first customer inquiry model. There is **zero payment gateway** and **zero online checkout**; all purchase enquiries route directly to the store manager on WhatsApp.
2. **Fixed Size Badging:**  
   Products display an `ALL SIZE` badge without individual size variants.
3. **Protected Categories:**  
   The `Window Curtains` category is core inventory and must remain published at all times.
4. **Official Brand Catalogs:**  
   Showcases authentic collections from India's leading home furnishing brands including **D'Decor**, **Spaces (Welspun)**, **Maspar**, **Boutique Living (Indo Count)**, **Metropolis**, and **Kurlon**.

---

## 🔍 Local SEO, GEO & AEO Implementation

- **Structured Data (Schema.org JSON-LD):**
  - `HomeGoodsStore` schema with exact GPS coordinates, operating hours, `hasMap` linking directly to Google CID `15851598683298363234`, and official logo.
  - `FAQPage` schema featuring 6 hyper-localized Greater Noida & Jagat Farm questions.
  - `WebSite` schema declaring canonical names and alternate search terms.
- **AI Citation & Search Engine Discovery:**
  - `public/llms.txt`: Structured, machine-readable factsheet giving AI answer engines (ChatGPT, Claude, Perplexity, Gemini) full contextual authority on Riti Handloom's offerings.
  - `robots.txt`: Fully permits search crawlers and AI bots (`Googlebot`, `OAI-SearchBot`, `GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`).
  - `sitemap.xml`: Auto-generated upon build containing all static routes, categories, and published Sanity products. Discovered and indexed in Google Search Console.
- **Brand Assets:**
  - Royal Navy & Gold crest logo deployed at `public/riti-logo.png`.
  - Multi-resolution square web favicons (`favicon-48x48.png`, `favicon-192x192.png`, `apple-touch-icon.png`).

---

## 💻 Developer Quickstart

### Prerequisites
- Node.js 20+
- npm 10+

### Installation & Local Development

```bash
# Install frontend dependencies
npm install

# Start local dev server (Vite)
npm run dev
```

### Production Build & Verification

```bash
# Run unit tests (12 test suites verifying SEO schema, XML sitemaps, WhatsApp encoding)
npm test

# Run linter
npm run lint

# Build frontend and generate SEO metadata snapshots
npm run build

# Preview production build locally
npm run preview
```

### Sanity Studio Development

```bash
# Navigate to studio directory
cd studio

# Install dependencies and start Studio locally
npm install
npm run dev
```

---

## 📂 Key Project Directories

```text
├── public/                 # Static assets (riti-logo.png, favicons, llms.txt, robots.txt)
├── scripts/
│   ├── generate-seo-assets.mjs # HTML snapshot & metadata generation script
│   ├── sitemap.js          # XML sitemap generator
│   └── sitemap.test.js     # Test suite verifying schemas and sitemaps
├── src/
│   ├── components/         # React UI components (Navbar, Footer, ProductCard, etc.)
│   ├── lib/                # Configuration, Sanity client, WhatsApp message formatters
│   ├── pages/              # Route pages (Home, Category, Product, About, Contact)
│   └── routes/             # App routing setup
├── studio/                 # Sanity Studio schemas and configuration
└── dist/                   # Production build output
```

---

## 📄 License & Ownership

Private repository and intellectual property of **Riti Handloom**, Shop No. 14, GM Mall, Jagat Farm, Greater Noida. All rights reserved.
