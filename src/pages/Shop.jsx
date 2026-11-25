import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { SlidersHorizontal, Grid2X2, Grid3X3, ChevronDown, X, RotateCcw } from 'lucide-react'
import { ProductCard } from '../components/product/ProductCard.jsx'
import { SEO } from '../components/common/SEO.jsx'
import { useSanityCatalog } from '../context/useSanityCatalog.js'

export function Shop({ onAdd, wishlist, setWishlist, categorySlug }) {
  const { products, categories, getCategory } = useSanityCatalog()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sort, setSort] = useState('latest')
  const [columns, setColumns] = useState(4)

  const [selectedFabrics, setSelectedFabrics] = useState([])
  const [inStockOnly, setInStockOnly] = useState(false)

  const category = getCategory(categorySlug)

  const availableFabrics = useMemo(() => {
    const set = new Set(products.map(p => p.fabric).filter(Boolean))
    if (set.size === 0) return ['100% Cotton', 'Handloom Weave', 'Cotton Blend', 'Linen']
    return Array.from(set)
  }, [products])

  const toggleFabric = (fabric) => {
    setSelectedFabrics(prev =>
      prev.includes(fabric) ? prev.filter(f => f !== fabric) : [...prev, fabric]
    )
  }

  const clearAllFilters = () => {
    setSelectedFabrics([])
    setInStockOnly(false)
  }

  const hasActiveFilters = selectedFabrics.length > 0 || inStockOnly

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // 1. Category filter
      if (categorySlug && category) {
        const matchesCategory =
          (product.categorySlug && product.categorySlug.toLowerCase() === category.slug.toLowerCase()) ||
          (product.category && product.category.toLowerCase() === category.name.toLowerCase())
        if (!matchesCategory) {
          return false
        }
      }

      // 2. Fabric filter
      if (selectedFabrics.length > 0) {
        if (!selectedFabrics.includes(product.fabric)) {
          return false
        }
      }

      // 3. In-stock filter
      if (inStockOnly && !product.inStock) {
        return false
      }

      return true
    })
  }, [products, categorySlug, category, selectedFabrics, inStockOnly])

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts]
    if (sort === 'az') {
      return list.sort((a, b) => a.title.localeCompare(b.title))
    }
    if (sort === 'za') {
      return list.sort((a, b) => b.title.localeCompare(a.title))
    }
    return list.sort((a, b) => a.id - b.id)
  }, [filteredProducts, sort])

  return (
    <main className="shop-page">
      <SEO
        title={category ? `${category.name} Collection | Riti Handlooms Jagat Farm Greater Noida` : 'Our Handloom Collection | Riti Handlooms Jagat Farm Greater Noida'}
        description={category ? `Browse handcrafted ${category.name.toLowerCase()} at Riti Handlooms, Jagat Farm, Greater Noida. Near Knowledge Park 2 & Pari Chowk. WhatsApp enquiry available.` : 'Explore handcrafted bedsheets, dohars, blankets, and towels at Riti Handlooms in Jagat Farm, Greater Noida (near Knowledge Park 2).'}
        breadcrumbs={[
          { name: 'Home', url: 'https://ritihandloom.in/' },
          { name: category ? category.name : 'Our Collection', url: category ? `https://ritihandloom.in/category/${category.slug}` : 'https://ritihandloom.in/shop' }
        ]}
      />
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
            <img src={category.image} alt={category.name} />
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
            <SlidersHorizontal /> Filter {hasActiveFilters && <em>•</em>}
          </button>
          <span>Showing {sortedProducts.length} handcrafted items</span>
          <div>
            <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort products">
              <option value="latest">Latest Arrivals</option>
              <option value="az">Name: A to Z</option>
              <option value="za">Name: Z to A</option>
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

        {hasActiveFilters && (
          <div className="active-filters-bar">
            <span>Active filters:</span>
            {selectedFabrics.map(f => (
              <button key={f} className="filter-chip" onClick={() => toggleFabric(f)}>
                {f} <X size={12} />
              </button>
            ))}
            {inStockOnly && (
              <button className="filter-chip" onClick={() => setInStockOnly(false)}>
                In Stock <X size={12} />
              </button>
            )}
            <button className="clear-filters-link" onClick={clearAllFilters}>
              <RotateCcw size={12} /> Clear all
            </button>
          </div>
        )}

        <div className="shop-layout">
          <aside className={filtersOpen ? 'shop-sidebar open' : 'shop-sidebar'}>
            <div className="filter-mobile-head">
              <b>Filter Catalogue</b>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                <X />
              </button>
            </div>

            <details open>
              <summary>Categories<ChevronDown /></summary>
              <div className="category-filter-links">
                <Link className={!categorySlug ? 'active' : ''} to="/shop">
                  All Products
                </Link>
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

            <details open>
              <summary>Fabric & Weave<ChevronDown /></summary>
              <div>
                {availableFabrics.map(fabric => (
                  <label key={fabric}>
                    <input
                      type="checkbox"
                      checked={selectedFabrics.includes(fabric)}
                      onChange={() => toggleFabric(fabric)}
                    />
                    {fabric}
                  </label>
                ))}
              </div>
            </details>

            <details open>
              <summary>Availability<ChevronDown /></summary>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={e => setInStockOnly(e.target.checked)}
                  />
                  In Stock Only
                </label>
              </div>
            </details>

            {hasActiveFilters && (
              <button className="btn secondary full" style={{ marginTop: '16px' }} onClick={clearAllFilters}>
                Reset All Filters
              </button>
            )}
          </aside>

          {filtersOpen && (
            <div className="filter-backdrop" onClick={() => setFiltersOpen(false)} />
          )}

          {sortedProducts.length ? (
            <div className={`shop-grid cols-${columns}`}>
              {sortedProducts.map(p => (
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
              <h2>No products match your filters</h2>
              <p>Try clearing some filters or browse our other handcrafted collections.</p>
              <button className="btn primary" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
