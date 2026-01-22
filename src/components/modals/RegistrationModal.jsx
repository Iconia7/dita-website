import { useState } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RegistrationModal = ({ isOpen, onClose, eventTitle }) => {
  const [step, setStep] = useState('form'); // 'form' or 'success'
  const [loading, setLoading] = useState(false);

  // Reset state when modal opens
  if (!isOpen && step !== 'form') {
      setTimeout(() => setStep('form'), 500); 
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          
          {/* Backdrop (Darken background) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors z-10"
            >
              <X size={20} className="text-slate-600" />
            </button>

            {/* Content Switcher */}
            <div className="p-8">
              {step === 'form' ? (
                <>
                  <div className="mb-6">
                    <span className="text-brand-accent text-xs font-bold uppercase tracking-wider">Event Registration</span>
                    <h2 className="text-2xl font-bold text-slate-900 mt-1">{eventTitle}</h2>
                    <p className="text-slate-500 text-sm mt-2">Fill in your details to secure your spot.</p>
                  </div>

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    setLoading(true);
                    // Simulate API call delay
                    setTimeout(() => {
                        setLoading(false);
                        setStep('success');
                    }, 1500);
                  }} className="space-y-4">
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                      <input required type="text" placeholder="John Doe" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Student Email</label>
                      <input required type="email" placeholder="john@student.daystar.ac.ke" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Student ID</label>
                        <input required type="text" placeholder="22-1234" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                        <input required type="tel" placeholder="0712..." className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all" />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full btn-primary mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : 'Confirm Registration'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="text-green-600 w-8 h-8" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">You're In!</h3>
                  <p className="text-slate-500 mb-6">
                    Registration successful for <span className="font-semibold text-slate-900">{eventTitle}</span>. <br/>
                    We've sent a confirmation email with details.
                  </p>
                  <button onClick={onClose} className="btn-outline border-slate-200 text-slate-700 hover:bg-slate-50 w-full">
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;