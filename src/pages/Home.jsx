import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ArrowLeft, Camera as Instagram,
  BadgeCheck, ShieldCheck, Truck, RefreshCcw, MessageCircle as WhatsApp,
  MapPin, Navigation, Clock, Phone
} from 'lucide-react'
import { SectionTitle } from '../components/common/SectionTitle.jsx'
import { ProductCard } from '../components/product/ProductCard.jsx'
import { SEO } from '../components/common/SEO.jsx'
import { useSanityCatalog } from '../context/useSanityCatalog.js'
import { categoryPath, bedsheetImages, image } from '../data/mockData.js'

export function Home({ onAdd, wishlist, setWishlist }) {
  const { categories, products, siteSettings } = useSanityCatalog()
  const [slide, setSlide] = useState(0)

  const defaultHeroSlides = [
    {
      title: 'A softer kind of everyday.',
      label: 'RITI HANDLOOM · THE HOME EDIT',
      description: 'Thoughtful textiles for the little moments that make a home.',
      image: image('photo-1505693416388-ac5ce068fe85', 1800, 900),
      link: '/category/bed-sets',
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
      <SEO
        title="Riti Handlooms | Handloom & Home Linen Store in Jagat Farm, Greater Noida"
        description="Visit Riti Handlooms at Jagat Farm Commercial Complex, Greater Noida — 5 mins from Knowledge Park 2 & Pari Chowk. Authentic artisan bedsheets, dohars, blankets, towels, and custom linen. WhatsApp enquiry & store walk-ins welcome."
        keywords="handloom store jagat farm, nearest handloom store knowledge park 2, handloom shop near me greater noida, bedsheets store jagat farm, dohars quilts blankets greater noida, handloom store near pari chowk, home furnishings greater noida, wholesale linen noida"
      />
      <section className="hero-slider">
        {heroSlides.map((s, i) => (
          <div
            key={s.title}
            className={`hero-slide ${i === slide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${s.image})` }}
            aria-hidden={i !== slide}
          >
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
          <div className="arrival-grid category-grid">
            {categories.map(category => (
              <Link className="arrival-card" to={`/category/${category.slug}`} key={category.slug}>
                <img src={category.image} alt={`${category.name} collection`} loading="lazy" />
                <span>{category.name.toUpperCase()}<ArrowRight /></span>
              </Link>
            ))}
          </div>
          <Link className="wide-banner" to={categoryPath('Bedsheets')}>
            <img src={image('photo-1505693416388-ac5ce068fe85', 1300, 520)} alt="Premium bed linen collection" />
            <div>
              <small>THE BEDROOM EDIT</small>
              <h3>Comfort, colour and calm for every bedroom</h3>
              <b>Discover the collection <ArrowRight size={16} /></b>
            </div>
          </Link>
        </div>
      </section>

      {[
        ['BED LINEN', 'bedsheets', products.slice(0, 4)],
        ['PILLOW COVER SETS & PILLOW PAIRS', 'pillow-covers', products.filter(product => ['Pillow Covers', 'Pillows'].includes(product.category))],
        ['BLANKETS & FLOOR', 'blankets', products.filter(product => ['Blankets', 'Dohars', 'Carpets'].includes(product.category))],
      ].map(([title, slug, collection]) => (
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
          <SectionTitle>WHY CHOOSE US</SectionTitle>
          <div className="trust-grid">
            {[
              [BadgeCheck, 'Handloom Certified', 'Authentic artisan craft'],
              [ShieldCheck, 'Natural Fabrics', 'Comfort you can feel'],
              [Truck, 'Secure Delivery', 'Carefully packed and shipped'],
              [RefreshCcw, 'Direct Enquiry', 'Personalized customer support']
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
          <SectionTitle>HANDLOOM CRAFT & BESPOKE SERVICE</SectionTitle>
          <div className="craft-grid">
            <div className="craft-card">
              <span className="craft-num">01</span>
              <h3>Direct Artisan Weaving</h3>
              <p>Every piece is crafted by skilled weavers in Greater Noida. Direct handloom provenance ensures pure textiles without retail markups.</p>
            </div>
            <div className="craft-card">
              <span className="craft-num">02</span>
              <h3>Custom Sizing on Demand</h3>
              <p>Special dimensions for custom mattresses, extra-deep pockets, or specific drop lengths? Message us on WhatsApp with your exact dimensions.</p>
            </div>
            <div className="craft-card">
              <span className="craft-num">03</span>
              <h3>Wholesale & Gifting Orders</h3>
              <p>Curated textile packages and wholesale rates for guest houses, boutique stays, and festive corporate gifting with direct personal dispatch.</p>
            </div>
          </div>
          <div className="craft-banner">
            <div>
              <h3>Looking for custom home furnishings or wholesale pricing?</h3>
              <p>Connect directly with our master craftsmen on WhatsApp for fabric guidance, custom dimensions, and immediate quotations.</p>
            </div>
            <a
              className="btn primary"
              href="https://wa.me/919555790429?text=Namaste%20Riti%20Handlooms!%20I%20would%20like%20to%20discuss%20custom%20sizing%20or%20wholesale%20enquiry."
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25D366', color: '#fff', border: 'none' }}
            >
              <WhatsApp size={18} /> Chat with Our Team
            </a>
          </div>
        </div>
      </section>

      {/* Hyper-Local Store Locator Section (Jagat Farm & Knowledge Park 2) */}
      <section className="section local-store-section">
        <div className="container">
          <SectionTitle>VISIT OUR STORE & WORKSHOP</SectionTitle>
          <div className="local-store-card">
            <div className="local-store-info">
              <span className="local-tag">JAGAT FARM · GREATER NOIDA</span>
              <h2>Your Nearest Handloom Store in Greater Noida</h2>
              <p className="local-lead">
                Conveniently located at <b>Jagat Farm Commercial Market</b>, just minutes from <b>Knowledge Park 2</b>, <b>Pari Chowk</b>, and the Alpha/Beta commercial hub. Walk in to explore our tactile fabric swatches, pure cotton weaves, or discuss bespoke sizes with our artisan team.
              </p>

              <div className="local-proximity-grid">
                <div className="prox-item">
                  <MapPin size={18} />
                  <div>
                    <b>Jagat Farm Complex</b>
                    <small>Primary Greater Noida Shopping Market</small>
                  </div>
                </div>
                <div className="prox-item">
                  <Navigation size={18} />
                  <div>
                    <b>5 Mins from Knowledge Park 2</b>
                    <small>Direct access via Pari Chowk corridor</small>
                  </div>
                </div>
                <div className="prox-item">
                  <Clock size={18} />
                  <div>
                    <b>Open All 7 Days</b>
                    <small>10:00 AM – 9:00 PM</small>
                  </div>
                </div>
                <div className="prox-item">
                  <Phone size={18} />
                  <div>
                    <b>+91 95557 90429</b>
                    <small>Workshop & Customer Support</small>
                  </div>
                </div>
              </div>

              <div className="local-store-actions">
                <a
                  href="https://maps.google.com/?q=Jagat+Farm+Greater+Noida"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <Navigation size={16} /> Get Directions on Google Maps
                </a>
                <a
                  href="https://wa.me/919555790429?text=Namaste%20Riti%20Handlooms!%20I%20am%20visiting%20your%20store%20in%20Jagat%20Farm."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn secondary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <WhatsApp size={16} /> WhatsApp Store Location
                </a>
              </div>
            </div>

            <div className="local-store-map-preview">
              <div className="map-badge">
                <b>RITI HANDLOOMS</b>
                <span>Jagat Farm, Greater Noida</span>
                <div className="landmark-pills">
                  <span>Knowledge Park 2 (2.4 km)</span>
                  <span>Pari Chowk (1.8 km)</span>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&h=700&q=80"
                alt="Riti Handlooms Workshop in Jagat Farm Greater Noida"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="instagram">
        <div className="container">
          <div className="instagram-head">
            <h2><Instagram /> @ritihandloom</h2>
            <a className="btn secondary" href="https://instagram.com/ritihandloom" target="_blank" rel="noopener noreferrer">
              Follow
            </a>
          </div>
          <div className="insta-grid">
            {[...products.slice(0, 6)].map(p => (
              <a href="https://instagram.com/ritihandloom" target="_blank" rel="noopener noreferrer" key={p.id}>
                <img src={p.image} alt="Riti Handloom on Instagram" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter">
        <div>
          <small>JOIN OUR COMMUNITY</small>
          <h2>Stories, new arrivals & special updates</h2>
          <form onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Your email address" required />
            <button className="btn primary">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  )
}
