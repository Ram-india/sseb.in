import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider'
import ProjectShowcase from '../components/ProjectShowcase'
import Clients from '../components/Clients'
import StackedCards from '../components/StackedCards'
import Reveal from '../components/Reveal'
import ScrollDrift from '../components/ScrollDrift'
import CountUp from '../components/CountUp'
import useParallax from '../hooks/useParallax'
import {
  ArrowRightIcon,
  CalendarIcon,
  CertificateIcon,
  ClockIcon,
  LayersIcon,
} from '../components/Icons'

// Converted from index.php. Every figure and every line of copy below comes
// from the existing site — the intro paragraph, the footer blurb, the
// projects meta description.
const credentials = [
  { count: 1981, label: 'Established', Icon: CalendarIcon },
  { count: 45, suffix: '+', label: 'Years of service', Icon: ClockIcon },
  { count: 53, suffix: '+', label: 'Major projects', Icon: LayersIcon },
  { text: 'ISO', label: '9001:2008 certified', Icon: CertificateIcon },
]

const featureCards = [
  {
    title: 'Project at a glance',
    body: 'Our projects are born out of High technology and the ideas, commitment, encouragement, respect, and hard work of our dynamic team.',
    to: '/projects/completed-projects',
  },
  {
    title: 'Quality policy',
    body: 'To deliver products and services confirming to applicable regulations and International standards & Quality to satisfy customer needs.',
    to: '/about/quality-policy',
  },
  {
    title: 'Educational trust',
    body: 'Mr.P.Venkatachalam CHAIRMAN Cum Managing Director of Sri Venkateshwara Educational & Charitable Trust.',
    to: '/about/educational-trust',
  },
]

