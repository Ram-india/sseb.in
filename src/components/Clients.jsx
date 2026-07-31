import { Link } from 'react-router-dom'
import { clients } from '../data/clients'
import Reveal from './Reveal'
import { ArrowRightIcon } from './Icons'

// Written out in full rather than built as `tone-${...}`: Tailwind scans the
// source for literal class names, and a constructed one gets purged.
const toneClass = {
  grid: 'tone-grid',
  water: 'tone-water',
  solar: 'tone-solar',
  civic: 'tone-civic',
  earth: 'tone-earth',
}

function ClientPlate({ client }) {
  return (
    <div
      className={`${toneClass[client.tone] ?? toneClass.grid} group flex w-[290px] shrink-0 flex-col rounded-2xl border border-line bg-page p-6 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-cardHover`}
    >
      <span
        aria-hidden="true"
        className="card-badge flex h-12 w-12 items-center justify-center rounded-full font-heading text-[13px] font-extrabold tracking-tight"
      >
        {client.short}
      </span>

      <p className="mt-5 text-[16px] font-semibold leading-snug text-ink">{client.name}</p>
      <p className="mt-2 text-justify text-[14px] leading-relaxed text-muted">{client.work}</p>
    </div>
  )
}

/**
 * There are no client logos in the asset library, so this is a name plate wall
 * rather than a logo wall — the initials carry the client's tone, which keeps
 * it consistent with the colour coding on the project cards.
 *
 * The rail runs as a seamless marquee: the list is rendered twice and the
 * track travels exactly half its width, so the seam never shows. It stops
 * under the cursor and when tabbed into, so a plate can always be read.
 */
export default function Clients() {
  return (
    <section className="border-y border-line bg-subtle py-20 lg:py-28" aria-label="Our clients">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="eyebrow">Our clients</p>
            <h2 className="display-2 mt-4">
              Delivered for boards, corporations and departments across South India.
            </h2>
          </div>

          <Link to="/projects/completed-projects-list" className="link-arrow">
            See the project record
            <ArrowRightIcon />
          </Link>
        </Reveal>
      </div>

      <Reveal className="marquee mt-12">
        <div className="marquee-track py-1">
          {clients.map((client) => (
            <ClientPlate key={client.short} client={client} />
          ))}

          {/* The second pass is what makes the loop seamless; it is decoration
              as far as assistive tech is concerned. */}
          {clients.map((client) => (
            <div key={`${client.short}-loop`} aria-hidden="true">
              <ClientPlate client={client} />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
