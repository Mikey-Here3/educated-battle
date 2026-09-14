'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, BellRing } from 'lucide-react';

interface EntranceLoaderProps {
  onComplete?: () => void;
}

export const EntranceLoader: React.FC<EntranceLoaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 2500); // 2.5s entrance splash

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070406] selection:bg-none p-4"
        >
          {/* Ambient Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/3 h-1.5 w-1.5 rounded-full bg-crimson animate-ping" />
            <div className="absolute top-2/3 right-1/4 h-2 w-2 rounded-full bg-neon-gold animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 h-1 w-1 rounded-full bg-crimson-light" />
            <div className="absolute top-1/2 right-1/3 h-1.5 w-1.5 rounded-full bg-neon-cyan animate-ping" />
          </div>

          {/* Central Animated Logo Container */}
          <div className="relative flex flex-col items-center">
            
            {/* Outer Cyber Glowing Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="absolute -inset-6 rounded-full border-2 border-dashed border-crimson/60 shadow-[0_0_50px_rgba(255,0,60,0.4)]"
            />

            {/* Inner Neon Glow Pulse Ring */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="absolute -inset-3 rounded-full border border-neon-gold shadow-[0_0_30px_rgba(255,215,0,0.4)]"
            />

            {/* Central Logo Box */}
            <div className="relative h-28 w-28 rounded-full border-2 border-crimson bg-surface-200 p-3 shadow-2xl flex items-center justify-center overflow-hidden">
              <Image
                src="/logo.svg"
                alt="Educated Gamer Logo"
                fill
                priority
                className="object-contain p-2"
              />
            </div>

            {/* Brand Title */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <h1 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-widest leading-none">
                EDUCATED GAMER
              </h1>
              <p className="mt-1.5 text-xs font-bold text-neon-gold uppercase tracking-[0.3em]">
                ESPORTS ARENA • PAKISTAN
              </p>
            </motion.div>

            {/* YouTube Subscribe Animated Ticker */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex items-center space-x-2 rounded-full border border-red-600/60 bg-red-950/80 px-4 py-2 text-xs font-black uppercase text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] backdrop-blur-md"
            >
              <Youtube className="h-4 w-4 text-red-500 animate-pulse fill-red-500" />
              <span>YT: EDUCATED GAMER — SUBSCRIBE NOW!</span>
              <BellRing className="h-3.5 w-3.5 text-neon-gold animate-bounce" />
            </motion.div>

            {/* Animated Loading Dots */}
            <div className="mt-6 flex items-center space-x-2">
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                className="h-2 w-2 rounded-full bg-crimson shadow-[0_0_8px_#ff003c]"
              />
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                className="h-2 w-2 rounded-full bg-neon-gold shadow-[0_0_8px_#ffd700]"
              />
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                className="h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_8px_#00f0ff]"
              />
            </div>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
