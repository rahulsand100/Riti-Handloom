import { Link } from 'react-router-dom'
import { ProductCard } from '../components/product/ProductCard.jsx'
import { SEO } from '../components/common/SEO.jsx'
import { useSanityCatalog } from '../context/useSanityCatalog.js'
import { getCanonicalUrl } from '../lib/config.js'
import { getWhatsAppUrl } from '../lib/whatsapp.js'
import { MessageCircle as WhatsApp, ShoppingBag } from 'lucide-react'

export function WishlistPage({ wishlist, setWishlist, onAdd }) {
  const { products, siteSettings } = useSanityCatalog()
  const wishlistProducts = products.filter(p => wishlist.includes(p.id))

  const waWishlistUrl = getWhatsAppUrl(
    `Namaste Riti Handlooms! Here are the items from my wishlist that I would like to enquire about:\n\n` +
    wishlistProducts.map((p, i) => `${i + 1}. ${p.title} (${p.category} · ALL SIZE)`).join('\n') +
    `\n\nPlease share availability and estimated delivery dates.`,
    siteSettings?.primaryWhatsAppNumber
  )

  const handleAddAllToCart = () => {
    wishlistProducts.forEach(p => onAdd(p))
  }

  return (
    <main className="shop-page">
      <SEO
        title="My Wishlist | Riti Handlooms Jagat Farm Greater Noida"
        description="Your saved handloom favourites at Riti Handlooms, Greater Noida. Move items to your enquiry bag or enquire directly on WhatsApp."
        url={getCanonicalUrl('/wishlist')}
        noindex
      />
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <b>My Wishlist</b>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <h1 style={{ margin: 0, textAlign: 'left' }}>My Wishlist</h1>
            <p style={{ color: 'var(--text-muted)', margin: '6px 0 0', fontSize: '14px' }}>
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'handcrafted item saved' : 'handcrafted items saved'}
            </p>
          </div>
          {wishlistProducts.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button className="btn secondary" onClick={handleAddAllToCart} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingBag size={15} /> Move All to Enquiry Bag
              </button>
              <a
                className="btn primary"
                href={waWishlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25D366' }}
              >
                <WhatsApp size={16} /> Enquire on WhatsApp
              </a>
            </div>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="category-empty">
            <h2>Your wishlist is empty</h2>
            <p>Save items you love and revisit them anytime to enquire on WhatsApp.</p>
            <Link className="btn primary" to="/shop">Explore Collection</Link>
          </div>
        ) : (
          <div className="shop-grid cols-4">
            {wishlistProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onAdd={onAdd}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
