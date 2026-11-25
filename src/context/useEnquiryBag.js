import { useContext } from 'react'
import { EnquiryBagContext } from './EnquiryBagContext.js'

export function useEnquiryBag() {
  const context = useContext(EnquiryBagContext)
  if (!context) {
    throw new Error('useEnquiryBag must be used within an EnquiryBagProvider')
  }
  return context
}
