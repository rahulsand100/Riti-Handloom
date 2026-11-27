import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react'
import { SEO } from '../components/common/SEO.jsx'
import { siteConfig, getCanonicalUrl } from '../lib/config.js'

export function StaticPage({ title }) {
  const location = useLocation()
  const isAboutPage = title === 'About the Brand'

  return (
    <main className="static-page">
      <SEO
        title={`${title} | Riti Handloom, Greater Noida`}
        description={isAboutPage
          ? 'Learn about Riti Handloom, a home furnishing store and authorised Kurlon dealer at Shop No. 14, GM Mall, Gamma 1, Jagat Farm, Greater Noida, Uttar Pradesh.'
          : 'Contact Riti Handloom in Jagat Farm, Greater Noida for information about the catalogue and customer support.'}
        url={getCanonicalUrl(location.pathname)}
        noindex={!isAboutPage}
      />
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <b>{title}</b>
        </div>
        <h1>{title}</h1>
        {title === 'About the Brand' ? (
          <div className="about-page">
            <section className="about-intro">
              <div className="about-copy">
                <small>THE RITI HANDLOOM STORY</small>
                <h2>Comfort, character and thoughtful details for your home.</h2>
                <p>
                  We believe the little details make a house feel like yours. Located at Shop No. 14, GM Mall, Gamma 1, Jagat Farm, Greater Noida, Riti Handloom brings together bedsheets, blankets, pillows, pillow covers, curtains, and everyday home textiles—and as an authorised Kurlon dealer, offers Kurlon products for your home.
                </p>
                <p>
                  From soft layers for the bedroom to finishing touches for the living room, explore pieces made to feel at home in your everyday routine.
                </p>
                <Link className="btn primary" to="/shop">Explore our collection</Link>
              </div>
              <div className="about-image-grid">
                <img
                  className="about-image-main"
                  src="/products/blanket-category.jpg"
                  width="600"
                  height="900"
                  alt="Floral blanket displayed in a bedroom"
                  loading="eager"
                />
                <img
                  src="/products/pillow-pair.jpg"
                  width="500"
                  height="400"
                  alt="Pillow pair display"
                  loading="lazy"
                />
                <img
                  src="/products/pillow-cover-set.jpg"
                  width="500"
                  height="400"
                  alt="Pillow cover set display"
                  loading="lazy"
                />
              </div>
            </section>
            <section className="about-values">
              <div className="about-section-heading">
                <small>WHAT MATTERS TO US</small>
                <h2>Made for the feeling of home</h2>
              </div>
              <div className="about-value-grid">
                <article>
                  <span>01</span>
                  <h3>Everyday comfort</h3>
                  <p>Home textiles should feel inviting, practical and easy to enjoy every day.</p>
                </article>
                <article>
                  <span>02</span>
                  <h3>Considered details</h3>
                  <p>Color, texture and finishing touches help bring warmth and personality to a room.</p>
                </article>
                <article>
                  <span>03</span>
                  <h3>Choices for your space</h3>
                  <p>Discover bedroom and home essentials to mix, match and make your own.</p>
                </article>
              </div>
            </section>
            <section className="about-cta">
              <div>
                <small>FIND YOUR NEW FAVORITES</small>
                <h2>A little more comfort, one room at a time.</h2>
              </div>
              <Link className="btn secondary" to="/shop">
                Shop home essentials <ArrowRight size={16} />
              </Link>
            </section>
          </div>
        ) : (
          <div className="policy-content">
            <p>Our team is happy to help with product, bulk order and delivery information.</p>
            <h3>Get in touch</h3>
            <p><Phone size={16} /> {siteConfig.contactPhone}</p>
            <p><Mail size={16} /> {siteConfig.contactEmail}</p>
            <p><MapPin size={16} /> {siteConfig.storeAddress}</p>
          </div>
        )}
      </div>
    </main>
  )
}
