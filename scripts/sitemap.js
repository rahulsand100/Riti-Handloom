export const STATIC_INDEXABLE_PATHS = ['/', '/shop', '/about', '/support']

function isPublishedDocument(document) {
  return document && !String(document._id || '').startsWith('drafts.')
}

function getSlug(document) {
  const slug = typeof document?.slug === 'string' ? document.slug.trim() : ''
  return isPublishedDocument(document) && slug ? encodeURIComponent(slug) : ''
}

function normalizeLastmod(value) {
  if (typeof value !== 'string' || !value.trim()) return null
  const timestamp = Date.parse(value)
  return Number.isNaN(timestamp) ? null : new Date(timestamp).toISOString().slice(0, 10)
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function normalizeSiteUrl(value = 'https://ritihandloom.in') {
  const url = new URL(value)
  if (url.protocol !== 'https:' || /^(localhost|127\.0\.0\.1)$/i.test(url.hostname)) {
    throw new Error('VITE_SITE_URL must be the public HTTPS production domain.')
  }
  return url.origin
}

export function buildSitemapEntries({
  siteUrl,
  categories = [],
  products = [],
  staticPaths = STATIC_INDEXABLE_PATHS
}) {
  const origin = normalizeSiteUrl(siteUrl)
  const entries = new Map()

  const addEntry = (path, lastmod) => {
    const url = new URL(path, `${origin}/`).href
    if (!entries.has(url)) {
      entries.set(url, { url, lastmod: normalizeLastmod(lastmod) })
    }
  }

  staticPaths.forEach(path => addEntry(path))
  categories.forEach(category => {
    const slug = getSlug(category)
    if (slug) addEntry(`/category/${slug}`, category._updatedAt)
  })
  products.forEach(product => {
    const slug = getSlug(product)
    if (slug) addEntry(`/product/${slug}`, product._updatedAt)
  })

  return Array.from(entries.values())
}

export function generateSitemapXml(entries) {
  const urls = entries.map(({ url, lastmod }) => [
    '  <url>',
    `    <loc>${escapeXml(url)}</loc>`,
    ...(lastmod ? [`    <lastmod>${escapeXml(lastmod)}</lastmod>`] : []),
    '  </url>'
  ].join('\n')).join('\n')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    ''
  ].join('\n')
}

export function generateRobotsTxt(siteUrl) {
  const origin = normalizeSiteUrl(siteUrl)
  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /studio/',
    'Disallow: /admin/',
    '',
    `Sitemap: ${origin}/sitemap.xml`,
    ''
  ].join('\n')
}
