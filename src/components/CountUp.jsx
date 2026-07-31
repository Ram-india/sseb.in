import { useEffect, useRef, useState } from 'react'
import useReducedMotion from '../hooks/useReducedMotion'

// easeOutExpo — fast off the mark, long settle. Reads as precise rather than bouncy.
const ease = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

const DURATION = 1600

export default function CountUp({ to, suffix = '', className = '' }) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      setValue(to)
      return undefined
    }

    const element = ref.current
    if (!element) return undefined

    let frame = null
    let start = null

    const step = (timestamp) => {
      if (start === null) start = timestamp
      const progress = Math.min(1, (timestamp - start) / DURATION)
      setValue(Math.round(ease(progress) * to))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        frame = requestAnimationFrame(step)
      },
      { threshold: 0.4 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [to, reduced])

  // No thousands separator — the largest value here is a year.
  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}
