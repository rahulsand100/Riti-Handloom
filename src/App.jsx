import { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import {
  ChevronDown, Heart, Search, ShoppingBag, UserRound, Menu, X,
  ArrowRight, ArrowLeft, Star, Camera as Instagram, Phone, Mail, MapPin,
  SlidersHorizontal, Grid2X2, Grid3X3, Minus, Plus, Trash2,
  ShieldCheck, Truck, RefreshCcw, BadgeCheck, Eye, MessageCircle as WhatsApp
} from 'lucide-react'
import './App.css'

const money = (value) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 2
}).format(value)

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

const blanketColors = [
  { name: 'Color 1', src: '/products/king-blanket-color-6.webp' },
  { name: 'Color 2', src: '/products/king-blanket-color-1.webp' },
  { name: 'Color 3', src: '/products/king-blanket-color-2.webp' },
  { name: 'Color 4', src: '/products/king-blanket-color-3.webp' },
  { name: 'Color 5', src: '/products/king-blanket-color-4.webp' },
  { name: 'Color 6', src: '/products/king-blanket-color-5.webp' },
]

const products = [
  { id: 1, title: 'Floral Print Cotton Bedsheet Set', price: 2149, oldPrice: 4499, image: bedsheetImages[0].src, hover: bedsheetImages[1].src, gallery: bedsheetImages, badge: '-52%', category: 'Bedsheets', color: 'Floral Ivory', size: 'King', fabric: '100% Cotton', rating: 4.9 },
  { id: 2, title: 'King Size Blanket', price: 3899, oldPrice: 5200, image: blanketColors[0].src, hover: blanketColors[1].src, colors: blanketColors, badge: 'New', category: 'Blankets', color: blanketColors[0].name, size: 'King', fabric: 'Cotton Blend', rating: 4.8 },
  { id: 3, title: 'Ivory Woven Cotton Dohar', price: 2799, oldPrice: 3999, image: image('photo-1615874694520-474822394e73'), hover: image('photo-1522771753035-1a64ed6f5d4d'), badge: '-30%', category: 'Dohars', color: 'Ivory', size: 'Double', fabric: 'Cotton', rating: 4.7 },
  { id: 4, title: 'Saffron Cotton Bed Linen Set', price: 1899, oldPrice: 2499, image: image('photo-1505693416388-ac5ce068fe85'), hover: image('photo-1631049307264-da0ec9d70304'), badge: 'New', category: 'Bed Sets', color: 'Saffron', size: 'Set', fabric: 'Cotton', rating: 4.6 },
  { id: 5, title: 'Forest Green Bath Towel', price: 1299, oldPrice: 1799, image: image('photo-1584622650111-993a426fbf0a'), hover: image('photo-1585411498137-20a1e7ca2e5a'), category: 'Towels', color: 'Green', size: 'Standard', fabric: 'Cotton', rating: 4.8 },
  { id: 6, title: 'Decorative Pillow Cover Set', price: 899, oldPrice: 1199, image: '/products/pillow-cover-set.jpg', hover: '/products/pillow-cover-set.jpg', gallery: [{ src: '/products/pillow-cover-set.jpg', alt: 'Decorative pillow cover set' }], category: 'Pillow Covers', color: 'Ivory & Tan', size: 'Set', fabric: 'Cotton', rating: 4.5 },
  { id: 7, title: 'Soft Cotton Pillow Pair', price: 1099, oldPrice: 1499, image: '/products/pillow-pair.jpg', hover: '/products/pillow-pair.jpg', gallery: [{ src: '/products/pillow-pair.jpg', alt: 'Pair of soft cotton pillows' }], category: 'Pillows', color: 'White', size: 'Pair', fabric: 'Cotton', rating: 4.7 },
  { id: 8, title: 'Terracotta Handwoven Area Carpet', price: 1599, oldPrice: 2200, image: image('photo-1600166898405-da9535204843'), hover: image('photo-1575414003591-ece8d0416c7a'), badge: 'Sold out', category: 'Carpets', color: 'Terracotta', size: 'Standard', fabric: 'Cotton', rating: 4.9 },
]

