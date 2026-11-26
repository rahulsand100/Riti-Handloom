import assert from 'node:assert/strict'
import test from 'node:test'
import {
  generateCustomerSupportMessage,
  generateProductEnquiryMessage,
  generateWholesaleEnquiryMessage,
  getWhatsAppUrl,
  isValidIndianMobileNumber
} from './whatsapp.js'

test('wholesale message includes every product and reviewed delivery detail', () => {
  const message = generateWholesaleEnquiryMessage({
    items: [
      { title: 'Premium Cotton Bedsheet', category: 'Bedsheets', quantity: 75 },
      { title: 'Ivory Meadow Bedsheet Set', category: 'Bedsheets', quantity: 120 },
      { title: 'Premium Door Curtain', category: 'Door Curtains', quantity: 30 }
    ],
    customer: {
      name: 'A & B Textiles',
      mobile: '+91 98765 43210',
      pincode: '201310',
      city: 'Greater Noida',
      state: 'Uttar Pradesh',
      address: '12, A&B Road'
    }
  })

  for (const value of [
    'Premium Cotton Bedsheet',
    'Ivory Meadow Bedsheet Set',
    'Premium Door Curtain',
    'Category: Door Curtains',
    'Quantity: 75',
    'Quantity: 120',
    'Quantity: 30',
    'A & B Textiles',
    '+91 98765 43210',
    '201310',
    'Greater Noida',
    'Uttar Pradesh',
    '12, A&B Road'
  ]) {
    assert.ok(message.includes(value), `Expected wholesale message to include ${value}`)
  }
  assert.doesNotMatch(message, /price|payment|checkout|size/i)

  const url = new URL(getWhatsAppUrl(message, '+91 95557 90429'))
  assert.equal(url.pathname, '/919555790429')
  assert.equal(url.searchParams.get('text'), message)
})

test('customer support message preserves optional fields and only adds guidance for return requests', () => {
  const supportDetails = {
    customerName: 'Ana & Co',
    mobileNumber: '9876543210',
    productName: 'Cotton & Linen',
    purchaseDate: '',
    orderNumber: '',
    additionalDetails: 'Damaged at 50% & torn'
  }

  for (const requestType of [
    'Return Request',
    'Replacement Request',
    'Damaged Product',
    'General Customer Support'
  ]) {
    const message = generateCustomerSupportMessage({ ...supportDetails, requestType })
    assert.ok(message.includes(`Request Type: ${requestType}`))
    assert.ok(message.includes('Customer Name: Ana & Co'))
    assert.ok(message.includes('Mobile Number: 9876543210'))
    assert.ok(message.includes('Product Name: Cotton & Linen'))
    assert.ok(message.includes('Purchase Date: Not provided'))
    assert.ok(message.includes('Order / Bill Number: Not provided'))
    assert.ok(message.includes('Issue Description: Damaged at 50% & torn'))
    assert.equal(
      message.includes('Please guide me regarding the applicable process and next steps.'),
      requestType === 'Return Request' || requestType === 'Replacement Request'
    )
    assert.doesNotMatch(message, /refund guarantee|free return|approved automatically/i)
    assert.equal(new URL(getWhatsAppUrl(message)).searchParams.get('text'), message)
  }
})

test('long wholesale lists survive WhatsApp URL encoding without truncation', () => {
  const items = Array.from({ length: 75 }, (_, index) => ({
    title: `Handloom Product ${index + 1} & Collection`,
    category: index % 2 ? 'Bedsheets' : 'Door Curtains',
    quantity: index + 1
  }))
  const message = generateWholesaleEnquiryMessage({ items })
  const url = new URL(getWhatsAppUrl(message, '919555790429'))

  assert.ok(message.includes('Handloom Product 1 & Collection'))
  assert.ok(message.includes('Handloom Product 75 & Collection'))
  assert.equal(url.searchParams.get('text'), message)
})

test('mobile validation accepts Indian mobile formats and rejects invalid numbers', () => {
  assert.equal(isValidIndianMobileNumber('9876543210'), true)
  assert.equal(isValidIndianMobileNumber('+91 98765 43210'), true)
  assert.equal(isValidIndianMobileNumber('09876543210'), true)
  assert.equal(isValidIndianMobileNumber('12345'), false)
  assert.equal(isValidIndianMobileNumber('1234567890'), false)
})

test('product enquiry message keeps special characters and URL intact', () => {
  const message = generateProductEnquiryMessage({
    title: 'Cotton & Linen Set',
    category: 'Bed Sets',
    url: 'https://ritihandloom.in/product/set?from=home&edit=1'
  })
  const url = getWhatsAppUrl(message, '919555790429')

  assert.ok(message.includes('Cotton & Linen Set'))
  assert.ok(message.includes('https://ritihandloom.in/product/set?from=home&edit=1'))
  assert.equal(new URL(url).searchParams.get('text'), message)
})
