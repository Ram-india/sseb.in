import PageShell from '../../components/PageShell'
import Stagger from '../../components/Stagger'
import Tilt3D from '../../components/Tilt3D'
import { ongoingProjects } from '../../data/ongoingProjects'
import { CheckCircleIcon, PulseIcon } from '../../components/Icons'

const toneClass = {
  grid: 'tone-grid',
  water: 'tone-water',
  solar: 'tone-solar',
  civic: 'tone-civic',
  earth: 'tone-earth',
}

// Converted from projects/on-going-projects.php.
export default function OnGoingProjects() {
  return (
    <PageShell
      section="Projects"
      title="On going Projects"
      image="/assets/img/on_going_projects/BOOTHATHANKETU-POWER-HOUSE-SSEB.jpg"
    >
      <p>Works currently under execution across hydro, civil and thermal infrastructure.</p>

      <Stagger className="mt-10 space-y-6">
        {ongoingProjects.map((project) => (
          <Stagger.Item as="section" key={project.title}>
            <article
              className={`${toneClass[project.tone] ?? toneClass.grid} group relative overflow-hidden rounded-2xl border border-line bg-subtle p-7 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-page hover:shadow-card lg:p-9`}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                style={{ backgroundColor: 'rgb(var(--tone))' }}
              />

              <div className="flex flex-wrap items-center gap-3">
                <span aria-hidden="true" className="card-badge flex h-11 w-11 items-center justify-center rounded-full">
                  <PulseIcon className="h-[22px] w-[22px]" />
                </span>
                <p className="card-eyebrow eyebrow text-[12px]">{project.client}</p>
              </div>

              <h2 className="mt-5 text-left text-[22px] font-bold leading-snug text-ink">
                {project.title}
              </h2>

              <p className="mt-4">{project.body}</p>

              {project.scope && (
                <ul className="mt-5 space-y-2">
                  {project.scope.map((line) => (
                    <li key={line} className="flex gap-3 text-[15.5px]">
                      <CheckCircleIcon className="mt-1 h-4 w-4 shrink-0 text-accent" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              )}

              {project.gallery.length > 0 && (
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {project.gallery.map((image) => (
                    <Tilt3D key={image} max={7} lift={8}>
                      <figure className="overflow-hidden rounded-xl border border-line">
                        <img
                          src={image}
                          alt={project.title}
                          loading="lazy"
                          className="h-44 w-full object-cover"
                        />
                      </figure>
                    </Tilt3D>
                  ))}
                </div>
              )}
            </article>
          </Stagger.Item>
        ))}
      </Stagger>
    </PageShell>
  )
}
