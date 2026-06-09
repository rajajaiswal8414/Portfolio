import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiAward, FiCalendar, FiMapPin, FiCheck } from 'react-icons/fi';
import { FaAws } from 'react-icons/fa';
import { SiCodecademy } from 'react-icons/si';

const Education: React.FC = () => {
  return (
    <section
      id="education"
      className="py-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white"
          >
            Education & Credentials
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-gradient-to-r from-violet-600 to-cyan-400 mx-auto mt-4 rounded-full origin-center"
          />
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-lg mx-auto">
            My academic foundation and industry-standard technical qualifications.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Education */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
              <FiBookOpen className="text-violet-500" />
              <span>Academic Background</span>
            </h3>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className="p-6 md:p-8 rounded-3xl bg-slate-50/80 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800/80 shadow-xs backdrop-blur-xs relative overflow-hidden group"
            >
              {/* Decorative circle glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-full blur-xl translate-x-4 -translate-y-4" />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                  <h4 className="text-xl font-extrabold text-slate-800 dark:text-white">
                    B.Tech in Computer Science and Engineering
                  </h4>
                  <p className="text-violet-600 dark:text-violet-400 font-bold mt-1 text-base">
                    Vellore Institute of Technology (VIT)
                  </p>
                </div>
                <div className="flex flex-col items-end text-right text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-450 gap-1 shrink-0">
                  <span className="flex items-center">
                    <FiCalendar className="w-4 h-4 mr-1 text-cyan-500" />
                    2021 - 2025
                  </span>
                  <span className="flex items-center">
                    <FiMapPin className="w-4 h-4 mr-1 text-rose-500" />
                    Vellore, India
                  </span>
                </div>
              </div>

              {/* CGPA display */}
              <div className="flex items-center space-x-6 mb-6 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850">
                <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                  {/* SVG progress indicator */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      className="stroke-slate-100 dark:stroke-slate-800"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    <motion.circle
                      cx="32"
                      cy="32"
                      r="28"
                      className="stroke-violet-600 dark:stroke-violet-500"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={176}
                      initial={{ strokeDashoffset: 176 }}
                      whileInView={{ strokeDashoffset: 176 - (176 * 8.22) / 10 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                  </svg>
                  <span className="absolute text-sm font-black text-slate-800 dark:text-white">8.22</span>
                </div>
                <div>
                  <span className="block text-sm font-extrabold text-slate-800 dark:text-white">
                    Cumulative Grade Point Average
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Strong academic standing, ranking in top tier of B.Tech CSE cohort.
                  </span>
                </div>
              </div>

              {/* Core courses */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Core Area Focus
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Data Structures & Algorithms', 'Database Management Systems', 'Software Engineering', 'Object Oriented Programming', 'Operating Systems', 'Computer Networks'].map((course, cIdx) => (
                    <span
                      key={cIdx}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Certifications */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
              <FiAward className="text-violet-500" />
              <span>Certifications</span>
            </h3>

            <div className="space-y-6">
              {/* AWS Certified */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-3xl bg-slate-50/80 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800/80 shadow-xs backdrop-blur-xs flex gap-5 hover:border-violet-500/30 dark:hover:border-violet-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0 shadow-xs">
                  <FaAws className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-extrabold text-slate-800 dark:text-white">
                    AWS Certified Cloud Practitioner
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    Demonstrated solid understanding of core AWS services (EC2, S3, RDS, DynamoDB), Identity & Access Management (IAM), VPC networking, cloud deployment, and architectural best practices.
                  </p>
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {['EC2', 'S3', 'RDS', 'IAM', 'VPC', 'Cloud Security'].map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center text-xs font-semibold text-amber-600 dark:text-amber-400"
                      >
                        <FiCheck className="w-3.5 h-3.5 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* DSA in Java */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="p-6 rounded-3xl bg-slate-50/80 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800/80 shadow-xs backdrop-blur-xs flex gap-5 hover:border-violet-500/30 dark:hover:border-violet-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-violet-500/10 dark:bg-violet-500/20 border border-violet-500/20 flex items-center justify-center text-violet-500 shrink-0 shadow-xs">
                  <SiCodecademy className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-extrabold text-slate-800 dark:text-white">
                    Data Structures in Java
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    Developed a robust foundation in core computer science paradigms. Expert in sorting/searching algorithms, linked lists, binary search trees, graph theory, hash tables, and big-O efficiency.
                  </p>
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {['Trees & Graphs', 'Searching & Sorting', 'Time Complexity', 'Recursion'].map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center text-xs font-semibold text-violet-600 dark:text-violet-400"
                      >
                        <FiCheck className="w-3.5 h-3.5 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
