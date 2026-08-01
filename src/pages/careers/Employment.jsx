import PageShell from '../../components/PageShell'
import Stagger from '../../components/Stagger'
import Tilt3D from '../../components/Tilt3D'
import { CalendarIcon, CertificateIcon, ShieldCheckIcon, UsersIcon } from '../../components/Icons'

// Converted from careers/employment.php. Copy is unchanged.
const benefits = [
  {
    title: 'Preferred Provider Health Plan',
    Icon: ShieldCheckIcon,
    body: 'This package includes medical, pharmaceutical and dental coverage at no cost to the employee. Employees may add coverage for their dependents at group rates.',
  },
  {
    title: 'Life Insurance and Accidental Death Benefits',
    Icon: CertificateIcon,
    body: 'In addition to medical and dental benefits, we provides employees with life insurance coverage and accidental death benefits.',
  },
  {
    title: '401(k) Plan',
    Icon: UsersIcon,
    body: 'We maintains a 401(k) Retirement Plan designed to enable eligible employees to gain a measure of economic security for retirement beyond that provided by contributions made by the company and its employees to Social Security. Company contributions are determined on a yearly basis. However, every year since 2002.',
  },
  {
    title: 'Holidays and Paid Time Off',
    Icon: CalendarIcon,
    body: 'Hourly and salaried employees are provided with paid holidays and paid time off competitive with industry standards.',
  },
]

export default function Employment() {
  return (
    <PageShell
      section="Careers"
      title="Employment"
      image="/assets/img/completed_projects/police-quarters/police-quarters-chithode-sseb.jpg"
    >
      <p>
        We M/s. Sree Saravana Engineering Bhavani Pvt Ltd, is proud to offer its employees a very
        competitive benefits package.
      </p>

      <Stagger as="ul" className="mt-8 grid gap-5 sm:grid-cols-2">
        {benefits.map((benefit) => (
          <Stagger.Item as="li" key={benefit.title}>
            <Tilt3D max={7} lift={10} className="h-full">
              <div className="group h-full rounded-2xl border border-line bg-subtle p-6 transition-shadow duration-300 hover:shadow-cardHover">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent transition-all duration-400 group-hover:scale-110 group-hover:bg-accent group-hover:text-white"
                  style={{ transform: 'translateZ(28px)' }}
                >
                  <benefit.Icon className="h-[22px] w-[22px]" />
                </span>
                <h2
                  className="mt-5 text-left text-[18px] font-bold leading-snug text-ink"
                  style={{ transform: 'translateZ(18px)' }}
                >
                  {benefit.title}
                </h2>
                <p className="mt-3 text-[15.5px]">{benefit.body}</p>
              </div>
            </Tilt3D>
          </Stagger.Item>
        ))}
      </Stagger>
    </PageShell>
  )
}
