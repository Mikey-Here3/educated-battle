'use client';

import React from 'react';
import { MessageSquareCode, Disc as Discord, Youtube, Sparkles, BellRing } from 'lucide-react';

export const CommunityHub: React.FC = () => {
  return (
    <section id="community" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-3xl border border-crimson/40 bg-gradient-to-r from-crimson-dark/80 via-surface-200 to-slate-950 p-8 sm:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(255,0,60,0.25)]">
        
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
              Watch live tournament shoutcasting, get custom room passwords, and claim free giveaways on YouTube, WhatsApp, & Discord.
            </p>

            {/* Quick Stats Pills */}
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-xl border border-red-600/40 bg-surface-100/80 px-4 py-2 text-xs font-bold text-slate-200 flex items-center space-x-1.5">
                <Youtube className="h-4 w-4 text-red-500 fill-red-500" />
                <span><strong className="text-red-500">25,000+</strong> YouTube Subscribers</span>
              </div>
              <div className="rounded-xl border border-crimson/40 bg-surface-100/80 px-4 py-2 text-xs font-bold text-slate-200">
                💬 <strong className="text-neon-gold">15,000+</strong> WhatsApp Members
              </div>
            </div>
          </div>

          {/* Social Join Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* YouTube Card */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-red-600/50 bg-surface-100/90 p-4 hover:border-red-500 hover:scale-102 transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)] flex flex-col justify-between"
            >
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600/20 text-red-500 border border-red-500/40">
                  <Youtube className="h-5 w-5 fill-red-500" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white uppercase font-display text-xs">YOUTUBE</h4>
                  <p className="text-[10px] text-red-400 font-bold">Live Stream</p>
                </div>
              </div>
              <span className="inline-flex items-center justify-center space-x-1 rounded-xl bg-red-600 py-2 text-[11px] font-black uppercase text-white shadow-md">
                <span>SUBSCRIBE</span>
                <BellRing className="h-3 w-3" />
              </span>
            </a>

            {/* WhatsApp Card */}
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-green-500/50 bg-surface-100/90 p-4 hover:border-green-400 hover:scale-102 transition-all shadow-[0_0_20px_rgba(34,197,94,0.2)] flex flex-col justify-between"
            >
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500/20 text-green-400 border border-green-500/40">
                  <MessageSquareCode className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white uppercase font-display text-xs">WHATSAPP</h4>
                  <p className="text-[10px] text-green-400 font-bold">Instant Pass</p>
                </div>
              </div>
              <span className="inline-flex items-center justify-center rounded-xl bg-green-500 py-2 text-[11px] font-black uppercase text-slate-950">
                JOIN GROUP
              </span>
            </a>

            {/* Discord Card */}
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-indigo-500/50 bg-surface-100/90 p-4 hover:border-indigo-400 hover:scale-102 transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)] flex flex-col justify-between"
            >
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40">
                  <Discord className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white uppercase font-display text-xs">DISCORD</h4>
                  <p className="text-[10px] text-indigo-400 font-bold">Voice Scrims</p>
                </div>
              </div>
              <span className="inline-flex items-center justify-center rounded-xl bg-indigo-500 py-2 text-[11px] font-black uppercase text-white">
                JOIN SERVER
              </span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};
