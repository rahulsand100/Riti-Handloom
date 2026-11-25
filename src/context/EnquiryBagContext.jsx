import { useEffect, useState, useMemo } from 'react'
import { EnquiryBagContext } from './EnquiryBagContext.js'

export function EnquiryBagProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('riti-cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('riti-wishlist')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem('riti-cart', JSON.stringify(cart))
    } catch (err) {
      console.error('Failed to save enquiry bag to localStorage:', err)
    }
  }, [cart])

  useEffect(() => {
    try {
      localStorage.setItem('riti-wishlist', JSON.stringify(wishlist))
    } catch (err) {
      console.error('Failed to save wishlist to localStorage:', err)
    }
  }, [wishlist])

  const getItemKey = (item) => `${item.id}-${item.selectedSize || 'ALL SIZE'}`

  const addToCart = (product, selectedSize = 'ALL SIZE', quantity = 1) => {
    const size = product.selectedSize || selectedSize || 'ALL SIZE'
    setCart(prev => {
      const key = `${product.id}-${size}`
      const existing = prev.find(item => getItemKey(item) === key)
      if (existing) {
        return prev.map(item =>
          getItemKey(item) === key
            ? { ...item, quantity: (item.quantity || 1) + quantity }
            : item
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          image: product.image,
          category: product.category,
          selectedSize: size,
          quantity: quantity
        }
      ]
    })
    setCartOpen(true)
  }

  const removeFromCart = (itemKeyOrId) => {
    setCart(prev => prev.filter(item => {
      const key = getItemKey(item)
      return key !== itemKeyOrId && item.id !== itemKeyOrId
    }))
  }

  const updateQuantity = (itemKey, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemKey)
      return
    }
    setCart(prev =>
      prev.map(item =>
        getItemKey(item) === itemKey ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const clearCart = () => setCart([])

  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    )
  }

  const isInWishlist = (productId) => wishlist.includes(productId)

  const totalQuantity = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0)
  }, [cart])

  const value = {
    cart,
    setCart,
    cartOpen,
    setCartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemKey,
    totalQuantity,
    wishlist,
    setWishlist,
    toggleWishlist,
    isInWishlist
  }

  return (
    <EnquiryBagContext.Provider value={value}>
      {children}
    </EnquiryBagContext.Provider>
  )
}
