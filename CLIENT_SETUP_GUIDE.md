# Riti Handlooms — Client-Owned Production Setup & DevOps Handover Guide

**Target Architecture:** Vite + React 19 Storefront (Vercel) · Sanity CMS v3 (`rhynfvzd` / `production`) · GitHub Source Repo · WhatsApp-First Enquiry (`ALL SIZE`, zero prices/checkout)

> **STRICT SECURITY & OWNERSHIP RULES (READ FIRST)**
> 1. **Never ask for the client's password or OTP.** The client must sign in personally on their own device (or during a live screen-share) and invite you or accept transfers.
> 2. **Never commit secrets.** `.env`, `studio/.env`, and `.tar.gz` Sanity backups must stay out of Git.
> 3. **Never put private tokens in `VITE_*` variables.** Everything prefixed with `VITE_` is compiled into public browser JavaScript.
> 4. **Preserve `rhynfvzd` during setup.** `rhynfvzd` (`production` dataset) is the currently tested working Sanity project. Do **not** delete it or its documents until a replacement (if chosen) is 100% verified live.

---

## TOMORROW'S CRITICAL PATH (Execution Order)

### Phase A — Must Happen First (Blocking Go-Live Path)
1. **Client Accounts & Ownership:** Client logs into their Gmail → creates/accesses **GitHub** (Step 1) and **Sanity** (Step 3).
2. **Repo & CMS Ownership:** Transfer/grant **GitHub** repo access (Step 2) → decide **keep `rhynfvzd` vs. migrate to new Sanity project** (Step 4) → invite client to Sanity (Step 5).
3. **Studio & Storefront Hosting:** Verify matching **Project ID & Dataset** across Studio and Vercel → deploy **Sanity Studio** (Step 6) → connect GitHub to **Vercel**, set `VITE_*` env vars, and deploy (Steps 7–8).
4. **API Connectivity:** Add live Vercel URL(s) to **Sanity CORS Origins** (Step 9). *Without this, the live site cannot fetch products.*
5. **End-to-End Verification:** Test Create/Edit/Publish/Unpublish in deployed Studio + live WhatsApp enquiry links (Step 12).

### Phase B — Can Wait / Parallelize After Core Site Works on `*.vercel.app`
1. **Custom Domain & SSL:** Point registrar DNS to Vercel and update static SEO files (`index.html`, `public/sitemap.xml`, `public/robots.txt`) if the domain is not `ritihandloom.in` (Step 10).
2. **Google Search Console:** Verify domain ownership and submit `sitemap.xml` *after* the final domain + HTTPS are live (Step 11a).
3. **Google Business Profile:** Claim/verify physical Jagat Farm store listing (Step 11b — Google verification can take days).

---

## Sequential Production Setup Steps

