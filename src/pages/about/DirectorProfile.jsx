import PageShell from '../../components/PageShell'
import Stagger from '../../components/Stagger'
import { CertificateIcon } from '../../components/Icons'

// Converted from about/director-profile.php. Copy is unchanged.
const honours = [
  'The Academy of Universal Global Peace has awarded the degree of "DOCTOR OF SOCIAL WORKS" (HONORIS CAUSA)',
  'The New International Christian Advanced Academy has awarded "LIFE TIME ACHIEVEMENT AWARD".',
  'The Royal Academy of Global Peace American Higher Educational Academy has awarded to our beloved Chairman cum Managing Director Dr.P.Venkatachalam the "INTERNATIONAL ACADEMY AWARD".',
  'He is the recipient of many awards and honors. The most prestigious award of which is the “BEST CUSTOMERS SATISFACTION AWARD”, conferred to him by the Chennai Friends Cultural Academy.',
  'He has also been receiving “OUTSTANDING NATIONAL CITIZEN AWARD” given by National Citizens Club, New Delhi.',
  'He has been awarded with the "THOZIL CHEMMAL AWARD" for being one of the top businessmen of Tamil Nadu.',
]

export default function DirectorProfile() {
  return (
    <PageShell section="About" title="Director Profile">
      <div className="grid gap-8 sm:grid-cols-2 sm:items-start">
        <img
          src="/assets/img/chairman.jpg"
          alt="Dr. P. Venkatachalam, Chairman and Managing Director of SSEB"
          width="1542"
          height="1359"
          loading="lazy"
          className="w-full rounded-2xl border border-line transition-transform duration-500 hover:scale-[1.02]"
        />

        <p className="sm:mt-1">
          Dr.P.Venkatachalam is the Chairman and Managing Director of the Board of Sree Saravana
          Engineering Bhavani Private Limited. Mrs.Poongodi Venkatachalam is the co-founder of
          M/S.SSEB Private Limited. He is a born fighter. He battled adversity in his childhood.
          <br />
          <br />
          M/S SSEB Private limited is South India’s largest to undertake Government Construction
          activites and Hydro Power Projects(EPC) in all over India and across the globe.
        </p>
      </div>

      <h2 className="title-md mt-12">Awards and honours</h2>

      <Stagger as="ul" className="mt-6 space-y-3">
        {honours.map((honour) => (
          <Stagger.Item as="li" key={honour}>
            <div className="group relative flex gap-4 overflow-hidden rounded-2xl border border-line bg-subtle p-5 text-[16px] leading-relaxed transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-page hover:shadow-card">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-highlight transition-transform duration-400 ease-out group-hover:scale-y-100"
              />
              <CertificateIcon className="mt-0.5 h-5 w-5 shrink-0 text-highlight transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-8deg]" />
              <span>{honour}</span>
            </div>
          </Stagger.Item>
        ))}
      </Stagger>

      <figure className="mt-12">
        <img
          src="/assets/images/sseb-chairman-awards.jpg"
          alt="Dr. P. Venkatachalam receiving awards"
          loading="lazy"
          className="w-full rounded-2xl border border-line transition-transform duration-500 hover:scale-[1.01]"
        />
      </figure>
    </PageShell>
  )
}
