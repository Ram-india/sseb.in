import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { navigation, contact } from '../data/site'
import { MailIcon, MapPinIcon, PhoneIcon } from './Icons'

const linkColumns = navigation.filter((item) => item.children)

const reveal = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemReveal = {
  hidden: {
    opacity: 0,
    x: -15,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
    },
  },
}

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer
      id="footer"
      className="relative mt-auto overflow-hidden border-t border-line bg-surface"
    >
      {/* =========================================================
          ANIMATED BACKGROUND
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Moving engineering grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.035]"
          animate={{
            backgroundPosition: ['0px 0px', '45px 45px'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '45px 45px',
          }}
        />

        {/* Floating glow 1 */}
        <motion.div
          className="absolute -right-40 -top-40 h-[450px] w-[450px] rounded-full bg-accent/10 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, 25, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Floating glow 2 */}
        <motion.div
          className="absolute -bottom-48 -left-40 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Small floating light */}
        <motion.div
          className="absolute left-[35%] top-[30%] h-2 w-2 rounded-full bg-accent/30 blur-[1px]"
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* =========================================================
          MAIN FOOTER
      ========================================================= */}

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">

        {/* =======================================================
            CTA AREA
        ======================================================= */}

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="mb-14 flex flex-col gap-8 border-b border-line pb-12 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-accent"
            >
              Engineering • Experience • Excellence
            </motion.p>

            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Engineering solutions
              <br className="hidden sm:block" />
              built to last
              <span className="text-accent">.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
              Decades of engineering experience combined with quality,
              precision and dependable service.
            </p>

          </div>

          {/* Animated CTA */}
          <motion.div
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            <Link
              to="/contact"
              className="group relative inline-flex overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-surface"
            >
              {/* Shine */}
              <motion.span
                className="absolute inset-y-0 -left-10 w-8 skew-x-[-20deg] bg-white/20"
                animate={{
                  left: ['-40px', '140%'],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: 'easeInOut',
                }}
              />

              <span className="relative z-10">
                Start a Conversation
              </span>

              <motion.span
                className="relative z-10 ml-3"
                animate={{
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* =======================================================
            FOOTER CONTENT
        ======================================================= */}

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">

          {/* COMPANY */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="lg:col-span-5"
          >

            {/* Logo */}
            <Link
              to="/"
              aria-label="SSEB Home"
              className="group inline-block"
            >
              <motion.img
                src="/assets/img/sseb_logo_1.png"
                alt="Sree Saravana Engineering Bhavani Private Limited"
                width="180"
                height="68"
                whileHover={{
                  scale: 1.06,
                  rotate: -1,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                }}
                className="h-12 w-auto rounded object-contain dark:bg-white dark:px-2 dark:py-1"
              />
            </Link>

            <motion.p
              variants={itemReveal}
              className="mt-6 max-w-lg text-[15px] leading-7 text-muted"
            >
              Sree Saravana Engineering Bhavani Private Limited is an ISO
              9001:2008 certified company, established in 1981 under the
              Companies Act, 1956.
            </motion.p>

            {/* Contact */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
              className="mt-8 space-y-3"
            >

              <ContactItem
                icon={<MapPinIcon className="h-4 w-4" />}
              >
                <>
                  {contact.addressLine1}
                  <br />
                  {contact.addressLine2}
                </>
              </ContactItem>

              <ContactItem
                href={contact.phoneHref}
                icon={<PhoneIcon className="h-4 w-4" />}
              >
                {contact.phone}
              </ContactItem>

              <ContactItem
                href={`mailto:${contact.email}`}
                icon={<MailIcon className="h-4 w-4" />}
              >
                <span className="break-all">
                  {contact.email}
                </span>
              </ContactItem>

            </motion.div>
          </motion.div>

          {/* NAVIGATION */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-4"
          >

            {linkColumns.map((column) => (
              <motion.nav
                key={column.label}
                variants={reveal}
                aria-label={column.label}
              >

                {/* Heading */}
                <div className="relative inline-block">

                  <h3 className="text-sm font-bold tracking-wide text-ink">
                    {column.label}
                  </h3>

                  <motion.span
                    className="absolute -bottom-2 left-0 h-[2px] bg-accent"
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: 24,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2,
                    }}
                  />

                </div>

                {/* Links */}
                <motion.ul
                  variants={stagger}
                  className="mt-7 space-y-3"
                >

                  {column.children.map((link) => (
                    <motion.li
                      key={link.to}
                      variants={itemReveal}
                    >
                      <Link
                        to={link.to}
                        className="group relative flex w-fit items-center text-sm leading-6 text-muted transition-colors duration-200 hover:text-ink"
                      >

                        {/* Accent line */}
                        <motion.span
                          className="absolute -left-4 h-px bg-accent"
                          initial={{
                            width: 0,
                          }}
                          whileHover={{
                            width: 10,
                          }}
                        />

                        <motion.span
                          whileHover={{
                            x: 5,
                          }}
                          transition={{
                            duration: 0.2,
                          }}
                        >
                          {link.label}
                        </motion.span>

                        <motion.span
                          className="ml-2 text-accent"
                          initial={{
                            opacity: 0,
                            x: -5,
                          }}
                          whileHover={{
                            opacity: 1,
                            x: 0,
                          }}
                        >
                          →
                        </motion.span>

                      </Link>
                    </motion.li>
                  ))}

                </motion.ul>

              </motion.nav>
            ))}

          </motion.div>
        </div>

        {/* =======================================================
            ENGINEERING STATS
        ======================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mt-16 grid overflow-hidden rounded-2xl border border-line bg-surface/50 backdrop-blur-sm sm:grid-cols-3"
        >

          <Stat
            number="1981"
            label="Established"
          />

          <Stat
            number="ISO 9001"
            label="Quality Certified"
          />

          <Stat
            number="Bhavani"
            label="Tamil Nadu"
          />

        </motion.div>

      </div>

      {/* =========================================================
          BOTTOM BAR
      ========================================================= */}

      <div className="relative border-t border-line">

        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between">

          <p className="text-center text-xs text-muted md:text-left">
            © {year} SSEB. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted">

            <Link
              to="/about/company-profile"
              className="transition-colors hover:text-ink"
            >
              Company Profile
            </Link>

            <span className="hidden h-3 w-px bg-line sm:block" />

            <Link
              to="/work-with-us/safety"
              className="transition-colors hover:text-ink"
            >
              Safety
            </Link>

            <span className="hidden h-3 w-px bg-line sm:block" />

            <Link
              to="/contact"
              className="transition-colors hover:text-ink"
            >
              Contact
            </Link>

            <span className="hidden h-3 w-px bg-line sm:block" />

            <span>
              Bhavani, Erode District, Tamil Nadu, India
            </span>

          </div>

          {/* Back to top */}
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            whileHover={{
              y: -4,
              rotate: -5,
            }}
            whileTap={{
              scale: 0.85,
            }}
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent md:mx-0"
          >
            ↑
          </motion.button>

        </div>

      </div>
    </footer>
  )
}


/* ===============================================================
   CONTACT ITEM
================================================================ */

function ContactItem({ icon, children, href }) {
  const content = (
    <motion.div
      variants={itemReveal}
      whileHover={{
        x: 5,
      }}
      className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors duration-300 hover:bg-black/[0.02] dark:hover:bg-white/[0.03]"
    >

      <motion.span
        whileHover={{
          scale: 1.12,
          rotate: 8,
        }}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white"
      >
        {icon}
      </motion.span>

      <span className="text-sm leading-6 text-body transition-colors group-hover:text-ink">
        {children}
      </span>

    </motion.div>
  )

  if (href) {
    return <a href={href}>{content}</a>
  }

  return content
}


/* ===============================================================
   STAT
================================================================ */

function Stat({ number, label }) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className="group relative border-b border-line px-6 py-6 transition-colors last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
    >

      <p className="text-xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
        {number}
      </p>

      <p className="mt-1 text-xs text-muted">
        {label}
      </p>

      {/* Bottom animation */}
      <motion.span
        className="absolute bottom-0 left-0 h-[2px] bg-accent"
        initial={{
          width: 0,
        }}
        whileHover={{
          width: '100%',
        }}
        transition={{
          duration: 0.4,
        }}
      />

    </motion.div>
  )
}