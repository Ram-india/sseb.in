import { useParams } from 'react-router-dom'

export default function ProjectDetail() {
  const { slug } = useParams()
  const title = slug?.replace(/[-]/g, ' ') ?? 'Project'

  return (
    <section className="mx-auto max-w-7xl space-y-4 px-4 py-10">
      <h2 className="text-3xl font-semibold">Project Details</h2>
      <p className="text-body">Detail view for the completed project: {title}</p>
      <div className="rounded-xl border border-line bg-surface p-6 shadow-sm">
        <p className="text-muted">This placeholder route supports the project slug under /projects/completed-projects/:slug.</p>
      </div>
    </section>
  )
}
