import { MapPin, Clock, ArrowRight } from 'lucide-react';

// Added 'onRegister' prop here
const EventCard = ({ title, date, time, location, image, category, onRegister }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-brand-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          {category}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Date Highlight */}
        <p className="text-brand-accent font-semibold text-sm mb-2">
          {date}
        </p>

        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-accent transition-colors">
          {title}
        </h3>

        {/* Details */}
        <div className="space-y-2 mb-6 text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{location}</span>
          </div>
        </div>

        {/* Push button to bottom */}
        <div className="mt-auto">
          <button 
            onClick={() => onRegister(title)} // <--- TRIGGER MODAL HERE
            className="w-full py-2 flex items-center justify-center gap-2 border border-slate-200 rounded-lg text-slate-600 font-medium group-hover:border-brand-accent group-hover:text-brand-accent transition-all cursor-pointer"
          >
            Register Now <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;