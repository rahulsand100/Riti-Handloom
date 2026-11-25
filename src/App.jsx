import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MessageCircle as WhatsApp } from 'lucide-react'
import './App.css'

import { Header } from './components/layout/Header.jsx'
import { Footer } from './components/layout/Footer.jsx'
import { MobileToolbar } from './components/layout/MobileToolbar.jsx'
import { MiniCart } from './components/cart/MiniCart.jsx'

import { Home } from './pages/Home.jsx'
import { Shop } from './pages/Shop.jsx'
import { CategoryPage } from './pages/CategoryPage.jsx'
import { ProductPage } from './pages/ProductPage.jsx'
import { CartPage } from './pages/CartPage.jsx'
import { WishlistPage } from './pages/WishlistPage.jsx'
import { StaticPage } from './pages/StaticPage.jsx'

export function App() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('riti-cart') || '[]'))
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('riti-wishlist') || '[]'))
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('riti-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('riti-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(p => p.id === product.id)
      return found ? prev : [...prev, product]
    })
    setCartOpen(true)
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Header
          cartCount={cart.length}
          onCart={() => setCartOpen(true)}
          wishlistCount={wishlist.length}
        />
        <Routes>
          <Route path="/" element={<Home onAdd={addToCart} wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="/shop" element={<Shop onAdd={addToCart} wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="/category/:categorySlug" element={<CategoryPage onAdd={addToCart} wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="/product/:id" element={<ProductPage onAdd={addToCart} wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
          <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} setWishlist={setWishlist} onAdd={addToCart} />} />
          <Route path="/about" element={<StaticPage title="About the Brand" />} />
          <Route path="/page/:title" element={<StaticPage title="Shipping & Policies" />} />
        </Routes>
        <Footer />
        <MiniCart
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          cart={cart}
          setCart={setCart}
        />
        <a
          className="floating-whatsapp"
          href="https://wa.me/919555790429?text=Namaste%20Riti%20Handlooms!%20I%20have%20an%20enquiry."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <WhatsApp />
        </a>
        <MobileToolbar
          onCart={() => setCartOpen(true)}
          onSearch={() => {
            const searchBtn = document.querySelector('.header-actions .icon-btn')
            if (searchBtn) searchBtn.click()
          }}
        />
      </div>
    </BrowserRouter>
  )
}

export default App
