import { useEffect, useState } from 'react'

// Single source of truth for the motion preference. Every animated component
// reads this and stands still when the user has asked for less motion.
export default function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(query.matches)
    apply()
    query.addEventListener('change', apply)
    return () => query.removeEventListener('change', apply)
  }, [])

  return reduced
}
