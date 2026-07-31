import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from './Icons'

const KEY = 'sseb-theme'

function currentTheme() {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

/**
 * The initial class is set by the inline script in index.html so there is no
 * flash; this only toggles and persists from there. Once the user has chosen,
 * their choice wins over the OS setting.
 */
export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(currentTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      // private mode — the toggle still works for this session
    }
  }, [theme])

  // Follow the OS until the user has expressed a preference.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      let stored = null
      try {
        stored = localStorage.getItem(KEY)
      } catch {
        stored = null
      }
      if (!stored) setTheme(query.matches ? 'dark' : 'light')
    }
    query.addEventListener('change', apply)
    return () => query.removeEventListener('change', apply)
  }, [])

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent ${className}`}
    >
      {isDark ? <SunIcon className="h-[18px] w-[18px]" /> : <MoonIcon className="h-[18px] w-[18px]" />}
    </button>
  )
}
