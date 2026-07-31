import PageShell from '../../components/PageShell'
import Stagger from '../../components/Stagger'
import { CompassIcon, PulseIcon } from '../../components/Icons'

// Converted from about/vision-mission.php. Copy is unchanged.
const statements = [
  {
    title: 'Vision',
    Icon: CompassIcon,
    body: 'Provide high-quality services in different countries in order to be recognized as a key factor in our clients success and also determine to adopt the latest technolgies with fresh ideas by creating quality minded organisational setup to satisfy the client expectations on the ground of international level.',
  },
  {
    title: 'Mission',
    Icon: PulseIcon,
    body: 'To deliver the finest quality service in developing Society by employing innovative approaches. Development of Country through Leadership, Entrepreneurship and Ownership.',
  },
]

export default function VisionMission() {
  return (
    <PageShell section="About" title="Vision & Mission">
      <Stagger className="space-y-6">
        {statements.map((statement) => (
          <Stagger.Item as="section" key={statement.title}>
            <div className="group relative overflow-hidden rounded-2xl border border-line bg-subtle p-7 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-page hover:shadow-card lg:p-9">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent transition-all duration-400 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-accent group-hover:text-white"
              >
                <statement.Icon className="h-[22px] w-[22px]" />
              </span>
              <h2 className="title-md">{statement.title}</h2>
            </div>

            <p className="mt-5">{statement.body}</p>
            </div>
          </Stagger.Item>
        ))}
      </Stagger>
    </PageShell>
  )
}
