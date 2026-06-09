import React from 'react';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';

const Footer: React.FC = () => {
  const handleScrollTo = (id: string) => {
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
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-900 transition-colors duration-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-6">
        {/* Logo/Name */}
        <button
          onClick={() => handleScrollTo('hero')}
          className="font-extrabold text-xl text-slate-800 dark:text-white cursor-pointer"
        >
          Raja<span className="text-violet-500 font-extrabold">.</span>
        </button>

        {/* Navigation items */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
          {['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact'].map((id) => (
            <button
              key={id}
              onClick={() => handleScrollTo(id)}
              className="hover:text-violet-500 dark:hover:text-violet-400 capitalize transition-colors cursor-pointer"
            >
              {id === 'hero' ? 'home' : id}
            </button>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex space-x-6">
          <a
            href="https://github.com/rajajaiswal8414"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-violet-500 transition-colors"
            aria-label="GitHub"
          >
            <FiGithub className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/raja-jaiswal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-violet-500 transition-colors"
            aria-label="LinkedIn"
          >
            <FiLinkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:rajajaiswal8414@gmail.com"
            className="text-slate-400 hover:text-violet-500 transition-colors"
            aria-label="Email"
          >
            <FiMail className="w-5 h-5" />
          </a>
        </div>

        {/* Divider */}
        <div className="w-24 h-[1px] bg-slate-200 dark:bg-slate-800" />

        {/* Copyright & Tech Info */}
        <div className="text-center text-xs text-slate-400 dark:text-slate-500 space-y-1.5 font-medium">
          <p>© {new Date().getFullYear()} Raja Jaiswal. All rights reserved.</p>
          <p className="flex items-center justify-center gap-1">
            Built with <FiHeart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> using React,
            TypeScript, Tailwind CSS & Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
