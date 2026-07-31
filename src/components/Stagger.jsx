import { motion } from 'framer-motion'
import useInViewOnce from '../hooks/useInViewOnce'
import useReducedMotion from '../hooks/useReducedMotion'

const EASE = [0.16, 1, 0.3, 1]

const container = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

/**
 * Cascades its children into view. Framer's variant inheritance does the
 * timing, so a list needs one observer rather than one per row.
 *
 * Visibility is driven by a single `animate` prop fed from useInViewOnce —
 * see that hook for why `whileInView` is not used here.
 *
 * `Stagger.Item` must wrap each child for it to take part.
 */
export default function Stagger({ children, className = '', as = 'div', amount = 0.15 }) {
  const reduced = useReducedMotion()
  const [ref, shown] = useInViewOnce({ amount })
  const Tag = motion[as] ?? motion.div

  if (reduced) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={shown ? 'shown' : 'hidden'}
    >
      {children}
    </Tag>
  )
}

function Item({ children, className = '', as = 'div' }) {
  const reduced = useReducedMotion()
  const Tag = motion[as] ?? motion.div

  if (reduced) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  )
}

Stagger.Item = Item
