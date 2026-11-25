# Riti Handloom

Premium handloom e-commerce storefront for Riti Handloom.

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

- Store details and contact links are in `src/App.jsx`.
- Product and homepage banner data are in `src/App.jsx`.
- Product photography uses Unsplash URLs and should be replaced with licensed Riti Handloom images.
- Cart and wishlist state persist in localStorage.
- Checkout is a frontend demonstration; connect Razorpay and backend APIs before accepting real orders.
