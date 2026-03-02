import React from 'react';
import { motion } from 'framer-motion';
import { FiMonitor, FiCode, FiTerminal, FiTool, FiSmartphone, FiSettings } from 'react-icons/fi';
import { SiVscodium, SiUbuntu, SiSpotify, SiGooglechrome, SiFigma, SiNotion, SiSlack, SiGithub, SiDocker, SiPostman } from 'react-icons/si';
import { FaCogs, FaDraftingCompass, FaCubes, FaIndustry } from 'react-icons/fa';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import SEO from '../components/SEO';
import usesData from '../data/uses.json';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* --- Map icons to items from JSON --- */
const categoryIcons = [FiSettings, FiMonitor, FiCode, FiTool, FiSmartphone];
const itemIconMap = {
  'SolidWorks': FaCogs, 'Vectric Aspire': FaCubes, 'DXF / G-Code': FaDraftingCompass,
  'CNC Machines': FaIndustry, 'VS Code': SiVscodium, 'Terminal - Zsh + Oh My Zsh': FiTerminal,
  'Ubuntu / WSL': SiUbuntu, 'Docker': SiDocker, 'GitHub': SiGithub, 'Postman': SiPostman,
  'Chrome DevTools': SiGooglechrome, 'Notion': SiNotion, 'Figma': SiFigma, 'Slack': SiSlack,
  'Spotify': SiSpotify,
};

const categories = usesData.categories.map((cat, i) => ({
  ...cat,
  icon: categoryIcons[i],
  items: cat.items.map((item) => ({ ...item, icon: itemIconMap[item.name] || null })),
}));

const Uses = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Uses - Adil Aziz"
        description="Hardware, software, and engineering tools that Adil Aziz uses daily. SolidWorks, Aspire, CNC machines, VS Code, Docker, and more."
        path="/uses"
      />
      <Navbar />
      <ScrollToTop />
      <PageTransition>

        {/* Header */}
        <section className="pt-32 pb-12 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                What I <span className="gradient-text">Use</span>
              </motion.h1>
              <motion.p variants={fadeUp} custom={1} className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl">
                A look at the hardware, software, and tools that power my daily workflow.
                Inspired by <a href="https://uses.tech" target="_blank" rel="noreferrer" className="text-primary-500 hover:text-primary-600 underline underline-offset-4 decoration-primary-500/30">uses.tech</a>.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        {categories.map((category, catIndex) => (
          <section key={category.title} className={`py-12 relative ${catIndex % 2 === 1 ? '' : ''}`}>
            {catIndex % 2 === 1 && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/15 dark:via-primary-950/10 to-transparent pointer-events-none" />
            )}
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={stagger}
              >
                <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{category.title}</h2>
                    {category.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
                    )}
                  </div>
                </motion.div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {category.items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      variants={fadeUp}
                      custom={i}
                      className="glass-card p-5 group hover:border-primary-200 dark:hover:border-primary-800 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        {item.icon && (
                          <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-primary-50 dark:group-hover:bg-primary-500/10 transition-colors">
                            <item.icon className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-primary-500 transition-colors" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        ))}

        <div className="pb-20" />

      </PageTransition>
      <Footer />
    </div>
  );
};

export default Uses;
