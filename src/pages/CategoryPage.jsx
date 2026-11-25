import { useParams } from 'react-router-dom'
import { Shop } from './Shop.jsx'

export function CategoryPage({ onAdd, wishlist, setWishlist }) {
  const { categorySlug } = useParams()
  return (
    <Shop
      categorySlug={categorySlug}
      onAdd={onAdd}
      wishlist={wishlist}
      setWishlist={setWishlist}
    />
  )
}
