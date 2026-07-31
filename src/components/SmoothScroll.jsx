import { useEffect } from 'react'
import Lenis from 'lenis'
import useReducedMotion from '../hooks/useReducedMotion'

let instance = null

// Anything that needs to jump the page (route changes, back-to-top) should go
// through this rather than window.scrollTo, or Lenis and the browser fight
// over the scroll position.
export function getLenis() {
  return instance
}

/**
 * Momentum smoothing on the native scroll — the "heavy, settled" feel of a
 * site like adobe.com. Lenis keeps real scrollTop rather than transforming the
 * page, so position: sticky, the fixed header and every scroll-linked
 * animation on the page keep working untouched.
 *
 * Touch is left alone: mobile already has native momentum, and smoothing it
 * a second time feels laggy.
 */
export default function SmoothScroll() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return undefined

    const lenis = new Lenis({
      lerp: 0.085, // lower = longer glide
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
    })

    instance = lenis
    document.documentElement.classList.add('lenis-active')

    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    })

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      instance = null
      document.documentElement.classList.remove('lenis-active')
    }
  }, [reduced])

  return null
}
