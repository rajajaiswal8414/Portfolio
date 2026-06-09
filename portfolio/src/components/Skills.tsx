import React from 'react';
import { motion } from 'framer-motion';
import { FaJava, FaAws } from 'react-icons/fa';
import {
  SiSpringboot,
  SiAngular,
  SiReact,
  SiFastapi,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiApachemaven,
  SiPostman,
  SiIntellijidea,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiHtml5,
  SiGit,
} from 'react-icons/si';
import { FiDatabase, FiCpu, FiGlobe, FiCheckSquare, FiSettings } from 'react-icons/fi';

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'Java', level: 90, icon: <FaJava className="text-orange-500" /> },
      { name: 'SQL', level: 85, icon: <FiDatabase className="text-cyan-500" /> },
      { name: 'JavaScript', level: 82, icon: <SiJavascript className="text-yellow-500" /> },
      { name: 'TypeScript', level: 78, icon: <SiTypescript className="text-blue-500" /> },
      { name: 'Python', level: 72, icon: <SiPython className="text-emerald-500" /> },
      { name: 'HTML/CSS', level: 85, icon: <SiHtml5 className="text-orange-600" /> },
    ],
  },
  {
    title: 'Frameworks & Architecture',
    skills: [
      { name: 'Spring Boot', level: 88, icon: <SiSpringboot className="text-emerald-500" /> },
      { name: 'Angular', level: 80, icon: <SiAngular className="text-rose-600" /> },
      { name: 'React', level: 75, icon: <SiReact className="text-cyan-400" /> },
      { name: 'REST APIs', level: 88, icon: <FiGlobe className="text-indigo-400" /> },
      { name: 'Microservices', level: 80, icon: <FiCpu className="text-purple-400" /> },
      { name: 'FastAPI', level: 68, icon: <SiFastapi className="text-teal-500" /> },
      { name: 'JUnit / Mockito', level: 82, icon: <FiCheckSquare className="text-amber-500" /> },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MySQL', level: 85, icon: <SiMysql className="text-sky-500" /> },
      { name: 'PostgreSQL', level: 82, icon: <SiPostgresql className="text-blue-400" /> },
      { name: 'Redis', level: 70, icon: <SiRedis className="text-rose-500" /> },
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git & GitHub', level: 85, icon: <SiGit className="text-orange-500" /> },
      { name: 'Docker', level: 70, icon: <SiDocker className="text-blue-500" /> },
      { name: 'AWS Cloud', level: 75, icon: <FaAws className="text-amber-500" /> },
      { name: 'Maven', level: 80, icon: <SiApachemaven className="text-rose-400" /> },
      { name: 'Swagger / Postman', level: 85, icon: <SiPostman className="text-orange-500" /> },
      { name: 'IDEs (IntelliJ / VS Code)', level: 90, icon: <SiIntellijidea className="text-purple-500" /> },
    ],
  },
];

const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
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
            Technical Expertise
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-gradient-to-r from-violet-600 to-cyan-400 mx-auto mt-4 rounded-full origin-center"
          />
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-lg mx-auto">
            A comprehensive overview of my tech stack, engineering utilities, and development standards.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 shadow-xs flex flex-col space-y-6"
            >
              <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center space-x-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="p-1.5 rounded-lg bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900/40 text-violet-500">
                  <FiSettings className="w-5 h-5" />
                </span>
                <span>{category.title}</span>
              </h3>

              <div className="space-y-5">
                {category.skills.map((skill, skillIdx) => (
                  <div key={skillIdx} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                        <span className="text-base">{skill.icon}</span>
                        <span>{skill.name}</span>
                      </div>
                      <span className="text-slate-500 dark:text-slate-400">{skill.level}%</span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: skillIdx * 0.05 }}
                        className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
