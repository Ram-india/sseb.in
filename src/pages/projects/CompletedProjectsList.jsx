import { useMemo, useState } from 'react'
import PageShell from '../../components/PageShell'
import Stagger from '../../components/Stagger'
import { projectRegister } from '../../data/projectRegister'
import { CalendarIcon, CheckCircleIcon, ListIcon } from '../../components/Icons'

// Converted from projects/completed-projects-list.php — the same 53-entry
// register, grouped by the year headings the original table used.
const years = [...new Set(projectRegister.map((entry) => entry.year))]

export default function CompletedProjectsList() {
  const [activeYear, setActiveYear] = useState('all')

  const groups = useMemo(() => {
    const visible =
      activeYear === 'all'
        ? projectRegister
        : projectRegister.filter((entry) => entry.year === activeYear)

    return years
      .map((year) => ({ year, entries: visible.filter((entry) => entry.year === year) }))
      .filter((group) => group.entries.length > 0)
  }, [activeYear])

  return (
    <PageShell
      section="Projects"
      title="List of Completed Projects"
      image="/assets/img/completed_projects/mettur-barrage-vi-2x15-mw/sseb_gate-works.jpg"
    >
      <p>
        {projectRegister.length} works completed between {years[0]} and{' '}
        {years[years.length - 1]}, as recorded in the company register.
      </p>

      {/* year filter */}
      <div className="mt-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveYear('all')}
          className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
            activeYear === 'all'
              ? 'bg-accent text-white'
              : 'bg-subtle text-body hover:bg-accent-soft hover:text-accent'
          }`}
        >
          All years
        </button>

        {years.map((year) => (
          <button
            key={year}
            type="button"
            onClick={() => setActiveYear(year)}
            className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
              activeYear === year
                ? 'bg-accent text-white'
                : 'bg-subtle text-body hover:bg-accent-soft hover:text-accent'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      <div className="mt-10 space-y-10">
        {groups.map((group) => (
          <section key={group.year}>
            <h2 className="flex items-center gap-3 text-left">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent"
              >
                <CalendarIcon className="h-[18px] w-[18px]" />
              </span>
              <span className="title-md">{group.year}</span>
              <span className="text-[13px] font-normal text-muted">
                {group.entries.length} {group.entries.length === 1 ? 'project' : 'projects'}
              </span>
            </h2>

            <Stagger as="ul" className="mt-4 space-y-2">
              {group.entries.map((entry) => (
                <Stagger.Item as="li" key={entry.no}>
                  <div className="group relative flex items-start gap-4 overflow-hidden rounded-xl border border-line bg-subtle px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-page hover:shadow-card">
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100"
                    />
                    <CheckCircleIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent" />
                    <span className="flex-1 text-[15.5px] leading-relaxed">{entry.name}</span>
                    <span className="shrink-0 whitespace-nowrap text-[13px] tabular-nums text-muted">
                      {entry.date}
                    </span>
                  </div>
                </Stagger.Item>
              ))}
            </Stagger>
          </section>
        ))}
      </div>

      {groups.length === 0 && (
        <p className="mt-10 flex items-center gap-3 rounded-2xl border border-line bg-subtle p-6">
          <ListIcon className="h-5 w-5 text-muted" />
          No projects recorded for that year.
        </p>
      )}
    </PageShell>
  )
}
