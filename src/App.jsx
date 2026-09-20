import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './hooks/ScrollToTop';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Events from './pages/Events';
import HackFest26 from './pages/HackFest26';
import Leadership from './pages/Leadership';
import Contact from './pages/Contact';
import Election from './pages/Election';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/hack-fest-26" element={<HackFest26 />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/elections" element={<Election />} />
      </Routes>
    </Router>
  );
}

export default App;
