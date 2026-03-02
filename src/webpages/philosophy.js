import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiFeather, FiTarget, FiHeart, FiZap, FiShield,
  FiStar, FiCompass, FiUsers, FiArrowRight, FiBookOpen,
  FiTrendingUp, FiSunrise,
} from 'react-icons/fi';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import SEO from '../components/SEO';
import philData from '../data/philosophy.json';

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
//  DATA FROM JSON (icons mapped here)
// ──────────────────────────────────────────

const beliefIcons = [FiTarget, FiZap, FiShield, FiHeart];
const principleIcons = [FiCompass, FiTrendingUp, FiUsers, FiStar, FiBookOpen, FiSunrise];

const coreBeliefs = philData.coreBeliefs.map((b, i) => ({ ...b, icon: beliefIcons[i] }));
const principles = philData.principles.map((p, i) => ({ ...p, icon: principleIcons[i] }));
const mantras = philData.mantras;

// ──────────────────────────────────────────
//  COMPONENT
// ──────────────────────────────────────────

const Philosophy = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Philosophy - Adil Aziz"
        description="The principles, beliefs, and mantras that guide Adil Aziz as a Techno-Industrialist - bridging mechanical engineering and software consulting with intentionality."
        path="/philosophy"
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
                <FiFeather className="w-3.5 h-3.5 mr-1.5" /> Beliefs & Principles
              </motion.span>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mt-4"
              >
                My <span className="gradient-text">Philosophy</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mt-6 max-w-2xl mx-auto"
              >
                The ideas that shape how I work, lead, and build - at the intersection of
                industrial engineering and software craftsmanship.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ─── Core Beliefs ─── */}
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
                Core <span className="gradient-text">Beliefs</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="section-subheading">
                The foundational ideas that drive every decision I make
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {coreBeliefs.map((belief, idx) => (
                <motion.div
                  key={belief.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="glass-card overflow-hidden group"
                >
                  <div className={`h-1.5 bg-gradient-to-r ${belief.color}`} />
                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0 group-hover:bg-primary-500/20 transition-colors">
                        <belief.icon className="w-6 h-6 text-primary-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                          {belief.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {belief.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Mantras / Quotes ─── */}
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
                Words I <span className="gradient-text">Live By</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="section-subheading">
                Mantras that keep me grounded and moving forward
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={stagger}
              className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            >
              {mantras.map((m, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  className="glass-card p-6 md:p-8 flex flex-col"
                >
                  <div className="mb-4">
                    <span className="text-4xl font-serif text-primary-500/30 leading-none select-none">"</span>
                  </div>
                  <p className="text-lg font-medium text-gray-900 dark:text-white leading-relaxed flex-1">
                    {m.quote}
                  </p>
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">{m.context}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── Working Principles ─── */}
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
                Working <span className="gradient-text">Principles</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="section-subheading">
                How I approach engineering, leadership, and life
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {principles.map(({ icon: Icon, title, description }, i) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── Closing Thought ─── */}
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
                <FiFeather className="w-7 h-7 text-primary-500" />
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4">
                Philosophy is <span className="gradient-text">practice</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto mb-8"
              >
                These aren't just words on a page - they're how I run teams, build software,
                design machines, and live my life. If any of this resonates, let's connect.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn-primary">
                  Get in Touch <FiArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/about" className="btn-secondary">
                  Learn About Me
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

export default Philosophy;
