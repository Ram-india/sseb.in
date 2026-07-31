import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getLenis } from './SmoothScroll'
import { ChevronUpIcon } from './Icons'

// Two jobs the PHP site got from template.js: reset the scroll position on
// navigation, and show the floating "back to top" circle once you scroll down.
// Both route through Lenis when it is running, so it and the browser never
// fight over the scroll position.
export default function ScrollToTop() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => {
        const lenis = getLenis()
        if (lenis) lenis.scrollTo(0)
        else window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-colors hover:brightness-110"
    >
      <ChevronUpIcon className="h-5 w-5" />
    </button>
  )
}
