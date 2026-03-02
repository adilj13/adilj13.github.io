import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import {
  FiArrowRight, FiGithub, FiTwitter, FiLinkedin, FiBookOpen,
  FiInstagram, FiBriefcase, FiFeather,
  FiMapPin, FiMail, FiUsers,
  FiSettings, FiCompass, FiLayers, FiTerminal, FiExternalLink,
} from 'react-icons/fi';
import { SiBluesky } from 'react-icons/si';
import { FaTiktok, FaCogs } from 'react-icons/fa';
import parse from 'html-react-parser';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import SEO from '../components/SEO';

/* --- animation helpers --- */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: 'easeOut' },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const socialLinks = [
  { href: 'https://github.com/adilj13', icon: FiGithub, label: 'GitHub' },
  { href: 'https://x.com/adilj13', icon: FiTwitter, label: 'X' },
  { href: 'https://linkedin.com/in/adilj13', icon: FiLinkedin, label: 'LinkedIn' },
  { href: 'https://instagram.com/adilj13', icon: FiInstagram, label: 'Instagram' },
  { href: 'https://tiktok.com/@adilj13', icon: FaTiktok, label: 'TikTok' },
  { href: 'https://bsky.app/profile/adil.aziz.pk', icon: SiBluesky, label: 'Bluesky' },
];

/* --- dual roles --- */
const roles = [
  {
    tag: 'Full-time',
    title: 'Mechanical Engineering Director',
    company: 'Sufi Engineering',
    companyUrl: 'https://sufi.engineering',
    description: 'Leading mechanical engineering operations at a ricetech company - CNC machining, plant design, SolidWorks, DXF/G-Code pipelines, and industrial automation.',
    highlights: ['CNC & CAD/CAM', 'Plant Layout Design', 'Industrial Automation', 'Team Leadership'],
    icon: FaCogs,
    color: 'from-red-500 to-rose-600',
    tagBg: 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200/50 dark:border-red-800/50',
  },
  {
    tag: 'Part-time',
    title: 'Software Engineering Consultant',
    company: 'Freelance',
    companyUrl: null,
    description: 'Building web applications, managing server infrastructure, and providing technical strategy for businesses - PHP, Laravel, React, Ubuntu, Docker.',
    highlights: ['Web Development', 'Server Management', 'DevOps', 'Open Source'],
    icon: FiTerminal,
    color: 'from-blue-500 to-indigo-600',
    tagBg: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-800/50',
  },
];

/* --- site navigation cards --- */
const sitePages = [
  { to: '/work', icon: FiBriefcase, title: 'Work', description: 'GitHub projects, client portfolio, and full resume.', gradient: 'from-red-500 to-rose-600' },
  { to: '/writing', icon: FiFeather, title: 'Writing', description: 'Blog posts, academic publications, and Bluesky feed.', gradient: 'from-amber-500 to-orange-600' },
  { to: '/about', icon: FiUsers, title: 'About', description: 'Background, values, and interests.', gradient: 'from-teal-500 to-cyan-600' },
  { to: '/philosophy', icon: FiCompass, title: 'Philosophy', description: 'Core beliefs, mantras, and working principles.', gradient: 'from-violet-500 to-purple-600' },
  { to: '/uses', icon: FiLayers, title: 'Uses', description: 'Hardware, software, and engineering tools I use.', gradient: 'from-blue-500 to-indigo-600' },
  { to: '/contact', icon: FiMail, title: 'Contact', description: 'Get in touch for consulting or collaboration.', gradient: 'from-pink-500 to-rose-600' },
];

/* --- featured clients --- */
const featuredClients = [
  { name: 'Sufi Engineering', emoji: '🏭', status: 'Full-time' },
  { name: 'BrandMark', emoji: '🏷️', status: 'Ongoing' },
  { name: 'Legacy Intl. Consultants', emoji: '🌐', status: 'Ongoing' },
  { name: 'Pakistan Air Force', emoji: '✈️', status: 'Previously' },
];

/* ===== COMPONENT ===== */

