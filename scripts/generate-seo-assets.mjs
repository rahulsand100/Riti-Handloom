import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import { loadEnv } from 'vite'
import {
  buildSitemapEntries,
  generateRobotsTxt,
  generateSitemapXml,
  normalizeSiteUrl
} from './sitemap.js'

const loadedEnv = loadEnv('production', process.cwd(), 'VITE_')
for (const [key, value] of Object.entries(loadedEnv)) {
  if (!process.env[key]) process.env[key] = value
}

const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL || 'https://www.ritihandloom.com')
const projectId = process.env.VITE_SANITY_PROJECT_ID || 'rhynfvzd'
const dataset = process.env.VITE_SANITY_DATASET || 'production'
const apiVersion = process.env.VITE_SANITY_API_VERSION || '2024-01-01'

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false
})
const imageUrlBuilder = createImageUrlBuilder(sanityClient)

const sitemapQuery = `{
  "categories": *[_type == "category" && defined(name) && defined(slug.current) && !(_id in path("drafts.**"))] | order(slug.current asc) {
    "_id": _id,
    "name": name,
    "slug": slug.current,
    "description": description,
    "_updatedAt": _updatedAt,
    "image": image {
      _type,
      crop,
      hotspot,
      "asset": asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    }
  },
  "products": *[_type == "product" && defined(title) && defined(slug.current) && !(_id in path("drafts.**"))] | order(slug.current asc) {
    "_id": _id,
    "title": title,
    "slug": slug.current,
    "description": description,
    "_updatedAt": _updatedAt,
    "images": images[0] {
      _type,
      crop,
      hotspot,
      alt,
      "asset": asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    "category": category-> {
      "name": name,
      "slug": slug.current
    }
  }
}`

const catalogue = await sanityClient.fetch(sitemapQuery)
if (!catalogue || !Array.isArray(catalogue.categories) || !Array.isArray(catalogue.products)) {
  throw new Error('Sanity returned an invalid catalogue response; SEO assets were not generated.')
}

const [
  { siteConfig, getCanonicalUrl },
  {
    buildPageStructuredData,
    createLocalBusinessSchema,
    createWebSiteSchema,
    getCategorySeoMetadata,
    getHomeFaqs,
    getProductSeoMetadata,
    HOME_SEO_METADATA
  }
] = await Promise.all([
  import('../src/lib/config.js'),
  import('../src/lib/seo.js')
])
const outputDirectory = path.resolve(process.cwd(), 'dist')
const indexPath = path.join(outputDirectory, 'index.html')
const indexHtml = await readFile(indexPath, 'utf8')
const localBusinessJsonLd = JSON.stringify(createLocalBusinessSchema()).replace(/</g, '\\u003c')
const webSiteJsonLd = JSON.stringify(createWebSiteSchema()).replace(/</g, '\\u003c')

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
}

function escapeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

function replaceRequired(html, pattern, replacement, description) {
  const found = pattern instanceof RegExp ? pattern.test(html) : html.includes(pattern)
  if (!found) throw new Error(`Could not find ${description} in the built homepage HTML.`)
  return html.replace(pattern, replacement)
}

function replaceMetaContent(html, attribute, name, value) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(`(<meta ${attribute}="${escapedName}" content=")[^"]*(")`)
  return replaceRequired(
    html,
    pattern,
    (_, prefix, suffix) => `${prefix}${escapeHtml(value)}${suffix}`,
    `${attribute}=${name}`
  )
}

