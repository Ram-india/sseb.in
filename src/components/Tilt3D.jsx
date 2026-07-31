import { useCallback, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion'

/**
 * Pointer-tracked 3D tilt.
 *
 * The card rotates about X and Y toward the cursor, on a perspective set by
 * the wrapper so each card has its own vanishing point. Springs damp the
 * rotation so it trails the pointer rather than snapping to it, and the whole
 * thing resets on leave.
 *
 * Children can opt into depth with `style={{ transform: 'translateZ(Npx)' }}`
 * — `transform-style: preserve-3d` on the inner element keeps them separated.
 */
export default function Tilt3D({
  children,
  className = '',
  max = 9, // peak rotation in degrees
  lift = 10, // px of translateZ on the whole card while hovered
  glare = true,
}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  // -0.5 … 0.5 relative to the card's centre
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const spring = { stiffness: 220, damping: 22, mass: 0.6 }
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring)
  const z = useSpring(0, spring)

  // the specular highlight follows the cursor across the surface
  const glareX = useTransform(px, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(py, [-0.5, 0.5], ['0%', '100%'])

  const onMove = useCallback(
    (event) => {
      const node = ref.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      px.set((event.clientX - rect.left) / rect.width - 0.5)
      py.set((event.clientY - rect.top) / rect.height - 0.5)
    },
    [px, py],
  )

  const onEnter = useCallback(() => z.set(lift), [z, lift])
  const onLeave = useCallback(() => {
    px.set(0)
    py.set(0)
    z.set(0)
  }, [px, py, z])

  if (reduced) return <div className={className}>{children}</div>

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={className}
      style={{ perspective: 900 }}
    >
      <motion.div
        style={{ rotateX, rotateY, z, transformStyle: 'preserve-3d' }}
        className="relative h-full w-full"
      >
        {children}

        {glare && (
          <motion.span
            aria-hidden="true"
            style={{
              backgroundImage: `radial-gradient(14rem 14rem at var(--gx) var(--gy), rgb(255 255 255 / 0.28), transparent 70%)`,
              '--gx': glareX,
              '--gy': glareY,
            }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [transform:translateZ(1px)] group-hover:opacity-100"
          />
        )}
      </motion.div>
    </div>
  )
}
