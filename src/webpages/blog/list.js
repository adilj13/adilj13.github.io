import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBookOpen, FiArrowRight } from 'react-icons/fi';
import parse from 'html-react-parser';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import ScrollToTop from '../components/ScrollToTop';
import PageTransition from '../components/PageTransition';
import SEO from '../../components/SEO';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const SkeletonCard = () => (
  <div className="glass-card p-0 overflow-hidden animate-pulse">
    <div className="aspect-video bg-gray-200 dark:bg-gray-800" />
    <div className="p-6 space-y-3">
      <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4" />
      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-lg w-full" />
      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-lg w-5/6" />
      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-lg w-2/3" />
    </div>
  </div>
);

const BlogList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(
      'https://public-api.wordpress.com/rest/v1.1/sites/adilj13.wordpress.com/posts/?order_by=date&order=DESC&fields=title,slug,excerpt,featured_image'
    )
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setBlogs(data.posts);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  return (
    <div className="min-h-screen">
      <SEO
        title="Blog - Adil Aziz"
        description="Articles and thoughts by Adil Aziz on mechanical engineering, software development, CNC machining, open source, and technology."
        path="/blog"
      />
      <Navbar />
      <ScrollToTop />
      <PageTransition>

        {/* Hero */}
        <section className="pt-28 pb-16 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-3xl"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-500/10">
                  <FiBookOpen className="w-6 h-6 text-primary-500" />
                </div>
                <span className="tag">Blog</span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
                My <span className="gradient-text">Writings</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Articles, tutorials, and thoughts on software development, engineering, and technology.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {error ? (
              <div className="glass-card p-8 text-center">
                <p className="text-red-500 text-lg">Error loading posts: {error.message}</p>
                <p className="text-gray-500 mt-2">Please try again later.</p>
              </div>
            ) : !isLoaded ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {blogs.map((blog, i) => (
                  <motion.div key={blog.slug} variants={fadeUp} custom={i}>
                    <Link to={`${blog.slug}`} className="group block">
                      <div className="glass-card overflow-hidden h-full hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300">
                        {blog.featured_image && (
                          <div className="relative overflow-hidden aspect-video">
                            <img
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              src={blog.featured_image}
                              alt={parse(blog.title)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
                            {parse(blog.title)}
                          </h3>
                          <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
                            {parse(blog.excerpt)}
                          </div>
                          <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Read more <FiArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

      </PageTransition>
      <Footer />
    </div>
  );
};

export default BlogList;