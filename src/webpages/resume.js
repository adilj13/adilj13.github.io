import React from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiBookOpen, FiAward, FiCode, FiDownload, FiExternalLink, FiSettings } from 'react-icons/fi';
import { SiReact, SiTailwindcss, SiPython, SiJavascript, SiPhp, SiDocker, SiGit, SiPostgresql, SiLinux, SiMongodb, SiFirebase, SiAmazonwebservices, SiUbuntu, SiMysql, SiLaravel, SiNginx } from 'react-icons/si';
import { FaCogs, FaDraftingCompass, FaCubes, FaIndustry } from 'react-icons/fa';
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

const experience = [
  {
    role: 'Director — Mechanical Engineering Management',
    company: 'Sufi Engineering',
    location: 'Okara, Pakistan',
    period: '2020 — Present (Full-time)',
    description: 'Leading mechanical engineering operations at a ricetech company focused on innovation in rice processing technology.',
    highlights: [
      'Managing CNC machining operations with DXF, G-Code, SolidWorks, and Aspire',
      'Designing and optimizing rice processing plant layouts and machinery components',
      'Leading cross-functional teams of mechanical engineers and factory floor technicians',
      'Driving industrial automation and modernization of legacy manufacturing processes',
    ],
  },
  {
    role: 'Software Engineering Consultant',
    company: 'Freelance / Part-time',
    location: 'Remote',
    period: 'Part-time',
    description: 'Part-time software development and consulting for web applications, server infrastructure, and technical strategy.',
    highlights: [
      'Building and maintaining web applications with PHP, Laravel, and React',
      'Server management, deployment automation, and infrastructure on Ubuntu/Linux',
      'Technical consulting for businesses on software architecture and tooling',
      'Contributing to open source projects and community',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Pakistan Air Force — Air HQ',
    location: 'Islamabad, Pakistan',
    period: 'Previously',
    description: 'Contributed to technology and software systems at Air Headquarters.',
    highlights: [
      'Developed and maintained mission-critical software systems',
      'Worked with secure, high-availability infrastructure',
      'Collaborated with cross-departmental teams on tech initiatives',
      'Gained disciplined engineering practices in a high-stakes environment',
    ],
  },
];

const education = [
  {
    degree: 'MS Software Engineering',
    institution: 'National University of Sciences and Technology (NUST)',
    location: 'Islamabad, Pakistan',
    period: 'Completed',
    details: 'Focused on software architecture, quality assurance, and research methodologies. Published research papers in software engineering.',
  },
  {
    degree: 'BS Software Engineering',
    institution: 'University of the Punjab',
    location: 'Lahore, Pakistan',
    period: 'Completed',
    details: 'Core curriculum in computer science, software design, data structures, algorithms, and database systems.',
  },
];

const skillCategories = [
  {
    title: 'Mechanical & CAD',
    skills: [
      { name: 'SolidWorks', icon: FaCogs },
      { name: 'Aspire', icon: FaCubes },
      { name: 'DXF / G-Code', icon: FaDraftingCompass },
      { name: 'CNC Machining', icon: FaIndustry },
    ],
  },
  {
    title: 'Software (Part-time)',
    skills: [
      { name: 'PHP', icon: SiPhp },
      { name: 'Laravel', icon: SiLaravel },
      { name: 'React', icon: SiReact },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'Python', icon: SiPython },
    ],
  },
  {
    title: 'DevOps & Server Mgmt',
    skills: [
      { name: 'Ubuntu', icon: SiUbuntu },
      { name: 'Linux', icon: SiLinux },
      { name: 'Nginx', icon: SiNginx },
      { name: 'Docker', icon: SiDocker },
      { name: 'Git', icon: SiGit },
      { name: 'AWS', icon: SiAmazonwebservices },
    ],
  },
];

const certifications = [
  { title: 'Google Scholar — Published Researcher', link: 'https://scholar.google.com/citations?user=MxLBLrYAAAAJ' },
];

const Resume = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Resume — Adil Aziz"
        description="Resume of Adil Aziz — Techno-Industrialist. Experience in mechanical engineering management at Sufi Engineering, software consulting, CNC/CAD skills, and education from NUST and University of the Punjab."
        path="/resume"
      />
      <Navbar />
      <ScrollToTop />
      <PageTransition>

        {/* Header */}
        <section className="pt-32 pb-12 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 -right-32 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                My <span className="gradient-text">Resume</span>
              </motion.h1>
              <motion.p variants={fadeUp} custom={1} className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl">
                Techno-Industrialist — mechanical engineering management (full-time) and software engineering consulting (part-time).
              </motion.p>
              <motion.div variants={fadeUp} custom={2} className="mt-6">
                <a
                  href="https://drive.google.com/file/d/placeholder"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                >
                  <FiDownload className="w-4 h-4" /> Download PDF
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Experience */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                  <FiBriefcase className="w-5 h-5 text-primary-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Work Experience</h2>
              </motion.div>

              <div className="space-y-6">
                {experience.map((job, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    custom={i}
                    className="glass-card p-6 md:p-8"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.role}</h3>
                        <p className="text-primary-500 font-medium">{job.company}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{job.location}</p>
                      </div>
                      <span className="tag text-xs shrink-0">{job.period}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{job.description}</p>
                    <ul className="space-y-2">
                      {job.highlights.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Education */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                  <FiBookOpen className="w-5 h-5 text-primary-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h2>
              </motion.div>

              <div className="space-y-6">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    custom={i}
                    className="glass-card p-6 md:p-8"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                        <p className="text-primary-500 font-medium">{edu.institution}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{edu.location}</p>
                      </div>
                      <span className="tag text-xs shrink-0">{edu.period}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{edu.details}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-12 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/20 dark:via-primary-950/10 to-transparent pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                  <FiSettings className="w-5 h-5 text-primary-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skills & Tools</h2>
              </motion.div>

              <div className="grid sm:grid-cols-3 gap-6">
                {skillCategories.map(({ title, skills }, i) => (
                  <motion.div
                    key={title}
                    variants={fadeUp}
                    custom={i}
                    className="glass-card p-6"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
                      {title}
                    </h3>
                    <div className="space-y-3">
                      {skills.map(({ name, icon: Icon }) => (
                        <div key={name} className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{name}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Certifications / Research */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                  <FiAward className="w-5 h-5 text-primary-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Research & Certifications</h2>
              </motion.div>

              <div className="space-y-4">
                {certifications.map(({ title, link }, i) => (
                  <motion.a
                    key={i}
                    variants={fadeUp}
                    custom={i}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-card p-5 flex items-center justify-between group hover:border-primary-200 dark:hover:border-primary-800 transition-colors"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">{title}</span>
                    <FiExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <div className="pb-20" />

      </PageTransition>
      <Footer />
    </div>
  );
};

export default Resume;