const categories = [
  { name: 'Bedsheets', slug: 'bedsheets', image: bedsheetImages[0].src, description: 'Comfortable cotton bedsheets for a restful night.' },
  { name: 'Pillows', slug: 'pillows', image: '/products/pillow-pair.jpg', description: 'Soft, supportive pillows for everyday comfort.' },
  { name: 'Pillow Covers', slug: 'pillow-covers', image: '/products/pillow-cover-set.jpg', description: 'Fresh designs to complete your bedding.' },
  { name: 'Blankets', slug: 'blankets', image: '/products/blanket-category.jpg', description: 'Cozy king-size blankets in a range of colors.' },
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

function Header({ cartCount, cartTotal, onCart, wishlistCount }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [search, setSearch] = useState('')
  const suggestions = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Free shipping above ₹1,499 · COD available</span>
          <div><a href="tel:+919555790429"><Phone size={13}/> +91 95557 90429</a><a href="https://wa.me/919555790429">WhatsApp</a></div>
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
            <Link to="/shop" className="sale-link">Sale</Link>
          </nav>
          <div className="header-actions">
            <button className="icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search"><Search /></button>
            <Link className="icon-btn desktop-only" to="/wishlist" aria-label="Wishlist"><Heart />{wishlistCount > 0 && <em>{wishlistCount}</em>}</Link>
            <button className="icon-btn desktop-only" onClick={() => setAccountOpen(true)} aria-label="Account"><UserRound /></button>
            <button className="cart-trigger" onClick={onCart} aria-label="Open cart"><ShoppingBag /><span><small>{cartCount} items</small><b>{money(cartTotal)}</b></span></button>
          </div>
        </div>
      </header>

      {menuOpen && <div className="overlay" onMouseDown={() => setMenuOpen(false)}>
        <aside className="mobile-drawer" onMouseDown={e => e.stopPropagation()}>
          <div className="drawer-head"><b>MENU</b><button onClick={() => setMenuOpen(false)}><X /></button></div>
          {['Bedsheets', 'Pillows', 'Pillow Covers', 'Blankets', 'Dohars', 'Carpets', 'Towels', 'Bed Sets'].map(item => <Link key={item} to={categoryPath(item)} onClick={() => setMenuOpen(false)}>{item}<ChevronDown size={16}/></Link>)}
          <Link to="/about" onClick={() => setMenuOpen(false)}>About the Brand</Link>
          <div className="drawer-bottom"><Link to="/wishlist"><Heart size={17}/> Wishlist</Link><button onClick={() => setAccountOpen(true)}><UserRound size={17}/> Login / Register</button></div>
        </aside>
      </div>}

      {searchOpen && <div className="search-overlay">
        <div className="container">
          <div className="search-head"><b>Search our store</b><button onClick={() => setSearchOpen(false)}><X /></button></div>
          <div className="search-row"><select aria-label="Category"><option>All categories</option>{categories.map(category => <option key={category.slug}>{category.name}</option>)}</select><input autoFocus value={search} onChange={e => setSearch(e.target.value)} placeholder="What are you looking for?" /></div>
          {search && <div className="suggestions">{suggestions.slice(0, 5).map(p => <Link key={p.id} to={`/product/${p.id}`} onClick={() => setSearchOpen(false)}><img src={p.image} alt="" /><div><b>{p.title}</b><span>{money(p.price)}</span></div></Link>)}</div>}
        </div>
      </div>}

      {accountOpen && <div className="overlay" onMouseDown={() => setAccountOpen(false)}><aside className="account-drawer" onMouseDown={e => e.stopPropagation()}><div className="drawer-head"><b>MY ACCOUNT</b><button onClick={() => setAccountOpen(false)}><X /></button></div><AccountPanel /></aside></div>}
    </>
  )
}

