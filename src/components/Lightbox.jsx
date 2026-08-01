import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from './Icons'

/**
 * Full-screen image viewer with prev/next.
 *
 * Keyboard: ← → to move, Escape to close. Focus is moved into the dialog on
 * open and returned to whatever opened it on close, and a tab guard keeps
 * focus inside while it is up.
 */
export default function Lightbox({ images, index, title, onClose, onIndexChange }) {
  const dialogRef = useRef(null)
  const openerRef = useRef(null)

  const count = images.length
  const go = useCallback(
    (next) => onIndexChange(((next % count) + count) % count),
    [count, onIndexChange],
  )

  useEffect(() => {
    openerRef.current = document.activeElement
    dialogRef.current?.focus()

    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      else if (event.key === 'ArrowRight') go(index + 1)
      else if (event.key === 'ArrowLeft') go(index - 1)
      else if (event.key === 'Tab') {
        // single focus scope — keep tabbing inside the dialog
        const focusable = dialogRef.current?.querySelectorAll('button')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      openerRef.current?.focus?.()
    }
  }, [go, index, onClose])

  const control =
    'flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition hover:border-accent hover:bg-accent'

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — image ${index + 1} of ${count}`}
      tabIndex={-1}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex flex-col bg-deep/95 backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-5 py-4 text-white">
        <p className="text-[13px] font-medium tabular-nums text-white/70">
          <span className="text-white">{String(index + 1).padStart(2, '0')}</span>
          <span className="mx-1">/</span>
          {String(count).padStart(2, '0')}
        </p>
        <button type="button" onClick={onClose} aria-label="Close" className={control}>
          <CloseIcon />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-6">
        {count > 1 && (
          <button
            type="button"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation()
              go(index - 1)
            }}
            className={`${control} absolute left-3 z-10 lg:left-8`}
          >
            <ChevronLeftIcon />
          </button>
        )}

        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`${title} — ${index + 1} of ${count}`}
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-full max-w-full rounded-xl object-contain shadow-panel"
          />
        </AnimatePresence>

        {count > 1 && (
          <button
            type="button"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation()
              go(index + 1)
            }}
            className={`${control} absolute right-3 z-10 lg:right-8`}
          >
            <ChevronRightIcon />
          </button>
        )}
      </div>

      {count > 1 && (
        <div
          onClick={(event) => event.stopPropagation()}
          className="no-scrollbar flex shrink-0 justify-start gap-2 overflow-x-auto px-5 pb-5 sm:justify-center"
        >
          {images.map((image, thumbIndex) => (
            <button
              key={image}
              type="button"
              onClick={() => go(thumbIndex)}
              aria-label={`Show image ${thumbIndex + 1}`}
              aria-current={thumbIndex === index}
              className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                thumbIndex === index
                  ? 'border-accent opacity-100'
                  : 'border-transparent opacity-50 hover:opacity-90'
              }`}
            >
              <img src={image} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
