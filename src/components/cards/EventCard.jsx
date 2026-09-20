import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventCard = ({ title, date, time, location, image, category, link, onRegister }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-slate-900">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-brand-deep text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          {category}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Date Highlight */}
        <p className="text-brand-blue font-semibold text-sm mb-2">
          {date}
        </p>

        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-blue transition-colors">
          {link ? (
            <Link to={link} className="hover:underline">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>

        {/* Details */}
        <div className="space-y-2 mb-6 text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-brand-blue shrink-0" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-brand-blue shrink-0" />
            <span>{location}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto pt-2 flex gap-2">
          {link ? (
            <Link
              to={link}
              className="flex-1 py-2.5 px-4 flex items-center justify-center gap-1.5 bg-brand-blueSoft text-brand-deep rounded-xl text-xs sm:text-sm font-semibold hover:bg-brand-blue hover:text-white transition-colors"
            >
              <span>Details</span>
              <ArrowRight size={14} />
            </Link>
          ) : null}
          <button 
            type="button"
            onClick={() => onRegister(title)}
            className="flex-1 py-2.5 px-4 flex items-center justify-center gap-1.5 border border-slate-200 rounded-xl text-slate-700 text-xs sm:text-sm font-semibold hover:border-brand-blue hover:text-brand-blue transition-colors cursor-pointer"
          >
            <span>Register</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
