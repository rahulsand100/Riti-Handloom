/**
 * Riti Handlooms — WhatsApp Commerce & Enquiry Message Engine
 * Standardized URL-encoded WhatsApp deep-link generation.
 */
import { siteConfig, getCanonicalUrl } from './config.js'

export const RITI_WHATSAPP_PHONE = siteConfig.whatsappNumber

/**
 * Builds a direct wa.me link with URL-encoded text.
 *
 * @param {string} text Plain text message
 * @param {string} [phone] Phone number without + or spaces
 * @returns {string} WhatsApp URL
 */
export function getWhatsAppUrl(text, phone = RITI_WHATSAPP_PHONE) {
  const cleanPhone = String(phone || RITI_WHATSAPP_PHONE).replace(/[^\d]/g, '')
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text.trim())}`
}

export function isValidIndianMobileNumber(value) {
  let digits = String(value || '').replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)
  return /^[6-9]\d{9}$/.test(digits)
}

export function generateProductEnquiryMessage({
  title,
  category = 'Handloom',
  url = typeof window !== 'undefined' ? window.location.href : getCanonicalUrl('/')
}) {
  return [
    'Namaste Riti Handlooms!',
    '',
    'I am interested in this product and would like to know the price and availability:',
    '',
    `*Product:* ${title}`,
    `*Category:* ${category}`,
    '*Size:* ALL SIZE',
    `*Product Link:* ${url}`,
    '',
    'Please share the pricing and delivery details.'
  ].join('\n')
}

export function generateWholesaleEnquiryMessage({ items = [], customer = {} } = {}) {
  const productLines = items.map((item, index) => [
    `${index + 1}. ${item.title}`,
    `   Category: ${item.category}`,
    `   Quantity: ${item.quantity}`
  ].join('\n'))

  return [
    'RITI HANDLOOMS — WHOLESALE ENQUIRY',
    '',
    'Selected Products:',
    ...productLines,
    '',
    'Customer Details:',
    `Customer Name: ${customer.name || ''}`,
    `Mobile Number: ${customer.mobile || ''}`,
    `Pincode: ${customer.pincode || ''}`,
    `City: ${customer.city || ''}`,
    `State: ${customer.state || ''}`,
    `Full Delivery Address: ${customer.address || ''}`,
    '',
    'Please share the applicable wholesale details.'
  ].join('\n')
}

export function generateCustomerSupportMessage({
  customerName = '',
  mobileNumber = '',
  requestType = '',
  productName = '',
  purchaseDate = '',
  orderNumber = '',
  additionalDetails = ''
} = {}) {
  const message = [
    'RITI HANDLOOMS — CUSTOMER SUPPORT REQUEST',
    '',
    `Customer Name: ${customerName}`,
    `Mobile Number: ${mobileNumber}`,
    '',
    `Request Type: ${requestType}`,
    `Product Name: ${productName}`,
    '',
    `Purchase Date: ${purchaseDate || 'Not provided'}`,
    `Order / Bill Number: ${orderNumber || 'Not provided'}`,
    '',
    `Issue Description: ${additionalDetails}`,
    '',
    'Please assist me with this request.'
  ]

  if (requestType === 'Return Request' || requestType === 'Replacement Request') {
    message.push('', 'Please guide me regarding the applicable process and next steps.')
  }

  return message.join('\n')
}

/**
 * 1. Single Product Enquiry (From PDP)
 *
 * @param {object} params
 * @param {string} params.title Product title
 * @param {string} params.category Category name
 * @param {string} [params.url] Canonical product URL
 * @param {string} [params.phone] Business WhatsApp number
 * @returns {string} Formatted WhatsApp URL
 */
export function buildSingleProductEnquiryUrl({
  title,
  category = 'Handloom',
  url = typeof window !== 'undefined' ? window.location.href : getCanonicalUrl('/'),
  phone
}) {
  return getWhatsAppUrl(generateProductEnquiryMessage({ title, category, url }), phone)
}

/**
 * 2. Multi-Item Quote Bag (From Enquiry Bag / Drawer)
 *
 * @param {Array<{ title: string, quantity?: number }>} items
 * @param {object} [options]
 * @param {string} [options.deliveryLocation]
 * @returns {string} Formatted WhatsApp URL
 */
export function buildMultiItemEnquiryUrl(items = [], { deliveryLocation = '' } = {}) {
  const lines = items.map((item, index) => {
    const qty = item.quantity && item.quantity > 1 ? ` × ${item.quantity}` : ''
    return `${index + 1}. ${item.title} (ALL SIZE${qty})`
  })

  const totalUnits = items.reduce((sum, item) => sum + (item.quantity || 1), 0)

  const message = [
    'Namaste Riti Handlooms!',
    '',
    'Please share price and availability for these items from my enquiry bag:',
    '',
    ...lines,
    '',
    `*Total Items:* ${items.length} ${items.length === 1 ? 'product' : 'products'} (${totalUnits} ${totalUnits === 1 ? 'unit' : 'units'})`,
    deliveryLocation ? `*Delivery Location:* ${deliveryLocation}` : '*Delivery Location:* [City / Pincode]',
    '',
    'Looking forward to your response.'
  ].join('\n')

  return getWhatsAppUrl(message)
}

/**
 * 3. Bulk & Wholesale Enquiry
 *
 * @param {object} [params]
 * @param {string} [params.category]
 * @param {string} [params.quantity]
 * @param {string} [params.businessName]
 * @param {string} [params.location]
 * @returns {string} Formatted WhatsApp URL
 */
export function buildBulkWholesaleEnquiryUrl({
  category = 'Bedsheets & Home Linen',
  quantity = '50+ units',
  businessName = '',
  location = ''
} = {}) {
  return getWhatsAppUrl(generateWholesaleEnquiryMessage({
    items: [{ title: category, category, quantity }],
    customer: { name: businessName, address: location }
  }))
}

export function buildWholesaleEnquiryUrl({ items = [], customer = {}, phone } = {}) {
  return getWhatsAppUrl(generateWholesaleEnquiryMessage({ items, customer }), phone)
}

/**
 * 4. Exchange & Customer Support
 *
 * @param {object} [params]
 * @param {string} [params.request]
 * @param {string} [params.productName]
 * @param {string} [params.details]
 * @param {string} [params.reason]
 * @returns {string} Formatted WhatsApp URL
 */
export function buildCustomerSupportEnquiryUrl({
  request = 'Inquiry / General Assistance',
  productName = '',
  details = '',
  reason = ''
} = {}) {
  return getWhatsAppUrl(generateCustomerSupportMessage({
    requestType: request,
    productName,
    additionalDetails: details || reason
  }))
}

/**
 * General Consultation Enquiry
 *
 * @param {string} [topic]
 * @returns {string} Formatted WhatsApp URL
 */
export function buildGeneralEnquiryUrl(topic = 'product enquiries and home furnishings') {
  const message = `Namaste Riti Handlooms! I have an enquiry regarding ${topic}. Please share details.`
  return getWhatsAppUrl(message)
}
