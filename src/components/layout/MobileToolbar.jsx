import { Link } from 'react-router-dom'
import { Grid2X2, Search, Heart, ShoppingBag, MessageCircle as WhatsApp } from 'lucide-react'
import { useSanityCatalog } from '../../context/useSanityCatalog.js'
import { getWhatsAppUrl } from '../../lib/whatsapp.js'

export function MobileToolbar({ onCart, onSearch }) {
  const { siteSettings } = useSanityCatalog()
  const waUrl = getWhatsAppUrl(
    'Namaste Riti Handlooms! I have an enquiry.',
    siteSettings?.primaryWhatsAppNumber
  )

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
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsApp />
        <span>WhatsApp</span>
      </a>
    </nav>
  )
}
