// Port of header/meta.php — the per-page <title>/description/keywords that the
// PHP site picked with a strpos($_SERVER['PHP_SELF'], …) chain, keyed by route
// instead of by filename.

export const SITE_URL = 'https://sseb.in'

export const defaultSeo = {
  title: 'SSEB | Contact',
  description: 'Sree Saravana Engineering Bhavani Private Limited (SSEB) Contact Details',
  keywords:
    'SSEB,sseb-india,sseb-tamilnadu,Registerd-office,Factory-address,mettur-road,bhavani,638301,SIPCOT,Perundurai',
}

export const seoByPath = {
  '/': {
    title: 'sseb',
    description:
      'Sree Saravana Engineering Bhavani Pvt.Ltd (SSEB) is an ISO 9001:2008 Certified Company was established in the year 1981 under the companies Act -1956',
    keywords:
      'sseb,Sree-saravana,Bhavani,Engineering,Sree-Saravana-Engineering,Venkatachalam,Hydro-Power-Projects,Solar-Projects,Civil-works,sseb-India,sseb-Tamilnadu,Construction,Best-Construction-company,',
  },
  '/about/company-profile': {
    title: 'SSEB | Company Profile',
    description:
      'Mr.P.Venkatachalam is the Chairman Cum Managing Director ,The company undertakes Engineering Procurement Contractor (EPC) which includes Civil, Mechanical and Electrical works, Design, Manufacture, Supply, Erection, Testing and Commissioning of Hydro',
    keywords:
      'SSEB,company,company-profile,sree-saravana-engineering-bhavani,Thermal-Power-Projects,EPC,Industrial-Building,Projects,Dam-and-Irrigation,Solar-plant,V.Poongodi,Venkatachalam,sseb,Directors',
  },
  '/about/vision-mission': {
    title: 'SSEB | Vision & Mission',
    description:
      'To promote strong ethics, honesty, growth and quality in the construction industry through teamwork, education, technology skill and Developing Environment',
    keywords:
      'SSEB,SSEB-Tamilnadu,SSEB-india,Venkatachalam-chairman,SVHEC,SVV,Venkatachalam,Bhavani,SSEB-Chairman,Vision,Mission,SSEB-Vision-Mission',
  },
  '/about/director-profile': {
    title: 'SSEB | Director Profile',
    description:
      'Mr.P.Venkatachalam is the Chairman Cum Managing Director of M/s. Sree Saravana Engineering Bhavani Private Limited.He has got much experience in Civil, Mechanical,Electrical works, Design, Manufacture, Supply, Erection, Testing and Commissioning of Hydro Mechanical & Electro Mechanical',
    keywords:
      'SSEB,SSEB-Director,Chairman ,Managing-Director,Venkatachalam,Best-Customers-Satisfaction-Award,Outstanding-National-Citizen,Thozil-Chemmal, Chennai-Friends-Cultural-Academy,National-Citizens-Club,TamilNadu-Cinema-Kalai-Mandram,TCKM, Hydro-Power-Projects,Turbine, Generator, Governor, Excitation-System, LCU-Panel, Indoor-Electrical-Control-Panels, Outdoor-Substation,Electrical,Mechanical',
  },
  '/about/educational-trust': {
    title: 'SSEB | Educational Trust',
    description:
      'Mr. P. Venkatachalam Chairman Cum Managing Director of Sri Venkateshwara Educational & Charitable Trust and Sri Venkateshwara Vidhya Mandir Trust at Erode',
    keywords:
      'sri Venkateshwara,Education,Best-Education,Education-trust,Sri-Venkateshwara-engineering-college,svhec,Gobi,Engineering-college-Best-School,Erode,Venkatachalam,Sri-Venkateshwara-Educational-Charitable-Trust,Sri-Venkateshwara-Vidhya-Mandir Trust,Gobichettipalayam,Charitable-Trust',
  },
  '/about/quality-policy': {
    title: 'SSEB | Quality Policy',
    description:
      'We shall comply with the requirements and continually improve the quality management system.Enhanced customer satisfaction & Employee motivation & empowerment',
    keywords:
      'SSEB,leading-global-engineering-company,Quality-Policy,Venkatachalam,Best-Engineering-company,India,Tamilnadu,Bhavani,quality-management,customer-satisfaction,international-standards ',
  },
  '/projects/completed-projects-list': {
    title: 'SSEB | Completed Projects List',
    description:
      'SSEB Completed successfully more than 53 Major Projects Such as Hydro Electric Projects, Power houses, Gate Works, Reservoir Pojects in TNEB,KSEB,KPTCL',
    keywords:
      'Chennai-Corporation-Work,Thirumoorthy-power-house,Amaravathy-dam,Bhavani-Barrage,Bobba-Power-Project,Limbavali-Power-project,Completed-projects,sseb,sseb-projects,Thirumurthy-dam',
  },
  '/projects/completed-projects': {
    title: 'SSEB | Completed projects',
    description:
      'SSEB Completed the projects in various categories such as Hydro Power Projects,Infrastructure Projects, Civil Projects,Dam Gate Projects ',
    keywords: 'sseb,sseb-Completed-Projects,SSEB,Sseb-Portfilio,',
  },
  '/projects/on-going-projects': {
    title: 'SSEB | On Going Projects',
    description:
      ' Execution of electro hydro mechanical works of Bhoothathankettu (3x8mw) small hydro electric project.kerala.(KSEB)',
    keywords:
      'SSEB,SSEB-On-Going-Projects,On-Going-Projects,Hydro-Projects,Power,Electricity,Dam-Construction,Hydel-Power,Projects,Current-Projects,Bhoothathankettu',
  },
  '/work-with-us/safety': {
    title: 'SSEB | Safety',
    description:
      'We believe that it is essential to perform work in the safest manner possible, consistent with good construction practices. To fulfill the requirements of this policy,',
    keywords: 'SSEB-Safty-methods,Safty-in-sseb,Accidents-prevention-planning',
  },
  '/work-with-us/how-we-work': {
    title: 'SSEB | How we work',
    description:
      'we involved in a wide range of latest construction technology models. SSEB assembles a team to meet the individualized needs of every client and every project',
    keywords:
      'sseb,sseb-works,Contract,Green-building,Latest-construction-technology,Working-methods',
  },
  '/careers/careers-in-sseb': {
    title: 'SSEB | careers',
    description:
      'Professionals passionate about their work and opting to make a career with us today will find challenges and  opportunities to contribute and grow with us. ',
    keywords: 'sseb,Careers,Careers-sseb,Hr,Human-Resources-in-sseb,',
  },
  '/careers/employment': {
    title: 'SSEB | Employement',
    description:
      'We M/s. Sree Saravana Engineering Bhavani Pvt Ltd, is proud to offer its employees a very competitive benefits packages like Life Insurance,Retirement Plan',
    keywords:
      'sseb,Employement,Employement-in-sseb,jobs,Engineering-Jobs,Jobs-for-Civil-Engineer,Jobs-for-Mechanical-Engineer',
  },
  '/careers/apply-online': {
    title: 'SSEB | apply online',
    description: 'Sree Saravana Engineering Bhavani Private Limited invited th',
    keywords: 'Apply-online,SSEB,Careers,Jobs,jobs-in-Construction',
  },
  '/contact': defaultSeo,
}

export function resolveSeo(pathname) {
  return seoByPath[pathname] ?? defaultSeo
}
