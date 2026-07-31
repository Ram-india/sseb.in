import { useEffect, useState } from 'react'

// Starts false so the server-ish first paint matches the small-screen layout,
// then corrects on mount.
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const list = window.matchMedia(query)
    const apply = () => setMatches(list.matches)
    apply()
    list.addEventListener('change', apply)
    return () => list.removeEventListener('change', apply)
  }, [query])

  return matches
}
