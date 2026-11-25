import { Link, useNavigate } from 'react-router-dom'
import { Heart, Eye } from 'lucide-react'

export function ProductCard({ product, onAdd, wishlist, setWishlist }) {
  const navigate = useNavigate()
  const liked = wishlist.includes(product.id)

  const toggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlist(liked ? wishlist.filter(id => id !== product.id) : [...wishlist, product.id])
  }

  return (
    <article className="product-card">
      <div className="product-image">
        <Link to={`/product/${product.id}`}>
          <img className="main-img" src={product.image} alt={product.title} />
          <img className="hover-img" src={product.hover} alt="" />
        </Link>
        {product.badge && (
          <div className={`badge ${product.badge === 'Sold out' ? 'soldout' : 'new'}`}>
            {product.badge}
          </div>
        )}
        <div className="card-actions">
          <button
            className={liked ? 'liked' : ''}
            onClick={toggleWishlist}
            aria-label="Wishlist"
          >
            <Heart />
          </button>
          <button
            aria-label="Quick view"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <Eye />
          </button>
        </div>
      </div>
      <div className="product-info">
        <Link to={`/product/${product.id}`}>{product.title}</Link>
        <div>
          <span className="all-size-tag">ALL SIZE</span>
        </div>
        <button className="card-add" onClick={() => onAdd(product)}>
          Add to Enquiry
        </button>
      </div>
    </article>
  )
}
