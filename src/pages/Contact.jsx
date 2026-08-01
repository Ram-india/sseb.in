import { useState } from 'react'
import PageShell from '../components/PageShell'
import Stagger from '../components/Stagger'
import { contact } from '../data/site'
import {
  ArrowRightIcon,
  CheckCircleIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from '../components/Icons'

// Converted from contact.php — same fields, same office details.
//
// The PHP form posted via JS to a handler that is not in the repository, so it
// never sent anything. This validates locally and hands off to email with the
// message pre-filled. Wire it to a real endpoint when one exists.
const offices = [
  {
    id: 'registered',
    label: 'Registered office',
    lines: ['367A, Mettur Main Road,', 'Bhavani 638 301, Erode Dist. TN.'],
    query: '367A, Mettur Main Road, Bhavani 638301, Erode District, Tamil Nadu, India',
  },
  {
    id: 'factory',
    label: 'Factory',
    lines: ['J-3(s), SIPCOT Industrial Growth Centre,', 'Perundurai 638 052, Erode Dist. TN.'],
    query:
      'J-3(s), SIPCOT Industrial Growth Centre, Perundurai 638052, Erode District, Tamil Nadu, India',
  },
]

// Google's keyless embed endpoint — no API key or billing account needed.
const embedUrl = (query) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`

const directionsUrl = (query) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`

const inputClass =
  'w-full rounded-xl border border-line bg-page px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-muted focus:border-accent'

export default function Contact() {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [activeOffice, setActiveOffice] = useState(offices[0])

  const set = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const next = {}
    for (const name of ['name', 'email', 'subject', 'message']) {
      if (!values[name]?.trim()) next[name] = 'Required'
    }
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Enter a valid email address'
    }
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const body = `${values.message}\n\n— ${values.name} (${values.email})`
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      values.subject,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <>
        <PageShell section="Contact" title="Contact" wide>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 className="title-md">Send us a message</h2>

          {sent && (
            <p className="mt-6 flex items-center gap-3 rounded-2xl border-l-4 border-accent bg-accent-soft/60 p-5 text-ink">
              <CheckCircleIcon className="h-5 w-5 shrink-0 text-accent" />
              Your email client should have opened with your message ready to send.
            </p>
          )}

          <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-5 sm:grid-cols-2">
            {[
              { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
              { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
            ].map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-left text-[13px] font-semibold uppercase tracking-[0.1em] text-muted"
                >
                  {field.label} <span className="text-accent">*</span>
                </label>
                <input
                  id={field.name}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  value={values[field.name] ?? ''}
                  onChange={(event) => set(field.name, event.target.value)}
                  aria-invalid={Boolean(errors[field.name])}
                  className={`${inputClass} mt-2 ${errors[field.name] ? 'border-red-500' : ''}`}
                />
                {errors[field.name] && (
                  <p className="mt-1.5 text-left text-[13px] text-red-600">{errors[field.name]}</p>
                )}
              </div>
            ))}

            <div className="sm:col-span-2">
              <label
                htmlFor="subject"
                className="block text-left text-[13px] font-semibold uppercase tracking-[0.1em] text-muted"
              >
                Subject <span className="text-accent">*</span>
              </label>
              <input
                id="subject"
                type="text"
                value={values.subject ?? ''}
                onChange={(event) => set('subject', event.target.value)}
                aria-invalid={Boolean(errors.subject)}
                className={`${inputClass} mt-2 ${errors.subject ? 'border-red-500' : ''}`}
              />
              {errors.subject && (
                <p className="mt-1.5 text-left text-[13px] text-red-600">{errors.subject}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-left text-[13px] font-semibold uppercase tracking-[0.1em] text-muted"
              >
                Message <span className="text-accent">*</span>
              </label>
              <textarea
                id="message"
                rows={6}
                value={values.message ?? ''}
                onChange={(event) => set('message', event.target.value)}
                aria-invalid={Boolean(errors.message)}
                className={`${inputClass} mt-2 resize-y ${errors.message ? 'border-red-500' : ''}`}
              />
              {errors.message && (
                <p className="mt-1.5 text-left text-[13px] text-red-600">{errors.message}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <button type="submit" className="btn-primary">
                <MailIcon className="h-4 w-4" />
                Send message
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-5">
          <h2 className="title-md">Find us</h2>

          <Stagger className="mt-6 space-y-4">
            {offices.map((office) => {
              const active = activeOffice.id === office.id
              return (
                <Stagger.Item key={office.id}>
                  <button
                    type="button"
                    onClick={() => setActiveOffice(office)}
                    aria-pressed={active}
                    className={`group w-full rounded-2xl border p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-card ${
                      active
                        ? 'border-accent bg-page shadow-card'
                        : 'border-line bg-subtle hover:border-transparent hover:bg-page'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 ${
                          active
                            ? 'bg-accent text-white'
                            : 'bg-accent-soft text-accent group-hover:bg-accent group-hover:text-white'
                        }`}
                      >
                        <MapPinIcon className="h-5 w-5" />
                      </span>
                      <p className="text-left text-[13px] font-semibold uppercase tracking-[0.1em] text-muted">
                        {office.label}
                      </p>
                    </div>
                    <p className="mt-4 text-left text-[15.5px] leading-relaxed text-ink">
                      {office.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                    <span
                      className={`mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors ${
                        active ? 'text-accent' : 'text-muted group-hover:text-accent'
                      }`}
                    >
                      {active ? 'Showing on map' : 'Show on map'}
                      <ArrowRightIcon className="h-3 w-3" />
                    </span>
                  </button>
                </Stagger.Item>
              )
            })}

            <Stagger.Item>
              <div className="rounded-2xl border border-line bg-subtle p-6">
                <ul className="space-y-3 text-[15.5px]">
                  <li>
                    <a
                      href="tel:+9104256230867"
                      className="flex items-center gap-3 text-ink hover:text-accent"
                    >
                      <PhoneIcon className="h-4 w-4 shrink-0 text-accent" />
                      04256 230867
                    </a>
                  </li>
                  <li>
                    <a
                      href={contact.phoneHref}
                      className="flex items-center gap-3 text-ink hover:text-accent"
                    >
                      <PhoneIcon className="h-4 w-4 shrink-0 text-accent" />
                      {contact.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-3 break-all text-ink hover:text-accent"
                    >
                      <MailIcon className="h-4 w-4 shrink-0 text-accent" />
                      {contact.email}
                    </a>
                  </li>
                </ul>
              </div>
            </Stagger.Item>
          </Stagger>
        </div>
        </div>
      </PageShell>

      {/* full-bleed map, below the form */}
      <section aria-label="Our locations" className="border-t border-line bg-subtle">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-4 pb-6 pt-12 sm:px-6">
          <div>
            <p className="eyebrow">Find us</p>
            <h2 className="display-2 mt-3">{activeOffice.label}</h2>
            <p className="mt-2 text-[15.5px] text-muted">{activeOffice.lines.join(' ')}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {offices.map((office) => (
              <button
                key={office.id}
                type="button"
                onClick={() => setActiveOffice(office)}
                aria-pressed={activeOffice.id === office.id}
                className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
                  activeOffice.id === office.id
                    ? 'bg-accent text-white'
                    : 'bg-page text-body hover:bg-accent-soft hover:text-accent'
                }`}
              >
                {office.label}
              </button>
            ))}

            <a
              href={directionsUrl(activeOffice.query)}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-outline !px-5 !py-2 !text-[13px]"
            >
              Get directions
              <ArrowRightIcon />
            </a>
          </div>
        </div>

        {/* keyed so switching offices remounts the frame and cross-fades */}
        <div className="relative h-[420px] w-full overflow-hidden lg:h-[520px]">
          <iframe
            key={activeOffice.id}
            title={`Map — ${activeOffice.label}, SSEB`}
            src={embedUrl(activeOffice.query)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-full w-full border-0 [animation:heroRise_600ms_cubic-bezier(0.22,1,0.36,1)_both]"
          />
        </div>
      </section>
    </>
  )
}
