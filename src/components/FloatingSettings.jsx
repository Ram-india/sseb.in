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
 * Appearance and Accessibility settings as a floating control.
 *
 * Features:
 * - Responsive size on mobile and desktop
 * - Theme and accessibility preferences
 * - Preferences saved on this device
 * - Keyboard accessible radio groups
 * - Escape key closes the panel
 * - Click outside closes the panel
 * - Reduced-motion support
 */

function SettingRow({ setting, value, onChange }) {
  const name = `pref-${setting.key}`

  return (
    <div>
      <span
        id={`${name}-label`}
        className="text-[13px] font-semibold text-ink sm:text-[14px]"
      >
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
                if (
                  event.key !== 'ArrowRight' &&
                  event.key !== 'ArrowLeft'
                ) {
                  return
                }

                event.preventDefault()

                const index = setting.choices.findIndex(
                  (choiceItem) => choiceItem.value === value
                )

                const step = event.key === 'ArrowRight' ? 1 : -1

                const next =
                  setting.choices[
                    (index + step + setting.choices.length) %
                      setting.choices.length
                  ]

                onChange(setting.key, next.value)
              }}
              className={`min-h-[34px] flex-1 rounded-full px-2.5 py-1.5 text-[12px] font-semibold transition-colors sm:px-3 sm:text-[13px] ${
                active
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-body hover:text-ink'
              }`}
            >
              {choice.label}
            </button>
          )
        })}
      </div>

      <p
        id={`${name}-hint`}
        className="mt-1.5 text-[11.5px] leading-snug text-muted sm:text-[12.5px]"
      >
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

  /**
   * Apply preferences whenever they change.
   */
  useEffect(() => {
    applyPreferences(preferences)
  }, [preferences])

  /**
   * Follow the operating system theme when
   * theme preference is set to "system".
   */
  useEffect(() => {
    if (preferences.theme !== 'system') return undefined

    const query = window.matchMedia(
      '(prefers-color-scheme: dark)'
    )

    const apply = () => applyPreferences(preferences)

    query.addEventListener('change', apply)

    return () => {
      query.removeEventListener('change', apply)
    }
  }, [preferences])

  /**
   * Close the panel when clicking outside
   * or pressing Escape.
   */
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

        requestAnimationFrame(() => {
          buttonRef.current?.focus()
        })
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  /**
   * Update and persist a preference immediately.
   */
  const update = useCallback((key, value) => {
    setPreferences((current) => {
      const next = {
        ...current,
        [key]: value,
      }

      writePreferences(next)
      applyPreferences(next)

      return next
    })
  }, [])

  /**
   * Animation configuration.
   */
  const spring = reduced
    ? { duration: 0 }
    : {
        type: 'spring',
        stiffness: 320,
        damping: 28,
        mass: 0.7,
      }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label="Site settings"
            aria-modal="false"
            initial={
              reduced
                ? { opacity: 1 }
                : { opacity: 0, y: 12, scale: 0.96 }
            }
            animate={
              reduced
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, y: 8, scale: 0.98 }
            }
            transition={spring}
            style={{
              transformOrigin: 'bottom right',
            }}
            className="
              absolute
              bottom-[calc(100%+0.75rem)]
              right-0

              w-[calc(100vw-2rem)]
              max-w-[20rem]

              max-h-[calc(100vh-6rem)]
              overflow-y-auto

              rounded-2xl
              border
              border-line
              bg-surface

              p-4
              shadow-panel

              sm:bottom-[calc(100%+0.85rem)]
              sm:w-80
              sm:p-5
              sm:max-h-[calc(100vh-7.5rem)]
            "
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-left text-[14px] font-bold text-ink sm:text-[15px]">
                  Site settings
                </h2>

                <p className="mt-0.5 text-[11.5px] text-muted sm:text-[12.5px]">
                  Saved on this device.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setOpen(false)

                  requestAnimationFrame(() => {
                    buttonRef.current?.focus()
                  })
                }}
                aria-label="Close settings"
                className="
                  shrink-0
                  rounded-full
                  p-1.5
                  text-muted
                  transition-colors
                  hover:bg-subtle
                  hover:text-ink
                  focus:outline-none
                  focus:ring-2
                  focus:ring-accent/40
                "
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Settings */}
            <div className="mt-4 space-y-5 sm:mt-5">
              {preferenceGroups.map((group) => (
                <fieldset
                  key={group.id}
                  className="border-0 p-0"
                >
                  <legend className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent sm:text-[11px]">
                    {group.label}
                  </legend>

                  <p className="mb-3 text-[11.5px] leading-snug text-muted sm:mb-4 sm:text-[12.5px]">
                    {group.description}
                  </p>

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

      {/* Floating Button */}
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Appearance and accessibility settings"
        whileHover={
          reduced
            ? undefined
            : {
                scale: 1.06,
              }
        }
        whileTap={
          reduced
            ? undefined
            : {
                scale: 0.94,
              }
        }
        className="
          flex
          h-12
          w-12
          items-center
          justify-center

          rounded-full
          bg-accent
          text-white

          shadow-[0_10px_30px_-8px_rgb(var(--c-shadow)/0.5)]

          transition-colors
          hover:brightness-110

          focus:outline-none
          focus:ring-2
          focus:ring-accent/50
          focus:ring-offset-2

          sm:h-14
          sm:w-14
        "
      >
        <motion.span
          animate={
            reduced
              ? undefined
              : {
                  rotate: open ? 90 : 0,
                }
          }
          transition={spring}
          className="flex"
        >
          {open ? (
            <CloseIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <SlidersIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
        </motion.span>
      </motion.button>
    </div>
  )
}