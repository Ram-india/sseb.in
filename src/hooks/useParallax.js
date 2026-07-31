import { useEffect, useRef } from 'react'
import useReducedMotion from './useReducedMotion'

/**
 * Drifts an element vertically as it crosses the viewport.
 *
 * `distance` is the peak travel in pixels, so the movement is bounded: give the
 * element that much overscan (a taller wrapper, or a scale-up) and no edge can
 * ever be exposed. Writes happen inside requestAnimationFrame, and only the
 * transform is touched, so this stays on the compositor.
 */
export default function useParallax(distance = 40, baseTransform = '') {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    // Standing still still needs the base transform (it supplies the overscan).
    if (reduced) {
      element.style.transform = baseTransform
      return undefined
    }

    let frame = null

    const update = () => {
      frame = null
      const rect = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const elementCentre = rect.top + rect.height / 2
      const span = viewportHeight / 2 + rect.height / 2

      // +1 when the element sits above the fold, -1 when it is still below it.
      const progress = Math.max(-1, Math.min(1, (viewportHeight / 2 - elementCentre) / span))
      element.style.transform =
        `translate3d(0, ${(progress * distance).toFixed(2)}px, 0) ${baseTransform}`.trim()
    }

    const request = () => {
      if (frame === null) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)

    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      element.style.transform = ''
    }
  }, [distance, baseTransform, reduced])

  return ref
}
