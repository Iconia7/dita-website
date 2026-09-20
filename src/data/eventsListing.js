// Events listing page data model & content.
// Multi-event surface (/events) containing the upcoming Hack Fest '26 and archive.

import { hero } from './hackfest';

export const listing = {
  eyebrow: 'Events & Hackathons',
  title: 'Events',
  subtitle:
    'DITA runs hackathons, technical workshops, and industry build sprints. Open to Daystar students across all disciplines and guest builders from regional institutions.',
};

export const upcomingEvent = {
  id: 'hack-fest-26',
  slug: '/events/hack-fest-26',
  year: '2026',
  status: 'upcoming',
  statusLabel: 'Only a few slots available',
  capacityNote: 'Strictly capped at 50 builders. Open to Daystar and external participants.',
  title: "DITA Hack Fest '26",
  tagline: hero.mainHeadline,
  summary:
    'A 24-hour interdisciplinary innovation sprint and commercialization pipeline at Daystar University. Open to Daystar students and external guest builders across four industry challenge tracks.',
  dateLabel: 'October 16th - 17th, 2026',
  dateShort: 'Oct 16-17',
  monthShort: 'Oct',
  dayNumber: '16',
  venue: 'Daystar University, Athi River Campus',
  venueDetail: 'Main Auditorium & ICT Labs',
  entry: 'Free to attend',
  format: '24-hour sprint',
  teamSize: 'Teams of 3 to 5',
  cta: { label: 'Event Details', href: '/events/hack-fest-26' },
  secondaryCta: { label: 'Register Team', intent: 'team' },
};

export const pastEvents = [
  {
    id: 'hackathon-2026',
    year: '2026',
    status: 'past',
    statusLabel: 'Completed',
    title: 'Inter-University Innovation Hackathon',
    summary:
      'A 24-hour inter-campus collegiate hackathon tackling campus automation, student welfare, and resource sharing.',
    dateLabel: 'March 15th, 2026',
    dateShort: 'Mar 15',
    monthShort: 'Mar',
    dayNumber: '15',
    venue: 'Student Centre, Athi River Campus',
    tagline: 'Inter-campus innovation sprint',
    placeholder: false,
  },
  {
    id: 'ethics-2026',
    year: '2026',
    status: 'past',
    statusLabel: 'Completed',
    title: 'AI & Ethics Tech Talk',
    summary:
      'An interactive seminar examining ethical considerations, algorithmic bias, and responsible AI engineering in African tech ecosystems.',
    dateLabel: 'February 28th, 2026',
    dateShort: 'Feb 28',
    monthShort: 'Feb',
    dayNumber: '28',
    venue: 'Valley Road Auditorium',
    tagline: 'Responsible AI & engineering ethics',
    placeholder: false,
  },
  {
    id: 'flutter-2026',
    year: '2026',
    status: 'past',
    statusLabel: 'Completed',
    title: 'Intro to Flutter Development',
    summary:
      'A hands-on mobile development workshop building cross-platform Flutter applications with clean state management.',
    dateLabel: 'February 14th, 2026',
    dateShort: 'Feb 14',
    monthShort: 'Feb',
    dayNumber: '14',
    venue: 'DCP Lab, Athi River Campus',
    tagline: 'Cross-platform app development',
    placeholder: false,
  },
  {
    id: 'archive-2025',
    year: '2025',
    status: 'past',
    statusLabel: 'Completed',
    title: 'DITA Tech Career Night 2025',
    summary:
      'An evening of short talks on internships, graduate roles and building a portfolio while still on campus.',
    dateLabel: 'November 2025',
    dateShort: 'Nov 2025',
    monthShort: 'Nov',
    dayNumber: '21',
    venue: 'Nairobi Campus',
    tagline: 'From coursework to a first role',
    placeholder: true,
  },
  {
    id: 'archive-2025-b',
    year: '2025',
    status: 'past',
    statusLabel: 'Completed',
    title: 'DITA Cloud Fundamentals Workshop',
    summary:
      'A hands-on Saturday workshop covering deployment basics, storage and cost control for student projects.',
    dateLabel: 'July 2025',
    dateShort: 'Jul 2025',
    monthShort: 'Jul',
    dayNumber: '12',
    venue: 'Athi River Campus, ICT Labs',
    tagline: 'Deploy something real',
    placeholder: true,
  },
  {
    id: 'archive-2024',
    year: '2024',
    status: 'past',
    statusLabel: 'Completed',
    title: 'DITA Open Source Sprint',
    summary:
      'A weekend contribution sprint pairing first-time contributors with maintainers from the Nairobi developer community.',
    dateLabel: 'September 2024',
    dateShort: 'Sep 2024',
    monthShort: 'Sep',
    dayNumber: '07',
    venue: 'Nairobi Campus',
    tagline: 'First pull request',
    placeholder: true,
  },
];

export const pastSection = {
  eyebrow: 'Archive',
  title: 'Past Events & Sprints',
  lede: 'Previous editions, talks, and technical workshops.',
  emptyLabel: 'No archived events yet.',
};

export const PROVISIONAL_NOTE =
  'Archive entries on this page are sample records used for layout review. Real past events will be connected from association archives.';

export const listingContent = {
  listing,
  upcomingEvent,
  pastEvents,
  pastSection,
  provisionalNote: PROVISIONAL_NOTE,
};

export default listingContent;
