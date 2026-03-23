import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/animations';
import { Vote, ShieldCheck, UserCheck } from 'lucide-react';

const ElectionHero = () => {
  return (
    <section className="relative bg-brand-dark pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark/95 to-brand-primary/40 opacity-90"></div>
        <img 
          src="https://images.unsplash.com/photo-1540910419892-f39a64f1521a?auto=format&fit=crop&q=80&w=2000" 
          alt="Election Background" 
          className="w-full h-full object-cover"
          onError={(e) => e.target.style.display = 'none'}
        />
      </div>

      <div className="container-custom relative z-10 text-center flex flex-col items-center">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            variants={fadeIn("down", 0.2)} 
            initial="hidden" 
            animate="show"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/20 border border-brand-accent/30 backdrop-blur-md text-brand-accent text-xs font-bold uppercase tracking-widest mb-6"
          >
            <ShieldCheck size={16} />
            Secure Voting Portal
          </motion.div>

          <motion.h1 
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Your Voice, <br/>
            <span className="text-transparent bg-clip-text bg-brand-accent">
              Your Choice.
            </span>
          </motion.h1>
          
          <motion.p 
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto"
          >
            Participate in the upcoming DITA Association General Elections. Our secure system ensures integrity, anonymity, and fairness through institutional email verification.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4">
             <div className="flex items-center gap-2 text-slate-300 bg-white/5 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm">
                <UserCheck size={18} className="text-brand-accent" />
                <span className="text-sm font-medium">Verification Required</span>
             </div>
             <div className="flex items-center gap-2 text-slate-300 bg-white/5 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm">
                <ShieldCheck size={18} className="text-brand-accent" />
                <span className="text-sm font-medium">End-to-End Encryption</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElectionHero;
