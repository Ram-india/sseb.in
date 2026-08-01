// Inline replacements for the Font Awesome glyphs used by the PHP header and
// footer, so the chrome carries no external icon-font dependency.

const base = {
  fill: 'currentColor',
  viewBox: '0 0 24 24',
  'aria-hidden': 'true',
  focusable: 'false',
}

export function PhoneIcon({ className = 'h-4 w-4' }) {
  return (
    <svg {...base} className={className}>
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.25 1l-2.22 2.2Z" />
    </svg>
  )
}

export function MailIcon({ className = 'h-4 w-4' }) {
  return (
    <svg {...base} className={className}>
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.24-8 4.76-8-4.76V6l8 4.76L20 6v2.24Z" />
    </svg>
  )
}

export function MapPinIcon({ className = 'h-4 w-4' }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  )
}

export function ArrowRightIcon({ className = 'h-3.5 w-3.5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M4 11h12.2l-4.6-4.6L13 5l7 7-7 7-1.4-1.4 4.6-4.6H4v-2Z" />
    </svg>
  )
}

export function ChevronDownIcon({ className = 'h-3 w-3' }) {
  return (
    <svg {...base} className={className}>
      <path d="M7.4 8.6 12 13.2l4.6-4.6L18 10l-6 6-6-6 1.4-1.4Z" />
    </svg>
  )
}

export function ChevronUpIcon({ className = 'h-4 w-4' }) {
  return (
    <svg {...base} className={className}>
      <path d="m12 8 6 6-1.4 1.4L12 10.8l-4.6 4.6L6 14l6-6Z" />
    </svg>
  )
}

export function ChevronLeftIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4-4.6-4.6 4.6-4.6Z" />
    </svg>
  )
}

export function ChevronRightIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M8.6 7.4 10 6l6 6-6 6-1.4-1.4 4.6-4.6-4.6-4.6Z" />
    </svg>
  )
}

export function PauseIcon({ className = 'h-4 w-4' }) {
  return (
    <svg {...base} className={className}>
      <path d="M8 5h3v14H8V5Zm5 0h3v14h-3V5Z" />
    </svg>
  )
}

export function PlayIcon({ className = 'h-4 w-4' }) {
  return (
    <svg {...base} className={className}>
      <path d="M8 5v14l11-7L8 5Z" />
    </svg>
  )
}

export function BoltIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />
    </svg>
  )
}

export function SunIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0-5 2 3h-4l2-3Zm0 20-2-3h4l-2 3ZM2 12l3-2v4l-3-2Zm20 0-3 2v-4l3 2ZM4.9 4.9l3.5.8-2.7 2.7-.8-3.5Zm14.2 14.2-3.5-.8 2.7-2.7.8 3.5ZM19.1 4.9l-.8 3.5-2.7-2.7 3.5-.8ZM4.9 19.1l.8-3.5 2.7 2.7-3.5.8Z" />
    </svg>
  )
}

export function MoonIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M21 13.2A9 9 0 1 1 10.8 3a7.2 7.2 0 0 0 10.2 10.2Z" />
    </svg>
  )
}

export function MenuIcon({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
    </svg>
  )
}

export function CloseIcon({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z" />
    </svg>
  )
}

/* ---------------------------------------------- credentials + navigation */

export function CalendarIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M7 2v2H4a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3V2h-2v2H9V2H7Zm12 8v9H5v-9h14Z" />
    </svg>
  )
}

export function ClockIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5v5.4l3.8 2.2-1 1.7L11 13.5V7h2Z" />
    </svg>
  )
}

export function LayersIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2 2 8l10 6 10-6-10-6Zm-7.3 9.5L2 13l10 6 10-6-2.7-1.5L12 16l-7.3-4.5Z" />
    </svg>
  )
}

export function CertificateIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2a6 6 0 1 0 0 12A6 6 0 0 0 12 2Zm-4 12.6V22l4-2 4 2v-7.4a7.96 7.96 0 0 1-8 0Z" />
    </svg>
  )
}

