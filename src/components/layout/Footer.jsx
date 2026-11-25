import { Link } from 'react-router-dom'
import { Camera as Instagram } from 'lucide-react'
import { categories } from '../../data/mockData.js'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            RITI <small>HANDLOOM</small>
          </div>
          <p>Woven with tradition, made for your home.</p>
        </div>
        <div>
          <h3>ONLINE CATALOGUE</h3>
          {categories.slice(0, 4).map(category => (
            <Link key={category.slug} to={`/category/${category.slug}`}>
              {category.name}
            </Link>
          ))}
        </div>
        <div>
          <h3>HOME COLLECTIONS</h3>
          {categories.slice(4).map(category => (
            <Link key={category.slug} to={`/category/${category.slug}`}>
              {category.name}
            </Link>
          ))}
        </div>
        <div>
          <h3>GET IN TOUCH</h3>
          <a href="tel:+919555790429">Call Us: +91 95557 90429</a>
          <a href="mailto:hello@ritihandloom.in">hello@ritihandloom.in</a>
          <a href="https://wa.me/919555790429?text=Namaste%20Riti%20Handlooms!%20I%20have%20an%20enquiry.">
            Chat on WhatsApp
          </a>
          <div className="socials">
            <Instagram />
            <a href="https://instagram.com/ritihandloom" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Riti Handloom</span>
        <span>Handcrafted with tradition in Greater Noida · Direct WhatsApp Enquiries</span>
      </div>
    </footer>
  )
}
