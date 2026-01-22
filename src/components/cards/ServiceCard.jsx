const ServiceCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-accent/30 transition-all duration-300 group">
      <div className="bg-brand-light w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-accent transition-colors">
        <Icon className="text-brand-accent w-8 h-8 group-hover:text-white transition-colors" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
export default ServiceCard;