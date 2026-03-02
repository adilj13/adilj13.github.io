import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiExternalLink, FiGithub, FiCode, FiStar, FiGitBranch,
  FiAlertCircle, FiRefreshCw, FiSearch, FiX,
  FiBriefcase, FiAward, FiUsers, FiTrendingUp,
  FiCheckCircle, FiArrowRight, FiGlobe, FiServer,
  FiTool, FiPackage, FiCpu, FiMessageSquare,
  FiBookOpen, FiSettings, FiDownload,
} from 'react-icons/fi';
import {
  SiReact, SiPython, SiJavascript, SiPhp,
  SiDocker, SiGit, SiLinux,
  SiAmazonwebservices, SiUbuntu,
  SiLaravel, SiNginx,
} from 'react-icons/si';
import { FaCogs, FaDraftingCompass, FaCubes, FaIndustry } from 'react-icons/fa';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import SEO from '../components/SEO';
import portfolioData from '../data/portfolio.json';
import resumeData from '../data/resume.json';

// ──────────────────────────────────────────
//  ANIMATION HELPERS
// ──────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: 'easeOut' },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.05 } },
};

// ──────────────────────────────────────────
//  TABS
// ──────────────────────────────────────────

const TABS = [
  { id: 'projects', label: 'Projects', icon: FiCode },
  { id: 'portfolio', label: 'Portfolio', icon: FiBriefcase },
  { id: 'resume', label: 'Resume', icon: FiBookOpen },
];

// ──────────────────────────────────────────
//  PROJECTS CONFIG
// ──────────────────────────────────────────

const GITHUB_USERNAME = 'adilj13';
const GITHUB_ORGS = ['PUCITHD', 'SufiEngineering'];

const langColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Dart: '#00B4AB',
  Dockerfile: '#384d54',
  Vue: '#41b883',
  SCSS: '#c6538c',
  Jupyter: '#DA5B0B',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
};

// ──────────────────────────────────────────
//  PORTFOLIO DATA (from JSON)
// ──────────────────────────────────────────

const clients = portfolioData.clients;

const serviceIcons = [FiCode, FiServer, FiGlobe, FiCpu, FiPackage, FiTool];
const services = portfolioData.services.map((s, i) => ({ ...s, icon: serviceIcons[i] }));
const testimonials = portfolioData.testimonials;

// ──────────────────────────────────────────
//  RESUME DATA (from JSON)
// ──────────────────────────────────────────

const experience = resumeData.experience;
const education = resumeData.education;

const skillIconMap = {
  'SolidWorks': FaCogs, 'Aspire': FaCubes, 'DXF / G-Code': FaDraftingCompass, 'CNC Machining': FaIndustry,
  'PHP': SiPhp, 'Laravel': SiLaravel, 'React': SiReact, 'JavaScript': SiJavascript, 'Python': SiPython,
  'Ubuntu': SiUbuntu, 'Linux': SiLinux, 'Nginx': SiNginx, 'Docker': SiDocker, 'Git': SiGit, 'AWS': SiAmazonwebservices,
};
const skillCategories = resumeData.skillCategories.map((cat) => ({
  ...cat,
  skills: cat.skills.map((name) => ({ name, icon: skillIconMap[name] || null })),
}));
const certifications = resumeData.certifications;

// ──────────────────────────────────────────
//  SKELETON
// ──────────────────────────────────────────

const SkeletonCard = () => (
  <div className="glass-card p-6 animate-pulse">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700 shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
        </div>
        <div className="flex gap-2">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16" />
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-12" />
        </div>
      </div>
    </div>
  </div>
);

// ──────────────────────────────────────────
//  COMPONENT
// ──────────────────────────────────────────

