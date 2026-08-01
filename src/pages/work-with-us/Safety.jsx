import PageShell from '../../components/PageShell'
import Stagger from '../../components/Stagger'
import { ShieldCheckIcon } from '../../components/Icons'

// Converted from work-with-us/safety.php. Copy is unchanged.
//
// The PHP page also embedded assets/images/safty22.png, which listed the
// programme's "key elements". That file is not in the repository — the
// reference was already broken — so the list it carried is not reproducible.
const commitments = [
  'For over 30 years, SSEB., has achieved an impeccable safety history. We believe that it is essential to perform work in the safest manner possible, consistent with good construction practices. To fulfill the requirements of this policy, an organized and effective safety and health program is carried out at each location where work is performed.',
  'Accidents are prevented through proper planning, training and a cooperative effort in all areas of operations. To prevent death, injury, occupational illness and hazards to our employees and the public, we have established an ongoing safety and health program.',
  'In addition, we ensure that each employee is well trained for the work he or she performs. Company-wide employee training is conducted on a quarterly basis, and employees also receive seasonal training in equipment operation and safety procedures.',
  'Onsite safety meetings are held every Monday morning. SSEB has employed an independent safety consultant to conduct random safety inspections at each jobsite. Further, subcontractors are required to submit a Job Safety Analysis prior to beginning work.',
  'Our safety program is continually updated by our Safety Coordinator to ensure that we meet or exceed our company standards. Our Workers Compensation multiplier is consistently below .90, and currently .86, and we have qualified for cost containment every year for the past five years.',
]

export default function Safety() {
  return (
    <PageShell
      section="Work with Us"
      title="Safety"
      image="/assets/img/on_going_projects/BOOTHATHANKETU-SSEB.jpg"
    >
      <p className="rounded-2xl border-l-4 border-accent bg-accent-soft/60 p-6 text-[18px] font-medium leading-relaxed text-ink">
        Our goal is to have an injury-free work place — a goal that requires 100% involvement from
        each member of our team.
      </p>

      <Stagger as="ul" className="mt-8 space-y-3">
        {commitments.map((item, index) => (
          <Stagger.Item as="li" key={item}>
            <div className="group relative flex gap-4 overflow-hidden rounded-2xl border border-line bg-subtle p-6 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-page hover:shadow-card">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent transition-transform duration-400 ease-out group-hover:scale-y-100"
              />
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white"
              >
                <ShieldCheckIcon className="h-[18px] w-[18px]" />
              </span>
              <span className="flex-1">{item}</span>
            </div>
          </Stagger.Item>
        ))}
      </Stagger>
    </PageShell>
  )
}
