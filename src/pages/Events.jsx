import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import EventCard from '../components/cards/EventCard';
import { events } from '../data/events';
import { useState } from 'react';
import RegistrationModal from '../components/modals/RegistrationModal';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/animations';
import { Calendar, Filter, Sparkles } from 'lucide-react';

const Events = () => {
  // State for the Registration Modal
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filter, setFilter] = useState('upcoming'); // 'upcoming' or 'past'

  const handleRegisterClick = (eventTitle) => {
    setSelectedEvent(eventTitle);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-brand-dark pt-32 pb-48 overflow-hidden">
         {/* Background Image (Crowd/Event Vibe) */}
         <div className="absolute inset-0 z-0">
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10 }}
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop" 
              alt="Events Background" 
              className="w-full h-full object-cover opacity-30"
            />
         </div>
         
         {/* Gradient Overlay */}
         <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-dark via-brand-dark/90 to-brand-accent/10"></div>

         {/* Content */}
         <div className="container-custom relative z-10 text-center">
            <motion.div 
               variants={fadeIn("down", 0.2)} 
               initial="hidden" 
               animate="show"
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-brand-accent text-xs font-bold uppercase tracking-widest mb-6"
            >
               <Calendar size={14} />
               DITA Calendar 2026
            </motion.div>

            <motion.h1 
               variants={fadeIn("up", 0.3)}
               initial="hidden"
               animate="show"
               className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
               Where Ideas <br/>
               <span className="text-transparent bg-clip-text bg-brand-accent">
                  Come to Life.
               </span>
            </motion.h1>
            
            <motion.p 
               variants={fadeIn("up", 0.4)}
               initial="hidden"
               animate="show"
               className="text-slate-300 text-lg max-w-2xl mx-auto"
            >
               Join workshops, hackathons, and networking mixers designed to accelerate your tech career.
            </motion.p>
         </div>

         {/* Diagonal Cut */}
         <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[100px]">
                <path d="M1200 120L0 16.48V0h1200v120z" className="fill-slate-50"></path>
            </svg>
         </div>
      </section>

      {/* ================= EVENTS GRID ================= */}
      <section className="pb-32 container-custom relative z-10 -mt-10">
         
         {/* Filter Toolbar */}
         <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
               <h2 className="text-3xl font-bold text-brand-accent flex items-center gap-3">
                  Upcoming Events
               </h2>
               <p className="text-slate-500 mt-2">Book your spot for the latest sessions.</p>
            </div>

            {/* Glassmorphic Filter Switch */}
            <div className="bg-white p-1.5 rounded-xl shadow-lg border border-slate-100 flex">
               <button 
                 onClick={() => setFilter('upcoming')}
                 className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    filter === 'upcoming' 
                    ? 'bg-brand-accent text-white shadow-md' 
                    : 'text-slate-500 hover:bg-slate-50'
                 }`}
               >
                 Upcoming
               </button>
               <button 
                 onClick={() => setFilter('past')}
                 className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    filter === 'past' 
                    ? 'bg-slate-800 text-white shadow-md' 
                    : 'text-slate-500 hover:bg-slate-50'
                 }`}
               >
                 Past Events
               </button>
            </div>
         </div>

         {/* Grid */}
         <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } }
            }}
         >
            {/* Real Events */}
            {events.map((event) => (
              <motion.div 
                key={event.id} 
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
              >
                <EventCard 
                   {...event} 
                   onRegister={handleRegisterClick} 
                />
              </motion.div>
            ))}

            {/* Duplicate Events (For Demo Filling) */}
            {events.map((event) => (
              <motion.div 
                key={`dup-${event.id}`} 
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
              >
                <EventCard 
                   {...event} 
                   id={`dup-${event.id}`} // Pass unique ID to avoid animation conflicts
                   onRegister={handleRegisterClick} 
                />
              </motion.div>
            ))}
         </motion.div>
      </section>

      {/* ================= MODAL ================= */}
      {/* This enables the pop-up when you click "Register" */}
      <RegistrationModal 
        isOpen={!!selectedEvent}
        onClose={handleCloseModal}
        eventTitle={selectedEvent}
      />

      {/* ================= FOOTER ================= */}
      <div className="bg-brand-primary">
         <Footer compact={true} />
      </div>
    </div>
  );
};

export default Events;