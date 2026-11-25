import { Link } from 'react-router-dom'
import { ProductCard } from '../components/product/ProductCard.jsx'
import { products } from '../data/mockData.js'

export function WishlistPage({ wishlist, setWishlist, onAdd }) {
  const wishlistProducts = products.filter(p => wishlist.includes(p.id))

  return (
    <main className="shop-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <b>Wishlist</b>
        </div>
        <h1>My Wishlist</h1>
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
