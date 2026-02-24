import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin, FiBriefcase, FiAward, FiCode, FiCoffee, FiBookOpen, FiGlobe, FiSettings } from 'react-icons/fi';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import SEO from '../components/SEO';

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
    title: 'Industrial Innovation',
    description: 'Bridging the gap between traditional industry and modern technology. Applying engineering precision to manufacturing and rice processing.',
    icon: FiSettings,
  },
  {
    title: 'Continuous Learning',
    description: 'From SolidWorks to server management — I stay sharp by constantly expanding my toolkit across both mechanical and software domains.',
    icon: FiBookOpen,
  },
  {
    title: 'Impact-Driven Work',
    description: 'Every design and every line of code should serve a purpose. I focus on solutions that solve real problems in the real world.',
    icon: FiGlobe,
  },
  {
    title: 'Leadership',
    description: 'Leading cross-functional teams at Sufi Engineering — from factory floor technicians to software developers. I value mentorship, clear communication, and ownership.',
    icon: FiAward,
  },
];

const interests = [
  'Mechanical Engineering',
  'CNC & CAD/CAM',
  'SolidWorks & Aspire',
  'DXF & G-Code',
  'Industrial Automation',
  'Rice Processing Technology',
  'Software Consulting',
  'Server Management',
  'Open Source',
  'PHP & Laravel',
];

const About = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="About — Adil Aziz"
        description="Learn about Adil Aziz — Techno-Industrialist, Director at Sufi Engineering. Background in mechanical engineering management, software engineering, and research."
        path="/about"
      />
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
                I'm Adil Aziz — a Techno-Industrialist, Director at Sufi Engineering, and a software engineering consultant.
                I manage mechanical engineering operations full-time and do software development part-time.
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
                    a ricetech company where I lead mechanical engineering operations full-time. My day-to-day involves
                    working with <strong className="text-gray-900 dark:text-white">DXF, G-Code, SolidWorks, and Aspire</strong> for
                    CNC machining, plant design, and industrial automation. It's the unique intersection of
                    technology and traditional industry that defines me as a Techno-Industrialist.
                  </p>
                  <p>
                    I continue to do <strong className="text-gray-900 dark:text-white">software engineering part-time</strong> as a consultant,
                    building web applications, managing servers, and contributing to open source. I'm also a published
                    researcher and enjoy writing about engineering on my blog.
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
                      Full-time mechanical engineering management at a ricetech company. Working with CNC machines,
                      SolidWorks, DXF/G-Code, and plant design. Part-time software engineering consultant.
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
                Need a <span className="gradient-text">Consultant</span>?
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
                I'm available for consulting in software engineering, server management, and technical strategy. Let's talk.
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
