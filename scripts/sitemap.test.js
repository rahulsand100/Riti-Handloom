import test from 'node:test'
import assert from 'node:assert/strict'
import {
  buildSitemapEntries,
  generateRobotsTxt,
  generateSitemapXml,
  normalizeSiteUrl
} from './sitemap.js'

test('sitemap contains public static pages and published Sanity category and product slugs once', () => {
  const entries = buildSitemapEntries({
    siteUrl: 'https://ritihandloom.in/',
    categories: [
      { _id: 'category-a', slug: 'bed sets', _updatedAt: '2026-03-01T10:00:00Z' },
      { _id: 'category-b', slug: 'bed sets' },
      { _id: 'drafts.category-c', slug: 'draft-category' },
      { _id: 'category-d', slug: '' }
    ],
    products: [
      { _id: 'product-a', slug: 'ivory-meadow', _updatedAt: '2026-03-02T10:00:00Z' },
      { _id: 'product-b', slug: 'invalid-date', _updatedAt: 'not-a-date' },
      { _id: 'drafts.product-c', slug: 'draft-product' },
      { _id: 'product-d', slug: '' }
    ]
  })

  const urls = entries.map(entry => entry.url)
  assert.equal(new Set(urls).size, urls.length)
  assert.ok(urls.includes('https://ritihandloom.in/'))
  assert.ok(urls.includes('https://ritihandloom.in/shop'))
  assert.ok(urls.includes('https://ritihandloom.in/about'))
  assert.ok(urls.includes('https://ritihandloom.in/support'))
  assert.ok(urls.includes('https://ritihandloom.in/category/bed%20sets'))
  assert.ok(urls.includes('https://ritihandloom.in/product/ivory-meadow'))
  assert.equal(urls.some(url => /\/(cart|wishlist)(\/|$)/.test(url)), false)
  assert.equal(urls.some(url => url.includes('draft-')), false)
  assert.equal(entries.find(entry => entry.url.endsWith('/product/ivory-meadow')).lastmod, '2026-03-02')
  assert.equal(entries.find(entry => entry.url.endsWith('/product/invalid-date')).lastmod, null)
  assert.equal(entries.find(entry => entry.url === 'https://ritihandloom.in/').lastmod, null)
})

test('XML sitemap escapes values and robots references the configured HTTPS host', () => {
  const xml = generateSitemapXml([
    { url: 'https://ritihandloom.in/product/a&b', lastmod: '2026-03-02' }
  ])
  const robots = generateRobotsTxt('https://ritihandloom.in')

  assert.match(xml, /a&amp;b/)
  assert.match(xml, /<lastmod>2026-03-02<\/lastmod>/)
  assert.match(robots, /Sitemap: https:\/\/ritihandloom\.in\/sitemap\.xml/)
  assert.throws(() => normalizeSiteUrl('http://localhost:5173'), /public HTTPS production domain/)
})
