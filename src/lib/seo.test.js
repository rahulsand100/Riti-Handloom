import test from 'node:test'
import assert from 'node:assert/strict'
import {
  buildPageStructuredData,
  createLocalBusinessSchema,
  getCategorySeoMetadata,
  getHomeFaqs,
  getProductSeoMetadata
} from './seo.js'
import { siteConfig } from './config.js'

test('local business schema contains only the confirmed business facts', () => {
  const schema = createLocalBusinessSchema()
  const parsed = JSON.parse(JSON.stringify(schema))

  assert.equal(parsed['@type'], 'HomeGoodsStore')
  assert.equal(parsed.name, 'Riti Handloom')
  assert.deepEqual(parsed.alternateName, ['Riti Handlooms', 'Ritihandloom'])
  assert.equal(parsed.url, siteConfig.siteUrl)
  assert.equal(parsed.address.addressLocality, 'Jagat Farm, Greater Noida')
  assert.equal(parsed.address.addressRegion, 'Uttar Pradesh')
  assert.equal(parsed.address.addressCountry, 'IN')
  assert.equal('geo' in parsed, false)
  assert.equal(parsed.openingHoursSpecification.length, 1)
  assert.equal(parsed.openingHoursSpecification[0].opens, '09:30')
  assert.equal(parsed.openingHoursSpecification[0].closes, '21:00')
  assert.equal(parsed.openingHoursSpecification[0].dayOfWeek.length, 6)
  assert.equal('priceRange' in parsed, false)
})

test('product and breadcrumb schemas use supplied catalogue facts without price or availability claims', () => {
  const schemas = buildPageStructuredData({
    product: {
      title: 'Ivory Meadow Bedsheet Set',
      description: 'Ivory floral bedsheet with matching pillow covers.',
      category: 'Bedsheets',
      socialImage: 'https://cdn.sanity.io/images/project/dataset/image-abc-1200x630.jpg'
    },
    breadcrumbs: [
      { name: 'Home', url: 'https://ritihandloom.in/' },
      { name: 'Bedsheets', url: 'https://ritihandloom.in/category/bedsheets' },
      { name: 'Ivory Meadow Bedsheet Set', url: 'https://ritihandloom.in/product/ivory-meadow-bedsheet-set' }
    ]
  })

  assert.deepEqual(schemas.map(schema => schema['@type']), ['Product', 'BreadcrumbList'])
  assert.equal(schemas[0].name, 'Ivory Meadow Bedsheet Set')
  assert.equal(schemas[0].description, 'Ivory floral bedsheet with matching pillow covers.')
  assert.deepEqual(schemas[0].image, ['https://cdn.sanity.io/images/project/dataset/image-abc-1200x630.jpg'])
  assert.equal('offers' in schemas[0], false)
  assert.equal('availability' in schemas[0], false)
  assert.equal(schemas[1].itemListElement.length, 3)
})

test('product schema omits missing descriptions and non-public placeholder images', () => {
  const [schema] = buildPageStructuredData({
    product: { title: 'Unspecified Item', image: 'data:image/svg+xml,placeholder' }
  })

  assert.equal(schema.name, 'Unspecified Item')
  assert.equal('description' in schema, false)
  assert.equal('image' in schema, false)
})

test('category and product metadata use unique canonical paths and configured brand imagery', () => {
  const category = getCategorySeoMetadata({ name: 'Curtains', slug: 'curtains' })
  const product = getProductSeoMetadata({
    id: 'product-1',
    slug: 'linen-sheer-drape',
    title: 'Linen Sheer Drape',
    category: 'Curtains',
    categorySlug: 'curtains'
  })

  assert.match(category.title, /Curtains in Greater Noida/)
  assert.match(product.title, /Linen Sheer Drape/)
  assert.equal(category.url, `${siteConfig.siteUrl}/category/curtains`)
  assert.equal(product.url, `${siteConfig.siteUrl}/product/linen-sheer-drape`)
  assert.equal(category.image, siteConfig.socialImageUrl)
  assert.equal(product.image, siteConfig.socialImageUrl)
  assert.equal(category.breadcrumbs.at(-1).url, category.url)
  assert.equal(product.breadcrumbs.at(-1).url, product.url)
})

test('FAQ structured data generates valid Question and Answer entities', () => {
  const faqs = getHomeFaqs(['Bedsheets', 'Window Curtains'])
  const [faqSchema] = buildPageStructuredData({ faqs })

  assert.equal(faqSchema['@type'], 'FAQPage')
  assert.equal(faqSchema.mainEntity.length, 6)
  assert.equal(faqSchema.mainEntity[0]['@type'], 'Question')
  assert.match(faqSchema.mainEntity[0].acceptedAnswer.text, /Bedsheets, Window Curtains/)
})
