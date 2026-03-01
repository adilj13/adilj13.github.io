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
import BlogList from './blog/list';
import BlogDetails from './blog/details';
import Projects from './projects';
import Resume from './resume';
import Uses from './uses';
import Portfolio from './portfolio';
import Publications from './publications';
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
          <Route path="/blog/" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/uses" element={<Uses />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default Webpages;