import { Link, useNavigate } from 'react-router-dom'
import { Heart, Eye } from 'lucide-react'

export function ProductCard({ product, onAdd, wishlist, setWishlist }) {
  const navigate = useNavigate()
  const liked = wishlist.includes(product.id)
  const productHref = `/product/${encodeURIComponent(product.slug || product.id)}`

  const toggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlist(liked ? wishlist.filter(id => id !== product.id) : [...wishlist, product.id])
  }

  return (
    <article className="product-card">
      <div className="product-image">
        <Link to={productHref}>
          <img
            className="main-img"
            src={product.image}
            srcSet={product.imageSrcSet || undefined}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            width="800"
            height="1000"
            alt={product.imageAlt || product.title}
            loading="lazy"
            decoding="async"
          />
          {product.hover && (
            <img className="hover-img" src={product.hover} width="800" height="1000" alt="" loading="lazy" />
          )}
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
            onClick={() => navigate(productHref)}
          >
            <Eye />
          </button>
        </div>
      </div>
      <div className="product-info">
        <Link to={productHref}>{product.title}</Link>
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
