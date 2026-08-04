import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  applyPreferences,
  preferenceGroups,
  readPreferences,
  writePreferences,
} from '../lib/preferences'
import useReducedMotion from '../hooks/useReducedMotion'
import { CloseIcon, SlidersIcon } from './Icons'

/**
 * Appearance and Accessibility settings as a floating control, bottom-right.
 *
 * Each setting is a radiogroup rather than a row of buttons, so arrow keys
 * move between choices the way a native control does. Changes apply and
 * persist immediately — there is no Save, and nothing to lose by exploring.
 */
function SettingRow({ setting, value, onChange }) {
  const name = `pref-${setting.key}`

  return (
    <div>
      <span id={`${name}-label`} className="text-[14px] font-semibold text-ink">
        {setting.label}
      </span>

      <div
        role="radiogroup"
        aria-labelledby={`${name}-label`}
        aria-describedby={`${name}-hint`}
        className="mt-2 flex gap-1 rounded-full bg-subtle p-1"
      >
        {setting.choices.map((choice) => {
          const active = value === choice.value
          return (
            <button
              key={String(choice.value)}
              type="button"
              role="radio"
              aria-checked={active}
              tabIndex={active ? 0 : -1}
              onClick={() => onChange(setting.key, choice.value)}
              onKeyDown={(event) => {
                if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
                event.preventDefault()
                const index = setting.choices.findIndex((c) => c.value === value)
                const step = event.key === 'ArrowRight' ? 1 : -1
                const next =
                  setting.choices[(index + step + setting.choices.length) % setting.choices.length]
                onChange(setting.key, next.value)
              }}
              className={`flex-1 rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors ${
                active ? 'bg-accent text-white shadow-sm' : 'text-body hover:text-ink'
              }`}
            >
              {choice.label}
            </button>
          )
        })}
      </div>

      <p id={`${name}-hint`} className="mt-1.5 text-[12.5px] leading-snug text-muted">
        {setting.hint}
      </p>
    </div>
  )
}

export default function FloatingSettings() {
  const [open, setOpen] = useState(false)
  const [preferences, setPreferences] = useState(readPreferences)
  const panelRef = useRef(null)
  const buttonRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    applyPreferences(preferences)
  }, [preferences])

  // Follow the OS while the theme is left on "system".
  useEffect(() => {
    if (preferences.theme !== 'system') return undefined
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => applyPreferences(preferences)
    query.addEventListener('change', apply)
    return () => query.removeEventListener('change', apply)
  }, [preferences])

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => {
      if (
        !panelRef.current?.contains(event.target) &&
        !buttonRef.current?.contains(event.target)
      ) {
        setOpen(false)
      }
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const update = useCallback((key, value) => {
    setPreferences((current) => {
      const next = { ...current, [key]: value }
      writePreferences(next)
      applyPreferences(next)
      return next
    })
  }, [])

  const spring = reduced
    ? { duration: 0 }
    : { type: 'spring', stiffness: 320, damping: 28, mass: 0.7 }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label="Site settings"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={spring}
            style={{ transformOrigin: 'bottom right' }}
            className="absolute bottom-[calc(100%+0.85rem)] right-0 max-h-[min(32rem,calc(100vh-8rem))] w-[min(20rem,calc(100vw-3rem))] overflow-y-auto rounded-2xl border border-line bg-surface p-5 shadow-panel"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-left text-[15px] font-bold text-ink">Site settings</h2>
                <p className="mt-0.5 text-[12.5px] text-muted">Saved on this device.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  buttonRef.current?.focus()
                }}
                aria-label="Close settings"
                className="rounded-full p-1.5 text-muted transition-colors hover:bg-subtle hover:text-ink"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-6">
              {preferenceGroups.map((group) => (
                <fieldset key={group.id} className="border-0 p-0">
                  <legend className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                    {group.label}
                  </legend>
                  <p className="mb-4 text-[12.5px] text-muted">{group.description}</p>

                  <div className="space-y-4">
                    {group.settings.map((setting) => (
                      <SettingRow
                        key={setting.key}
                        setting={setting}
                        value={preferences[setting.key]}
                        onChange={update}
                      />
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Appearance and accessibility settings"
        whileHover={reduced ? undefined : { scale: 1.06 }}
        whileTap={reduced ? undefined : { scale: 0.94 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_10px_30px_-8px_rgb(var(--c-shadow)/0.5)] transition-colors hover:brightness-110"
      >
        <motion.span
          animate={reduced ? undefined : { rotate: open ? 90 : 0 }}
          transition={spring}
          className="flex"
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <SlidersIcon className="h-6 w-6" />}
        </motion.span>
      </motion.button>
    </div>
  )
}
