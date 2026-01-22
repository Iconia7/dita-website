import { Facebook, Twitter, Linkedin, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'; // <--- Import the logo here

const Footer = ({ compact }) => {
  return (
    <footer className={`${compact ? 'pt-16' : 'pt-32'} pb-10`}>
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column with Logo */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
               {/* Replaced the placeholder "D" box with your Logo Image */}
               <img 
                 src={logo} 
                 alt="DITA Logo" 
                 className="h-12 w-auto object-contain brightness-0 invert" 
                 // 'brightness-0 invert' makes a black logo white. 
                 // Remove that class if your logo is already colored/white!
               />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Empowering Daystar University students to innovate, collaborate, and lead in the technology sector.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all"><Facebook size={16} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all"><Twitter size={16} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all"><Linkedin size={16} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-brand-dark transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-dark transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-brand-dark transition-colors">Services</Link></li>
              <li><Link to="/events" className="hover:text-brand-dark transition-colors">Events</Link></li>
            </ul>
          </div>

          {/* Resources */}
          {/* Resources */}
          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a 
                  href="https://student.daystar.ac.ke" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-brand-dark transition-colors"
                >
                  Student Portal
                </a>
              </li>
              <li>
                <a 
                  href="https://elearning.daystar.ac.ke" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-brand-dark transition-colors"
                >
                  E-Learning
                </a>
              </li>
              <li>
                {/* These are likely internal pages or files you haven't built yet, so keep them as # for now */}
                <a href="#" className="hover:text-brand-dark transition-colors">Past Projects</a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-dark transition-colors">Constitution</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-3">
                <Mail size={18} className="text-slate-400 min-w-[18px]" />
                <span>dita@daystar.ac.ke</span>
              </li>
              <li className="flex gap-3">
                <MapPin size={18} className="text-slate-400 min-w-[18px]" />
                <span>Athi River Campus,<br/>School of Science, Engineering and Health</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Daystar Information Technology Association. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;