export default function Home() {
  const chairmanRef = useParallax(28, 'scale(1.08)')

  return (
    <>
      {/* The hero stays put while everything after it scrolls up and over,
          so the page reads as a sheet sliding across a fixed backdrop. It
          sticks below the header, not under it. */}
      <div
        className="sticky z-0"
        style={{ top: 'var(--header-height-live, var(--header-height, 110px))' }}
      >
        <HeroSlider />
      </div>

      {/* Opaque and above the hero — this is what does the overlapping. The
          upward shadow gives the leading edge some lift. No overflow-hidden
          here: it would break the sticky sections nested inside. */}
      <div className="relative z-10 bg-page shadow-[0_-28px_60px_-28px_rgb(var(--c-shadow)/0.45)]">

        {/* credentials */}
        <section
          className="border-b border-line border-t-2 border-t-accent bg-surface"
          aria-label="SSEB at a glance"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <dl className="grid grid-cols-2 gap-y-10 py-14 lg:grid-cols-4 lg:py-16">
              {credentials.map((item, itemIndex) => (
                <Reveal
                  key={item.label}
                  delay={itemIndex * 110}
                  scale
                  className="flex flex-col items-center text-center lg:border-r lg:border-line lg:last:border-r-0"
                >
                  <span
                    aria-hidden="true"
                    className={`mb-4 flex h-11 w-11 items-center justify-center rounded-full ${
                      item.text ? 'bg-highlight/15 text-highlight' : 'bg-accent-soft text-accent'
                    }`}
                  >
                    <item.Icon className="h-[22px] w-[22px]" />
                  </span>

                  <dt
                    className={`font-heading text-4xl font-bold tracking-[-0.03em] lg:text-5xl ${
                      item.text ? 'text-highlight' : 'text-ink'
                    }`}
                  >
                    {item.text ?? <CountUp to={item.count} suffix={item.suffix ?? ''} />}
                  </dt>
                  <dd className="mt-2 text-[15px] text-muted">{item.label}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* company overview */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <ScrollDrift distance={44} className="lg:col-span-5">
                <Reveal>
                <p className="eyebrow">Who we are</p>
                <h2 className="display-2 mt-4">
                  Engineering India’s power and water infrastructure since 1981.
                </h2>
                <Link to="/about/company-profile" className="btn-primary mt-8">
                  Read more
                  <ArrowRightIcon />
                </Link>
                </Reveal>
              </ScrollDrift>

              <ScrollDrift distance={-28} className="lg:col-span-7">
                <Reveal delay={140}>
                <article className="prose-corporate">
                  <p>
                    Sree Saravana Engineering Bhavani Private Limited (SSEB) has contributed
                    substantially and creditably in providing expertise in construction field such as
                    earth fill, rock fill and concrete Dams and Tunnels, and Engineering Procurement
                    Construction (EPC) which includes Civil, Mechanical and Electrical works, Design,
                    Manufacture, Supply, Erection, Testing and Commissioning of Hydro Mechanical
                    &amp; Electro Mechanical equipment’s such as steel liner and Penstock, Water line
                    pipes (more than 1meter to 3meters) Turbine, Generator, Excitation System, LCU
                    Panel, Indoor Electrical Control Panels, Outdoor Substation and connected
                    Electrical &amp; Mechanical Works and thus SSEB has fulfilling India’s ever
                    increasing need for hydroelectric power Projects, Solar Power Plant (EPC), Road
                    &amp; Infrastructure Projects.
                  </p>
                  <p>
                    The SSEB group has served to the nation for the past 45 years, uniquely poised to
                    attain leadership position. The organization is expertise in the Hydro Power
                    Generation field, Civil, Mechanical &amp; Electrical Infrastructure Projects. M/s
                    SSEB has constructing Thermal and Hydro Power Projects across the country. M/s
                    .SSEB is fast emerging as one of the leading Government Sector Power Developers in
                    India with 1 MW to 500 MW Power Sector units.
                  </p>
                </article>
                </Reveal>
              </ScrollDrift>
            </div>
          </div>
        </section>

        {/* pinned horizontal scroll rail */}
        <ProjectShowcase />

        {/* clients */}
        <Clients />

        {/* chairman + vision & mission */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <ScrollDrift distance={36}>
                <Reveal direction="right" scale>
                <div className="overflow-hidden rounded-2xl">
                  <img
                    ref={chairmanRef}
                    src="/assets/img/chairman.jpg"
                    alt="Mr. P. Venkatachalam, Chairman cum Managing Director of SSEB"
                    width="1542"
                    height="1359"
                    loading="lazy"
                    className="w-full will-change-transform"
                  />
                </div>
                </Reveal>
              </ScrollDrift>

              <ScrollDrift distance={-34}>
                <Reveal>
                  <p className="eyebrow">Our purpose</p>
                  <h2 className="display-2 mt-4">Vision &amp; Mission</h2>
                </Reveal>

                <div className="mt-10 space-y-6">
                  <Reveal delay={120} direction="left" className="rounded-2xl bg-subtle p-7 transition-colors hover:bg-subtle">
                    <h3 className="text-xl font-bold">Vision</h3>
                    <p className="prose-corporate mt-3">
                      Provide high-quality services in different countries in order to be recognized
                      as a key factor in our clients success and also determine to adopt the latest
                      technolgies with fresh ideas by creating quality minded organisational setup to
                      satisfy the client expectations on the ground of international level.
                    </p>
                  </Reveal>

                  <Reveal delay={220} direction="left" className="rounded-2xl bg-subtle p-7 transition-colors hover:bg-subtle">
                    <h3 className="text-xl font-bold">Mission</h3>
                    <p className="prose-corporate mt-3">
                      To deliver the finest quality service in developing Society by employing
                      innovative approaches. Development of Country through Leadership,
                      Entrepreneurship and Ownership
                    </p>
                  </Reveal>
                </div>
              </ScrollDrift>
            </div>
          </div>
        </section>

        {/* overlapping stacked cards on scroll */}
        <StackedCards
          eyebrow="What we stand for"
          title="Built on quality, safety and service."
          cards={featureCards}
        />

        {/* closing CTA band */}
        <section className="band-deep">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
            <Reveal scale className="mx-auto max-w-3xl text-center">
              <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-secondary">
                Start a conversation
              </p>
              <h2 className="display-2 mt-4 text-white">Let’s build something that lasts.</h2>
              <p className="lead mt-5 text-muted">
                Talk to our team about your hydro, civil or infrastructure project.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="btn-light">
                  Contact Us
                </Link>
                <Link to="/careers/careers-in-sseb" className="btn-light-outline">
                  Careers at SSEB
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  )
}