function AccountPanel() {
  const [tab, setTab] = useState('login')
  return <div className="account-panel"><div className="account-tabs"><button className={tab === 'login' ? 'active' : ''} onClick={() => setTab('login')}>Sign in</button><button className={tab === 'create' ? 'active' : ''} onClick={() => setTab('create')}>Create an Account</button></div>{tab === 'login' ? <><label>Username or email<input /></label><label>Password<input type="password"/></label><label className="check"><input type="checkbox"/> Remember me</label><button className="btn primary full">Sign In</button><a>Lost your password?</a><hr/><button className="social-login google">Continue with Google</button><button className="social-login">Continue with Facebook</button></> : <><label>Email<input type="email"/></label><label>Password<input type="password"/></label><button className="btn primary full">Create Account</button></>}</div>
}

function MiniCart({ open, onClose, cart, setCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  if (!open) return null
  return <div className="overlay" onMouseDown={onClose}><aside className="cart-drawer" onMouseDown={e => e.stopPropagation()}><div className="drawer-head"><b>Your Cart</b><button onClick={onClose}><X /></button></div>{cart.length === 0 ? <div className="empty-cart"><ShoppingBag/><p>Your cart is empty</p><button className="btn primary" onClick={onClose}>Continue Shopping</button></div> : <><div className="cart-lines">{cart.map(item => <div className="cart-line" key={`${item.id}-${item.color}`}><img src={item.image} alt={item.title}/><div><b>{item.title}</b>{item.color && <small>{item.color}</small>}<span>{money(item.price)}</span><div className="qty"><button onClick={() => setCart(cart.map(x => x.id === item.id && x.color === item.color ? {...x, qty: Math.max(1, x.qty - 1)} : x))}><Minus/></button><b>{item.qty}</b><button onClick={() => setCart(cart.map(x => x.id === item.id && x.color === item.color ? {...x, qty: x.qty + 1} : x))}><Plus/></button></div></div><button className="remove" onClick={() => setCart(cart.filter(x => !(x.id === item.id && x.color === item.color)))}><Trash2/></button></div>)}</div><div className="cart-foot"><div><span>Subtotal</span><b>{money(total)}</b></div><Link to="/cart" onClick={onClose} className="btn secondary full">View Cart</Link><Link to="/checkout" onClick={onClose} className="btn primary full">Checkout</Link></div></>}</aside></div>
}

function ProductCard({ product, onAdd, wishlist, setWishlist }) {
  const navigate = useNavigate()
  const liked = wishlist.includes(product.id)
  return <article className="product-card"><div className="product-image"><Link to={`/product/${product.id}`}><img className="main-img" src={product.image} alt={product.title}/><img className="hover-img" src={product.hover} alt="" /></Link>{product.badge && <div className={`badge ${product.badge === 'Sold out' ? 'soldout' : product.badge === 'New' ? 'new' : 'sale'}`}>{product.badge}</div>}<div className="card-actions"><button className={liked ? 'liked' : ''} onClick={() => setWishlist(liked ? wishlist.filter(id => id !== product.id) : [...wishlist, product.id])} aria-label="Wishlist"><Heart/></button><button aria-label="Quick view" onClick={() => navigate(`/product/${product.id}`)}><Eye/></button></div></div><div className="product-info"><Link to={`/product/${product.id}`}>{product.title}</Link><div className="price"><span>{money(product.price)}</span>{product.oldPrice && <del>{money(product.oldPrice)}</del>}</div><button className="card-add" onClick={() => onAdd(product)}>{product.badge === 'Sold out' ? 'Read More' : 'Add to Cart'}</button></div></article>
}

function SectionTitle({ children }) {
  return <div className="section-title"><h2>{children}</h2><i/></div>
}

function Home({ onAdd, wishlist, setWishlist }) {
  const [slide, setSlide] = useState(0)
  const heroSlides = [
    { title: 'A softer kind of everyday.', label: 'RITI HANDLOOM · THE HOME EDIT', description: 'Thoughtful textiles for the little moments that make a home.', image: image('photo-1505693416388-ac5ce068fe85', 1800, 900), link: '/category/bed-sets', linkText: 'Discover the collection' },
    { title: 'Layers made for living.', label: 'COMFORT, IN EVERY THREAD', description: 'Find your favorite blanket, pillow, and cozy finishing touch.', image: image('photo-1631049307264-da0ec9d70304', 1800, 900), link: '/category/blankets', linkText: 'Shop blankets' },
    { title: 'Rest easy. Wake inspired.', label: 'BEDROOM ESSENTIALS', description: 'Bring fresh color and everyday comfort to your bedroom.', image: bedsheetImages[2].src, link: '/category/bedsheets', linkText: 'Shop bedsheets' }
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

    <section className="section soft"><div className="container"><SectionTitle>WHY CHOOSE US</SectionTitle><div className="trust-grid">{[[BadgeCheck,'Handloom Certified','Authentic artisan craft'],[ShieldCheck,'Natural Fabrics','Comfort you can feel'],[Truck,'Secure Delivery','Carefully packed and shipped'],[RefreshCcw,'Easy Exchange','Simple, customer-first service']].map(([Icon,title,text]) => <div key={title}><Icon/><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>

    <section className="section reviews"><div className="container"><SectionTitle>CUSTOMER'S REVIEW</SectionTitle><div className="review-layout"><div className="rating-summary"><h3>Riti Handloom</h3><b>4.8</b><div>{[1,2,3,4,5].map(n => <Star key={n} fill="currentColor"/>)}</div><p>Out of 5 stars · 126 Google reviews</p></div><div className="review-cards">{[
      ['Ananya Mehta','2 months ago','The saree is beautifully woven and the finish feels so premium. Delivery was quick too.'],
      ['Rohan Kapoor','5 months ago','Excellent cotton bed linen. The colours are exactly as shown and it has softened beautifully.'],
      ['Meera Sethi','1 month ago','Lovely packaging and thoughtful support from the Riti team. Already planning my next order.']
    ].map(([name,time,text]) => <article key={name}><div className="stars">{[1,2,3,4,5].map(n => <Star key={n} fill="currentColor"/>)}</div><p>“{text}”</p><b>{name}</b><small>{time}</small></article>)}</div></div></div></section>

    <section className="instagram"><div className="container"><div className="instagram-head"><h2><Instagram/> @ritihandloom</h2><a className="btn secondary" href="https://instagram.com/ritihandloom" target="_blank">Follow</a></div><div className="insta-grid">{[...products.slice(0,6)].map(p => <a href="https://instagram.com/ritihandloom" target="_blank" key={p.id}><img src={p.image} alt="Riti Handloom on Instagram"/></a>)}</div></div></section>
    <section className="newsletter"><div><small>JOIN OUR COMMUNITY</small><h2>Stories, new arrivals & special offers</h2><form onSubmit={e => e.preventDefault()}><input type="email" placeholder="Your email address" required/><button className="btn primary">Subscribe</button></form></div></section>
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
  const sorted = [...collection].sort((a, b) => sort === 'low' ? a.price-b.price : sort === 'high' ? b.price-a.price : a.id-b.id)
  const filterGroups = {
    Fabric: ['Cotton', 'Cotton Blend', 'Linen', 'Microfiber'],
    Color: ['Indigo', 'Rose', 'Ivory', 'Saffron', 'Green', 'Terracotta'],
    Size: ['Single', 'Double', 'King', 'Super King', 'Standard', 'Set'],
    Price: ['Under ₹1,500', '₹1,500 – ₹3,000', 'Above ₹3,000'],
  }
  return <main className="shop-page"><div className="container">
    <div className="breadcrumb"><Link to="/">Home</Link> / {category ? <><Link to="/shop">Our Collection</Link> / <b>{category.name}</b></> : <b>Our Collection</b>}</div>
    {category && <section className="category-hero"><img src={category.image} alt=""/><div><small>RITI HANDLOOM COLLECTION</small><h1>{category.name}</h1><p>{category.description}</p></div></section>}
    {!category && <h1>Our Collection</h1>}
    <div className="shop-toolbar"><button className="filter-btn" onClick={() => setFiltersOpen(true)}><SlidersHorizontal/> Filter</button><span>{sorted.length} products</span><div><select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort products"><option value="latest">Latest</option><option value="low">Price low to high</option><option value="high">Price high to low</option></select><button className={columns === 3 ? 'active' : ''} onClick={() => setColumns(3)}><Grid3X3/></button><button className={columns === 4 ? 'active' : ''} onClick={() => setColumns(4)}><Grid2X2/></button></div></div>
    <div className="shop-layout"><aside className={filtersOpen ? 'shop-sidebar open' : 'shop-sidebar'}><div className="filter-mobile-head"><b>Categories</b><button onClick={() => setFiltersOpen(false)}><X/></button></div>
      <details open><summary>Categories<ChevronDown/></summary><div className="category-filter-links">{categories.map(item => <Link className={item.slug === categorySlug ? 'active' : ''} key={item.slug} to={`/category/${item.slug}`}>{item.name}</Link>)}</div></details>
      {Object.entries(filterGroups).map(([title, values]) => <details key={title}><summary>{title}<ChevronDown/></summary><div>{values.map(value => <label key={value}><input type="checkbox"/> {value}</label>)}</div></details>)}
    </aside>{filtersOpen && <div className="filter-backdrop" onClick={() => setFiltersOpen(false)}/>}
    {sorted.length ? <div className={`shop-grid cols-${columns}`}>{sorted.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} wishlist={wishlist} setWishlist={setWishlist}/>)}</div> : <div className="category-empty"><h2>No products in this category yet</h2><p>We’re adding new home essentials soon. Browse our other collections in the meantime.</p><Link className="btn primary" to="/shop">Shop all products</Link></div>}
    </div></div></main>
}

