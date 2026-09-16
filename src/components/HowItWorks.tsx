'use client';

import React from 'react';
import { Gamepad2, UserCheck, Swords, Trophy, Wallet, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'CHOOSE TOURNAMENT',
      desc: 'Browse Clash Squad, 1v1, 2v2, or 48-player Battle Royale matches with guaranteed PKR prize pools.',
      icon: Gamepad2,
      color: 'text-primary',
      borderColor: 'border-primary/40',
      bgGlow: 'bg-primary/10',
    },
    {
      num: '02',
      title: 'JOIN & REGISTER',
      desc: 'Deposit entry fee via JazzCash/EasyPaisa and enter your registered Free Fire in-game UID.',
      icon: UserCheck,
      color: 'text-neon-cyan',
      borderColor: 'border-neon-cyan/40',
      bgGlow: 'bg-neon-cyan/10',
    },
    {
      num: '03',
      title: 'ENTER CUSTOM ROOM',
      desc: 'Room ID & Password unlock 15 minutes before the match start time. Join the verified lobby.',
      icon: Swords,
      color: 'text-crimson',
      borderColor: 'border-crimson/40',
      bgGlow: 'bg-crimson/10',
    },
    {
      num: '04',
      title: 'COMPETE & WIN',
      desc: 'Play with verified anti-cheat rules. Secure placement rewards and earn extra cash per kill.',
      icon: Trophy,
      color: 'text-neon-gold',
      borderColor: 'border-neon-gold/40',
      bgGlow: 'bg-neon-gold/10',
    },
    {
      num: '05',
      title: 'INSTANT PAYOUT',
      desc: 'Official marshals verify match results. Winnings withdraw directly to JazzCash or EasyPaisa.',
      icon: Wallet,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      bgGlow: 'bg-emerald-500/10',
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center space-x-2 rounded-full bg-primary/15 border border-primary/30 px-3.5 py-1 text-xs font-black uppercase text-primary tracking-widest mb-3">
          <span>HOW IT WORKS</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display uppercase tracking-tight">
          5 SIMPLE STEPS TO WIN REAL CASH
        </h2>
        <p className="mt-2 text-xs sm:text-base text-slate-400">
          The seamless Free Fire esports tournament journey from registration to instant wallet withdrawal.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="relative rounded-2xl border border-white/10 bg-surface-200/90 p-5 backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:border-white/20 hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-2xl font-black text-white/20">
                    {step.num}
                  </span>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${step.bgGlow} ${step.color} border ${step.borderColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="font-display font-black text-sm text-white uppercase tracking-wider mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <span>Step {step.num} of 05</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/matches"
          className="inline-flex items-center space-x-2 rounded-2xl px-6 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-lg transition-all hover:scale-105 active:scale-95"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
        >
          <span>BROWSE TOURNAMENTS NOW</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};
