import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import { SanityCatalogProvider } from './context/SanityCatalogContext.jsx'
import { EnquiryBagProvider } from './context/EnquiryBagContext.jsx'
import { useEnquiryBag } from './context/useEnquiryBag.js'
import { Header } from './components/layout/Header.jsx'
import { Footer } from './components/layout/Footer.jsx'
import { MobileToolbar } from './components/layout/MobileToolbar.jsx'
import { MiniCart } from './components/cart/MiniCart.jsx'
import { FloatingWhatsApp } from './components/whatsapp/FloatingWhatsApp.jsx'
import { BulkEnquiryModal } from './components/whatsapp/BulkEnquiryModal.jsx'
import { Toast } from './components/common/Toast.jsx'

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

  const [bulkModalOpen, setBulkModalOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const handleAddToCartWithToast = (product, selectedSize = 'ALL SIZE', quantity = 1) => {
    addToCart(product, selectedSize, quantity)
    const size = product.selectedSize || selectedSize || 'ALL SIZE'
    setToast({
      message: `Added to Enquiry Bag (${size})`,
      actionLabel: 'View Bag'
    })
  }

  return (
    <div className="app">
      <Header
        cartCount={totalQuantity}
        onCart={openCart}
        wishlistCount={wishlist.length}
        onOpenBulkModal={() => setBulkModalOpen(true)}
      />
      <Routes>
        <Route path="/" element={<Home onAdd={handleAddToCartWithToast} wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/shop" element={<Shop onAdd={handleAddToCartWithToast} wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/category/:categorySlug" element={<CategoryPage onAdd={handleAddToCartWithToast} wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/product/:id" element={<ProductPage onAdd={handleAddToCartWithToast} wishlist={wishlist} setWishlist={setWishlist} />} />
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
        <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} setWishlist={setWishlist} onAdd={handleAddToCartWithToast} />} />
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

      <FloatingWhatsApp onOpenBulkModal={() => setBulkModalOpen(true)} />

      <BulkEnquiryModal
        open={bulkModalOpen}
        onClose={() => setBulkModalOpen(false)}
      />

      {toast && (
        <Toast
          message={toast.message}
          actionLabel={toast.actionLabel}
          onAction={() => {
            setToast(null)
            openCart()
          }}
          onClose={() => setToast(null)}
        />
      )}

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
      <SanityCatalogProvider>
        <EnquiryBagProvider>
          <AppContent />
        </EnquiryBagProvider>
      </SanityCatalogProvider>
    </BrowserRouter>
  )
}

export default App
