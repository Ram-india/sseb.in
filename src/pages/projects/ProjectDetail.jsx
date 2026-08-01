import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageShell from '../../components/PageShell'
import Stagger from '../../components/Stagger'
import Tilt3D from '../../components/Tilt3D'
import Seo from '../../components/Seo'
import Lightbox from '../../components/Lightbox'
import {
  completedProjects,
  findProject,
  projectCategories,
} from '../../data/completedProjects'
import { ArrowRightIcon, BuildingIcon, MapPinIcon, TagIcon } from '../../components/Icons'

const categoryLabel = (id) =>
  projectCategories.find((category) => category.id === id)?.label ?? id

// Converted from the twenty pages under projects/completed-projects/ — one
// template driven by data, replacing twenty near-identical PHP files.
export default function ProjectDetail() {
  const { slug } = useParams()
  const project = findProject(slug)
  const [lightboxIndex, setLightboxIndex] = useState(null)

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
        <dl className="grid gap-4 sm:grid-cols-3">
          {project.category && (
            <div className="flex items-start gap-3 rounded-2xl border border-line bg-subtle p-5">
              <TagIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <dt className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Category
                </dt>
                <dd className="mt-1 text-left font-semibold capitalize text-ink">
                  {categoryLabel(project.category)}
                </dd>
              </div>
            </div>
          )}
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

        {project.description && <p className="mt-8">{project.description}</p>}

        {project.gallery.length > 0 && (
          <>
            <h2 className="title-md mt-12">
              Project gallery
              <span className="ml-3 text-[13px] font-normal text-muted">
                {project.gallery.length} photographs
              </span>
            </h2>

            <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((image, imageIndex) => (
                <Stagger.Item key={image}>
                  <Tilt3D max={8} lift={12}>
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(imageIndex)}
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

      {lightboxIndex !== null && (
        <Lightbox
          images={project.gallery}
          index={lightboxIndex}
          title={project.title}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
