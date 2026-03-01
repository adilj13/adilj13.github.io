import React from 'react';
import { motion } from 'framer-motion';
import {
  FiBookOpen, FiExternalLink, FiAward, FiUsers, FiCalendar,
  FiHash, FiArrowRight, FiFileText,
} from 'react-icons/fi';
import { SiGooglescholar } from 'react-icons/si';
import { Link } from 'react-router-dom';
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

// ──────────────────────────────────────────
//  SCHOLAR PROFILE
// ──────────────────────────────────────────

const SCHOLAR_PROFILE = {
  name: 'Adil Aziz',
  affiliation: 'Sufi Engineering, NUST',
  url: 'https://scholar.google.com/citations?user=MxLBLrYAAAAJ&hl=en',
  stats: {
    totalCitations: 6,
    hIndex: 1,
    i10Index: 0,
  },
};

// ──────────────────────────────────────────
//  PUBLICATIONS DATA
// ──────────────────────────────────────────

const publications = [
  {
    title: 'Meta-model for stress testing on blockchain nodes',
    authors: ['A Aziz', 'MT Riaz', 'MS Jahan', 'K Ayub'],
    venue: '2020 3rd International Conference on Computing, Mathematics and Engineering Technologies (iCoMET)',
    year: 2020,
    citations: 5,
    type: 'Conference Paper',
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=MxLBLrYAAAAJ&citation_for_view=MxLBLrYAAAAJ:qjMakFHDy7sC',
    abstract:
      'This paper presents a meta-model for stress testing blockchain nodes, providing a systematic approach to evaluate the performance and resilience of blockchain networks under various load conditions.',
    keywords: ['Blockchain', 'Stress Testing', 'Meta-model', 'Performance Evaluation', 'Distributed Systems'],
    color: 'from-red-500 to-rose-600',
  },
  {
    title:
      'An Approach of Usability Testing for Web User Interface Through Interaction Flow Modeling Language (IFML) Models',
    authors: ['MT Riaz', 'F Azam', 'N Yousaf', 'MW Anwar', 'A Aziz'],
    venue: 'International Conference on Emerging Internetworking, Data & Web Technologies (EIDWT)',
    year: 2020,
    citations: 1,
    type: 'Conference Paper',
    scholarUrl:
      'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=MxLBLrYAAAAJ&citation_for_view=MxLBLrYAAAAJ:u5HHmVD_uO8C',
    abstract:
      'This research proposes a novel approach for usability testing of web user interfaces by leveraging Interaction Flow Modeling Language (IFML) models to systematically evaluate and improve user experience.',
    keywords: ['Usability Testing', 'IFML', 'Web UI', 'User Experience', 'Model-Driven Engineering'],
    color: 'from-amber-500 to-orange-600',
  },
];

// ──────────────────────────────────────────
//  RESEARCH INTERESTS
// ──────────────────────────────────────────

const researchInterests = [
  'Blockchain Technology',
  'Software Engineering',
  'Web Development',
  'Usability Testing',
  'Model-Driven Engineering',
  'Distributed Systems',
  'Industrial Automation',
  'Performance Engineering',
];

// ──────────────────────────────────────────
//  COMPONENT
// ──────────────────────────────────────────

