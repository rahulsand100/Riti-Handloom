import { Link } from 'react-router-dom'
import { ShoppingBag, Trash2, X, MessageCircle as WhatsApp } from 'lucide-react'

export function MiniCart({ open, onClose, cart, setCart }) {
  if (!open) return null

  const waEnquiry = encodeURIComponent(
    `Namaste Riti Handlooms! Please quote price and availability for these items from my enquiry bag:\n\n` +
    cart.map((item, i) => `${i + 1}. ${item.title} (Size: ALL SIZE)`).join('\n') +
    `\n\nPlease share details and availability.`
  )

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
              {cart.map(item => (
                <div className="cart-line" key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <b>{item.title}</b>
                    <small>{item.category} · ALL SIZE</small>
                  </div>
                  <button
                    className="remove"
                    onClick={() => setCart(cart.filter(x => x.id !== item.id))}
                    aria-label="Remove item"
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-foot">
              <a
                href={`https://wa.me/919555790429?text=${waEnquiry}`}
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
                <WhatsApp size={16} /> Enquire on WhatsApp
              </a>
              <Link to="/cart" onClick={onClose} className="btn secondary full">
                View Enquiry Bag
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
