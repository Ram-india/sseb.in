// Single source of truth for the site chrome — mirrors header/header.php and
// header/footer.php from the PHP site.

export const contact = {
  phone: '+91 94433 49999',
  phoneHref: 'tel:+919443349999',
  email: 'ssew_bhavani@yahoo.co.in',
  addressLine1: '367A, Mettur Main Road,',
  addressLine2: 'Bhavani 638 301, Erode Dist. TN.',
}

// Top-level menu. Items with `children` render as dropdowns, as in the
// Bootstrap navbar of the PHP header.
export const navigation = [
  { label: 'Home', to: '/' },
  {
    label: 'About',
    summary: 'Who we are, what we stand for, and the people who built SSEB.',
    children: [
      { label: 'Company Profile', to: '/about/company-profile', icon: 'building' },
      { label: 'Vision & Mission', to: '/about/vision-mission', icon: 'compass' },
      { label: 'Director Profile', to: '/about/director-profile', icon: 'user' },
      { label: 'Quality Policy', to: '/about/quality-policy', icon: 'shield' },
      { label: 'Educational Trust', to: '/about/educational-trust', icon: 'graduation' },
    ],
  },
  {
    label: 'Projects',
    summary: 'Hydro, civil and infrastructure works delivered across India.',
    children: [
      { label: 'List of Completed Projects', to: '/projects/completed-projects-list', icon: 'list' },
      { label: 'Completed Projects', to: '/projects/completed-projects', icon: 'check' },
      { label: 'On going Projects', to: '/projects/on-going-projects', icon: 'pulse' },
    ],
  },
  {
    label: 'Work with Us',
    summary: 'How we run a project, and how we keep every site safe.',
    children: [
      { label: 'Safety', to: '/work-with-us/safety', icon: 'shield' },
      { label: 'How we work', to: '/work-with-us/how-we-work', icon: 'gear' },
    ],
  },
  {
    label: 'Careers',
    summary: 'Build a career with an engineering team that has served since 1981.',
    children: [
      { label: 'Careers in SSEB', to: '/careers/careers-in-sseb', icon: 'briefcase' },
      { label: 'Employment', to: '/careers/employment', icon: 'users' },
      { label: 'Apply Online', to: '/careers/apply-online', icon: 'file' },
    ],
  },
  { label: 'Contact', to: '/contact' },
]

export const footerAboutLinks = navigation.find((item) => item.label === 'About').children

export const footerProjectLinks = [
  { label: 'Completed Projects', to: '/projects/completed-projects', icon: 'check' },
  { label: 'On going Projects', to: '/projects/on-going-projects', icon: 'pulse' },
]

export const companyBlurb =
  'Sree Saravana Engineering Bhavani Private Limited (SSEB) is an ISO 9001:2008 Certified Company established in the year 1981 under the Companies Act – 1956. The Company is located at 367A, Mettur Main Road, Bhavani 638 301, Erode District, Tamil Nadu, India.'