const Publications = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Publications — Adil Aziz"
        description="Academic publications and research papers by Adil Aziz. Blockchain stress testing, usability testing with IFML models, and more. Published in IEEE and international conferences."
        path="/publications"
      />
      <Navbar />
      <ScrollToTop />
      <PageTransition>

        {/* ─── Hero ─── */}
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
              className="text-center"
            >
              <motion.span variants={fadeUp} className="tag mb-4 inline-flex">
                <FiBookOpen className="w-3.5 h-3.5 mr-1.5" /> Academic Research
              </motion.span>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mt-4"
              >
                My <span className="gradient-text">Publications</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mt-6 max-w-2xl mx-auto"
              >
                Research papers published in international conferences, indexed on{' '}
                <a
                  href={SCHOLAR_PROFILE.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary-500 hover:text-primary-600 underline underline-offset-2"
                >
                  Google Scholar
                </a>
                . Affiliated with {SCHOLAR_PROFILE.affiliation}.
              </motion.p>

              {/* Scholar Stats */}
              <motion.div
                variants={fadeUp}
                custom={3}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-3xl mx-auto"
              >
                {[
                  { label: 'Publications', value: publications.length, icon: FiFileText },
                  { label: 'Total Citations', value: SCHOLAR_PROFILE.stats.totalCitations, icon: FiHash },
                  { label: 'h-index', value: SCHOLAR_PROFILE.stats.hIndex, icon: FiAward },
                  { label: 'Co-Authors', value: '4+', icon: FiUsers },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="stat-card">
                    <Icon className="w-5 h-5 text-primary-500 mb-2 mx-auto" />
                    <span className="stat-number text-2xl">{value}</span>
                    <span className="stat-label text-xs">{label}</span>
                  </div>
                ))}
              </motion.div>

              {/* Google Scholar Button */}
              <motion.div variants={fadeUp} custom={4} className="mt-8">
                <a
                  href={SCHOLAR_PROFILE.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <SiGooglescholar className="w-4 h-4" />
                  View Google Scholar Profile
                  <FiExternalLink className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── Publications List ─── */}
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
                Published <span className="gradient-text">Papers</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="section-subheading">
                Conference papers presented at international venues
              </motion.p>
            </motion.div>

            <div className="space-y-8">
              {publications.map((pub, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  className="glass-card overflow-hidden group"
                >
                  {/* Gradient accent bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${pub.color}`} />

                  <div className="p-6 md:p-8 lg:p-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap mb-2">
                          <span className="tag text-xs">{pub.type}</span>
                          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <FiCalendar className="w-3 h-3" /> {pub.year}
                          </span>
                        </div>
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                          {pub.title}
                        </h3>
                      </div>
                      <a
                        href={pub.scholarUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium hover:bg-primary-500/20 transition-colors"
                      >
                        <SiGooglescholar className="w-4 h-4" />
                        View on Scholar
                        <FiExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Authors */}
                    <div className="flex items-center gap-2 mb-4">
                      <FiUsers className="w-4 h-4 text-gray-400 shrink-0" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {pub.authors.map((author, i) => (
                          <span key={i}>
                            <span
                              className={
                                author === 'A Aziz'
                                  ? 'font-semibold text-primary-600 dark:text-primary-400'
                                  : ''
                              }
                            >
                              {author}
                            </span>
                            {i < pub.authors.length - 1 && ', '}
                          </span>
                        ))}
                      </p>
                    </div>

                    {/* Venue */}
                    <div className="flex items-start gap-2 mb-6">
                      <FiBookOpen className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      <p className="text-sm text-gray-500 dark:text-gray-500 italic">{pub.venue}</p>
                    </div>

                    {/* Abstract */}
                    <div className="mb-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                        Abstract
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {pub.abstract}
                      </p>
                    </div>

                    {/* Footer: Keywords + Citations */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {pub.keywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-gray-700/50"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200/50 dark:border-primary-800/50">
                          <FiHash className="w-3.5 h-3.5 text-primary-500" />
                          <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                            {pub.citations}
                          </span>
                          <span className="text-xs text-primary-500/70">
                            {pub.citations === 1 ? 'citation' : 'citations'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Research Interests ─── */}
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
                Research <span className="gradient-text">Interests</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="section-subheading">
                Areas of academic focus and ongoing curiosity
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={stagger}
              className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
            >
              {researchInterests.map((interest, i) => (
                <motion.span
                  key={interest}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 shadow-sm hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all cursor-default"
                >
                  {interest}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── Citation Timeline ─── */}
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
                Scholar <span className="gradient-text">Metrics</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="section-subheading">
                Citation statistics from Google Scholar
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={stagger}
              className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
            >
              {[
                {
                  label: 'Total Citations',
                  value: SCHOLAR_PROFILE.stats.totalCitations,
                  description: 'Combined citations across all publications',
                  icon: FiHash,
                },
                {
                  label: 'h-index',
                  value: SCHOLAR_PROFILE.stats.hIndex,
                  description: 'h papers cited at least h times each',
                  icon: FiAward,
                },
                {
                  label: 'Publications',
                  value: publications.length,
                  description: 'Papers in international conferences',
                  icon: FiFileText,
                },
              ].map(({ label, value, description, icon: Icon }, i) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 text-center group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{label}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="glass-card p-8 md:p-12 text-center"
            >
              <motion.div
                variants={fadeUp}
                className="w-14 h-14 rounded-xl bg-primary-500/10 flex items-center justify-center mx-auto mb-6"
              >
                <SiGooglescholar className="w-7 h-7 text-primary-500" />
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4">
                Explore my <span className="gradient-text">research</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto mb-8"
              >
                View my full publication record, citation metrics, and co-authorship graph on
                Google Scholar.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
                <a
                  href={SCHOLAR_PROFILE.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  Google Scholar Profile <FiExternalLink className="w-4 h-4" />
                </a>
                <Link to="/contact" className="btn-secondary">
                  Collaborate <FiArrowRight className="w-4 h-4" />
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

export default Publications;
