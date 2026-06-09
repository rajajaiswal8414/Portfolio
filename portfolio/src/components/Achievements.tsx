import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGrid, FiDatabase, FiCloud, FiCheckCircle, FiBookOpen } from 'react-icons/fi';

interface StatItem {
  id: number;
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  isDecimal?: boolean;
}

const STATS: StatItem[] = [
  {
    id: 1,
    value: 3,
    suffix: '+',
    label: 'Full Stack Projects',
    icon: <FiGrid className="w-5 h-5 text-violet-500" />,
  },
  {
    id: 2,
    value: 80,
    suffix: '+',
    label: 'REST APIs Developed',
    icon: <FiCheckCircle className="w-5 h-5 text-cyan-500" />,
  },
  {
    id: 3,
    value: 18,
    suffix: '+',
    label: 'Database Tables Designed',
    icon: <FiDatabase className="w-5 h-5 text-emerald-500" />,
  },
  {
    id: 4,
    value: 1,
    suffix: ' (AWS CCP)',
    label: 'AWS Cloud Certified',
    icon: <FiCloud className="w-5 h-5 text-amber-500" />,
  },
  {
    id: 5,
    value: 8.22,
    suffix: '',
    label: 'B.Tech VIT CGPA',
    icon: <FiBookOpen className="w-5 h-5 text-rose-500" />,
    isDecimal: true,
  },
];

const AnimatedCounter: React.FC<{ value: number; isDecimal?: boolean; duration?: number }> = ({
  value,
  isDecimal = false,
  duration = 1.5,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let animationFrameId: number;
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const currentVal = progress * value;

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {isDecimal ? count.toFixed(2) : Math.floor(count)}
    </span>
  );
};

const Achievements: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-zinc-950 to-slate-900 border-b border-slate-800 text-white overflow-hidden">
      {/* Decorative ambient background lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-slate-900/35 border border-slate-800/80 shadow-2xl backdrop-blur-md flex flex-col items-center text-center group hover:border-violet-500/20 hover:bg-slate-900/50 transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-2xl bg-slate-800/40 border border-slate-700/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Number Counter */}
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-baseline justify-center">
                <AnimatedCounter value={stat.value} isDecimal={stat.isDecimal} />
                <span className="text-violet-400 font-extrabold">{stat.suffix}</span>
              </div>

              {/* Label */}
              <p className="text-xs sm:text-sm font-semibold text-slate-400 mt-2 leading-snug">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
