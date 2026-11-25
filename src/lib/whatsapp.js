/**
 * Riti Handlooms — WhatsApp Commerce & Enquiry Message Engine
 * Standardized URL-encoded WhatsApp deep-link generation.
 * Phone: +91 95557 90429
 */

export const RITI_WHATSAPP_PHONE = '919555790429'

/**
 * Builds a direct wa.me link with URL-encoded text.
 *
 * @param {string} text Plain text message
 * @param {string} [phone] Phone number without + or spaces
 * @returns {string} WhatsApp URL
 */
export function getWhatsAppUrl(text, phone = RITI_WHATSAPP_PHONE) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text.trim())}`
}

/**
 * 1. Single Product Enquiry (From PDP)
 *
 * @param {object} params
 * @param {string} params.title Product title
 * @param {string} params.category Category name
 * @param {string} [params.url] Canonical product URL
 * @returns {string} Formatted WhatsApp URL
 */
export function buildSingleProductEnquiryUrl({
  title,
  category = 'Handloom',
  url = typeof window !== 'undefined' ? window.location.href : 'https://ritihandloom.in'
}) {
  const message = [
    'Namaste Riti Handlooms!',
    '',
    'I am interested in this product and would like to know the price and availability:',
    '',
    `*Product:* ${title}`,
    `*Category:* ${category}`,
    `*Size:* ALL SIZE`,
    `*Product Link:* ${url}`,
    '',
    'Please share the pricing and delivery details.'
  ].join('\n')

  return getWhatsAppUrl(message)
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
  const message = [
    'Namaste Riti Handlooms!',
    '',
    'I would like to enquire about a Bulk / Wholesale Order:',
    '',
    `*Category / Products:* ${category}`,
    `*Estimated Quantity:* ${quantity}`,
    `*Business Name:* ${businessName}`,
    `*Delivery Location:* ${location}`,
    '',
    'Please provide your wholesale catalogue and quotation.'
  ].join('\n')

  return getWhatsAppUrl(message)
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
  const message = [
    'Namaste Riti Handlooms Support,',
    '',
    `*Request:* ${request}`,
    productName ? `*Product Name:* ${productName}` : '',
    details ? `*Details:* ${details}` : '',
    reason ? `*Reason:* ${reason}` : '',
    '',
    'Please guide me on how to proceed.'
  ]
    .filter(Boolean)
    .join('\n')

  return getWhatsAppUrl(message)
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
