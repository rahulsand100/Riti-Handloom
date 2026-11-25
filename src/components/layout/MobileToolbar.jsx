import { Link } from 'react-router-dom'
import { Grid2X2, Search, Heart, ShoppingBag, MessageCircle as WhatsApp } from 'lucide-react'

export function MobileToolbar({ onCart, onSearch }) {
  return (
    <nav className="mobile-toolbar">
      <Link to="/shop">
        <Grid2X2 />
        <span>Catalogue</span>
      </Link>
      <button onClick={onSearch} aria-label="Search">
        <Search />
        <span>Search</span>
      </button>
      <Link to="/wishlist">
        <Heart />
        <span>Wishlist</span>
      </Link>
      <button onClick={onCart} aria-label="Open enquiry bag">
        <ShoppingBag />
        <span>Enquiry</span>
      </button>
      <a
        href="https://wa.me/919555790429?text=Namaste%20Riti%20Handlooms!%20I%20have%20an%20enquiry."
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsApp />
        <span>WhatsApp</span>
      </a>
    </nav>
  )
}
