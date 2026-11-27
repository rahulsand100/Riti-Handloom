import { useEffect } from 'react'
import { siteConfig, getCanonicalUrl } from '../../lib/config.js'
import { buildPageStructuredData, createLocalBusinessSchema, createWebSiteSchema } from '../../lib/seo.js'

export function SEO({
  title = 'Riti Handlooms | Home Furnishings in Jagat Farm, Greater Noida',
  description = 'Explore home furnishings at Riti Handlooms, a physical store in Jagat Farm, Greater Noida, Uttar Pradesh. Browse the catalogue or contact the store directly.',
  image = siteConfig.socialImageUrl,
  imageAlt = siteConfig.socialImageAlt,
  url = getCanonicalUrl('/'),
  type = 'website',
  product = null,
  breadcrumbs = null,
  noindex = false
}) {
  useEffect(() => {
    const canonicalPath = new URL(url, siteConfig.siteUrl).pathname
    const canonicalUrl = getCanonicalUrl(canonicalPath)
    const validSocialImage = typeof image === 'string' && /^https?:\/\//i.test(image)
    const socialImage = validSocialImage ? image : siteConfig.socialImageUrl
    const socialImageAlt = validSocialImage ? imageAlt : siteConfig.socialImageAlt

    document.title = title

    let canonicalTag = document.querySelector('link[rel="canonical"]')
    if (!canonicalTag) {
      canonicalTag = document.createElement('link')
      canonicalTag.rel = 'canonical'
      document.head.appendChild(canonicalTag)
    }
    canonicalTag.href = canonicalUrl

    const setMeta = (selector, attribute, key, content) => {
      let tag = document.querySelector(selector)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attribute, key)
        document.head.appendChild(tag)
      }
      tag.content = content
    }

    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:image"]', 'property', 'og:image', socialImage)
    setMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', socialImageAlt)
    setMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1200')
    setMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '630')
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl)
    setMeta('meta[property="og:type"]', 'property', 'og:type', type)
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Riti Handlooms')
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', 'en_IN')

    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', socialImage)
    setMeta('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', socialImageAlt)

    setMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      noindex
        ? 'noindex,follow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    )

    if (!document.getElementById('riti-local-business-schema')) {
      const localBusinessTag = document.createElement('script')
      localBusinessTag.id = 'riti-local-business-schema'
      localBusinessTag.type = 'application/ld+json'
      localBusinessTag.textContent = JSON.stringify(createLocalBusinessSchema())
      document.head.appendChild(localBusinessTag)
    }

    if (!document.getElementById('riti-website-schema')) {
      const webSiteTag = document.createElement('script')
      webSiteTag.id = 'riti-website-schema'
      webSiteTag.type = 'application/ld+json'
      webSiteTag.textContent = JSON.stringify(createWebSiteSchema())
      document.head.appendChild(webSiteTag)
    }

    let pageSchemaTag = document.getElementById('riti-page-jsonld-schema')
    if (!pageSchemaTag) {
      pageSchemaTag = document.createElement('script')
      pageSchemaTag.id = 'riti-page-jsonld-schema'
      pageSchemaTag.type = 'application/ld+json'
      document.head.appendChild(pageSchemaTag)
    }
    pageSchemaTag.textContent = JSON.stringify(buildPageStructuredData({ product, breadcrumbs }))
  }, [title, description, image, imageAlt, url, type, product, breadcrumbs, noindex])

  return null
}