### Step 1: Client GitHub Account Access
- **Prerequisites:** Client has access to their Gmail account.
- **Where to go:** [https://github.com](https://github.com) (on the client's device/session).
- **What to do:**
  1. Client signs in or creates a new GitHub account using their Gmail address.
  2. Client enables 2FA in GitHub **Settings → Password and authentication** (do not share recovery codes or passwords with third parties).
- **Verification Check:** Client can view their GitHub profile dashboard (`github.com/<client-username>`).

---

### Step 2: Repository Access vs. Ownership Transfer
- **Prerequisites:** Step 1 complete; you know the client's GitHub username.
- **Who must perform the transfer:** Only the **current repository owner** (`rahulsand100`) can initiate a transfer. Only the **client** can accept it.
- **Where to go:** `https://github.com/rahulsand100/Riti-Handloom` → **Settings**.
- **Choose Ownership Model:**
  - **Model A — Collaborator Access First (Safest during setup):**
    1. Go to **Settings → Collaborators → Add people** → add `<client-username>` with **Admin** role (or **Write** during active setup).
    2. Once Vercel and DNS are complete, perform Model B for final handover.
  - **Model B — Full Ownership Transfer (Final client ownership):**
    1. Ensure Vercel is NOT yet linked under the old personal GitHub account (or be ready to re-link Vercel under the client's GitHub account right after transfer).
    2. Scroll to **Settings → Danger Zone → Transfer ownership**.
    3. Enter `Riti-Handloom` and `<client-username>`, then confirm.
    4. **Client action:** Client opens the GitHub transfer email and clicks **Accept** within **24 hours**.
    5. After transfer, client can keep you as a **Collaborator** (`Maintain` or `Write`) for future support, or remove access at handover.
- **Verification Check:** Repository URL resolves cleanly under `https://github.com/<client-username>/Riti-Handloom` with full commit history intact.
- **Rollback Precaution:** Keep a local clone on your machine (`git fetch --all`) before transferring; if the transfer expires (>24h), simply re-initiate from **Danger Zone**.

---

### Step 3: Client Sanity Account Access
- **Prerequisites:** Client Gmail access.
- **Where to go:** [https://www.sanity.io/manage](https://www.sanity.io/manage) (client logs in personally).
- **What to do:**
  1. Client clicks **Log in / Get started → Continue with Google** using their Gmail.
  2. Complete the Sanity account creation prompt if new.
- **Verification Check:** Client sees their Sanity Organizations/Projects dashboard.

---

### Step 4: Sanity Project Strategy (`rhynfvzd` vs. New Client-Owned Project)
- **Current Working Configuration:** Project ID **`rhynfvzd`**, Dataset **`production`**.

#### Option A: Keep Existing Project `rhynfvzd` (Fastest)
- **When to use:** You want zero migration risk and immediate continuity with the tested catalogue.
- **What to do:**
  1. Log in as the current `rhynfvzd` Administrator at [sanity.io/manage](https://www.sanity.io/manage).
  2. Go to **Members → Invite members** → enter the client's Gmail with role **Administrator**.
  3. Client accepts the email invite and gains full admin rights (including member management and CORS).
  4. *(Optional)* To transfer billing/org ownership completely, invite the client at the **Organization** level as **Administrator**.

#### Option B: Migrate to a Brand-New Client-Owned Sanity Project (Cleanest Legal Ownership)
- **When to use:** Client requires the Sanity project itself to sit inside their own Sanity Organization.
- **What to do:**
  1. **Client action:** In [sanity.io/manage](https://www.sanity.io/manage), client clicks **Create project**, names it `Riti Handlooms`, selects dataset **`production`** (public read), and shares the new **8-character Project ID** with you.
  2. **Export documents + binary image assets from `rhynfvzd`:**
     ```powershell
     cd studio
     # Ensure SANITY_STUDIO_PROJECT_ID is rhynfvzd (or unset, which defaults to rhynfvzd)
     npx sanity login
     npx sanity dataset export production ..\riti-rhynfvzd-backup.tar.gz
     ```
     *(A `.tar.gz` export includes both JSON documents and all uploaded image assets, preventing broken asset references.)*
  3. **Import into the new client project:**
     ```powershell
     # Point CLI to the NEW client Project ID in studio/.env or shell
     $env:SANITY_STUDIO_PROJECT_ID="<NEW_CLIENT_PROJECT_ID>"
     $env:SANITY_STUDIO_DATASET="production"
     npx sanity dataset import ..\riti-rhynfvzd-backup.tar.gz production --replace
     ```
  4. Delete `..\riti-rhynfvzd-backup.tar.gz` locally once verified (never commit it to Git).
- **Verification Check:** In Sanity Manage under the chosen Project ID → **Datasets → production**, all categories, products, and image assets appear.
- **Rollback Precaution:** **Do NOT delete `rhynfvzd` or its documents.** If anything goes wrong with the new project, simply point `VITE_SANITY_PROJECT_ID` back to `rhynfvzd`.

---

### Step 5: Invite Client & Team Members to Sanity Studio
- **Where to go:** [sanity.io/manage](https://www.sanity.io/manage) → Target Project → **Members**.
- **What to do:**
  1. Verify the client is listed as **Administrator** (full owner).
  2. For store staff who only upload products, invite them with role **Editor** (prevents accidental deletion of API/CORS/project settings).
- **Verification Check:** All invited emails show status **Active** (not Pending).

---

### Step 6: Configure Studio Env & Deploy Sanity Studio
- **Critical Environment Note:**
  - Frontend (`src/`) reads `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET`.
  - Studio (`studio/sanity.config.js` and `studio/sanity.cli.js`) reads **`SANITY_STUDIO_PROJECT_ID`** and **`SANITY_STUDIO_DATASET`** from `studio/.env` or your shell (falling back to `rhynfvzd` / `production` only if unset).
  - **Studio and Frontend Project IDs MUST match exactly.**
- **What to do:**
  1. Create `studio/.env` locally (never commit it — `.env` is gitignored? Check: root `.gitignore` ignores `.env` everywhere, verify `git status` before committing):
     ```env
     SANITY_STUDIO_PROJECT_ID=<CHOSEN_PROJECT_ID>
     SANITY_STUDIO_DATASET=production
     ```
  2. Test Studio locally first:
     ```powershell
     cd studio
     npm run dev
     ```
     Confirm `http://localhost:3333` loads cleanly and displays your target project's documents.
  3. Deploy hosted Sanity Studio:
     ```powershell
     cd studio
     npx sanity deploy
     ```
     Choose a clean Studio hostname (e.g., `riti-handlooms` → `https://riti-handlooms.sanity.studio`).
- **Verification Check:** Open `https://<hostname>.sanity.studio` in Chrome; client signs in with Google (Gmail) and sees **Product**, **Category**, and **Site Settings** schemas (with zero price/size fields).

---

### Step 7: Connect GitHub Repository to Vercel (Client Account)
- **Prerequisites:** Step 2 complete; client logged into [https://vercel.com](https://vercel.com) via **Continue with GitHub**.
- **What to do:**
  1. In Vercel Dashboard, click **Add New… → Project**.
  2. Select the client's `Riti-Handloom` repository → click **Import**.
  3. Verify build settings:
     - **Framework Preset:** `Vite`
     - **Root Directory:** `./`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`
  4. Expand **Environment Variables** before deploying (Step 8).
- **Verification Check:** Build preset shows `Vite` and `dist`.

---

### Step 8: Configure Vercel Environment Variables & Deploy
- **Where to go:** Vercel **Environment Variables** (during import, or **Project Settings → Environment Variables**).
- **Variables to enter** (enable for **Production** and **Preview**):

| Variable | Example / Real Value | Required? | Purpose |
|---|---|:---:|---|
| `VITE_SANITY_PROJECT_ID` | `rhynfvzd` *(or new client ID)* | **Yes** | Connects storefront to Sanity project |
| `VITE_SANITY_DATASET` | `production` | **Yes** | Target dataset |
| `VITE_SANITY_API_VERSION` | `2024-01-01` | **Yes** | GROQ API version |
| `VITE_SITE_URL` | `https://your-domain.com` | **Recommended** | Canonical URLs & JSON-LD `@id`/`url` |
| `VITE_WHATSAPP_NUMBER` | `91XXXXXXXXXX` | **Recommended** | Business WhatsApp digits (no `+`/spaces) |
| `VITE_CONTACT_PHONE` | `+91 XXXXX XXXXX` | **Recommended** | Display & `tel:` phone number |
| `VITE_CONTACT_EMAIL` | `contact@your-domain.com` | **Recommended** | Store contact email |
| `VITE_INSTAGRAM_URL` | `https://instagram.com/handle` | Optional | Instagram links |
| `VITE_STORE_ADDRESS` | `Shop address...` | Optional | Fallback address before Sanity `siteSettings` loads |

- **CRITICAL VERCEL RULE (Build-Time Baking):**
  - Vite compiles `VITE_*` variables into static JS **at build time**.
  - Whenever you add or edit ANY `VITE_*` variable in Vercel later, you **must** go to **Deployments → `...` → Redeploy** (and uncheck **Use existing Build Cache**) for the live site to pick up the new value!
- **Verification Check:** Deployment completes (`Ready`), and visiting `https://<project>.vercel.app` loads the homepage without `Missing required environment variable(s)` errors.

---

### Step 9: Configure Sanity CORS Origins
- **Prerequisites:** Live `https://<project>.vercel.app` URL from Step 8.
- **Where to go:** [sanity.io/manage](https://www.sanity.io/manage) → Target Project → **API → CORS origins**.
- **What to add:**
  1. `https://<your-project>.vercel.app` → **Allow credentials: No** *(public read-only storefront doesn't need cookies/credentials; set `Yes` only if hosting Studio on same domain)*.
  2. `https://*.vercel.app` → **Allow credentials: No** *(allows Vercel Preview branch deployments to load Sanity data; optionally remove after launch for stricter origin lock-down)*.
  3. Your custom domain(s) once known: `https://YOUR_DOMAIN.com` and `https://www.YOUR_DOMAIN.com` → **Allow credentials: No**.
  4. Keep `http://localhost:5173` for local development.
- **Verification Check:** Open `https://<your-project>.vercel.app` in Chrome → DevTools Network shows `200 OK` from `apicdn.sanity.io` with **0 CORS errors**, and all categories/products appear.

---

### Step 10: Connect Custom Domain, DNS & HTTPS
- **Prerequisites:** Custom domain registered; registrar DNS access available.
- **Where to go:** Vercel → **Project Settings → Domains**.
- **What to do:**
  1. Add the apex domain (e.g., `ritihandloom.in`) and `www` subdomain (`www.ritihandloom.in`) in Vercel.
  2. Copy the **exact** `A` and `CNAME` records displayed by Vercel into the client's DNS provider (do not guess IPs; Vercel typically assigns `A` `76.76.21.21` and `CNAME` `cname.vercel-dns.com`).
  3. **Cloudflare Users:** If DNS is on Cloudflare, set proxy to **DNS Only (grey cloud)** during initial SSL issuance so Vercel's Let's Encrypt verification succeeds cleanly.
  4. Update `VITE_SITE_URL` in Vercel to `https://<final-domain>`, then **Redeploy** (Step 8 rule).
  5. **Update Static SEO Files:** Update `index.html`, `public/sitemap.xml`, and `public/robots.txt` in Git if the final domain is not `https://ritihandloom.in`, then commit and push to `main`.
- **Verification Check:** Vercel **Domains** shows green **Valid Configuration** + SSL active; opening `http://` redirects to `https://` with valid padlock; direct refresh on `/shop`, `/category/bedsheets`, and `/product/<id>` returns `200 OK` (not 404).

---

### Step 11: Google Search Console & Google Business Profile
*(Perform only after the live domain and store details are confirmed.)*

#### 11a. Google Search Console
- **Where to go:** [https://search.google.com/search-console](https://search.google.com/search-console) (client logged in personally).
- **What to do:**
  1. Click **Add property** → enter final domain (`https://YOUR_DOMAIN.com`).
  2. Complete **DNS TXT record** verification at the domain registrar (or HTML meta tag in `index.html` if DNS isn't accessible).
  3. After verification succeeds, go to **Sitemaps** → submit `https://YOUR_DOMAIN.com/sitemap.xml`.
- **Verification Check:** Property status shows **Ownership verified** and `sitemap.xml` shows **Success** (Discovered URLs > 0).

#### 11b. Google Business Profile
- **Where to go:** [https://www.google.com/business/](https://www.google.com/business/) (client logged in personally).
- **What to do:**
  1. Create or claim **Riti Handlooms** using the **confirmed** physical shop address, phone number, category (*Handloom Shop / Bedding Store*), opening hours, and live website URL.
  2. Complete Google's required verification flow (video/postcard/SMS).
  3. Once verified, verify exact Google Maps latitude/longitude and Share link, and update `Home.jsx` / `SEO.jsx` / `index.html` if they differ from the current approximate Jagat Farm coordinates (`28.4744, 77.5030`).
- **Verification Check:** Profile status is **Verified** in Google Business Profile Manager (never claim verified prior to Google approval).

---

### Step 12: Final Production Smoke Test & Client Handover
1. **Sanity Publishing Test:** In `https://<name>.sanity.studio`, create a test product (2–3 images, title, description, category; no price/size) → Publish → wait ~60s (Sanity APICDN `max-age=60`) → verify on live site → edit title → verify → Unpublish → verify it disappears.
2. **WhatsApp & Enquiry Bag Test:** On live mobile & desktop, click **Enquire on WhatsApp** on a PDP and **Send Enquiry on WhatsApp** from Enquiry Bag → confirm WhatsApp opens with the client's real phone number, `ALL SIZE`, and live product URL.
3. **Final Client Handover:** Share live website URL, hosted Studio URL, and quick guide on uploading 2–3 photos + `hotspot` framing.

---

## Technical Steps Still Requiring Manual Verification Tomorrow
1. Confirm with client whether to **keep `rhynfvzd`** (invite client as Admin) or **migrate to a new Sanity project**.
2. Confirm real business details before updating static SEO/schema files: final domain, WhatsApp/phone number, exact shop address & opening hours, exact Google Maps coordinates, Instagram URL, and email.
3. Verify `Sanity Studio` login & drag-and-drop image upload + hotspot cropping directly in Chrome on the hosted `*.sanity.studio` URL.
4. Verify Vercel **Redeploy (without cache)** after final `VITE_*` variables are entered.
5. Verify DNS propagation, HTTPS certificate issuance, and Search Console / Business Profile verification statuses.
