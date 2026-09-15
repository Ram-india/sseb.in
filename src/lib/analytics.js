// Google Analytics 4 (gtag.js).
//
// The measurement ID lives in an env var so the tag can be swapped — or turned
// off entirely — without touching code. Nothing loads when it is unset, so
// forks and local checkouts stay untracked by default.
//
//   .env.production →  VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
//
// GA is skipped on the dev server too, so local clicking around never lands in
// the property's reports. Set VITE_GA_DEBUG=true to override that while you are
// verifying the wiring.

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
const DEBUG = import.meta.env.VITE_GA_DEBUG === 'true'

export const analyticsEnabled = Boolean(MEASUREMENT_ID) && (import.meta.env.PROD || DEBUG)

let loaded = false

function gtag() {
  // gtag pushes `arguments` itself — not an array — so the shape stays intact.
  window.dataLayer.push(arguments)
}

// Injects gtag.js once. Automatic page_view is switched off: this is a single
// page app, so the one GA would send on load is the only one it would ever see.
// Seo.jsx sets document.title per route, and trackPageView reports each view
// after that, which keeps titles right for the second route onwards.
export function initAnalytics() {
  if (loaded || !analyticsEnabled || typeof window === 'undefined') return
  loaded = true

  window.dataLayer = window.dataLayer || []

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
  document.head.appendChild(script)

  gtag('js', new Date())
  gtag('config', MEASUREMENT_ID, { send_page_view: false })
}

export function trackPageView(path) {
  if (!loaded) return

  gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}

// For anything worth measuring beyond navigation — a contact form submit, a
// brochure download: trackEvent('generate_lead', { form: 'contact' }).
export function trackEvent(name, params = {}) {
  if (!loaded) return
  gtag('event', name, params)
}
