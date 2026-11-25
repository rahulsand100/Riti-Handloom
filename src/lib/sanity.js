import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

/**
 * Sanity Client Configuration
 * Public read-only access for storefront presentation.
 * All write mutations are restricted to authenticated Sanity Studio users.
 */
// Resolve environment variables safely in both Vite and Node.js environments
const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : (typeof process !== 'undefined' ? process.env : {})

export const sanityClient = createClient({
  projectId: env?.VITE_SANITY_PROJECT_ID || 'rhynfvzd',
  dataset: env?.VITE_SANITY_DATASET || 'production',
  apiVersion: env?.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: true, // Globally distributed edge caching
})

// Initialize the Sanity image URL builder instance
const builder = createImageUrlBuilder(sanityClient)

/**
 * Validates whether an image source can be safely handled by the Sanity image builder.
 * Accepts Sanity image objects (with asset reference, asset ID, or expanded asset) or asset IDs.
 *
 * @param {any} source
 * @returns {boolean}
 */
export function isValidImageSource(source) {
  if (!source) return false
  if (typeof source === 'string' && source.trim().length > 0) return true
  if (typeof source === 'object') {
    if (source._type === 'image' || source.asset || source._ref || source._id) return true
    if (source.url && typeof source.url === 'string') return true
  }
  return false
}

/**
 * Base URL builder for any Sanity image asset.
 * Preserves Sanity's visual hotspot and crop metadata without overriding focal points.
 * Returns null if the source is invalid or missing.
 *
 * @param {object|string} source Sanity image object or reference
 * @returns {import('@sanity/image-url/lib/types/builder').ImageUrlBuilder | null}
 */
export function urlFor(source) {
  if (!isValidImageSource(source)) return null
  try {
    return builder.image(source)
  } catch {
    return null
  }
}

/**
 * Extracts built-in Base64 Low-Quality Image Placeholder (LQIP) metadata
 * directly from the Sanity document without issuing a new network request.
 * Falls back to an on-the-fly micro-blur URL only if metadata is absent.
 *
 * @param {object} source Sanity image object (optionally with expanded asset->metadata)
 * @returns {string|null} Base64 data URL string or micro-blur URL, or null if no source
 */
export function getLqip(source) {
  if (!source) return null

  // 1. Direct Base64 data string from GROQ asset->metadata.lqip (zero network roundtrip)
  const directLqip =
    source?.asset?.metadata?.lqip ||
    source?.metadata?.lqip ||
    source?.lqip
  if (typeof directLqip === 'string' && directLqip.startsWith('data:image/')) {
    return directLqip
  }

  // 2. Fallback to on-the-fly micro-blur URL if asset reference exists
  const imgBuilder = urlFor(source)
  if (!imgBuilder) return null

  try {
    return imgBuilder
      .width(20)
      .height(25)
      .fit('crop')
      .quality(20)
      .blur(50)
      .auto('format')
      .url()
  } catch {
    return null
  }
}

/**
 * Product Cards Image Helper (Shop Grid, Related Products, Wishlist, Bag).
 * Enforces a strict 4:5 Portrait aspect ratio while preserving the user's
 * defined focal point and hotspot metadata.
 *
 * @param {object|string} source Sanity image asset
 * @param {number} width Default 800px (retina 2x for 400px card)
 * @param {number} height Default 1000px (4:5 ratio)
 * @param {number} quality Default 82
 * @returns {string} URL string (or empty string if source missing)
 */
export function productCardImageUrl(source, width = 800, height = 1000, quality = 82) {
  const imgBuilder = urlFor(source)
  if (!imgBuilder) return ''

  return imgBuilder
    .width(width)
    .height(height)
    .fit('crop') // Preserves hotspot/focal-point naturally without explicit center override
    .auto('format') // Delivers AVIF to modern browsers, WebP fallback
    .quality(quality)
    .url()
}

/**
 * Product Detail Gallery Image Helper (Main PDP high-resolution view).
 * Standardized at 4:5 Portrait ratio with high fidelity for texture viewing.
 *
 * @param {object|string} source Sanity image asset
 * @param {number} width Default 1200px (high-res for desktop PDP)
 * @param {number} height Default 1500px (4:5 ratio)
 * @param {number} quality Default 85
 * @returns {string} URL string (or empty string if source missing)
 */
export function productDetailGalleryImageUrl(source, width = 1200, height = 1500, quality = 85) {
  const imgBuilder = urlFor(source)
  if (!imgBuilder) return ''

  return imgBuilder
    .width(width)
    .height(height)
    .fit('crop')
    .auto('format')
    .quality(quality)
    .url()
}

/**
 * Product Thumbnail Image Helper (Gallery selector row).
 * Standardized at 4:5 Portrait ratio at compact dimensions.
 *
 * @param {object|string} source Sanity image asset
 * @param {number} width Default 200px
 * @param {number} height Default 250px (4:5 ratio)
 * @returns {string} URL string
 */
export function productThumbnailUrl(source, width = 200, height = 250) {
  const imgBuilder = urlFor(source)
  if (!imgBuilder) return ''

  return imgBuilder
    .width(width)
    .height(height)
    .fit('crop')
    .auto('format')
    .quality(80)
    .url()
}

/**
 * Category Card Image Helper (Shop by Category grid).
 * Enforces uniform 4:5 Portrait ratio across all category tiles.
 *
 * @param {object|string} source Sanity image asset
 * @param {number} width Default 800px
 * @param {number} height Default 1000px (4:5 ratio)
 * @param {number} quality Default 82
 * @returns {string} URL string
 */
export function categoryCardImageUrl(source, width = 800, height = 1000, quality = 82) {
  const imgBuilder = urlFor(source)
  if (!imgBuilder) return ''

  return imgBuilder
    .width(width)
    .height(height)
    .fit('crop')
    .auto('format')
    .quality(quality)
    .url()
}

/**
 * Hero Banner Image Helper (Homepage full-width hero slider).
 * Enforces a 16:9 Widescreen aspect ratio with focal point preservation.
 *
 * @param {object|string} source Sanity image asset
 * @param {number} width Default 1920px
 * @param {number} height Default 1080px (16:9 ratio)
 * @param {number} quality Default 85
 * @returns {string} URL string
 */
export function heroBannerImageUrl(source, width = 1920, height = 1080, quality = 85) {
  const imgBuilder = urlFor(source)
  if (!imgBuilder) return ''

  return imgBuilder
    .width(width)
    .height(height)
    .fit('crop')
    .auto('format')
    .quality(quality)
    .url()
}

/**
 * Generates responsive srcset descriptor pairs for modern responsive <img> rendering.
 *
 * @param {object|string} source Sanity image asset
 * @param {object} options
 * @param {number[]} options.widths Array of target widths, e.g. [400, 800, 1200]
 * @param {number} options.aspectRatio Height multiplier (e.g. 1.25 for 4:5, 0.5625 for 16:9)
 * @param {number} options.quality Quality compression
 * @returns {string} srcset string formatted as "url 400w, url 800w, ..."
 */
export function getImageSrcSet(source, { widths = [400, 800, 1200], aspectRatio = 1.25, quality = 82 } = {}) {
  const imgBuilder = urlFor(source)
  if (!imgBuilder) return ''

  return widths
    .map((w) => {
      const h = Math.round(w * aspectRatio)
      const url = imgBuilder
        .width(w)
        .height(h)
        .fit('crop')
        .auto('format')
        .quality(quality)
        .url()
      return `${url} ${w}w`
    })
    .join(', ')
}
