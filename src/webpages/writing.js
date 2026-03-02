import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiBookOpen, FiArrowRight, FiExternalLink, FiUsers, FiCalendar,
  FiHash, FiFileText, FiMessageCircle, FiHeart, FiRepeat,
  FiAward,
} from 'react-icons/fi';
import { SiGooglescholar, SiBluesky } from 'react-icons/si';
import parse from 'html-react-parser';
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
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

// ──────────────────────────────────────────
//  TABS
// ──────────────────────────────────────────

const TABS = [
  { id: 'blog', label: 'Blog', icon: FiBookOpen },
  { id: 'publications', label: 'Publications', icon: FiFileText },
  { id: 'bluesky', label: 'Bluesky', icon: SiBluesky },
];

// ──────────────────────────────────────────
//  PUBLICATIONS DATA (static)
// ──────────────────────────────────────────

const SCHOLAR_URL = 'https://scholar.google.com/citations?user=MxLBLrYAAAAJ&hl=en';

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
    keywords: ['Usability Testing', 'IFML', 'Web UI', 'User Experience', 'Model-Driven Engineering'],
    color: 'from-amber-500 to-orange-600',
  },
];

// ──────────────────────────────────────────
//  SKELETON LOADERS
// ──────────────────────────────────────────

const SkeletonBlogCard = () => (
  <div className="glass-card p-0 overflow-hidden animate-pulse">
    <div className="aspect-video bg-gray-200 dark:bg-gray-800" />
    <div className="p-6 space-y-3">
      <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4" />
      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-lg w-full" />
      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-lg w-5/6" />
    </div>
  </div>
);

const SkeletonBskyPost = () => (
  <div className="glass-card p-6 animate-pulse space-y-3">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800" />
      <div className="space-y-1.5">
        <div className="h-3.5 bg-gray-200 dark:bg-gray-800 rounded w-28" />
        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-20" />
      </div>
    </div>
    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
  </div>
);

// ──────────────────────────────────────────
//  HELPER: relative time
// ──────────────────────────────────────────

