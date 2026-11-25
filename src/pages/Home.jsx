import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ArrowLeft, Camera as Instagram,
  BadgeCheck, ShieldCheck, Truck, RefreshCcw, MessageCircle as WhatsApp
} from 'lucide-react'
import { SectionTitle } from '../components/common/SectionTitle.jsx'
import { ProductCard } from '../components/product/ProductCard.jsx'
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
