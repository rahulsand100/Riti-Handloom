import { getCanonicalUrl, siteConfig } from './config.js'

export const HOME_SEO_METADATA = Object.freeze({
  title: 'Riti Handloom | Handloom Store in Jagat Farm, Greater Noida',
  description: 'Visit Riti Handloom at Shop No. 14, GM Mall, Gamma 1, Jagat Farm, Greater Noida for cotton bedsheets, curtains, blankets, towels, and Kurlon mattresses. Authorised Kurlon dealer — browse online or enquire on WhatsApp.',
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
      ? `${categoryName} in Greater Noida | Riti Handloom, Jagat Farm`
      : 'Home Furnishings Catalogue | Riti Handloom, Greater Noida',
    description: description
      ? `${description} Browse the ${fallbackName.toLowerCase()} collection at Riti Handloom in Jagat Farm, Greater Noida. Contact us on WhatsApp to ask about a product.`
      : `Browse ${fallbackName.toLowerCase()} at Riti Handloom, a home furnishing store in Jagat Farm, Greater Noida. Contact us on WhatsApp to ask about a product.`,
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
    title: `${product.title} | Riti Handloom, Greater Noida`,
    description: description
      ? `${description} Contact Riti Handloom in Jagat Farm, Greater Noida, on WhatsApp to enquire.`
      : `${product.title} is listed in the ${product.category} collection at Riti Handloom, a home furnishing store in Jagat Farm, Greater Noida. Contact us on WhatsApp to enquire.`,
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
    name: 'Riti Handloom',
    alternateName: ['Riti Handlooms', 'Ritihandloom'],
    url: siteConfig.siteUrl,
    image: `${siteConfig.siteUrl}/riti-store-photo.jpg`,
    hasMap: siteConfig.googleMapsUrl,
    description: 'Physical handloom and home furnishing store and authorised Kurlon dealer at Shop No. 14, GM Mall, Gamma 1, Jagat Farm, Greater Noida, Uttar Pradesh, India.',
    telephone: siteConfig.contactPhone.replace(/\s+/g, ''),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        opens: '09:30',
        closes: '21:00'
      }
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shop No. 14, GM Mall, Gamma 1',
      addressLocality: 'Jagat Farm, Greater Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201310',
      addressCountry: 'IN'
    },
    areaServed: [
      'Jagat Farm',
      'Gamma 1',
      'Greater Noida',
      'Pari Chowk',
      'Knowledge Park',
      'Noida'
    ],
    knowsAbout: [
      'Handloom textiles',
      'Cotton bedsheets',
      'Window curtains',
      'Blankets and dohars',
      'Bath towels',
      'Pillow covers',
      'Kurlon mattresses and sleep products'
    ],
    ...(siteConfig.instagramUrl ? { sameAs: [siteConfig.instagramUrl] } : {})
  }
}

export function createWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.siteUrl}/#website`,
    name: 'Riti Handloom',
    alternateName: ['Riti Handlooms', 'Ritihandloom'],
    url: siteConfig.siteUrl
  }
}

export function getHomeFaqs(categoryNames = []) {
  const categoryList = categoryNames.length > 0
    ? categoryNames.join(', ')
    : 'Bedsheets, Blankets, Curtains, Window Curtains, Pillow Covers, and Towels'

  return [
    {
      question: 'What handloom and home furnishing products does Riti Handloom in Jagat Farm offer?',
      answer: `Riti Handloom offers ${categoryList} at Shop No. 14, GM Mall, Gamma 1, Jagat Farm, Greater Noida. Browse our online catalogue or message us on WhatsApp for product details.`
    },
    {
      question: 'Where is Riti Handloom located in Jagat Farm, Greater Noida?',
      answer: 'Riti Handloom is a physical handloom and home furnishing store located at Shop No. 14, GM Mall, Gamma 1, Jagat Farm, Greater Noida, Uttar Pradesh 201310, near Punjab National Bank. Open Monday to Saturday from 9:30 AM to 9:00 PM (closed Sunday).'
    },
    {
      question: 'Is Riti Handloom an authorised Kurlon dealer in Jagat Farm?',
      answer: 'Yes. Riti Handloom is an authorised Kurlon dealer offering Kurlon products alongside handloom bedsheets, curtains, blankets, pillow covers, and towels at our Jagat Farm, Greater Noida store.'
    },
    {
      question: 'How can I enquire about a product?',
      answer: 'Open any product page and choose its WhatsApp enquiry option, or contact our Jagat Farm store directly using the phone and WhatsApp links on this page.'
    },
    {
      question: 'How can I make a wholesale or bulk enquiry?',
      answer: 'Choose Wholesale & Bulk Orders from the website navigation, add products and quantities, review the details, then send the prepared enquiry on WhatsApp.'
    },
    {
      question: 'How can I request return or replacement assistance?',
      answer: 'Use the Customer Support page to describe your request. Our team will review and discuss the applicable process with you on WhatsApp; submitting a request does not automatically approve it.'
    }
  ]
}

export function buildPageStructuredData({ product = null, breadcrumbs = null, faqs = null } = {}) {
  const schemas = []

  if (product) {
    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title
    }

    const explicitBrand = typeof product.brand === 'string' ? product.brand.trim() : ''
    const resolvedBrand = explicitBrand || (/^kurlon\b/i.test(product.title || '') ? 'Kurlon' : '')
    if (resolvedBrand) {
      productSchema.brand = {
        '@type': 'Brand',
        name: resolvedBrand
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

  const validFaqs = Array.isArray(faqs)
    ? faqs.filter(item => item?.question?.trim() && item?.answer?.trim())
    : []

  if (validFaqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: validFaqs.map(item => ({
        '@type': 'Question',
        name: item.question.trim(),
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer.trim()
        }
      }))
    })
  }

  return schemas
}
