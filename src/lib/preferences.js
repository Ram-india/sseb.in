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
  textSize: 'default', // 'default' | 'large' | 'larger'
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
  root.dataset.textSize = ['large', 'larger'].includes(preferences.textSize)
    ? preferences.textSize
    : ''
  root.dataset.contrast = preferences.contrast === 'high' ? 'high' : ''
  root.dataset.underline = preferences.underlineLinks ? 'on' : ''

  // Components that read these in JS (motion, chiefly) listen for this.
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('sseb:prefs', { detail: preferences }))
  }
}

/** True when motion should be suppressed — the OS setting or the user's own. */
export function motionIsReduced() {
  if (typeof document === 'undefined') return false
  if (document.documentElement.dataset.motion === 'reduce') return true
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Drives the settings panel — grouped so the two concerns stay distinct. */
export const preferenceGroups = [
  {
    id: 'appearance',
    label: 'Appearance',
    description: 'How the site looks on this device.',
    settings: [
      {
        key: 'theme',
        label: 'Theme',
        hint: 'System follows your device setting.',
        choices: [
          { value: 'system', label: 'System' },
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
        ],
      },
      {
        key: 'contrast',
        label: 'Contrast',
        hint: 'Darkens text and strengthens borders.',
        choices: [
          { value: 'default', label: 'Normal' },
          { value: 'high', label: 'High' },
        ],
      },
    ],
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    description: 'Reading comfort and motion.',
    settings: [
      {
        key: 'textSize',
        label: 'Text size',
        hint: 'Scales body copy and headings.',
        choices: [
          { value: 'default', label: 'Normal' },
          { value: 'large', label: 'Large' },
          { value: 'larger', label: 'Larger' },
        ],
      },
      {
        key: 'motion',
        label: 'Motion',
        hint: 'Reduced stops animations, parallax and autoplay.',
        choices: [
          { value: 'system', label: 'System' },
          { value: 'reduce', label: 'Reduced' },
        ],
      },
      {
        key: 'underlineLinks',
        label: 'Underline links',
        hint: 'Marks links in body copy with an underline.',
        choices: [
          { value: false, label: 'Off' },
          { value: true, label: 'On' },
        ],
      },
    ],
  },
]
