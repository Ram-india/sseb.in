import { useEffect, useState } from 'react'
import { motionIsReduced } from '../lib/preferences'

/**
 * Single source of truth for the motion preference. Reads both the OS setting
 * and the site's own Motion control, and re-checks when either changes — the
 * settings panel dispatches `sseb:prefs` when the user picks a value.
 */
export default function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const apply = () => setReduced(motionIsReduced())
    apply()

    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    query.addEventListener('change', apply)
    window.addEventListener('sseb:prefs', apply)

    return () => {
      query.removeEventListener('change', apply)
      window.removeEventListener('sseb:prefs', apply)
    }
  }, [])

  return reduced
}
