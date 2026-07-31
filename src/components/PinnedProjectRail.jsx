import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { featuredProjects } from '../data/projects'
import ProjectCard from './ProjectCard'
import { ArrowRightIcon } from './Icons'

/**
 * Pinned horizontal scroll: the section is taller than the viewport, its inner
 * panel sticks, and vertical scroll progress is mapped onto an x translation
 * of the card track — so the cards travel sideways while the page scrolls down.
 *
 * This lives in its own component so that `useScroll` mounts at the same
 * moment as the element it targets. When the media-query check lived in the
 * same component, the first render returned the fallback rail, `sectionRef`
 * was still null when Framer attached its listener, and — because the ref
 * object's identity never changes — it never re-attached. The cards then sat
 * still no matter how far you scrolled.
 */
const gutter = 'max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))'

export default function PinnedProjectRail() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [distance, setDistance] = useState(0)

  const measure = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    // How far the track must travel for its right edge to reach the viewport's.
    setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 96))
  }, [])

  // Measured before paint so the section is never briefly the wrong height.
  useLayoutEffect(measure, [measure])

  useEffect(() => {
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  return (
    <section
      ref={sectionRef}
      className="relative bg-subtle"
      style={{ height: `calc(100vh + ${distance}px)` }}
      aria-label="Projects delivered across India"
    >
      {/* sits below the fixed header rather than under it */}
      <div
        className="sticky flex flex-col justify-center overflow-hidden"
        style={{
          top: 'var(--header-height, 110px)',
          height: 'calc(100vh - var(--header-height, 110px))',
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-6">
          <p className="eyebrow">Our work</p>
          <h2 className="display-2 mt-4 max-w-2xl">Projects delivered across India.</h2>
        </div>

        <motion.div
          ref={trackRef}
          style={{
            x,
            paddingLeft: gutter,
            paddingRight: '1.5rem',
            '--card-siblings': String(featuredProjects.length - 1),
          }}
          className="elastic-rail mt-10 flex gap-[0.6rem] will-change-transform"
        >
          {featuredProjects.map((project) => (
            <div key={project.title} className="elastic-rail-item">
              <ProjectCard project={project} />
            </div>
          ))}
        </motion.div>

        <div className="mx-auto mt-10 w-full max-w-7xl px-6">
          <Link to="/projects/completed-projects-list" className="link-arrow">
            See all projects
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  )
}
