'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Wallet, 
  ShieldCheck, 
  Bell, 
  Menu, 
  X, 
  PlusCircle, 
  Gamepad2, 
  UserCheck,
  HelpCircle,
  LogIn
} from 'lucide-react';

interface NavbarProps {
  userBalance?: number;
  onOpenNotifications?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userBalance = 1250,
  onOpenNotifications,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Public links - NO admin link exposed in public navigation
  const navLinks = [
    { href: '/', label: 'Home', icon: Gamepad2 },
    { href: '/matches', label: 'Matches', icon: Trophy },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { href: '/wallet', label: 'Wallet', icon: Wallet },
    { href: '/profile', label: 'Profile', icon: UserCheck },
    { href: '/rules', label: 'Rules', icon: ShieldCheck },
    { href: '/contact', label: 'Contact', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-crimson/30 bg-background/85 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo Link */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative h-12 w-48 sm:h-14 sm:w-60 transition-transform duration-300 group-hover:scale-105">
            <Image 
              src="/logo.svg" 
              alt="Educated Gamer Logo" 
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-2 rounded-xl px-3.5 py-2 text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-crimson/15 text-neon-gold border border-crimson/50 shadow-[0_0_15px_rgba(255,0,60,0.3)]'
                    : 'text-slate-300 hover:bg-surface-200 hover:text-white border border-transparent'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-neon-gold' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Side CTA: Balance & Sign In */}
        <div className="flex items-center space-x-3">
          
          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-surface-200/80 text-slate-300 transition-colors hover:border-crimson hover:text-white"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-crimson animate-ping" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-crimson" />
          </button>

          {/* Quick Wallet Pill */}
          <Link
            href="/wallet"
            className="flex items-center space-x-2 rounded-xl border border-neon-gold/30 bg-surface-100/90 px-3 py-1.5 shadow-[0_0_15px_rgba(255,215,0,0.1)] transition-all hover:border-neon-gold hover:shadow-[0_0_20px_rgba(255,215,0,0.25)] group"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neon-gold/10 text-neon-gold">
              <Wallet className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Balance</span>
              <span className="text-xs font-black text-neon-gold">? {userBalance.toLocaleString()}</span>
            </div>
            <div className="pl-1 text-crimson hover:text-crimson-light">
              <PlusCircle className="h-4 w-4" />
            </div>
          </Link>

          {/* Sign In Button */}
          <Link
            href="/login"
            className="hidden sm:flex items-center space-x-1.5 rounded-xl border border-crimson/50 bg-crimson/20 hover:bg-crimson hover:text-white px-3.5 py-2 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_15px_rgba(255,0,60,0.25)] transition-all duration-200"
          >
            <LogIn className="h-3.5 w-3.5" />
            <span>Sign In</span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-crimson/40 bg-surface-200 text-slate-200 md:hidden hover:border-crimson hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-crimson" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="border-b border-crimson/30 bg-surface-100/98 backdrop-blur-2xl md:hidden overflow-hidden"
          >
            <div className="space-y-1.5 px-4 pt-3 pb-6">
              <div className="grid grid-cols-2 gap-2 mb-3">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-2.5 rounded-xl p-3 text-sm font-bold transition-all ${
                        isActive
                          ? 'bg-crimson/20 text-neon-gold border border-crimson/50 shadow-[0_0_15px_rgba(255,0,60,0.2)]'
                          : 'bg-surface-200/50 text-slate-300 border border-white/5 hover:bg-surface-200 hover:text-white'
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? 'text-neon-gold' : 'text-slate-400'}`} />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Sign In */}
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 w-full rounded-xl bg-gradient-to-r from-crimson to-crimson-dark py-3 text-sm font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(255,0,60,0.4)]"
              >
                <LogIn className="h-4 w-4" />
                <span>Account Sign In</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
