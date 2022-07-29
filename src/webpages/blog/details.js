import React, { useState, useEffect} from "react";
import { useParams } from 'react-router-dom'
import Navbar from '../components/navbar';
import Footer from "../components/footer";
import parse from 'html-react-parser';
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
            <div>
                <Navbar />
                <div className="sm:container sm:mx-auto p-4 max-w-xs" style={{maxWidth:"700px"}}>
                    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                        <div className="animate-pulse flex space-x-4">
                            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                            <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 bg-slate-700 rounded"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-slate-700 rounded"></div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }  
    
    if (blog) {
        return (
            
            <div>
                <Navbar />
                <div className="sm:container sm:mx-auto p-4 max-w-xs" style={{maxWidth:"700px"}}>
                    <div className="relative overflow-hidden shadow-lg">
                        <img className="object-cover blur-md w-full" src={blog.featured_image} alt="Featured Image"/>

                        <div className="absolute bottom-0 left-0 px-6 py-4">
                            <h4 className="mb-3 text-3xl font-semibold tracking-tight text-white">{parse(blog.title)}</h4>
                            <div className="leading-normal text-gray-100">{parse(blog.excerpt)}</div>
                        </div>
                    </div>
                    <p className="my-5 italic">Published On: {blog.date}</p>
                    <hr/>
                    <div className="blogContent">
                        {parse(blog.content)}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default BlogDetails;