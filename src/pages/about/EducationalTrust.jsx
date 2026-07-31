import PageShell from '../../components/PageShell'
import Stagger from '../../components/Stagger'
import { ArrowRightIcon, GraduationIcon } from '../../components/Icons'

// Converted from about/educational-trust.php. Copy and links are unchanged —
// the five entries that pointed at "#" in the PHP have no site of their own,
// so they stay as plain text rather than becoming dead links.
const gallery = [
  {
    image: '/assets/img/edu_trust/sri-venkateshwara-educational-trust-sseb-venkatachalam.jpg',
    caption: 'Sri Venkateshwara Educational & Charitable Trust',
  },
  {
    image: '/assets/img/edu_trust/sri-venkateshwara-group-of-institutions.jpg',
    caption: 'Sri Venkateshwara Group of Institutions',
  },
]

const institutions = [
  {
    name: 'Shree Venkateshwara Hi–Tech Engineering College, Gobichettipalayam, Tamilnadu.',
    href: 'http://www.svhec.com/',
  },
  {
    name: 'Shree Venkateshwara Hi–Tech Polytechnic College, Gobichettipalayam, Tamilnadu.',
    href: 'http://www.svhpc.com/',
  },
  { name: 'Shree Venkateshwara College Of Paramedical Sciences, Gobichettipalayam, Tamilnadu.' },
  { name: 'Shree Venkateshwara College Of Nursing, Gobichettipalayam, Tamilnadu.' },
  { name: 'Shree Venkateshwara College Of Arts & Science, Gobichettipalayam, Tamilnadu.' },
  { name: 'Sri Venkateshwara Vidhyalayaa Matriculation School, Gobichettipalayam, Tamilnadu.' },
  { name: 'Sri Venkateshwara Vidhyalayaa Higher Secondary School, Gobichettipalayam, Tamilnadu.' },
  { name: 'Sri Venkateshwara Vidhyalayaa Teacher Training Institute, Gobichettipalayam, Tamilnadu.' },
  { name: 'Sri Venkateshwara Vidhyalayaa College of Education, Gobichettipalayam, Tamilnadu.' },
  {
    name: 'Sri Venkateshwara Vidhyalayaa International (CBSE), Gobichettipalayam, Tamilnadu.',
    href: 'http://svvinstitutions.org/CBSE/index.php',
  },
  { name: 'Sri Venkateshwara Vidhyalayaa Montessori, Gobichettipalayam, Tamil Nadu.' },
  { name: 'Sri Venkateshwara Vidhyalayaa Montessori, Erode District, Tamil Nadu.' },
  { name: 'Sri Venkateshwara Vidhyalayaa Nursery & Primary, Kavindapadi, Tamil Nadu.' },
  { name: 'Veena Vidhyalayaa Nursery & Primary School, Vellankovil, Erode, Tamil Nadu.' },
]

export default function EducationalTrust() {
  return (
    <PageShell section="About" title="Educational Trust">
      <Stagger className="grid gap-4 sm:grid-cols-2">
        {gallery.map((item) => (
          <Stagger.Item as="figure" key={item.image} className="group overflow-hidden rounded-2xl border border-line">
            <div className="overflow-hidden">
              <img
                src={item.image}
                alt={item.caption}
                loading="lazy"
                className="h-52 w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
              />
            </div>
            <figcaption className="bg-subtle px-4 py-3 text-[14px] font-medium text-ink transition-colors group-hover:bg-accent group-hover:text-white">
              {item.caption}
            </figcaption>
          </Stagger.Item>
        ))}
      </Stagger>

      <p className="mt-10">
        <strong className="font-semibold text-ink">Dr.P.Venkatachalam</strong> Chairman Cum Managing
        Director of Sri Venkateshwara Educational &amp; Charitable Trust and Sri Venkateshwara
        Vidhya Mandir Trust at Gobichettipalayam, Erode District, Tamil Nadu, India. The following
        Group of Educational Institutions are now running by the above Trust.
      </p>

      <h2 className="title-md mt-10">Our group of institutions</h2>

      <Stagger as="ul" className="mt-6 grid gap-3">
        {institutions.map((institution) => {
          const content = (
            <>
              <GraduationIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-hover:scale-110" />
              <span className="flex-1">{institution.name}</span>
              {institution.href && (
                <ArrowRightIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
              )}
            </>
          )

          return (
            <Stagger.Item as="li" key={institution.name}>
              {institution.href ? (
                <a
                  href={institution.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex gap-4 rounded-2xl border border-line bg-page p-5 text-[16px] leading-relaxed text-ink transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-card"
                >
                  {content}
                </a>
              ) : (
                <div className="flex gap-4 rounded-2xl border border-line bg-subtle p-5 text-[16px] leading-relaxed">
                  {content}
                </div>
              )}
            </Stagger.Item>
          )
        })}
      </Stagger>
    </PageShell>
  )
}
