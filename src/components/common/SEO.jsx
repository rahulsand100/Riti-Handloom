import { useEffect } from 'react'

/**
 * Hyper-Local SEO Component for Riti Handlooms
 * Injects dynamic Meta tags, OpenGraph, Twitter Cards, and Schema.org JSON-LD
 * specifically optimized for Jagat Farm, Knowledge Park 2, Pari Chowk & Greater Noida searches.
 */
export function SEO({
  title = 'Riti Handlooms | Handloom & Home Linen Store in Jagat Farm, Greater Noida',
  description = 'Visit Riti Handlooms at Jagat Farm, Greater Noida (near Knowledge Park 2 & Pari Chowk). Premium handcrafted bedsheets, dohars, blankets, towels, and custom handloom furnishings. Direct workshop rates & WhatsApp enquiry.',
  keywords = 'handloom store jagat farm, nearest handloom store knowledge park 2, handloom shop near me greater noida, bedsheets store jagat farm, dohars quilts blankets greater noida, handloom store near pari chowk, wholesale home linen noida',
  image = 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&h=630&q=85',
  url = typeof window !== 'undefined' ? window.location.href : 'https://ritihandloom.in',
  type = 'website',
  product = null,
  breadcrumbs = null
}) {
  useEffect(() => {
    // 1. Document Title
    document.title = title

    // 2. Meta description
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = 'description'
      document.head.appendChild(metaDesc)
    }
    metaDesc.content = description

    // 3. Meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta')
      metaKeywords.name = 'keywords'
      document.head.appendChild(metaKeywords)
    }
    metaKeywords.content = keywords

    // 4. OpenGraph Tags for WhatsApp & Social Unfurling
    const setMeta = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.content = content
    }

    setMeta('og:title', title)
    setMeta('og:description', description)
    setMeta('og:image', image)
    setMeta('og:url', url)
    setMeta('og:type', type)
    setMeta('og:site_name', 'Riti Handlooms Greater Noida')
    setMeta('og:locale', 'en_IN')

    // 5. Geo Meta Tags for Hyper-Local Search (Jagat Farm, Greater Noida)
    const setGeoMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.name = name
        document.head.appendChild(tag)
      }
      tag.content = content
    }
    setGeoMeta('geo.region', 'IN-UP')
    setGeoMeta('geo.placename', 'Jagat Farm, Greater Noida')
    setGeoMeta('geo.position', '28.4744;77.5030')
    setGeoMeta('ICBM', '28.4744, 77.5030')

    // 6. Schema.org JSON-LD Structured Data
    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'HomeGoodsStore'],
      '@id': 'https://ritihandloom.in/#localbusiness',
      name: 'Riti Handlooms',
      alternateName: 'Riti Handloom Jagat Farm Greater Noida',
      image: [
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&h=800&q=85'
      ],
      description: 'Premier handloom and home furnishing store located in Jagat Farm, Greater Noida, near Knowledge Park 2 and Pari Chowk. Authentic bedsheets, dohars, blankets, towels, and custom linen.',
      telephone: '+919555790429',
      priceRange: '₹₹ - Artisan & Wholesale Rates',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, UPI, Bank Transfer',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Jagat Farm Commercial Complex, Near Pari Chowk',
        addressLocality: 'Greater Noida',
        addressRegion: 'Uttar Pradesh',
        postalCode: '201308',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 28.4744,
        longitude: 77.5030
      },
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Jagat Farm' },
        { '@type': 'AdministrativeArea', name: 'Knowledge Park 2' },
        { '@type': 'AdministrativeArea', name: 'Knowledge Park 1' },
        { '@type': 'AdministrativeArea', name: 'Knowledge Park 3' },
        { '@type': 'AdministrativeArea', name: 'Pari Chowk' },
        { '@type': 'AdministrativeArea', name: 'Alpha 1' },
        { '@type': 'AdministrativeArea', name: 'Alpha 2' },
        { '@type': 'AdministrativeArea', name: 'Beta 1' },
        { '@type': 'AdministrativeArea', name: 'Beta 2' },
        { '@type': 'AdministrativeArea', name: 'Greater Noida' },
        { '@type': 'AdministrativeArea', name: 'Noida' },
        { '@type': 'AdministrativeArea', name: 'Delhi NCR' }
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '10:00',
          closes: '21:00'
        }
      ],
      hasMap: 'https://maps.google.com/?q=Jagat+Farm+Greater+Noida',
      sameAs: [
        'https://instagram.com/ritihandloom',
        'https://wa.me/919555790429'
      ]
    }

    const schemas = [localBusinessSchema]

    // If Product Page, add Product Schema (no price — enquiry-only model)
    if (product) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        image: product.image,
        description: product.description || `Handcrafted ${product.title} from Riti Handlooms Greater Noida.`,
        category: product.category,
        brand: {
          '@type': 'Brand',
          name: 'Riti Handlooms'
        }
      })
    }

    // If Breadcrumbs provided, add BreadcrumbList Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.url
        }))
      })
    }

    let scriptTag = document.getElementById('riti-jsonld-schema')
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.id = 'riti-jsonld-schema'
      scriptTag.type = 'application/ld+json'
      document.head.appendChild(scriptTag)
    }
    scriptTag.textContent = JSON.stringify(schemas)
  }, [title, description, keywords, image, url, type, product, breadcrumbs])

  return null
}
