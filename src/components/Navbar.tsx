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
  Zap,
  HelpCircle,
  ShieldAlert
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

  const navLinks = [
    { href: '/', label: 'Home', icon: Gamepad2 },
    { href: '/matches', label: 'Matches', icon: Trophy },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { href: '/wallet', label: 'Wallet', icon: Wallet },
    { href: '/profile', label: 'Profile', icon: UserCheck },
    { href: '/rules', label: 'Rules', icon: ShieldCheck },
    { href: '/contact', label: 'Contact', icon: HelpCircle },
    { href: '/admin', label: 'Admin', icon: ShieldAlert },
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

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            const isAdmin = link.href === '/admin';
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-crimson/20 text-crimson-light border border-crimson/60 shadow-[0_0_15px_rgba(255,0,60,0.3)]'
                    : isAdmin
                    ? 'bg-neon-gold/15 text-neon-gold border border-neon-gold/40 hover:bg-neon-gold/25'
                    : 'text-slate-300 hover:bg-surface-200 hover:text-white'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-neon-gold animate-pulse' : isAdmin ? 'text-neon-gold' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right User Actions */}
        <div className="flex items-center space-x-3">
          
          {/* User Balance & Deposit Pill */}
          <div className="hidden sm:flex items-center space-x-2 rounded-xl border border-crimson/30 bg-surface-200/90 p-1.5 backdrop-blur-md">
            <Link 
              href="/wallet"
              className="flex items-center space-x-1.5 px-2.5 text-xs font-bold text-slate-200 hover:text-neon-gold transition-colors"
            >
              <Zap className="h-3.5 w-3.5 text-neon-gold fill-neon-gold" />
              <span className="text-slate-400 font-normal">Bal:</span>
              <span className="text-crimson-light font-extrabold text-sm">PKR {userBalance.toLocaleString()}</span>
            </Link>
            
            <Link
              href="/wallet"
              className="flex items-center space-x-1 rounded-lg bg-gradient-to-r from-crimson-dark via-crimson to-crimson-light px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_15px_rgba(255,0,60,0.4)] transition-all hover:scale-105 active:scale-95"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Deposit</span>
            </Link>
          </div>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative rounded-xl border border-crimson/30 bg-surface-200 p-2.5 text-slate-300 transition-colors hover:border-crimson/60 hover:text-white"
            title="Notifications"
          >
            <Bell className="h-5 w-5 text-slate-300" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-crimson text-[10px] font-bold text-white ring-2 ring-background animate-pulse">
              3
            </span>
          </button>

          {/* User Profile Quick Avatar */}
          <Link
            href="/profile"
            className="hidden lg:flex items-center space-x-2 rounded-xl border border-crimson/30 bg-surface-100 p-1.5 pr-3 hover:border-crimson/60 transition-colors"
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-crimson to-neon-gold p-0.5 shadow-md">
              <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-surface-200">
                <UserCheck className="h-4 w-4 text-neon-gold" />
              </div>
            </div>
            <div className="text-left leading-none">
              <p className="text-xs font-extrabold text-white">PK_CYBORG</p>
              <p className="text-[10px] font-semibold text-crimson-light">UID: 489201</p>
            </div>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-crimson/30 bg-surface-200 p-2.5 text-slate-300 hover:text-white md:hidden"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Smooth Animated Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="overflow-hidden border-b border-crimson/40 bg-surface-100/98 px-4 pt-3 pb-6 backdrop-blur-2xl md:hidden"
          >
            <div className="mb-4 flex items-center justify-between rounded-xl border border-crimson/40 bg-surface-200 p-3">
              <div>
                <p className="text-xs text-slate-400 font-medium">Your Account Balance</p>
                <p className="text-lg font-black text-crimson-light">PKR {userBalance.toLocaleString()}</p>
              </div>
              <Link
                href="/wallet"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg bg-gradient-to-r from-crimson to-crimson-light px-4 py-2 text-xs font-black uppercase text-white shadow-lg"
              >
                + Deposit PKR
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                const isAdmin = link.href === '/admin';
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 rounded-xl px-3.5 py-3 text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-crimson/20 text-crimson-light border border-crimson/60 shadow-md'
                        : isAdmin
                        ? 'bg-neon-gold/15 text-neon-gold border border-neon-gold/40'
                        : 'text-slate-300 hover:bg-surface-200'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? 'text-neon-gold' : isAdmin ? 'text-neon-gold' : 'text-slate-400'}`} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
