import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/animations';
import Reveal from '../components/common/Reveal';
import GreenCTA from '../components/sections/GreenCTA';

const Contact = () => {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-brand-dark pt-32 pb-64 overflow-hidden">
         {/* Background Image */}
         <div className="absolute inset-0 z-0">
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10 }}
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" 
              alt="Contact Background" 
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
               <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
               24/7 Support
            </motion.div>

            <motion.h1 
               variants={fadeIn("up", 0.3)}
               initial="hidden"
               animate="show"
               className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
               Let's Start a <br/>
               <span className="text-transparent bg-clip-text bg-brand-accent">
                  Conversation.
               </span>
            </motion.h1>
            
            <motion.p 
               variants={fadeIn("up", 0.4)}
               initial="hidden"
               animate="show"
               className="text-slate-300 text-lg max-w-2xl mx-auto"
            >
               Have a question about membership, partnerships, or just want to say hi? We'd love to hear from you.
            </motion.p>
         </div>
      </section>

      {/* ================= FLOATING CONTACT CARD ================= */}
      <section className="relative z-20 -mt-40 pb-20 container-custom">
        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5, duration: 0.8 }}
           className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[600px]"
        >
           
           {/* LEFT SIDE: Contact Info (Dark Navy) */}
           <div className="lg:w-2/5 bg-brand-primary text-white p-10 md:p-14 relative overflow-hidden flex flex-col justify-between">
              {/* Decorative Circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10">
                 <h3 className="text-2xl text-brand-dark font-bold mb-8">Contact Information</h3>
                 
                 <div className="space-y-8">
                    <div className="flex items-start gap-4 group">
                       <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-brand-accent transition-colors duration-300">
                          <Mail className="text-brand-dark group-hover:text-white transition-colors" size={20} />
                       </div>
                       <div>
                          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Email</p>
                          <p className="text-lg font-semibold">dita@daystar.ac.ke</p>
                       </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                       <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-brand-accent transition-colors duration-300">
                          <Phone className="text-brand-dark group-hover:text-white transition-colors" size={20} />
                       </div>
                       <div>
                          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Phone</p>
                          <p className="text-lg font-semibold">+254 700 123 456</p>
                          <p className="text-sm text-slate-400">Mon-Fri from 8am to 5pm</p>
                       </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                       <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-brand-accent transition-colors duration-300">
                          <MapPin className="text-brand-dark group-hover:text-white transition-colors" size={20} />
                       </div>
                       <div>
                          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Office</p>
                          <p className="text-lg font-semibold">Daystar University</p>
                          <p className="text-sm text-slate-400">Athi River Campus, ICT Building</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Social Links or Extra Info */}
              <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
                 <div className="flex items-center gap-2 text-brand-accent">
                    <Clock size={18} />
                    <span className="text-sm font-medium">Response time: Within 24 hours</span>
                 </div>
              </div>
           </div>

           {/* RIGHT SIDE: Form (White) */}
           <div className="lg:w-3/5 p-10 md:p-14 bg-white">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Send a Message</h2>
              <p className="text-slate-500 mb-8">Fill out the form below and our team will get back to you.</p>

              <form className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-bold text-slate-700 mb-2 group-focus-within:text-brand-accent transition-colors">First Name</label>
                      <input type="text" className="w-full px-4 py-3 bg-slate-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-brand-accent outline-none transition-all font-medium text-slate-900" placeholder="John" />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-bold text-slate-700 mb-2 group-focus-within:text-brand-accent transition-colors">Last Name</label>
                      <input type="text" className="w-full px-4 py-3 bg-slate-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-brand-accent outline-none transition-all font-medium text-slate-900" placeholder="Doe" />
                    </div>
                 </div>
                 
                 <div className="group">
                    <label className="block text-sm font-bold text-slate-700 mb-2 group-focus-within:text-brand-accent transition-colors">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 bg-slate-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-brand-accent outline-none transition-all font-medium text-slate-900" placeholder="john@student.daystar.ac.ke" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                        <label className="block text-sm font-bold text-slate-700 mb-2 group-focus-within:text-brand-accent transition-colors">Subject</label>
                        <div className="relative">
                            <select className="w-full px-4 py-3 bg-slate-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-brand-accent outline-none transition-all font-medium text-slate-600 appearance-none cursor-pointer">
                                <option>General Inquiry</option>
                                <option>Membership Issue</option>
                                <option>Partnership Proposal</option>
                                <option>Event Registration</option>
                            </select>
                            {/* Custom arrow for select */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                        </div>
                    </div>
                    <div className="group">
                       <label className="block text-sm font-bold text-slate-700 mb-2 group-focus-within:text-brand-accent transition-colors">Phone (Optional)</label>
                       <input type="tel" className="w-full px-4 py-3 bg-slate-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-brand-accent outline-none transition-all font-medium text-slate-900" placeholder="+254..." />
                    </div>
                 </div>

                 <div className="group">
                    <label className="block text-sm font-bold text-slate-700 mb-2 group-focus-within:text-brand-accent transition-colors">Message</label>
                    <textarea rows="4" className="w-full px-4 py-3 bg-slate-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-brand-accent outline-none transition-all font-medium text-slate-900 resize-none" placeholder="How can we help you?"></textarea>
                 </div>

                 <button type="button" className="w-full bg-brand-dark text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-accent hover:-translate-y-1 hover:shadow-lg transition-all flex items-center justify-center gap-2 group">
                    Send Message 
                    <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </form>
           </div>
        </motion.div>
      </section>

      {/* ================= MAP SECTION (Live Google Map) ================= */}
      <section className="h-96 w-full relative bg-slate-800 overflow-hidden">
         {/* CSS TRICK EXPLAINED:
            1. grayscale: Removes colors (makes it black & white)
            2. invert: Flips white to black (creates dark mode)
            3. contrast-125: Makes the roads pop out more
            4. opacity-90: Blends it slightly with the dark background
         */}
         <iframe 
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.4685328227924!2d37.04543167496603!3d-1.4419999985444646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f76c760455555%3A0x6d4f6c4430155555!2sDaystar%20University%20-%20Athi%20River%20Campus!5e0!3m2!1sen!2ske!4v1708520000000!5m2!1sen!2ske"
           width="100%" 
           height="100%" 
           style={{ border: 0 }} 
           allowFullScreen="" 
           loading="lazy" 
           referrerPolicy="no-referrer-when-downgrade"
           className="w-full h-full grayscale invert contrast-[1.1] opacity-80 hover:grayscale-0 hover:invert-0 hover:opacity-100 transition-all duration-700"
         ></iframe>

         {/* Overlay Marker (Optional - sits on top of the map) */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="bg-brand-accent text-white px-5 py-2 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
                <MapPin size={20} />
                <span className="font-bold text-sm">DITA HQ</span>
            </div>
         </div>
      </section>

      {/* ================= FOOTER WITH CTA ================= */}
      {/* 1. mt-40: Adds spacing so the CTA doesn't cover the Map */}
      <div className="relative mt-20">
         <div className="bg-brand-primary pt-32 pb-10 relative">
            
            {/* 2. Position the CTA to float on the top edge */}
            <div className="absolute top-0 left-0 w-full -translate-y-1/2 px-4 z-10">
               <GreenCTA />
            </div>

            {/* 3. Use standard Footer (Remove 'compact={true}') */}
            {/* The standard footer has extra top padding built-in to handle this overlap */}
            <Footer />
         </div>
      </div>
    </div>
  );
};

export default Contact;