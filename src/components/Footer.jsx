import { Link } from 'react-router-dom'
import { navigation, contact } from '../data/site'
import { MailIcon, MapPinIcon, PhoneIcon } from './Icons'

// Adobe's footer shape: dense columns of links up top, a thin legal bar below.
const linkColumns = navigation.filter((item) => item.children)

export default function Footer() {
  return (
    <footer id="footer" className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        {/* six columns: brand takes two, the four link groups take one each */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <img
              src="/assets/img/sseb_logo_1.png"
              alt="SSEB"
              width="160"
              height="60"
              className="h-11 w-auto rounded dark:bg-white dark:px-2 dark:py-1"
            />
            <p className="mt-5 max-w-sm text-[15px] leading-[1.7] text-muted">
              Sree Saravana Engineering Bhavani Private Limited — an ISO 9001:2008 certified
              company, established in 1981 under the Companies Act, 1956.
            </p>

            <ul className="mt-6 space-y-3 text-[15px]">
              <li className="flex gap-3">
                <MapPinIcon className="mt-1 h-4 w-4 shrink-0 text-accent" />
                <span className="text-body">
                  {contact.addressLine1}
                  <br />
                  {contact.addressLine2}
                </span>
              </li>
              <li>
                <a
                  href={contact.phoneHref}
                  className="flex items-center gap-3 text-body hover:text-ink"
                >
                  <PhoneIcon className="h-4 w-4 shrink-0 text-accent" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 break-all text-body hover:text-ink"
                >
                  <MailIcon className="h-4 w-4 shrink-0 text-accent" />
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          {linkColumns.map((column) => (
            <nav key={column.label} aria-label={column.label}>
              <h3 className="text-[15px] font-bold text-ink">{column.label}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.children.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-[15px] text-muted hover:text-ink hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* legal bar */}
      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-3 text-[13px] text-muted sm:flex-row">
            <p>Copyright © {new Date().getFullYear()} SSEB. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <Link to="/about/company-profile" className="hover:text-ink hover:underline">
                Company Profile
              </Link>
              <Link to="/work-with-us/safety" className="hover:text-ink hover:underline">
                Safety
              </Link>
              <Link to="/contact" className="hover:text-ink hover:underline">
                Contact
              </Link>
              <span className="text-muted">Bhavani, Erode District, Tamil Nadu, India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