const Home = () => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [latestBlog, setLatestBlog] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users/adilj13')
      .then((r) => r.json())
      .then((data) => {
        if (data.avatar_url) setAvatarUrl(data.avatar_url);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('https://public-api.wordpress.com/rest/v1.1/sites/adilj13.wordpress.com/posts/?order_by=date&order=DESC&fields=title,slug,excerpt,featured_image&number=1')
      .then((r) => r.json())
      .then((data) => {
        if (data.posts && data.posts.length > 0) setLatestBlog(data.posts[0]);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen">
      <SEO
        title="Adil Aziz - Techno-Industrialist"
        description="Techno-Industrialist and Director at Sufi Engineering. Full-time mechanical engineering management with CNC, SolidWorks, DXF/G-Code. Part-time software engineering consultant."
        path="/"
      />
      <Navbar />
      <ScrollToTop />
      <PageTransition>

        {/* ===== HERO ===== */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-primary-500/8 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-accent-500/8 rounded-full blur-[100px]" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-28 lg:py-0">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
              {/* Left (3/5) */}
              <motion.div initial="hidden" animate="visible" variants={stagger} className="lg:col-span-3 space-y-7">
                <motion.div variants={fadeUp} custom={0}>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200/50 dark:border-green-800/50">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Available for Consulting
                  </span>
                </motion.div>

                <motion.h1 variants={fadeUp} custom={1} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                  Adil{' '}
                  <span className="gradient-text">Aziz</span>
                </motion.h1>

                <motion.div variants={fadeUp} custom={2} className="h-9">
                  <TypeAnimation
                    sequence={['Techno-Industrialist.', 2500, 'Director @ Sufi Engineering.', 2500, 'Software Consultant.', 2500, 'CNC & CAD Specialist.', 2500, 'Published Researcher.', 2500]}
                    wrapper="span"
                    repeat={Infinity}
                    cursor={true}
                    className="text-xl sm:text-2xl font-medium text-gray-500 dark:text-gray-400"
                  />
                </motion.div>

                <motion.p variants={fadeUp} custom={3} className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                  I run mechanical engineering operations full-time at{' '}
                  <a href="https://sufi.engineering" target="_blank" rel="noreferrer" className="font-semibold text-primary-500 hover:text-primary-600 underline decoration-primary-500/30 hover:decoration-primary-500 underline-offset-4 transition-colors">
                    Sufi Engineering
                  </a>{' '}
                  - a ricetech company in Pakistan - and build software part-time as a consultant. I call this being a Techno-Industrialist.
                </motion.p>

                <motion.div variants={fadeUp} custom={4} className="flex flex-wrap items-center gap-4 pt-1">
                  <Link to="/work" className="btn-primary">
                    Explore My Work <FiArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/contact" className="btn-secondary">
                    <FiMail className="w-4 h-4" /> Get in Touch
                  </Link>
                </motion.div>

                <motion.div variants={fadeUp} custom={5} className="flex items-center gap-2 pt-2">
                  {socialLinks.map(({ href, icon: Icon, label }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="p-2.5 rounded-xl text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all duration-200 hover:-translate-y-0.5">
                      <Icon className="w-[18px] h-[18px]" />
                    </a>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right (2/5) - Avatar + Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7, ease: 'easeOut' }}
                className="lg:col-span-2 flex flex-col items-center gap-6"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 opacity-50 group-hover:opacity-75 blur-md transition-opacity duration-500" />
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-2xl">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Adil Aziz" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-800/50 dark:to-accent-800/50 animate-pulse" />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {[
                    { icon: FiBriefcase, value: '5+', label: 'Years' },
                    { icon: FiLayers, value: '20+', label: 'Projects' },
                    { icon: FiBookOpen, value: '2', label: 'Papers' },
                  ].map(({ icon: Icon, value, label }) => (
                    <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-800/50">
                      <Icon className="w-3.5 h-3.5 text-primary-500" />
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{value}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <FiMapPin className="w-3.5 h-3.5" />
                  <span>Okara, Pakistan</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-600">Scroll</span>
            <div className="w-5 h-8 rounded-full border-2 border-gray-300 dark:border-gray-700 flex justify-center pt-1.5">
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }} className="w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-600" />
            </div>
          </motion.div>
        </section>

        {/* ===== DUAL ROLES ===== */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/20 dark:via-primary-950/10 to-transparent pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={stagger} className="text-center mb-14">
              <motion.span variants={fadeUp} className="tag mb-4 inline-flex">
                <FiSettings className="w-3.5 h-3.5 mr-1.5" /> What I Do
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mt-4">
                Two Worlds, <span className="gradient-text">One Person</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-2xl mx-auto">
                I split my time between the factory floor and the terminal - bringing engineering discipline to both.
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {roles.map((role, idx) => (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  className="glass-card overflow-hidden group hover:shadow-xl transition-all duration-300"
                >
                  <div className={`h-1.5 bg-gradient-to-r ${role.color}`} />
                  <div className="p-7 md:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${role.color} text-white shadow-lg`}>
                        <role.icon className="w-6 h-6" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${role.tagBg}`}>
                        {role.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{role.title}</h3>
                    {role.companyUrl ? (
                      <a href={role.companyUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors inline-flex items-center gap-1">
                        {role.company} <FiExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{role.company}</p>
                    )}

                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mt-4 mb-5">{role.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {role.highlights.map((h) => (
                        <span key={h} className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-gray-700/50">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CLIENTS RIBBON ===== */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={stagger} className="text-center mb-10">
              <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold">
                Organizations I{"'"}ve <span className="gradient-text">Worked With</span>
              </motion.h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredClients.map(({ name, emoji, status }, i) => (
                <motion.div key={name} variants={fadeUp} custom={i} className="glass-card p-5 text-center group hover:border-primary-200 dark:hover:border-primary-800 transition-colors">
                  <span className="text-3xl block mb-3">{emoji}</span>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{name}</h3>
                  <span className={`text-[10px] uppercase tracking-wider font-bold ${
                    status === 'Full-time' ? 'text-primary-500' :
                    status === 'Ongoing' ? 'text-green-500' :
                    'text-gray-400 dark:text-gray-500'
                  }`}>{status}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-6">
              <Link to="/work" className="text-sm font-medium text-primary-500 hover:text-primary-600 inline-flex items-center gap-1.5 transition-colors">
                View full portfolio <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ===== LATEST BLOG POST ===== */}
        {latestBlog && (
          <section className="py-16 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-50/10 dark:via-accent-950/5 to-transparent pointer-events-none" />
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={stagger}>
                <motion.div variants={fadeUp} className="flex items-center justify-between mb-8">
                  <div>
                    <span className="tag mb-3 inline-flex"><FiBookOpen className="w-3.5 h-3.5 mr-1.5" /> Latest Post</span>
                    <h2 className="text-2xl md:text-3xl font-bold mt-3">
                      From the <span className="gradient-text">Blog</span>
                    </h2>
                  </div>
                  <Link to="/writing" className="hidden sm:inline-flex btn-secondary !py-2 !px-4 text-sm">
                    All Writing <FiArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <Link to={`/blog/${latestBlog.slug}`} className="group block">
                    <div className="glass-card overflow-hidden hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300">
                      <div className="grid md:grid-cols-5 gap-0">
                        {latestBlog.featured_image && (
                          <div className="md:col-span-2 overflow-hidden">
                            <img src={latestBlog.featured_image} alt={parse(latestBlog.title)} className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        )}
                        <div className={`${latestBlog.featured_image ? 'md:col-span-3' : 'md:col-span-5'} p-6 md:p-8 flex flex-col justify-center`}>
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors mb-3">
                            {parse(latestBlog.title)}
                          </h3>
                          <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed mb-4">
                            {parse(latestBlog.excerpt)}
                          </div>
                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-500 group-hover:gap-2.5 transition-all duration-200">
                            Read article <FiArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>

                <div className="sm:hidden text-center mt-4">
                  <Link to="/writing" className="text-sm font-medium text-primary-500 hover:text-primary-600 inline-flex items-center gap-1.5">
                    All Writing <FiArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* ===== PHILOSOPHY QUOTE ===== */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="relative text-center"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-7xl text-primary-200 dark:text-primary-900/40 font-serif select-none pointer-events-none">&ldquo;</div>
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white leading-snug pt-8">
                The factory floor and the terminal are not different worlds. The best solutions come when you bring engineering discipline to software and creative thinking to manufacturing.
              </blockquote>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="w-8 h-px bg-primary-500" />
                <Link to="/philosophy" className="text-sm font-medium text-primary-500 hover:text-primary-600 inline-flex items-center gap-1.5 transition-colors">
                  Read my philosophy <FiArrowRight className="w-3.5 h-3.5" />
                </Link>
                <div className="w-8 h-px bg-primary-500" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== EXPLORE THE SITE ===== */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/20 dark:via-primary-950/10 to-transparent pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={stagger} className="text-center mb-14">
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold">
                Explore the <span className="gradient-text">Site</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 dark:text-gray-400 text-lg mt-3">
                Everything about my work, writing, and who I am.
              </motion.p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sitePages.map(({ to, icon: Icon, title, description, gradient }, i) => (
                <motion.div key={to} variants={fadeUp} custom={i}>
                  <Link to={to} className="glass-card p-6 flex flex-col group hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300 h-full block">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1.5 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">{title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">{description}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-500 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Explore <FiArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
              <div className="absolute top-0 right-0 w-72 h-72 bg-primary-500/10 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-500/10 rounded-full blur-[80px]" />

              <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
                  Let{"'"}s build something{' '}
                  <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">together</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-xl mx-auto mb-9">
                  Open to consulting opportunities, engineering collaborations, and interesting conversations.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-200 hover:-translate-y-0.5">
                    Get in Touch <FiArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="mailto:adil@aziz.pk" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5">
                    <FiMail className="w-4 h-4" /> adil@aziz.pk
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </PageTransition>
      <Footer />
    </div>
  );
};

export default Home;
