/**
 * Standardized GROQ Projections and Queries for Riti Handlooms
 *
 * Rules:
 * 1. Product catalogue with WhatsApp enquiries and ordering.
 * 2. No prices and no individual sizes.
 * 3. Fetch only: name, slug, description, images/metadata, category, featured, new arrival, and availability.
 * 4. Preserve pagination and published-document filtering.
 */

/**
 * Standardized Product Projection Fragment
 */
export const PRODUCT_FIELDS = `
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  category-> {
    _id,
    name,
    "slug": slug.current,
    description
  },
  images[] {
    _key,
    alt,
    asset-> {
      _id,
      url,
      metadata {
        lqip,
        dimensions {
          width,
          height,
          aspectRatio
        }
      }
    },
    crop,
    hotspot
  },
  description,
  isFeatured,
  isNewArrival,
  inStock
`

/**
 * Categories Queries
 */
export const CATEGORIES_QUERY = `
  *[_type == "category" && !(_id in path("drafts.**"))] | order(displayOrder asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    image {
      _key,
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      },
      crop,
      hotspot
    },
    displayOrder,
    isFeatured
  }
`

export const CATEGORY_BY_SLUG_QUERY = `
  *[_type == "category" && slug.current == $categorySlug && !(_id in path("drafts.**"))][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    image {
      _key,
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      },
      crop,
      hotspot
    }
  }
`

/**
 * Standard Catalogue Query (All published products)
 */
export const PRODUCTS_QUERY = `
  *[_type == "product" && !(_id in path("drafts.**"))] | order(_createdAt desc) {
    ${PRODUCT_FIELDS}
  }
`

/**
 * Pagination-Ready Product Queries
 */
export const PAGINATED_PRODUCTS_QUERY = `
  *[_type == "product" && !(_id in path("drafts.**"))] | order(_createdAt desc) [$start...$end] {
    ${PRODUCT_FIELDS}
  }
`

export const PRODUCTS_COUNT_QUERY = `
  count(*[_type == "product" && !(_id in path("drafts.**"))])
`

/**
 * Category-Filtered Queries (with pagination support)
 */
export const PRODUCTS_BY_CATEGORY_QUERY = `
  *[_type == "product" && category->slug.current == $categorySlug && !(_id in path("drafts.**"))] | order(_createdAt desc) {
    ${PRODUCT_FIELDS}
  }
`

export const PAGINATED_PRODUCTS_BY_CATEGORY_QUERY = `
  *[_type == "product" && category->slug.current == $categorySlug && !(_id in path("drafts.**"))] | order(_createdAt desc) [$start...$end] {
    ${PRODUCT_FIELDS}
  }
`

export const CATEGORY_PRODUCTS_COUNT_QUERY = `
  count(*[_type == "product" && category->slug.current == $categorySlug && !(_id in path("drafts.**"))])
`

/**
 * Single Product Detail Query by Slug
 */
export const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    ${PRODUCT_FIELDS}
  }
`

/**
 * Featured & New Arrival Collections for Homepage
 */
export const FEATURED_PRODUCTS_QUERY = `
  *[_type == "product" && isFeatured == true && !(_id in path("drafts.**"))] | order(_createdAt desc) [0...8] {
    ${PRODUCT_FIELDS}
  }
`

export const NEW_ARRIVALS_QUERY = `
  *[_type == "product" && isNewArrival == true && !(_id in path("drafts.**"))] | order(_createdAt desc) [0...8] {
    ${PRODUCT_FIELDS}
  }
`

export const RELATED_PRODUCTS_QUERY = `
  *[_type == "product" && category->slug.current == $categorySlug && _id != $currentId && !(_id in path("drafts.**"))] | order(_createdAt desc) [0...4] {
    ${PRODUCT_FIELDS}
  }
`

/**
 * Site-wide Settings Query
 */
export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    announcementText,
    primaryWhatsAppNumber,
    secondaryPhoneNumber,
    storeAddress,
    heroSlides[] {
      _key,
      label,
      title,
      description,
      image {
        asset-> {
          _id,
          url,
          metadata {
            lqip,
            dimensions {
              width,
              height,
              aspectRatio
            }
          }
        },
        crop,
        hotspot
      },
      link,
      linkText
    }
  }
`
