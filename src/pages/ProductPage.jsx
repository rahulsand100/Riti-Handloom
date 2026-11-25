import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Heart, ShieldCheck, RefreshCcw, Truck, MessageCircle as WhatsApp, BadgeCheck
} from 'lucide-react'
import { ProductCard } from '../components/product/ProductCard.jsx'
import { SEO } from '../components/common/SEO.jsx'
import { useSanityCatalog } from '../context/useSanityCatalog.js'
import { categoryPath } from '../data/mockData.js'
import { buildSingleProductEnquiryUrl } from '../lib/whatsapp.js'

export function ProductPage({ onAdd, wishlist, setWishlist }) {
  const { id } = useParams()
  const { getProduct, products } = useSanityCatalog()
  const product = getProduct(id) || products[0]
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const galleryImages = (product.gallery && product.gallery.length > 0)
    ? product.gallery
    : [
        { src: product.image, alt: product.title },
        { src: product.hover, alt: `${product.title} detail` },
      ]
  const liked = wishlist.includes(product.id)
  
  const waMessageUrl = buildSingleProductEnquiryUrl({
    title: product.title,
    category: product.category,
    url: typeof window !== 'undefined' ? window.location.href : `https://ritihandloom.in/product/${product.id}`
  })

  const handleAdd = () => {
    onAdd(product)
  }

  const relatedProducts = products
    .filter(p => (p.category === product.category || p.categorySlug === product.categorySlug) && p.id !== product.id)
    .slice(0, 4)

  return (
    <main className="product-page">
      <SEO
        title={`${product.title} | Handloom Store Jagat Farm Greater Noida`}
        description={`${product.title} in ${product.category}. Handcrafted by master weavers at Riti Handlooms, Jagat Farm, Greater Noida (near Knowledge Park 2). WhatsApp enquiry available.`}
        image={product.image}
        product={product}
        breadcrumbs={[
          { name: 'Home', url: 'https://ritihandloom.in/' },
          { name: product.category, url: `https://ritihandloom.in/category/${product.categorySlug || 'bedsheets'}` },
          { name: product.title, url: `https://ritihandloom.in/product/${product.id}` }
        ]}
      />
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to={categoryPath(product.category)}>{product.category}</Link> / <b>{product.title}</b>
        </div>
        <div className="product-detail">
          <div className="gallery">
            <img
              className="gallery-main"
              src={galleryImages[activeImageIndex].src}
              alt={galleryImages[activeImageIndex].alt || product.title}
            />
            <div className="gallery-thumbnails">
              {galleryImages.map((item, index) => (
                <button
                  key={item.src}
                  className={index === activeImageIndex ? 'active' : ''}
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={item.src} alt="" />
                </button>
              ))}
            </div>
          </div>
          <div className="detail-info">
            <h1>{product.title}</h1>
            <div className="detail-craft-tag">
              <BadgeCheck size={16} />
              <span>Direct Handloom Weave · Natural Fibres · ALL SIZE</span>
            </div>

            <p>
              Crafted in small batches by skilled artisans, this timeless piece brings natural comfort and considered design to your everyday living.
            </p>

            <div className="stock"><span />Available for Handloom Order</div>

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
              <span><ShieldCheck /> Authentic Weave</span>
              <span><RefreshCcw /> Direct Support</span>
              <span><Truck /> Safe Delivery</span>
            </div>
          </div>
        </div>

        <div className="product-tabs">
          <details open>
            <summary>Description & Handloom Weave</summary>
            <p>
              {product.description || 'Handwoven textiles designed for lasting comfort, crafted using natural fibres, artisan detailing, and easy-care finishes.'}
            </p>
          </details>
          <details>
            <summary>Specifications</summary>
            <p>
              <b>Category:</b> {product.category}<br />
              <b>Fabric:</b> {product.fabric || '100% Pure Natural Handloom Cotton'}<br />
              <b>Size:</b> ALL SIZE<br />
              <b>Care:</b> Gentle cold machine or hand wash. Dry in shade.
            </p>
          </details>
          <details>
            <summary>Enquiry & Delivery Schedule</summary>
            <p>
              All enquiries and orders are fulfilled directly via WhatsApp for personal assistance and confirmed dispatch schedules from Greater Noida.
            </p>
          </details>
        </div>

        {relatedProducts.length > 0 && (
          <section className="section product-section" style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
            <div className="carousel-head">
              <h3>More from {product.category}</h3>
              <Link to={categoryPath(product.category)}>View Collection</Link>
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
