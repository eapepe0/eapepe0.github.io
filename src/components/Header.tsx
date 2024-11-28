import React from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../context/LanguageContext';

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useLanguage();

  return (
    <header className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 transition-colors duration-200">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold dark:text-white"
          >
            CO
          </motion.div>

          {/* Escritorio Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <LanguageToggle />
              <SocialLinks />
            </div>
          </div>

          {/* Mobil Menu Buton */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <LanguageToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="text-gray-600 dark:text-gray-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobil Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pt-4 pb-6"
          >
            <div className="flex flex-col space-y-4">
              <NavLinks />
              <div className="flex justify-center space-x-6 pt-4">
                <SocialLinks />
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

const NavLinks = () => {
  const { t } = useLanguage();
  const links = [
    { key: 'home', href: '#home' },
    { key: 'projects', href: '#projects' },
    { key: 'skills', href: '#skills' },
    { key: 'contact', href: '#contact' }
  ];

  return (
    <>
      {links.map(({ key, href }) => (
        <a
          key={key}
          href={href}
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
        >
          {t(key)}
        </a>
      ))}
    </>
  );
};

const SocialLinks = () => (
  <>
    <a
      href="https://github.com/eapepe0"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
      aria-label="GitHub"
    >
      <Github size={20} />
    </a>
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
      aria-label="LinkedIn"
    >
      <Linkedin size={20} />
    </a>
    <a
      href="mailto:cristian_oyola@outlook.com"
      className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
      aria-label="Email"
    >
      <Mail size={20} />
    </a>
  </>
);