import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../../components/PageShell'
import Stagger from '../../components/Stagger'
import Tilt3D from '../../components/Tilt3D'
import { completedProjects, projectCategories } from '../../data/completedProjects'
import { ArrowRightIcon, MapPinIcon } from '../../components/Icons'

// Converted from projects/completed-projects.php.
export default function CompletedProjects() {
  const [category, setCategory] = useState('all')

  const visible = useMemo(
    () =>
      category === 'all'
        ? completedProjects
        : completedProjects.filter((project) => project.category === category),
    [category],
  )

  // Counts come off the full list so a filter never shows itself as empty.
  const counts = useMemo(() => {
    const tally = { all: completedProjects.length }
    for (const project of completedProjects) {
      tally[project.category] = (tally[project.category] ?? 0) + 1
    }
    return tally
  }, [])

  return (
    <PageShell
      section="Projects"
      title="Completed Projects"
      image="/assets/img/completed_projects/bhavani-bb-1/dam-upstream-side.jpg"
    >
      <p>
        Hydro electric projects, barrages, reservoirs and civil works delivered for electricity
        boards, corporations and departments across Tamil Nadu, Kerala and Karnataka.
      </p>

      {/* category filter */}
      <div className="mt-8 flex flex-wrap gap-2">
        {projectCategories.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setCategory(option.id)}
            aria-pressed={category === option.id}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
              category === option.id
                ? 'bg-accent text-white'
                : 'bg-subtle text-body hover:bg-accent-soft hover:text-accent'
            }`}
          >
            {option.label}
            <span
              className={`rounded-full px-1.5 text-[11px] tabular-nums ${
                category === option.id ? 'bg-white/25' : 'bg-page text-muted'
              }`}
            >
              {counts[option.id] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* key on the category so the stagger replays when the filter changes */}
      <Stagger key={category} as="ul" className="mt-8 grid gap-6 sm:grid-cols-2">
        {visible.map((project) => (
          <Stagger.Item as="li" key={project.slug}>
            <Tilt3D className="h-full">
              <Link
                to={`/projects/completed-projects/${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-shadow duration-300 hover:shadow-cardHover"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.cover}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
                  />
                  {project.department && (
                    // pushed toward the viewer so it separates from the photo
                    <span
                      className="absolute left-4 top-4 rounded-full bg-deep/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm"
                      style={{ transform: 'translateZ(38px)' }}
                    >
                      {project.department}
                    </span>
                  )}
                </div>

                <div
                  className="flex flex-1 flex-col p-6"
                  style={{ transform: 'translateZ(22px)' }}
                >
                  <h2 className="text-left text-[19px] font-bold leading-snug text-ink">
                    {project.title}
                  </h2>

                  {project.place && (
                    <p className="mt-2 flex items-center gap-2 text-left text-[14px] text-muted">
                      <MapPinIcon className="h-4 w-4 shrink-0 text-accent" />
                      {project.place}
                    </p>
                  )}

                  <span className="link-arrow mt-5 self-start">
                    View project
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Tilt3D>
          </Stagger.Item>
        ))}
      </Stagger>
    </PageShell>
  )
}
