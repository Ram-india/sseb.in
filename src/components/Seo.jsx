import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL, resolveSeo } from '../lib/seo'

function upsertMeta(selector, attrs) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value))
    document.head.appendChild(element)
    return element
  }
  element.setAttribute('content', attrs.content)
  return element
}

function upsertCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

// Rendered once from Layout. It keeps <title>, description, keywords, canonical
// and the Open Graph tags in sync with the current route.
export default function Seo({ title, description, keywords }) {
  const { pathname } = useLocation()
  const fromMap = resolveSeo(pathname)

  const resolvedTitle = title ?? fromMap.title
  const resolvedDescription = description ?? fromMap.description
  const resolvedKeywords = keywords ?? fromMap.keywords
  const url = `${SITE_URL}${pathname === '/' ? '/' : pathname}`

  useEffect(() => {
    document.title = resolvedTitle
    upsertMeta('meta[name="description"]', { name: 'description', content: resolvedDescription })
    upsertMeta('meta[name="keywords"]', { name: 'keywords', content: resolvedKeywords })
    upsertCanonical(url)

    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: resolvedTitle })
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: resolvedDescription,
    })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
  }, [resolvedTitle, resolvedDescription, resolvedKeywords, url])

  return null
}
