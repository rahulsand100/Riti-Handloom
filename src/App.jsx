import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MessageCircle as WhatsApp } from 'lucide-react'
import './App.css'

import { EnquiryBagProvider } from './context/EnquiryBagContext.jsx'
import { useEnquiryBag } from './context/useEnquiryBag.js'
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

function AppContent() {
  const {
    cart,
    totalQuantity,
    cartOpen,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemKey,
    wishlist,
    setWishlist
  } = useEnquiryBag()

  return (
    <div className="app">
      <Header
        cartCount={totalQuantity}
        onCart={openCart}
        wishlistCount={wishlist.length}
      />
      <Routes>
        <Route path="/" element={<Home onAdd={addToCart} wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/shop" element={<Shop onAdd={addToCart} wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/category/:categorySlug" element={<CategoryPage onAdd={addToCart} wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/product/:id" element={<ProductPage onAdd={addToCart} wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              getItemKey={getItemKey}
              clearCart={clearCart}
            />
          }
        />
        <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} setWishlist={setWishlist} onAdd={addToCart} />} />
        <Route path="/about" element={<StaticPage title="About the Brand" />} />
        <Route path="/page/:title" element={<StaticPage title="Shipping & Policies" />} />
      </Routes>
      <Footer />
      <MiniCart
        open={cartOpen}
        onClose={closeCart}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        getItemKey={getItemKey}
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
        onCart={openCart}
        onSearch={() => {
          const searchBtn = document.querySelector('.header-actions .icon-btn')
          if (searchBtn) searchBtn.click()
        }}
      />
    </div>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <EnquiryBagProvider>
        <AppContent />
      </EnquiryBagProvider>
    </BrowserRouter>
  )
}

export default App
