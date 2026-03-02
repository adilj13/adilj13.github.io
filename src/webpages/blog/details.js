import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiEdit3, FiArrowLeft, FiShare2 } from 'react-icons/fi';
import parse from 'html-react-parser';
import Moment from 'moment';
import '../../Blog.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import ScrollToTop from '../components/ScrollToTop';
import PageTransition from '../components/PageTransition';
import SEO from '../../components/SEO';

const SkeletonDetail = () => (
  <div className="animate-pulse max-w-4xl mx-auto">
    <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-xl w-3/4 mb-4" />
    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-1/3 mb-8" />
    <div className="space-y-3">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg" style={{ width: `${85 + Math.random() * 15}%` }} />
      ))}
    </div>
  </div>
);

function BlogDetails() {
  const { slug } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch('https://public-api.wordpress.com/rest/v1.1/sites/adilj13.wordpress.com/posts/slug:' + slug)
      .then((res) => res.json())
      .then(
        (data) => {
          setBlog(data);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-20 max-w-6xl mx-auto px-4">
          <div className="glass-card p-8 text-center">
            <p className="text-red-500 text-lg">Error: {error.message}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <ScrollToTop />
      <PageTransition>
        <div className="pt-28 pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {!isLoaded ? (
              <SkeletonDetail />
            ) : blog ? (
              <>
                <SEO
                  title={`${blog.title.replace(/<[^>]+>/g, '')} — Adil Aziz`}
                  description={blog.excerpt ? blog.excerpt.replace(/<[^>]+>/g, '').substring(0, 160) : ''}
                  path={`/blog/${slug}`}
                  type="article"
                  image={blog.featured_image || 'https://github.com/adilj13.png'}
                  article={{
                    publishedTime: blog.date,
                    modifiedTime: blog.modified,
                    author: 'Adil Aziz',
                  }}
                />

                <div className="grid lg:grid-cols-4 lg:gap-10">
                  {/* Main content */}
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="lg:col-span-3"
                  >
                    {/* Back link */}
                    <Link
                      to="/writing"
                      className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors mb-6"
                    >
                      <FiArrowLeft className="w-4 h-4" /> Back to writing
                    </Link>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
                      {parse(blog.title)}
                    </h1>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-200/50 dark:border-gray-800/50">
                      <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                        <FiCalendar className="w-4 h-4" />
                        {Moment(blog.date).format('MMMM DD, YYYY')}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                        <FiEdit3 className="w-4 h-4" />
                        Updated {Moment(blog.modified).format('MMMM DD, YYYY')}
                      </span>
                      <button
                        onClick={handleShare}
                        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors ml-auto"
                      >
                        <FiShare2 className="w-4 h-4" /> Share
                      </button>
                    </div>

                    {/* Featured image */}
                    {blog.featured_image && (
                      <div className="mb-8 rounded-2xl overflow-hidden">
                        <img
                          src={blog.featured_image}
                          alt={parse(blog.title)}
                          className="w-full object-cover"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="blogContent text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                      {parse(blog.content)}
                    </div>
                  </motion.article>

                  {/* Sidebar */}
                  <motion.aside
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="lg:col-span-1 space-y-6 mt-8 lg:mt-0"
                  >
                    {/* About card */}
                    <div className="glass-card p-6 sticky top-24">
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                        About the Author
                      </h4>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
                          AA
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-900 dark:text-white">Adil Aziz</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Software Engineer</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        I'm a software developer who writes articles and tutorials about things that interest me.
                        This site is free of ads, trackers, and sponsored posts. 🌱
                      </p>
                    </div>

                    {/* Details card */}
                    <div className="glass-card p-6">
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                        Post Details
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <FiCalendar className="w-4 h-4 text-primary-500 shrink-0" />
                          <span>Published: {Moment(blog.date).format('MMMM DD, YYYY')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <FiEdit3 className="w-4 h-4 text-primary-500 shrink-0" />
                          <span>Modified: {Moment(blog.modified).format('MMMM DD, YYYY')}</span>
                        </div>
                      </div>
                    </div>
                  </motion.aside>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </PageTransition>
      <Footer />
    </div>
  );
}

export default BlogDetails;