function CategoryPage({ onAdd, wishlist, setWishlist }) {
    const { categorySlug } = useParams()
    return <Shop
      categorySlug={categorySlug}
      onAdd={onAdd}
      wishlist={wishlist}
      setWishlist={setWishlist}
    />
}

function ProductPage({ onAdd, wishlist, setWishlist }) {
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id)) || products[0]
  const [qty, setQty] = useState(1)
  const [activeImageByProduct, setActiveImageByProduct] = useState({})
  const [selectedColorByProduct, setSelectedColorByProduct] = useState({})
  const activeImageIndex = activeImageByProduct[product.id] || 0
  const selectedColor = selectedColorByProduct[product.id] || product.colors?.[0]?.name || product.color
  const selectedColorOption = product.colors?.find(color => color.name === selectedColor)
  const galleryImages = selectedColorOption
    ? [{ src: selectedColorOption.src, alt: `${product.title} - ${selectedColorOption.name}` }]
    : product.gallery || [
      { src: product.image, alt: product.title },
      { src: product.hover, alt: `${product.title} detail` },
    ]
  const liked = wishlist.includes(product.id)
  return <main className="product-page"><div className="container"><div className="breadcrumb">Home / {product.category} / <b>{product.title}</b></div><div className="product-detail"><div className="gallery"><img className="gallery-main" src={galleryImages[activeImageIndex].src} alt={galleryImages[activeImageIndex].alt}/><div className="gallery-thumbnails">{galleryImages.map((item, index) => <button key={item.src} className={index === activeImageIndex ? 'active' : ''} onClick={() => setActiveImageByProduct(current => ({...current, [product.id]: index}))} aria-label={`View ${item.alt}`}><img src={item.src} alt=""/></button>)}</div></div><div className="detail-info"><h1>{product.title}</h1><div className="detail-rating"><span>{[1,2,3,4,5].map(n => <Star key={n} fill="currentColor"/>)}</span><small>{product.rating} · 36 reviews</small></div><div className="detail-price"><b>{money(product.price)}</b><del>{money(product.oldPrice)}</del><em>{Math.round((1-product.price/product.oldPrice)*100)}% off</em></div><p>{product.colors ? 'A soft, cozy king size blanket in a range of colors to complement your bedroom.' : 'Crafted in small batches by skilled artisans, this timeless piece brings natural comfort and considered design to your everyday rituals.'}</p><label>Size<select value={product.size} disabled><option>{product.size}</option></select></label><label>Color: {selectedColor}{product.colors ? <div className="blanket-colors">{product.colors.map(color => <button key={color.name} className={selectedColor === color.name ? 'active' : ''} onClick={() => setSelectedColorByProduct(current => ({...current, [product.id]: color.name}))} aria-label={color.name} title={color.name}><img src={color.src} alt=""/></button>)}</div> : <div className="swatches"><button className="active"/><button/><button/></div>}</label><div className="stock"><span/>In stock</div><div className="buy-row"><div className="qty detail-qty"><button onClick={() => setQty(q => Math.max(1,q-1))}><Minus/></button><b>{qty}</b><button onClick={() => setQty(q => q+1)}><Plus/></button></div><button className="btn primary" onClick={() => onAdd({...product, color: selectedColor, image: selectedColorOption?.src || product.image}, qty)}>Add to Cart</button><button className={`wishlist-detail ${liked ? 'liked' : ''}`} onClick={() => setWishlist(liked ? wishlist.filter(x => x !== product.id) : [...wishlist, product.id])}><Heart/></button></div><button className="btn secondary full buy-now">Buy Now</button><a className="whatsapp-link" href="https://wa.me/919555790429" target="_blank"><WhatsApp/> Enquire on WhatsApp</a><div className="detail-trust"><span><ShieldCheck/> Secure payment</span><span><RefreshCcw/> Easy exchange</span><span><Truck/> Free shipping</span></div></div></div><div className="product-tabs"><details open><summary>Description</summary><p>Made for lasting comfort, with natural fibres, artisanal detailing and an easy-care finish.</p></details><details><summary>Specifications</summary><p>Fabric: {product.fabric}<br/>Size: {product.size}<br/>Care: Gentle cold wash. Dry in shade.</p></details><details><summary>Shipping & Exchange</summary><p>Free shipping above ₹1,499. Exchanges accepted within 7 days of delivery.</p></details></div></div></main>
}

