import React from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiCheckCircle } from 'react-icons/fi';

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string[];
  skills: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: 'Cognizant Technology Solutions',
    role: 'Programmer Analyst Trainee',
    duration: 'Aug 2025 - Present',
    location: 'Pune, India',
    description: [
      'Implemented structured, optimized application logging across core microservices using SLF4J and Logback, facilitating easier production debugging.',
      'Developed and executed comprehensive unit and integration tests using JUnit and Mockito, raising code coverage metrics.',
      'Tested and validated multi-tier REST APIs using Postman, writing automated assertions for route validation.',
      'Active participant in Agile ceremonies including Sprint Planning, Retrospectives, Daily Standups, and Peer Code Reviews.',
      'Assisted in debugging and resolving critical production tickets and bugs, maintaining SLAs.',
      'Successfully delivered high-priority product features within scheduled sprint commitments.',
    ],
    skills: ['Java', 'Spring Boot', 'JUnit', 'Mockito', 'Postman', 'Logback', 'Git', 'Agile'],
  },
];

const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="py-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white"
          >
            Professional Journey
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-gradient-to-r from-violet-600 to-cyan-400 mx-auto mt-4 rounded-full origin-center"
          />
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-lg mx-auto">
            My career milestone entries detailing development impacts and agile engineering.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-6 space-y-12 py-4">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative pl-8 md:pl-10 group"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 -translate-x-[calc(50%+1px)] w-5 h-5 rounded-full bg-white dark:bg-slate-950 border-4 border-violet-500 group-hover:scale-125 transition-transform duration-200 z-10 shadow-xs" />

              {/* Glass Card */}
              <div className="p-6 md:p-8 rounded-3xl bg-slate-50/80 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-850 shadow-xs backdrop-blur-xs hover:border-violet-500/30 dark:hover:border-violet-500/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-800 dark:text-white flex items-center">
                      <FiBriefcase className="w-5 h-5 mr-2 text-violet-500 shrink-0" />
                      {exp.role}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 font-bold mt-1 text-sm">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400">
                    <span className="flex items-center">
                      <FiCalendar className="w-4 h-4 mr-1 text-cyan-500" />
                      {exp.duration}
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Achievements List */}
                <ul className="space-y-2.5 mb-6 text-slate-600 dark:text-slate-450">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start text-sm md:text-base leading-relaxed">
                      <FiCheckCircle className="w-4 h-4 mr-2.5 text-emerald-500 shrink-0 mt-1" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-100/60 dark:bg-violet-950/30 border border-violet-200/40 dark:border-violet-900/30 text-violet-600 dark:text-violet-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
