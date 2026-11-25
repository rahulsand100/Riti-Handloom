export const image = (id, w = 900, h = 1100) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=82`

export const bedsheetImages = [
  { src: '/products/bedsheet-front.jpg', alt: 'Floral bedsheet front view' },
  { src: '/products/bedsheet-side.jpg', alt: 'Floral bedsheet side angle' },
  { src: '/products/bedsheet-aerial.jpg', alt: 'Floral bedsheet aerial view' },
  { src: '/products/bedsheet-fitted.jpg', alt: 'Floral king fitted bedsheet' },
  { src: '/products/bedsheet-pillow.jpg', alt: 'Matching floral pillow close-up' },
  { src: '/products/bedsheet-zoom.jpg', alt: 'Floral bedsheet print detail' },
]

export const products = [
  { id: 1, title: 'Floral Print Cotton Bedsheet Set', image: bedsheetImages[0].src, hover: bedsheetImages[1].src, gallery: bedsheetImages, badge: 'New Arrival', category: 'Bedsheets' },
  { id: 2, title: 'King Size Blanket', image: '/products/king-blanket-color-6.webp', hover: '/products/king-blanket-color-1.webp', badge: 'Featured', category: 'Blankets' },
  { id: 3, title: 'Ivory Woven Cotton Dohar', image: image('photo-1615874694520-474822394e73'), hover: image('photo-1522771753035-1a64ed6f5d4d'), category: 'Dohars' },
  { id: 4, title: 'Saffron Cotton Bed Linen Set', image: image('photo-1505693416388-ac5ce068fe85'), hover: image('photo-1631049307264-da0ec9d70304'), badge: 'New Arrival', category: 'Bed Sets' },
  { id: 5, title: 'Forest Green Bath Towel', image: image('photo-1584622650111-993a426fbf0a'), hover: image('photo-1585411498137-20a1e7ca2e5a'), category: 'Towels' },
  { id: 6, title: 'Decorative Pillow Cover Set', image: '/products/pillow-cover-set.jpg', hover: '/products/pillow-cover-set.jpg', gallery: [{ src: '/products/pillow-cover-set.jpg', alt: 'Decorative pillow cover set' }], category: 'Pillow Covers' },
  { id: 7, title: 'Soft Cotton Pillow Pair', image: '/products/pillow-pair.jpg', hover: '/products/pillow-pair.jpg', gallery: [{ src: '/products/pillow-pair.jpg', alt: 'Pair of soft cotton pillows' }], category: 'Pillows' },
  { id: 8, title: 'Terracotta Handwoven Area Carpet', image: image('photo-1600166898405-da9535204843'), hover: image('photo-1575414003591-ece8d0416c7a'), badge: 'Handcrafted', category: 'Carpets' },
]

export const categories = [
  { name: 'Bedsheets', slug: 'bedsheets', image: bedsheetImages[0].src, description: 'Comfortable cotton bedsheets for a restful night.' },
  { name: 'Pillows', slug: 'pillows', image: '/products/pillow-pair.jpg', description: 'Soft, supportive pillows for everyday comfort.' },
  { name: 'Pillow Covers', slug: 'pillow-covers', image: '/products/pillow-cover-set.jpg', description: 'Fresh designs to complete your bedding.' },
  { name: 'Blankets', slug: 'blankets', image: '/products/blanket-category.jpg', description: 'Cozy blankets in soothing artisan shades.' },
  { name: 'Dohars', slug: 'dohars', image: products[2].image, description: 'Lightweight, breathable layers for your bedroom.' },
  { name: 'Carpets', slug: 'carpets', image: products[7].image, description: 'Woven floor accents to bring warmth into your home.' },
  { name: 'Towels', slug: 'towels', image: products[4].image, description: 'Soft cotton towels for a comfortable daily routine.' },
  { name: 'Bed Sets', slug: 'bed-sets', image: products[3].image, description: 'Coordinated bedding essentials, ready for your room.' },
]

export const categorySlugByName = {
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

export const categoryPath = (name) => `/category/${categorySlugByName[name] || 'bedsheets'}`
