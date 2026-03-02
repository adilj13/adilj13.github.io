import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiHeart, FiInstagram } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';

const socialLinks = [
  { href: 'https://github.com/adilj13', icon: FiGithub, label: 'GitHub' },
  { href: 'https://x.com/adilj13', icon: FiTwitter, label: 'X / Twitter' },
  { href: 'https://linkedin.com/in/adilj13', icon: FiLinkedin, label: 'LinkedIn' },
  { href: 'https://instagram.com/adilj13', icon: FiInstagram, label: 'Instagram' },
  { href: 'https://tiktok.com/@adilj13', icon: FaTiktok, label: 'TikTok' },
  { href: 'mailto:adil@aziz.pk', icon: FiMail, label: 'Email' },
];

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/work', label: 'Work' },
  { to: '/writing', label: 'Writing' },
  { to: '/philosophy', label: 'Philosophy' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-gray-200/50 dark:border-gray-800/50">
      {/* Gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
                AA
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Adil<span className="text-primary-500">.</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
              Techno-Industrialist. Full-time mechanical engineering at Sufi Engineering. Part-time software consultant.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl text-gray-400 hover:text-primary-500 bg-gray-100 dark:bg-gray-800/50 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-200/50 dark:border-gray-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Adil Aziz. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 flex items-center gap-1">
            Made with <FiHeart className="w-3.5 h-3.5 text-red-500" /> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}