# Riti Handlooms — Client-Owned Production Setup & Handover Guide

This guide walks through every step needed to move **Riti Handlooms** from demo/development configuration to the client's own accounts (GitHub, Sanity, Vercel, Custom Domain, Google Search Console, and Google Business Profile) without needing code changes.

> **Before You Start — Gather From the Client:**
> 1. Client Gmail address (`client@gmail.com`) and phone access for 2FA/OTP.
> 2. Confirmed business WhatsApp number (digits with country code, e.g., `91XXXXXXXXXX`) and display phone number.
> 3. Confirmed store address, opening hours, and exact Google Maps location pin.
> 4. Custom domain registrar login (if a custom domain like `ritihandloom.in` is purchased), or use the free `*.vercel.app` URL first.

---

## Step 1: Create or Access the Client's GitHub Account
- **Where to go:** [https://github.com](https://github.com)
- **What to do:**
  1. Sign in with the client's Gmail account (or create a new free GitHub account using their Gmail).
  2. Verify their email address and enable 2FA if prompted.
- **Information needed:** Client Gmail address, password, and chosen GitHub username.
- **How to verify:** You can log in to `github.com` and view the client's GitHub profile/dashboard.

---

## Step 2: Give Client Repository Access or Transfer Ownership
- **Where to go:** Your current GitHub repository (`https://github.com/rahulsand100/Riti-Handloom`) → **Settings**.
- **What to do (choose one):**
  - **Option A — Invite as Collaborator (Recommended while you assist):**
    1. Click **Collaborators** (left sidebar) → **Add people**.
    2. Enter the client's GitHub username or Gmail → click **Add**.
    3. Have the client accept the email invitation.
  - **Option B — Transfer Full Ownership (Final handover):**
    1. Scroll to the bottom of **Settings** → **Danger Zone** → click **Transfer ownership**.
    2. Enter the repository name (`Riti-Handloom`) and the client's GitHub username → confirm.
    3. Have the client accept the transfer email.
- **Information needed:** Client's GitHub username.
- **How to verify:** The repository appears under the client's GitHub **Repositories** tab and you/they can see all commits on `main`.

---

## Step 3: Create or Access the Client's Sanity Account
- **Where to go:** [https://www.sanity.io/manage](https://www.sanity.io/manage)
- **What to do:**
  1. Click **Get started** / **Log in** → choose **Continue with Google** → sign in with the client's Gmail account.
  2. Complete the initial onboarding prompt if it is a new account.
- **Information needed:** Client Gmail account.
- **How to verify:** You can access the Sanity Manage dashboard logged in as the client.

---

## Step 4: Decide — Keep Existing Sanity Project (`rhynfvzd`) or Create a Client-Owned Project

### Option A: Keep Existing Project (`rhynfvzd`) & Transfer/Invite Client
- Easiest if you already loaded products into `rhynfvzd`.
- **Where to go:** [https://www.sanity.io/manage](https://www.sanity.io/manage) → select **Riti Handlooms** (`rhynfvzd`).
- **What to do:** Go to **Members** → **Invite members** → enter client's Gmail with role **Administrator** (so they have full billing/ownership control).

### Option B: Create a Brand-New Sanity Project Under the Client's Account (Recommended for Clean Ownership)
- **Where to go:** [https://www.sanity.io/manage](https://www.sanity.io/manage) (logged in as the client) → **Create project**.
- **What to do:**
  1. Name the project `Riti Handlooms`, choose dataset **`production`** (public read), and copy the new **Project ID** (8-character ID).
  2. **If you want to copy existing categories/products from `rhynfvzd` to the new project:**
     ```bash
     # 1. Export current data from old project (inside studio/)
     cd studio
     npx sanity dataset export production riti-backup.tar.gz

     # 2. Update studio/.env or pass the new Project ID, then import
     # Set SANITY_STUDIO_PROJECT_ID=<NEW_PROJECT_ID>
     npx sanity dataset import riti-backup.tar.gz production --replace
     ```
  3. Update your local `.env` and Vercel variables with the new `VITE_SANITY_PROJECT_ID`.
- **Information needed:** New 8-character Sanity Project ID (or `rhynfvzd` if keeping existing).
- **How to verify:** In Sanity Manage, the project shows dataset `production` and your imported/created documents under **Content**.

---

## Step 5: Invite the Client to Sanity Studio
- **Where to go:** [https://www.sanity.io/manage](https://www.sanity.io/manage) → select your project → **Members**.
- **What to do:**
  1. Click **Invite members**.
  2. Enter the client's Gmail address.
  3. Assign **Administrator** (full owner) or **Editor** (content-only: add/edit/publish products & categories without deleting project settings).
  4. Have the client open the email invite and accept it.
- **Information needed:** Client Gmail address.
- **How to verify:** The client's Gmail appears as **Active** under **Members**.

---

## Step 6: Deploy Sanity Studio
- **Where to go:** Local terminal inside `studio/` folder.
- **What to do:**
  1. Set the target project ID in your terminal (or `studio/.env`):
     ```powershell
     cd studio
     $env:SANITY_STUDIO_PROJECT_ID="YOUR_SANITY_PROJECT_ID"
     $env:SANITY_STUDIO_DATASET="production"
     npx sanity login
     npx sanity deploy
     ```
  2. When prompted for a Studio hostname, enter a clean name (e.g., `riti-handlooms`), giving the client a permanent admin URL: `https://riti-handlooms.sanity.studio`.
- **Information needed:** Sanity Project ID and Sanity login.
- **How to verify:** Open `https://<chosen-name>.sanity.studio` in Chrome, sign in with the client's Gmail, and confirm **Product**, **Category**, and **Site Settings** appear.

---

## Step 7: Connect the GitHub Repository to Vercel
- **Where to go:** [https://vercel.com](https://vercel.com) (log in with the client's GitHub account).
- **What to do:**
  1. Click **Add New…** → **Project**.
  2. Under **Import Git Repository**, select `Riti-Handloom` → click **Import**.
  3. Confirm build settings:
     - **Framework Preset:** `Vite`
     - **Root Directory:** `./`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`
  4. **Do NOT click Deploy yet** — expand **Environment Variables** first (Step 8).
- **Information needed:** Client GitHub login.
- **How to verify:** Project import screen shows `Vite` selected and ready for environment variables.

---

## Step 8: Configure Vercel Environment Variables
- **Where to go:** Vercel **Environment Variables** section (during import, or later under **Project Settings → Environment Variables**).
- **What to enter (select Production, Preview, and Development):**

| Variable Name | Value to Enter | Notes |
|---|---|---|
| `VITE_SANITY_PROJECT_ID` | `YOUR_SANITY_PROJECT_ID` | Required (e.g., `rhynfvzd` or client's new ID) |
| `VITE_SANITY_DATASET` | `production` | Required |
| `VITE_SANITY_API_VERSION` | `2024-01-01` | Required |
| `VITE_SITE_URL` | `https://YOUR_DOMAIN.com` | Or your `https://your-project.vercel.app` URL until domain is connected |
| `VITE_WHATSAPP_NUMBER` | `91XXXXXXXXXX` | Client WhatsApp digits (no `+` or spaces) |
| `VITE_CONTACT_PHONE` | `+91 XXXXX XXXXX` | Display phone number |
| `VITE_CONTACT_EMAIL` | `contact@YOUR_DOMAIN.com` | Business email |
| `VITE_INSTAGRAM_URL` | `https://instagram.com/YOUR_HANDLE` | Business Instagram link |
| `VITE_STORE_ADDRESS` | `YOUR_SHOP_ADDRESS` | Physical store address |

> **Security Rule:** NEVER add `SANITY_API_TOKEN` or any secret key to `VITE_*` variables.
- **Now click Deploy.**
- **How to verify:** Vercel build finishes cleanly and gives you a live `https://<project>.vercel.app` URL.

---

## Step 9: Configure Sanity CORS Origins
- **Where to go:** [https://www.sanity.io/manage](https://www.sanity.io/manage) → select your Sanity project → **API** → **CORS origins**.
- **What to do:**
  1. Click **Add CORS origin** and add:
     - `https://<your-vercel-project>.vercel.app` (Allow credentials: **Yes**)
     - `https://*.vercel.app` (Allow credentials: **Yes** — enables Vercel preview deployments)
     - Your custom domain, e.g. `https://YOUR_DOMAIN.com` and `https://www.YOUR_DOMAIN.com` (Allow credentials: **Yes**)
     - `http://localhost:5173` (for local development)
- **Information needed:** Live Vercel URL and custom domain.
- **How to verify:** Open the live Vercel storefront in Chrome; categories and products load from Sanity with **0 CORS errors** in DevTools Console.

---

## Step 10: Connect the Custom Domain (If Available)
- **Where to go:** Vercel Dashboard → **Project Settings → Domains**.
- **What to do:**
  1. Enter the client's domain (e.g., `ritihandloom.in`) → click **Add**.
  2. Vercel displays DNS records (`A` record `76.76.21.21` for apex domain and `CNAME` `cname.vercel-dns.com` for `www`).
  3. Log in to the client's domain registrar (GoDaddy / Namecheap / Cloudflare / Hostinger) and add those DNS records.
  4. Update `VITE_SITE_URL` in Vercel Environment Variables to `https://YOUR_DOMAIN.com` and redeploy.
  5. **Important static file update:** Update the domain inside `index.html`, `public/sitemap.xml`, and `public/robots.txt` if the final domain differs from `https://ritihandloom.in`, then commit and push to `main`.
- **How to verify:** Vercel **Domains** shows a green **Valid Configuration** checkmark and `https://YOUR_DOMAIN.com` loads over HTTPS with automatic redirect from `www`/HTTP.

---

## Step 11: Configure Google Search Console
- **Where to go:** [https://search.google.com/search-console](https://search.google.com/search-console) (logged in with the client's Gmail).
- **What to do:**
  1. Click **Add property** → choose **URL prefix** (e.g., `https://YOUR_DOMAIN.com`) or **Domain**.
  2. Verify ownership using the **DNS TXT record** (at the domain registrar) or **HTML meta tag** (if using HTML tag, place it in `index.html` `<head>` and redeploy).
  3. Once verified, open **Sitemaps** in the left sidebar → enter `sitemap.xml` → click **Submit**.
- **Information needed:** Client Gmail, live domain, DNS access.
- **How to verify:** Search Console shows **Ownership verified** and `sitemap.xml` status as **Success**. *(Do not assume verification before completing this step.)*

---

## Step 12: Set Up Google Business Profile (Subject to Business Verification)
- **Where to go:** [https://www.google.com/business/](https://www.google.com/business/) (logged in with the client's Gmail).
- **What to do:**
  1. Click **Manage now** → enter **Riti Handlooms**, category **Handloom Shop / Home Goods Store / Bedding Store**.
  2. Enter the **exact confirmed physical store address** (e.g., Jagat Farm Commercial Complex, Greater Noida), confirmed phone number, opening hours, and your live website URL.
  3. Complete Google's verification method (video verification, postcard, or phone/SMS as required by Google).
  4. Once verified, upload real storefront and product photos, and copy the exact Google Maps **Share** link and coordinates into `Home.jsx` / `SEO.jsx` if they differ from the placeholder pin.
- **How to verify:** Business Profile dashboard displays **Verified** and appears on Google Maps.

---

## Step 13: Test Product Creation, Editing, Publishing, and Unpublishing
1. Open the deployed Sanity Studio (`https://<name>.sanity.studio`) logged in as the client.
2. **Create & Publish a Product:** Add Title, click **Generate** Slug, select Category, upload 2–3 images, write Description (no price/size fields needed — storefront displays `ALL SIZE`), click **Publish**.
3. Wait ~60 seconds (Sanity APICDN edge cache `max-age=60`) and hard-refresh the live Vercel storefront → confirm the new product appears.
4. **Edit Product:** Change title or description → click **Publish** → refresh after ~60s and confirm update appears.
5. **Unpublish Product:** Click the `...` menu next to Publish → **Unpublish** → refresh after ~60s and confirm the product disappears from the public storefront.
6. **Test Enquiry Flow:** Open a product, click **Enquire on WhatsApp** and **Add to Enquiry Bag** → confirm WhatsApp opens with the client's real WhatsApp number and `ALL SIZE` label.
7. **Test Direct URL Refresh:** Refresh `/shop`, `/category/<slug>`, `/product/<id>`, `/cart`, and `/wishlist` directly in Chrome → confirm zero 404 errors (Vercel SPA rewrite handles all routes).

---

## Step 14: Complete Final Client Handover
Deliver to the client:
1. Live Storefront URL (`https://YOUR_DOMAIN.com` or `https://<project>.vercel.app`).
2. Deployed Sanity Studio URL (`https://<name>.sanity.studio`) + login instructions using their Gmail.
3. GitHub & Vercel project ownership confirmation.
4. Quick reminder on daily store workflow:
   - Upload 2–3 clear photos per product in Sanity Studio (use the hotspot circle to frame the main pattern).
   - No prices or size selection pills are shown on the website (`ALL SIZE` is fixed); all price/order conversations happen directly on WhatsApp.
