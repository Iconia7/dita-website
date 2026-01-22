import { Smartphone } from 'lucide-react';

const GreenCTA = () => {
  return (
    // Removed "mb-[-80px]" - we handle positioning in the parent now
    <section className="container-custom relative z-10"> 
      <div className="bg-brand-dark rounded-3xl p-5 md:p-12 shadow-2xl shadow-brand-accent/30 overflow-hidden relative">
        
        {/* Background Pattern Overlay */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <div className="bg-white/20 p-2 rounded-lg">
                    <Smartphone className="text-white w-6 h-6" />
                </div>
                <span className="text-teal-50 font-bold uppercase tracking-wider text-sm">Official Mobile App</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get your Digital ID.
            </h2>
            <p className="text-teal-50 text-lg mb-0 max-w-md">
              Download the DITA app to register as a member, access your digital membership card, and get notified about upcoming hackathons.
            </p>
          </div>
          
          <div className="flex justify-start lg:justify-end">
             <a 
  href="https://play.google.com/store/apps/details?id=com.dita.mobile" /* <--- PASTE YOUR LINK HERE */
  target="_blank" 
  rel="noopener noreferrer"
  className="bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-900 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3 border border-white/10 group cursor-pointer"
>
  <svg className="w-8 h-8 text-teal-400 group-hover:text-brand-light transition-colors" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.3,12.5L17.38,15.69L15.12,13.42L16.84,11.7C17.06,11.5 17.06,11.12 16.84,10.9L20.3,12.5M16.81,8.88L14.54,11.15L6.05,2.66L16.81,8.88Z" />
  </svg>
  <div className="text-left flex flex-col">
    <span className="text-[10px] uppercase tracking-wider font-medium opacity-80 leading-none mb-1">Get it on</span>
    <span className="text-xl font-bold font-sans leading-none">Google Play</span>
  </div>
</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GreenCTA;