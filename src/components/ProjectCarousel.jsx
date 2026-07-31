import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { featuredProjects } from '../data/projects'
import ProjectCard from './ProjectCard'
import Reveal from './Reveal'
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons'

/**
 * Full-bleed card rail, in the shape of the "Everything you need to make
 * anything" row on adobe.com: the heading sits on the page grid, but the
 * cards run to the right edge of the viewport and scroll horizontally.
 *
 * `gutter` keeps the first card flush with the container's left edge at any
 * viewport width: half the leftover space either side of the 80rem container,
 * plus the container's own padding.
 */
// NB: calc() requires whitespace around + and -. Without it the whole
// declaration is invalid and the browser drops it, taking the alignment with it.
const gutter = 'max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))'

export default function ProjectCarousel() {
  const scrollerRef = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const syncArrows = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const { scrollLeft, scrollWidth, clientWidth } = scroller
    setAtStart(scrollLeft <= 4)
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 4)
  }, [])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return undefined
    syncArrows()
    scroller.addEventListener('scroll', syncArrows, { passive: true })
    window.addEventListener('resize', syncArrows)
    return () => {
      scroller.removeEventListener('scroll', syncArrows)
      window.removeEventListener('resize', syncArrows)
    }
  }, [syncArrows])

  // Page by one card, whatever the current breakpoint's card width is.
  const page = (direction) => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const card = scroller.querySelector('[data-card]')
    const gap = parseFloat(getComputedStyle(scroller).columnGap) || 0
    const step = card ? card.getBoundingClientRect().width + gap : scroller.clientWidth * 0.8
    scroller.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <section className="overflow-hidden bg-subtle py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Our work</p>
            <h2 className="display-2 mt-4">Projects delivered across India.</h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => page(-1)}
              disabled={atStart}
              aria-label="Previous projects"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-all hover:border-accent hover:bg-accent hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              onClick={() => page(1)}
              disabled={atEnd}
              aria-label="Next projects"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-all hover:border-accent hover:bg-accent hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </Reveal>
      </div>

      <div
        ref={scrollerRef}
        className="elastic-rail no-scrollbar mt-12 flex snap-x snap-mandatory gap-[0.6rem] overflow-x-auto pb-6 pt-2"
        style={{
          paddingLeft: gutter,
          paddingRight: gutter,
          scrollPaddingLeft: gutter,
          '--card-siblings': String(featuredProjects.length - 1),
        }}
      >
        {featuredProjects.map((project, projectIndex) => (
          <Reveal
            key={project.title}
            delay={Math.min(projectIndex, 4) * 110}
            data-card
            className="elastic-rail-item snap-start"
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Link to="/projects/completed-projects-list" className="link-arrow">
          See all projects
          <ArrowRightIcon />
        </Link>
      </div>
    </section>
  )
}
