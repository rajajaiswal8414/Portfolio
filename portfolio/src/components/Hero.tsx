import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiDownload, FiArrowRight, FiCode } from 'react-icons/fi';
import { FaJava, FaAws } from 'react-icons/fa';
import { SiSpringboot, SiAngular, SiReact } from 'react-icons/si';

const HEADLINES = [
  'Full Stack Java Developer',
  'Spring Boot & Microservices Specialist',
  'AWS Certified Cloud Practitioner',
  'GenAI & System Design Enthusiast',
];

const Hero: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: any;
    const fullText = HEADLINES[currentIdx];


    const handleType = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          // Pause before starting to delete
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        // Deleting
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIdx((prev) => (prev + 1) % HEADLINES.length);
        }
      }

      setTypingSpeed(isDeleting ? 50 : 100);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIdx, typingSpeed]);

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
    <section
      id="hero"
      className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-violet-500/10 dark:bg-violet-500/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center self-center lg:self-start px-3 py-1.5 rounded-full bg-violet-100/60 dark:bg-violet-950/40 border border-violet-200/50 dark:border-violet-900/40 text-violet-700 dark:text-violet-300 text-xs font-semibold uppercase tracking-wider"
            >
              <span className="flex h-2 w-2 relative mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              Available for Opportunities
            </motion.div>

            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-slate-900 dark:text-white font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none!"
              >
                Hi, I'm <span className="text-gradient-primary">Raja Jaiswal</span>
              </motion.h1>

              {/* Typewriter text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl font-bold text-slate-700 dark:text-slate-200 h-8 flex items-center justify-center lg:justify-start"
              >
                <span>{currentText}</span>
                <span className="inline-block w-[3px] h-6 ml-1 bg-violet-500 animate-pulse" />
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-slate-600 dark:text-slate-400 text-md sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Building scalable backend systems and modern web applications using Java, Spring Boot, Angular, React, AWS, and Microservices. Focused on clean architecture, performance optimization, and GenAI integration.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <button
                onClick={() => handleScrollTo('projects')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full text-base font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-xl shadow-violet-500/20 dark:shadow-violet-950/40 transform hover:-translate-y-1 transition-all flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span>View Projects</span>
                <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleScrollTo('contact')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full text-base font-bold glass border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-800 dark:text-white transform hover:-translate-y-1 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Contact Me</span>
              </button>

              <a
                href="/resume.pdf"
                download="Raja_Jaiswal_Resume.pdf"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full text-base font-bold bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-white transform hover:-translate-y-1 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <FiDownload className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start space-x-4 pt-6"
            >
              <a
                href="https://github.com/rajajaiswal8414"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-violet-500 dark:hover:text-violet-400 hover:shadow-lg dark:hover:shadow-violet-950/20 transform hover:-translate-y-1 transition-all"
                aria-label="GitHub"
              >
                <FiGithub className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/raja-jaiswal-263aa2250/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-violet-500 dark:hover:text-violet-400 hover:shadow-lg dark:hover:shadow-violet-950/20 transform hover:-translate-y-1 transition-all"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* Graphical Illustration / Tech Orbit */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center"
            >
              {/* Spinning decorative background rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-violet-500/20 dark:border-violet-500/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-cyan-500/20 dark:border-cyan-500/30"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[60%] h-[60%] rounded-full border border-dotted border-fuchsia-500/25 dark:border-fuchsia-500/40"
              />

              {/* Central Premium Graphic Card */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-3xl glass-premium flex flex-col items-center justify-center p-6 border border-slate-200/50 dark:border-slate-800/60 shadow-2xl relative z-10"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-violet-500/30">
                  <FiCode className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <h3 className="text-slate-800 dark:text-white font-extrabold text-sm sm:text-base text-center">
                  Raja Jaiswal
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs text-center mt-1">
                  Full Stack Java Developer
                </p>
                <span className="mt-3 text-[10px] bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold uppercase tracking-wider">
                  VIT Graduate
                </span>
              </motion.div>

              {/* Floating tech nodes */}
              {/* Java Node */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  x: [0, 8, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-2 left-6 sm:-left-2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-md flex items-center justify-center text-orange-500 text-lg sm:text-xl z-20"
                title="Java"
              >
                <FaJava className="w-6 h-6 sm:w-8 sm:h-8" />
              </motion.div>

              {/* Spring Node */}
              <motion.div
                animate={{
                  y: [0, 15, 0],
                  x: [0, -6, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-10 right-4 sm:-right-4 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-md flex items-center justify-center text-emerald-500 text-lg sm:text-xl z-20"
                title="Spring Boot"
              >
                <SiSpringboot className="w-5 h-5 sm:w-7 sm:h-7" />
              </motion.div>

              {/* AWS Node */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  x: [0, -15, 0],
                }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute bottom-6 left-6 sm:left-2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-md flex items-center justify-center text-amber-500 text-lg sm:text-xl z-20"
                title="AWS"
              >
                <FaAws className="w-6 h-6 sm:w-8 sm:h-8" />
              </motion.div>

              {/* Angular Node */}
              <motion.div
                animate={{
                  y: [0, 12, 0],
                  x: [0, 10, 0],
                }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute bottom-8 right-8 sm:bottom-10 sm:right-2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-md flex items-center justify-center text-rose-600 text-lg sm:text-xl z-20"
                title="Angular"
              >
                <SiAngular className="w-5 h-5 sm:w-7 sm:h-7" />
              </motion.div>

              {/* React Node */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  x: [0, 12, 0],
                }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-md flex items-center justify-center text-cyan-400 text-lg sm:text-xl z-20"
                title="React"
              >
                <SiReact className="w-6 h-6 sm:w-7 sm:h-7 animate-spin" style={{ animationDuration: '10s' }} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
