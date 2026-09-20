import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Terminal,
  Cpu,
  Coffee,
  Award,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';
import RegistrationDialog from '../components/events/RegistrationDialog';
import {
  hero,
  about,
  eligibilityIntro,
  eligibility,
  tracks,
  schedule,
  speakers,
  perks,
  partners,
} from '../data/hackfest';
import { getPartnerMark } from '../data/partnerLogos';


const FACTS = [
  { key: 'Format', value: '24-hour interdisciplinary sprint' },
  { key: 'Teams', value: '3 to 5 participants' },
  { key: 'Capacity', value: '50 student builders' },
  { key: 'Entry', value: 'Free to attend' },
];

export default function HackFest26() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [intent, setIntent] = useState('team');
  const [activeDay, setActiveDay] = useState('Oct 16');

  const openRegister = (selectedIntent = 'team') => {
    setIntent(selectedIntent);
    setDialogOpen(true);
  };

  const scheduleDays = [
    { label: 'Day 1: Friday, Oct 16', id: 'Oct 16' },
    { label: 'Day 2: Saturday, Oct 17', id: 'Oct 17' },
  ];

  const currentSchedule = schedule.filter((item) => item.day === activeDay);

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans overflow-x-hidden text-slate-800">
      <SEO
        title="DITA Hack Fest '26: AI Developer Workflows for Real-World Impact"
        description="A 24-hour interdisciplinary innovation sprint and commercialization pipeline at Daystar University. Oct 16-17, 2026."
      />

      <Navbar />

      <main className="flex-1">
        {/* ================= SECTION 1: HERO ================= */}
        <section className="relative bg-brand-navy pt-32 pb-44 lg:pb-52 overflow-hidden">
          {/* Ambient lighting accents */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy/95 to-slate-900 pointer-events-none" />
          <div className="absolute top-1/4 right-10 w-96 h-96 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-deep/30 rounded-full blur-3xl pointer-events-none" />

          <div className="container-custom relative z-10">
            {/* Breadcrumb back to /events */}
            <div className="mb-6">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-brand-blue transition-colors"
              >
                <span>&larr; Back to Events Calendar</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md shadow-sm">
                    Daystar University
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    <AlertCircle size={13} />
                    Only a few slots available
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.1]">
                  DITA Hack Fest &apos;26:{' '}
                  <span className="text-brand-blue">
                    AI Developer Workflows for Real-World Impact
                  </span>
                </h1>

                <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-3xl">
                  {hero.subtitle}
                </p>

                {/* Event Metadata Bar */}
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-blue" />
                    <span>October 16th - 17th, 2026</span>
                  </div>
                  <span className="hidden sm:inline text-slate-600">•</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-blue" />
                    <span>24-Hour Continuous Sprint</span>
                  </div>
                  <span className="hidden sm:inline text-slate-600">•</span>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-blue" />
                    <span>Daystar University, Athi River</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    type="button"
                    onClick={() => openRegister('team')}
                    className="btn-brand px-8 py-4 rounded-xl text-brand-deep font-bold text-sm tracking-wide shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Register Team (3-5 builders)</span>
                    <ChevronRight size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => openRegister('individual')}
                    className="px-6 py-4 rounded-xl border border-white/20 hover:border-brand-blue text-white hover:text-brand-blue font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Join as Individual Builder</span>
                  </button>
                  <span className="text-xs text-slate-400 sm:self-center">
                    Free to attend • 50 builder cap
                  </span>
                </div>
              </div>

              {/* Event Essentials Card from Variant C */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-white/20 bg-white/10 p-7 sm:p-9 backdrop-blur-md shadow-2xl">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/90">
                    Event Essentials
                  </p>
                  <div className="mt-6 space-y-5">
                    {FACTS.map((fact) => (
                      <div
                        key={fact.key}
                        className="border-t border-white/15 pt-4 first:border-t-0 first:pt-0"
                      >
                        <span className="block text-xs font-bold uppercase tracking-[0.14em] text-white/70">
                          {fact.key}
                        </span>
                        <span className="mt-1 block text-base font-semibold text-white">
                          {fact.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Angled SVG divider matching DITA site language */}
          <div className="absolute inset-x-0 bottom-0 leading-[0] pointer-events-none" aria-hidden="true">
            <svg
              className="relative block w-full h-16 sm:h-24 lg:h-32"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M1200 120L0 16.48V0h1200v120z"
                className="fill-slate-50"
              />
            </svg>
          </div>
        </section>

        {/* ================= SECTION 2: ABOUT & CORE THEME ================= */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-brand-blue text-xs font-bold uppercase tracking-widest">
                  The Vision &amp; Pipeline
                </span>
                <div className="h-1 w-16 bg-brand-blue rounded-full" />
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 leading-tight">
                  About DITA Hack Fest &apos;26
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Jointly presented by the Daystar Information &amp; Technology Association (DITA), the School of Science, Engineering, and Health (SSEH), and the Directorate of Research, Innovation, Commercialization &amp; Entrepreneurship (DRICE).
                </p>
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs sm:text-sm">
                  <p className="font-bold">50-Builder Capacity</p>
                  <p className="mt-1 text-amber-800 leading-relaxed">
                    Participation is capped at 50 builders across Daystar students and regional guest institutions. Only a few slots remain available.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="border-l-4 border-brand-blue pl-6 py-2">
                  <p className="text-xl sm:text-2xl font-heading font-bold text-slate-900 leading-snug">
                    &ldquo;{about.theme}&rdquo;
                  </p>
                </div>
                <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                  {about.body}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                    <Clock className="w-5 h-5 text-brand-blue mb-3" />
                    <h3 className="font-heading font-bold text-slate-900 text-sm">24-Hour Continuous Sprint</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Continuous building from Friday morning through Saturday afternoon with mentor checkpoints.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                    <Cpu className="w-5 h-5 text-brand-blue mb-3" />
                    <h3 className="font-heading font-bold text-slate-900 text-sm">AI Workflow Stack</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Scaffold using SpaceXAI and AWS cloud deployment environments provided to teams.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                    <Award className="w-5 h-5 text-brand-blue mb-3" />
                    <h3 className="font-heading font-bold text-slate-900 text-sm">Commercialization</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Prototypes receive direct review from DRICE for patenting and incubation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 3: ELIGIBILITY ================= */}
        <section className="py-20 bg-white border-t border-b border-slate-200/80">
          <div className="container-custom">
            <div className="max-w-3xl mb-14">
              <span className="text-brand-blue text-xs font-bold uppercase tracking-widest">
                Who Can Participate
              </span>
              <div className="h-1 w-16 bg-brand-blue rounded-full mt-1.5 mb-4" />
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">
                Eligibility &amp; Team Composition
              </h2>
              <p className="mt-3 text-slate-600 leading-relaxed text-sm sm:text-base">
                {eligibilityIntro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eligibility.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between hover:border-brand-blue transition-colors"
                >
                  <div>
                    <h3 className="text-lg font-heading font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SECTION 4: CHALLENGE TRACKS ================= */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container-custom">
            <div className="max-w-3xl mb-14">
              <span className="text-brand-blue text-xs font-bold uppercase tracking-widest">
                Innovation Focus
              </span>
              <div className="h-1 w-16 bg-brand-blue rounded-full mt-1.5 mb-4" />
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">
                Four Challenge Tracks
              </h2>
              <p className="mt-3 text-slate-600 leading-relaxed text-sm sm:text-base">
                Projects target one of four high-impact problem spaces. Safaricom sponsors the flagship Digital Finance track.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tracks.map((track) => (
                <div
                  key={track.number}
                  className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-brand-blue transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Track 0{track.number}
                      </span>
                      {track.sponsorLabel ? (
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                          {track.sponsorLabel}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="text-2xl font-heading font-bold text-slate-900 mb-3">
                      {track.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {track.body}
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => openRegister('team')}
                      className="text-xs font-bold text-brand-blue hover:text-brand-deep transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Build for this track</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SECTION 5: RUN OF SHOW SCHEDULE ================= */}
        <section className="py-20 bg-white border-t border-b border-slate-200/80">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-brand-blue text-xs font-bold uppercase tracking-widest">
                  Timeline
                </span>
                <div className="h-1 w-16 bg-brand-blue rounded-full mt-1.5 mb-4" />
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">
                  Run of Show
                </h2>
                <p className="mt-2 text-slate-600 text-sm">
                  Complete 24-hour agenda from opening keynote to final DRICE commercialization judging.
                </p>
              </div>

              {/* Day Selector */}
              <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
                {scheduleDays.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setActiveDay(d.id)}
                    className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      activeDay === d.id
                        ? 'bg-white text-brand-navy shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Schedule Items */}
            <div className="max-w-4xl divide-y divide-slate-100 border border-slate-200 rounded-3xl overflow-hidden bg-slate-50/50">
              {currentSchedule.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                    item.freeze ? 'bg-amber-50/60 border-l-4 border-amber-500' : 'hover:bg-white'
                  }`}
                >
                  <div className="sm:w-52 shrink-0">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-deep bg-brand-blueSoft px-3 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5 text-brand-blue" />
                      <span>{item.time}</span>
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900">
                        {item.activity}
                      </h3>
                      {item.freeze ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-200 text-amber-900">
                          Lockout
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="sm:w-48 text-left sm:text-right shrink-0">
                    <span className="text-xs text-slate-500 flex items-center sm:justify-end gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.venue}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SECTION 6: SPEAKERS & MENTORS ================= */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container-custom">
            <div className="max-w-3xl mb-14">
              <span className="text-brand-blue text-xs font-bold uppercase tracking-widest">
                Leadership &amp; Guidance
              </span>
              <div className="h-1 w-16 bg-brand-blue rounded-full mt-1.5 mb-4" />
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">
                Featured Speakers &amp; Leads
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base">
                Industry engineers, research leads, and community mentors guiding teams throughout the sprint.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {speakers.map((speaker, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-brand-blue transition-colors"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-brand-blueSoft text-brand-deep flex items-center justify-center font-heading font-bold text-xl mb-5">
                      {speaker.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </div>

                    <h3 className="text-lg font-heading font-bold text-slate-900">
                      {speaker.name}
                    </h3>
                    <p className="text-xs font-semibold text-brand-blue mt-0.5">
                      {speaker.role}
                    </p>
                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                      {speaker.sessionTitle}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                    Session &amp; Sprint Mentor
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SECTION 7: PERKS & BENEFITS ================= */}
        <section className="py-20 bg-white border-t border-b border-slate-200/80">
          <div className="container-custom">
            <div className="max-w-3xl mb-14">
              <span className="text-brand-blue text-xs font-bold uppercase tracking-widest">
                Participant Experience
              </span>
              <div className="h-1 w-16 bg-brand-blue rounded-full mt-1.5 mb-4" />
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">
                What Participants Receive
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base">
                Every confirmed participant receives comprehensive resources, welfare support, and direct commercialization access.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {perks.map((perk, idx) => {
                const icons = [Terminal, Cpu, Coffee, Award];
                const IconComponent = icons[idx % icons.length];

                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-brand-blue flex items-center justify-center mb-5">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="font-heading font-bold text-slate-900 text-lg mb-2">
                        {perk.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {perk.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= SECTION 8: 3-TIER PARTNERS GRID ================= */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container-custom">
            <div className="max-w-3xl mb-16">
              <span className="text-brand-blue text-xs font-bold uppercase tracking-widest">
                Partners &amp; Sponsors
              </span>
              <div className="h-1 w-16 bg-brand-blue rounded-full mt-1.5 mb-4" />
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900">
                Delivered in Partnership With
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base">
                Nine verified partners across institutional leadership, developer tools, infrastructure, and student welfare.
              </p>
            </div>

            <div className="space-y-12">
              {partners.map((tier) => (
                <div
                  key={tier.tier}
                  className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                        Tier 0{tier.tier}
                      </span>
                      <h3 className="text-xl font-heading font-bold text-slate-900 mt-1">
                        {tier.label}
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tier.orgs.map((org) => {
                      const mark = getPartnerMark(org.name);

                      return (
                        <div
                          key={org.name}
                          className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between"
                        >
                          <div className="h-20 flex items-center justify-start">
                            {mark && mark.src ? (
                              <img
                                src={mark.src}
                                alt={org.name}
                                className={`${
                                  org.name.includes('DRICE') || org.name.includes('Daystar') || org.name.includes('DITA')
                                    ? 'h-14 sm:h-16 max-w-[240px]'
                                    : 'h-10 sm:h-12 max-w-[200px]'
                                } object-contain hover:scale-105 transition-transform`}
                              />
                            ) : (
                              <span className="font-heading font-bold text-slate-900 text-lg">
                                {org.name}
                              </span>
                            )}
                          </div>
                          <div className="mt-4 pt-4 border-t border-slate-200/60">
                            <p className="text-xs font-bold text-slate-900">
                              {org.name}
                            </p>
                            {org.role ? (
                              <p className="text-[11px] text-slate-500 mt-0.5">
                                {org.role}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FINAL REGISTRATION CALLOUT ================= */}
        <section className="py-20 bg-brand-navy text-white relative overflow-hidden">
          <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
            <span className="inline-block text-brand-blue text-xs font-bold uppercase tracking-widest mb-3">
              Only A Few Slots Available
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">
              Ready to Build for Regional Impact?
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Join 50 student and guest builders at Daystar University, Athi River Campus for 24 hours of AI-driven scaffolding and DRICE commercialization review.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => openRegister('team')}
                className="btn-brand px-8 py-3.5 rounded-xl text-brand-deep font-bold text-sm tracking-wide shadow-lg cursor-pointer"
              >
                Register Your Team
              </button>
              <button
                type="button"
                onClick={() => openRegister('individual')}
                className="px-6 py-3.5 rounded-xl border border-white/30 hover:border-white text-white font-semibold text-sm transition-all cursor-pointer"
              >
                Join as Individual Builder
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              Free to attend • Strictly capped at 50 builder slots • In-house registration
            </p>
          </div>
        </section>
      </main>

      <Footer />

      {/* Accessible native <dialog> registration modal */}
      <RegistrationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        initialIntent={intent}
      />
    </div>
  );
}
