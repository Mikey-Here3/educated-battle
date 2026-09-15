'use client';

import React from 'react';
import { MessageSquareCode, Youtube, Sparkles, BellRing, Phone } from 'lucide-react';
import { SOCIAL_LINKS } from '@/data/mockData';

export const CommunityHub: React.FC = () => {
  return (
    <section id="community" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-3xl border border-crimson/40 bg-gradient-to-r from-crimson/20 via-surface-200 to-black p-8 sm:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(255,0,60,0.25)]">
        
        {/* Background glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-crimson/20 blur-[100px]" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          <div>
            <div className="inline-flex items-center space-x-2 rounded-xl bg-crimson/30 px-3.5 py-1.5 text-xs font-black uppercase text-neon-gold border border-crimson/50 mb-3">
              <Sparkles className="h-4 w-4" />
              <span>JOIN 25,000+ PAKISTAN GAMERS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display uppercase tracking-tight">
              COMMUNITY & YOUTUBE HUB
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              Watch live tournament shoutcasting, get custom room passwords, and claim free giveaways on the official EDUCATED GAMER YouTube and WhatsApp channels.
            </p>

            {/* Quick Stats Pills */}
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-xl border border-red-600/40 bg-surface-100/80 px-4 py-2 text-xs font-bold text-slate-200 flex items-center space-x-1.5">
                <Youtube className="h-4 w-4 text-red-500 fill-red-500" />
                <span><strong className="text-red-500">25,000+</strong> YouTube Community</span>
              </div>
              <div className="rounded-xl border border-emerald-500/40 bg-surface-100/80 px-4 py-2 text-xs font-bold text-slate-200 flex items-center space-x-1.5">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span><strong className="text-emerald-400">15,000+</strong> WhatsApp Channel Members</span>
              </div>
            </div>
          </div>

          {/* Social Join Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* YouTube Card */}
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-red-600/50 bg-surface-100/90 p-5 hover:border-red-500 hover:scale-102 transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)] flex flex-col justify-between"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600/20 text-red-500 border border-red-500/40">
                  <Youtube className="h-6 w-6 fill-red-500" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white uppercase font-display text-sm">YOUTUBE CHANNEL</h4>
                  <p className="text-xs text-red-400 font-bold">EDUCATED GAMER</p>
                </div>
              </div>
              <span className="inline-flex items-center justify-center space-x-1.5 rounded-xl bg-red-600 py-3 text-xs font-black uppercase text-white shadow-md">
                <span>SUBSCRIBE NOW</span>
                <BellRing className="h-3.5 w-3.5" />
              </span>
            </a>

            {/* WhatsApp Card */}
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-emerald-500/50 bg-surface-100/90 p-5 hover:border-emerald-400 hover:scale-102 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] flex flex-col justify-between"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <MessageSquareCode className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white uppercase font-display text-sm">WHATSAPP CHANNEL</h4>
                  <p className="text-xs text-emerald-400 font-bold">Instant Match Pass</p>
                </div>
              </div>
              <span className="inline-flex items-center justify-center rounded-xl bg-emerald-600 py-3 text-xs font-black uppercase text-white shadow-md">
                JOIN CHANNEL
              </span>
            </a>

          </div>

        </div>
      </div>
    </section>
  );
};
