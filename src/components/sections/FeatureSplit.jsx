import { CheckCircle2, ArrowRight } from 'lucide-react'; // Added ArrowRight for style
import { Link } from 'react-router-dom'; // <--- IMPORT THIS

// Add 'link' to the props list below
const FeatureSplit = ({ category, title, description, points, image, isReversed, link }) => {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container-custom">
        <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Image Side (No changes needed here) */}
          <div className="w-full lg:w-1/2 relative">
             {/* ... image code ... */}
             <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 transform hover:scale-[1.02] transition-transform duration-500">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-auto rounded-xl bg-slate-50"
                  onError={(e) => { e.target.src = 'https://placehold.co/600x400/e2e8f0/1e293b?text=Feature+Illustration'; }}
                />
             </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 space-y-6">
            <span className="text-brand-accent font-bold tracking-wider uppercase text-sm">
              {category}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              {title}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              {description}
            </p>

            <ul className="space-y-4 pt-4">
              {points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <CheckCircle2 className="text-brand-accent w-6 h-6 fill-brand-accent/10" />
                  </div>
                  <span className="text-slate-700 font-medium">{point}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6">
              {/* REPLACE BUTTON WITH LINK */}
              <Link 
                to={link} 
                className="btn-primary inline-flex items-center gap-2"
              >
                Learn more <ArrowRight size={18} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeatureSplit;