import PinnedProjectRail from './PinnedProjectRail'
import ProjectCarousel from './ProjectCarousel'
import useMediaQuery from '../hooks/useMediaQuery'
import useReducedMotion from '../hooks/useReducedMotion'

/**
 * Chooses between the pinned horizontal rail and the ordinary swipe rail.
 *
 * Only the decision lives here — the pinned implementation is a separate
 * component so its scroll hooks mount together with its DOM. Pinning hijacks
 * the scroll, which is hostile on a phone, so below `lg` and for anyone who
 * has asked for reduced motion the plain rail is used instead.
 */
export default function ProjectShowcase() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reduced = useReducedMotion()

  if (!isDesktop || reduced) return <ProjectCarousel />
  return <PinnedProjectRail />
}
