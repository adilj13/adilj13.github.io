import React, { useState, useEffect} from "react";
import { useParams } from 'react-router-dom'
import Navbar from '../components/navbar';
import Footer from "../components/footer";
import parse from 'html-react-parser';
import Moment from 'moment';
import '../../Blog.css';

function BlogDetails () {
    const { slug } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [blog, setBlog] = useState([]);
    
    useEffect(() => {
        fetch("https://public-api.wordpress.com/rest/v1.1/sites/adilj13.wordpress.com/posts/slug:" + slug)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data);
                    setBlog(data);
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
        return (
            <div className="bg-white border-gray-200 dark:bg-gray-900">
                <Navbar selected="blog"/>
                <div className="sm:container sm:mx-auto p-4 max-w-xs grid grid-cols-4 min-h-[100vh]" >
                    <div className="max-w-3xl w-full col-span-3">
                    <div role="status" className="max-w-sm animate-pulse">
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div className="max-w-3xl w-full col-span-1">
                        <div role="status" className="max-w-sm animate-pulse">
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div role="status" className="max-w-sm animate-pulse">
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }  
    
    if (blog) {
        Moment.locale('en');

        return (
            
            <div className="bg-white border-gray-200 dark:bg-gray-900">
                <Navbar selected="blog"/>
                <div className="sm:container mx-auto p-4 max-w-md lg:grid lg:grid-cols-4 lg:gap-8 min-h-[100vh]" >
                    <div className="lg:col-span-3">
                        <h4 className="mb-3 text-5xl font-semibold tracking-tight text-white">{parse(blog.title)}</h4>
                        <hr/>
                        <div className="blogContent text-gray-700 dark:text-white">
                            {parse(blog.content)}
                        </div>
                        <hr/>
                        <p className="my-5 italic text-gray-900 dark:text-white">Published On: {blog.date}</p>
                    </div>
                    <div className="lg:col-span-1">
                        <div className="my-4 bg-slate-300  dark:bg-slate-800 p-4 max-w-3xl rounded-xl w-full">
                            <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">ABOUT ME</h4>

                            <div className="text-gray-700 dark:text-white">
                                <p className="mb-3">Hello and thanks for visiting! My name is Adil Aziz, and this is my website and digital garden. 🌱</p>
                                <p className="mb-3">I'm a software developer who writes articles and tutorials about things that interest me. This site is and has always been free of ads, trackers, social media, affiliates, and sponsored posts.</p> 

                                <p className="mb-3">I hope you enjoy the post and have a nice day.</p>
                            </div>
                        </div>
                        <div className="bg-slate-300  dark:bg-slate-800 p-4 max-w-3xl rounded-xl w-full">
                            <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">DETAILS</h4>

                            <div className="text-gray-700 dark:text-white">
                                <p className="mb-3">Published: {Moment(blog.date).format('MMMM DD, yyyy')}</p>
                                <p className="mb-3">Modified: {Moment(blog.modified).format('MMMM DD, yyyy')}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default BlogDetails;