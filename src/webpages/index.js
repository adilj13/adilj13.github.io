import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from './home';
import About from './about';
import BlogList from './blog/list';
import BlogDetails from './blog/details';
import Projects from './projects';
import Resume from './resume';
import Uses from './uses';
import Contact from './contact';

const Webpages = () => {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog/" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/uses" element={<Uses />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default Webpages;