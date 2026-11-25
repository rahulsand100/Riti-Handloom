import { Link } from 'react-router-dom'
import { Phone, Mail, MessageCircle as WhatsApp, Camera as Instagram } from 'lucide-react'
import { useSanityCatalog } from '../../context/useSanityCatalog.js'
import { categories as fallbackCategories } from '../../data/mockData.js'

export function Footer() {
  const { categories, siteSettings } = useSanityCatalog()
  const displayCategories = categories && categories.length > 0 ? categories : fallbackCategories

  const primaryPhone = siteSettings?.primaryWhatsAppNumber || '919555790429'
  const displayPhone = siteSettings?.secondaryPhoneNumber || '+91 95557 90429'
  const storeAddress = siteSettings?.storeAddress || 'Jagat Farm Commercial Complex, Near Knowledge Park 2 & Pari Chowk, Greater Noida, UP 201308'

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
          <h3>HOME COLLECTIONS</h3>
          {displayCategories.slice(4).map(category => (
            <Link key={category.slug} to={`/category/${category.slug}`}>
              {category.name}
            </Link>
          ))}
        </div>
        <div>
          <h3>GET IN TOUCH</h3>
          <a href={`tel:${displayPhone.replace(/\s+/g, '')}`} className="footer-contact-link">
            <Phone size={15} /> {displayPhone}
          </a>
          <a href="mailto:hello@ritihandloom.in" className="footer-contact-link">
            <Mail size={15} /> hello@ritihandloom.in
          </a>
          <a
            href={`https://wa.me/${primaryPhone}?text=Namaste%20Riti%20Handlooms!%20I%20have%20an%20enquiry.`}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-contact-link"
          >
            <WhatsApp size={15} /> Chat on WhatsApp
          </a>
          <a
            href="https://instagram.com/ritihandloom"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-contact-link"
          >
            <Instagram size={15} /> Instagram
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Riti Handlooms</span>
        <span>Store in Jagat Farm, Greater Noida (near Knowledge Park 2 & Pari Chowk) · Direct WhatsApp Enquiries</span>
      </div>
    </footer>
  )
}
