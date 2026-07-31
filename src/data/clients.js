/**
 * Clients SSEB has delivered for. Every entry is sourced from the existing
 * site, not invented:
 *
 *  - TNEB / KSEB / KPTCL — named together in header/meta.php's keywords
 *    ("…Reservoir Pojects in TNEB,KSEB,KPTCL") and throughout the slider
 *    captions.
 *  - TWAD Board — "Pillur Dam, TWAD Board" in the completed-projects table.
 *  - Corporation of Chennai — three rows of the same table (Kodungaiyur,
 *    Nungambakkam, Virugambakkam and Arumbakkam canals).
 *  - Storm Water Drain Department and Water Resources Department — their own
 *    project pages under projects/completed-projects/.
 *  - National Dairy Development Board — the Aavin office project page.
 *
 * `tone` reuses the client colour scale from the project cards.
 */
export const clients = [
  {
    short: 'TNEB',
    name: 'Tamil Nadu Electricity Board',
    work: 'Hydro electric projects and power houses',
    tone: 'grid',
  },
  {
    short: 'KSEB',
    name: 'Kerala State Electricity Board',
    work: 'Bhoothathankettu small hydro electric project',
    tone: 'water',
  },
  {
    short: 'KPTCL',
    name: 'Karnataka Power Transmission Corporation',
    work: 'Reservoir and power projects in Karnataka',
    tone: 'civic',
  },
  {
    short: 'TWAD',
    name: 'Tamil Nadu Water Supply & Drainage Board',
    work: 'Pillur Dam',
    tone: 'solar',
  },
  {
    short: 'CoC',
    name: 'Corporation of Chennai',
    work: 'Kodungaiyur, Nungambakkam and Virugambakkam canals',
    tone: 'earth',
  },
  {
    short: 'SWDD',
    name: 'Storm Water Drain Department, Chennai',
    work: 'Storm water drain works',
    tone: 'grid',
  },
  {
    short: 'WRD',
    name: 'Water Resources Department',
    work: 'Irrigation and gate works',
    tone: 'water',
  },
  {
    short: 'NDDB',
    name: 'National Dairy Development Board',
    work: 'Construction of the Aavin office building',
    tone: 'earth',
  },
]
