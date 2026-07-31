import { motion } from 'framer-motion'
import useInViewOnce from '../hooks/useInViewOnce'
import useReducedMotion from '../hooks/useReducedMotion'

// Distances are small on purpose: at this scale the motion reads as the page
// settling into place rather than as things flying in.
const offsets = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 48 },
  right: { x: -48 },
  none: {},
}

const EASE = [0.16, 1, 0.3, 1]

/**
 * Fades and lifts its children the first time they scroll into view.
 * `delay` staggers siblings; `direction` picks the axis; `scale` adds a slight
 * settle for cards and images.
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  direction = 'up',
  scale = false,
  amount = 0.15,
  className = '',
  ...rest
}) {
  const reduced = useReducedMotion()
  const [ref, shown] = useInViewOnce({ amount, delay })
  const Tag = motion[as] ?? motion.div

  if (reduced) {
    const Plain = as
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    )
  }

  const hidden = { opacity: 0, ...offsets[direction], ...(scale ? { scale: 0.96 } : {}) }
  const visible = { opacity: 1, x: 0, y: 0, ...(scale ? { scale: 1 } : {}) }

  return (
    <Tag
      ref={ref}
      className={className}
      initial={hidden}
      animate={shown ? visible : hidden}
      transition={{ duration: 0.9, ease: EASE, delay: delay / 1000 }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
