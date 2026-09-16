'use client';

import React from 'react';
import { ShieldAlert, Zap, Trophy, Smartphone, MessageCircle, Lock } from 'lucide-react';
import { getWhatsAppSupportUrl } from '@/data/config';

export const WhyEducatedGamer: React.FC = () => {
  const features = [
    {
      title: 'VERIFIED ANTI-CHEAT ARENA',
      desc: 'Mobile-only tournaments with zero emulator tolerance. Official marshals inspect lobbies live.',
      icon: ShieldAlert,
      color: 'text-crimson',
      badge: 'STRICT FAIR PLAY',
    },
    {
      title: 'INSTANT JAZZCASH PAYOUTS',
      desc: 'Win placement prizes and per-kill cash. Fast, verified withdrawals directly to JazzCash & EasyPaisa.',
      icon: Zap,
      color: 'text-neon-gold',
      badge: 'SAME-DAY CASH',
    },
    {
      title: 'REAL PKR PER-KILL BOUNTIES',
      desc: 'Every kill counts. Earn PKR 30–75 per verified frag on top of Booyah championship rewards.',
      icon: Trophy,
      color: 'text-primary',
      badge: 'KILL REWARDS',
    },
    {
      title: '100% MOBILE-FIRST EXPERIENCE',
      desc: 'Tailored for smartphone gamers across Pakistan. Smooth navigation, fast registration, and instant room access.',
      icon: Smartphone,
      color: 'text-emerald-400',
      badge: 'NATIVE SPEED',
    },
    {
      title: 'ENCRYPTED ROOM PASSWORDS',
      desc: 'Room ID & Passwords unlock safely for verified participants only, preventing non-registered room crashers.',
      icon: Lock,
      color: 'text-indigo-400',
      badge: 'SECURE LOBBIES',
    },
    {
      title: 'DIRECT WHATSAPP ADMIN DESK',
      desc: 'Real human admin support available on WhatsApp for match queries, payments, and slot inquiries.',
      icon: MessageCircle,
      color: 'text-emerald-400',
      badge: '24/7 ASSISTANCE',
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center space-x-2 rounded-full bg-neon-gold/15 border border-neon-gold/30 px-3.5 py-1 text-xs font-black uppercase text-neon-gold tracking-widest mb-3">
          <span>WHY EDUCATED GAMER</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display uppercase tracking-tight">
          BUILT FOR SERIOUS ESPORTS COMPETITORS
        </h2>
        <p className="mt-2 text-xs sm:text-base text-slate-400">
          Pakistan&apos;s standard for competitive Free Fire tournament integrity, instant rewards, and reliable operations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {features.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.title}
              className="rounded-2xl border border-white/10 bg-surface-200/80 p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 ${feat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-md bg-white/5 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-slate-400 border border-white/10">
                  {feat.badge}
                </span>
              </div>
              <h3 className="font-display font-black text-sm text-white uppercase tracking-wider mb-2">
                {feat.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Support Strip */}
      <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 text-center sm:text-left">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white uppercase font-display">Need assistance or have a tournament question?</h4>
            <p className="text-xs text-slate-300">Speak directly with Educated Gamer tournament operations via WhatsApp.</p>
          </div>
        </div>
        <a
          href={getWhatsAppSupportUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center space-x-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-black uppercase text-white hover:bg-emerald-500 transition-all shadow-md"
        >
          <MessageCircle className="h-4 w-4" />
          <span>CHAT WITH ADMIN</span>
        </a>
      </div>
    </section>
  );
};