function replacePageTitle(html, title) {
  return replaceRequired(html, /<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`, 'page title')
}

function updatePageMetadata(html, metadata, { type = 'website', noindex = false, schemas = [] } = {}) {
  let updated = replacePageTitle(html, metadata.title)
  const canonicalPattern = /(<link rel="canonical" href=")[^"]*(")/
  updated = replaceRequired(
    updated,
    canonicalPattern,
    (_, prefix, suffix) => `${prefix}${escapeHtml(metadata.url)}${suffix}`,
    'canonical URL'
  )

  const fields = [
    ['name', 'description', metadata.description],
    ['property', 'og:title', metadata.title],
    ['property', 'og:description', metadata.description],
    ['property', 'og:image', metadata.image || siteConfig.socialImageUrl],
    ['property', 'og:image:alt', metadata.imageAlt || siteConfig.socialImageAlt],
    ['property', 'og:url', metadata.url],
    ['property', 'og:type', type],
    ['name', 'twitter:title', metadata.title],
    ['name', 'twitter:description', metadata.description],
    ['name', 'twitter:image', metadata.image || siteConfig.socialImageUrl],
    ['name', 'twitter:image:alt', metadata.imageAlt || siteConfig.socialImageAlt]
  ]
  for (const [attribute, name, value] of fields) {
    updated = replaceMetaContent(updated, attribute, name, value)
  }

  if (noindex) {
    const robotsPattern = /<meta name="robots" content="[^"]*"\s*\/?>/i
    if (robotsPattern.test(updated)) {
      updated = updated.replace(robotsPattern, '<meta name="robots" content="noindex,follow" />')
    } else {
      updated = replaceRequired(
        updated,
        /<\/head>/i,
        '<meta name="robots" content="noindex,follow" /></head>',
        'head close tag for noindex'
      )
    }
  }

  if (schemas.length > 0) {
    updated = replaceRequired(
      updated,
      /<\/head>/i,
      `<script id="riti-page-jsonld-schema" type="application/ld+json">${escapeJsonLd(schemas)}</script></head>`,
      'head close tag for page structured data'
    )
  }

  return updated
}

function renderFallback({
  title,
  description,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  links = []
}) {
  const imageMarkup = image
    ? `<img src="${escapeHtml(image)}" width="${escapeHtml(imageWidth || 1200)}" height="${escapeHtml(imageHeight || 630)}" alt="${escapeHtml(imageAlt || '')}" />`
    : ''
  const linksMarkup = links.length
    ? `<nav aria-label="Browse catalogue">${links.map(link =>
      `<a href="${escapeHtml(link.url)}">${escapeHtml(link.name)}</a>`
    ).join('')}</nav>`
    : ''

  return `<main class="seo-static-fallback">${imageMarkup}<h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p>${linksMarkup}</main>`
}

function createSnapshot(html, metadata, options = {}) {
  let snapshot = updatePageMetadata(html, metadata, options)
  const fallback = renderFallback({
    title: options.bodyTitle || metadata.title,
    description: options.bodyDescription || metadata.description,
    image: options.fallbackImage,
    imageAlt: options.fallbackImageAlt,
    imageWidth: options.fallbackImageWidth,
    imageHeight: options.fallbackImageHeight,
    links: options.links
  })
  return replaceRequired(snapshot, '<div id="root"></div>', `<div id="root">${fallback}</div>`, 'React root')
}

function socialImageUrl(asset) {
  if (!asset?.asset?._id) return siteConfig.socialImageUrl
  return imageUrlBuilder
    .image(asset)
    .width(1200)
    .height(630)
    .fit('crop')
    .format('jpg')
    .quality(85)
    .url()
}

function createOutputPath(route) {
  return route === '/'
    ? indexPath
    : path.join(outputDirectory, `${route.slice(1)}.html`)
}

const homeMetadata = {
  ...HOME_SEO_METADATA,
  image: siteConfig.socialImageUrl,
  imageAlt: siteConfig.socialImageAlt
}
const homeFallback = {
  bodyTitle: 'Riti Handloom',
  bodyDescription: 'A physical handloom and home furnishing store and authorised Kurlon dealer at Shop No. 14, GM Mall, Gamma 1, Jagat Farm, Greater Noida, Uttar Pradesh 201310, India. Browse products and categories in the online catalogue or contact the store.',
  links: [
    { name: 'Browse the catalogue', url: '/shop' },
    ...catalogue.categories.map(category => ({
      name: category.name,
      url: `/category/${encodeURIComponent(category.slug)}`
    }))
  ]
}

const staticPages = [
  {
    route: '/shop',
    metadata: getCategorySeoMetadata(),
    links: catalogue.categories.map(category => ({
      name: category.name,
      url: `/category/${encodeURIComponent(category.slug)}`
    }))
  },
  {
    route: '/about',
    metadata: {
      title: 'About the Brand | Riti Handloom, Greater Noida',
      description: 'Learn about Riti Handloom, a home furnishing store and authorised Kurlon dealer at Shop No. 14, GM Mall, Gamma 1, Jagat Farm, Greater Noida, Uttar Pradesh.',
      image: siteConfig.socialImageUrl,
      imageAlt: siteConfig.socialImageAlt,
      url: getCanonicalUrl('/about')
    },
    bodyTitle: 'About Riti Handloom'
  },
  {
    route: '/support',
    metadata: {
      title: 'Customer Support | Riti Handloom',
      description: 'Contact Riti Handloom on WhatsApp for help with a purchase, return, replacement, or product enquiry.',
      image: siteConfig.socialImageUrl,
      imageAlt: siteConfig.socialImageAlt,
      url: getCanonicalUrl('/support')
    },
    bodyTitle: 'How Can We Help You?'
  },
  {
    route: '/cart',
    metadata: {
      title: 'Enquiry Bag | Riti Handloom',
      description: 'Review selected products and prepare an enquiry for Riti Handloom.',
      image: siteConfig.socialImageUrl,
      imageAlt: siteConfig.socialImageAlt,
      url: getCanonicalUrl('/cart')
    },
    bodyTitle: 'Enquiry Bag',
    noindex: true
  },
  {
    route: '/wishlist',
    metadata: {
      title: 'My Wishlist | Riti Handloom',
      description: 'Review saved products in your Riti Handloom wishlist.',
      image: siteConfig.socialImageUrl,
      imageAlt: siteConfig.socialImageAlt,
      url: getCanonicalUrl('/wishlist')
    },
    bodyTitle: 'My Wishlist',
    noindex: true
  }
]

const baseHtml = replaceRequired(
  indexHtml,
  /<\/head>/i,
  `<script id="riti-local-business-schema" type="application/ld+json">${localBusinessJsonLd}</script><script id="riti-website-schema" type="application/ld+json">${webSiteJsonLd}</script></head>`,
  'head close tag for business structured data'
)
const homeFaqs = getHomeFaqs(catalogue.categories.map(category => category.name.trim()).filter(Boolean))
let pageCount = 1
const homepageHtml = createSnapshot(baseHtml, homeMetadata, {
  fallbackImage: null,
  schemas: buildPageStructuredData({ faqs: homeFaqs }),
  ...homeFallback
})

const sitemapEntries = buildSitemapEntries({
  siteUrl,
  categories: catalogue.categories,
  products: catalogue.products
})

await writeFile(indexPath, homepageHtml, 'utf8')

for (const page of staticPages) {
  const metadata = { ...page.metadata, image: page.metadata.image || siteConfig.socialImageUrl }
  const html = createSnapshot(baseHtml, metadata, {
    noindex: page.noindex,
    links: page.links,
    schemas: [],
    bodyTitle: page.bodyTitle
  })
  const outputPath = createOutputPath(page.route)
  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, html, 'utf8')
  pageCount += 1
}

for (const category of catalogue.categories) {
  const metadata = getCategorySeoMetadata({
    name: category.name,
    slug: category.slug,
    description: category.description || '',
    socialImage: socialImageUrl(category.image),
    socialImageAlt: `${category.name} collection at Riti Handloom`
  })
  const breadcrumbs = metadata.breadcrumbs
  const products = catalogue.products.filter(product => product.category?.slug === category.slug)
  const links = products.map(product => ({
    name: product.title,
    url: `/product/${encodeURIComponent(product.slug)}`
  }))
  const html = createSnapshot(baseHtml, metadata, {
    schemas: buildPageStructuredData({ breadcrumbs }),
    fallbackImage: category.image?.asset?.url,
    fallbackImageAlt: `${category.name} collection at Riti Handloom`,
    fallbackImageWidth: category.image?.asset?.metadata?.dimensions?.width,
    fallbackImageHeight: category.image?.asset?.metadata?.dimensions?.height,
    links
  })
  const outputPath = createOutputPath(`/category/${encodeURIComponent(category.slug)}`)
  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, html, 'utf8')
  pageCount += 1
}

for (const product of catalogue.products) {
  const normalizedProduct = {
    id: product._id,
    slug: product.slug,
    title: product.title,
    description: product.description || '',
    category: product.category?.name || 'Home furnishings',
    categorySlug: product.category?.slug || '',
    socialImage: socialImageUrl(product.images),
    socialImageAlt: product.images?.alt || product.title
  }
  const metadata = getProductSeoMetadata(normalizedProduct)
  const html = createSnapshot(baseHtml, metadata, {
    type: 'product',
    schemas: buildPageStructuredData({
      product: normalizedProduct,
      breadcrumbs: metadata.breadcrumbs
    }),
    fallbackImage: product.images?.asset?.url,
    fallbackImageAlt: product.images?.alt || product.title,
    fallbackImageWidth: product.images?.asset?.metadata?.dimensions?.width,
    fallbackImageHeight: product.images?.asset?.metadata?.dimensions?.height,
    links: [
      { name: normalizedProduct.category, url: `/category/${encodeURIComponent(normalizedProduct.categorySlug || '')}` },
      { name: 'Customer support', url: '/support' }
    ]
  })
  const outputPath = createOutputPath(`/product/${encodeURIComponent(product.slug)}`)
  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, html, 'utf8')
  pageCount += 1
}

await Promise.all([
  writeFile(path.join(outputDirectory, 'sitemap.xml'), generateSitemapXml(sitemapEntries), 'utf8'),
  writeFile(path.join(outputDirectory, 'robots.txt'), generateRobotsTxt(siteUrl), 'utf8')
])

console.log(
  `Generated SEO assets for ${siteUrl}: ${catalogue.categories.length} categories, ${catalogue.products.length} products, ${sitemapEntries.length} sitemap URLs, ${pageCount} route snapshots.`
)
