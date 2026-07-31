import PageShell from '../../components/PageShell'
import Stagger from '../../components/Stagger'
import { CheckCircleIcon } from '../../components/Icons'

// Converted from about/quality-policy.php. Copy is unchanged.
const objectives = [
  'Enhanced customer satisfaction & Employee motivation and empowerment.',
  'Continual growth with a vision to be leading global engineering company.',
  'To deliver products and services confirming to applicable regulations and international standards to satisfy customer needs.',
  'To work across the organization for continual improvement of projects and services through effective implementation of quality management system.',
]

export default function QualityPolicy() {
  return (
    <PageShell section="About" title="Quality Policy">
      <p>
        We shall comply with the requirements and continually improve the quality management system
        with the following objectives:
      </p>

      <Stagger as="ul" className="mt-8 space-y-3">
        {objectives.map((objective, index) => (
          <Stagger.Item as="li" key={objective}>
            <div className="group relative flex gap-4 overflow-hidden rounded-2xl border border-line bg-subtle p-5 text-[16px] leading-relaxed transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-page hover:shadow-card">
              {/* accent rule grows down the left edge on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent transition-transform duration-400 ease-out group-hover:scale-y-100"
              />
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft font-heading text-[13px] font-bold text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white"
              >
                {index + 1}
              </span>
              <span>{objective}</span>
            </div>
          </Stagger.Item>
        ))}
      </Stagger>

      <p className="mt-8 flex gap-4 rounded-2xl border-l-4 border-accent bg-accent-soft/60 p-6 text-[16px] leading-relaxed">
        <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
        <span>
          The entire company is committed to work for continuous improvement in project quality for
          achieving{' '}
          <strong className="font-semibold text-ink">maximum customer satisfaction</strong>.
        </span>
      </p>
    </PageShell>
  )
}
