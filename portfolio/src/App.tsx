import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/ui/Loader';
import BackToTop from './components/ui/BackToTop';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial portfolio resource loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      {/* Entrance Animation Loader */}
      <AnimatePresence mode="wait">
        {isLoading && <Loader />}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Achievements />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
        </div>
      )}
    </ThemeProvider>
  );
};

export default App;
