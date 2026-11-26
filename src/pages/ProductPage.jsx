import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Heart, ShieldCheck, RefreshCcw, MessageCircle as WhatsApp, Tag
} from 'lucide-react'
import { ProductCard } from '../components/product/ProductCard.jsx'
import { SEO } from '../components/common/SEO.jsx'
import { useSanityCatalog } from '../context/useSanityCatalog.js'
import { categoryPath } from '../data/mockData.js'
import { getProductSeoMetadata } from '../lib/seo.js'
import { buildSingleProductEnquiryUrl } from '../lib/whatsapp.js'

export function ProductPage({ onAdd, wishlist, setWishlist }) {
  const { id } = useParams()
  const { getProduct, products, loading, siteSettings } = useSanityCatalog()
  const product = getProduct(id)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  if (loading && !product) {
    return (
      <main className="product-page">
        <div className="container" style={{ padding: '90px 20px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>Loading handcrafted details...</p>
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="product-page">
        <div className="container" style={{ padding: '90px 20px', textAlign: 'center' }}>
          <h1>Product Not Found</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            This handloom item may have been updated or moved. Browse our current collection below.
          </p>
          <Link className="btn primary" to="/shop">Explore Collection</Link>
        </div>
      </main>
    )
  }

  const galleryImages = (product.gallery && product.gallery.length > 0)
    ? product.gallery
    : [
        { src: product.image, srcSet: product.imageSrcSet, alt: product.title },
        { src: product.hover, alt: `${product.title} detail` },
      ]
  const liked = wishlist.includes(product.id)
  const seoMetadata = getProductSeoMetadata(product)
  
  const waMessageUrl = buildSingleProductEnquiryUrl({
    title: product.title,
    category: product.category,
    url: seoMetadata.url,
    phone: siteSettings?.primaryWhatsAppNumber
  })

  const handleAdd = () => {
    onAdd(product)
  }

  const categoryHref = product.categorySlug
    ? `/category/${product.categorySlug}`
    : categoryPath(product.category)

  const relatedProducts = products
    .filter(p => (p.category === product.category || p.categorySlug === product.categorySlug) && p.id !== product.id)
    .slice(0, 4)

  return (
    <main className="product-page">
      <SEO
        title={seoMetadata.title}
        description={seoMetadata.description}
        image={seoMetadata.image}
        imageAlt={seoMetadata.imageAlt}
        url={seoMetadata.url}
        type="product"
        product={product}
        breadcrumbs={seoMetadata.breadcrumbs}
      />
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to={categoryHref}>{product.category}</Link> / <b>{product.title}</b>
        </div>
        <div className="product-detail">
          <div className="gallery">
            <img
              className="gallery-main"
              src={galleryImages[activeImageIndex].src}
              srcSet={galleryImages[activeImageIndex].srcSet || undefined}
              sizes="(max-width: 760px) 100vw, 55vw"
              width="1200"
              height="1500"
              alt={galleryImages[activeImageIndex].alt || product.title}
              loading={activeImageIndex === 0 ? 'eager' : 'lazy'}
              fetchPriority={activeImageIndex === 0 ? 'high' : 'auto'}
            />
            <div className="gallery-thumbnails">
              {galleryImages.map((item, index) => (
                <button
                  key={item.src}
                  className={index === activeImageIndex ? 'active' : ''}
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={item.thumbSrc || item.src}
                    width="200"
                    height="250"
                    alt=""
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="detail-info">
            <h1>{product.title}</h1>
            <div className="detail-craft-tag">
              <Tag size={16} />
              <span>{product.category}</span>
            </div>

            {product.description && <p>{product.description}</p>}

            <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
              <button
                className="btn primary"
                style={{ flex: 1 }}
                onClick={handleAdd}
              >
                Add to Enquiry Bag
              </button>
              <button
                className={`wishlist-detail ${liked ? 'liked' : ''}`}
                style={{ width: '48px', height: '48px', display: 'grid', placeItems: 'center' }}
                onClick={() => setWishlist(liked ? wishlist.filter(x => x !== product.id) : [...wishlist, product.id])}
                aria-label="Wishlist"
              >
                <Heart />
              </button>
            </div>

            <a
              className="whatsapp-link"
              href={waMessageUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '14px 20px',
                background: '#25D366',
                color: '#fff',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 600,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <WhatsApp size={20} /> Enquire on WhatsApp
            </a>

            <div className="detail-trust">
              <span><ShieldCheck /> Product details</span>
              <span><RefreshCcw /> Customer support</span>
              <span><WhatsApp /> Enquire directly</span>
            </div>
          </div>
        </div>

        <div className="product-tabs">
          <details open>
            <summary>Product details</summary>
            <p>{product.description || 'Contact Riti Handlooms for more information about this product.'}</p>
          </details>
          <details>
            <summary>Collection</summary>
            <p>
              <b>Category:</b> {product.category}
            </p>
          </details>
          <details>
            <summary>Product enquiry</summary>
            <p>
              Contact the store on WhatsApp to ask about this product and discuss next steps.
            </p>
          </details>
        </div>

        {relatedProducts.length > 0 && (
          <section className="section product-section" style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
            <div className="carousel-head">
              <h3>More from {product.category}</h3>
              <Link to={categoryHref}>View Collection</Link>
            </div>
            <div className="product-grid">
              {relatedProducts.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAdd={onAdd}
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
