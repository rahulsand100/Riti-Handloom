import { useState } from 'react'
import { X, Package, MessageCircle as WhatsApp } from 'lucide-react'
import { buildBulkWholesaleEnquiryUrl } from '../../lib/whatsapp.js'

export function BulkEnquiryModal({ open, onClose }) {
  const [category, setCategory] = useState('Bedsheets & Home Linen')
  const [quantity, setQuantity] = useState('50+ units')
  const [businessName, setBusinessName] = useState('')
  const [location, setLocation] = useState('')

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const url = buildBulkWholesaleEnquiryUrl({
      category,
      quantity,
      businessName: businessName.trim(),
      location: location.trim()
    })
    window.open(url, '_blank')
    onClose()
  }

  return (
    <div className="overlay" onMouseDown={onClose}>
      <div className="bulk-modal" onMouseDown={e => e.stopPropagation()}>
        <div className="bulk-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="bulk-modal-icon">
              <Package size={20} />
            </div>
            <div>
              <h3>Wholesale & Bulk Enquiry</h3>
              <small>Special quotation for hotels, guest houses, and corporate gifting</small>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close modal" className="menu-close-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bulk-modal-form">
          <label>
            <span>Product Category</span>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option>Bedsheets & Home Linen</option>
              <option>Towels & Bath Sets</option>
              <option>Blankets & Dohars</option>
              <option>Pillows & Cushion Covers</option>
              <option>Carpets & Rugs</option>
              <option>Mixed Assorted Furnishings</option>
            </select>
          </label>

          <label>
            <span>Estimated Quantity</span>
            <select value={quantity} onChange={e => setQuantity(e.target.value)}>
              <option>25 – 50 units (Small Batch)</option>
              <option>50 – 100 units (Standard Bulk)</option>
              <option>100 – 250 units (Institutional)</option>
              <option>250+ units (Wholesale / Hotel)</option>
            </select>
          </label>

          <label>
            <span>Business / Client Name (Optional)</span>
            <input
              type="text"
              placeholder="e.g. Heritage Residency or Ayush"
              value={businessName}
              onChange={e => setBusinessName(e.target.value)}
            />
          </label>

          <label>
            <span>Delivery City / Pincode</span>
            <input
              type="text"
              placeholder="e.g. Greater Noida, Delhi NCR, Mumbai"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </label>

          <button
            type="submit"
            className="btn primary full"
            style={{
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: '#25D366'
            }}
          >
            <WhatsApp size={18} /> Generate Wholesale WhatsApp Quote
          </button>
        </form>
      </div>
    </div>
  )
}
