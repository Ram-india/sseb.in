import { Link } from 'react-router-dom'

const projects = [
  { slug: 'amaravathy-dam', name: 'Amaravathy Dam' },
  { slug: 'bhavani-barrage-1', name: 'Bhavani Barrage 1' },
  { slug: 'kodungaiyur-canel', name: 'Kodungaiyur Canel' },
]

export default function CompletedProjectsList() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold">Completed Projects List</h2>
        <p className="max-w-3xl text-body">A route for projects/completed-projects-list with sample project links.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.slug}
            to={`/projects/completed-projects/${project.slug}`}
            className="rounded-xl border border-line bg-surface p-4 shadow-sm transition hover:border-line hover:shadow"
          >
            <h3 className="text-xl font-semibold text-ink">{project.name}</h3>
            <p className="text-sm text-muted">Details for {project.name}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
