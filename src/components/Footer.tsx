'use client';

import React from 'react';
import Image from 'next/image';
import { Gamepad2, ShieldCheck, Heart, Circle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-purple-900/30 bg-surface-100/90 pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-purple-900/30">
          
          {/* Col 1: Brand & Logo */}
          <div className="md:col-span-2 space-y-4">
            <div className="relative h-12 w-56">
              <Image 
                src="/logo.svg" 
                alt="Educated Gamer Logo" 
                fill 
                className="object-contain object-left"
              />
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              EDUCATED GAMER is Pakistan's leading esports tournament platform for Free Fire & Free Fire MAX. Join daily custom matches, earn per-kill rewards, and withdraw cash via EasyPaisa and JazzCash.
            </p>
            
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span className="flex h-2.5 w-2.5 rounded-full bg-neon-green animate-pulse" />
              <span className="font-semibold text-slate-300">All Custom Room Servers Operational</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-neon-purple-light tracking-wider font-display">
              QUICK NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><a href="#tournaments" className="hover:text-white transition-colors">Daily Tournaments</a></li>
              <li><a href="#leaderboard" className="hover:text-white transition-colors">Pakistan Leaderboard</a></li>
              <li><a href="#wallet" className="hover:text-white transition-colors">Wallet & Cash Cashout</a></li>
              <li><a href="#rules" className="hover:text-white transition-colors">Rules & Fair Play</a></li>
              <li><a href="#community" className="hover:text-white transition-colors">WhatsApp & Discord</a></li>
            </ul>
          </div>

          {/* Col 3: Payment Partners */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-neon-cyan tracking-wider font-display">
              PAKISTAN PAYMENTS
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center space-x-2 rounded-xl bg-surface-200 p-2.5 border border-purple-900/30">
                <span className="text-neon-green font-bold">📲 EasyPaisa</span>
                <span className="text-[10px] text-slate-400">Instant Escrow</span>
              </div>
              <div className="flex items-center space-x-2 rounded-xl bg-surface-200 p-2.5 border border-purple-900/30">
                <span className="text-neon-fire font-bold">📲 JazzCash</span>
                <span className="text-[10px] text-slate-400">24/7 Cashout</span>
              </div>
              <div className="flex items-center space-x-2 rounded-xl bg-surface-200 p-2.5 border border-purple-900/30">
                <span className="text-neon-cyan font-bold">🏦 Bank Transfer</span>
                <span className="text-[10px] text-slate-400">All PK Banks</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights & Region Footer */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} EDUCATED GAMER ARENA. All Rights Reserved.</p>
          <p className="flex items-center space-x-1 font-semibold text-slate-300">
            <span>Crafted for Free Fire Gamers in Pakistan 🇵🇰</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
