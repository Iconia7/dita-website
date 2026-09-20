// DITA Hack Fest '26 - Events page copy & data model.
// Plain ASCII punctuation only: hyphens, colons, quotes. No em-dashes.

export const hero = {
  mainHeadline: "DITA Hack Fest '26: AI Developer Workflows for Real-World Impact",
  subtitle:
    'A 24-Hour Interdisciplinary Innovation Sprint & Commercialization Pipeline at Daystar University.',
  eventDetails:
    'October 16th-17th, 2026 | Daystar University, Athi River Campus (Main Auditorium & ICT Labs)',
  ctas: [
    { label: 'Register Team', intent: 'team' },
    { label: 'Join as Individual Builder', intent: 'individual' },
  ],
};

export const facts = [
  { key: 'Format', value: '24-hour interdisciplinary sprint' },
  { key: 'Teams', value: '3 to 5 participants' },
  { key: 'Capacity', value: '50 student builders' },
  { key: 'Entry', value: 'Free to attend' },
  { key: 'Eligibility', value: 'Daystar & external guest builders' },
];

export const about = {
  theme: 'AI Developer Workflows & Interdisciplinary Innovation for Regional Impact',
  body: "DITA Hack Fest '26 is an overnight coding sprint and the front door to Daystar University's DRICE Innovation Pipeline. Capacity is capped at 50 builders across all tracks. Over 24 hours, student builders from Daystar and visiting guest institutions across multiple disciplines will use modern AI developer tools (SpaceXAI, AWS Cloud) to scaffold, test, and deploy production-ready software addressing regional bottlenecks in Digital Finance, Agri-Tech, Healthcare, and EdTech.",
};

export const eligibilityIntro =
  "DITA Hack Fest '26 is strictly interdisciplinary and open to Daystar students across all schools as well as guest builders and innovators from external institutions. We encourage balanced teams combining technology, business, domain, and design expertise:";

export const eligibility = [
  {
    title: 'Undergraduate Students',
    body: 'Computer Science, IT, Applied Physics, Business Administration, Mass Communication, Law, Nursing/Health Sciences, and Humanities.',
  },
  {
    title: "Postgraduate Students (Master's & PhD)",
    body: 'Graduate researchers who will evaluate promising prototypes post-event for thesis studies, peer-reviewed journal publications, and grant applications.',
  },
  {
    title: 'External & Regional Institutions',
    body: 'Developers, designers, and innovators from partner campuses and the wider tech ecosystem are warmly welcomed to compete or join individual pools.',
  },
  {
    title: 'Team Structure',
    body: 'Teams of 3 to 5 participants. Individual registrants will be paired with complementary teammates during pre-hackathon networking.',
  },
  {
    title: 'Non-Technical Roles Welcomed',
    body: 'Every team requires Domain Experts, Business Model Planners, UI/UX Designers, and Pitch Presenters alongside Developers.',
  },
];

export const tracks = [
  {
    number: 1,
    title: 'Digital Finance & Micro-Ledgers',
    sponsorLabel: 'Safaricom Track',
    body: 'B2B micro-ledgers, M-Pesa API integrations, SME inventory reconciliation, and merchant micro-SaaS.',
  },
  {
    number: 2,
    title: 'Climate & Agri-Tech',
    sponsorLabel: null,
    body: 'Yield prediction models, localized weather risk advisory, micro-insurance tools, and digital supply chain ledgers.',
  },
  {
    number: 3,
    title: 'Health & Well-being',
    sponsorLabel: null,
    body: 'Privacy-first health intake triage, anonymous mental health consultation agents, and community health portals.',
  },
  {
    number: 4,
    title: 'Open Innovation & EdTech',
    sponsorLabel: null,
    body: 'Campus workflow automation, digital learning utilities, open-source developer tools, and research grant SaaS.',
  },
];

