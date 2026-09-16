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
    { href: '/matches', label: 'Matches', icon: Swords, isCenter: true },
    { href: '/leaderboard', label: 'Ranks', icon: Trophy },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#060914]/95 backdrop-blur-2xl border-t border-white/10 pt-1.5 pb-[max(env(safe-area-inset-bottom,8px),10px)] px-3 shadow-[0_-10px_35px_rgba(0,0,0,0.8)]"
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;

          if (tab.isCenter) {
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="relative -top-3 flex flex-col items-center justify-center group focus:outline-none"
              >
                {/* Glowing elevated button for Matches */}
                <div 
                  className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${
                    isActive
                      ? 'scale-110 shadow-[0_0_25px_var(--color-primary)]'
                      : 'hover:scale-105 shadow-[0_4px_15px_rgba(0,0,0,0.6)]'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                    border: '1.5px solid rgba(255,255,255,0.25)',
                  }}
                >
                  <Icon className="h-6 w-6 text-white drop-shadow-md animate-pulse" />
                </div>
                <span 
                  className={`text-[10px] font-black uppercase tracking-wider mt-1 transition-colors ${
                    isActive ? 'text-primary' : 'text-slate-300'
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex-1 flex flex-col items-center justify-center py-1 relative group focus:outline-none"
            >
              {/* Top active neon indicator bar */}
              {isActive && (
                <span 
                  className="absolute -top-1.5 h-0.5 w-8 rounded-full shadow-[0_0_8px_var(--color-primary)] transition-all"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                />
              )}

              <div 
                className={`p-1.5 rounded-xl transition-all ${
                  isActive ? 'bg-primary/20 text-primary' : 'text-slate-400 group-hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span 
                className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  isActive ? 'text-primary font-black' : 'text-slate-400'
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
