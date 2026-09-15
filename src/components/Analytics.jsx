import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { initAnalytics, trackPageView } from '../lib/analytics'

// Rendered once from Layout, directly after <Seo /> so document.title is
// already the new route's title by the time the page_view goes out.
export default function Analytics() {
  const { pathname, search } = useLocation()
  const lastSent = useRef(null)

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    const path = `${pathname}${search}`
    // StrictMode runs effects twice in development; without this the same view
    // is reported twice.
    if (lastSent.current === path) return
    lastSent.current = path
    trackPageView(path)
  }, [pathname, search])

  return null
}
