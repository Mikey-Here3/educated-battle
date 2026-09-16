'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Youtube, MessageCircle, ShieldCheck, Trophy, Wallet, HelpCircle, Heart, ArrowRight } from 'lucide-react';
import { PLATFORM_CONFIG, getWhatsAppSupportUrl } from '@/data/config';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#05070e] pt-12 pb-24 md:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="sm:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-crimson to-primary p-[1.5px] shadow-[0_0_15px_rgba(255,0,60,0.4)]">
                <div className="h-full w-full rounded-[10px] bg-[#070913] flex items-center justify-center">
                  <span className="font-display font-black text-sm text-white tracking-tighter">
                    E<span className="text-crimson">G</span>
                  </span>
                </div>
              </div>
              <span className="font-display font-black text-lg text-white tracking-wider uppercase">
                {PLATFORM_CONFIG.brandName}
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Pakistan&apos;s premier competitive esports arena for Free Fire &amp; Free Fire MAX custom room tournaments. Win verified PKR cash, earn per-kill bounties, and withdraw instantly to JazzCash or EasyPaisa.
            </p>

            {/* Chat With Admin Direct CTA */}
            <div className="pt-2">
              <a
                href={getWhatsAppSupportUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 rounded-xl bg-emerald-600/20 border border-emerald-500/40 px-4 py-2 text-xs font-black uppercase text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>CHAT WITH ADMIN (WHATSAPP)</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-1">
              <a
                href={PLATFORM_CONFIG.youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600/20 text-red-400 border border-red-600/40 hover:bg-red-600 hover:text-white transition-colors"
                aria-label="YouTube Channel"
              >
                <Youtube className="h-4 w-4 fill-current" />
              </a>
              <a
                href={PLATFORM_CONFIG.whatsappChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-600 hover:text-white transition-colors"
                aria-label="WhatsApp Channel"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Tournaments Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-neon-gold tracking-widest font-display">Tournaments</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              <li><Link href="/matches?status=live" className="hover:text-white transition">🔴 Live Tournaments</Link></li>
              <li><Link href="/matches?status=upcoming" className="hover:text-white transition">⏰ Upcoming Matches</Link></li>
              <li><Link href="/matches?status=completed" className="hover:text-white transition">🏆 Results &amp; Winners</Link></li>
              <li><Link href="/leaderboard" className="hover:text-white transition">🥇 Top Players Leaderboard</Link></li>
            </ul>
          </div>

          {/* Community & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-neon-gold tracking-widest font-display">Community &amp; Support</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              <li>
                <a href={PLATFORM_CONFIG.youtubeChannelUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  YouTube Broadcasts
                </a>
              </li>
              <li>
                <a href={PLATFORM_CONFIG.whatsappChannelUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  WhatsApp Official Channel
                </a>
              </li>
              <li><Link href="/rules" className="hover:text-white transition">Fair Play &amp; Anti-Cheat</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Admin Desk</Link></li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-neon-gold tracking-widest font-display">Platform Info</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              <li><Link href="/wallet" className="hover:text-white transition">Wallet &amp; Deposits</Link></li>
              <li><Link href="/rules" className="hover:text-white transition">Tournament Terms</Link></li>
              <li><Link href="/rules" className="hover:text-white transition">Refund &amp; Payout Rules</Link></li>
              <li className="text-[11px] text-slate-500 pt-1">JazzCash: {PLATFORM_CONFIG.whatsappSupportPhone}</li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} {PLATFORM_CONFIG.brandName} Arena • Pakistan 🇵🇰. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Crafted for Free Fire Esports</span>
            <Heart className="h-3.5 w-3.5 text-crimson fill-crimson" />
          </p>
        </div>

      </div>
    </footer>
  );
};
