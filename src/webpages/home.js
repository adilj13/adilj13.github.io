import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowRight, FiGithub, FiTwitter, FiLinkedin, FiDownload, FiBookOpen, FiInstagram } from 'react-icons/fi';
import { SiReact, SiTailwindcss, SiPython, SiJavascript, SiPhp, SiDocker, SiGit, SiUbuntu } from 'react-icons/si';
import { FaTiktok } from 'react-icons/fa';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';

const socialLinks = [
  { href: 'https://github.com/adilj13', icon: FiGithub, label: 'GitHub' },
  { href: 'https://x.com/adilj13', icon: FiTwitter, label: 'Twitter' },
  { href: 'https://linkedin.com/in/adilj13', icon: FiLinkedin, label: 'LinkedIn' },
  { href: 'https://instagram.com/adilj13', icon: FiInstagram, label: 'Instagram' },
  { href: 'https://tiktok.com/@adilj13', icon: FaTiktok, label: 'TikTok' },
];

const skills = [
  { name: 'React', icon: SiReact, color: 'text-cyan-500' },
  { name: 'Tailwind', icon: SiTailwindcss, color: 'text-sky-500' },
  { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-500' },
  { name: 'PHP', icon: SiPhp, color: 'text-indigo-400' },
  { name: 'Python', icon: SiPython, color: 'text-blue-500' },
  { name: 'Ubuntu', icon: SiUbuntu, color: 'text-orange-500' },
  { name: 'Docker', icon: SiDocker, color: 'text-blue-400' },
  { name: 'Git', icon: SiGit, color: 'text-orange-600' },
];

const timeline = [
  {
    year: '2020 — Present',
    title: 'Director — Sufi Engineering',
    description: 'Leading a ricetech company focused on engineering solutions and innovation.',
  },
  {
    year: 'Previously',
    title: 'Pakistan Air Force — Air HQ',
    description: 'Served at Air Headquarters contributing to technology and software systems.',
  },
  {
    year: 'Education',
    title: 'MS Software Engineering — NUST',
    description: 'Master\'s degree in Software Engineering from National University of Sciences and Technology.',
  },
  {
    year: 'Education',
    title: 'BS Software Engineering — University of the Punjab',
    description: 'Bachelor\'s degree in Software Engineering.',
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
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Home = () => {
  document.title = 'Adil Aziz — Software Engineer & Developer';

  return (
    <div className="min-h-screen">
      <Navbar />
      <ScrollToTop />
      <PageTransition>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float animate-delay-300" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary-500/5 to-transparent rounded-full" />
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="space-y-6"
              >
                <motion.div variants={fadeUp} custom={0}>
                  <span className="tag">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                    Available for opportunities
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  custom={1}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
                >
                  Hi, I'm{' '}
                  <span className="gradient-text">Adil Aziz</span>
                </motion.h1>

                <motion.div variants={fadeUp} custom={2} className="text-xl sm:text-2xl text-gray-500 dark:text-gray-400 font-medium h-10">
                  <TypeAnimation
                    sequence={[
                      'Software Engineer',
                      2000,
                      'Director @ Sufi Engineering',
                      2000,
                      'Open Source Enthusiast',
                      2000,
                      'Full Stack Developer',
                      2000,
                    ]}
                    wrapper="span"
                    repeat={Infinity}
                    cursor={true}
                  />
                </motion.div>

                <motion.p
                  variants={fadeUp}
                  custom={3}
                  className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-xl"
                >
                  Since 2020, I've been working at{' '}
                  <a href="https://sufi.engineering" target="_blank" rel="noreferrer"
                    className="text-primary-500 hover:text-primary-600 font-medium underline underline-offset-4 decoration-primary-500/30 hover:decoration-primary-500 transition-colors">
                    Sufi Engineering
                  </a>
                  , a ricetech company, as a Director. I build web applications, contribute to open source, and write about things that interest me.
                </motion.p>

                <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-4">
                  <Link to="/projects" className="btn-primary">
                    View My Work <FiArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/blog" className="btn-secondary">
                    <FiBookOpen className="w-4 h-4" /> Read Blog
                  </Link>
                </motion.div>

                <motion.div variants={fadeUp} custom={5} className="flex items-center gap-4 pt-4">
                  {socialLinks.map(({ href, icon: Icon, label }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl text-gray-400 hover:text-primary-500 bg-gray-100 dark:bg-gray-800/50 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all duration-200 hover:-translate-y-1"
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right content - Avatar/Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                className="hidden lg:flex justify-center"
              >
                <div className="relative">
                  <div className="w-80 h-80 rounded-3xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 dark:from-primary-500/10 dark:to-accent-500/10 flex items-center justify-center animate-float">
                    <div className="w-72 h-72 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/40 dark:to-accent-900/40 flex items-center justify-center">
                      <span className="text-8xl">👨‍💻</span>
                    </div>
                  </div>
                  {/* Floating badges */}
                  <div className="absolute -top-4 -right-4 glass-card px-4 py-2 animate-float animate-delay-100">
                    <span className="text-sm font-medium">🎓 MS @ NUST</span>
                  </div>
                  <div className="absolute -bottom-4 -left-4 glass-card px-4 py-2 animate-float animate-delay-300">
                    <span className="text-sm font-medium">🚀 Full Stack Dev</span>
                  </div>
                  <div className="absolute top-1/2 -right-8 glass-card px-4 py-2 animate-float animate-delay-200">
                    <span className="text-sm font-medium">📖 Researcher</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/30 dark:via-primary-950/20 to-transparent pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
              className="text-center"
            >
              <motion.h2 variants={fadeUp} className="section-heading">
                Tech <span className="gradient-text">Stack</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="section-subheading">
                Technologies & tools I work with daily
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={stagger}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {skills.map(({ name, icon: Icon, color }, i) => (
                <motion.div
                  key={name}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card p-6 flex flex-col items-center gap-3 group cursor-default"
                >
                  <Icon className={`w-8 h-8 ${color} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Experience Timeline Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
              className="text-center"
            >
              <motion.h2 variants={fadeUp} className="section-heading">
                Experience & <span className="gradient-text">Education</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="section-subheading">
                My professional journey so far
              </motion.p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="relative pl-8 pb-10 last:pb-0 group"
                >
                  {/* Timeline line */}
                  <div className="absolute left-0 top-2 bottom-0 w-px bg-gray-200 dark:bg-gray-800 group-last:hidden" />
                  {/* Dot */}
                  <div className="absolute left-0 top-2 w-2 h-2 -translate-x-[3.5px] rounded-full bg-primary-500 ring-4 ring-primary-100 dark:ring-primary-500/20" />

                  <div className="glass-card p-6 ml-4 hover:border-primary-200 dark:hover:border-primary-800 transition-colors duration-300">
                    <span className="tag text-xs mb-3">{item.year}</span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-50/20 dark:via-accent-950/10 to-transparent pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
              className="glass-card p-8 md:p-12 text-center"
            >
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4">
                📚 Academic <span className="gradient-text">Research</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                I'm passionate about research and have published papers in software engineering.
                Check out my research profile to learn more about my academic contributions.
              </motion.p>
              <motion.a
                variants={fadeUp}
                href="https://scholar.google.com/citations?user=MxLBLrYAAAAJ"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Google Scholar Profile <FiArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
              className="text-center space-y-6"
            >
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold">
                Let's <span className="gradient-text">Connect</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
                I'm always open to interesting conversations, collaborations, and new opportunities.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn-primary">
                  Get in Touch <FiArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/blog" className="btn-secondary">
                  <FiBookOpen className="w-4 h-4" /> Read My Blog
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </PageTransition>
      <Footer />
    </div>
  );
};

export default Home;