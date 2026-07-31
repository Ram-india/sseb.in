import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion'

/**
 * Scroll-linked drift: the element's position tracks scroll progress across
 * the viewport rather than playing a one-shot animation. Two of these at
 * different `distance` values in the same row produce the layered, unhurried
 * movement that reads as expensive.
 *
 * Positive `distance` lags behind the scroll, negative runs ahead of it.
 */
export default function ScrollDrift({
  children,
  distance = 60,
  fade = false,
  className = '',
  as = 'div',
}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  // Brightest while the element is centred, easing off at either edge.
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.55, 1, 1, 0.55])

  const Tag = motion[as] ?? motion.div

  if (reduced) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag ref={ref} style={{ y, ...(fade ? { opacity } : {}) }} className={className}>
      {children}
    </Tag>
  )
}
