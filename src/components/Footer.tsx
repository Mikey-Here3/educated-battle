'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Youtube, Phone, ShieldCheck, Trophy, Wallet, HelpCircle, Heart } from 'lucide-react';
import { SOCIAL_LINKS } from '@/data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-crimson/30 bg-background/95 pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="relative h-12 w-56">
              <Image 
                src="/logo.svg" 
                alt="Educated Gamer Logo" 
                fill 
                className="object-contain object-left" 
              />
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Pakistan&apos;s most competitive esports arena for Free Fire &amp; Free Fire MAX custom rooms. Built with 100% fair play, secure payouts, and verified anti-cheat standards.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/20 text-red-400 border border-red-600/40 hover:bg-red-600 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5 fill-current" />
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-600 hover:text-white transition-colors"
                aria-label="WhatsApp Channel"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-neon-gold tracking-widest font-display">Arena Navigation</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              <li><Link href="/" className="hover:text-white transition">Home Arena</Link></li>
              <li><Link href="/matches" className="hover:text-white transition">Tournaments &amp; Matches</Link></li>
              <li><Link href="/leaderboard" className="hover:text-white transition">Hall of Fame</Link></li>
              <li><Link href="/wallet" className="hover:text-white transition">Wallet &amp; JazzCash</Link></li>
            </ul>
          </div>

          {/* Fair Play & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-neon-gold tracking-widest font-display">Support &amp; Rules</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              <li><Link href="/rules" className="hover:text-white transition">Fair Play &amp; Anti-Cheat</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Admin Desk</Link></li>
              <li><Link href="/login" className="hover:text-white transition">Player / Admin Login</Link></li>
              <li className="text-[11px] text-slate-500">JazzCash: {SOCIAL_LINKS.phone}</li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>? {new Date().getFullYear()} EDUCATED GAMER ARENA. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Powered for Pakistan Free Fire Esports</span>
            <Heart className="h-3.5 w-3.5 text-crimson fill-crimson" />
          </p>
        </div>

      </div>
    </footer>
  );
};
