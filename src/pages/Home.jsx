import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ArrowLeft, Camera as Instagram,
  BadgeCheck, ShieldCheck, RefreshCcw, MessageCircle as WhatsApp,
  MapPin, Navigation, Phone, CheckCircle2
} from 'lucide-react'
import { SectionTitle } from '../components/common/SectionTitle.jsx'
import { ProductCard } from '../components/product/ProductCard.jsx'
import { SEO } from '../components/common/SEO.jsx'
import { useSanityCatalog } from '../context/useSanityCatalog.js'
import { siteConfig } from '../lib/config.js'
import { HOME_SEO_METADATA } from '../lib/seo.js'
import { getWhatsAppUrl } from '../lib/whatsapp.js'
import { categoryPath, bedsheetImages, image } from '../data/mockData.js'

export function Home({ onAdd, wishlist, setWishlist }) {
  const { categories, products, siteSettings, loading, error, refetch } = useSanityCatalog()
  const [slide, setSlide] = useState(0)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (!newsletterEmail || !newsletterEmail.includes('@')) return
    try {
      const existing = JSON.parse(localStorage.getItem('riti-newsletter') || '[]')
      if (!existing.includes(newsletterEmail)) {
        existing.push(newsletterEmail)
        localStorage.setItem('riti-newsletter', JSON.stringify(existing))
      }
    } catch {
      // Local storage fallback
    }
    setNewsletterSubscribed(true)
  }

  const defaultHeroSlides = [
    {
      title: 'A softer kind of everyday.',
      label: 'RITI HANDLOOM · THE HOME EDIT',
      description: 'Thoughtful textiles for the little moments that make a home.',
      image: image('photo-1505693416388-ac5ce068fe85', 1800, 900),
      link: '/category/bedsheets',
      linkText: 'Discover the collection'
    },
    {
      title: 'Layers made for living.',
      label: 'COMFORT, IN EVERY THREAD',
      description: 'Find your favorite blanket, pillow, and cozy finishing touch.',
      image: image('photo-1631049307264-da0ec9d70304', 1800, 900),
      link: '/category/blankets',
      linkText: 'Explore blankets'
    },
    {
      title: 'Rest easy. Wake inspired.',
      label: 'BEDROOM ESSENTIALS',
      description: 'Bring fresh color and everyday comfort to your bedroom.',
      image: bedsheetImages[2].src,
      link: '/category/bedsheets',
      linkText: 'Explore bedsheets'
    }
  ]

  const heroSlides = (siteSettings?.heroSlides && siteSettings.heroSlides.length > 0)
    ? siteSettings.heroSlides
    : defaultHeroSlides

  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 5000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  return (
    <>
      <SEO {...HOME_SEO_METADATA} />
      <section className="hero-slider">
        {heroSlides.map((s, i) => (
          <div
            key={s.title}
            className={`hero-slide ${i === slide ? 'active' : ''}`}
            aria-hidden={i !== slide}
          >
            <img
              src={s.image || siteConfig.socialImageUrl}
              srcSet={s.imageSrcSet || undefined}
              sizes="100vw"
              width="1920"
              height="1080"
              alt=""
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
            />
            <div className="hero-copy">
              <small><i />{s.label}</small>
              <h1>{s.title}</h1>
              <p>{s.description}</p>
              <Link className="hero-cta" to={s.link}>
                {s.linkText}
                <ArrowRight size={17} />
              </Link>
            </div>
            <div className="hero-stamp">
              <span>MADE FOR</span>
              <b>your<br />home</b>
              <i>R</i>
            </div>
          </div>
        ))}
        <button
          className="hero-arrow left"
          aria-label="Previous slide"
          onClick={() => setSlide((slide - 1 + heroSlides.length) % heroSlides.length)}
        >
          <ArrowLeft />
        </button>
        <button
          className="hero-arrow right"
          aria-label="Next slide"
          onClick={() => setSlide((slide + 1) % heroSlides.length)}
        >
          <ArrowRight />
        </button>
        <div className="hero-controls">
          <div className="hero-dots">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                className={i === slide ? 'active' : ''}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === slide ? 'true' : undefined}
                onClick={() => setSlide(i)}
              />
            ))}
          </div>
          <span className="hero-count">
            <b>0{slide + 1}</b>
            <i />
            0{heroSlides.length}
          </span>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle>SHOP BY CATEGORY</SectionTitle>
          {loading && categories.length === 0 ? (
            <div className="category-empty">
              <p>Loading handloom collections...</p>
            </div>
          ) : error && categories.length === 0 ? (
            <div className="category-empty">
              <h2>Catalogue temporarily unavailable</h2>
              <p>We could not load the latest handloom collections right now. Please try again.</p>
              <button className="btn primary" onClick={refetch}>Retry</button>
            </div>
          ) : categories.length === 0 ? (
            <div className="category-empty">
              <p>The online catalogue is currently being updated. Contact the store if you need help.</p>
            </div>
          ) : (
            <div className="arrival-grid category-grid">
              {categories.map(category => (
                <Link className="arrival-card" to={`/category/${category.slug}`} key={category.slug}>
                  <img
                    src={category.image}
                    srcSet={category.imageSrcSet || undefined}
                    sizes="(max-width: 640px) 50vw, 25vw"
                    width="800"
                    height="1000"
                    alt={category.imageAlt}
                    loading="lazy"
                    decoding="async"
                  />
                  <span>{category.name.toUpperCase()}<ArrowRight /></span>
                </Link>
              ))}
            </div>
          )}
          <Link className="wide-banner" to={categoryPath('Bedsheets')}>
            <img
              src={image('photo-1505693416388-ac5ce068fe85', 1300, 520)}
              width="1300"
              height="520"
              alt="Bedroom interior shown as home furnishing inspiration"
              loading="lazy"
              decoding="async"
            />
            <div>
              <small>BEDROOM INSPIRATION</small>
              <h3>Comfort, colour and calm for every bedroom</h3>
              <b>Discover the collection <ArrowRight size={16} /></b>
            </div>
          </Link>
        </div>
      </section>

      {error && products.length === 0 && (
        <section className="section product-section">
          <div className="container">
            <div className="category-empty">
              <h2>Unable to load products</h2>
              <p>{error}</p>
              <button className="btn primary" onClick={refetch}>Try Again</button>
            </div>
          </div>
        </section>
      )}

      {!loading && !error && products.length === 0 && (
        <section className="section product-section">
          <div className="container">
            <div className="category-empty">
              <h2>Our catalogue is currently being curated</h2>
              <p>New handcrafted weaves will appear here once published. Contact us on WhatsApp for direct assistance.</p>
            </div>
          </div>
        </section>
      )}

      {[
        ['BED LINEN', 'bedsheets', products.filter(product => ['Bedsheets', 'Bed Sets'].includes(product.category)).slice(0, 4)],
        ['PILLOW COVERS & CURTAINS', 'pillow-covers', products.filter(product => ['Pillow Covers', 'Pillows', 'Curtains'].includes(product.category)).slice(0, 4)],
        ['BLANKETS, TOWELS & FLOOR', 'blankets', products.filter(product => ['Blankets', 'Dohars', 'Towels', 'Carpets'].includes(product.category)).slice(0, 4)],
      ]
        .filter(([, , collection]) => collection.length > 0)
        .map(([title, slug, collection]) => (
        <section className="section product-section" key={title}>
          <div className="container">
            <div className="carousel-head">
              <h3>{title}</h3>
              <Link to={`/category/${slug}`}>View All</Link>
            </div>
            <div className="product-grid">
              {collection.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAdd={onAdd}
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section soft">
        <div className="container">
          <SectionTitle>EXPLORE RITI HANDLOOM</SectionTitle>
          <div className="trust-grid">
            {[
              [BadgeCheck, 'Browse the catalogue', 'Explore current product and category listings'],
              [ShieldCheck, 'Review product details', 'See the information and photographs provided for each item'],
              [RefreshCcw, 'Ask about a product', 'Contact the store directly through WhatsApp'],
              [Phone, 'Get customer support', 'Send a purchase, return, replacement, or general question']
            ].map(([Icon, title, text]) => (
              <div key={title}>
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bespoke-service">
        <div className="container">
          <SectionTitle>WAYS TO ENQUIRE</SectionTitle>
          <div className="craft-grid">
            <div className="craft-card">
              <span className="craft-num">01</span>
              <h3>Browse the catalogue</h3>
              <p>Explore the products and categories currently published on the Riti Handlooms website.</p>
            </div>
            <div className="craft-card">
              <span className="craft-num">02</span>
              <h3>Ask about an item</h3>
              <p>Open a product page and use its WhatsApp enquiry option to ask the store about that product.</p>
            </div>
            <div className="craft-card">
              <span className="craft-num">03</span>
              <h3>Make a wholesale enquiry</h3>
              <p>Select products and quantities, review the details, and prepare a wholesale message for WhatsApp.</p>
            </div>
          </div>
          <div className="craft-banner">
            <div>
              <h3>Need help with an enquiry?</h3>
              <p>Contact Riti Handlooms on WhatsApp or use the wholesale enquiry form to prepare a product list.</p>
            </div>
            <a
              className="btn primary"
              href={getWhatsAppUrl(
                'Namaste Riti Handlooms! I would like to discuss home furnishings or a wholesale enquiry.',
                siteSettings?.primaryWhatsAppNumber
              )}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25D366', color: '#fff', border: 'none' }}
            >
              <WhatsApp size={18} /> Contact on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section local-store-section">
        <div className="container">
          <SectionTitle>VISIT RITI HANDLOOM</SectionTitle>
          <div className="local-store-card">
            <div className="local-store-info">
              <span className="local-tag">GM MALL · GAMMA 1 · JAGAT FARM · GREATER NOIDA</span>
              <h2>A physical handloom and home furnishing store in Jagat Farm, Greater Noida</h2>
              <p className="local-lead">
                Riti Handloom is located at Shop No. 14, GM Mall, Gamma 1, Jagat Farm, Greater Noida,
                Uttar Pradesh 201310. As an authorised Kurlon dealer, we offer Kurlon products alongside
                handloom bedsheets, curtains, blankets, and towels. Visit our store or contact our team on WhatsApp for directions.
              </p>

              <div className="local-proximity-grid">
                <div className="prox-item">
                  <MapPin size={18} />
                  <div>
                    <b>Store location</b>
                    <small>{siteSettings?.storeAddress || siteConfig.storeAddress}</small>
                  </div>
                </div>
                <div className="prox-item">
                  <Phone size={18} />
                  <div>
                    <b>{siteSettings?.secondaryPhoneNumber || siteConfig.contactPhone}</b>
                    <small>Call the store</small>
                  </div>
                </div>
              </div>

              <div className="local-store-actions">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`Riti Handloom, ${siteSettings?.storeAddress || siteConfig.storeAddress}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <Navigation size={16} /> Search on Google Maps
                </a>
                <a
                  href={getWhatsAppUrl(
                    'Namaste Riti Handlooms! I am visiting your store in Jagat Farm.',
                    siteSettings?.primaryWhatsAppNumber
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn secondary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <WhatsApp size={16} /> Ask for Directions
                </a>
              </div>
            </div>

            <div className="local-store-map-preview">
              <div className="map-badge">
                <b>RITI HANDLOOM</b>
                <span>Jagat Farm, Greater Noida</span>
              </div>
              <img
                src="/riti-store-photo-placeholder.svg"
                width="900"
                height="700"
                alt="Riti Handloom store illustration"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="frequently-asked-questions">
        <div className="container">
          <SectionTitle>FREQUENTLY ASKED QUESTIONS</SectionTitle>
          <div className="seo-faq">
            <details>
              <summary>What products does Riti Handloom offer?</summary>
              <p>
                The current online catalogue includes {categories.length
                  ? categories.map(category => category.name).join(', ')
                  : 'home furnishing categories'}. Riti Handloom is also an authorised Kurlon dealer
                offering Kurlon products at our Greater Noida store.
              </p>
            </details>
            <details>
              <summary>Where is the store located?</summary>
              <p>
                Riti Handloom is a physical handloom and home furnishing store at Shop No. 14, GM Mall,
                Gamma 1, Jagat Farm, Greater Noida, Uttar Pradesh 201310, India. Use the store location details above or
                contact the team for directions.
              </p>
            </details>
            <details>
              <summary>How can I enquire about a product?</summary>
              <p>
                Open the product page and choose its WhatsApp enquiry option, or contact the
                store using the phone and WhatsApp links on this page.
              </p>
            </details>
            <details>
              <summary>How can I make a wholesale enquiry?</summary>
              <p>
                Choose Wholesale &amp; Bulk Orders from the website navigation, add products
                and quantities, review the details, then prepare the enquiry for WhatsApp.
              </p>
            </details>
            <details>
              <summary>How can I request return or replacement assistance?</summary>
              <p>
                Use the <Link to="/support">Customer Support</Link> form to describe your
                request. The store will discuss the applicable process with you through
                WhatsApp; submitting a request does not automatically approve it.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="instagram">
        <div className="container">
          <div className="instagram-head">
            <h2><Instagram /> @ritihandloom</h2>
            <a className="btn secondary" href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">
              Follow
            </a>
          </div>
          <div className="insta-grid">
            {[...products.slice(0, 6)].map(p => (
              <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" key={p.id}>
                <img
                  src={p.image}
                  srcSet={p.imageSrcSet || undefined}
                  sizes="(max-width: 640px) 33vw, 16vw"
                  width="800"
                  height="1000"
                  alt={p.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter">
        <div>
          <small>JOIN OUR COMMUNITY</small>
          <h2>Stories, new arrivals & special updates</h2>
          {newsletterSubscribed ? (
            <div className="newsletter-success">
              <CheckCircle2 size={28} color="#25D366" />
              <h3>Thank you for subscribing!</h3>
              <p>We've added <b>{newsletterEmail}</b> to our community list. You'll receive updates on new handloom weaves and artisan stories.</p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit}>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Your email address"
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn primary">Subscribe</button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
