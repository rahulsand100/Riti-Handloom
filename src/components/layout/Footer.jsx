import { Link } from 'react-router-dom'
import { Phone, Mail, MessageCircle as WhatsApp, Camera as Instagram } from 'lucide-react'
import { useSanityCatalog } from '../../context/useSanityCatalog.js'
import { siteConfig } from '../../lib/config.js'
import { getWhatsAppUrl } from '../../lib/whatsapp.js'

export function Footer() {
  const { categories, siteSettings } = useSanityCatalog()
  const displayCategories = categories || []

  const primaryPhone = siteSettings?.primaryWhatsAppNumber || siteConfig.whatsappNumber
  const displayPhone = siteSettings?.secondaryPhoneNumber || siteConfig.contactPhone
  const storeAddress = siteSettings?.storeAddress || siteConfig.storeAddress

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="footer-brand">
            <span>RITI</span>
            <small>HANDLOOM</small>
          </Link>
          <p>Woven with tradition, made for your home.</p>
          <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '10px', lineHeight: '1.6' }}>
            <b>Visit Store:</b><br />
            {storeAddress}
          </p>
        </div>
        <div>
          <h3>ONLINE CATALOGUE</h3>
          {displayCategories.slice(0, 4).map(category => (
            <Link key={category.slug} to={`/category/${category.slug}`}>
              {category.name}
            </Link>
          ))}
        </div>
        <div>
          <h3>{displayCategories.length > 4 ? 'HOME COLLECTIONS' : 'QUICK LINKS'}</h3>
          {displayCategories.length > 4 ? (
            displayCategories.slice(4).map(category => (
              <Link key={category.slug} to={`/category/${category.slug}`}>
                {category.name}
              </Link>
            ))
          ) : (
            <>
              <Link to="/shop">All Collections</Link>
              <Link to="/about">About the Brand</Link>
              <Link to="/cart">Enquiry Bag</Link>
              <Link to="/wishlist">My Wishlist</Link>
            </>
          )}
          <Link to="/support">Help &amp; Support</Link>
        </div>
        <div>
          <h3>GET IN TOUCH</h3>
          <a href={`tel:${displayPhone.replace(/\s+/g, '')}`} className="footer-contact-link">
            <Phone size={15} /> {displayPhone}
          </a>
          <a href={`mailto:${siteConfig.contactEmail}`} className="footer-contact-link">
            <Mail size={15} /> {siteConfig.contactEmail}
          </a>
          <a
            href={getWhatsAppUrl('Namaste Riti Handlooms! I have an enquiry.', primaryPhone)}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-contact-link"
          >
            <WhatsApp size={15} /> Chat on WhatsApp
          </a>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-contact-link"
          >
            <Instagram size={15} /> Instagram
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Riti Handloom</span>
        <span>Shop No. 14, GM Mall, Gamma 1, Jagat Farm, Greater Noida · Direct WhatsApp Enquiries</span>
      </div>
    </footer>
  )
}
