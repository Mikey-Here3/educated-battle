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
        
        {/* Clean Sleek Badge (Without Clunky Artificial Borders) */}
        <div className="flex justify-center">
          <div className="inline-flex items-center space-x-2.5 rounded-full bg-gradient-to-r from-crimson-dark/80 via-surface-200 to-crimson-dark/80 px-5 py-2 backdrop-blur-xl shadow-[0_0_25px_rgba(255,0,60,0.35)]">
            <span className="flex h-2.5 w-2.5 rounded-full bg-crimson animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-100 font-display">
              FREE FIRE & FREE FIRE MAX ARENA
            </span>
            <span className="rounded-full bg-neon-gold px-2.5 py-0.5 text-[10px] font-black text-slate-950 uppercase shadow-md">
              PAKISTAN 🇵🇰
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="mt-7 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl font-display uppercase leading-none">
            COMPETE • WIN • EARN
            <span className="mt-2.5 block bg-gradient-to-r from-crimson-light via-neon-gold to-crimson bg-clip-text text-transparent neon-glow-crimson">
              PRO ESPORTS ARENA
            </span>
          </h1>

          <p className="mt-6 text-base text-slate-300 sm:text-xl lg:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
            Join daily Pakistan Free Fire custom room matches. Win guaranteed <strong className="text-neon-gold">PKR Cash Prizes</strong>, earn <strong className="text-crimson-light">Per-Kill Rewards</strong>, and withdraw instantly to EasyPaisa or JazzCash.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/matches"
            className="w-full sm:w-auto flex items-center justify-center space-x-3 rounded-2xl bg-gradient-to-r from-crimson-dark via-crimson to-crimson-light px-9 py-4 text-base font-black uppercase tracking-wider text-white shadow-[0_0_35px_rgba(255,0,60,0.55)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(255,0,60,0.75)] active:scale-95 border border-crimson-light/50"
          >
            <Zap className="h-5 w-5 text-neon-gold fill-neon-gold" />
            <span>BROWSE MATCHES</span>
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto flex items-center justify-center space-x-3 rounded-2xl border border-crimson/40 bg-surface-200/90 px-9 py-4 text-base font-black uppercase tracking-wider text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-crimson hover:bg-surface-300 hover:text-white hover:shadow-[0_0_25px_rgba(255,0,60,0.35)] active:scale-95"
          >
            <MessageSquareCode className="h-5 w-5 text-crimson-light" />
            <span>JOIN WHATSAPP GROUP</span>
          </Link>
        </div>

        {/* Live Statistics Counter Grid */}
        <div className="mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="rounded-2xl border border-crimson/30 bg-surface-200/80 p-5 backdrop-blur-md text-center card-glass-hover">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-neon-gold/20 text-neon-gold border border-neon-gold/40 mb-3">
              <Trophy className="h-5 w-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white font-display">PKR 2.5M+</p>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Total Cash Distributed</p>
          </div>

          <div className="rounded-2xl border border-crimson/30 bg-surface-200/80 p-5 backdrop-blur-md text-center card-glass-hover">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-crimson/20 text-crimson-light border border-crimson/40 mb-3">
              <Flame className="h-5 w-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white font-display">1,250+</p>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Daily Matches Hosted</p>
          </div>

          <div className="rounded-2xl border border-crimson/30 bg-surface-200/80 p-5 backdrop-blur-md text-center card-glass-hover">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-crimson/20 text-crimson-light border border-crimson/40 mb-3">
              <Zap className="h-5 w-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white font-display">45,000+</p>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Registered Gamers</p>
          </div>

          <div className="rounded-2xl border border-crimson/30 bg-surface-200/80 p-5 backdrop-blur-md text-center card-glass-hover">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-neon-gold/20 text-neon-gold border border-neon-gold/40 mb-3">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white font-display">INSTANT</p>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">EasyPaisa & JazzCash</p>
          </div>

        </div>

      </div>
    </div>
  );
};
