import React, { useState, useEffect } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import ThemeToggle from './ThemeToggle';
import { FiMenu, FiX, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(NAV_ITEMS.map((item) => item.id), 120);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 origin-left z-50"
        style={{ scaleX }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 shadow-xs'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="group flex items-center space-x-2 font-bold text-xl cursor-pointer"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center text-white text-md font-extrabold shadow-md transform group-hover:rotate-12 transition-transform duration-300">
              R
            </span>
            <span className="text-slate-900 dark:text-white transition-colors duration-200">
              Raja<span className="text-violet-500 font-extrabold">.</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeId === item.id
                    ? 'text-violet-600 dark:text-violet-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {activeId === item.id && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-violet-50 dark:bg-violet-950/30 rounded-full -z-10 border border-violet-100/50 dark:border-violet-900/30"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 border-r border-slate-200 dark:border-slate-800 pr-4">
              <a
                href="https://github.com/rajajaiswal8414"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-500 hover:text-violet-500 dark:text-slate-400 dark:hover:text-violet-400 transition-colors"
                aria-label="GitHub"
              >
                <FiGithub className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/raja-jaiswal"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-500 hover:text-violet-500 dark:text-slate-400 dark:hover:text-violet-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:rajajaiswal8414@gmail.com"
                className="p-2 text-slate-500 hover:text-violet-500 dark:text-slate-400 dark:hover:text-violet-400 transition-colors"
                aria-label="Email"
              >
                <FiMail className="w-5 h-5" />
              </a>
            </div>
            <ThemeToggle />
            <button
              onClick={() => handleNavClick('contact')}
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-violet-500/20 dark:shadow-violet-950/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="flex items-center space-x-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] p-4 z-30 md:hidden"
          >
            <div className="glass-premium rounded-2xl p-6 flex flex-col space-y-4 border border-slate-200/50 dark:border-slate-800/50 shadow-2xl">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-md font-semibold transition-colors ${
                    activeId === item.id
                      ? 'bg-violet-500 text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="border-t border-slate-200 dark:border-slate-800 pt-4 flex justify-between items-center">
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/rajajaiswal8414"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
                  >
                    <FiGithub className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/raja-jaiswal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
                  >
                    <FiLinkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:rajajaiswal8414@gmail.com"
                    className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
                  >
                    <FiMail className="w-5 h-5" />
                  </a>
                </div>

                <button
                  onClick={() => handleNavClick('contact')}
                  className="px-5 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg"
                >
                  Hire Me
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
