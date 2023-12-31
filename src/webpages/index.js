import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from './home';
import BlogList from './blog/list';
import BlogDetails from './blog/details';
import Projects from './projects';
import Contact from './contact';

const Webpages = () => {
    return(
        <Router>
            <Routes>
                <Route exact path="/" element= {<Home/>} />
                <Route path = "/blog/" element = {<BlogList/>} />
                <Route path = "/blog/:slug" element = {<BlogDetails/>} />
                <Route path = "/projects" element = {<Projects/>} />
                <Route path = "/contact" element = {<Contact/>} />
            </Routes>
        </Router>
    );
};

export default Webpages;