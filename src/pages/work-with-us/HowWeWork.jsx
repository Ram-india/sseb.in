import PageShell from '../../components/PageShell'
import Stagger from '../../components/Stagger'
import { CheckCircleIcon, GearIcon, ListIcon } from '../../components/Icons'

// Converted from work-with-us/how-we-work.php. Copy is unchanged.
const models = [
  {
    title: 'Design-Build',
    Icon: GearIcon,
    body: 'With the vast array of construction solutions available, many owners are electing to use the Design-Build process to complete their projects with unique demands. Benefits under this model include:',
    points: [
      'Single point of contact',
      'Reduced time limit in the time bound contracts',
      'Elimination of any possible conflicts between designer and general contractor',
    ],
    footer:
      'SSEB has participated in several successful Design-Build endeavors with various design partners.',
  },
  {
    title: 'Design-Bid-Build',
    Icon: ListIcon,
    body: 'The standard in the construction industry and the choice of many municipalities and special districts, the Design-Bid-Build process offers project owners the ability to develop a firm fixed priced project through competitive bidding procedures. Even in this environment of project execution, SSEB strives to develop relationships with the owner’s design team. The projects benefit by having a clear knowledge of organizational structure with clear lines of communication, thus enabling the project team to identify and resolve project issues quickly and efficiently to complete within the time prescribed.',
    points: [],
  },
]

export default function HowWeWork() {
  return (
    <PageShell
      section="Work with Us"
      title="How we work"
      image="/assets/img/completed_projects/bhavani-bb-1/control-room.jpg"
    >
      <h2 className="title-md">Execution of projects</h2>

      <p className="mt-4">
        With more than 3 decades of construction experience, SSEB has been involved in a wide range
        of latest construction technology models. SSEB assembles a team to meet the individualized
        needs of every client and every project.
      </p>

      <p className="mt-5">
        Our project executed models are successful because of the professional, competent and
        experienced engineers on each project team. Beginning with university degrees in
        Construction Management, Engineering, the members of our teams continue to pursue their
        experience within specific areas of our projects, including participation in a Green
        Building Certificate Program and testing to become LEED Accredited Professionals.
      </p>

      <Stagger className="mt-10 space-y-6">
        {models.map((model) => (
          <Stagger.Item as="section" key={model.title}>
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
                  <model.Icon className="h-[22px] w-[22px]" />
                </span>
                <h2 className="title-md">{model.title}</h2>
              </div>

              <p className="mt-5">{model.body}</p>

              {model.points.length > 0 && (
                <ul className="mt-5 space-y-2">
                  {model.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[15.5px]">
                      <CheckCircleIcon className="mt-1 h-4 w-4 shrink-0 text-accent" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {model.footer && <p className="mt-5">{model.footer}</p>}
            </div>
          </Stagger.Item>
        ))}
      </Stagger>
    </PageShell>
  )
}
