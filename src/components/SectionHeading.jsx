// One heading treatment used by every section, so the page has a single
// rhythm: eyebrow label, title, accent rule.
export default function SectionHeading({
  eyebrow,
  title,
  align = 'left',
  tone = 'dark',
  className = '',
}) {
  const centered = align === 'center'

  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <p className={`eyebrow ${tone === 'light' ? 'text-accent' : ''}`}>{eyebrow}</p>
      )}

      <h2
        className={`mt-2 font-heading text-2xl font-bold leading-tight tracking-tight sm:text-[2rem] ${
          tone === 'light' ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>

      <div
        className={`mt-4 h-[3px] w-14 bg-accent ${centered ? 'mx-auto' : ''}`}
        aria-hidden="true"
      />
    </div>
  )
}