export function BuildingIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M3 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v5h6a1 1 0 0 1 1 1v11H3Zm2-2h7V5H5v14Zm9 0h5v-8h-5v8ZM6.5 7h4v2h-4V7Zm0 4h4v2h-4v-2Zm0 4h4v2h-4v-2Z" />
    </svg>
  )
}

export function CompassIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.2 5.8-2.4 6-6 2.4 2.4-6 6-2.4ZM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
    </svg>
  )
}

export function UserIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 1.8c-4 0-7.5 2-7.5 4.7V20h15v-1.5c0-2.7-3.5-4.7-7.5-4.7Z" />
    </svg>
  )
}

export function ShieldCheckIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2 4 5v7c0 5 3.4 8.9 8 10 4.6-1.1 8-5 8-10V5l-8-3Zm-1 13.4-3.2-3.2 1.4-1.4L11 12.6l4.8-4.8 1.4 1.4-6.2 6.2Z" />
    </svg>
  )
}

export function GraduationIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3ZM5 13.2V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.8l-7 3.8-7-3.8Z" />
    </svg>
  )
}

export function ListIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M4 6h2v2H4V6Zm4 0h12v2H8V6ZM4 11h2v2H4v-2Zm4 0h12v2H8v-2Zm-4 5h2v2H4v-2Zm4 0h12v2H8v-2Z" />
    </svg>
  )
}

export function CheckCircleIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1 14.4-4.2-4.2 1.4-1.4L11 13.6l5.8-5.8 1.4 1.4L11 16.4Z" />
    </svg>
  )
}

export function PulseIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M2 11h4.2l2-5.5 4 13 2.6-7.5H22v2h-6l-3.6 10.2-4-13L7.6 13H2v-2Z" />
    </svg>
  )
}

export function GearIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm8.9 3.5c0 .5 0 .9-.1 1.3l2 1.5-1.9 3.4-2.4-1a8.6 8.6 0 0 1-2.2 1.3L15.9 22h-3.8l-.4-2.5a8.6 8.6 0 0 1-2.2-1.3l-2.4 1L5.2 15.8l2-1.5a8.7 8.7 0 0 1 0-2.6l-2-1.5 1.9-3.4 2.4 1a8.6 8.6 0 0 1 2.2-1.3L12.1 4h3.8l.4 2.5a8.6 8.6 0 0 1 2.2 1.3l2.4-1 1.9 3.4-2 1.5c.1.4.1.8.1 1.3Z" />
    </svg>
  )
}

export function BriefcaseIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M9 4a2 2 0 0 0-2 2v1H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-4V6a2 2 0 0 0-2-2H9Zm0 2h6v1H9V6Z" />
    </svg>
  )
}

export function UsersIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7.5 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 19c0-2.8 3.4-4.6 7-4.6s7 1.8 7 4.6v1H2v-1Zm16-4.4c2.4.5 4 2 4 4.4v1h-4.2c.1-.3.2-.6.2-1 0-1.4-.4-2.6-1.1-3.6l1.1-.8Z" />
    </svg>
  )
}

export function FileEditIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h6v-2H6V4h6v5h5v3.2l2-2V7l-5-5H6Zm14.7 10.3 1 1a1 1 0 0 1 0 1.4l-1.1 1.1-2.4-2.4 1.1-1.1a1 1 0 0 1 1.4 0ZM13 19.6l4.8-4.8 2.4 2.4L15.4 22H13v-2.4Z" />
    </svg>
  )
}

export function TagIcon({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M11.4 2H4a2 2 0 0 0-2 2v7.4c0 .5.2 1 .6 1.4l8.6 8.6a2 2 0 0 0 2.8 0l7.4-7.4a2 2 0 0 0 0-2.8L12.8 2.6a2 2 0 0 0-1.4-.6ZM7 8.5A1.5 1.5 0 1 1 7 5.5a1.5 1.5 0 0 1 0 3Z" />
    </svg>
  )
}
