import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ExecutiveCard from '../components/cards/ExecutiveCard';
import { universityLeadership, studentExecutives } from '../data/leadership';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/animations';
import Reveal from '../components/common/Reveal';
import { Users, Award, Star } from 'lucide-react';
import SEO from '../components/common/SEO';

const Leadership = () => {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans overflow-x-hidden">
      <SEO 
  title="Leadership & Team - Daystar Information Technology Association" 
  description="Meet the dedicated team behind DITA. Get to know the University Patrons, the Dean, and the Student Executive Council driving technological excellence on campus."
/>
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-brand-dark pt-32 pb-48 overflow-hidden">
         {/* Background Image (Leadership/Team Vibe) */}
         <div className="absolute inset-0 z-0">
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10 }}
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop" 
              alt="Leadership Background" 
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
               <Users size={14} />
               The Team
            </motion.div>

            <motion.h1 
               variants={fadeIn("up", 0.3)}
               initial="hidden"
               animate="show"
               className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
               Leading with <br/>
               <span className="text-transparent bg-clip-text bg-brand-accent">
                  Vision & Purpose.
               </span>
            </motion.h1>
            
            <motion.p 
               variants={fadeIn("up", 0.4)}
               initial="hidden"
               animate="show"
               className="text-slate-300 text-lg max-w-2xl mx-auto"
            >
               Meet the dedicated faculty mentors and student leaders driving innovation at Daystar University.
            </motion.p>
         </div>

         {/* Diagonal Cut */}
         <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[100px]">
                <path d="M1200 120L0 16.48V0h1200v120z" className="fill-slate-50"></path>
            </svg>
         </div>
      </section>

      {/* ================= UNIVERSITY LEADERSHIP (Premium Cards) ================= */}
      <section className="py-24 container-custom relative z-10">
        <Reveal>
           <div className="text-center mb-16">
              <span className="text-brand-accent font-bold tracking-wider uppercase text-sm flex items-center justify-center gap-2">
                 <Award size={18} /> Mentorship
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">University Leadership</h2>
           </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
           {universityLeadership.map((leader, index) => (
             <Reveal key={leader.id} delay={index * 0.2}>
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col sm:flex-row items-center gap-8 hover:-translate-y-2 transition-transform duration-300 group">
                   <div className="relative">
                      {/* Gold Ring Effect for Leaders */}
                      <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                      <img 
                        src={leader.image} 
                        alt={leader.name} 
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md relative z-10"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white p-1.5 rounded-full z-20">
                         <Star size={16} fill="currentColor" />
                      </div>
                   </div>
                   
                   <div className="text-center sm:text-left">
                      <h3 className="text-2xl font-bold text-slate-900">{leader.name}</h3>
                      <p className="text-brand-accent font-bold uppercase text-sm tracking-wide mb-3">{leader.role}</p>
                      <p className="text-slate-600 leading-relaxed text-sm">{leader.bio}</p>
                   </div>
                </div>
             </Reveal>
           ))}
        </div>
      </section>

      {/* ================= STUDENT EXECUTIVES (Staggered Grid) ================= */}
      <section className="pb-32 container-custom">
        <Reveal>
           <div className="text-center mb-16">
              <span className="text-brand-accent font-bold tracking-wider uppercase text-sm">Governance</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">The Executive Council</h2>
              <div className="h-1 w-24 bg-brand-accent mx-auto mt-6 rounded-full"></div>
           </div>
        </Reveal>

        <motion.div 
           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
           initial="hidden"
           whileInView="show"
           viewport={{ once: true }}
           variants={{
             hidden: {},
             show: { transition: { staggerChildren: 0.15 } }
           }}
        >
           {studentExecutives.map((exec) => (
             <motion.div 
               key={exec.id} 
               variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
             >
               <ExecutiveCard {...exec} />
             </motion.div>
           ))}
        </motion.div>
      </section>

      {/* ================= FOOTER ================= */}
      <div className="bg-brand-primary">
         <Footer compact={true} />
      </div>
    </div>
  );
};

export default Leadership;