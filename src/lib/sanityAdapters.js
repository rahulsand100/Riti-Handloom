import {
  productCardImageUrl,
  productDetailGalleryImageUrl,
  categoryCardImageUrl,
  heroBannerImageUrl
} from './sanity.js'

/**
 * Normalizes a Sanity product document into the standard storefront format.
 *
 * @param {object} doc Sanity raw product document
 * @param {number|string} index Optional fallback index
 * @returns {object} Standardized product object
 */
export function normalizeProduct(doc, index = 0) {
  if (!doc) return null

  const slug = doc.slug || doc._id || `product-${index}`
  const title = doc.title || 'Handloom Textile'
  const categoryName = doc.category?.name || 'Bedsheets'
  const categorySlug = doc.category?.slug || 'bedsheets'

  // Extract primary image
  const primarySanityImg = doc.images?.[0]
  const secondarySanityImg = doc.images?.[1] || primarySanityImg

  const image = primarySanityImg
    ? productCardImageUrl(primarySanityImg)
    : '/products/bedsheet-front.jpg'

  const hover = secondarySanityImg
    ? productCardImageUrl(secondarySanityImg)
    : image

  // Extract gallery
  const gallery = (doc.images && doc.images.length > 0)
    ? doc.images.map((img, i) => ({
        src: productDetailGalleryImageUrl(img),
        alt: img.alt || `${title} - Angle ${i + 1}`
      }))
    : [
        { src: image, alt: title },
        { src: hover, alt: `${title} detail` }
      ]

  return {
    id: doc._id || slug,
    _id: doc._id,
    slug: slug,
    title: title,
    category: categoryName,
    categorySlug: categorySlug,
    fabric: doc.fabric || '100% Cotton Handloom',
    image: image,
    hover: hover,
    gallery: gallery,
    description: doc.description || 'Crafted in small batches by skilled artisans, this timeless piece brings natural comfort and considered design to your everyday living.',
    inStock: doc.inStock !== false,
    isFeatured: Boolean(doc.isFeatured),
    isNewArrival: Boolean(doc.isNewArrival),
    badge: doc.isNewArrival ? 'New Arrival' : (doc.isFeatured ? 'Curated' : null),
    _isFromSanity: true
  }
}

/**
 * Normalizes a Sanity category document into standard storefront format.
 *
 * @param {object} doc Sanity raw category document
 * @returns {object} Standardized category object
 */
export function normalizeCategory(doc) {
  if (!doc) return null

  const slug = doc.slug || doc._id
  const name = doc.name || 'Handloom'

  const image = doc.image
    ? categoryCardImageUrl(doc.image)
    : '/products/bedsheet-front.jpg'

  return {
    _id: doc._id,
    name: name,
    slug: slug,
    description: doc.description || `Handcrafted ${name.toLowerCase()} in fine traditional weaves.`,
    image: image,
    displayOrder: doc.displayOrder || 0,
    isFeatured: doc.isFeatured !== false,
    _isFromSanity: true
  }
}

/**
 * Normalizes Site Settings from Sanity
 *
 * @param {object} doc Sanity siteSettings document
 * @returns {object} Standardized site settings
 */
export function normalizeSiteSettings(doc) {
  if (!doc) return null

  const heroSlides = (doc.heroSlides && doc.heroSlides.length > 0)
    ? doc.heroSlides.map((slide, i) => ({
        id: slide._key || `slide-${i}`,
        title: slide.title || 'A softer kind of everyday.',
        label: slide.label || 'RITI HANDLOOM · THE HOME EDIT',
        description: slide.description || 'Thoughtful textiles for the little moments that make a home.',
        image: slide.image ? heroBannerImageUrl(slide.image) : '',
        link: slide.link || '/category/bedsheets',
        linkText: slide.linkText || 'Discover the collection'
      }))
    : null

  return {
    announcementText: doc.announcementText || 'Handcrafted with tradition · Wholesale & Retail Enquiries · Greater Noida',
    primaryWhatsAppNumber: doc.primaryWhatsAppNumber || '919555790429',
    secondaryPhoneNumber: doc.secondaryPhoneNumber || '+91 95557 90429',
    storeAddress: doc.storeAddress || 'Jagat Farm, Greater Noida, Gautam Buddha Nagar, Uttar Pradesh 201308',
    heroSlides: heroSlides
  }
}
