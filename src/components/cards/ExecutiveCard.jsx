import { Linkedin, Github } from 'lucide-react';

const ExecutiveCard = ({ name, role, image, linkedin, github }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100">
      
      {/* Image Container with Gradient Overlay on Hover */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-200">
        <img 
          src={image} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay that appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
            <a href={linkedin} className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-brand-accent hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href={github} className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-brand-accent hover:text-white transition-colors">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 text-center bg-white relative z-10">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-accent transition-colors">
          {name}
        </h3>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mt-1">
          {role}
        </p>
      </div>
    </div>
  );
};

export default ExecutiveCard;