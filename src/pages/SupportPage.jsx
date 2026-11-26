import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle as WhatsApp } from 'lucide-react'
import { SEO } from '../components/common/SEO.jsx'
import { useSanityCatalog } from '../context/useSanityCatalog.js'
import { getCanonicalUrl } from '../lib/config.js'
import {
  generateCustomerSupportMessage,
  getWhatsAppUrl,
  isValidIndianMobileNumber
} from '../lib/whatsapp.js'

const requestTypes = [
  'Return Request',
  'Replacement Request',
  'Damaged Product',
  'Incorrect Product Received',
  'Product Quality Concern',
  'Order / Purchase Query',
  'General Customer Support'
]

const initialForm = {
  customerName: '',
  mobileNumber: '',
  requestType: '',
  productName: '',
  purchaseDate: '',
  orderNumber: '',
  additionalDetails: ''
}

function getValidationErrors(form) {
  return {
    customerName: form.customerName.trim() ? '' : 'Please enter your name.',
    mobileNumber: isValidIndianMobileNumber(form.mobileNumber)
      ? ''
      : 'Enter a valid 10-digit Indian mobile number.',
    requestType: form.requestType ? '' : 'Select a reason for contacting us.',
    productName: form.productName.trim() ? '' : 'Enter the product name.',
    additionalDetails: form.additionalDetails.trim() ? '' : 'Tell us how we can help.'
  }
}

export function SupportPage() {
  const { siteSettings } = useSanityCatalog()
  const [form, setForm] = useState(initialForm)
  const [touched, setTouched] = useState({})
  const errors = getValidationErrors(form)
  const isValid = Object.values(errors).every(error => !error)
  const needsOrderNumber = ['Return Request', 'Replacement Request'].includes(form.requestType)

  const updateField = event => {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
  }

  const markTouched = event => {
    const { name } = event.target
    setTouched(current => ({ ...current, [name]: true }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!isValid) return

    const message = generateCustomerSupportMessage(form)
    const url = getWhatsAppUrl(message, siteSettings?.primaryWhatsAppNumber)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const renderError = name => touched[name] && errors[name]
    ? <small className="field-error" role="alert">{errors[name]}</small>
    : null

  return (
    <main className="support-page">
      <SEO
        title="Customer Support | Riti Handlooms"
        description="Contact Riti Handlooms on WhatsApp for help with a purchase, return, replacement, or product enquiry."
        url={getCanonicalUrl('/support')}
      />
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <b>Help &amp; Support</b>
        </div>
        <section className="support-intro">
          <span className="support-eyebrow">RITI HANDLOOMS · HERE TO HELP</span>
          <h1>How Can We Help You?</h1>
          <p>
            Need assistance with a purchase, return, replacement, or product enquiry?
            Contact our team directly on WhatsApp.
          </p>
        </section>

        <div className="support-layout">
          <form className="support-form" onSubmit={handleSubmit} noValidate>
            <div className="support-form-heading">
              <h2>Tell us what you need</h2>
              <p>Our team will review your message and guide you on the next steps.</p>
            </div>
            <div className="support-fields-grid">
              <label className="support-field">
                <span>Customer Name <i>*</i></span>
                <input
                  type="text"
                  name="customerName"
                  autoComplete="name"
                  value={form.customerName}
                  onChange={updateField}
                  onBlur={markTouched}
                  required
                  aria-invalid={Boolean(touched.customerName && errors.customerName)}
                />
                {renderError('customerName')}
              </label>

              <label className="support-field">
                <span>Mobile Number <i>*</i></span>
                <input
                  type="tel"
                  name="mobileNumber"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+91 98765 43210"
                  value={form.mobileNumber}
                  onChange={updateField}
                  onBlur={markTouched}
                  required
                  aria-invalid={Boolean(touched.mobileNumber && errors.mobileNumber)}
                />
                {renderError('mobileNumber')}
              </label>

              <label className="support-field">
                <span>Reason for Contact <i>*</i></span>
                <select
                  name="requestType"
                  value={form.requestType}
                  onChange={updateField}
                  onBlur={markTouched}
                  required
                  aria-invalid={Boolean(touched.requestType && errors.requestType)}
                >
                  <option value="">Select a reason</option>
                  {requestTypes.map(type => <option key={type}>{type}</option>)}
                </select>
                {renderError('requestType')}
              </label>

              <label className="support-field">
                <span>Product Name <i>*</i></span>
                <input
                  type="text"
                  name="productName"
                  value={form.productName}
                  onChange={updateField}
                  onBlur={markTouched}
                  required
                  aria-invalid={Boolean(touched.productName && errors.productName)}
                />
                {renderError('productName')}
              </label>

              <label className="support-field">
                <span>Purchase Date <small>(Optional)</small></span>
                <input
                  type="date"
                  name="purchaseDate"
                  value={form.purchaseDate}
                  onChange={updateField}
                  onBlur={markTouched}
                />
              </label>

              <label className="support-field">
                <span>Order Number / Bill Number <small>(Optional)</small></span>
                <input
                  type="text"
                  name="orderNumber"
                  value={form.orderNumber}
                  onChange={updateField}
                  onBlur={markTouched}
                  aria-describedby={needsOrderNumber ? 'support-order-hint' : undefined}
                />
                {needsOrderNumber && (
                  <small className="support-field-hint" id="support-order-hint">
                    If available, this can help us understand your return or replacement request.
                  </small>
                )}
              </label>
            </div>

            <label className="support-field support-details-field">
              <span>Additional Details <i>*</i></span>
              <textarea
                name="additionalDetails"
                rows={5}
                value={form.additionalDetails}
                onChange={updateField}
                onBlur={markTouched}
                required
                aria-invalid={Boolean(touched.additionalDetails && errors.additionalDetails)}
              />
              {renderError('additionalDetails')}
            </label>

            <p className="support-photo-note">
              If your product has damage or a quality issue, please attach relevant photographs after opening WhatsApp.
            </p>
            <button type="submit" className="btn primary support-submit" disabled={!isValid}>
              <WhatsApp size={18} />
              Continue to WhatsApp
              <ArrowRight size={17} />
            </button>
            <p className="support-submit-hint">
              WhatsApp opens with a prepared message. Review it and choose whether to send it.
            </p>
          </form>

          <aside className="support-side-note">
            <div className="support-side-mark"><WhatsApp size={21} /></div>
            <h2>Personal support, directly with our team.</h2>
            <p>
              This form prepares a WhatsApp message using the details you provide. Your request is not automatically
              approved; our team will discuss the applicable process with you.
            </p>
            <Link to="/shop">Explore the collection <ArrowRight size={15} /></Link>
          </aside>
        </div>
      </div>
    </main>
  )
}
