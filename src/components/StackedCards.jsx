import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import useMediaQuery from '../hooks/useMediaQuery'
import useReducedMotion from '../hooks/useReducedMotion'
import { ArrowRightIcon } from './Icons'

/**
 * Overlap-on-scroll: each card is sticky at a slightly lower offset than the
 * one before it, so they pile up and overlap as the page scrolls. The card
 * underneath also shrinks and dims as the next one covers it, which is what
 * sells the depth rather than a flat stack of rectangles.
 */
function StackedCard({ card, index, total }) {
  const ref = useRef(null)

  // Progress of this card travelling from its resting place to the top of the stack.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 30%', 'end 20%'],
  })

  // The last card never gets covered, so it never recedes.
  const isLast = index === total - 1
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.92])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.55])

  return (
    <div
      ref={ref}
      className="sticky"
      style={{
        top: `calc(var(--header-height, 110px) + ${2 + index * 1.75}rem)`,
      }}
    >
      <motion.article
        style={{ scale, opacity, transformOrigin: 'center top' }}
        className="group rounded-2xl border border-line bg-surface p-8 shadow-card lg:p-12"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-14">
          <div className="lg:w-1/3">
            <p className="eyebrow">{String(index + 1).padStart(2, '0')}</p>
            <h3 className="mt-3 font-heading text-[26px] font-bold leading-tight lg:text-[32px]">
              {card.title}
            </h3>
          </div>

          <div className="lg:w-2/3">
            <p className="text-[17px] leading-[1.7] text-body">{card.body}</p>
            <Link to={card.to} className="link-arrow mt-6">
              Read more
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

function PlainCard({ card, index }) {
  return (
    <article className="group rounded-2xl border border-line bg-surface p-8">
      <p className="eyebrow">{String(index + 1).padStart(2, '0')}</p>
      <h3 className="mt-3 font-heading text-[24px] font-bold leading-tight">{card.title}</h3>
      <p className="mt-4 text-[16px] leading-[1.7] text-body">{card.body}</p>
      <Link to={card.to} className="link-arrow mt-6">
        Read more
        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  )
}

export default function StackedCards({ cards, eyebrow, title }) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reduced = useReducedMotion()
  const stacked = isDesktop && !reduced

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display-2 mt-4">{title}</h2>
        </div>

        {stacked ? (
          // Extra bottom room so the last card can settle before the next section.
          <div className="mt-14 space-y-8 pb-24">
            {cards.map((card, index) => (
              <StackedCard key={card.title} card={card} index={index} total={cards.length} />
            ))}
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {cards.map((card, index) => (
              <PlainCard key={card.title} card={card} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
