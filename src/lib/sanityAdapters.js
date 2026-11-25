import {
  productCardImageUrl,
  productDetailGalleryImageUrl,
  productThumbnailUrl,
  categoryCardImageUrl,
  heroBannerImageUrl
} from './sanity.js'
import { siteConfig } from './config.js'

// Neutral SVG placeholder shown only when a Sanity product/category has no image uploaded
export const NO_IMAGE_PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
      <rect width="800" height="1000" fill="#F4EFE6"/>
      <rect x="40" y="40" width="720" height="920" fill="none" stroke="#DFD5C5" stroke-width="2"/>
      <text x="400" y="485" font-family="Georgia, serif" font-size="28" fill="#1F2A44" text-anchor="middle">RITI HANDLOOM</text>
      <text x="400" y="528" font-family="sans-serif" font-size="16" letter-spacing="3" fill="#8C7B65" text-anchor="middle">IMAGE COMING SOON</text>
    </svg>`
  )

/**
 * Normalizes a Sanity product document into the standard storefront format.
 *
 * @param {object} doc Sanity raw product document
 * @param {number|string} index Optional fallback index
 * @returns {object} Standardized product object
 */
export function normalizeProduct(doc, index = 0) {
  if (!doc) return null

  const slug = String(doc.slug || doc._id || `product-${index}`).trim()
  const title = String(doc.title || 'Handloom Textile').trim()
  const categoryName = String(doc.category?.name || 'Handloom').trim()
  const categorySlug = String(doc.category?.slug || '').trim()

  const validImages = Array.isArray(doc.images)
    ? doc.images.filter(img => Boolean(productCardImageUrl(img)))
    : []

  // Extract primary & hover images (never silently fall back to mock product photos)
  const primarySanityImg = validImages[0]
  const secondarySanityImg = validImages[1] || primarySanityImg

  const image = primarySanityImg
    ? productCardImageUrl(primarySanityImg)
    : NO_IMAGE_PLACEHOLDER

  const hover = secondarySanityImg
    ? productCardImageUrl(secondarySanityImg)
    : ''

  // Extract gallery with optimized thumbnails
  const gallery = validImages.length > 0
    ? validImages.map((img, i) => ({
        src: productDetailGalleryImageUrl(img),
        thumbSrc: productThumbnailUrl(img),
        alt: img.alt || `${title} - Angle ${i + 1}`
      }))
    : [{ src: NO_IMAGE_PLACEHOLDER, thumbSrc: NO_IMAGE_PLACEHOLDER, alt: `${title} - image coming soon` }]

  return {
    id: doc._id || slug,
    _id: doc._id,
    slug: slug,
    title: title,
    category: categoryName,
    categorySlug: categorySlug,
    fabric: String(doc.fabric || '100% Cotton Handloom').trim(),
    image: image,
    hover: hover,
    gallery: gallery,
    description: String(doc.description || 'Crafted in small batches by skilled artisans, this timeless piece brings natural comfort and considered design to your everyday living.').trim(),
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

  const slug = String(doc.slug || doc._id).trim()
  const name = String(doc.name || 'Handloom').trim()

  const image = doc.image
    ? (categoryCardImageUrl(doc.image) || NO_IMAGE_PLACEHOLDER)
    : NO_IMAGE_PLACEHOLDER

  return {
    _id: doc._id,
    name: name,
    slug: slug,
    description: String(doc.description || `Handcrafted ${name.toLowerCase()} in fine traditional weaves.`).trim(),
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
    primaryWhatsAppNumber: doc.primaryWhatsAppNumber || siteConfig.whatsappNumber,
    secondaryPhoneNumber: doc.secondaryPhoneNumber || siteConfig.contactPhone,
    storeAddress: doc.storeAddress || siteConfig.storeAddress,
    heroSlides: heroSlides
  }
}