function Cart({ cart, setCart }) {
  const navigate = useNavigate()
  const total = cart.reduce((sum,p) => sum + p.price*p.qty, 0)
  return <main className="cart-page"><div className="container"><div className="breadcrumb">Home / <b>Cart</b></div><h1>Shopping Cart</h1>{cart.length === 0 ? <div className="empty-cart page-empty"><ShoppingBag/><p>Your cart is currently empty.</p><Link className="btn primary" to="/shop">Return to Shop</Link></div> : <div className="cart-layout"><div className="cart-table">{cart.map(item => <div className="cart-table-row" key={`${item.id}-${item.color}`}><img src={item.image} alt={item.title}/><div><b>{item.title}</b><small>{item.category} · {item.size}{item.color ? ` · ${item.color}` : ''}</small></div><b>{money(item.price)}</b><div className="qty"><button onClick={() => setCart(cart.map(x => x.id === item.id && x.color === item.color ? {...x,qty:Math.max(1,x.qty-1)} : x))}><Minus/></button><b>{item.qty}</b><button onClick={() => setCart(cart.map(x => x.id === item.id && x.color === item.color ? {...x,qty:x.qty+1} : x))}><Plus/></button></div><button onClick={() => setCart(cart.filter(x => !(x.id === item.id && x.color === item.color)))}><Trash2/></button></div>)}</div><aside className="order-summary"><h3>Order Summary</h3><div><span>Subtotal</span><b>{money(total)}</b></div><div><span>Shipping</span><b>{total >= 1499 ? 'Free' : '₹99'}</b></div><hr/><div className="grand-total"><span>Total</span><b>{money(total + (total >= 1499 ? 0 : 99))}</b></div><button className="btn primary full" onClick={() => navigate('/checkout')}>Proceed to Checkout</button></aside></div>}</div></main>
}

