import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SlidersHorizontal, Grid2X2, Grid3X3, ChevronDown, X } from 'lucide-react'
import { ProductCard } from '../components/product/ProductCard.jsx'
import { categories, products } from '../data/mockData.js'

export function Shop({ onAdd, wishlist, setWishlist, categorySlug }) {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sort, setSort] = useState('latest')
  const [columns, setColumns] = useState(4)

  const category = categories.find(item => item.slug === categorySlug)
  const collection = categorySlug
    ? products.filter(product => product.category.toLowerCase() === category?.name.toLowerCase())
    : products

  const sorted = [...collection].sort((a, b) =>
    sort === 'az' ? a.title.localeCompare(b.title) : a.id - b.id
  )

  const filterGroups = {
    Category: ['Bedsheets', 'Pillows', 'Pillow Covers', 'Blankets', 'Dohars', 'Carpets', 'Towels'],
    Fabric: ['100% Cotton', 'Cotton Blend', 'Linen', 'Handloom Weave'],
  }

  return (
    <main className="shop-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / {category ? (
            <><Link to="/shop">Our Collection</Link> / <b>{category.name}</b></>
          ) : (
            <b>Our Collection</b>
          )}
        </div>

        {category && (
          <section className="category-hero">
            <img src={category.image} alt="" />
            <div>
              <small>RITI HANDLOOM COLLECTION</small>
              <h1>{category.name}</h1>
              <p>{category.description}</p>
            </div>
          </section>
        )}

        {!category && <h1>Our Collection</h1>}

        <div className="shop-toolbar">
          <button className="filter-btn" onClick={() => setFiltersOpen(true)}>
            <SlidersHorizontal /> Filter
          </button>
          <span>{sorted.length} products</span>
          <div>
            <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort products">
              <option value="latest">Latest</option>
              <option value="az">Name A to Z</option>
            </select>
            <button
              className={columns === 3 ? 'active' : ''}
              onClick={() => setColumns(3)}
              aria-label="3 column layout"
            >
              <Grid3X3 />
            </button>
            <button
              className={columns === 4 ? 'active' : ''}
              onClick={() => setColumns(4)}
              aria-label="4 column layout"
            >
              <Grid2X2 />
            </button>
          </div>
        </div>

        <div className="shop-layout">
          <aside className={filtersOpen ? 'shop-sidebar open' : 'shop-sidebar'}>
            <div className="filter-mobile-head">
              <b>Categories</b>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                <X />
              </button>
            </div>
            <details open>
              <summary>Categories<ChevronDown /></summary>
              <div className="category-filter-links">
                {categories.map(item => (
                  <Link
                    className={item.slug === categorySlug ? 'active' : ''}
                    key={item.slug}
                    to={`/category/${item.slug}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </details>
            {Object.entries(filterGroups).map(([title, values]) => (
              <details key={title}>
                <summary>{title}<ChevronDown /></summary>
                <div>
                  {values.map(value => (
                    <label key={value}>
                      <input type="checkbox" /> {value}
                    </label>
                  ))}
                </div>
              </details>
            ))}
          </aside>
          {filtersOpen && (
            <div className="filter-backdrop" onClick={() => setFiltersOpen(false)} />
          )}
          {sorted.length ? (
            <div className={`shop-grid cols-${columns}`}>
              {sorted.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAdd={onAdd}
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                />
              ))}
            </div>
          ) : (
            <div className="category-empty">
              <h2>No products in this category yet</h2>
              <p>We’re adding new handloom essentials soon. Browse our other collections in the meantime.</p>
              <Link className="btn primary" to="/shop">Explore all products</Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
