import PageShell from '../../components/PageShell'
import Stagger from '../../components/Stagger'
import { contact } from '../../data/site'
import { CheckCircleIcon, CompassIcon, MailIcon, PulseIcon } from '../../components/Icons'

// Converted from careers/careers-in-sseb.php. Copy is unchanged.
const hrStatements = [
  {
    title: 'Vision',
    Icon: CompassIcon,
    body: 'To partner with county departments to provide progressive human resources programs and innovative solutions to achieve organizational goals.',
  },
  {
    title: 'Mission',
    Icon: PulseIcon,
    body: 'To provide human resources services for county departments to enhance performance, engage employees and excel in delivering results.',
  },
]

const values = [
  'Be professional, respectful and accountable',
  'Welcome diverse perspectives and recognize multiple avenues for success',
  'Communicate openly and honestly',
  'Promote trust and integrity',
  'Drive innovation to meet challenges',
  'Foster a culture of collaboration',
  'Encourage growth and development to achieve excellence',
]

export default function CareersInSseb() {
  return (
    <PageShell
      section="Careers"
      title="Careers in SSEB"
      image="/assets/img/completed_projects/bhavani-bb-1/control-room.jpg"
    >
      <p>
        Sree Saravana Engineering Bhavani has been consistently and rapidly touching many milestones
        and it is our sense of focus which has put us there. We believe in an open culture and value
        integrity, commitment, teamwork and excellence towards work.
      </p>

      <p className="mt-5">
        As we continue to grow rapidly, professionals passionate about their work and opting to make
        a career with us today will find more challenging and exciting opportunities to contribute
        and grow with us.
      </p>

      <div className="mt-8 rounded-2xl border-l-4 border-accent bg-accent-soft/60 p-6">
        <p>
          So if you are a smart, talented and enterprising individual and can fit into our
          organizational culture and value system, please mail your CV to{' '}
          <a href={`mailto:${contact.email}`} className="font-semibold text-accent hover:underline">
            {contact.email}
          </a>
          .
        </p>
        <p className="mt-3 text-[15px]">
          E-mail your resume indicating in the subject column ONLY the Job Code mentioned against
          the position advertised. No position name to be mentioned in the subject line.
        </p>
        <a href={`mailto:${contact.email}`} className="btn-primary mt-6">
          <MailIcon className="h-4 w-4" />
          Email your CV
        </a>
      </div>

      <h2 className="title-md mt-12">Human Resources — Enhance. Engage. Excel.</h2>

      <Stagger className="mt-6 grid gap-4 sm:grid-cols-2">
        {hrStatements.map((statement) => (
          <Stagger.Item key={statement.title}>
            <div className="group h-full rounded-2xl border border-line bg-subtle p-6 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-page hover:shadow-card">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent transition-all duration-400 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-accent group-hover:text-white"
                >
                  <statement.Icon className="h-5 w-5" />
                </span>
                <h3 className="text-left text-[18px] font-bold text-ink">{statement.title}</h3>
              </div>
              <p className="mt-4 text-[15.5px]">{statement.body}</p>
            </div>
          </Stagger.Item>
        ))}
      </Stagger>

      <h2 className="title-md mt-12">Values</h2>
      <p className="mt-3">Human Resources employees are dedicated to upholding these values:</p>

      <Stagger as="ol" className="mt-6 space-y-2">
        {values.map((value, index) => (
          <Stagger.Item as="li" key={value}>
            <div className="group flex items-center gap-4 rounded-xl border border-line bg-subtle px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-page hover:shadow-card">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft font-heading text-[13px] font-bold text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white"
              >
                {index + 1}
              </span>
              <span className="flex-1 text-left text-[15.5px]">{value}</span>
              <CheckCircleIcon className="h-4 w-4 shrink-0 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </Stagger.Item>
        ))}
      </Stagger>
    </PageShell>
  )
}
