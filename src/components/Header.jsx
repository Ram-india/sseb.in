import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Navigation from './Navigation'
import { contact } from '../data/site'
import { CloseIcon, MailIcon, MenuIcon, PhoneIcon } from './Icons'

// Must exceed the difference between the header's at-rest and collapsed
// heights (114 - 77 = 37px). The home hero is sticky at the live header
// height but sits below a spacer of the at-rest height, so it only reaches
// its sticky point after ~37px of scroll. Collapsing sooner than that opens a
// gap between the header and the hero for those first few pixels.
const SHRINK_AT = 48

export default function Header() {
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const topBarRef = useRef(null)
  const navRowRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => setMobileOpen(false), [pathname])

  // Collapse the contact bar once the page has moved off the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SHRINK_AT)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Publish the header's at-rest height for the spacer and the full-screen
  // hero. Measured from the two inner rows, whose own heights never change —
  // the collapse animates a wrapper around the contact bar, and the logo
  // shrinks by transform — so this value stays correct while scrolled.
  useEffect(() => {
    const topBar = topBarRef.current
    const navRow = navRowRef.current
    if (!topBar || !navRow) return undefined

    const publish = () => {
      // At-rest height: what the spacer reserves and the full-screen hero
      // subtracts. Stays constant while the contact bar collapses.
      const height = topBar.offsetHeight + navRow.offsetHeight
      document.documentElement.style.setProperty('--header-height', `${height}px`)
    }

    publish()
    const observer = new ResizeObserver(publish)
    observer.observe(topBar)
    observer.observe(navRow)
    return () => observer.disconnect()
  }, [])

  // Live height: shrinks with the collapsing contact bar. The reading progress
  // bar rides on this so it stays flush with the header instead of leaving a
  // ~38px gap once the bar has collapsed.
  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const publishLive = () => {
      document.documentElement.style.setProperty(
        '--header-height-live',
        `${Math.round(container.getBoundingClientRect().height)}px`,
      )
    }

    publishLive()
    const observer = new ResizeObserver(publishLive)
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* The header is fixed, so collapsing the contact bar cannot shift the
          page underneath it. This spacer reserves its at-rest height. */}
      <div className="shrink-0" style={{ height: 'var(--header-height, 110px)' }} aria-hidden="true" />

      <div
        ref={containerRef}
        className={`header-container fixed inset-x-0 top-0 z-40 transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_6px_24px_-8px_rgb(var(--c-shadow)/0.35)]' : ''
        }`}
      >
        {/* header-top — collapses on scroll */}
        <div
          className={`overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out ${
            scrolled ? 'max-h-0 -translate-y-1 opacity-0' : 'max-h-24 translate-y-0 opacity-100'
          }`}
          aria-hidden={scrolled}
        >
          <div ref={topBarRef} className="border-b border-white/10 bg-deep text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 py-2.5 sm:justify-between">
                <p className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-white/60 lg:block">
                  ISO 9001:2008 Certified
                  <span className="mx-3 text-white/25">|</span>
                  Established 1981
                </p>

                <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs sm:text-[13px]">
                  <li>
                    <a
                      href={contact.phoneHref}
                      tabIndex={scrolled ? -1 : undefined}
                      className="flex items-center gap-2 font-medium text-white/90 transition-colors hover:text-accent"
                    >
                      <PhoneIcon className="h-3.5 w-3.5 text-accent" />
                      {contact.phone}
                    </a>
                  </li>
                  <li aria-hidden="true" className="hidden text-white/20 sm:block">
                    |
                  </li>
                  <li>
                    <a
                      href={`mailto:${contact.email}`}
                      tabIndex={scrolled ? -1 : undefined}
                      className="flex items-center gap-2 font-medium text-white/90 transition-colors hover:text-accent"
                    >
                      <MailIcon className="h-3.5 w-3.5 text-accent" />
                      {contact.email}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* header — logo + navigation */}
        <header
          ref={navRowRef}
          className="relative border-b border-line bg-surface shadow-[0_1px_3px_rgb(var(--c-shadow)/0.08)]"
        >
          <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 sm:px-6">
            <Link to="/" className="block shrink-0 py-3.5" aria-label="SSEB — home">
              {/* The mark is red on a light ground, so in dark mode it gets a
                  deliberate white plate rather than an accidental halo. */}
              {/* scaled rather than resized, so the row's layout height — and
                  therefore --header-height — is unaffected */}
              <img
                src="/assets/img/sseb_logo_1.png"
                alt="SSEB"
                width="160"
                height="60"
                className={`h-11 w-auto origin-left rounded transition-transform duration-300 ease-out dark:bg-white dark:px-2 dark:py-1 sm:h-12 ${
                  scrolled ? 'scale-90' : 'scale-100'
                }`}
              />
            </Link>

            <Navigation mobileOpen={mobileOpen} onNavigate={() => setMobileOpen(false)} />

            <div className="ml-auto flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen((value) => !value)}
                aria-expanded={mobileOpen}
                aria-label="Toggle navigation"
                className="rounded-full p-2 text-ink transition-colors hover:bg-subtle md:hidden"
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </header>
      </div>
    </>
  )
}
