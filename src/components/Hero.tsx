'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldAlert, Zap, Flame, Trophy, MessageSquareCode, Crown, Swords } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-18 lg:pt-20 lg:pb-24">
      
      {/* Hero Background High-Res Esports Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&auto=format&fit=crop&q=80"
          alt="Esports Battle Arena Background"
          fill
          priority
          className="object-cover object-center opacity-15 mix-blend-luminosity"
        />
        {/* Gradient Mask Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070406]/90 via-[#070406]/85 to-[#070406]" />
      </div>

      {/* Background Ambient Orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[700px] rounded-full bg-crimson/25 blur-[150px] opacity-80" />
      <div className="pointer-events-none absolute top-1/3 left-1/4 h-[250px] w-[250px] rounded-full bg-neon-gold/15 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Clean Sleek Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center space-x-2 rounded-full bg-surface-200/90 border border-white/10 px-4 py-1.5 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-200 font-display">
              FREE FIRE & FF MAX ARENA
            </span>
            <span className="rounded-full bg-neon-gold px-2 py-0.5 text-[9px] sm:text-[10px] font-black text-slate-950 uppercase shadow-md">
              PAKISTAN 🇵🇰
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="mt-5 sm:mt-7 text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-display uppercase leading-tight">
            COMPETE • WIN • EARN
            <span 
              className="mt-1 sm:mt-2.5 block bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, var(--color-primary), var(--color-accent), #ffd700)',
                textShadow: '0 0 35px rgba(var(--color-primary-rgb), 0.4)',
              }}
            >
              PRO ESPORTS ARENA
            </span>
          </h1>

          <p className="mt-3.5 sm:mt-6 text-xs sm:text-lg lg:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Daily verified Free Fire custom room matches. Win real <strong className="text-neon-gold">PKR Cash Prizes</strong>, earn <strong className="text-primary">Per-Kill Bounties</strong>, with instant JazzCash & EasyPaisa payouts.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <Link
            href="/matches"
            className="w-full sm:w-auto flex items-center justify-center space-x-2.5 rounded-2xl px-8 py-3.5 sm:py-4 text-sm sm:text-base font-black uppercase tracking-wider text-white shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.5)] transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
            }}
          >
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-neon-gold fill-neon-gold" />
            <span>BROWSE MATCHES</span>
          </Link>

          <Link
            href="/wallet"
            className="w-full sm:w-auto flex items-center justify-center space-x-2.5 rounded-2xl border border-white/15 bg-surface-200/90 px-8 py-3.5 sm:py-4 text-sm sm:text-base font-black uppercase tracking-wider text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-primary hover:text-white active:scale-95"
          >
            <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-neon-gold" />
            <span>DEPOSIT / WALLET</span>
          </Link>
        </div>

        {/* Live Statistics Counter Grid */}
        <div className="mt-8 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-2xl border border-white/10 bg-surface-200/80 p-3.5 sm:p-5 backdrop-blur-md text-center card-glass-hover">
            <div className="mx-auto flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-neon-gold/20 text-neon-gold border border-neon-gold/40 mb-2 sm:mb-3">
              <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <p className="text-xl sm:text-3xl font-black text-white font-display">PKR 2.5M+</p>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5 sm:mt-1">Cash Distributed</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-surface-200/80 p-3.5 sm:p-5 backdrop-blur-md text-center card-glass-hover">
            <div className="mx-auto flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary/20 text-primary border border-primary/40 mb-2 sm:mb-3">
              <Flame className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <p className="text-xl sm:text-3xl font-black text-white font-display">1,250+</p>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5 sm:mt-1">Matches Hosted</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-surface-200/80 p-3.5 sm:p-5 backdrop-blur-md text-center card-glass-hover">
            <div className="mx-auto flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary/20 text-primary border border-primary/40 mb-2 sm:mb-3">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <p className="text-xl sm:text-3xl font-black text-white font-display">45,000+</p>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5 sm:mt-1">Active Gamers</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-surface-200/80 p-3.5 sm:p-5 backdrop-blur-md text-center card-glass-hover">
            <div className="mx-auto flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mb-2 sm:mb-3">
              <ShieldAlert className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <p className="text-xl sm:text-3xl font-black text-white font-display">INSTANT</p>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5 sm:mt-1">JazzCash Payout</p>
          </div>
        </div>

      </div>
    </div>
  );
};
