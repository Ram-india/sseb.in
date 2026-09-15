import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navigation } from '../data/site'
import { navIcons } from '../lib/navIcons'
import {
  ArrowRightIcon,
  BriefcaseIcon,
  BuildingIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  CompassIcon,
  FileEditIcon,
  GearIcon,
  GraduationIcon,
  ListIcon,
  PulseIcon,
  ShieldCheckIcon,
  UserIcon,
  UsersIcon,
} from './Icons'


function isBranchActive(item, pathname) {
  if (!item.children) return false
  return item.children.some((child) => pathname === child.to)
}

const topLevelBase =
  'relative flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-semibold transition-colors lg:px-3.5'

/* ---------------------------------------------------------------- desktop */

function DesktopMenu() {
  const { pathname } = useLocation()
  const [openLabel, setOpenLabel] = useState(null)
  const ref = useRef(null)
  const closeTimer = useRef(null)

  useEffect(() => setOpenLabel(null), [pathname])

  useEffect(() => {
    if (!openLabel) return undefined
    const onPointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpenLabel(null)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpenLabel(null)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [openLabel])

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  // A small grace period on leave, so crossing the gap between the trigger
  // and the panel does not snap the menu shut.
  const scheduleClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenLabel(null), 140)
  }
  const cancelClose = () => clearTimeout(closeTimer.current)

  const openItem = navigation.find((item) => item.label === openLabel)

  return (
    <div ref={ref} className="hidden md:block" onMouseLeave={scheduleClose}>
      <nav aria-label="Main navigation">
        <ul className="flex items-center justify-end gap-1">
          {navigation.map((item) => {
            if (!item.children) {
              return (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onMouseEnter={() => {
                      cancelClose()
                      setOpenLabel(null)
                    }}
                    className={({ isActive }) =>
                      `${topLevelBase} ${
                        isActive ? 'text-ink' : 'text-body hover:bg-subtle hover:text-ink'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            }

            const expanded = openLabel === item.label
            return (
              <li key={item.label}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-haspopup="true"
                  onMouseEnter={() => {
                    cancelClose()
                    setOpenLabel(item.label)
                  }}
                  onClick={() => setOpenLabel(expanded ? null : item.label)}
                  className={`${topLevelBase} ${
                    expanded || isBranchActive(item, pathname)
                      ? 'bg-subtle text-ink'
                      : 'text-body hover:bg-subtle hover:text-ink'
                  }`}
                >
                  {item.label}
                  <ChevronDownIcon
                    className={`h-3 w-3 opacity-70 transition-transform ${
                      expanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* full-width mega panel */}
      <div
        onMouseEnter={cancelClose}
        className={`absolute inset-x-0 top-full origin-top border-t border-line bg-surface shadow-panel transition-all duration-200 ${
          openItem
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        {openItem && (
          <div className="mx-auto max-w-7xl px-6 py-10">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="eyebrow">{openItem.label}</p>
                <p className="mt-3 text-[19px] font-semibold leading-snug text-ink">
                  {openItem.summary}
                </p>
              </div>

              <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
                {openItem.children.map((child) => {
                  const Icon = navIcons[child.icon]
                  return (
                    <li key={child.to}>
                      <Link
                        to={child.to}
                        className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium transition-colors ${
                          pathname === child.to
                            ? 'bg-subtle text-ink'
                            : 'text-body hover:bg-subtle hover:text-ink'
                        }`}
                      >
                        {Icon && (
                          <span
                            aria-hidden="true"
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white"
                          >
                            <Icon className="h-[18px] w-[18px]" />
                          </span>
                        )}
                        <span className="flex-1">{child.label}</span>
                        <ArrowRightIcon className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-70" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------- mobile */

function MobileItem({ item, onNavigate }) {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(() => isBranchActive(item, pathname))

  const rowClass =
    'flex w-full items-center justify-between px-5 py-4 text-left text-[17px] font-semibold transition-colors'

  if (!item.children) {
    return (
      <li className="border-b border-line">
        <NavLink
          to={item.to}
          end={item.to === '/'}
          onClick={onNavigate}
          className={({ isActive }) =>
            `${rowClass} ${isActive ? 'text-accent' : 'text-ink'}`
          }
        >
          {item.label}
        </NavLink>
      </li>
    )
  }

  return (
    <li className="border-b border-line">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className={`${rowClass} ${isBranchActive(item, pathname) ? 'text-accent' : 'text-ink'}`}
      >
        {item.label}
        <ChevronDownIcon
          className={`h-3.5 w-3.5 opacity-60 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul className="pb-3">
          {item.children.map((child) => {
            const Icon = navIcons[child.icon]
            return (
              <li key={child.to}>
                <NavLink
                  to={child.to}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-5 py-2.5 text-[16px] ${
                      isActive ? 'text-accent' : 'text-body'
                    }`
                  }
                >
                  {Icon && (
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent"
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                  )}
                  {child.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}

export default function Navigation({ mobileOpen, onNavigate }) {
  return (
    <>
      <DesktopMenu />

      <nav
        aria-label="Mobile navigation"
        className={`absolute inset-x-0 top-full max-h-[calc(100dvh-var(--header-height,110px))] overflow-y-auto border-t border-line bg-surface shadow-panel md:hidden ${
          mobileOpen ? 'block' : 'hidden'
        }`}
      >
        <ul>
          {navigation.map((item) => (
            <MobileItem key={item.label} item={item} onNavigate={onNavigate} />
          ))}
        </ul>
      </nav>
    </>
  )
}
