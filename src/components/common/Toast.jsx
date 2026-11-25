import { useEffect } from 'react'
import { ShoppingBag, ArrowRight } from 'lucide-react'

export function Toast({ message, actionLabel, onAction, onClose, duration = 4000 }) {
  useEffect(() => {
    if (!duration) return
    const timer = setTimeout(() => {
      if (onClose) onClose()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className="toast-notification">
      <div className="toast-content">
        <div className="toast-icon">
          <ShoppingBag size={16} />
        </div>
        <span>{message}</span>
      </div>
      {actionLabel && (
        <button type="button" className="toast-action" onClick={onAction}>
          {actionLabel} <ArrowRight size={13} />
        </button>
      )}
    </div>
  )
}
