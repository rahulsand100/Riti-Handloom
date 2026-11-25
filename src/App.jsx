import { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import {
  ChevronDown, Heart, Search, ShoppingBag, UserRound, Menu, X,
  ArrowRight, ArrowLeft, Star, Camera as Instagram, Phone, Mail, MapPin,
  SlidersHorizontal, Grid2X2, Grid3X3, Trash2,
  ShieldCheck, Truck, RefreshCcw, BadgeCheck, Eye, MessageCircle as WhatsApp
} from 'lucide-react'
import './App.css'

const image = (id, w = 900, h = 1100) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=82`

const bedsheetImages = [
  { src: '/products/bedsheet-front.jpg', alt: 'Floral bedsheet front view' },
  { src: '/products/bedsheet-side.jpg', alt: 'Floral bedsheet side angle' },
  { src: '/products/bedsheet-aerial.jpg', alt: 'Floral bedsheet aerial view' },
  { src: '/products/bedsheet-fitted.jpg', alt: 'Floral king fitted bedsheet' },
  { src: '/products/bedsheet-pillow.jpg', alt: 'Matching floral pillow close-up' },
  { src: '/products/bedsheet-zoom.jpg', alt: 'Floral bedsheet print detail' },
]

const products = [
  { id: 1, title: 'Floral Print Cotton Bedsheet Set', image: bedsheetImages[0].src, hover: bedsheetImages[1].src, gallery: bedsheetImages, badge: 'New Arrival', category: 'Bedsheets' },
  { id: 2, title: 'King Size Blanket', image: '/products/king-blanket-color-6.webp', hover: '/products/king-blanket-color-1.webp', badge: 'Featured', category: 'Blankets' },
  { id: 3, title: 'Ivory Woven Cotton Dohar', image: image('photo-1615874694520-474822394e73'), hover: image('photo-1522771753035-1a64ed6f5d4d'), category: 'Dohars' },
  { id: 4, title: 'Saffron Cotton Bed Linen Set', image: image('photo-1505693416388-ac5ce068fe85'), hover: image('photo-1631049307264-da0ec9d70304'), badge: 'New Arrival', category: 'Bed Sets' },
  { id: 5, title: 'Forest Green Bath Towel', image: image('photo-1584622650111-993a426fbf0a'), hover: image('photo-1585411498137-20a1e7ca2e5a'), category: 'Towels' },
  { id: 6, title: 'Decorative Pillow Cover Set', image: '/products/pillow-cover-set.jpg', hover: '/products/pillow-cover-set.jpg', gallery: [{ src: '/products/pillow-cover-set.jpg', alt: 'Decorative pillow cover set' }], category: 'Pillow Covers' },
  { id: 7, title: 'Soft Cotton Pillow Pair', image: '/products/pillow-pair.jpg', hover: '/products/pillow-pair.jpg', gallery: [{ src: '/products/pillow-pair.jpg', alt: 'Pair of soft cotton pillows' }], category: 'Pillows' },
  { id: 8, title: 'Terracotta Handwoven Area Carpet', image: image('photo-1600166898405-da9535204843'), hover: image('photo-1575414003591-ece8d0416c7a'), badge: 'Handcrafted', category: 'Carpets' },
]

const categories = [
  { name: 'Bedsheets', slug: 'bedsheets', image: bedsheetImages[0].src, description: 'Comfortable cotton bedsheets for a restful night.' },
  { name: 'Pillows', slug: 'pillows', image: '/products/pillow-pair.jpg', description: 'Soft, supportive pillows for everyday comfort.' },
  { name: 'Pillow Covers', slug: 'pillow-covers', image: '/products/pillow-cover-set.jpg', description: 'Fresh designs to complete your bedding.' },
  { name: 'Blankets', slug: 'blankets', image: '/products/blanket-category.jpg', description: 'Cozy blankets in soothing artisan shades.' },
  { name: 'Dohars', slug: 'dohars', image: products[2].image, description: 'Lightweight, breathable layers for your bedroom.' },
  { name: 'Carpets', slug: 'carpets', image: products[7].image, description: 'Woven floor accents to bring warmth into your home.' },
  { name: 'Towels', slug: 'towels', image: products[4].image, description: 'Soft cotton towels for a comfortable daily routine.' },
  { name: 'Bed Sets', slug: 'bed-sets', image: products[3].image, description: 'Coordinated bedding essentials, ready for your room.' },
]

const categorySlugByName = {
  Bedsheets: 'bedsheets',
  Pillows: 'pillows',
  'Pillow Covers': 'pillow-covers',
  'Cushion Covers': 'pillow-covers',
  Blankets: 'blankets',
  Dohars: 'dohars',
  Carpets: 'carpets',
  'Bath Towels': 'towels',
  'Bath Sets': 'towels',
  Towels: 'towels',
  'Bed Sets': 'bed-sets',
}

const categoryPath = (name) => `/category/${categorySlugByName[name] || 'bedsheets'}`

function Header({ cartCount, onCart, wishlistCount }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [search, setSearch] = useState('')
  const suggestions = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Handcrafted Handloom & Home Linen · Greater Noida · Wholesale & Retail Enquiries</span>
          <div><a href="tel:+919555790429"><Phone size={13}/> +91 95557 90429</a><a href="https://wa.me/919555790429?text=Namaste%20Riti%20Handlooms!%20I%20have%20an%20enquiry.">WhatsApp</a></div>
        </div>
      </div>
      <header className="header">
        <div className="container header-inner">
          <button className="icon-btn mobile-only" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></button>
          <Link to="/" className="brand"><span>RITI</span><small>HANDLOOM</small></Link>
          <nav className="main-nav" aria-label="Main navigation">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <div className="nav-drop">
              <button>Our Collection <ChevronDown size={13}/></button>
              <div className="mega-menu">
                {[['Bed Linen', 'Bedsheets', 'Blankets', 'Dohars', 'Bed Sets'], ['Soft Furnishing', 'Pillows', 'Pillow Covers'], ['Floor & Bath', 'Carpets', 'Bath Towels']].map(col =>
                  <div key={col[0]}><b>{col[0]}</b>{col.slice(1).map(link => <Link key={link} to={categoryPath(link)}>{link}</Link>)}</div>
                )}
              </div>
            </div>
            <Link to="/shop">New Arrivals</Link>
            <Link to={categoryPath('Bedsheets')}>Bed Linen</Link>
            <Link to={categoryPath('Pillow Covers')}>Soft Furnishing</Link>
            <Link to="/shop">Collection</Link>
          </nav>
          <div className="header-actions">
            <button className="icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search"><Search /></button>
            <Link className="icon-btn desktop-only" to="/wishlist" aria-label="Wishlist"><Heart />{wishlistCount > 0 && <em>{wishlistCount}</em>}</Link>
            <button className="icon-btn desktop-only" onClick={() => setAccountOpen(true)} aria-label="Account"><UserRound /></button>
            <button className="cart-trigger" onClick={onCart} aria-label="Open enquiry bag"><ShoppingBag /><span><small>{cartCount} {cartCount === 1 ? 'item' : 'items'}</small><b>Enquiry Bag</b></span></button>
          </div>
        </div>
      </header>

      {menuOpen && <div className="overlay" onMouseDown={() => setMenuOpen(false)}>
        <aside className="mobile-drawer" onMouseDown={e => e.stopPropagation()}>
          <div className="drawer-head"><b>MENU</b><button onClick={() => setMenuOpen(false)}><X /></button></div>
          {['Bedsheets', 'Pillows', 'Pillow Covers', 'Blankets', 'Dohars', 'Carpets', 'Towels', 'Bed Sets'].map(item => <Link key={item} to={categoryPath(item)} onClick={() => setMenuOpen(false)}>{item}<ChevronDown size={16}/></Link>)}
          <Link to="/about" onClick={() => setMenuOpen(false)}>About the Brand</Link>
          <div className="drawer-bottom"><Link to="/wishlist"><Heart size={17}/> Wishlist</Link><button onClick={() => setAccountOpen(true)}><UserRound size={17}/> Customer Care</button></div>
        </aside>
      </div>}

      {searchOpen && <div className="search-overlay">
        <div className="container">
          <div className="search-head"><b>Search our catalogue</b><button onClick={() => setSearchOpen(false)}><X /></button></div>
          <div className="search-row"><select aria-label="Category"><option>All categories</option>{categories.map(category => <option key={category.slug}>{category.name}</option>)}</select><input autoFocus value={search} onChange={e => setSearch(e.target.value)} placeholder="What are you looking for?" /></div>
          {search && <div className="suggestions">{suggestions.slice(0, 5).map(p => <Link key={p.id} to={`/product/${p.id}`} onClick={() => setSearchOpen(false)}><img src={p.image} alt="" /><div><b>{p.title}</b><span className="all-size-tag">ALL SIZE</span></div></Link>)}</div>}
        </div>
      </div>}

      {accountOpen && <div className="overlay" onMouseDown={() => setAccountOpen(false)}><aside className="account-drawer" onMouseDown={e => e.stopPropagation()}><div className="drawer-head"><b>CUSTOMER ASSISTANCE</b><button onClick={() => setAccountOpen(false)}><X /></button></div><div style={{padding:'24px'}}><p>For inquiries, custom sizing, and wholesale rates, please connect with us directly on WhatsApp or phone.</p><div style={{display:'flex',flexDirection:'column',gap:'12px',marginTop:'20px'}}><a href="tel:+919555790429" className="btn secondary full"><Phone size={16}/> Call +91 95557 90429</a><a href="https://wa.me/919555790429?text=Namaste%20Riti%20Handlooms!%20I%20have%20an%20enquiry." target="_blank" rel="noopener noreferrer" className="btn primary full" style={{background:'#25D366'}}><WhatsApp size={16}/> WhatsApp Chat</a></div></div></aside></div>}
    </>
  )
}

function MiniCart({ open, onClose, cart, setCart }) {
  if (!open) return null
  const waEnquiry = encodeURIComponent(
    `Namaste Riti Handlooms! Please quote price and availability for these items from my enquiry bag:\n\n` +
    cart.map((item, i) => `${i + 1}. ${item.title} (Size: ALL SIZE)`).join('\n') +
    `\n\nPlease share details and availability.`
  )

  return (
    <div className="overlay" onMouseDown={onClose}>
      <aside className="cart-drawer" onMouseDown={e => e.stopPropagation()}>
        <div className="drawer-head"><b>Your Enquiry Bag</b><button onClick={onClose}><X /></button></div>
        {cart.length === 0 ? (
          <div className="empty-cart"><ShoppingBag/><p>Your enquiry bag is empty</p><button className="btn primary" onClick={onClose}>Explore Collection</button></div>
        ) : (
          <>
            <div className="cart-lines">
              {cart.map(item => (
                <div className="cart-line" key={item.id}>
                  <img src={item.image} alt={item.title}/>
                  <div>
                    <b>{item.title}</b>
                    <small>{item.category} · ALL SIZE</small>
                  </div>
                  <button className="remove" onClick={() => setCart(cart.filter(x => x.id !== item.id))} aria-label="Remove item"><Trash2/></button>
                </div>
              ))}
            </div>
            <div className="cart-foot">
              <a href={`https://wa.me/919555790429?text=${waEnquiry}`} target="_blank" rel="noopener noreferrer" className="btn primary full" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',background:'#25D366'}}>
                <WhatsApp size={16}/> Enquire on WhatsApp
              </a>
              <Link to="/cart" onClick={onClose} className="btn secondary full">View Enquiry Bag</Link>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

function ProductCard({ product, onAdd, wishlist, setWishlist }) {
  const navigate = useNavigate()
  const liked = wishlist.includes(product.id)
  return (
    <article className="product-card">
      <div className="product-image">
        <Link to={`/product/${product.id}`}>
          <img className="main-img" src={product.image} alt={product.title}/>
          <img className="hover-img" src={product.hover} alt="" />
        </Link>
        {product.badge && <div className={`badge ${product.badge === 'Sold out' ? 'soldout' : 'new'}`}>{product.badge}</div>}
        <div className="card-actions">
          <button className={liked ? 'liked' : ''} onClick={() => setWishlist(liked ? wishlist.filter(id => id !== product.id) : [...wishlist, product.id])} aria-label="Wishlist"><Heart/></button>
          <button aria-label="Quick view" onClick={() => navigate(`/product/${product.id}`)}><Eye/></button>
        </div>
      </div>
      <div className="product-info">
        <Link to={`/product/${product.id}`}>{product.title}</Link>
        <div><span className="all-size-tag">ALL SIZE</span></div>
        <button className="card-add" onClick={() => onAdd(product)}>Add to Enquiry</button>
      </div>
    </article>
  )
}

function SectionTitle({ children }) {
  return <div className="section-title"><h2>{children}</h2><i/></div>
}

function Home({ onAdd, wishlist, setWishlist }) {
  const [slide, setSlide] = useState(0)
  const heroSlides = [
    { title: 'A softer kind of everyday.', label: 'RITI HANDLOOM · THE HOME EDIT', description: 'Thoughtful textiles for the little moments that make a home.', image: image('photo-1505693416388-ac5ce068fe85', 1800, 900), link: '/category/bed-sets', linkText: 'Discover the collection' },
    { title: 'Layers made for living.', label: 'COMFORT, IN EVERY THREAD', description: 'Find your favorite blanket, pillow, and cozy finishing touch.', image: image('photo-1631049307264-da0ec9d70304', 1800, 900), link: '/category/blankets', linkText: 'Explore blankets' },
    { title: 'Rest easy. Wake inspired.', label: 'BEDROOM ESSENTIALS', description: 'Bring fresh color and everyday comfort to your bedroom.', image: bedsheetImages[2].src, link: '/category/bedsheets', linkText: 'Explore bedsheets' }
  ]
  useEffect(() => { const timer = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 5000); return () => clearInterval(timer) }, [heroSlides.length])
  return <>
    <section className="hero-slider">
      {heroSlides.map((s, i) => <div key={s.title} className={`hero-slide ${i === slide ? 'active' : ''}`} style={{backgroundImage: `url(${s.image})`}} aria-hidden={i !== slide}>
        <div className="hero-copy"><small><i/>{s.label}</small><h1>{s.title}</h1><p>{s.description}</p><Link className="hero-cta" to={s.link}>{s.linkText}<ArrowRight size={17}/></Link></div>
        <div className="hero-stamp"><span>MADE FOR</span><b>your<br/>home</b><i>R</i></div>
      </div>)}
      <button className="hero-arrow left" aria-label="Previous slide" onClick={() => setSlide((slide - 1 + heroSlides.length) % heroSlides.length)}><ArrowLeft/></button><button className="hero-arrow right" aria-label="Next slide" onClick={() => setSlide((slide + 1) % heroSlides.length)}><ArrowRight/></button>
      <div className="hero-controls"><div className="hero-dots">{heroSlides.map((_, i) => <button key={i} className={i === slide ? 'active' : ''} aria-label={`Go to slide ${i + 1}`} aria-current={i === slide ? 'true' : undefined} onClick={() => setSlide(i)} />)}</div><span className="hero-count"><b>0{slide + 1}</b><i/>0{heroSlides.length}</span></div>
    </section>

    <section className="section"><div className="container"><SectionTitle>SHOP BY CATEGORY</SectionTitle><div className="arrival-grid category-grid">{categories.map(category => <Link className="arrival-card" to={`/category/${category.slug}`} key={category.slug}><img src={category.image} alt={`${category.name} collection`} loading="lazy"/><span>{category.name.toUpperCase()}<ArrowRight/></span></Link>)}</div><Link className="wide-banner" to={categoryPath('Bedsheets')}><img src={image('photo-1505693416388-ac5ce068fe85', 1300, 520)} alt="Premium bed linen collection"/><div><small>THE BEDROOM EDIT</small><h3>Comfort, colour and calm for every bedroom</h3><b>Discover the collection <ArrowRight size={16}/></b></div></Link></div></section>

    {[
      ['BED LINEN', 'bedsheets', products.slice(0, 4)],
      ['PILLOW COVER SETS & PILLOW PAIRS', 'pillow-covers', products.filter(product => ['Pillow Covers', 'Pillows'].includes(product.category))],
      ['BLANKETS & FLOOR', 'blankets', products.filter(product => ['Blankets', 'Dohars', 'Carpets'].includes(product.category))],
    ].map(([title, slug, collection]) => <section className="section product-section" key={title}><div className="container"><div className="carousel-head"><h3>{title}</h3><Link to={`/category/${slug}`}>View All</Link></div><div className="product-grid">{collection.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} wishlist={wishlist} setWishlist={setWishlist}/>)}</div></div></section>)}

    <section className="section soft"><div className="container"><SectionTitle>WHY CHOOSE US</SectionTitle><div className="trust-grid">{[[BadgeCheck,'Handloom Certified','Authentic artisan craft'],[ShieldCheck,'Natural Fabrics','Comfort you can feel'],[Truck,'Secure Delivery','Carefully packed and shipped'],[RefreshCcw,'Direct Enquiry','Personalized customer support']].map(([Icon,title,text]) => <div key={title}><Icon/><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>

    <section className="section reviews"><div className="container"><SectionTitle>CUSTOMER EXPERIENCES</SectionTitle><div className="review-layout"><div className="rating-summary"><h3>Riti Handloom</h3><b>4.8</b><div>{[1,2,3,4,5].map(n => <Star key={n} fill="currentColor"/>)}</div><p>Out of 5 stars · Google reviews</p></div><div className="review-cards">{[
      ['Ananya Mehta','2 months ago','The cotton bedsheet weave is so soft and the finish feels wonderfully premium.'],
      ['Rohan Kapoor','5 months ago','Excellent cotton bed linen. The colours are exactly as described and it softened beautifully after washing.'],
      ['Meera Sethi','1 month ago','Lovely packaging and thoughtful support from the Riti team on WhatsApp. Prompt service!']
    ].map(([name,time,text]) => <article key={name}><div className="stars">{[1,2,3,4,5].map(n => <Star key={n} fill="currentColor"/>)}</div><p>“{text}”</p><b>{name}</b><small>{time}</small></article>)}</div></div></div></section>

    <section className="instagram"><div className="container"><div className="instagram-head"><h2><Instagram/> @ritihandloom</h2><a className="btn secondary" href="https://instagram.com/ritihandloom" target="_blank" rel="noopener noreferrer">Follow</a></div><div className="insta-grid">{[...products.slice(0,6)].map(p => <a href="https://instagram.com/ritihandloom" target="_blank" rel="noopener noreferrer" key={p.id}><img src={p.image} alt="Riti Handloom on Instagram"/></a>)}</div></div></section>
    <section className="newsletter"><div><small>JOIN OUR COMMUNITY</small><h2>Stories, new arrivals & special updates</h2><form onSubmit={e => e.preventDefault()}><input type="email" placeholder="Your email address" required/><button className="btn primary">Subscribe</button></form></div></section>
  </>
}

function Shop({ onAdd, wishlist, setWishlist, categorySlug }) {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sort, setSort] = useState('latest')
  const [columns, setColumns] = useState(4)
  const category = categories.find(item => item.slug === categorySlug)
  const collection = categorySlug
    ? products.filter(product => product.category.toLowerCase() === category?.name.toLowerCase())
    : products
  const sorted = [...collection].sort((a, b) => sort === 'az' ? a.title.localeCompare(b.title) : a.id - b.id)
  const filterGroups = {
    Category: ['Bedsheets', 'Pillows', 'Pillow Covers', 'Blankets', 'Dohars', 'Carpets', 'Towels'],
    Fabric: ['100% Cotton', 'Cotton Blend', 'Linen', 'Handloom Weave'],
  }
  return <main className="shop-page"><div className="container">
    <div className="breadcrumb"><Link to="/">Home</Link> / {category ? <><Link to="/shop">Our Collection</Link> / <b>{category.name}</b></> : <b>Our Collection</b>}</div>
    {category && <section className="category-hero"><img src={category.image} alt=""/><div><small>RITI HANDLOOM COLLECTION</small><h1>{category.name}</h1><p>{category.description}</p></div></section>}
    {!category && <h1>Our Collection</h1>}
    <div className="shop-toolbar"><button className="filter-btn" onClick={() => setFiltersOpen(true)}><SlidersHorizontal/> Filter</button><span>{sorted.length} products</span><div><select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort products"><option value="latest">Latest</option><option value="az">Name A to Z</option></select><button className={columns === 3 ? 'active' : ''} onClick={() => setColumns(3)}><Grid3X3/></button><button className={columns === 4 ? 'active' : ''} onClick={() => setColumns(4)}><Grid2X2/></button></div></div>
    <div className="shop-layout"><aside className={filtersOpen ? 'shop-sidebar open' : 'shop-sidebar'}><div className="filter-mobile-head"><b>Categories</b><button onClick={() => setFiltersOpen(false)}><X/></button></div>
      <details open><summary>Categories<ChevronDown/></summary><div className="category-filter-links">{categories.map(item => <Link className={item.slug === categorySlug ? 'active' : ''} key={item.slug} to={`/category/${item.slug}`}>{item.name}</Link>)}</div></details>
      {Object.entries(filterGroups).map(([title, values]) => <details key={title}><summary>{title}<ChevronDown/></summary><div>{values.map(value => <label key={value}><input type="checkbox"/> {value}</label>)}</div></details>)}
    </aside>{filtersOpen && <div className="filter-backdrop" onClick={() => setFiltersOpen(false)}/>}
    {sorted.length ? <div className={`shop-grid cols-${columns}`}>{sorted.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} wishlist={wishlist} setWishlist={setWishlist}/>)}</div> : <div className="category-empty"><h2>No products in this category yet</h2><p>We’re adding new handloom essentials soon. Browse our other collections in the meantime.</p><Link className="btn primary" to="/shop">Explore all products</Link></div>}
    </div></div></main>
}

