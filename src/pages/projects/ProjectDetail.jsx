import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageShell from '../../components/PageShell'
import Stagger from '../../components/Stagger'
import Tilt3D from '../../components/Tilt3D'
import Seo from '../../components/Seo'
import { completedProjects, findProject } from '../../data/completedProjects'
import { ArrowRightIcon, BuildingIcon, CloseIcon, MapPinIcon } from '../../components/Icons'

/** Click a photo to open it full size; Escape or the backdrop closes it. */
function Lightbox({ image, title, onClose }) {
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-deep/90 p-4 backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 rounded-full border border-white/30 p-2 text-white transition hover:border-accent hover:bg-accent"
      >
        <CloseIcon />
      </button>
      <img
        src={image}
        alt={title}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[88vh] max-w-full rounded-xl object-contain shadow-panel"
      />
    </div>
  )
}

// Converted from the twenty pages under projects/completed-projects/ — one
// template driven by data, replacing twenty near-identical PHP files.
export default function ProjectDetail() {
  const { slug } = useParams()
  const project = findProject(slug)
  const [lightbox, setLightbox] = useState(null)

  if (!project) {
    return (
      <PageShell section="Projects" title="Project not found">
        <p>That project is not in the completed-projects register.</p>
        <Link to="/projects/completed-projects" className="btn-primary mt-8">
          All completed projects
          <ArrowRightIcon />
        </Link>
      </PageShell>
    )
  }

  const others = completedProjects.filter((entry) => entry.slug !== project.slug).slice(0, 3)

  return (
    <>
      <Seo
        title={`SSEB | ${project.title}`}
        description={[project.title, project.place, project.department]
          .filter(Boolean)
          .join(' — ')}
      />

      <PageShell section="Projects" title={project.title} image={project.cover}>
        {/* project info, as the PHP page's info list */}
        <dl className="grid gap-4 sm:grid-cols-2">
          {project.department && (
            <div className="flex items-start gap-3 rounded-2xl border border-line bg-subtle p-5">
              <BuildingIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <dt className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Department
                </dt>
                <dd className="mt-1 text-left font-semibold text-ink">{project.department}</dd>
              </div>
            </div>
          )}

          {project.place && (
            <div className="flex items-start gap-3 rounded-2xl border border-line bg-subtle p-5">
              <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <dt className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Place
                </dt>
                <dd className="mt-1 text-left font-semibold text-ink">{project.place}</dd>
              </div>
            </div>
          )}
        </dl>

        {project.summary && <p className="mt-8">{project.summary}</p>}

        {project.gallery.length > 0 && (
          <>
            <h2 className="title-md mt-12">
              Project gallery
              <span className="ml-3 text-[13px] font-normal text-muted">
                {project.gallery.length} photographs
              </span>
            </h2>

            <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((image) => (
                <Stagger.Item key={image}>
                  <Tilt3D max={8} lift={12}>
                    <button
                      type="button"
                      onClick={() => setLightbox(image)}
                      className="group block w-full overflow-hidden rounded-xl border border-line bg-surface shadow-card transition-shadow duration-300 hover:shadow-cardHover"
                    >
                      <img
                        src={image}
                        alt={project.title}
                        loading="lazy"
                        className="h-44 w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
                      />
                    </button>
                  </Tilt3D>
                </Stagger.Item>
              ))}
            </Stagger>
          </>
        )}

        <h2 className="title-md mt-14">Other projects</h2>
        <Stagger as="ul" className="mt-6 grid gap-4 sm:grid-cols-3">
          {others.map((entry) => (
            <Stagger.Item as="li" key={entry.slug}>
              <Link
                to={`/projects/completed-projects/${entry.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-card"
              >
                <img
                  src={entry.cover}
                  alt={entry.title}
                  loading="lazy"
                  className="h-32 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <p className="flex-1 p-4 text-left text-[15px] font-semibold leading-snug text-ink">
                  {entry.title}
                </p>
              </Link>
            </Stagger.Item>
          ))}
        </Stagger>

        <Link to="/projects/completed-projects" className="btn-outline mt-10">
          All completed projects
          <ArrowRightIcon />
        </Link>
      </PageShell>

      {lightbox && (
        <Lightbox image={lightbox} title={project.title} onClose={() => setLightbox(null)} />
      )}
    </>
  )
}
