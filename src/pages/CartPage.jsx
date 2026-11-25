import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Trash2, MessageCircle as WhatsApp } from 'lucide-react'

export function CartPage({ cart, setCart }) {
  const navigate = useNavigate()
  const waEnquiry = encodeURIComponent(
    `Namaste Riti Handlooms! Please quote price and availability for these items from my enquiry bag:\n\n` +
    cart.map((item, i) => `${i + 1}. ${item.title} (Size: ALL SIZE)`).join('\n') +
    `\n\nPlease share details and availability.`
  )

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
              {cart.map(item => (
                <div
                  className="cart-table-row"
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 0',
                    borderBottom: '1px solid var(--border)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '70px', height: '88px', objectFit: 'cover' }}
                    />
                    <div>
                      <b>{item.title}</b>
                      <small style={{ display: 'block', color: 'var(--text-muted)' }}>
                        {item.category} · ALL SIZE
                      </small>
                    </div>
                  </div>
                  <button
                    onClick={() => setCart(cart.filter(x => x.id !== item.id))}
                    aria-label="Remove item"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            <aside
              className="order-summary"
              style={{ padding: '24px', background: 'var(--bg-soft)', borderRadius: '4px' }}
            >
              <h3>Enquiry Summary</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                You have selected <b>{cart.length}</b> {cart.length === 1 ? 'item' : 'items'} (ALL SIZE). Tap below to send your complete quotation request directly to our team on WhatsApp.
              </p>
              <hr style={{ margin: '16px 0', borderColor: 'var(--border)' }} />
              <a
                className="btn primary full"
                href={`https://wa.me/919555790429?text=${waEnquiry}`}
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
