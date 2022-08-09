import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
const About = () => {
    document.title="About";
        return (
            <div className="bg-white border-gray-200 dark:bg-gray-900">
            <Navbar selected="about"/>
            <div className="sm:container sm:mx-auto p-4 max-w-md lg:grid lg:grid-cols-4 lg:gap-8 min-h-[100vh]" >
                <div className="text-gray-700 dark:text-white max-w-3xl w-full col-span-3 text-lg">
                    <h4 className="mb-3 text-5xl font-semibold">About Me</h4>
                    <div className="my-4">
                        <p className='my-3'>Hey! I am Adil Aziz, and I'm working for Sufi Engineering.</p>
                        <p className='my-3'>I am a software engineer with a passion for building web applications.</p>
                        <p className='my-3'>I write code and distribute it through GitHub because nothing is better than open source software. I am also open to teach, If you want learn any technology that I know about you can ping me anytime and I will love that. Moreover, if you know anyone who might benefit from one of my tools, please share it with them! Also, I would love to hear from you.</p>
                    </div>
                    <h3 className=' text-4xl font-semibold my-4'>Tools</h3>
                    <h4 className=' text-3xl font-semibold my-4'>Software</h4>
                    <ul className='list-disc list-inside'>
                        <li className=''>This website is hosted on <a className='hover:bg-blue-500 hover:text-white dark:hover:text-gray-700 text-blue-500' href='https://pages.cloudflare.com/'>Cloudflare Pages</a> and uses the <a href='https://reactjs.com' className='hover:bg-blue-500 hover:text-white dark:hover:text-gray-700 text-blue-500'>Reactjs</a></li>
                        <li className=''><b>Coding:</b> <a className='hover:bg-blue-500 hover:text-white dark:hover:text-gray-700 text-blue-500' href='https://code.visualstudio.com/' >Visual Studio Code</a></li>
                        <li className=''><b>Operating System:</b> <a className='hover:bg-blue-500 hover:text-white dark:hover:text-gray-700 text-blue-500' href='https://ubuntu.com/' >Ubuntu</a></li>
                        <li className=''><b>Music:</b> <a className='hover:bg-blue-500 hover:text-white dark:hover:text-gray-700 text-blue-500' href='https://spotify.com/' >Spotify</a></li>
                    </ul>

                    <h4 className=' text-3xl font-semibold my-4'>Hardware</h4>
                    <ul className='list-disc list-inside'>
                        <li className=''><b>PC</b>: <a className='hover:bg-blue-500 hover:text-white dark:hover:text-gray-700 text-blue-500' href='https://www.hp.com/us-en/shop/mdp/elitebook-840'>HP Elitebook 840</a> and a <a className='hover:bg-blue-500 hover:text-white dark:hover:text-gray-700 text-blue-500' href='https://www.apple.com/iphone-11/'>iPhone 11</a>.</li>
                        <li className=''>I have a <a className='hover:bg-blue-500 hover:text-white dark:hover:text-gray-700 text-blue-500' href='https://www.apple.com/watch/'>Apple Watch</a> and a <a className='hover:bg-blue-500 hover:text-white dark:hover:text-gray-700 text-blue-500' href='https://www.apple.com/ipad/'>iPad</a>.</li>
                    </ul>
                </div>
                <div className="max-w-3xl w-full col-span-1">
                    <div className="my-4 bg-slate-300  dark:bg-slate-800 p-4 max-w-3xl rounded-xl w-full">
                        <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">ABOUT ME</h4>

                        <div className="text-gray-700 dark:text-white">
                            <p>Hello and thanks for visiting! My name is Adil Aziz, and this is my website and digital garden. 🌱</p>
                            <p>I'm a software developer who writes articles and tutorials about things that interest me. This site is and has always been free of ads, trackers, social media, affiliates, and sponsored posts.</p> 

                            <p>I hope you enjoy the post and have a nice day.</p>
                        </div>
                    </div>
                    <div className="bg-slate-300  dark:bg-slate-800 p-4 max-w-3xl rounded-xl w-full">
                        <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">DETAILS</h4>

                        <div className="text-gray-700 dark:text-white">
                            <p>I am a software engineer with a passion for building web applications.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        );
}

export default About;