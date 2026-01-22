import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Target, Lightbulb, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/animations';
import Reveal from '../components/common/Reveal';
import SEO from '../components/common/SEO';

const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans overflow-x-hidden">
      <SEO 
  title="About Us - Daystar Information Technology Association" 
  description="Discover the story behind DITA. Learn about our mission to foster innovation, our values, and how we are bridging the gap between academia and the tech industry at Daystar University."
/>
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-brand-dark pt-32 pb-48 overflow-hidden">
         
         {/* 1. Background Image with Slow Zoom */}
         <div className="absolute inset-0 z-0">
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10 }} // Smooth entry zoom
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" 
              alt="DITA Team" 
              className="w-full h-full object-cover opacity-30"
            />
         </div>

         {/* 2. Gradient Overlay */}
         <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand-dark via-brand-dark/95 to-brand-accent/10"></div>

         {/* 3. Glowing Orbs */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none"></div>

         {/* 4. Content */}
         <div className="container-custom relative z-10 text-center">
            <motion.div 
               variants={fadeIn("down", 0.2)} 
               initial="hidden" 
               animate="show"
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-brand-accent text-xs font-bold uppercase tracking-widest mb-6"
            >
               <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
               Our Story
            </motion.div>

            <motion.h1 
               variants={fadeIn("up", 0.3)}
               initial="hidden"
               animate="show"
               className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
               More Than Just <br/>
               <span className="text-transparent bg-clip-text bg-brand-accent">
                  Lines of Code.
               </span>
            </motion.h1>

            <motion.p 
               variants={fadeIn("up", 0.4)}
               initial="hidden"
               animate="show"
               className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
               We are fostering a culture of innovation, excellence, and technological leadership at Daystar University.
            </motion.p>
         </div>

         {/* 5. Diagonal Cut Bottom */}
         <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[100px]">
                <path d="M1200 120L0 16.48V0h1200v120z" className="fill-slate-50"></path>
            </svg>
         </div>
      </section>

      {/* ================= MISSION CARDS (Floating Up) ================= */}
      <section className="relative z-20 -mt-24 pb-20 container-custom">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Mission */}
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="bg-white p-8 rounded-3xl shadow-xl border-t-4 border-brand-accent hover:-translate-y-2 transition-transform duration-300"
            >
               <div className="bg-teal-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-brand-accent">
                 <Target size={32} />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h3>
               <p className="text-slate-600 leading-relaxed">
                 To equip students with practical technical skills, bridge the gap between academia and industry, and create a supportive community for peer learning.
               </p>
            </motion.div>
            
            {/* Vision (Dark Card for Contrast) */}
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="bg-brand-primary p-8 rounded-3xl shadow-2xl border-t-4 border-teal-400 text-white md:-translate-y-6 relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
               <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-teal-400 relative z-10">
                 <Lightbulb size={32} />
               </div> 
               <h3 className="text-2xl font-bold text-brand-dark mb-3 relative z-10">Our Vision</h3>
               <p className="text-slate-300 leading-relaxed relative z-10">
                 To be the leading student-run technology association in the region, producing world-class developers, designers, and tech leaders.
               </p>
            </motion.div>

            {/* Values */}
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="bg-white p-8 rounded-3xl shadow-xl border-t-4 border-brand-accent hover:-translate-y-2 transition-transform duration-300"
            >
               <div className="bg-teal-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-brand-accent">
                 <Heart size={32} />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Values</h3>
               <p className="text-slate-600 leading-relaxed">
                 Innovation, Collaboration, Integrity, and Excellence. We believe in lifting others as we climb and sharing knowledge freely.
               </p>
            </motion.div>
         </div>
      </section>

      {/* ================= HISTORY SECTION ================= */}
      <section className="py-20 container-custom">
        <Reveal>
           <div className="flex flex-col md:flex-row gap-16 items-center">
             
             {/* Image Side with Decoration */}
             <div className="w-full md:w-1/2 relative group">
                <div className="absolute inset-0 bg-brand-accent rounded-3xl rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-500"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                  alt="Students collaborating" 
                  className="relative rounded-3xl shadow-2xl w-full object-cover transform transition-transform duration-500 group-hover:-translate-y-2"
                />
             </div>

             {/* Text Side */}
             <div className="w-full md:w-1/2 space-y-8">
                <div>
                   <span className="text-brand-accent font-bold tracking-wider uppercase text-sm">Since 2024</span>
                   <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">From a Study Group to a Movement.</h2>
                   <div className="h-1 w-20 bg-brand-accent rounded-full"></div>
                </div>
                
                <p className="text-slate-600 text-lg leading-relaxed">
                  Founded to address the need for practical skills in the IT curriculum, DITA has grown from a small study group into a campus-wide movement. We organize hackathons, industry visits, and weekly coding sessions.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Whether you are a complete beginner or a seasoned pro, there is a place for you here. We are built by students, for students.
                </p>

                <button className="flex items-center gap-2 text-brand-accent font-bold hover:gap-4 transition-all">
                   Join the Movement <ArrowRight size={20} />
                </button>
             </div>
           </div>
        </Reveal>
      </section>

      {/* ================= FOOTER ================= */}
      <div className="bg-brand-primary mt-auto">
         <Footer compact={true} />
      </div>
    </div>
  );
};

export default About;