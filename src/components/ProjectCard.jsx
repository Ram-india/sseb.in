import { Link } from 'react-router-dom'
import { ArrowRightIcon, BoltIcon, SunIcon } from './Icons'

// Written out in full rather than built as `tone-${...}`: Tailwind scans the
// source for literal class names, and a constructed one gets purged from the
// stylesheet even though it is defined.
const toneClass = {
  grid: 'tone-grid',
  water: 'tone-water',
  solar: 'tone-solar',
}

/**
 * header → media → footer, the shape of an Adobe elastic-carousel-item.
 * Shared by the swipe rail and the pinned horizontal showcase.
 */
export default function ProjectCard({ project }) {
  return (
    <Link
      to={project.to}
      className="elastic-card group flex h-full flex-col overflow-hidden rounded-2xl py-3 "
    >
      <div className={`${toneClass[project.tone] ?? toneClass.grid} flex items-center gap-3 px-3 pb-4 pt-3`}>
        <span
          aria-hidden="true"
          className="card-badge flex h-9 w-9 shrink-0 items-center justify-center rounded"
        >
          {project.icon === 'solar' ? (
            <SunIcon className="h-[18px] w-[18px]" />
          ) : (
            <BoltIcon className="h-[18px] w-[18px]" />
          )}
        </span>
        <p className="eyebrow card-eyebrow text-[12px] leading-tight">{project.client}</p>
      </div>

      {/* Fixed height, not an aspect ratio: the card's width changes on hover,
          and a ratio would change its height with it — the whole row would
          jump. A fixed height also means widening simply reveals more of these
          very wide (2.53:1) photographs, which is the nicer reveal. */}
      {/* Full-bleed band (the card has no horizontal padding), so no corner
          radius here — rounded corners would cut notches of card background
          into the sides, which the hover tint would make obvious. */}
      <div className="h-[260px] overflow-hidden sm:h-[300px] lg:h-[340px]">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
        />
      </div>

      <div className="flex flex-1 items-end justify-between gap-4 px-3 pb-4 pt-7">
        {/* min-height reserves room for a two-line title, so a short name and a
            long one produce the same card height */}
        <div className="min-h-[76px]">
          <h3 className="card-title text-[22px] font-bold leading-snug">{project.title}</h3>
          <p className="card-detail mt-2 text-[15px]">{project.detail}</p>
        </div>

        <span
          aria-hidden="true"
          className="card-chip mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border group-hover:!border-accent group-hover:!bg-accent group-hover:!text-white"
        >
          <ArrowRightIcon className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}
