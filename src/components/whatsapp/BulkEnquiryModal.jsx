import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Package, Plus, Trash2, X, MessageCircle as WhatsApp } from 'lucide-react'
import { useSanityCatalog } from '../../context/useSanityCatalog.js'
import { buildWholesaleEnquiryUrl, isValidIndianMobileNumber } from '../../lib/whatsapp.js'

const emptyCustomer = {
  name: '',
  mobile: '',
  pincode: '',
  city: '',
  state: '',
  address: ''
}

function getCustomerErrors(customer) {
  return {
    name: customer.name.trim() ? '' : 'Enter your name.',
    mobile: isValidIndianMobileNumber(customer.mobile) ? '' : 'Enter a valid 10-digit Indian mobile number.',
    pincode: /^\d{6}$/.test(customer.pincode.trim()) ? '' : 'Enter a valid 6-digit pincode.',
    city: customer.city.trim() ? '' : 'Enter your city.',
    state: customer.state.trim() ? '' : 'Enter your state.',
    address: customer.address.trim() ? '' : 'Enter your full delivery address.'
  }
}

export function BulkEnquiryModal({ open, onClose }) {
  const { categories, products, siteSettings, loading } = useSanityCatalog()
  const [step, setStep] = useState('products')
  const [selectedItems, setSelectedItems] = useState([])
  const [categorySlug, setCategorySlug] = useState('')
  const [productSearch, setProductSearch] = useState('')
  const [productId, setProductId] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [customer, setCustomer] = useState(emptyCustomer)
  const [detailsAttempted, setDetailsAttempted] = useState(false)
  const [pickerError, setPickerError] = useState('')

  const availableCategories = useMemo(() => {
    if (categories.length > 0) return categories
    const seen = new Set()
    return products.reduce((result, product) => {
      const slug = product.categorySlug || product.category
      if (slug && !seen.has(slug)) {
        seen.add(slug)
        result.push({ slug, name: product.category })
      }
      return result
    }, [])
  }, [categories, products])

  const activeCategory = categorySlug || availableCategories[0]?.slug || ''
  const filteredProducts = products.filter(product => {
    const matchesCategory = product.categorySlug
      ? product.categorySlug === activeCategory
      : product.category === availableCategories.find(category => category.slug === activeCategory)?.name
    return matchesCategory && product.title.toLowerCase().includes(productSearch.trim().toLowerCase())
  })
  const selectedProductIds = new Set(selectedItems.map(item => item.id))
  const customerErrors = getCustomerErrors(customer)
  const detailsValid = Object.values(customerErrors).every(error => !error)
  const selectedQuantitiesValid = selectedItems.every(item =>
    Number.isSafeInteger(Number(item.quantity)) && Number(item.quantity) > 0
  )

  if (!open) return null

  const updateCustomer = (field, value) => {
    setCustomer(current => ({ ...current, [field]: value }))
  }

  const handleAddProduct = () => {
    const selectedProduct = products.find(product => product.id === productId)
    const parsedQuantity = Number(quantity)
    if (!selectedProduct) {
      setPickerError('Choose a product from the selected category.')
      return
    }
    if (!Number.isSafeInteger(parsedQuantity) || parsedQuantity < 1) {
      setPickerError('Enter a whole-number quantity greater than zero.')
      return
    }
    if (selectedProductIds.has(selectedProduct.id)) {
      setPickerError('This product is already in your enquiry.')
      return
    }

    setSelectedItems(items => [...items, {
      id: selectedProduct.id,
      title: selectedProduct.title,
      category: selectedProduct.category,
      quantity: parsedQuantity
    }])
    setProductId('')
    setProductSearch('')
    setQuantity('1')
    setPickerError('')
  }

  const handleDetailsSubmit = event => {
    event.preventDefault()
    setDetailsAttempted(true)
    if (detailsValid) setStep('review')
  }

  const handleOpenWhatsApp = () => {
    const url = buildWholesaleEnquiryUrl({
      items: selectedItems,
      customer,
      phone: siteSettings?.primaryWhatsAppNumber
    })
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const renderCustomerField = (field, label, props = {}) => (
    <label className="wholesale-field" key={field}>
      <span>{label}</span>
      {props.multiline ? (
        <textarea
          value={customer[field]}
          onChange={event => updateCustomer(field, event.target.value)}
          onBlur={() => setDetailsAttempted(true)}
          rows={3}
          required
          aria-invalid={detailsAttempted && Boolean(customerErrors[field])}
        />
      ) : (
        <input
          type={props.type || 'text'}
          value={customer[field]}
          onChange={event => updateCustomer(field, event.target.value)}
          onBlur={() => setDetailsAttempted(true)}
          required
          inputMode={props.inputMode}
          maxLength={props.maxLength}
          aria-invalid={detailsAttempted && Boolean(customerErrors[field])}
        />
      )}
      {detailsAttempted && customerErrors[field] && (
        <small className="field-error" role="alert">{customerErrors[field]}</small>
      )}
    </label>
  )

  return (
    <div className="overlay overlay-center wholesale-overlay" onMouseDown={onClose}>
      <section
        className="bulk-modal wholesale-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wholesale-modal-title"
        onMouseDown={event => event.stopPropagation()}
      >
        <div className="bulk-modal-header">
          <div className="wholesale-modal-title">
            <div className="bulk-modal-icon"><Package size={20} /></div>
            <div>
              <h3 id="wholesale-modal-title">Wholesale & Bulk Enquiry</h3>
              <small>Build your product list, then review your delivery details.</small>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close wholesale enquiry" className="menu-close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="wholesale-steps" aria-label="Enquiry steps">
          <span className={step === 'products' ? 'active' : ''}>1. Products</span>
          <span className={step === 'details' ? 'active' : ''}>2. Details</span>
          <span className={step === 'review' ? 'active' : ''}>3. Review</span>
        </div>

        {step === 'products' && (
          <div className="bulk-modal-form wholesale-form">
            <h4>What would you like to enquire about?</h4>
            {selectedItems.length > 0 && (
              <div className="wholesale-selected-list">
                <h5>Selected Products ({selectedItems.length})</h5>
                {selectedItems.map(item => (
                  <div className="wholesale-selected-item" key={item.id}>
                    <div>
                      <b>{item.title}</b>
                      <small>{item.category} · Quantity: {item.quantity}</small>
                    </div>
                    <label>
                      <span className="visually-hidden">Quantity for {item.title}</span>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={item.quantity}
                        onChange={event => {
                          const nextQuantity = event.target.value
                          setSelectedItems(items => items.map(selected =>
                            selected.id === item.id
                              ? { ...selected, quantity: nextQuantity }
                              : selected
                          ))
                        }}
                        onBlur={() => {
                          setSelectedItems(items => items.map(selected =>
                            selected.id === item.id
                              ? {
                                  ...selected,
                                  quantity: Number.isSafeInteger(Number(selected.quantity)) && Number(selected.quantity) > 0
                                    ? Number(selected.quantity)
                                    : 1
                                }
                              : selected
                          ))
                        }}
                      />
                    </label>
                    <button
                      type="button"
                      className="wholesale-remove"
                      onClick={() => setSelectedItems(items => items.filter(selected => selected.id !== item.id))}
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="wholesale-picker">
              <label className="wholesale-field">
                <span>Product Category</span>
                <select
                  value={activeCategory}
                  onChange={event => {
                    setCategorySlug(event.target.value)
                    setProductId('')
                    setProductSearch('')
                  }}
                  disabled={availableCategories.length === 0}
                >
                  {availableCategories.map(category => (
                    <option key={category.slug} value={category.slug}>{category.name}</option>
                  ))}
                </select>
              </label>
              <label className="wholesale-field">
                <span>Search Products</span>
                <input
                  type="search"
                  placeholder="Type a product name"
                  value={productSearch}
                  onChange={event => {
                    setProductSearch(event.target.value)
                    setProductId('')
                  }}
                />
              </label>
              <label className="wholesale-field">
                <span>Select Product</span>
                <select value={productId} onChange={event => setProductId(event.target.value)}>
                  <option value="">Choose a product</option>
                  {filteredProducts.map(product => (
                    <option key={product.id} value={product.id} disabled={selectedProductIds.has(product.id)}>
                      {product.title}{selectedProductIds.has(product.id) ? ' (Already added)' : ''}
                    </option>
                  ))}
                </select>
                {!loading && filteredProducts.length === 0 && (
                  <small className="wholesale-hint">No products match this category and search.</small>
                )}
              </label>
              <label className="wholesale-field">
                <span>Quantity</span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={quantity}
                  onChange={event => setQuantity(event.target.value)}
                />
              </label>
              {pickerError && <p className="field-error" role="alert">{pickerError}</p>}
              <button
                type="button"
                className="btn secondary wholesale-add-product"
                onClick={handleAddProduct}
                disabled={!productId || !Number.isSafeInteger(Number(quantity)) || Number(quantity) < 1}
              >
                <Plus size={17} />
                {selectedItems.length ? 'Add Another Product' : 'Add Product'}
              </button>
            </div>

            <div className="wholesale-step-actions">
              <button
                type="button"
                className="btn primary"
                onClick={() => setStep('details')}
                disabled={selectedItems.length === 0 || !selectedQuantitiesValid}
              >
                Continue to Details <ArrowRight size={17} />
              </button>
            </div>
          </div>
        )}

        {step === 'details' && (
          <form className="bulk-modal-form wholesale-form" onSubmit={handleDetailsSubmit} noValidate>
            <h4>Delivery & contact details</h4>
            <div className="wholesale-fields-grid">
              {renderCustomerField('name', 'Customer Name')}
              {renderCustomerField('mobile', 'Mobile Number', { inputMode: 'tel', maxLength: 16 })}
              {renderCustomerField('pincode', 'Pincode', { inputMode: 'numeric', maxLength: 6 })}
              {renderCustomerField('city', 'City')}
              {renderCustomerField('state', 'State')}
              {renderCustomerField('address', 'Full Delivery Address', { multiline: true })}
            </div>
            <div className="wholesale-step-actions">
              <button type="button" className="btn secondary" onClick={() => setStep('products')}>
                <ArrowLeft size={17} /> Edit Products
              </button>
              <button type="submit" className="btn primary">
                Review Enquiry <ArrowRight size={17} />
              </button>
            </div>
          </form>
        )}

        {step === 'review' && (
          <div className="bulk-modal-form wholesale-form">
            <h4>Review your wholesale enquiry</h4>
            <div className="wholesale-review-block">
              <div className="wholesale-review-heading">
                <h5>Selected Products</h5>
                <button type="button" onClick={() => setStep('products')}>Edit Products</button>
              </div>
              <ol>
                {selectedItems.map(item => (
                  <li key={item.id}>
                    <b>{item.title}</b>
                    <span>Category: {item.category}</span>
                    <span>Quantity: {item.quantity}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="wholesale-review-block">
              <div className="wholesale-review-heading">
                <h5>Customer & Delivery Details</h5>
                <button type="button" onClick={() => setStep('details')}>Edit Details</button>
              </div>
              <dl className="wholesale-review-details">
                <div><dt>Customer Name</dt><dd>{customer.name}</dd></div>
                <div><dt>Mobile Number</dt><dd>{customer.mobile}</dd></div>
                <div><dt>Pincode</dt><dd>{customer.pincode}</dd></div>
                <div><dt>City</dt><dd>{customer.city}</dd></div>
                <div><dt>State</dt><dd>{customer.state}</dd></div>
                <div><dt>Full Delivery Address</dt><dd>{customer.address}</dd></div>
              </dl>
            </div>
            <div className="wholesale-step-actions">
              <button type="button" className="btn secondary" onClick={() => setStep('details')}>
                <ArrowLeft size={17} /> Edit Details
              </button>
              <button type="button" className="btn primary wholesale-whatsapp" onClick={handleOpenWhatsApp}>
                <WhatsApp size={18} /> Generate Wholesale WhatsApp Enquiry
              </button>
            </div>
            <p className="wholesale-hint">WhatsApp will open with this message for you to review and send.</p>
          </div>
        )}
      </section>
    </div>
  )
}
