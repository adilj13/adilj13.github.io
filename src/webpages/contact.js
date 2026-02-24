import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiTwitter, FiMapPin, FiMail, FiSend, FiGithub, FiLinkedin, FiMessageSquare, FiInstagram } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import SEO from '../components/SEO';

const contactMethods = [
  {
    icon: FiTwitter,
    title: 'Chat on X',
    description: 'Primary option to contact me. Inbox me on my X profile.',
    link: 'https://x.com/adilj13',
    linkLabel: '@adilj13',
    color: 'text-sky-500',
    bgColor: 'bg-sky-50 dark:bg-sky-500/10',
  },
  {
    icon: FiGithub,
    title: 'GitHub',
    description: 'Check out my open source projects and contributions.',
    link: 'https://github.com/adilj13',
    linkLabel: 'adilj13',
    color: 'text-gray-700 dark:text-gray-300',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
  },
  {
    icon: FiLinkedin,
    title: 'LinkedIn',
    description: 'Connect with me professionally on LinkedIn.',
    link: 'https://linkedin.com/in/adilj13',
    linkLabel: 'adilj13',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-500/10',
  },
  {
    icon: FiInstagram,
    title: 'Instagram',
    description: 'Follow me on Instagram for updates and stories.',
    link: 'https://instagram.com/adilj13',
    linkLabel: '@adilj13',
    color: 'text-pink-500',
    bgColor: 'bg-pink-50 dark:bg-pink-500/10',
  },
  {
    icon: FaTiktok,
    title: 'TikTok',
    description: 'Check out my TikTok for short-form content.',
    link: 'https://tiktok.com/@adilj13',
    linkLabel: '@adilj13',
    color: 'text-gray-900 dark:text-white',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
  },
  {
    icon: FiMapPin,
    title: 'Location',
    description: 'Sufi Engineering, 24-Safdar Town, Lahore Road, Okara.',
    link: null,
    linkLabel: null,
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-500/10',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build mailto link as a simple contact form
    const subject = encodeURIComponent(`Message from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.open(`mailto:adil@aziz.pk?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Contact — Adil Aziz"
        description="Get in touch with Adil Aziz. Available for software engineering consulting, technical strategy, and collaborations. Reach out via X, GitHub, LinkedIn, or email."
        path="/contact"
      />
      <Navbar />
      <ScrollToTop />
      <PageTransition>

        {/* Hero */}
        <section className="pt-28 pb-16 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl" />
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
                  <FiMessageSquare className="w-6 h-6 text-primary-500" />
                </div>
                <span className="tag">Get in Touch</span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
                Let's <span className="gradient-text">Talk</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Have a question or need a consultant? I'm available for software engineering consulting,
                technical strategy, and interesting collaborations. Reach out through any channel below.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {contactMethods.map((method, i) => (
                <motion.div
                  key={method.title}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 text-center group"
                >
                  <div className={`inline-flex p-3 rounded-xl ${method.bgColor} mb-4`}>
                    <method.icon className={`w-6 h-6 ${method.color}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{method.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{method.description}</p>
                  {method.link && (
                    <a
                      href={method.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                    >
                      {method.linkLabel} →
                    </a>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 md:p-10"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  Send a <span className="gradient-text">Message</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or just say hello..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full justify-center"
                >
                  {submitted ? (
                    <>✓ Opening email client...</>
                  ) : (
                    <>Send Message <FiSend className="w-4 h-4" /></>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>

      </PageTransition>
      <Footer />
    </div>
  );
};

export default Contact;