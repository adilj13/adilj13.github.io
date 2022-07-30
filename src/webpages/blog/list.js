import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import parse from 'html-react-parser';

const BlogList = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch("https://public-api.wordpress.com/rest/v1.1/sites/adilj13.wordpress.com/posts/")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setBlogs(data.posts);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
      }, [])
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return (
            <div className="bg-white border-gray-200 dark:bg-gray-900">
                <Navbar selected="blog" />
                <div className="columns-3 h-screen">
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
    } else {
        return (
            <div className='bg-white border-gray-200 dark:bg-gray-900 '>
                <Navbar selected="blog"/>
                <div className='container mx-auto p-4 h-screen'>
                    <div className='columns-1 md:columns-3'>
                        {blogs.map(blog => (
                        <div key={(blog.slug).toString()}>
                            <Link to={`${blog.slug}`}>
                                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                    <img className="w-full aspect-video" src={ blog.featured_image } alt="" />
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{parse(blog.title)}</div>
                                        <div className="text-base text-gray-700 dark:text-gray-400">
                                            {parse(blog.excerpt)}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        ))}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default BlogList;