function Checkout() {
  const [complete, setComplete] = useState(false)
  if (complete) return <main className="confirmation"><BadgeCheck/><h1>Thank you for your order</h1><p>Order #RITI-10284 has been confirmed.</p><Link className="btn primary" to="/">Continue Shopping</Link></main>
  return <main className="checkout"><div className="container"><h1>Checkout</h1><div className="checkout-layout"><form onSubmit={e => {e.preventDefault(); setComplete(true)}}><h3>Contact & Delivery</h3><div className="form-grid"><label>Full name<input required/></label><label>Phone number<input required/></label><label>Email address<input type="email" required/></label><label>Pincode<input required pattern="[0-9]{6}"/></label><label className="span-2">Address<input required/></label><label>City<input required/></label><label>State<input required/></label></div><h3>Payment</h3><label className="payment"><input type="radio" name="payment" defaultChecked/> UPI / Cards / Netbanking</label><label className="payment"><input type="radio" name="payment"/> Cash on Delivery</label><button className="btn primary full">Place Order</button></form><aside className="order-summary"><h3>Your Order</h3><div><span>Subtotal</span><b>Calculated at cart</b></div><div><span>Shipping</span><b>Free</b></div><hr/><div className="grand-total"><span>Total</span><b>Secure checkout</b></div></aside></div></div></main>
}

