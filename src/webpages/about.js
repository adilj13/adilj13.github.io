import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
const About = () => {
    
        return (
            <div className="bg-white border-gray-200 dark:bg-gray-900">
            <Navbar selected="about"/>
            <div className="sm:container sm:mx-auto p-4 max-w-xs grid grid-cols-4" >
                <div className="max-w-3xl w-full col-span-3">
                    <h4 className="mb-3 text-5xl font-semibold tracking-tight text-white">About Me</h4>
                    <hr/>
                    <div className="blogContent text-gray-700 dark:text-white">
                    </div>
                    <hr/>
                    <p className="my-5 italic text-gray-900 dark:text-white">Published On: </p>
                </div>
                <div className="max-w-3xl w-full col-span-1">
                    <div className="my-4 bg-slate-300  dark:bg-slate-800 p-4 max-w-3xl rounded-xl w-full">
                        <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">ABOUT ME</h4>

                        <div className="blogContent text-gray-700 dark:text-white">
                            <p>Hello and thanks for visiting! My name is Adil Aziz, and this is my website and digital garden. 🌱</p>
                            <p>I'm a software developer who writes articles and tutorials about things that interest me. This site is and has always been free of ads, trackers, social media, affiliates, and sponsored posts.</p> 

                            <p>I hope you enjoy the post and have a nice day.</p>
                        </div>
                    </div>
                    <div className="bg-slate-300  dark:bg-slate-800 p-4 max-w-3xl rounded-xl w-full">
                        <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">DETAILS</h4>

                        <div className="blogContent text-gray-700 dark:text-white">
                            <p>Published: </p>
                            <p>Modified: </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        );
}

export default About;