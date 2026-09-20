import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Users,
  CheckCircle2,
  Info,
  AlertCircle,
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';
import RegistrationDialog from '../components/events/RegistrationDialog';
import {
  listing,
  upcomingEvent,
  pastEvents,
  pastSection,
  PROVISIONAL_NOTE,
} from '../data/eventsListing';

export default function Events() {
  const [filter, setFilter] = useState('all'); // 'all' | 'upcoming' | 'past'
  const [dialogOpen, setDialogOpen] = useState(false);
  const [intent, setIntent] = useState('team');

  const openRegister = (selectedIntent = 'team') => {
    setIntent(selectedIntent);
    setDialogOpen(true);
  };

  const showUpcoming = filter === 'all' || filter === 'upcoming';
  const showPast = filter === 'all' || filter === 'past';

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans overflow-x-hidden text-slate-800">
      <SEO
        title="Events & Hackathons"
        description="Explore upcoming tech events, hackathons, and developer workshops at Daystar University."
      />

      <Navbar />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="relative bg-brand-navy pt-32 pb-44 lg:pb-52 overflow-hidden">
          {/* Ambient lighting effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy/95 to-slate-900 pointer-events-none" />
          <div className="absolute top-1/4 right-10 w-96 h-96 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-deep/30 rounded-full blur-3xl pointer-events-none" />

          <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm text-brand-blue text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Daystar Tech Community Calendar</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight">
              DITA <span className="text-brand-blue">Events &amp; Sprints</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              {listing.subtitle}
            </p>

            {/* Filter Pills */}
            <div className="mt-10 inline-flex p-1.5 bg-white/10 border border-white/15 backdrop-blur-md rounded-2xl gap-1">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  filter === 'all'
                    ? 'bg-white text-brand-navy shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                All Events
              </button>
              <button
                type="button"
                onClick={() => setFilter('upcoming')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  filter === 'upcoming'
                    ? 'bg-white text-brand-navy shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Upcoming (1)
              </button>
              <button
                type="button"
                onClick={() => setFilter('past')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  filter === 'past'
                    ? 'bg-white text-brand-navy shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Past Archive ({pastEvents.length})
              </button>
            </div>
          </div>

          {/* Angled SVG divider */}
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

        {/* ================= UPCOMING EVENTS SECTION ================= */}
        {showUpcoming ? (
          <section className="py-16 lg:py-24 relative bg-slate-50">
            <div className="container-custom">
              <div className="mb-10">
                <div className="inline-block">
                  <span className="text-brand-blue text-xs font-bold uppercase tracking-widest">
                    Next on the Calendar
                  </span>
                  <div className="h-1 w-16 bg-brand-blue rounded-full mt-1.5" />
                </div>
                <h2 className="text-3xl font-heading font-bold text-slate-900 mt-2">
                  Featured Upcoming Event
                </h2>
              </div>

              {/* Marquee Featured Card: DITA Hack Fest '26 */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-md p-6 sm:p-10 lg:p-12 hover:border-brand-blue transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8 space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <AlertCircle size={13} className="text-amber-600" />
                        {upcomingEvent.statusLabel}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-brand-blueSoft text-brand-deep text-xs font-bold uppercase tracking-wider">
                        50-Builder Cap
                      </span>
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
                        {upcomingEvent.format}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-slate-900 leading-tight">
                      <Link
                        to="/events/hack-fest-26"
                        className="hover:text-brand-blue transition-colors group flex items-center gap-2"
                      >
                        <span>{upcomingEvent.title}</span>
                        <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-brand-blue" />
                      </Link>
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {upcomingEvent.summary}
                    </p>

                    {/* Event Highlights Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <Calendar className="w-4 h-4 text-brand-blue shrink-0" />
                        <span>{upcomingEvent.dateLabel}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <MapPin className="w-4 h-4 text-brand-blue shrink-0" />
                        <span>{upcomingEvent.venue}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <Users className="w-4 h-4 text-brand-blue shrink-0" />
                        <span>{upcomingEvent.teamSize} (Open to external builders)</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{upcomingEvent.entry}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="lg:col-span-4 lg:pl-6 lg:border-l lg:border-slate-100 flex flex-col justify-between h-full space-y-6">
                    <div className="p-5 rounded-2xl bg-brand-blueSoft/50 border border-brand-blue/20">
                      <div className="flex items-center gap-2 text-brand-deep font-semibold text-xs uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                        <span>DRICE Innovation Pipeline</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Top teams earn funded review and incubator onboarding with the Daystar University DRICE Directorate.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Link
                        to="/events/hack-fest-26"
                        className="w-full py-3.5 px-6 rounded-xl bg-brand-blue hover:bg-brand-deep text-white font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all"
                      >
                        <span>Explore Hack Fest &apos;26</span>
                        <ArrowRight size={16} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => openRegister('team')}
                        className="w-full py-3 px-6 rounded-xl border border-slate-200 hover:border-brand-blue text-slate-700 hover:text-brand-blue font-semibold text-sm transition-all cursor-pointer"
                      >
                        Register Team (Quick Modal)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* ================= PAST EVENTS ARCHIVE ================= */}
        {showPast ? (
          <section className="py-16 lg:py-24 bg-white border-t border-slate-200/80">
            <div className="container-custom">
              <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="text-brand-blue text-xs font-bold uppercase tracking-widest">
                    {pastSection.eyebrow}
                  </span>
                  <div className="h-1 w-16 bg-brand-blue rounded-full mt-1.5 mb-3" />
                  <h2 className="text-3xl font-heading font-bold text-slate-900">
                    {pastSection.title}
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    {pastSection.lede}
                  </p>
                </div>

                {/* Provisional Note Disclaimer */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-900 text-xs max-w-md">
                  <Info className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{PROVISIONAL_NOTE}</span>
                </div>
              </div>

              {/* NG Kenya Card Anatomy Archive Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastEvents.map((evt) => (
                  <article
                    key={evt.id}
                    className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:border-brand-blue transition-all duration-200 group"
                  >
                    <div className="p-6 sm:p-8 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          {evt.year}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide bg-slate-100 text-slate-600 flex items-center gap-1">
                          <CheckCircle2 size={12} className="text-slate-400" />
                          {evt.statusLabel}
                        </span>
                      </div>

                      <h3 className="text-xl font-heading font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                        {evt.title}
                      </h3>

                      <p className="text-xs font-semibold text-brand-blue">
                        {evt.tagline}
                      </p>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {evt.summary}
                      </p>
                    </div>

                    <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-brand-blue" />
                        {evt.dateLabel}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-brand-blue" />
                        {evt.venue}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

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