function StaticPage({ title }) {
  return <main className="static-page"><div className="container"><div className="breadcrumb">Home / <b>{title}</b></div><h1>{title}</h1>{title === 'About the Brand' ? <div className="about-page">
    <section className="about-intro">
      <div className="about-copy"><small>THE RITI HANDLOOM STORY</small><h2>Comfort, character and thoughtful details for your home.</h2><p>We believe the little details make a house feel like yours. Riti Handloom brings together bedsheets, blankets, pillows, pillow covers and everyday home textiles chosen to make your spaces feel more comfortable and personal.</p><p>From soft layers for the bedroom to finishing touches for the living room, explore pieces made to feel at home in your everyday routine.</p><Link className="btn primary" to="/shop">Explore our collection</Link></div>
      <div className="about-image-grid"><img className="about-image-main" src="/products/blanket-category.jpg" alt="Riti Handloom floral blanket styled in a bedroom"/><img src="/products/pillow-pair.jpg" alt="Soft cotton pillow pair"/><img src="/products/pillow-cover-set.jpg" alt="Decorative pillow cover set"/></div>
    </section>
    <section className="about-values"><div className="about-section-heading"><small>WHAT MATTERS TO US</small><h2>Made for the feeling of home</h2></div><div className="about-value-grid"><article><span>01</span><h3>Everyday comfort</h3><p>Home textiles should feel inviting, practical and easy to enjoy every day.</p></article><article><span>02</span><h3>Considered details</h3><p>Color, texture and finishing touches help bring warmth and personality to a room.</p></article><article><span>03</span><h3>Choices for your space</h3><p>Discover bedroom and home essentials to mix, match and make your own.</p></article></div></section>
    <section className="about-cta"><div><small>FIND YOUR NEW FAVORITES</small><h2>A little more comfort, one room at a time.</h2></div><Link className="btn secondary" to="/shop">Shop home essentials <ArrowRight size={16}/></Link></section>
  </div> : <div className="policy-content"><p>Our team is happy to help with product, order and delivery information.</p><h3>Get in touch</h3><p><Phone size={16}/> +91 95557 90429</p><p><Mail size={16}/> hello@ritihandloom.in</p><p><MapPin size={16}/> Jagat Farm, Greater Noida, Uttar Pradesh</p></div>}</div></main>
}

