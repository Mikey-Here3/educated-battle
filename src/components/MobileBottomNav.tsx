'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Wallet, Swords, Trophy, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  const tabs = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/wallet', label: 'Wallet', icon: Wallet },
    { href: '/matches', label: 'Matches', icon: Swords },
    { href: '/leaderboard', label: 'Ranks', icon: Trophy },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 md:hidden pointer-events-none">
      <div className="mx-auto max-w-md pointer-events-auto rounded-3xl border border-crimson/40 bg-surface-100/95 p-1.5 shadow-[0_-10px_30px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`relative flex flex-col items-center justify-center py-2 px-3 transition-all duration-200 ${
                  isActive ? 'text-neon-gold font-black' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {/* Active Pill Glow */}
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl bg-crimson/20 border border-crimson/60 shadow-[0_0_15px_rgba(255,0,60,0.35)]" />
                )}

                <Icon className={`relative z-10 h-5 w-5 ${isActive ? 'text-neon-gold animate-pulse' : 'text-slate-400'}`} />
                <span className="relative z-10 text-[10px] font-bold mt-1 tracking-wider uppercase">
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
