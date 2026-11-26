import { getCanonicalUrl, siteConfig } from './config.js'

export const HOME_SEO_METADATA = Object.freeze({
  title: 'Riti Handlooms | Home Furnishings in Jagat Farm, Greater Noida',
  description: 'Explore home furnishings at Riti Handlooms, a physical handloom and home furnishing store in Jagat Farm, Greater Noida, Uttar Pradesh. Browse the catalogue, visit the store, or contact the team.',
  url: getCanonicalUrl('/')
})

export function getCategorySeoMetadata({
  name = '',
  slug = '',
  description = '',
  socialImage = '',
  socialImageAlt = ''
} = {}) {
  const categoryName = name || slug
    .split('-')
    .filter(Boolean)
    .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ')
  const categoryUrl = slug
    ? getCanonicalUrl(`/category/${encodeURIComponent(slug)}`)
    : getCanonicalUrl('/shop')
  const fallbackName = categoryName || 'home furnishing'

  return {
    title: categoryName
      ? `${categoryName} in Greater Noida | Riti Handlooms, Jagat Farm`
      : 'Home Furnishings Catalogue | Riti Handlooms, Greater Noida',
    description: description
      ? `${description} Browse the ${fallbackName.toLowerCase()} collection at Riti Handlooms in Jagat Farm, Greater Noida. Contact us on WhatsApp to ask about a product.`
      : `Browse ${fallbackName.toLowerCase()} at Riti Handlooms, a home furnishing store in Jagat Farm, Greater Noida. Contact us on WhatsApp to ask about a product.`,
    image: socialImage || siteConfig.socialImageUrl,
    imageAlt: socialImageAlt || siteConfig.socialImageAlt,
    url: categoryUrl,
    breadcrumbs: [
      { name: 'Home', url: getCanonicalUrl('/') },
      { name: categoryName || 'Our Collection', url: categoryUrl }
    ]
  }
}

export function getProductSeoMetadata(product) {
  const productPath = `/product/${encodeURIComponent(product.slug || product.id)}`
  const productUrl = getCanonicalUrl(productPath)
  const categoryUrl = product.categorySlug
    ? getCanonicalUrl(`/category/${encodeURIComponent(product.categorySlug)}`)
    : getCanonicalUrl('/shop')
  const description = product.description?.trim()

  return {
    title: `${product.title} | Riti Handlooms, Greater Noida`,
    description: description
      ? `${description} Contact Riti Handlooms in Jagat Farm, Greater Noida, on WhatsApp to enquire.`
      : `${product.title} is listed in the ${product.category} collection at Riti Handlooms, a home furnishing store in Jagat Farm, Greater Noida. Contact us on WhatsApp to enquire.`,
    image: product.socialImage || siteConfig.socialImageUrl,
    imageAlt: product.socialImage ? (product.socialImageAlt || product.title) : siteConfig.socialImageAlt,
    url: productUrl,
    breadcrumbs: [
      { name: 'Home', url: getCanonicalUrl('/') },
      { name: product.category, url: categoryUrl },
      { name: product.title, url: productUrl }
    ]
  }
}

export function createLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeGoodsStore',
    '@id': `${siteConfig.siteUrl}/#localbusiness`,
    name: 'Riti Handlooms',
    url: siteConfig.siteUrl,
    description: 'Physical handloom and home furnishing store in Jagat Farm, Greater Noida, Uttar Pradesh, India.',
    telephone: siteConfig.contactPhone.replace(/\s+/g, ''),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jagat Farm, Greater Noida',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN'
    }
  }
}

export function buildPageStructuredData({ product = null, breadcrumbs = null } = {}) {
  const schemas = []

  if (product) {
    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      brand: {
        '@type': 'Brand',
        name: 'Riti Handlooms'
      }
    }

    if (product.socialImage && /^https?:\/\//i.test(product.socialImage)) {
      productSchema.image = [product.socialImage]
    }
    if (product.description?.trim()) productSchema.description = product.description.trim()
    if (product.category) productSchema.category = product.category

    schemas.push(productSchema)
  }

  if (Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs
        .filter(crumb => crumb?.name && crumb?.url)
        .map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.url
        }))
    })
  }

  return schemas
}
