'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube } from 'lucide-react';

interface EntranceLoaderProps {
  onComplete?: () => void;
}

export const EntranceLoader: React.FC<EntranceLoaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('INITIALIZING ARENA...');

  useEffect(() => {
    // Stage 1: Fast initial burst
    const t1 = setTimeout(() => {
      setProgress(48);
      setStatusText('VERIFYING ANTI-CHEAT ENGINE...');
    }, 350);

    // Stage 2: Free Fire server connect
    const t2 = setTimeout(() => {
      setProgress(82);
      setStatusText('CONNECTING TO TOURNAMENT LOBBY...');
    }, 750);

    // Stage 3: Ready
    const t3 = setTimeout(() => {
      setProgress(100);
      setStatusText('BATTLE ARENA READY!');
    }, 1250);

    // Complete & Dismiss
    const t4 = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 1700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.45, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#05070e] p-6 selection:bg-none select-none overflow-hidden"
        >
          {/* Ambient Cyber Light Beams */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full blur-[120px] opacity-40 transition-colors duration-500"
              style={{ background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)' }}
            />
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-72 h-36 bg-neon-gold/10 blur-[80px]" />
          </div>

          {/* Top Status Header */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full flex items-center justify-between max-w-sm pt-4 relative z-10"
          >
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/60 uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Free Fire Pakistan</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-600/15 border border-red-500/30 text-[10px] font-black text-red-400 uppercase">
              <Youtube className="h-3 w-3 fill-red-500" />
              <span>Official Arena</span>
            </div>
          </motion.div>

          {/* Center Esports Crest & Logo */}
          <div className="relative z-10 flex flex-col items-center my-auto">
            {/* Outer Concentric Glowing Orbit Rings */}
            <div className="relative flex items-center justify-center">
              {/* Outer Breathing Crimson Aura */}
              <motion.div
                animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                className="absolute h-52 w-52 sm:h-64 sm:w-64 rounded-full bg-crimson/25 blur-[45px]"
              />

              {/* Gold/Crimson Orbit Ring with dots */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                className="absolute h-48 w-48 sm:h-56 sm:w-56 rounded-full border border-crimson/40 border-dashed"
              />

              {/* Inner Red Glow Ring */}
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="absolute h-36 w-36 sm:h-40 sm:w-40 rounded-full border border-crimson/60 shadow-[0_0_30px_rgba(255,0,60,0.5)]"
              />

              {/* Central Circular App Emblem */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full border-2 border-crimson/80 bg-[#080b16] p-4 shadow-[0_0_35px_rgba(255,0,60,0.4)] backdrop-blur-2xl flex items-center justify-center overflow-hidden"
              >
                <div className="relative h-full w-full">
                  <Image
                    src="/logo.svg"
                    alt="Educated Gamer"
                    fill
                    priority
                    className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                  />
                </div>
              </motion.div>
            </div>

            {/* Typography */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.45 }}
              className="mt-6 text-center"
            >
              <h1 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-widest leading-tight drop-shadow-md">
                EDUCATED GAMER
              </h1>
              <p className="mt-1 text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-white/70">
                ESPORTS ARENA • PAKISTAN
              </p>

              {/* Red YouTube Subscribe Pill Button */}
              <div className="mt-4 inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-red-700 to-crimson px-4 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(255,0,60,0.6)] border border-red-400/40">
                <Youtube className="h-3.5 w-3.5 fill-white" />
                <span>YT: EDUCATED GAMER — SUBSCRIBE NOW!</span>
              </div>

              {/* Animated Glowing Triple Dots */}
              <div className="mt-4 flex items-center justify-center space-x-2">
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}
                  className="h-2 w-2 rounded-full bg-crimson shadow-[0_0_8px_rgba(255,0,60,0.8)]"
                />
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
                  className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(14,165,233,0.8)]"
                />
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
                  className="h-2 w-2 rounded-full bg-neon-gold shadow-[0_0_8px_rgba(255,215,0,0.8)]"
                />
              </div>
            </motion.div>
          </div>

          {/* Bottom Loading Progress Strip */}
          <div className="w-full max-w-xs relative z-10 pb-4">
            <div className="flex items-center justify-between text-[11px] font-bold text-white/60 mb-2">
              <span className="tracking-wider uppercase flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                {statusText}
              </span>
              <span className="font-mono text-white font-black">{progress}%</span>
            </div>

            {/* Progress Bar Track */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10 relative">
              <motion.div
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent), #ffd700)',
                  boxShadow: '0 0 12px var(--color-primary)',
                }}
              />
            </div>

            {/* Micro subtitle */}
            <p className="text-center text-[10px] text-white/30 tracking-wider uppercase mt-2.5 font-medium">
              Daily Tournaments • JazzCash & EasyPaisa Verified
            </p>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
