import { useState } from 'react'
import PageShell from '../../components/PageShell'
import { contact } from '../../data/site'
import { CheckCircleIcon, MailIcon } from '../../components/Icons'

// Converted from careers/apply-online.php — same fields, same options.
//
// The PHP form posted to action="" with no handler behind it, so it never
// sent anything. Rather than reproduce a form that silently does nothing,
// this validates locally and then hands off to email with the details
// pre-filled. Wire it to a real endpoint when one exists.
const experienceOptions = [
  'Freshers',
  '0 - 1 Years',
  '1 - 2 Years',
  '3 - 4 Years',
  '5 Years Above',
]

const fields = [
  { name: 'firstName', label: 'First Name', type: 'text', autoComplete: 'given-name' },
  { name: 'lastName', label: 'Last Name', type: 'text', autoComplete: 'family-name' },
  { name: 'qualification', label: 'Qualification', type: 'text' },
  { name: 'contactNo', label: 'Contact No', type: 'tel', autoComplete: 'tel' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
]

const inputClass =
  'w-full rounded-xl border border-line bg-page px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-muted focus:border-accent'

export default function ApplyOnline() {
  const [values, setValues] = useState({ experience: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const next = {}
    for (const field of fields) {
      if (!values[field.name]?.trim()) next[field.name] = 'Required'
    }
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Enter a valid email address'
    }
    if (!values.experience) next.experience = 'Required'

    setErrors(next)
    if (Object.keys(next).length > 0) return

    const body = [
      `Name: ${values.firstName} ${values.lastName}`,
      `Qualification: ${values.qualification}`,
      `Contact No: ${values.contactNo}`,
      `Email: ${values.email}`,
      `Experience: ${values.experience}`,
      '',
      'Please find my resume attached.',
    ].join('\n')

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      'Job application',
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <PageShell
      section="Careers"
      title="Apply Online"
      image="/assets/img/completed_projects/bhavani-bb-1/control-room.jpg"
    >
      <p>
        Complete the form below and we will open an email to{' '}
        <a href={`mailto:${contact.email}`} className="font-semibold text-accent hover:underline">
          {contact.email}
        </a>{' '}
        with your details. Attach your resume to that email before sending.
      </p>

      {sent && (
        <p className="mt-6 flex items-center gap-3 rounded-2xl border-l-4 border-accent bg-accent-soft/60 p-5 text-ink">
          <CheckCircleIcon className="h-5 w-5 shrink-0 text-accent" />
          Your email client should have opened. Remember to attach your resume.
        </p>
      )}

      <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className={field.name === 'qualification' ? 'sm:col-span-2' : ''}>
            <label
              htmlFor={field.name}
              className="block text-left text-[13px] font-semibold uppercase tracking-[0.1em] text-muted"
            >
              {field.label} <span className="text-accent">*</span>
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              value={values[field.name] ?? ''}
              onChange={(event) => set(field.name, event.target.value)}
              aria-invalid={Boolean(errors[field.name])}
              aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
              className={`${inputClass} mt-2 ${errors[field.name] ? 'border-red-500' : ''}`}
            />
            {errors[field.name] && (
              <p id={`${field.name}-error`} className="mt-1.5 text-left text-[13px] text-red-600">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}

        <div className="sm:col-span-2">
          <label
            htmlFor="experience"
            className="block text-left text-[13px] font-semibold uppercase tracking-[0.1em] text-muted"
          >
            Working Experience <span className="text-accent">*</span>
          </label>
          <select
            id="experience"
            name="experience"
            value={values.experience}
            onChange={(event) => set('experience', event.target.value)}
            aria-invalid={Boolean(errors.experience)}
            className={`${inputClass} mt-2 ${errors.experience ? 'border-red-500' : ''}`}
          >
            <option value="">Select your experience</option>
            {experienceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.experience && (
            <p className="mt-1.5 text-left text-[13px] text-red-600">{errors.experience}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <button type="submit" className="btn-primary">
            <MailIcon className="h-4 w-4" />
            Submit application
          </button>
        </div>
      </form>
    </PageShell>
  )
}
