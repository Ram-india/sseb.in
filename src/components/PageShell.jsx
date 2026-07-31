import { useCallback, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navigation } from '../data/site'
import { navIcons } from '../lib/navIcons'
import { motion, useScroll, useSpring } from 'framer-motion'
import useParallax from '../hooks/useParallax'
import useReducedMotion from '../hooks/useReducedMotion'
import { ChevronRightIcon } from './Icons'

/**
 * The interior-page frame: breadcrumb, page title, then content beside the
 * section's side navigation — the shape every PHP page under about/, careers/,
 * projects/ and work-with-us/ had via header/sidebar.php and friends.
 *
 * The side nav is derived from the same `navigation` tree the header uses, so
 * a menu change flows to both and the four near-identical PHP sidebars
 * collapse into one component.
 */
function SectionNav({ section }) {
  const { pathname } = useLocation()
  const [hovered, setHovered] = useState(null)
  const reduced = useReducedMotion()
  const branch = navigation.find((item) => item.label === section)
  if (!branch?.children) return null

  return (
    <nav aria-label={`${section} pages`} className="lg:sticky lg:top-[calc(var(--header-height,110px)+2rem)]">
      <h2 className="font-heading text-[13px] font-bold uppercase tracking-[0.16em] text-muted">
        {section}
      </h2>

      <ul className="mt-4 space-y-1">
        {branch.children.map((child) => {
          const Icon = navIcons[child.icon]
          const active = pathname === child.to

          return (
            <li key={child.to} className="relative">
              {/* One shared element slides between rows instead of each row
                  fading its own background in and out. */}
              {!reduced && hovered === child.to && (
                <motion.span
                  layoutId="section-nav-hover"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl bg-subtle"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}

              <Link
                to={child.to}
                onMouseEnter={() => setHovered(child.to)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(child.to)}
                aria-current={active ? 'page' : undefined}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium transition-colors ${
                  active ? 'bg-subtle text-ink' : 'text-body hover:text-ink'
                }`}
              >
                {Icon && (
                  <span
                    aria-hidden="true"
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      active
                        ? 'bg-accent text-white'
                        : 'bg-accent-soft text-accent group-hover:bg-accent group-hover:text-white'
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                )}
                <span className="flex-1">{child.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/** Fills as the page is read. Sits directly under the fixed header. */
function ReadingProgress() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  if (reduced) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, top: 'var(--header-height-live, var(--header-height, 110px))' }}
      className="fixed inset-x-0 z-30 h-[3px] origin-left bg-accent"
    />
  )
}

export default function PageShell({
  section,
  title,
  image = '/assets/images/bg.jpg',
  children,
}) {
  // scale(1.12) is the overscan the drift needs; the hook composes both into
  // one transform so neither is lost.
  const textureRef = useParallax(30, 'scale(1.12)')
  const heroRef = useRef(null)

  const trackPointer = useCallback((event) => {
    const hero = heroRef.current
    if (!hero) return
    const rect = hero.getBoundingClientRect()
    hero.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`)
    hero.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`)
  }, [])

  return (
    <>
      {/* breadcrumb + title, over the site's original banner texture */}
      <header
        ref={heroRef}
        onMouseMove={trackPointer}
        className="page-hero on-dark relative overflow-hidden bg-deep"
      >
        <img
          ref={textureRef}
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />

        {/* legibility scrim, then the brand glows, then the pointer light */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-deep/90 via-deep/70 to-deep/40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(40rem 20rem at 8% 0%, rgb(var(--c-accent) / 0.30), transparent 60%), radial-gradient(34rem 18rem at 95% 100%, rgb(var(--c-secondary) / 0.24), transparent 60%)',
          }}
        />
        <div aria-hidden="true" className="page-hero-glow absolute inset-0" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[13px] text-white/60">
              <li>
                <Link to="/" className="transition-colors hover:text-accent">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRightIcon className="h-3 w-3 opacity-50" />
              </li>
              <li>{section}</li>
              <li aria-hidden="true">
                <ChevronRightIcon className="h-3 w-3 opacity-50" />
              </li>
              <li className="font-medium text-white">{title}</li>
            </ol>
          </nav>

          <h1 className="display-2 mt-5 max-w-4xl text-white">{title}</h1>
        </div>
      </header>

      <ReadingProgress />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Deliberately NOT wrapped in a scroll reveal. This is the page's
              actual content — if the observer never fires (or a crawler does
              not run one) an opacity-0 article means a blank page. Reveals are
              for decoration; body copy renders unconditionally. */}
          <article className="prose-corporate lg:col-span-9">{children}</article>

          <aside className="lg:col-span-3">
            <SectionNav section={section} />
          </aside>
        </div>
      </div>
    </>
  )
}