function timeAgo(dateStr) {
  const now = new Date();
  const d = new Date(dateStr);
  const diff = (now - d) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ──────────────────────────────────────────
//  COMPONENT
// ──────────────────────────────────────────

const Writing = () => {
  const [activeTab, setActiveTab] = useState('blog');

  // Blog state
  const [blogs, setBlogs] = useState([]);
  const [blogLoaded, setBlogLoaded] = useState(false);
  const [blogError, setBlogError] = useState(null);

  // Bluesky state
  const [bskyPosts, setBskyPosts] = useState([]);
  const [bskyLoaded, setBskyLoaded] = useState(false);
  const [bskyError, setBskyError] = useState(null);
  const [bskyProfile, setBskyProfile] = useState(null);

  // Fetch blog posts
  useEffect(() => {
    fetch(
      'https://public-api.wordpress.com/rest/v1.1/sites/adilj13.wordpress.com/posts/?order_by=date&order=DESC&fields=title,slug,excerpt,featured_image'
    )
      .then((res) => res.json())
      .then(
        (data) => {
          setBlogLoaded(true);
          setBlogs(data.posts || []);
        },
        (err) => {
          setBlogLoaded(true);
          setBlogError(err);
        }
      );
  }, []);

  // Fetch Bluesky posts + profile
  useEffect(() => {
    const BSKY_ACTOR = 'adil.aziz.pk';
    const BASE = 'https://public.api.bsky.app/xrpc';

    Promise.all([
      fetch(`${BASE}/app.bsky.feed.getAuthorFeed?actor=${BSKY_ACTOR}&limit=20&filter=posts_no_replies`).then((r) => r.json()),
      fetch(`${BASE}/app.bsky.actor.getProfile?actor=${BSKY_ACTOR}`).then((r) => r.json()),
    ])
      .then(([feedData, profileData]) => {
        setBskyLoaded(true);
        setBskyPosts(feedData.feed || []);
        setBskyProfile(profileData);
      })
      .catch((err) => {
        setBskyLoaded(true);
        setBskyError(err);
      });
  }, []);

  // Build Bluesky post URL from AT URI
  const getBskyPostUrl = (uri) => {
    // uri: at://did:plc:xxx/app.bsky.feed.post/yyy
    const parts = uri.split('/');
    const rkey = parts[parts.length - 1];
    return `https://bsky.app/profile/adil.aziz.pk/post/${rkey}`;
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Writing - Adil Aziz"
        description="Blog posts, academic publications, and Bluesky posts by Adil Aziz. Thoughts on software engineering, mechanical engineering, blockchain research, and more."
        path="/writing"
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
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-3xl"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-500/10">
                  <FiBookOpen className="w-6 h-6 text-primary-500" />
                </div>
                <span className="tag">Writing &amp; Research</span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
                My <span className="gradient-text">Writing</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Blog articles, academic publications, and social posts - all in one place.
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

              {/* ────── BLOG TAB ────── */}
              {activeTab === 'blog' && (
                <motion.div
                  key="blog"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {blogError ? (
                    <div className="glass-card p-8 text-center">
                      <p className="text-red-500 text-lg">Error loading posts: {blogError.message}</p>
                      <p className="text-gray-500 mt-2">Please try again later.</p>
                    </div>
                  ) : !blogLoaded ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(6)].map((_, i) => (
                        <SkeletonBlogCard key={i} />
                      ))}
                    </div>
                  ) : blogs.length === 0 ? (
                    <div className="glass-card p-12 text-center">
                      <FiBookOpen className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">No blog posts yet.</p>
                    </div>
                  ) : (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={stagger}
                      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      {blogs.map((blog, i) => (
                        <motion.div key={blog.slug} variants={fadeUp} custom={i}>
                          <Link to={`/blog/${blog.slug}`} className="group block">
                            <div className="glass-card overflow-hidden h-full hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300">
                              {blog.featured_image && (
                                <div className="relative overflow-hidden aspect-video">
                                  <img
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    src={blog.featured_image}
                                    alt={parse(blog.title)}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                              )}
                              <div className="p-6">
                                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
                                  {parse(blog.title)}
                                </h3>
                                <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
                                  {parse(blog.excerpt)}
                                </div>
                                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  Read more <FiArrowRight className="w-4 h-4" />
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* ────── PUBLICATIONS TAB ────── */}
              {activeTab === 'publications' && (
                <motion.div
                  key="publications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Scholar stats bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex flex-wrap gap-4">
                      {[
                        { label: 'Publications', value: publications.length, icon: FiFileText },
                        { label: 'Citations', value: 6, icon: FiHash },
                        { label: 'h-index', value: 1, icon: FiAward },
                      ].map(({ label, value, icon: Icon }) => (
                        <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                          <Icon className="w-3.5 h-3.5 text-primary-500" />
                          <span className="text-sm font-bold text-gray-900 dark:text-white">{value}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
                        </div>
                      ))}
                    </div>
                    <a
                      href={SCHOLAR_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium hover:bg-primary-500/20 transition-colors"
                    >
                      <SiGooglescholar className="w-4 h-4" />
                      Google Scholar
                      <FiExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Publication cards */}
                  <div className="space-y-6">
                    {publications.map((pub, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className="glass-card overflow-hidden"
                      >
                        <div className={`h-1.5 bg-gradient-to-r ${pub.color}`} />
                        <div className="p-6 md:p-8">
                          {/* Header */}
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 flex-wrap mb-2">
                                <span className="tag text-xs">{pub.type}</span>
                                <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                  <FiCalendar className="w-3 h-3" /> {pub.year}
                                </span>
                              </div>
                              <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white leading-tight">
                                {pub.title}
                              </h3>
                            </div>
                            <a
                              href={pub.scholarUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-medium hover:bg-primary-500/20 transition-colors"
                            >
                              <SiGooglescholar className="w-3.5 h-3.5" />
                              Scholar
                              <FiExternalLink className="w-3 h-3" />
                            </a>
                          </div>

                          {/* Authors */}
                          <div className="flex items-center gap-2 mb-3">
                            <FiUsers className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {pub.authors.map((author, i) => (
                                <span key={i}>
                                  <span className={author === 'A Aziz' ? 'font-semibold text-primary-600 dark:text-primary-400' : ''}>
                                    {author}
                                  </span>
                                  {i < pub.authors.length - 1 && ', '}
                                </span>
                              ))}
                            </p>
                          </div>

                          {/* Venue */}
                          <p className="text-sm text-gray-500 dark:text-gray-500 italic mb-4">{pub.venue}</p>

                          {/* Keywords + Citations */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex flex-wrap gap-1.5">
                              {pub.keywords.map((kw) => (
                                <span
                                  key={kw}
                                  className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-gray-700/50"
                                >
                                  {kw}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200/50 dark:border-primary-800/50 shrink-0">
                              <FiHash className="w-3.5 h-3.5 text-primary-500" />
                              <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{pub.citations}</span>
                              <span className="text-xs text-primary-500/70">{pub.citations === 1 ? 'citation' : 'citations'}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ────── BLUESKY TAB ────── */}
              {activeTab === 'bluesky' && (
                <motion.div
                  key="bluesky"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Profile header */}
                  {bskyProfile && (
                    <div className="glass-card p-6 mb-8">
                      <div className="flex items-center gap-4">
                        {bskyProfile.avatar && (
                          <img
                            src={bskyProfile.avatar}
                            alt={bskyProfile.displayName}
                            className="w-14 h-14 rounded-full border-2 border-primary-200 dark:border-primary-800"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                            {bskyProfile.displayName}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">@{bskyProfile.handle}</p>
                        </div>
                        <div className="hidden sm:flex items-center gap-6 text-center">
                          <div>
                            <div className="text-lg font-bold text-gray-900 dark:text-white">{bskyProfile.postsCount ?? 0}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Posts</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-gray-900 dark:text-white">{bskyProfile.followersCount ?? 0}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Followers</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-gray-900 dark:text-white">{bskyProfile.followsCount ?? 0}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Following</div>
                          </div>
                        </div>
                        <a
                          href="https://bsky.app/profile/adil.aziz.pk"
                          target="_blank"
                          rel="noreferrer"
                          className="btn-primary text-sm !py-2 !px-4"
                        >
                          <SiBluesky className="w-4 h-4" />
                          <span className="hidden sm:inline">Follow</span>
                        </a>
                      </div>
                      {bskyProfile.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                          {bskyProfile.description}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Posts */}
                  {bskyError ? (
                    <div className="glass-card p-8 text-center">
                      <p className="text-red-500 text-lg">Error loading Bluesky posts</p>
                      <p className="text-gray-500 mt-2">Please try again later.</p>
                    </div>
                  ) : !bskyLoaded ? (
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <SkeletonBskyPost key={i} />
                      ))}
                    </div>
                  ) : bskyPosts.length === 0 ? (
                    <div className="glass-card p-12 text-center">
                      <SiBluesky className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">No posts yet.</p>
                    </div>
                  ) : (
                    <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-4">
                      {bskyPosts.map(({ post }, i) => {
                        const text = post.record?.text || '';
                        const images = post.embed?.images || post.embed?.media?.images || [];
                        const externalEmbed = post.embed?.external || null;

                        return (
                          <motion.a
                            key={post.uri}
                            href={getBskyPostUrl(post.uri)}
                            target="_blank"
                            rel="noreferrer"
                            variants={fadeUp}
                            custom={i}
                            className="glass-card p-5 block group hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
                          >
                            {/* Post header */}
                            <div className="flex items-center gap-3 mb-3">
                              {post.author?.avatar && (
                                <img
                                  src={post.author.avatar}
                                  alt=""
                                  className="w-10 h-10 rounded-full"
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                  {post.author?.displayName}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  @{post.author?.handle} · {timeAgo(post.record?.createdAt)}
                                </p>
                              </div>
                              <SiBluesky className="w-4 h-4 text-blue-500 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Post text */}
                            <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap mb-3">
                              {text}
                            </p>

                            {/* Embedded images */}
                            {images.length > 0 && (
                              <div className={`grid gap-2 mb-3 ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                {images.map((img, j) => (
                                  <img
                                    key={j}
                                    src={img.thumb || img.fullsize}
                                    alt={img.alt || ''}
                                    className="w-full rounded-xl object-cover max-h-72"
                                  />
                                ))}
                              </div>
                            )}

                            {/* External link embed */}
                            {externalEmbed && (
                              <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-3">
                                {externalEmbed.thumb && (
                                  <img src={externalEmbed.thumb} alt="" className="w-full h-36 object-cover" />
                                )}
                                <div className="p-3">
                                  <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
                                    {externalEmbed.title}
                                  </p>
                                  {externalEmbed.description && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                                      {externalEmbed.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Engagement */}
                            <div className="flex items-center gap-5 text-xs text-gray-400 dark:text-gray-500">
                              <span className="flex items-center gap-1">
                                <FiMessageCircle className="w-3.5 h-3.5" /> {post.replyCount || 0}
                              </span>
                              <span className="flex items-center gap-1">
                                <FiRepeat className="w-3.5 h-3.5" /> {post.repostCount || 0}
                              </span>
                              <span className="flex items-center gap-1">
                                <FiHeart className="w-3.5 h-3.5" /> {post.likeCount || 0}
                              </span>
                            </div>
                          </motion.a>
                        );
                      })}

                      {/* View more on Bluesky */}
                      <div className="text-center pt-4">
                        <a
                          href="https://bsky.app/profile/adil.aziz.pk"
                          target="_blank"
                          rel="noreferrer"
                          className="btn-secondary inline-flex"
                        >
                          <SiBluesky className="w-4 h-4" />
                          View all posts on Bluesky
                          <FiExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </motion.div>
                  )}
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

export default Writing;
