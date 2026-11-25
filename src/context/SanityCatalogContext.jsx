import { useState, useEffect, useCallback, useMemo } from 'react'
import { SanityCatalogContext } from './SanityCatalogContext.js'
import { sanityClient } from '../lib/sanity.js'
import {
  PRODUCTS_QUERY,
  CATEGORIES_QUERY,
  SITE_SETTINGS_QUERY
} from '../lib/groq.js'
import {
  normalizeProduct,
  normalizeCategory,
  normalizeSiteSettings
} from '../lib/sanityAdapters.js'

const isDev = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV

// Only import mock data for development fallback
let devFallbackProducts = []
let devFallbackCategories = []
if (isDev) {
  try {
    const mockData = await import('../data/mockData.js')
    devFallbackProducts = mockData.products || []
    devFallbackCategories = mockData.categories || []
  } catch {
    // Mock data unavailable — not critical
  }
}

const defaultSettings = {
  announcementText: 'Handcrafted Handloom & Home Linen · Greater Noida',
  primaryWhatsAppNumber: '919555790429',
  secondaryPhoneNumber: '+91 95557 90429',
  storeAddress: 'Jagat Farm, Greater Noida, Gautam Buddha Nagar, Uttar Pradesh 201308',
  heroSlides: null
}

export function SanityCatalogProvider({ children }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [siteSettings, setSiteSettings] = useState(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    const load = async () => {
      try {
        const [productsRes, categoriesRes, settingsRes] = await Promise.allSettled([
          sanityClient.fetch(PRODUCTS_QUERY),
          sanityClient.fetch(CATEGORIES_QUERY),
          sanityClient.fetch(SITE_SETTINGS_QUERY)
        ])

        if (!active) return

        // 1. Process Products
        if (productsRes.status === 'fulfilled' && Array.isArray(productsRes.value) && productsRes.value.length > 0) {
          const sanityNormalized = productsRes.value
            .map((doc, idx) => normalizeProduct(doc, idx))
            .filter(Boolean)

          if (sanityNormalized.length > 0) {
            setProducts(sanityNormalized)
          } else if (isDev) {
            setProducts(devFallbackProducts)
          }
        } else if (isDev) {
          setProducts(devFallbackProducts)
        }

        // 2. Process Categories
        if (categoriesRes.status === 'fulfilled' && Array.isArray(categoriesRes.value) && categoriesRes.value.length > 0) {
          const sanityCats = categoriesRes.value
            .map(normalizeCategory)
            .filter(Boolean)

          if (sanityCats.length > 0) {
            setCategories(sanityCats)
          } else if (isDev) {
            setCategories(devFallbackCategories)
          }
        } else if (isDev) {
          setCategories(devFallbackCategories)
        }

        // 3. Process Site Settings
        if (settingsRes.status === 'fulfilled' && settingsRes.value) {
          const normalizedSettings = normalizeSiteSettings(settingsRes.value)
          if (normalizedSettings) {
            setSiteSettings(prev => ({
              ...prev,
              ...normalizedSettings,
              heroSlides: normalizedSettings.heroSlides || prev.heroSlides
            }))
          }
        }
      } catch (err) {
        if (!active) return
        console.warn('Sanity catalog fetch failed:', err)
        setError(err.message)
        // In development, fall back to mock data so local dev works
        if (isDev) {
          setProducts(devFallbackProducts)
          setCategories(devFallbackCategories)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      active = false
    }
  }, [])

  const refetch = useCallback(() => {
    setLoading(true)
    setError(null)
    Promise.allSettled([
      sanityClient.fetch(PRODUCTS_QUERY),
      sanityClient.fetch(CATEGORIES_QUERY),
      sanityClient.fetch(SITE_SETTINGS_QUERY)
    ]).then(([productsRes, categoriesRes, settingsRes]) => {
      if (productsRes.status === 'fulfilled' && Array.isArray(productsRes.value) && productsRes.value.length > 0) {
        const sanityNormalized = productsRes.value.map(normalizeProduct).filter(Boolean)
        if (sanityNormalized.length > 0) {
          setProducts(sanityNormalized)
        }
      }
      if (categoriesRes.status === 'fulfilled' && Array.isArray(categoriesRes.value) && categoriesRes.value.length > 0) {
        const sanityCats = categoriesRes.value.map(normalizeCategory).filter(Boolean)
        if (sanityCats.length > 0) {
          setCategories(sanityCats)
        }
      }
      if (settingsRes.status === 'fulfilled' && settingsRes.value) {
        const normalizedSettings = normalizeSiteSettings(settingsRes.value)
        if (normalizedSettings) {
          setSiteSettings(prev => ({ ...prev, ...normalizedSettings, heroSlides: normalizedSettings.heroSlides || prev.heroSlides }))
        }
      }
    }).catch(err => {
      setError(err.message)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  const getProduct = useCallback((idOrSlug) => {
    if (!idOrSlug) return null
    const str = String(idOrSlug).toLowerCase().trim()
    return products.find(p =>
      String(p.id).toLowerCase() === str ||
      String(p.slug || '').toLowerCase() === str ||
      String(p._id || '').toLowerCase() === str ||
      p.title.toLowerCase() === str
    ) || null
  }, [products])

  const getCategory = useCallback((slugOrName) => {
    if (!slugOrName) return null
    const str = String(slugOrName).toLowerCase().trim()
    return categories.find(c =>
      c.slug.toLowerCase() === str ||
      c.name.toLowerCase() === str
    ) || null
  }, [categories])

  const getProductsByCategory = useCallback((categorySlug) => {
    if (!categorySlug) return products
    const targetCat = getCategory(categorySlug)
    if (!targetCat) return products

    return products.filter(p =>
      (p.categorySlug && p.categorySlug.toLowerCase() === targetCat.slug.toLowerCase()) ||
      (p.category && p.category.toLowerCase() === targetCat.name.toLowerCase())
    )
  }, [products, getCategory])

  const featuredProducts = useMemo(() => {
    const featured = products.filter(p => p.isFeatured)
    return featured.length > 0 ? featured.slice(0, 8) : products.slice(0, 8)
  }, [products])

  const newArrivals = useMemo(() => {
    const arrivals = products.filter(p => p.isNewArrival)
    return arrivals.length > 0 ? arrivals.slice(0, 8) : products.slice(0, 8)
  }, [products])

  const value = useMemo(() => ({
    products,
    categories,
    siteSettings,
    featuredProducts,
    newArrivals,
    loading,
    error,
    refetch,
    getProduct,
    getCategory,
    getProductsByCategory
  }), [
    products,
    categories,
    siteSettings,
    featuredProducts,
    newArrivals,
    loading,
    error,
    refetch,
    getProduct,
    getCategory,
    getProductsByCategory
  ])

  return (
    <SanityCatalogContext.Provider value={value}>
      {children}
    </SanityCatalogContext.Provider>
  )
}
