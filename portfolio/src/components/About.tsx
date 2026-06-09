import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiAward, FiTarget, FiTrendingUp } from 'react-icons/fi';

const ATTRIBUTES = [
  {
    icon: <FiTarget className="w-6 h-6 text-violet-500" />,
    title: 'Problem-Solving Mindset',
    description: 'Analytical approach to designing algorithms, debugging production issues, and writing clean, scalable code.',
  },
  {
    icon: <FiUsers className="w-6 h-6 text-cyan-500" />,
    title: 'Team Collaboration',
    description: 'Active listener and open communicator, working effectively in cross-functional squads to align on architecture.',
  },
  {
    icon: <FiAward className="w-6 h-6 text-fuchsia-500" />,
    title: 'Agile & Scrum Delivery',
    description: 'Well-versed in Agile ceremonies: sprint planning, retrospectives, standups, and code reviews at Cognizant.',
  },
  {
    icon: <FiTrendingUp className="w-6 h-6 text-emerald-500" />,
    title: 'Continuous Expansion',
    description: 'Regularly learning AWS cloud architecture, system design patterns, and integrating generative AI tools.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};


const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 transition-colors duration-300"
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
            About Me
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-gradient-to-r from-violet-600 to-cyan-400 mx-auto mt-4 rounded-full origin-center"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column - Detailed Text Summary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              Who is Raja Jaiswal?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Computer Science graduate from VIT with hands-on experience in Java Full Stack Development.
              Skilled in building scalable backend services, REST APIs, microservices, authentication systems,
              and modern frontend applications.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Currently working as a <strong className="text-violet-500 font-semibold dark:text-violet-400">Programmer Analyst Trainee</strong> at Cognizant.
              My goal is to design highly-performant microservice architectures, integrate modern cloud services,
              and explore the frontiers of generative AI to solve complex industrial problems.
            </p>

            {/* Micro Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                <span className="block text-3xl font-extrabold text-gradient-primary">8.22</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">B.Tech VIT CGPA</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                <span className="block text-3xl font-extrabold text-gradient-cyan">AWS</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Certified Cloud Prac.</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Attributes Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {ATTRIBUTES.map((attr, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800/60 shadow-xs backdrop-blur-xs flex flex-col space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-center shadow-xs">
                  {attr.icon}
                </div>
                <h4 className="text-slate-800 dark:text-slate-200 font-bold text-base">
                  {attr.title}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {attr.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
