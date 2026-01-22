import Navbar from '../components/common/Navbar';
import FeatureSplit from '../components/sections/FeatureSplit';
import GreenCTA from '../components/sections/GreenCTA';
import EventCard from '../components/cards/EventCard';
import Footer from '../components/common/Footer';
import { features } from '../data/features';
import { events } from '../data/events';
import { useState } from 'react';
import RegistrationModal from '../components/modals/RegistrationModal';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/animations';
import Reveal from '../components/common/Reveal';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

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
      <section className="relative bg-brand-dark min-h-[90vh] flex items-center pt-32 pb-48 overflow-hidden">
         
         {/* 1. Dynamic Background Image with Zoom Effect */}
         <div className="absolute inset-0 z-0">
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" 
              alt="DITA Background" 
              className="w-full h-full object-cover opacity-40"
            />
         </div>

         {/* 2. Modern Gradient Overlay */}
         <div className="absolute inset-0 z-0 bg-gradient-to-tr from-brand-dark via-brand-dark/90 to-brand-accent/20"></div>

         {/* 3. Decorative Glowing Orbs (The "Modern" Touch) */}
         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-accent/20 rounded-full blur-[100px] animate-pulse"></div>
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>

         {/* 4. Main Content */}
         <div className="container-custom relative z-10">
           <div className="max-w-4xl mx-auto text-center space-y-8">
               
               {/* Pill Label */}
               <motion.div 
                 variants={fadeIn("down", 0.2)} 
                 initial="hidden" 
                 animate="show"
                 className="flex justify-center"
               >
                 <span className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-brand-accent font-semibold tracking-widest text-xs uppercase shadow-xl">
                   Daystar Information Technology Association
                 </span>
               </motion.div>

               {/* Big Headline with Gradient Text */}
               <motion.h1 
                 variants={fadeIn("up", 0.4)}
                 initial="hidden"
                 animate="show"
                 className="text-6xl md:text-8xl font-bold text-white leading-tight tracking-tight"
               >
                 Innovate.<br/>
                 <span className="text-transparent bg-clip-text bg-brand-accent to-blue-400">
                   Transform.
                 </span> Lead.
               </motion.h1>

               {/* Subtitle */}
               <motion.p 
                 variants={fadeIn("up", 0.6)}
                 initial="hidden"
                 animate="show"
                 className="text-slate-200 text-lg md:text-2xl font-light max-w-2xl mx-auto leading-relaxed"
               >
                 Join the premier community for tech enthusiasts, developers, and visionaries at Daystar University.
               </motion.p>
               
               {/* Buttons */}
               <motion.div 
  variants={fadeIn("up", 0.8)}
  initial="hidden"
  animate="show"
  className="flex flex-col sm:flex-row justify-center gap-4 pt-6"
>
  {/* Link to Contact Page */}
  <Link 
    to="/contact" 
    className="px-8 py-4 bg-brand-accent text-white rounded-full font-bold text-lg hover:bg-teal-500 hover:scale-105 transition-all shadow-lg shadow-teal-500/25 text-center"
  >
    Become a Member
  </Link>

  {/* Link to Events Page */}
  <Link 
    to="/events" 
    className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium text-lg hover:bg-white/10 backdrop-blur-sm transition-all text-center"
  >
    View Events
  </Link>
</motion.div>
           </div>
         </div>

         {/* 5. Modern Diagonal Cut (Clip Path) */}
         <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[100px]">
                <path d="M1200 120L0 16.48V0h1200v120z" className="fill-slate-50"></path>
            </svg>
         </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <div className="py-24 bg-slate-50 relative">
        {/* Subtle Grid Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="relative z-10 space-y-24">
          {features.map((feature, index) => (
            <Reveal key={feature.id} width="100%" delay={index * 0.1}>
                <FeatureSplit {...feature} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* ================= EVENTS SECTION ================= */}
      <section className="pt-20 pb-40 bg-white relative">
        <div className="container-custom relative z-10">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-brand-accent font-bold tracking-wider uppercase text-sm">Action & Adventure</span>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2">Upcoming Activities</h2>
              </div>
              <a href="/events" className="text-slate-500 hover:text-brand-accent flex items-center gap-2 font-medium transition-colors">
                View full calendar <ArrowRight size={20} />
              </a>
            </div>
          </Reveal>

          {/* Staggered Grid */}
          <motion.div 
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
             initial="hidden"
             whileInView="show"
             viewport={{ once: true }}
             variants={{
               hidden: {},
               show: { transition: { staggerChildren: 0.15 } }
             }}
          >
            {events.map((event) => (
              <motion.div key={event.id} variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0 } }}>
                 <EventCard 
                   {...event} 
                   onRegister={handleRegisterClick} 
                 />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= MODAL ================= */}
      <RegistrationModal 
        isOpen={!!selectedEvent}
        onClose={handleCloseModal}
        eventTitle={selectedEvent}
      />

      {/* ================= FOOTER WRAPPER ================= */}
      {/* Using a negative margin approach for a tighter integration */}
      <div className="relative mt-20">
         <div className="bg-brand-primary pt-32 pb-10 relative">
            
            {/* CTA Floating Halfway Up */}
            <div className="absolute top-0 left-0 w-full -translate-y-1/2 px-4">
               <GreenCTA />
            </div>

            <Footer />
         </div>
      </div>

    </div>
  );
};

export default Home;