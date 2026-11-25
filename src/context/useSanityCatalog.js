import { useContext } from 'react'
import { SanityCatalogContext } from './SanityCatalogContext.js'

export function useSanityCatalog() {
  const context = useContext(SanityCatalogContext)
  if (!context) {
    throw new Error('useSanityCatalog must be used within a SanityCatalogProvider')
  }
  return context
}
