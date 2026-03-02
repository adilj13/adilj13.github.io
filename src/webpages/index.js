import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from './home';
import About from './about';
import BlogDetails from './blog/details';
import Work from './work';
import Writing from './writing';
import Philosophy from './philosophy';
import Uses from './uses';
import Contact from './contact';

function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const Webpages = () => {
  return (
    <Router>
      <ScrollToTopOnNavigate />
      <AnimatePresence mode="wait">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/uses" element={<Uses />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default Webpages;