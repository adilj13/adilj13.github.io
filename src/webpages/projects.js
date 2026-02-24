import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiCode, FiStar, FiGitBranch, FiAlertCircle, FiRefreshCw, FiSearch, FiX } from 'react-icons/fi';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import SEO from '../components/SEO';

const GITHUB_USERNAME = 'adilj13';
const GITHUB_ORGS = ['PUCITHD', 'SufiEngineering'];

// Language → color mapping
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

// Skeleton card for loading state
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

const Projects = () => {
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
      // Fetch owned repos
      const ownedRes = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=owner`
      );
      if (!ownedRes.ok) throw new Error(`GitHub API error: ${ownedRes.status}`);
      const ownedRepos = await ownedRes.json();

      // Fetch forked repos
      const forkedRes = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=forks`
      );
      const forkedRepos = forkedRes.ok ? await forkedRes.json() : [];

      // Fetch repos from organizations
      const orgRepoPromises = GITHUB_ORGS.map(async (org) => {
        try {
          const res = await fetch(
            `https://api.github.com/orgs/${org}/repos?per_page=100&sort=updated`
          );
          if (!res.ok) return [];
          const orgRepos = await res.json();
          // Tag each repo with the org name for display
          return orgRepos.map((r) => ({ ...r, _org: org }));
        } catch {
          return [];
        }
      });
      const orgReposArrays = await Promise.all(orgRepoPromises);
      const allOrgRepos = orgReposArrays.flat();

      // Merge and deduplicate by full_name
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

  // Build language list for filters
  const languages = [...new Set(repos.map((r) => r.language).filter(Boolean))].sort();

  // Build org list for filters (only orgs that actually returned repos)
  const orgsWithRepos = GITHUB_ORGS.filter((org) =>
    repos.some((r) => r._org === org || r.full_name.startsWith(org + '/'))
  );

  // Filter
  const filteredRepos = repos.filter((repo) => {
    // Search filter
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
    // Check if filter is an org name
    if (GITHUB_ORGS.includes(activeFilter)) {
      return repo._org === activeFilter || repo.full_name.startsWith(activeFilter + '/');
    }
    return repo.language === activeFilter;
  });

  // Sort
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
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 30) return `${diffDays}d ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
    return `${Math.floor(diffDays / 365)}y ago`;
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Projects — Adil Aziz"
        description="Open source projects and GitHub repositories by Adil Aziz. Software engineering work including web apps, tools, and contributions to PUCITHD and Sufi Engineering."
        path="/projects"
      />
      <Navbar />
      <ScrollToTop />
      <PageTransition>

        {/* Hero */}
        <section className="pt-32 pb-12 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-3xl"
            >
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                My <span className="gradient-text">Projects</span>
              </motion.h1>
              <motion.p variants={fadeUp} custom={1} className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mt-4 max-w-2xl">
                All my repositories and contributions fetched live from GitHub — including
                my personal projects and work with <strong className="text-gray-900 dark:text-white">PUCITHD</strong> and <strong className="text-gray-900 dark:text-white">Sufi Engineering</strong>.
              </motion.p>

              {/* Stats */}
              {!loading && !error && (
                <motion.div variants={fadeUp} custom={2} className="flex flex-wrap gap-6 mt-8">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <FiCode className="w-4 h-4 text-primary-500" />
                    <span><strong className="text-gray-900 dark:text-white">{repos.length}</strong> Repositories</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <FiGithub className="w-4 h-4 text-primary-500" />
                    <span><strong className="text-gray-900 dark:text-white">{personalCount}</strong> Personal</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <FiGithub className="w-4 h-4 text-accent-500" />
                    <span><strong className="text-gray-900 dark:text-white">{orgCount}</strong> Org</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <FiStar className="w-4 h-4 text-primary-500" />
                    <span><strong className="text-gray-900 dark:text-white">{totalStars}</strong> Stars</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <FiGitBranch className="w-4 h-4 text-primary-500" />
                    <span><strong className="text-gray-900 dark:text-white">{totalForks}</strong> Forks</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Filters & Sort */}
        {!loading && !error && (
          <section className="pb-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                {/* Search bar */}
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

                {/* Filter buttons */}
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
              </motion.div>
            </div>
          </section>
        )}

        {/* Loading State */}
        {loading && (
          <section className="py-8 pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid sm:grid-cols-2 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Error State */}
        {error && (
          <section className="py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="glass-card p-10 max-w-md mx-auto">
                <FiAlertCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Failed to load projects
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{error}</p>
                <button onClick={fetchRepos} className="btn-primary">
                  <FiRefreshCw className="w-4 h-4" /> Try Again
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <section className="py-8 pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      {/* Fork / Org badge */}
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

                          {repo.description && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-1 mb-3 line-clamp-2">
                              {repo.description}
                            </p>
                          )}
                          {!repo.description && (
                            <p className="text-sm text-gray-400 dark:text-gray-500 italic mt-1 mb-3">
                              No description
                            </p>
                          )}

                          {/* Meta row */}
                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                            {repo.language && (
                              <span className="flex items-center gap-1.5">
                                <span
                                  className="w-2.5 h-2.5 rounded-full shrink-0"
                                  style={{ backgroundColor: langColors[repo.language] || '#8b8b8b' }}
                                />
                                {repo.language}
                              </span>
                            )}
                            {repo.stargazers_count > 0 && (
                              <span className="flex items-center gap-1">
                                <FiStar className="w-3.5 h-3.5" />
                                {repo.stargazers_count}
                              </span>
                            )}
                            {repo.forks_count > 0 && (
                              <span className="flex items-center gap-1">
                                <FiGitBranch className="w-3.5 h-3.5" />
                                {repo.forks_count}
                              </span>
                            )}
                            <span>Updated {formatDate(repo.updated_at)}</span>
                          </div>

                          {/* Topics */}
                          {repo.topics && repo.topics.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {repo.topics.slice(0, 5).map((topic) => (
                                <span
                                  key={topic}
                                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400"
                                >
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
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                        >
                          <FiGithub className="w-4 h-4" /> Source
                        </a>
                        {repo.homepage && (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                          >
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
                    {searchQuery
                      ? `No repositories found for "${searchQuery}"`
                      : 'No repositories match this filter.'}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-3 text-sm text-primary-500 hover:text-primary-600 font-medium"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* GitHub Profile CTA */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-12 text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Find more on <span className="gradient-text">GitHub</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-xl mx-auto">
                I actively contribute to open source. Check out my GitHub profile for
                contribution graphs, activity, and more.
              </p>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <FiGithub className="w-4 h-4" /> View GitHub Profile
              </a>
            </motion.div>
          </div>
        </section>

      </PageTransition>
      <Footer />
    </div>
  );
};

export default Projects;