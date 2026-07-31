import { useEffect, useRef, useState } from 'react'

// If the observer has not reported by now, reveal anyway. A real browser
// answers within a frame or two; this only catches the cases where it never
// fires at all, which would otherwise leave content stuck at opacity 0.
const FAILSAFE_MS = 1200

/**
 * Returns `[ref, shown]` — true once the element has been seen, and always
 * true eventually.
 *
 * Deliberately not Framer's `whileInView`: combining that with an `animate`
 * fallback leaves it ambiguous which one wins, and content stayed hidden.
 * Owning the state means exactly one prop drives the animation.
 */
export default function useInViewOnce({ amount = 0.15, delay = 0 } = {}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (shown) return undefined

    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShown(true)
        observer.disconnect()
      },
      { threshold: amount, rootMargin: '0px 0px -5% 0px' },
    )

    observer.observe(element)
    const failsafe = setTimeout(() => setShown(true), FAILSAFE_MS + delay)

    return () => {
      observer.disconnect()
      clearTimeout(failsafe)
    }
  }, [amount, delay, shown])

  return [ref, shown]
}
