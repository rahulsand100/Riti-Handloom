import { Link } from 'react-router-dom'
import { ShoppingBag, Trash2, X, Plus, Minus, MessageCircle as WhatsApp } from 'lucide-react'
import { buildMultiItemEnquiryUrl } from '../../lib/whatsapp.js'

export function MiniCart({ open, onClose, cart, updateQuantity, removeFromCart, getItemKey }) {
  if (!open) return null

  const waEnquiryUrl = buildMultiItemEnquiryUrl(cart)

  return (
    <div className="overlay" onMouseDown={onClose}>
      <aside className="cart-drawer" onMouseDown={e => e.stopPropagation()}>
        <div className="drawer-head">
          <b>Your Enquiry Bag</b>
          <button onClick={onClose} aria-label="Close enquiry bag">
            <X />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag />
            <p>Your enquiry bag is empty</p>
            <button className="btn primary" onClick={onClose}>
              Explore Collection
            </button>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {cart.map(item => {
                const key = getItemKey ? getItemKey(item) : `${item.id}-${item.selectedSize}`
                return (
                  <div className="cart-line" key={key}>
                    <img src={item.image} alt={item.title} />
                    <div>
                      <b>{item.title}</b>
                      <small>{item.category} · {item.selectedSize || 'ALL SIZE'}</small>
                      <div className="enquiry-qty-row">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQuantity(key, (item.quantity || 1) - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span>{item.quantity || 1}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQuantity(key, (item.quantity || 1) + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <button
                      className="remove"
                      onClick={() => removeFromCart(key)}
                      aria-label="Remove item"
                    >
                      <Trash2 />
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="cart-foot">
              <a
                href={waEnquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn primary full"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#25D366'
                }}
              >
                <WhatsApp size={16} /> Send Enquiry on WhatsApp
              </a>
              <Link to="/cart" onClick={onClose} className="btn secondary full">
                View Full Enquiry Bag
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
