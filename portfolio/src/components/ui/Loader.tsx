import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        y: '-100%',
        opacity: 0,
        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white"
    >
      <div className="relative flex flex-col items-center space-y-4">
        {/* Animated Rings */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-4 border-t-violet-500 border-r-transparent border-b-transparent border-l-transparent"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            className="absolute w-[80%] h-[80%] rounded-full border-4 border-b-cyan-400 border-r-transparent border-t-transparent border-l-transparent"
          />
          <span className="text-gradient-primary font-black text-xl">R</span>
        </div>

        {/* Text Fade-in-out */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <h2 className="font-extrabold text-lg tracking-wider text-white">Raja Jaiswal</h2>
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">
            Loading Portfolio
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;