const Work = () => {
  const [activeTab, setActiveTab] = useState('projects');

  // ── Projects state ──
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('updated');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const ownedRes = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=owner`
      );
      if (!ownedRes.ok) throw new Error(`GitHub API error: ${ownedRes.status}`);
      const ownedRepos = await ownedRes.json();

      const forkedRes = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=forks`
      );
      const forkedRepos = forkedRes.ok ? await forkedRes.json() : [];

      const orgRepoPromises = GITHUB_ORGS.map(async (org) => {
        try {
          const res = await fetch(
            `https://api.github.com/orgs/${org}/repos?per_page=100&sort=updated`
          );
          if (!res.ok) return [];
          const orgRepos = await res.json();
          return orgRepos.map((r) => ({ ...r, _org: org }));
        } catch {
          return [];
        }
      });
      const orgReposArrays = await Promise.all(orgRepoPromises);
      const allOrgRepos = orgReposArrays.flat();

      const seen = new Set();
      const allRepos = [];
      [...ownedRepos, ...forkedRepos, ...allOrgRepos].forEach((r) => {
        if (!seen.has(r.full_name)) {
          seen.add(r.full_name);
          allRepos.push(r);
        }
      });
      setRepos(allRepos);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const languages = [...new Set(repos.map((r) => r.language).filter(Boolean))].sort();
  const orgsWithRepos = GITHUB_ORGS.filter((org) =>
    repos.some((r) => r._org === org || r.full_name.startsWith(org + '/'))
  );

  const filteredRepos = repos.filter((repo) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        repo.name.toLowerCase().includes(q) ||
        (repo.description || '').toLowerCase().includes(q) ||
        (repo.language || '').toLowerCase().includes(q) ||
        (repo.topics || []).some((t) => t.toLowerCase().includes(q)) ||
        (repo.owner?.login || '').toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }
    if (activeFilter === 'all') return true;
    if (activeFilter === 'personal') return !repo.fork && repo.owner?.login === GITHUB_USERNAME;
    if (activeFilter === 'sources') return !repo.fork;
    if (activeFilter === 'forks') return repo.fork;
    if (activeFilter === 'starred') return repo.stargazers_count > 0;
    if (GITHUB_ORGS.includes(activeFilter)) {
      return repo._org === activeFilter || repo.full_name.startsWith(activeFilter + '/');
    }
    return repo.language === activeFilter;
  });

  const sortedRepos = [...filteredRepos].sort((a, b) => {
    if (sortBy === 'updated') return new Date(b.updated_at) - new Date(a.updated_at);
    if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'created') return new Date(b.created_at) - new Date(a.created_at);
    return 0;
  });

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);
  const personalCount = repos.filter((r) => r.owner?.login === GITHUB_USERNAME).length;
  const orgCount = repos.filter((r) => r.owner?.login !== GITHUB_USERNAME).length;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 30) return `${diffDays}d ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
    return `${Math.floor(diffDays / 365)}y ago`;
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Work - Adil Aziz"
        description="Projects, portfolio, and resume of Adil Aziz. GitHub repositories, client case studies, work experience, education, and skills."
        path="/work"
      />
      <Navbar />
      <ScrollToTop />
      <PageTransition>

        {/* ─── Hero ─── */}
        <section className="pt-28 pb-12 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-500/10">
                  <FiBriefcase className="w-6 h-6 text-primary-500" />
                </div>
                <span className="tag">Projects, Portfolio &amp; Resume</span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
                My <span className="gradient-text">Work</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Open-source projects, client engagements, and my professional background - all in one place.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ─── Tabs ─── */}
        <section className="sticky top-16 z-30 pb-1">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-xl p-1.5 flex gap-1">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === id
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Tab Content ─── */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">

              {/* ════════════════════════════════════════════
                   PROJECTS TAB
                 ════════════════════════════════════════════ */}
              {activeTab === 'projects' && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Stats */}
                  {!loading && !error && (
                    <div className="flex flex-wrap gap-6 mb-8">
                      {[
                        { icon: FiCode, label: 'Repositories', value: repos.length },
                        { icon: FiGithub, label: 'Personal', value: personalCount },
                        { icon: FiGithub, label: 'Org', value: orgCount },
                        { icon: FiStar, label: 'Stars', value: totalStars },
                        { icon: FiGitBranch, label: 'Forks', value: totalForks },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Icon className="w-4 h-4 text-primary-500" />
                          <span><strong className="text-gray-900 dark:text-white">{value}</strong> {label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Filters & Sort */}
                  {!loading && !error && (
                    <div className="space-y-4 mb-8">
                      {/* Search */}
                      <div className="relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search repositories by name, description, language, or topic..."
                          className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-sm"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Filters */}
                      <div className="flex flex-wrap gap-2">
                        {[
                          { key: 'all', label: 'All' },
                          { key: 'personal', label: 'Personal' },
                          ...orgsWithRepos.map((org) => ({ key: org, label: org })),
                          { key: 'forks', label: 'Forks' },
                          { key: 'starred', label: 'Starred' },
                          ...languages.map((l) => ({ key: l, label: l })),
                        ].map(({ key, label }) => (
                          <button
                            key={key}
                            onClick={() => setActiveFilter(key)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                              activeFilter === key
                                ? 'bg-primary-600 text-white shadow-sm'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>

                      {/* Sort */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
                        {[
                          { key: 'updated', label: 'Recently Updated' },
                          { key: 'created', label: 'Newest' },
                          { key: 'stars', label: 'Stars' },
                          { key: 'name', label: 'Name' },
                        ].map(({ key, label }) => (
                          <button
                            key={key}
                            onClick={() => setSortBy(key)}
                            className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                              sortBy === key
                                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Loading */}
                  {loading && (
                    <div className="grid sm:grid-cols-2 gap-5">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonCard key={i} />
                      ))}
                    </div>
                  )}

                  {/* Error */}
                  {error && (
                    <div className="text-center py-16">
                      <div className="glass-card p-10 max-w-md mx-auto">
                        <FiAlertCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Failed to load projects</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{error}</p>
                        <button onClick={fetchRepos} className="btn-primary">
                          <FiRefreshCw className="w-4 h-4" /> Try Again
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Repo Grid */}
                  {!loading && !error && (
                    <>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeFilter + sortBy}
                          initial="hidden"
                          animate="visible"
                          variants={stagger}
                          className="grid sm:grid-cols-2 gap-5"
                        >
                          {sortedRepos.map((repo, i) => (
                            <motion.div
                              key={repo.id}
                              variants={fadeUp}
                              custom={i}
                              layout
                              className="glass-card p-6 group hover:border-primary-200 dark:hover:border-primary-800 transition-colors relative flex flex-col"
                            >
                              {/* Badges */}
                              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                                {repo.owner?.login !== GITHUB_USERNAME && (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 uppercase tracking-wider">
                                    {repo.owner?.login}
                                  </span>
                                )}
                                {repo.fork && (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Fork
                                  </span>
                                )}
                              </div>

                              <div className="flex items-start gap-4 flex-1">
                                <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-500/10 shrink-0">
                                  <FiGithub className="w-6 h-6 text-primary-500" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-bold text-gray-900 dark:text-white text-lg hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                                  >
                                    {repo.owner?.login !== GITHUB_USERNAME && (
                                      <span className="text-gray-400 dark:text-gray-500 font-medium">{repo.owner?.login}/</span>
                                    )}
                                    {repo.name}
                                  </a>

                                  {repo.description ? (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-1 mb-3 line-clamp-2">
                                      {repo.description}
                                    </p>
                                  ) : (
                                    <p className="text-sm text-gray-400 dark:text-gray-500 italic mt-1 mb-3">No description</p>
                                  )}

                                  {/* Meta */}
                                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                    {repo.language && (
                                      <span className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: langColors[repo.language] || '#8b8b8b' }} />
                                        {repo.language}
                                      </span>
                                    )}
                                    {repo.stargazers_count > 0 && (
                                      <span className="flex items-center gap-1"><FiStar className="w-3.5 h-3.5" />{repo.stargazers_count}</span>
                                    )}
                                    {repo.forks_count > 0 && (
                                      <span className="flex items-center gap-1"><FiGitBranch className="w-3.5 h-3.5" />{repo.forks_count}</span>
                                    )}
                                    <span>Updated {formatDate(repo.updated_at)}</span>
                                  </div>

                                  {/* Topics */}
                                  {repo.topics && repo.topics.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                      {repo.topics.slice(0, 5).map((topic) => (
                                        <span key={topic} className="px-2 py-0.5 rounded text-[10px] font-medium bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400">
                                          {topic}
                                        </span>
                                      ))}
                                      {repo.topics.length > 5 && (
                                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                          +{repo.topics.length - 5}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Footer links */}
                              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                                <a href={repo.html_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                                  <FiGithub className="w-4 h-4" /> Source
                                </a>
                                {repo.homepage && (
                                  <a href={repo.homepage} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                                    <FiExternalLink className="w-4 h-4" /> Live
                                  </a>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </AnimatePresence>

                      {sortedRepos.length === 0 && (
                        <div className="text-center py-20">
                          <FiSearch className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                          <p className="text-gray-400 dark:text-gray-500">
                            {searchQuery ? `No repositories found for "${searchQuery}"` : 'No repositories match this filter.'}
                          </p>
                          {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="mt-3 text-sm text-primary-500 hover:text-primary-600 font-medium">
                              Clear search
                            </button>
                          )}
                        </div>
                      )}

                      {/* GitHub CTA */}
                      <div className="mt-12">
                        <div className="glass-card p-8 md:p-12 text-center">
                          <h2 className="text-2xl md:text-3xl font-bold mb-4">
                            Find more on <span className="gradient-text">GitHub</span>
                          </h2>
                          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-xl mx-auto">
                            I actively contribute to open source. Check out my GitHub profile for contribution graphs, activity, and more.
                          </p>
                          <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="btn-primary">
                            <FiGithub className="w-4 h-4" /> View GitHub Profile
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {/* ════════════════════════════════════════════
                   PORTFOLIO TAB
                 ════════════════════════════════════════════ */}
              {activeTab === 'portfolio' && (
                <motion.div
                  key="portfolio"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
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
                  </div>

                  {/* Client Case Studies */}
                  <div className="space-y-12 mb-16">
                    {clients.map((client, idx) => (
                      <motion.div
                        key={client.name}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ delay: idx * 0.1, duration: 0.6 }}
                        className="glass-card overflow-hidden"
                      >
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
                                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">{client.name}</h3>
                                  {client.website && (
                                    <a href={client.website} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary-500 transition-colors">
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

                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">{client.description}</p>

                          <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                <FiCheckCircle className="w-4 h-4 text-primary-500" /> Services Delivered
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
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                <FiTrendingUp className="w-4 h-4 text-primary-500" /> Key Results
                              </h4>
                              <div className="grid grid-cols-3 gap-3">
                                {client.results.map((result) => (
                                  <div key={result.metric} className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                                    <div className={`text-xl font-bold ${client.accentText}`}>{result.value}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{result.metric}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {client.technologies.map((tech) => (
                              <span key={tech} className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-gray-700/50">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Services */}
                  <div className="mb-16">
                    <div className="text-center mb-8">
                      <h2 className="section-heading">What I <span className="gradient-text">Offer</span></h2>
                      <p className="section-subheading">Consulting services available for your organization</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {services.map(({ icon: Icon, title, description }, i) => (
                        <motion.div
                          key={title}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-50px' }}
                          transition={{ delay: i * 0.05, duration: 0.5 }}
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
                    </div>
                  </div>

                  {/* Testimonials */}
                  <div className="mb-16">
                    <div className="text-center mb-8">
                      <h2 className="section-heading">Client <span className="gradient-text">Testimonials</span></h2>
                      <p className="section-subheading">What my clients say about working with me</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                      {testimonials.map((t, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-50px' }}
                          transition={{ delay: i * 0.05, duration: 0.5 }}
                          className="glass-card p-6 flex flex-col"
                        >
                          <FiStar className="w-5 h-5 text-primary-500 mb-4" />
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed italic flex-1">&ldquo;{t.quote}&rdquo;</p>
                          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.author}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Process */}
                  <div className="mb-16">
                    <div className="text-center mb-8">
                      <h2 className="section-heading">How I <span className="gradient-text">Work</span></h2>
                      <p className="section-subheading">My consulting engagement process</p>
                    </div>
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
                          <div className="absolute left-5 top-10 bottom-0 w-px bg-gray-200 dark:bg-gray-800 group-last:hidden" />
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

                  {/* CTA */}
                  <div className="glass-card p-8 md:p-12 text-center">
                    <div className="w-14 h-14 rounded-xl bg-primary-500/10 flex items-center justify-center mx-auto mb-6">
                      <FiMessageSquare className="w-7 h-7 text-primary-500" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      Have a project in <span className="gradient-text">mind</span>?
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto mb-8">
                      I&apos;m available for software engineering consulting, server management, and technical strategy.
                      Let&apos;s discuss how I can help your organization.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Link to="/contact" className="btn-primary">
                        Get in Touch <FiArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ════════════════════════════════════════════
                   RESUME TAB
                 ════════════════════════════════════════════ */}
              {activeTab === 'resume' && (
                <motion.div
                  key="resume"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Download button */}
                  <div className="mb-10">
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                      Techno-Industrialist - mechanical engineering management (full-time) and software engineering consulting (part-time).
                    </p>
                    <a
                      href="https://drive.google.com/file/d/placeholder"
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary inline-flex"
                    >
                      <FiDownload className="w-4 h-4" /> Download PDF
                    </a>
                  </div>

                  {/* Experience */}
                  <div className="mb-12">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                        <FiBriefcase className="w-5 h-5 text-primary-500" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Work Experience</h2>
                    </div>
                    <div className="space-y-6">
                      {experience.map((job, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-50px' }}
                          transition={{ delay: i * 0.05, duration: 0.5 }}
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
                  </div>

                  {/* Education */}
                  <div className="mb-12">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                        <FiBookOpen className="w-5 h-5 text-primary-500" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h2>
                    </div>
                    <div className="space-y-6">
                      {education.map((edu, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-50px' }}
                          transition={{ delay: i * 0.05, duration: 0.5 }}
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
                  </div>

                  {/* Skills */}
                  <div className="mb-12">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                        <FiSettings className="w-5 h-5 text-primary-500" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skills &amp; Tools</h2>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-6">
                      {skillCategories.map(({ title, skills }, i) => (
                        <motion.div
                          key={title}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-50px' }}
                          transition={{ delay: i * 0.05, duration: 0.5 }}
                          className="glass-card p-6"
                        >
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">{title}</h3>
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
                  </div>

                  {/* Certifications */}
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                        <FiAward className="w-5 h-5 text-primary-500" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Research &amp; Certifications</h2>
                    </div>
                    <div className="space-y-4">
                      {certifications.map(({ title, link }, i) => (
                        <a
                          key={i}
                          href={link}
                          target="_blank"
                          rel="noreferrer"
                          className="glass-card p-5 flex items-center justify-between group hover:border-primary-200 dark:hover:border-primary-800 transition-colors block"
                        >
                          <span className="font-medium text-gray-900 dark:text-white">{title}</span>
                          <FiExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </section>

      </PageTransition>
      <Footer />
    </div>
  );
};

export default Work;