function Footer() {
  return <footer className="footer"><div className="container footer-grid"><div><div className="footer-brand">RITI <small>HANDLOOM</small></div><p>Woven with tradition, made for your home.</p></div><div><h3>ONLINE SHOPPING</h3>{categories.slice(0,4).map(category => <Link key={category.slug} to={`/category/${category.slug}`}>{category.name}</Link>)}</div><div><h3>HOME COLLECTIONS</h3>{categories.slice(4).map(category => <Link key={category.slug} to={`/category/${category.slug}`}>{category.name}</Link>)}</div><div><h3>GET IN TOUCH</h3><a href="tel:+919555790429">Call Us: +91 95557 90429</a><a href="mailto:hello@ritihandloom.in">hello@ritihandloom.in</a><a href="https://wa.me/919555790429">Chat on WhatsApp</a><div className="socials"><Instagram/><a href="https://instagram.com/ritihandloom">Instagram</a></div></div></div><div className="container footer-bottom"><span>© 2026 Riti Handloom</span><span>UPI · VISA · Mastercard · COD</span></div></footer>
}

function App() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('riti-cart') || '[]'))
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('riti-wishlist') || '[]'))
  const [cartOpen, setCartOpen] = useState(false)
  useEffect(() => localStorage.setItem('riti-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('riti-wishlist', JSON.stringify(wishlist)), [wishlist])
  const cartCount = cart.reduce((sum, p) => sum + p.qty, 0)
  const cartTotal = cart.reduce((sum, p) => sum + p.price*p.qty, 0)
  const addToCart = (product, qty = 1) => { setCart(prev => { const found = prev.find(p => p.id === product.id && p.color === product.color); return found ? prev.map(p => p.id === product.id && p.color === product.color ? {...p, qty:p.qty+qty} : p) : [...prev, {...product, qty}] }); setCartOpen(true) }
  return <BrowserRouter><div className="app"><Header cartCount={cartCount} cartTotal={cartTotal} onCart={() => setCartOpen(true)} wishlistCount={wishlist.length}/><Routes><Route path="/" element={<Home onAdd={addToCart} wishlist={wishlist} setWishlist={setWishlist}/>}/><Route path="/shop" element={<Shop onAdd={addToCart} wishlist={wishlist} setWishlist={setWishlist}/>}/><Route path="/category/:categorySlug" element={<CategoryPage onAdd={addToCart} wishlist={wishlist} setWishlist={setWishlist}/>}/><Route path="/product/:id" element={<ProductPage onAdd={addToCart} wishlist={wishlist} setWishlist={setWishlist}/>}/><Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>}/><Route path="/checkout" element={<Checkout/>}/><Route path="/about" element={<StaticPage title="About the Brand"/>}/><Route path="/wishlist" element={<Shop onAdd={addToCart} wishlist={wishlist} setWishlist={setWishlist}/>}/><Route path="/page/:title" element={<StaticPage title="Shipping & Policies"/>}/></Routes><Footer/><MiniCart open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} setCart={setCart}/><a className="floating-whatsapp" href="https://wa.me/919555790429" target="_blank" aria-label="WhatsApp"><WhatsApp/></a><nav className="mobile-toolbar"><Link to="/shop"><Grid2X2/><span>Shop</span></Link><button><Search/><span>Search</span></button><Link to="/wishlist"><Heart/><span>Wishlist</span></Link><button onClick={() => setCartOpen(true)}><ShoppingBag/><span>Cart</span></button><button><UserRound/><span>Account</span></button></nav></div></BrowserRouter>
}

export default App