function CategoryPage({ onAdd, wishlist, setWishlist }) {
  const { categorySlug } = useParams()
  return <Shop categorySlug={categorySlug} onAdd={onAdd} wishlist={wishlist} setWishlist={setWishlist}/>
}

function ProductPage({ onAdd, wishlist, setWishlist }) {
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id)) || products[0]
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const galleryImages = product.gallery || [
    { src: product.image, alt: product.title },
    { src: product.hover, alt: `${product.title} detail` },
  ]
  const liked = wishlist.includes(product.id)
  const waMessage = encodeURIComponent(
    `Namaste Riti Handlooms! I would like to enquire about this product:\n\n*Product:* ${product.title}\n*Category:* ${product.category}\n*Size:* ALL SIZE\n*Product Link:* ${typeof window !== 'undefined' ? window.location.href : `/product/${product.id}`}\n\nPlease share price and availability.`
  )

  return (
    <main className="product-page">
      <div className="container">
        <div className="breadcrumb"><Link to="/">Home</Link> / <Link to={categoryPath(product.category)}>{product.category}</Link> / <b>{product.title}</b></div>
        <div className="product-detail">
          <div className="gallery">
            <img className="gallery-main" src={galleryImages[activeImageIndex].src} alt={galleryImages[activeImageIndex].alt || product.title}/>
            <div className="gallery-thumbnails">
              {galleryImages.map((item, index) => (
                <button
                  key={item.src}
                  className={index === activeImageIndex ? 'active' : ''}
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={item.src} alt=""/>
                </button>
              ))}
            </div>
          </div>
          <div className="detail-info">
            <h1>{product.title}</h1>
            <div className="detail-rating">
              <span>{[1,2,3,4,5].map(n => <Star key={n} fill="currentColor"/>)}</span>
              <small>Artisan Crafted Handloom</small>
            </div>
            
            <p>Crafted in small batches by skilled artisans, this timeless piece brings natural comfort and considered design to your everyday living.</p>
            
            <div className="fixed-size-display">
              <label>Available Size:</label>
              <span>ALL SIZE</span>
            </div>

            <div className="stock"><span/>Available for Order</div>

            <div style={{display:'flex', gap:'10px', margin:'20px 0'}}>
              <button className="btn primary" style={{flex:1}} onClick={() => onAdd(product)}>
                Add to Enquiry Bag
              </button>
              <button className={`wishlist-detail ${liked ? 'liked' : ''}`} style={{width:'48px', height:'48px', display:'grid', placeItems:'center'}} onClick={() => setWishlist(liked ? wishlist.filter(x => x !== product.id) : [...wishlist, product.id])} aria-label="Wishlist">
                <Heart/>
              </button>
            </div>

            <a
              className="whatsapp-link"
              href={`https://wa.me/919555790429?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{padding:'14px 20px', background:'#25D366', color:'#fff', borderRadius:'4px', textDecoration:'none', fontWeight:600, display:'flex', justifyContent:'center', alignItems:'center', gap:'8px'}}
            >
              <WhatsApp size={20}/> Enquire on WhatsApp
            </a>

            <div className="detail-trust">
              <span><ShieldCheck/> Authentic Weave</span>
              <span><RefreshCcw/> Direct Support</span>
              <span><Truck/> Safe Delivery</span>
            </div>
          </div>
        </div>

        <div className="product-tabs">
          <details open>
            <summary>Description</summary>
            <p>Handwoven textiles designed for lasting comfort, crafted using natural fibres, artisan detailing, and easy-care finishes.</p>
          </details>
          <details>
            <summary>Specifications & Size</summary>
            <p>
              <b>Size:</b> ALL SIZE<br/>
              <b>Category:</b> {product.category}<br/>
              <b>Care:</b> Gentle cold machine or hand wash. Dry in shade.
            </p>
          </details>
          <details>
            <summary>Enquiry & Delivery</summary>
            <p>All enquiries and orders are fulfilled directly via WhatsApp for personal assistance and confirmed dispatch schedules.</p>
          </details>
        </div>
      </div>
    </main>
  )
}

function Cart({ cart, setCart }) {
  const navigate = useNavigate()
  const waEnquiry = encodeURIComponent(
    `Namaste Riti Handlooms! Please quote price and availability for these items from my enquiry bag:\n\n` +
    cart.map((item, i) => `${i + 1}. ${item.title} (Size: ALL SIZE)`).join('\n') +
    `\n\nPlease share details and availability.`
  )

  return (
    <main className="cart-page">
      <div className="container">
        <div className="breadcrumb"><Link to="/">Home</Link> / <b>Enquiry Bag</b></div>
        <h1>Enquiry Bag</h1>
        {cart.length === 0 ? (
          <div className="empty-cart page-empty">
            <ShoppingBag/>
            <p>Your enquiry bag is currently empty.</p>
            <Link className="btn primary" to="/shop">Explore Collection</Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-table">
              {cart.map(item => (
                <div className="cart-table-row" key={item.id} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 0', borderBottom:'1px solid var(--border)'}}>
                  <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
                    <img src={item.image} alt={item.title} style={{width:'70px', height:'88px', objectFit:'cover'}}/>
                    <div>
                      <b>{item.title}</b>
                      <small style={{display:'block', color:'var(--text-muted)'}}>{item.category} · ALL SIZE</small>
                    </div>
                  </div>
                  <button onClick={() => setCart(cart.filter(x => x.id !== item.id))} aria-label="Remove item" style={{background:'none', border:'none', cursor:'pointer', color:'#888'}}>
                    <Trash2 size={18}/>
                  </button>
                </div>
              ))}
            </div>
            <aside className="order-summary" style={{padding:'24px', background:'var(--bg-soft)', borderRadius:'4px'}}>
              <h3>Enquiry Summary</h3>
              <p style={{fontSize:'13px', color:'var(--text-muted)', lineHeight:'1.6'}}>
                You have selected <b>{cart.length}</b> {cart.length === 1 ? 'item' : 'items'} (ALL SIZE). Tap below to send your complete quotation request directly to our team on WhatsApp.
              </p>
              <hr style={{margin:'16px 0', borderColor:'var(--border)'}}/>
              <a
                className="btn primary full"
                href={`https://wa.me/919555790429?text=${waEnquiry}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', background:'#25D366'}}
              >
                <WhatsApp size={18}/> Send Enquiry on WhatsApp
              </a>
              <button className="btn secondary full" style={{marginTop:'10px'}} onClick={() => navigate('/shop')}>
                Continue Browsing
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}

function Checkout({ cart }) {
  const waEnquiry = encodeURIComponent(
    `Namaste Riti Handlooms! Please quote price and availability for these items from my enquiry bag:\n\n` +
    cart.map((item, i) => `${i + 1}. ${item.title} (Size: ALL SIZE)`).join('\n') +
    `\n\nPlease share details and availability.`
  )
  return (
    <main className="confirmation" style={{padding:'60px 20px', textAlign:'center'}}>
      <BadgeCheck size={56} style={{color:'var(--new)', margin:'0 auto 16px'}}/>
      <h1>Direct WhatsApp Ordering</h1>
      <p style={{maxWidth:'500px', margin:'0 auto 24px', color:'var(--text-muted)'}}>
        We handle orders and quotations personally on WhatsApp to offer you the best rates and confirmed availability.
      </p>
      <a
        className="btn primary"
        href={`https://wa.me/919555790429?text=${waEnquiry}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{display:'inline-flex', alignItems:'center', gap:'8px', background:'#25D366'}}
      >
        <WhatsApp size={18}/> Chat on WhatsApp (+91 95557 90429)
      </a>
    </main>
  )
}

function StaticPage({ title }) {
  return (
    <main className="static-page">
      <div className="container">
        <div className="breadcrumb"><Link to="/">Home</Link> / <b>{title}</b></div>
        <h1>{title}</h1>
        {title === 'About the Brand' ? (
          <div className="about-page">
            <section className="about-intro">
              <div className="about-copy"><small>THE RITI HANDLOOM STORY</small><h2>Comfort, character and thoughtful details for your home.</h2><p>We believe the little details make a house feel like yours. Riti Handloom brings together bedsheets, blankets, pillows, pillow covers and everyday home textiles chosen to make your spaces feel more comfortable and personal.</p><p>From soft layers for the bedroom to finishing touches for the living room, explore pieces made to feel at home in your everyday routine.</p><Link className="btn primary" to="/shop">Explore our collection</Link></div>
              <div className="about-image-grid"><img className="about-image-main" src="/products/blanket-category.jpg" alt="Riti Handloom floral blanket styled in a bedroom"/><img src="/products/pillow-pair.jpg" alt="Soft cotton pillow pair"/><img src="/products/pillow-cover-set.jpg" alt="Decorative pillow cover set"/></div>
            </section>
            <section className="about-values"><div className="about-section-heading"><small>WHAT MATTERS TO US</small><h2>Made for the feeling of home</h2></div><div className="about-value-grid"><article><span>01</span><h3>Everyday comfort</h3><p>Home textiles should feel inviting, practical and easy to enjoy every day.</p></article><article><span>02</span><h3>Considered details</h3><p>Color, texture and finishing touches help bring warmth and personality to a room.</p></article><article><span>03</span><h3>Choices for your space</h3><p>Discover bedroom and home essentials to mix, match and make your own.</p></article></div></section>
            <section className="about-cta"><div><small>FIND YOUR NEW FAVORITES</small><h2>A little more comfort, one room at a time.</h2></div><Link className="btn secondary" to="/shop">Shop home essentials <ArrowRight size={16}/></Link></section>
          </div>
        ) : (
          <div className="policy-content">
            <p>Our team is happy to help with product, bulk order and delivery information.</p>
            <h3>Get in touch</h3>
            <p><Phone size={16}/> +91 95557 90429</p>
            <p><Mail size={16}/> hello@ritihandloom.in</p>
            <p><MapPin size={16}/> Jagat Farm, Greater Noida, Uttar Pradesh</p>
          </div>
        )}
      </div>
    </main>
  )
}

function WishlistPage({ wishlist, setWishlist, onAdd }) {
  const wishlistProducts = products.filter(p => wishlist.includes(p.id))
  return (
    <main className="shop-page">
      <div className="container">
        <div className="breadcrumb"><Link to="/">Home</Link> / <b>Wishlist</b></div>
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
              <ProductCard key={p.id} product={p} onAdd={onAdd} wishlist={wishlist} setWishlist={setWishlist}/>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div><div className="footer-brand">RITI <small>HANDLOOM</small></div><p>Woven with tradition, made for your home.</p></div>
        <div><h3>ONLINE CATALOGUE</h3>{categories.slice(0,4).map(category => <Link key={category.slug} to={`/category/${category.slug}`}>{category.name}</Link>)}</div>
        <div><h3>HOME COLLECTIONS</h3>{categories.slice(4).map(category => <Link key={category.slug} to={`/category/${category.slug}`}>{category.name}</Link>)}</div>
        <div><h3>GET IN TOUCH</h3><a href="tel:+919555790429">Call Us: +91 95557 90429</a><a href="mailto:hello@ritihandloom.in">hello@ritihandloom.in</a><a href="https://wa.me/919555790429?text=Namaste%20Riti%20Handlooms!%20I%20have%20an%20enquiry.">Chat on WhatsApp</a><div className="socials"><Instagram/><a href="https://instagram.com/ritihandloom">Instagram</a></div></div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Riti Handloom</span>
        <span>Handcrafted with tradition in Greater Noida · Direct WhatsApp Enquiries</span>
      </div>
    </footer>
  )
}

function App() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('riti-cart') || '[]'))
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('riti-wishlist') || '[]'))
  const [cartOpen, setCartOpen] = useState(false)
  useEffect(() => localStorage.setItem('riti-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('riti-wishlist', JSON.stringify(wishlist)), [wishlist])

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(p => p.id === product.id)
      return found ? prev : [...prev, product]
    })
    setCartOpen(true)
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Header cartCount={cart.length} onCart={() => setCartOpen(true)} wishlistCount={wishlist.length}/>
        <Routes>
          <Route path="/" element={<Home onAdd={addToCart} wishlist={wishlist} setWishlist={setWishlist}/>}/>
          <Route path="/shop" element={<Shop onAdd={addToCart} wishlist={wishlist} setWishlist={setWishlist}/>}/>
          <Route path="/category/:categorySlug" element={<CategoryPage onAdd={addToCart} wishlist={wishlist} setWishlist={setWishlist}/>}/>
          <Route path="/product/:id" element={<ProductPage onAdd={addToCart} wishlist={wishlist} setWishlist={setWishlist}/>}/>
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>}/>
          <Route path="/checkout" element={<Checkout cart={cart}/>}/>
          <Route path="/about" element={<StaticPage title="About the Brand"/>}/>
          <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} setWishlist={setWishlist} onAdd={addToCart}/>}/>
          <Route path="/page/:title" element={<StaticPage title="Shipping & Policies"/>}/>
        </Routes>
        <Footer/>
        <MiniCart open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} setCart={setCart}/>
        <a className="floating-whatsapp" href="https://wa.me/919555790429?text=Namaste%20Riti%20Handlooms!%20I%20have%20an%20enquiry." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsApp/></a>
        <nav className="mobile-toolbar">
          <Link to="/shop"><Grid2X2/><span>Catalogue</span></Link>
          <Link to="/shop"><Search/><span>Search</span></Link>
          <Link to="/wishlist"><Heart/><span>Wishlist</span></Link>
          <button onClick={() => setCartOpen(true)}><ShoppingBag/><span>Enquiry</span></button>
          <a href="https://wa.me/919555790429?text=Namaste%20Riti%20Handlooms!%20I%20have%20an%20enquiry." target="_blank" rel="noopener noreferrer"><WhatsApp/><span>WhatsApp</span></a>
        </nav>
      </div>
    </BrowserRouter>
  )
}

export default App
