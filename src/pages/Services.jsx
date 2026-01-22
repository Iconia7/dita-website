import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ServiceCard from '../components/cards/ServiceCard';
import { Code, Laptop, Users, Briefcase, GraduationCap, Wifi, ArrowRight, Zap, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/animations';
import Reveal from '../components/common/Reveal';

const servicesData = [
  {
    icon: Code,
    title: "Coding Bootcamps",
    description: "Intensive weekly sessions on Web Development, Mobile Apps (Flutter), and Data Science to get you job-ready."
  },
  {
    icon: Users,
    title: "Peer Mentorship",
    description: "First-year students are paired with seniors to guide them through academic challenges and project work."
  },
  {
    icon: Laptop,
    title: "Hackathons",
    description: "Competitions that challenge you to solve real-world problems under time constraints, with exciting prizes."
  },
  {
    icon: Briefcase,
    title: "Career Development",
    description: "CV writing workshops, portfolio reviews, and mock interviews tailored for the tech industry."
  },
  {
    icon: GraduationCap,
    title: "Academic Support",
    description: "Exam revision groups and tutoring for difficult units like Data Structures and Algorithms."
  },
  {
    icon: Wifi,
    title: "Tech Talks",
    description: "Guest speakers from companies like Microsoft, Google, and Safaricom sharing industry insights."
  }
];

const Services = () => {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-brand-dark pt-32 pb-48 overflow-hidden">
         {/* Background Image (Coding/Tech Vibe) */}
         <div className="absolute inset-0 z-0">
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10 }}
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop" 
              alt="Services Background" 
              className="w-full h-full object-cover opacity-20"
            />
         </div>
         
         {/* Digital Grid Overlay */}
         <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-dark via-brand-dark/90 to-brand-accent/5"></div>

         {/* Content */}
         <div className="container-custom relative z-10 text-center">
            <motion.div 
               variants={fadeIn("down", 0.2)} 
               initial="hidden" 
               animate="show"
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-brand-accent text-xs font-bold uppercase tracking-widest mb-6"
            >
               <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
               What We Do
            </motion.div>

            <motion.h1 
               variants={fadeIn("up", 0.3)}
               initial="hidden"
               animate="show"
               className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
               Empowering Your <br/>
               <span className="text-transparent bg-clip-text bg-brand-accent">
                  Tech Journey.
               </span>
            </motion.h1>
            
            <motion.p 
               variants={fadeIn("up", 0.4)}
               initial="hidden"
               animate="show"
               className="text-slate-300 text-lg max-w-2xl mx-auto"
            >
               From writing your first line of code to landing your first job, DITA is here to support every step of your career.
            </motion.p>
         </div>

         {/* Diagonal Cut */}
         <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[100px]">
                <path d="M1200 120L0 16.48V0h1200v120z" className="fill-slate-50"></path>
            </svg>
         </div>
      </section>

      {/* ================= STATS STRIP ================= */}
      <section className="relative z-20 -mt-20 container-custom mb-20">
         <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 border border-slate-100">
             <div className="flex flex-col items-center text-center p-4">
                 <div className="bg-blue-50 p-3 rounded-full text-blue-600 mb-3">
                    <Zap size={24} />
                 </div>
                 <h4 className="text-3xl font-bold text-slate-900">50+</h4>
                 <p className="text-slate-500 font-medium text-sm uppercase tracking-wide">Workshops Held</p>
             </div>
             <div className="flex flex-col items-center text-center p-4">
                 <div className="bg-teal-50 p-3 rounded-full text-brand-accent mb-3">
                    <Users size={24} />
                 </div>
                 <h4 className="text-3xl font-bold text-slate-900">300+</h4>
                 <p className="text-slate-500 font-medium text-sm uppercase tracking-wide">Active Members</p>
             </div>
             <div className="flex flex-col items-center text-center p-4">
                 <div className="bg-purple-50 p-3 rounded-full text-purple-600 mb-3">
                    <Trophy size={24} />
                 </div>
                 <h4 className="text-3xl font-bold text-slate-900">12</h4>
                 <p className="text-slate-500 font-medium text-sm uppercase tracking-wide">Hackathon Wins</p>
             </div>
         </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="pb-32 container-custom">
        <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Core Programs</h2>
            <div className="hidden md:block h-px bg-slate-200 flex-grow ml-8"></div>
        </div>

        {/* Staggered Grid Animation */}
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
           {servicesData.map((service, index) => (
             <motion.div 
               key={index} 
               variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
             >
               <ServiceCard {...service} />
             </motion.div>
           ))}
        </motion.div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-20 bg-brand-dark relative overflow-hidden">
         {/* Decorative Background */}
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-accent/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
         
         <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white">
                <h2 className="text-3xl font-bold mb-2">Have a project idea?</h2>
                <p className="text-white">Join our next hackathon and bring it to life.</p>
            </div>
            <button className="px-8 py-3 bg-white text-brand-dark rounded-full font-bold hover:bg-brand-accent hover:text-white transition-all flex items-center gap-2">
                View Calendar <ArrowRight size={20} />
            </button>
         </div>
      </section>

      {/* ================= FOOTER ================= */}
      <div className="bg-brand-primary">
         <Footer compact={true} />
      </div>
    </div>
  );
};

export default Services;