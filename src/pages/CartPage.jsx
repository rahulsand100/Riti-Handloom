import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Trash2, Plus, Minus, MessageCircle as WhatsApp, MapPin } from 'lucide-react'
import { buildMultiItemEnquiryUrl } from '../lib/whatsapp.js'

export function CartPage({ cart, updateQuantity, removeFromCart, getItemKey, clearCart }) {
  const navigate = useNavigate()
  const [deliveryLocation, setDeliveryLocation] = useState('')

  const waEnquiryUrl = buildMultiItemEnquiryUrl(cart, {
    deliveryLocation: deliveryLocation.trim()
  })

  return (
    <main className="cart-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <b>Enquiry Bag</b>
        </div>
        <h1>Enquiry Bag</h1>

        {cart.length === 0 ? (
          <div className="empty-cart page-empty">
            <ShoppingBag />
            <p>Your enquiry bag is currently empty.</p>
            <Link className="btn primary" to="/shop">Explore Collection</Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-table">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Selected Items ({cart.length})
                </span>
                <button
                  onClick={clearCart}
                  style={{ background: 'none', border: 'none', color: 'var(--sale)', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Clear Bag
                </button>
              </div>

              {cart.map(item => {
                const key = getItemKey ? getItemKey(item) : `${item.id}-ALL_SIZE`
                return (
                  <div
                    className="cart-table-row"
                    key={key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '18px 0',
                      borderBottom: '1px solid var(--border)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: '74px', height: '94px', objectFit: 'cover', borderRadius: '3px' }}
                      />
                      <div>
                        <b style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '15px', color: 'var(--primary)' }}>
                          {item.title}
                        </b>
                        <small style={{ display: 'block', color: 'var(--text-muted)', marginTop: '4px' }}>
                          {item.category} · <span className="all-size-tag" style={{ margin: '0 0 0 4px', fontSize: '10px' }}>ALL SIZE</span>
                        </small>
                        <div className="enquiry-qty-row" style={{ marginTop: '8px' }}>
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
                    </div>
                    <button
                      onClick={() => removeFromCart(key)}
                      aria-label="Remove item"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )
              })}
            </div>

            <aside
              className="order-summary"
              style={{ padding: '26px', background: 'var(--bg-soft)', borderRadius: '4px', border: '1px solid var(--border)' }}
            >
              <h3>Enquiry Summary</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                You have selected <b>{cart.length}</b> {cart.length === 1 ? 'item' : 'items'} for enquiry. All items are available in ALL SIZE.
              </p>

              <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--primary)', marginBottom: '6px' }}>
                  <MapPin size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                  Delivery City or Pincode (Optional):
                </label>
                <input
                  type="text"
                  placeholder="e.g. Greater Noida, 201310"
                  value={deliveryLocation}
                  onChange={e => setDeliveryLocation(e.target.value)}
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '0 12px',
                    border: '1px solid var(--border)',
                    borderRadius: '3px',
                    fontSize: '13px',
                    background: 'white'
                  }}
                />
              </div>

              <hr style={{ margin: '16px 0', borderColor: 'var(--border)' }} />

              <a
                className="btn primary full"
                href={waEnquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#25D366'
                }}
              >
                <WhatsApp size={18} /> Send Enquiry on WhatsApp
              </a>

              <button
                className="btn secondary full"
                style={{ marginTop: '10px' }}
                onClick={() => navigate('/shop')}
              >
                Continue Browsing
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