export const schedule = [
  {
    day: 'Oct 16',
    time: '08:30 AM - 10:00 AM',
    activity: 'Participant Check-in, Registration & Welcome Breakfast',
    venue: 'Main Auditorium Foyer',
  },
  {
    day: 'Oct 16',
    time: '10:00 AM - 11:30 AM',
    activity: 'Opening Ceremony, Keynotes & Sponsor Track Briefings',
    venue: 'Main Auditorium',
  },
  {
    day: 'Oct 16',
    time: '11:30 AM - 12:30 PM',
    activity: 'Technical Scaffolding: AI Workflows (SpaceXAI) & Cloud Setup (AWS)',
    venue: 'ICT Labs 1 & 2',
  },
  {
    day: 'Oct 16',
    time: '01:30 PM',
    activity: 'OFFICIAL 24-HOUR HACKATHON BUILD KICKOFF',
    venue: 'ICT Labs / Designated Halls',
  },
  {
    day: 'Oct 16',
    time: '07:00 PM - 08:30 PM',
    activity: 'Dinner & DRICE Mentor Office Hours (IP & Business Check-in)',
    venue: 'Catering Hall',
  },
  {
    day: 'Oct 16',
    time: 'Midnight (12:00 AM)',
    activity: 'Midnight Energy Break (RedBull & Coffee Bar)',
    venue: 'Overnight Build Hub',
  },
  {
    day: 'Oct 17',
    time: '08:30 AM',
    activity: 'SYSTEM CODE FREEZE & PROJECT SUBMISSION LOCKOUT',
    venue: 'Online Submission Portal',
    freeze: true,
  },
  {
    day: 'Oct 17',
    time: '09:00 AM - 12:30 PM',
    activity: 'Live Pitch Presentations & Code Audits (10 Teams x 7 Mins)',
    venue: 'Main Auditorium',
  },
  {
    day: 'Oct 17',
    time: '12:30 PM - 02:00 PM',
    activity: 'Awards Ceremony, DRICE Showcase Announcement & Closing',
    venue: 'Main Auditorium',
  },
];

export const speakers = [
  {
    name: 'SpaceXAI & Grok Leads',
    role: 'AI Workflow & Developer Tooling Leads, SpaceXAI',
    sessionTitle: 'Keynote: High-Velocity AI Developer Workflows & System Architecture',
  },
  {
    name: 'Stephen Oyaro',
    role: 'Digital Finance Track Sponsor Lead, Safaricom',
    sessionTitle: 'Track Briefing: M-Pesa API Sandboxes, Webhooks & Micro-Ledgers',
  },
  {
    name: 'Dr. Mursi & DRICE Leadership',
    role: 'Directorate of Research, Daystar University',
    sessionTitle: 'Keynote: Prototype to IP Protection, Grants & Commercialization',
  },
  {
    name: 'AWS Student Community Leads',
    role: 'AWS Infrastructure Mentors',
    sessionTitle: 'Workshop: Rapid Cloud Deployment & Serverless Backend Architecture',
  },
];

export const perks = [
  {
    title: 'Swag & Gear',
    body: 'Official DITA x DRICE Branded Event T-Shirt, stickers, and registration kit.',
  },
  {
    title: 'Tooling & Credits',
    body: 'SpaceXAI developer access & credits and $500+ AWS cloud deployment credits.',
  },
  {
    title: 'Catering & Welfare',
    body: 'Full meals, midnight coffee/snack bar, fruits, and RedBull energy refreshments over 24 hours.',
  },
  {
    title: 'Post-Event Commercialization Pipeline',
    body: 'Opportunity to qualify for DRICE IP protection, patent filing, postgraduate research co-authorship, seed grant pool, and participation in the Post-Hackathon Industry Showcase.',
  },
];

export const partners = [
  {
    tier: 1,
    label: 'Institutional Anchors & Co-Hosts',
    orgs: [
      { name: 'Daystar University', role: 'School of Science, Engineering, and Health - SSEH' },
      { name: 'Directorate of Research, Innovation, Commercialization & Entrepreneurship (DRICE)', role: null },
      { name: 'Daystar Information & Technology Association (DITA)', role: null },
    ],
  },
  {
    tier: 2,
    label: 'Primary Dev Tools & Track Partners',
    orgs: [
      { name: 'SpaceXAI', role: 'Primary Dev Tools & AI Workflow Partner' },
      { name: 'Safaricom', role: 'Digital Finance & Micro-Ledgers Track Partner' },
      { name: 'AWS / Amazon Web Services', role: 'Cloud Infrastructure Partner' },
    ],
  },
  {
    tier: 3,
    label: 'Supporting Ecosystem & Welfare Partners',
    orgs: [
      { name: 'RedBull', role: 'Energy & Focus Partner' },
      { name: 'Cyberpro', role: 'Cybersecurity & Student Certification Partner' },
      { name: 'Moringa School', role: 'Ecosystem Talent & Mentorship Partner' },
    ],
  },
];

export const hackfestContent = {
  hero,
  facts,
  about,
  eligibilityIntro,
  eligibility,
  tracks,
  schedule,
  speakers,
  perks,
  partners,
};

export default hackfestContent;
