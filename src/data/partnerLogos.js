/*
  Partner marks for the Hack Fest '26 partner grid.

  INSTRUCTION FROM THE CLIENT: partner logos must come from each organisation's
  official brand guidelines, not from screenshots, search results, or logo-aggregator
  sites. Until an asset is placed here and verified against that organisation's
  published usage terms, the grid falls back to a plain typographic name.

  HOW TO ADD A MARK
    1. Obtain the file from the organisation's official brand/press page, or ask the
       partner contact directly. Do not scrape it from a website or a logo dump site.
    2. Save it into `public/partners/` using the `file` value below.
    3. Confirm the usage terms (most allow press/partner acknowledgement, some require
       written permission and forbid implying endorsement - see `terms`).
    4. Set `file` and fill in `terms` and `source`, then review the grid on all four
       variants at 390 / 768 / 1440.

  The `terms` field is deliberately conservative: `null` means NOT YET VERIFIED, and an
  unverified mark must not be rendered as a logo.

  LIGHT AND DARK BACKGROUNDS
    `file` is the mark for light backgrounds. `fileDark` is the mark for dark
    backgrounds and is only set where the brand publishes a light/white version, or
    where the brand itself uses the same mark on a dark surface. A brand that has no
    dark-background version is left without `fileDark`, and the grid falls back to the
    plain name on dark sections rather than showing an unreadable mark.

  Note on "SpaceXAI": Official brand guidelines and vector assets sourced directly
  from https://x.ai/legal/brand-guidelines (SpaceXAI_Grok_Assets.zip).
  Includes official dark and light transparent SVG wordmarks and symbols.
*/

const PARTNER_DIR = '/partners/';

// Fallback alt text is the organisation name as given in the event content.
function make(slug, name, entry) {
  return {
    slug,
    name,
    terms: null,
    source: null,
    ...entry,
  };
}

export const partnerLogos = [
  make('daystar-university', 'Daystar University', {
    file: 'daystar-university.png',
    fileDark: 'daystar-university.png',
    terms:
      'Trademark of Daystar University. Asset taken from the University website for partner acknowledgement.',
    source: 'https://daystar.ac.ke/',
  }),
  make('drice', 'Directorate of Research, Innovation, Commercialization & Entrepreneurship (DRICE)', {
    file: 'drice.png',
    fileDark: 'drice.png',
    terms:
      'Trademark of Daystar University DRICE (Directorate of Research, Innovation, Commercialization & Entrepreneurship). Asset supplied by the client from the directorate\'s own site. Background was made transparent and the mark trimmed to its artwork; the mark itself is unaltered.',
    source: 'https://undisha.com/assets/logo-CumCappK.jpg',
  }),
  make('dita', 'Daystar Information & Technology Association (DITA)', {
    file: 'dita.png',
    fileDark: 'dita.png',
    terms:
      'Trademark of the Daystar Information & Technology Association. Asset is the Association\'s own published mark, taken from the dita.co.ke site assets.',
    source: 'https://dita.co.ke/',
  }),
  make('spacexai', 'SpaceXAI', {
    file: 'spacexai.svg',
    fileDark: 'spacexai-dark.svg',
    terms:
      'SpaceXAI Brand Guidelines: Official vector wordmark and symbol assets sourced directly from x.ai/legal/brand-guidelines. Transparent vector lockup used unaltered.',
    source: 'https://x.ai/legal/brand-guidelines',
  }),
  make('safaricom', 'Safaricom', {
    file: 'safaricom.png',
    fileDark: 'safaricom.png',
    terms:
      'Trademark of Safaricom PLC. Asset taken from the logo downloads published on Safaricom\'s own brand toolkit page, which offers the main and business logos for download without stating further usage terms. Standard trademark practice applies: use unaltered, do not imply endorsement beyond the partnership, and confirm permission with Safaricom before publication.',
    source: 'https://www.safaricom.co.ke/about/brand-toolkit/logos',
  }),
  make('aws', 'AWS / Amazon Web Services', {
    file: 'aws.png',
    fileDark: 'aws-white.png',
    terms:
      'AWS Trademark Guidelines. The "Powered by AWS" mark is licensed to AWS customers and AWS Partner Network members; use must follow the guidelines, may not be altered, and partner materials must be approved in advance by AWS.',
    source: 'https://aws.amazon.com/co-marketing/',
  }),
  make('redbull', 'RedBull', {
    file: 'redbull.svg',
    fileDark: 'redbull.svg',
    terms:
      'Trademark of Red Bull. Asset taken from Red Bull\'s own site, where the same mark is used on both light and dark headers. Red Bull publishes no public logo download; the Red Bull Content Pool requires registration and written permission for reuse.',
    source: 'https://www.redbull.com/int-en/',
  }),
  make('cyberpro', 'Cyberpro', {
    file: 'cyberpro.png',
    terms:
      'Trademark of Cyberpro Global. Asset taken from Cyberpro\'s own site. Cyberpro publishes no logo-usage page.',
    source: 'https://cyberpro.global/',
  }),
  make('moringa-school', 'Moringa School', {
    file: 'moringa-school.png',
    terms:
      'Trademark of Moringa School. Asset taken from Moringa School\'s own site. Moringa School publishes no brand-asset page.',
    source: 'https://moringaschool.com/',
  }),
];

const byName = new Map(partnerLogos.map((p) => [p.name, p]));

/*
  Resolve a partner mark for an organisation name from the event content.
  Returns null when there is no verified asset, which callers must treat as
  "render the typographic fallback" rather than "render a broken image".

  Pass `{ dark: true }` on dark sections: a mark with no dark-background version
  resolves to null so the fallback name is used instead of an unreadable logo.
*/
export function getPartnerMark(name, options = {}) {
  const entry = byName.get(name);
  if (!entry) return null;
  if (!entry.file || !entry.terms) return null;
  const file = options.dark === true ? entry.fileDark : entry.file;
  if (!file) return null;
  return { ...entry, src: `${PARTNER_DIR}${file}` };
}

// True once at least one mark is verified, so the grid can adapt its layout.
export const hasVerifiedMarks = () => partnerLogos.some((p) => p.file && p.terms);

export default partnerLogos;
