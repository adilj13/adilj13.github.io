import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiBriefcase, FiExternalLink, FiAward, FiUsers, FiTrendingUp,
  FiCheckCircle, FiArrowRight, FiGlobe, FiCode, FiServer,
  FiTool, FiPackage, FiCpu, FiStar, FiMessageSquare,
} from 'react-icons/fi';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import SEO from '../components/SEO';
import portfolioData from '../data/portfolio.json';

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

const clients = portfolioData.clients;

const serviceIcons = [FiCode, FiServer, FiGlobe, FiCpu, FiPackage, FiTool];
const services = portfolioData.services.map((s, i) => ({ ...s, icon: serviceIcons[i] }));
const testimonials = portfolioData.testimonials;

// ──────────────────────────────────────────
//  COMPONENT
// ──────────────────────────────────────────

const Portfolio = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Portfolio - Adil Aziz"
        description="Client work and consulting portfolio by Adil Aziz. Web development, server management, and IT consulting for BrandMark, Legacy International Consultants, Sufi Engineering, and more."
        path="/portfolio"
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
                <FiBriefcase className="w-3.5 h-3.5 mr-1.5" /> Client Work & Consulting
              </motion.span>

              <motion.h1 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mt-4">
                My <span className="gradient-text">Portfolio</span>
              </motion.h1>

              <motion.p variants={fadeUp} custom={2} className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mt-6 max-w-2xl mx-auto">
                Organizations I've partnered with - delivering web development, server infrastructure,
                IT consulting, and industrial technology solutions as a Techno-Industrialist.
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                variants={fadeUp}
                custom={3}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-3xl mx-auto"
              >
                {[
                  { label: 'Clients Served', value: '4+', icon: FiUsers },
                  { label: 'Projects Delivered', value: '20+', icon: FiBriefcase },
                  { label: 'Years Consulting', value: '3+', icon: FiTrendingUp },
                  { label: 'Client Satisfaction', value: '100%', icon: FiAward },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="stat-card">
                    <Icon className="w-5 h-5 text-primary-500 mb-2 mx-auto" />
                    <span className="stat-number text-2xl">{value}</span>
                    <span className="stat-label text-xs">{label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── Client Case Studies ─── */}
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
                Client <span className="gradient-text">Work</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="section-subheading">
                Detailed case studies of organizations I've worked with
              </motion.p>
            </motion.div>

            <div className="space-y-12">
              {clients.map((client, idx) => (
                <motion.div
                  key={client.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="glass-card overflow-hidden"
                >
                  {/* Gradient accent top bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${client.color}`} />

                  <div className="p-6 md:p-8 lg:p-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl ${client.iconBg} flex items-center justify-center text-2xl shrink-0`}>
                          {client.logo}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                              {client.name}
                            </h3>
                            {client.website && (
                              <a
                                href={client.website}
                                target="_blank"
                                rel="noreferrer"
                                className="text-gray-400 hover:text-primary-500 transition-colors"
                              >
                                <FiExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{client.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="tag text-xs">{client.period}</span>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          client.status === 'Ongoing'
                            ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200/50 dark:border-green-800/50'
                            : client.status === 'Full-time'
                            ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 border border-primary-200/50 dark:border-primary-800/50'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-gray-700/50'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            client.status === 'Ongoing' ? 'bg-green-500 animate-pulse' :
                            client.status === 'Full-time' ? 'bg-primary-500 animate-pulse' :
                            'bg-gray-400'
                          }`} />
                          {client.status}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                      {client.description}
                    </p>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      {/* Services */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                          <FiCheckCircle className="w-4 h-4 text-primary-500" />
                          Services Delivered
                        </h4>
                        <ul className="space-y-2.5">
                          {client.services.map((service, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                              <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${client.color} mt-2 shrink-0`} />
                              {service}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Results */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                          <FiTrendingUp className="w-4 h-4 text-primary-500" />
                          Key Results
                        </h4>
                        <div className="grid grid-cols-3 gap-3">
                          {client.results.map((result) => (
                            <div
                              key={result.metric}
                              className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
                            >
                              <div className={`text-xl font-bold ${client.accentText}`}>
                                {result.value}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                {result.metric}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {client.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-gray-700/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Services ─── */}
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
                What I <span className="gradient-text">Offer</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="section-subheading">
                Consulting services available for your organization
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map(({ icon: Icon, title, description }, i) => (
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
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
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
                Client <span className="gradient-text">Testimonials</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="section-subheading">
                What my clients say about working with me
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={stagger}
              className="grid md:grid-cols-3 gap-6"
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  className="glass-card p-6 flex flex-col"
                >
                  <FiStar className="w-5 h-5 text-primary-500 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed italic flex-1">
                    "{t.quote}"
                  </p>
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.author}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── Process ─── */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-50/10 dark:via-accent-950/5 to-transparent pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
              className="text-center"
            >
              <motion.h2 variants={fadeUp} className="section-heading">
                How I <span className="gradient-text">Work</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="section-subheading">
                My consulting engagement process
              </motion.p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {[
                { step: '01', title: 'Discovery Call', desc: 'We discuss your requirements, current pain points, and goals. I assess whether I\'m the right fit for the engagement.' },
                { step: '02', title: 'Proposal & Scope', desc: 'I outline the scope of work, deliverables, timeline, and pricing. No hidden costs - everything is transparent.' },
                { step: '03', title: 'Build & Deliver', desc: 'I execute the project with regular updates and demos. You get clean, documented, production-ready work.' },
                { step: '04', title: 'Support & Iterate', desc: 'Post-delivery support, monitoring, and iterative improvements. I\'m here for the long run if needed.' },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="relative pl-16 pb-10 last:pb-0 group"
                >
                  {/* Timeline line */}
                  <div className="absolute left-5 top-10 bottom-0 w-px bg-gray-200 dark:bg-gray-800 group-last:hidden" />
                  {/* Step number */}
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-primary-500/25">
                    {item.step}
                  </div>

                  <div className="glass-card p-6 ml-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
              <motion.div variants={fadeUp} className="w-14 h-14 rounded-xl bg-primary-500/10 flex items-center justify-center mx-auto mb-6">
                <FiMessageSquare className="w-7 h-7 text-primary-500" />
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4">
                Have a project in <span className="gradient-text">mind</span>?
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto mb-8">
                I'm available for software engineering consulting, server management, and technical strategy.
                Let's discuss how I can help your organization.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn-primary">
                  Get in Touch <FiArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/resume" className="btn-secondary">
                  View Resume
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

export default Portfolio;
