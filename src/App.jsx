import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './hooks/ScrollToTop'; // We will create this small helper

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Events from './pages/Events';
import Leadership from './pages/Leadership';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* This ensures every page starts at the top */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/events" element={<Events />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;