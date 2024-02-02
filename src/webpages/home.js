import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
const Home = () => {
        return (
          <div>
            <Navbar selected="home" />
              <section className="bg-slate-100 dark:bg-gray-900 min-h-[100vh]">
                  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
                      
                      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Hi, I'm Adil</h1>
                      <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Since 2020, I am working at <a target='_blank' rel='noreferrer' href='https://sufi.engineering' className='text-blue-500 hover:underline'>Sufi Engineering</a>, a ricetech company, as a Director. Apart from that I am involved in various <Link to="/projects" className='text-blue-500 hover:underline'>projects</Link>. Before joining Sufi Engineering, I have worked with Pakistan Air Force at Air HQ.</p>
                      <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">I have BS Software Engineering from University of the Punjab and MS Software Engineering from NUST. See my research profile at <a target='_blank' rel='noreferrer' href='https://scholar.google.com/citations?user=MxLBLrYAAAAJ' className='text-blue-500 hover:underline'>Google Scholar</a>.</p>
                  </div>
              </section>
            <Footer />
          </div>
        );
}

export default Home;