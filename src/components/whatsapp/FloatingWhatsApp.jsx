import { useState } from 'react'
import {
  MessageCircle as WhatsApp, X, Phone, Layers, Package
} from 'lucide-react'
import {
  buildBulkWholesaleEnquiryUrl,
  buildGeneralEnquiryUrl
} from '../../lib/whatsapp.js'

export function FloatingWhatsApp({ onOpenBulkModal }) {
  const [isOpen, setIsOpen] = useState(false)

  const generalChatUrl = buildGeneralEnquiryUrl('product enquiries and availability')

  const handleBulkClick = (e) => {
    e.preventDefault()
    setIsOpen(false)
    if (onOpenBulkModal) {
      onOpenBulkModal()
    } else {
      window.open(buildBulkWholesaleEnquiryUrl(), '_blank')
    }
  }

  return (
    <div className="floating-whatsapp-container">
      {isOpen && (
        <div className="floating-whatsapp-menu">
          <div className="floating-menu-header">
            <div>
              <b>Riti Handlooms</b>
              <small>Artisan Workshop · Greater Noida</small>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close contact menu"
              className="menu-close-btn"
            >
              <X size={16} />
            </button>
          </div>

          <div className="floating-menu-options">
            <a
              href={generalChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="floating-menu-item"
              onClick={() => setIsOpen(false)}
            >
              <div className="item-icon green">
                <WhatsApp size={16} />
              </div>
              <div>
                <b>Chat on WhatsApp</b>
                <small>Direct reply from our weaving workshop</small>
              </div>
            </a>

            <button
              type="button"
              className="floating-menu-item"
              onClick={handleBulkClick}
            >
              <div className="item-icon gold">
                <Package size={16} />
              </div>
              <div>
                <b>Wholesale & Bulk Orders</b>
                <small>Catalogue & bulk rates for 50+ units</small>
              </div>
            </button>

            <a
              href="tel:+919555790429"
              className="floating-menu-item"
              onClick={() => setIsOpen(false)}
            >
              <div className="item-icon charcoal">
                <Phone size={16} />
              </div>
              <div>
                <b>Call Workshop Direct</b>
                <small>+91 95557 90429 (10 AM – 8 PM)</small>
              </div>
            </a>
          </div>

          <div className="floating-menu-footer">
            <small>
              <Layers size={11} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
              Direct Handloom Provenance · Zero Markup
            </small>
          </div>
        </div>
      )}

      <button
        type="button"
        className={`floating-whatsapp-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="WhatsApp quick contact menu"
      >
        {isOpen ? <X size={24} /> : <WhatsApp size={28} />}
        {!isOpen && <span className="whatsapp-pulse-ring" />}
      </button>
    </div>
  )
}
