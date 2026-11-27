/**
 * Centralized Runtime Configuration & Environment Validation
 *
 * Reads all public VITE_* environment variables in one place.
 * - In production builds, avoids silently falling back to demo Sanity project IDs.
 * - In local development, preserves safe defaults while logging clear guidance.
 */

const rawEnv =
  typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env
    : typeof process !== 'undefined' && process.env
      ? process.env
      : {}

const isProd = Boolean(rawEnv.PROD)
const isDev = Boolean(rawEnv.DEV)

const PLACEHOLDER_VALUES = new Set([
  '',
  'YOUR_SANITY_PROJECT_ID',
  'YOUR_DOMAIN.com',
  'https://YOUR_DOMAIN.com',
  '91XXXXXXXXXX',
  'YOUR_WHATSAPP_NUMBER'
])

function cleanEnv(key, fallback = '', allowInProd = true) {
  const value = typeof rawEnv[key] === 'string' ? rawEnv[key].trim() : ''
  if (value && !PLACEHOLDER_VALUES.has(value)) {
    return value
  }
  if ((!isProd || allowInProd) && fallback) {
    return fallback
  }
  return ''
}

const sanityProjectId = cleanEnv('VITE_SANITY_PROJECT_ID', '15jlzurr', false)
const sanityDataset = cleanEnv('VITE_SANITY_DATASET', 'production', true)
const sanityApiVersion = cleanEnv('VITE_SANITY_API_VERSION', '2024-01-01', true)

const missingEnvVars = []
if (!sanityProjectId) missingEnvVars.push('VITE_SANITY_PROJECT_ID')
if (!sanityDataset) missingEnvVars.push('VITE_SANITY_DATASET')

export const sanityConfigError =
  missingEnvVars.length > 0
    ? `Missing required environment variable(s): ${missingEnvVars.join(', ')}. Configure them in .env (local) or Vercel Project Settings (production).`
    : null

if (sanityConfigError) {
  console.error(`[Riti Handlooms Config] ${sanityConfigError}`)
}

const DEFAULT_SITE_URL = 'https://www.ritihandloom.com'
const envSiteUrl = cleanEnv('VITE_SITE_URL')
const resolvedSiteUrl = new URL(envSiteUrl || DEFAULT_SITE_URL).origin
const socialImageUrl = cleanEnv('VITE_SOCIAL_IMAGE_URL', `${resolvedSiteUrl}/riti-social-placeholder.png`)

export const siteConfig = {
  isProd,
  isDev,
  sanity: {
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    isConfigured: !sanityConfigError
  },
  siteUrl: resolvedSiteUrl,
  socialImageUrl: new URL(socialImageUrl, resolvedSiteUrl).href,
  socialImageAlt: cleanEnv(
    'VITE_SOCIAL_IMAGE_ALT',
    'Riti Handlooms — Handloom & Home Furnishings in Jagat Farm, Greater Noida'
  ),
  whatsappNumber: cleanEnv('VITE_WHATSAPP_NUMBER', '919555790429'),
  contactPhone: cleanEnv('VITE_CONTACT_PHONE', '+91 95557 90429'),
  contactEmail: cleanEnv('VITE_CONTACT_EMAIL', 'hello@ritihandloom.in'),
  instagramUrl: cleanEnv('VITE_INSTAGRAM_URL', 'https://instagram.com/ritihandloom'),
  googleReviewUrl: 'https://g.page/r/CWJ3DGAEMfzbEAE/review',
  storeAddress: cleanEnv(
    'VITE_STORE_ADDRESS',
    'Shop No. 14, GM Mall, Gamma 1, Jagat Farm, Greater Noida, Uttar Pradesh 201310'
  )
}

/**
 * Builds an absolute canonical URL for any storefront route.
 *
 * @param {string} path Path starting with '/'
 * @returns {string}
 */
export function getCanonicalUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return new URL(normalizedPath, `${siteConfig.siteUrl}/`).href
}
