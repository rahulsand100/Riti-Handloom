import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronDown, Heart, Search, ShoppingBag, Menu, X, Phone
} from 'lucide-react'
import { categories, categoryPath, products } from '../../data/mockData.js'

export function Header({ cartCount, onCart, wishlistCount, onSearchOpen }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')

  const handleOpenSearch = () => {
    if (onSearchOpen) {
      onSearchOpen()
    } else {
      setSearchOpen(true)
    }
  }

  const suggestions = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Handcrafted Handloom & Home Linen · Greater Noida · Wholesale & Retail Enquiries</span>
          <div>
            <a href="tel:+919555790429"><Phone size={13} /> +91 95557 90429</a>
            <a href="https://wa.me/919555790429?text=Namaste%20Riti%20Handlooms!%20I%20have%20an%20enquiry.">WhatsApp</a>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="container header-inner">
          <button className="icon-btn mobile-only" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu />
          </button>
          <Link to="/" className="brand">
            <span>RITI</span>
            <small>HANDLOOM</small>
          </Link>
          <nav className="main-nav" aria-label="Main navigation">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <div className="nav-drop">
              <button>Our Collection <ChevronDown size={13} /></button>
              <div className="mega-menu">
                {[
                  ['Bed Linen', 'Bedsheets', 'Blankets', 'Dohars', 'Bed Sets'],
                  ['Soft Furnishing', 'Pillows', 'Pillow Covers'],
                  ['Floor & Bath', 'Carpets', 'Bath Towels']
                ].map(col => (
                  <div key={col[0]}>
                    <b>{col[0]}</b>
                    {col.slice(1).map(link => (
                      <Link key={link} to={categoryPath(link)}>{link}</Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <Link to="/shop">New Arrivals</Link>
            <Link to={categoryPath('Bedsheets')}>Bed Linen</Link>
            <Link to={categoryPath('Pillow Covers')}>Soft Furnishing</Link>
            <Link to="/shop">Collection</Link>
          </nav>
          <div className="header-actions">
            <button className="icon-btn" onClick={handleOpenSearch} aria-label="Search">
              <Search />
            </button>
            <Link className="icon-btn desktop-only" to="/wishlist" aria-label="Wishlist">
              <Heart />
              {wishlistCount > 0 && <em>{wishlistCount}</em>}
            </Link>
            <button className="cart-trigger" onClick={onCart} aria-label="Open enquiry bag">
              <ShoppingBag />
              <span>
                <small>{cartCount} {cartCount === 1 ? 'item' : 'items'}</small>
                <b>Enquiry Bag</b>
              </span>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="overlay" onMouseDown={() => setMenuOpen(false)}>
          <aside className="mobile-drawer" onMouseDown={e => e.stopPropagation()}>
            <div className="drawer-head">
              <b>MENU</b>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X />
              </button>
            </div>
            {[
              'Bedsheets', 'Pillows', 'Pillow Covers', 'Blankets',
              'Dohars', 'Carpets', 'Towels', 'Bed Sets'
            ].map(item => (
              <Link key={item} to={categoryPath(item)} onClick={() => setMenuOpen(false)}>
                {item}
                <ChevronDown size={16} />
              </Link>
            ))}
            <Link to="/about" onClick={() => setMenuOpen(false)}>About the Brand</Link>
            <div className="drawer-bottom">
              <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
                <Heart size={17} /> Wishlist
              </Link>
              <a
                href="https://wa.me/919555790429?text=Namaste%20Riti%20Handlooms!%20I%20have%20an%20enquiry."
                target="_blank"
                rel="noopener noreferrer"
              >
                Customer Assistance (WhatsApp)
              </a>
            </div>
          </aside>
        </div>
      )}

      {searchOpen && (
        <div className="search-overlay">
          <div className="container">
            <div className="search-head">
              <b>Search our catalogue</b>
              <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                <X />
              </button>
            </div>
            <div className="search-row">
              <select aria-label="Category">
                <option>All categories</option>
                {categories.map(category => (
                  <option key={category.slug}>{category.name}</option>
                ))}
              </select>
              <input
                autoFocus
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="What are you looking for?"
              />
            </div>
            {search && (
              <div className="suggestions">
                {suggestions.slice(0, 5).map(p => (
                  <Link key={p.id} to={`/product/${p.id}`} onClick={() => setSearchOpen(false)}>
                    <img src={p.image} alt="" />
                    <div>
                      <b>{p.title}</b>
                      <span className="all-size-tag">ALL SIZE</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
