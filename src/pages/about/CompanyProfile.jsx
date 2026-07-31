import { Link } from 'react-router-dom'
import PageShell from '../../components/PageShell'
import Stagger from '../../components/Stagger'
import { CheckCircleIcon } from '../../components/Icons'

// Converted from about/company-profile.php. Copy is unchanged.
const capabilities = [
  'Hydro Power Projects (EPC)',
  'Thermal Power Projects (EPC)',
  'Solar Power Plant (EPC)',
  'Dam & Irrigation Projects',
  'Industrial Building Projects',
  'Road & Infrastructure Projects',
]

export default function CompanyProfile() {
  return (
    <PageShell section="About" title="Company Profile">
      <p>
        <strong className="font-semibold text-ink">
          Sree Saravana Engineering Bhavani Private Limited (SSEB)
        </strong>{' '}
        has contributed substantially and creditably in providing expertise in construction field
        such as earth fill, rock fill and concrete Dams and Tunnels, and Engineering Procurement
        Construction (EPC) which includes Civil, Mechanical and Electrical works, Design,
        Manufacture, Supply, Erection, Testing and Commissioning of Hydro Mechanical &amp; Electro
        Mechanical equipment’s such as steel liner and Penstock, Water line pipes (more than 1meter
        to 3meters) Turbine, Generator, Excitation System, LCU Panel, Indoor Electrical Control
        Panels, Outdoor Substation and connected Electrical &amp; Mechanical Works and thus SSEB has
        fulfilling India’s ever increasing need for hydroelectric power Projects, Solar Power Plant
        (EPC), Road &amp; Infrastructure Projects.
      </p>

      <p>
        The SSEB group has served to the nation for the past 45 years, uniquely poised to attain
        leadership position. The organization is expertise in the Hydro Power Generation field,
        Civil, Mechanical &amp; Electrical Infrastructure Projects. M/s SSEB has constructing
        Thermal and Hydro Power Projects across the country. M/s .SSEB is fast emerging as one of
        the leading Government Sector Power Developers in India with 1 MW to 500 MW Power Sector
        units
      </p>

      <p>
        Sree Saravana Engineering Bhavani is loyal in providing the best client service to all its
        clients. With the assistance and support of our diligent team, we have served our clients in
        the best possible manner and completed the ordered consignments within the given time. Apart
        from ensuring the on-time delivery of goods in line with strict quality, engineering
        standards of clients and safety for all. We also try to provide the highest quality of
        customer support to all our valuable clients.
      </p>

      <p>
        With strong commitment towards customer satisfaction, we exercise quality and technology at
        the core to achieve it since the inception. We act as a solution provider for the demands of
        today’s applications and needs. Our industry is well equipped with the most modern
        equipment’s and assessment facilities to ensure quality at every stage. Our six units have
        been established to provide round the clock service to the clients. We provide hygienic and
        safety environment to all in the all facilities. Over the years the missionary goal and
        focus of the management under the visionary leadership of our managing director
        Dr.P.Venkatachalam had made us known for product merits and superior quality. As a
        professionally managed organization we look forward to the new millennium with the passion
        to work for the land where we were born.
      </p>

      <p>
        The engineering works are carried out in our own fabrication unit which has state of the art
        facilities that helps us accomplish every project we undertake impeccably. We have always
        believed in teamwork, perfection and dedication in our service. We are looking at providing
        the best service to our clients both in quality and time.
      </p>

      {/* the two check-lists from the PHP, merged into one grid */}
      <Stagger as="ul" className="mt-10 grid gap-3 sm:grid-cols-2">
        {capabilities.map((item) => (
          <Stagger.Item as="li" key={item}>
            <Link
              to="/projects/completed-projects"
              className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-line bg-page px-4 py-3.5 text-[15px] font-medium text-ink transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-card"
            >
              {/* accent wash sweeps in from the left on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-0 bg-accent-soft transition-all duration-400 ease-out group-hover:w-full"
              />
              <CheckCircleIcon className="relative h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-hover:scale-110" />
              <span className="relative">{item}</span>
            </Link>
          </Stagger.Item>
        ))}
      </Stagger>

      <figure className="mt-12">
        <img
          src="/assets/img/ISO.jpg"
          alt="SSEB ISO 9001:2008 certificate"
          width="710"
          height="1007"
          loading="lazy"
          className="w-full max-w-lg rounded-2xl border border-line transition-transform duration-500 hover:scale-[1.02]"
        />
        <figcaption className="mt-3 text-[14px] text-muted">ISO 9001:2008 certificate</figcaption>
      </figure>
    </PageShell>
  )
}
