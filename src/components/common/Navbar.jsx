import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png'; // <--- MAKE SURE THIS PATH MATCHES YOUR FILE

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Events', path: '/events' },
    { name: 'Leadership', path: '/leadership' },
  ];
 
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-brand-dark/95 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container-custom flex justify-between items-center">
        
        {/* LOGO AREA - UPDATED */}
        <Link to="/" className="flex items-center gap-2">
           <img 
             src={logo} 
             alt="DITA Logo" 
             className="h-12 w-auto object-contain" // Adjust h-12 to make it bigger/smaller
           />
           {/* Optional: Keep text next to logo if you want, otherwise delete this span */}
           {/* <span className="text-2xl font-bold text-white hidden sm:block">DITA</span> */}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-white hover:text-brand-accent font-small transition-colors text-sm tracking-wide"
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact" className="btn-primary text-sm">
            Join Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-dark border-t border-gray-800">
          <div className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-gray-300 hover:text-brand-accent"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
             <Link to="/contact" className="btn-primary text-center" onClick={() => setIsOpen(false)}>
              Join Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;