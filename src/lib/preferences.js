/**
 * User preferences — appearance and accessibility.
 *
 * Everything is expressed on the <html> element (one class for dark, data
 * attributes for the rest) so CSS does the work and no component has to
 * subscribe to a store. The same `apply` runs from an inline script in
 * index.html before first paint, which is what stops the page flashing the
 * wrong theme or text size on load.
 */
export const STORAGE_KEY = 'sseb-prefs'

export const defaults = {
  theme: 'system', // 'system' | 'light' | 'dark'
  motion: 'system', // 'system' | 'reduce'
  textSize: 'default', // 'default' | 'large'
  contrast: 'default', // 'default' | 'high'
  underlineLinks: false,
}

export function readPreferences() {
  if (typeof localStorage === 'undefined') return { ...defaults }
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
    // Migrate the original theme-only key.
    const legacy = localStorage.getItem('sseb-theme')
    if (!stored.theme && (legacy === 'dark' || legacy === 'light')) stored.theme = legacy
    return { ...defaults, ...stored }
  } catch {
    return { ...defaults }
  }
}

export function writePreferences(preferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
  } catch {
    // private browsing — settings still apply for this session
  }
}

export function applyPreferences(preferences) {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  const prefersDark =
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches

  const dark = preferences.theme === 'dark' || (preferences.theme === 'system' && prefersDark)
  root.classList.toggle('dark', dark)

  root.dataset.motion = preferences.motion === 'reduce' ? 'reduce' : ''
  root.dataset.textSize = preferences.textSize === 'large' ? 'large' : ''
  root.dataset.contrast = preferences.contrast === 'high' ? 'high' : ''
  root.dataset.underline = preferences.underlineLinks ? 'on' : ''
}

/** True when motion should be suppressed — the OS setting or the user's own. */
export function motionIsReduced() {
  if (typeof document === 'undefined') return false
  if (document.documentElement.dataset.motion === 'reduce') return true
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
}
