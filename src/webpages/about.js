import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin, FiBriefcase, FiAward, FiCode, FiCoffee, FiBookOpen, FiGlobe } from 'react-icons/fi';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';

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

const stats = [
  { label: 'Years Experience', value: '5+', icon: FiBriefcase },
  { label: 'Projects Built', value: '20+', icon: FiCode },
  { label: 'Publications', value: '3', icon: FiBookOpen },
  { label: 'Cups of Coffee', value: '∞', icon: FiCoffee },
];

const values = [
  {
    title: 'Engineering Excellence',
    description: 'I believe in writing clean, maintainable, and well-tested code. Quality is never an accident — it\'s always the result of intelligent effort.',
    icon: FiCode,
  },
  {
    title: 'Continuous Learning',
    description: 'Technology evolves fast. I stay sharp by reading papers, experimenting with new tools, and contributing to the open source community.',
    icon: FiBookOpen,
  },
  {
    title: 'Impact-Driven Work',
    description: 'Every line of code should serve a purpose. I focus on building solutions that solve real problems for real people.',
    icon: FiGlobe,
  },
  {
    title: 'Leadership',
    description: 'Leading teams at Sufi Engineering taught me that great software is built by great teams. I value mentorship, clear communication, and ownership.',
    icon: FiAward,
  },
];

const interests = [
  'Full Stack Development',
  'PHP & Laravel',
  'Server Management & SSH',
  'Open Source',
  'Linux & Ubuntu',
  'Cloud Infrastructure',
  'DevOps & CI/CD',
  'Rice Processing Technology',
  'Software Architecture',
];

const About = () => {
  document.title = 'About — Adil Aziz';

  return (
    <div className="min-h-screen">
      <Navbar />
      <ScrollToTop />
      <PageTransition>

        {/* Hero */}
        <section className="pt-32 pb-16 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 -left-32 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-3xl"
            >
              <motion.span variants={fadeUp} className="tag mb-4">
                <FiMapPin className="w-3.5 h-3.5" /> Okara, Pakistan
              </motion.span>
              <motion.h1 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-4">
                About <span className="gradient-text">Me</span>
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mt-6 max-w-2xl">
                I'm Adil Aziz — a software engineer, director at Sufi Engineering, and a lifelong builder.
                I specialize in full-stack web development and have a background in software engineering research.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={stagger}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {stats.map(({ label, value, icon: Icon }, i) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  custom={i}
                  className="stat-card"
                >
                  <Icon className="w-5 h-5 text-primary-500 mb-2" />
                  <span className="stat-number">{value}</span>
                  <span className="stat-label">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Bio */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
              className="grid md:grid-cols-2 gap-12 items-start"
            >
              <div className="space-y-6">
                <motion.h2 variants={fadeUp} className="section-heading">
                  My <span className="gradient-text">Story</span>
                </motion.h2>
                <motion.div variants={fadeUp} className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p>
                    I graduated with a <strong className="text-gray-900 dark:text-white">BS in Software Engineering</strong> from
                    the University of the Punjab and later earned my <strong className="text-gray-900 dark:text-white">MS in Software Engineering</strong> from
                    the National University of Sciences and Technology (NUST), Islamabad.
                  </p>
                  <p>
                    Early in my career, I served at <strong className="text-gray-900 dark:text-white">Pakistan Air Force — Air Headquarters</strong>,
                    where I contributed to technology initiatives and software systems. The discipline and
                    precision I gained there continue to shape my work ethic.
                  </p>
                  <p>
                    Since 2020, I've been serving as <strong className="text-gray-900 dark:text-white">Director at Sufi Engineering</strong>,
                    a ricetech company where I lead engineering operations and build digital solutions for the
                    rice processing industry. It's a unique intersection of software and agriculture that
                    keeps me challenged every day.
                  </p>
                  <p>
                    Outside of work, I'm an active open source contributor, an avid reader of technical papers,
                    and I enjoy writing about software engineering on my blog. I believe in building things
                    that have real-world impact.
                  </p>
                </motion.div>
              </div>

              <motion.div
                variants={fadeUp}
                custom={3}
                className="space-y-6"
              >
                <div className="glass-card p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FiBriefcase className="w-5 h-5 text-primary-500" />
                    Current Role
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Director — Sufi Engineering</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">2020 — Present · Okara, Pakistan</p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Leading engineering operations at a ricetech company. Building digital infrastructure,
                      managing teams, and driving technology adoption in rice processing.
                    </p>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FiAward className="w-5 h-5 text-primary-500" />
                    Education
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">MS Software Engineering</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">NUST — Islamabad</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">BS Software Engineering</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">University of the Punjab — Lahore</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/20 dark:via-primary-950/10 to-transparent pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
              className="text-center"
            >
              <motion.h2 variants={fadeUp} className="section-heading">
                What I <span className="gradient-text">Value</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="section-subheading">
                Principles that drive my work
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={stagger}
              className="grid sm:grid-cols-2 gap-6 mt-8"
            >
              {values.map(({ title, description, icon: Icon }, i) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  custom={i}
                  className="glass-card p-6"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Interests */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
              className="text-center"
            >
              <motion.h2 variants={fadeUp} className="section-heading">
                Areas of <span className="gradient-text">Interest</span>
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={stagger}
              className="flex flex-wrap justify-center gap-3 mt-8"
            >
              {interests.map((interest, i) => (
                <motion.span
                  key={interest}
                  variants={fadeUp}
                  custom={i}
                  className="tag text-sm"
                >
                  {interest}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-6"
            >
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold">
                Want to work <span className="gradient-text">together</span>?
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
                I'm always open to discussing new projects, opportunities, or collaborations.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link to="/contact" className="btn-primary">
                  Get in Touch <FiArrowRight className="w-4 h-4" />
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

export default About;
