import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiLayers, FiActivity, FiShoppingCart } from 'react-icons/fi';


interface Project {
  id: number;
  title: string;
  category: 'java-spring' | 'fullstack' | 'database';
  description: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  tech: string[];
  github: string;
  demo: string;
  icon: React.ReactNode;
  gradient: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Healthcare Appointment Management System',
    category: 'fullstack',
    description: 'A multi-role enterprise healthcare platform enabling patient triage, appointment bookings, and doctor scheduling with automated conflict resolution.',
    highlights: [
      'Engineered 40+ REST APIs conforming to standard REST design principles.',
      'Secured backend authentication with JWT token exchange and Role-Based Access Control (RBAC).',
      'Designed an interactive Angular admin dashboard displaying clinic statistics.',
    ],
    metrics: [
      { label: 'REST APIs Developed', value: '40+' },
      { label: 'Authentication', value: 'JWT + RBAC' },
      { label: 'Role Types Support', value: '3 (Patient/Doc/Admin)' },
    ],
    tech: ['Java', 'Spring Boot', 'Angular', 'JWT', 'MySQL', 'Spring Security', 'REST APIs'],
    github: 'https://github.com/rajajaiswal8414/healthcare_appointment_system',
    demo: '#',
    icon: <FiActivity className="w-6 h-6" />,
    gradient: 'from-blue-600 via-indigo-650 to-violet-650',
  },
  {
    id: 2,
    title: 'Hotel Management System',
    category: 'java-spring',
    description: 'An advanced booking portal optimizing room reservations, check-ins, guest check-outs, and scheduling dynamic rate structures.',
    highlights: [
      'Developed 20+ secure REST APIs with full database transaction safety.',
      'Implemented optimistic locking database mechanisms to prevent double-booking conflicts.',
      'Integrated Spring Boot scheduled Cron jobs for automated late-checkout reminders.',
    ],
    metrics: [
      { label: 'REST Endpoints', value: '20+' },
      { label: 'Locking System', value: 'Optimistic' },
      { label: 'Automated Cron Jobs', value: '4' },
    ],
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Spring Data JPA', 'Cron Jobs', 'Maven'],
    github: 'https://github.com/rajajaiswal8414/hotel_management_system',
    demo: '#',
    icon: <FiLayers className="w-6 h-6" />,
    gradient: 'from-violet-600 via-fuchsia-650 to-pink-650',
  },
  {
    id: 3,
    title: 'E-Commerce Shopping Platform',
    category: 'fullstack',
    description: 'A modern e-commerce application supporting product catalog search, user cart state, secure payment checkout, and backend order processing.',
    highlights: [
      'Integrated Stripe SDK API for processing test payments securely.',
      'Designed transactional catalog tables with indexing for quick product queries.',
      'Built a React dashboard for administrators to view, update, and dispatch orders.',
    ],
    metrics: [
      { label: 'Stripe Checkout', value: '100% Secure' },
      { label: 'Product Queries', value: '<50ms' },
      { label: 'Frontend Interface', value: 'React SPA' },
    ],
    tech: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Stripe API', 'Tailwind CSS', 'Redux'],
    github: 'https://github.com/rajajaiswal8414/ecommerce_platform',
    demo: '#',
    icon: <FiShoppingCart className="w-6 h-6" />,
    gradient: 'from-cyan-500 via-blue-600 to-indigo-600',
  },
];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'java-spring' | 'fullstack'>('all');

  const filteredProjects = PROJECTS.filter(
    (p) => filter === 'all' || p.category === filter
  );

  return (
    <section
      id="projects"
      className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white"
          >
            Featured Engineering Projects
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-gradient-to-r from-violet-600 to-cyan-400 mx-auto mt-4 rounded-full origin-center"
          />
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-lg mx-auto">
            Explore backend microservice systems and full-stack software architectures I have built.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${filter === 'all'
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
          >
            <span>All Projects</span>
          </button>
          <button
            onClick={() => setFilter('java-spring')}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${filter === 'java-spring'
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
          >
            <span>Java & Spring Boot</span>
          </button>
          <button
            onClick={() => setFilter('fullstack')}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${filter === 'fullstack'
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
          >
            <span>Full Stack</span>
          </button>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col h-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 shadow-xs overflow-hidden group hover:border-violet-500/20 dark:hover:border-violet-500/20 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                {/* Project Header Gradient Graphic */}
                <div className={`p-6 bg-gradient-to-br ${project.gradient} text-white relative overflow-hidden h-40 flex flex-col justify-between`}>
                  {/* Grid overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[size:20px_20px]" />
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-x-4 -translate-y-4" />

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg relative z-10">
                    {project.icon}
                  </div>

                  {/* Category badge */}
                  <span className="self-start text-[10px] uppercase font-bold tracking-wider bg-white/20 backdrop-blur-md border border-white/20 px-2 py-0.5 rounded-full relative z-10">
                    {project.category === 'fullstack' ? 'Full Stack' : 'Spring Boot'}
                  </span>
                </div>

                {/* Project Details */}
                <div className="p-6 md:p-8 flex flex-col flex-grow space-y-5">
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-slate-800 dark:text-white leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Key Achievements Bullet points */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Key Engineering Accomplishments
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                      {project.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0 mt-1.5 mr-2" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {project.metrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-center flex flex-col justify-center"
                      >
                        <span className="block text-xs font-bold text-slate-800 dark:text-white truncate" title={project.metrics[mIdx].value}>
                          {metric.value}
                        </span>
                        <span className="block text-[9px] text-slate-500 dark:text-slate-450 mt-0.5 leading-none truncate" title={project.metrics[mIdx].label}>
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2 flex-grow">
                    {project.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                    >
                      <FiGithub className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Demo mode: In production this opens the deployed live application web URL.');
                      }}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white flex items-center justify-center space-x-2 shadow-md shadow-violet-500/10 transition-all cursor-pointer"
                    >
                      <FiExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
