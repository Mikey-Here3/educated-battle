'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
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
  LogIn,
  LogOut,
  User,
  ShieldAlert
} from 'lucide-react';

interface NavbarProps {
  onOpenNotifications?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenNotifications,
}) => {
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home', icon: Gamepad2 },
    { href: '/matches', label: 'Matches', icon: Trophy },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { href: '/wallet', label: 'Wallet', icon: Wallet },
    { href: '/rules', label: 'Rules', icon: ShieldCheck },
    { href: '/contact', label: 'Contact', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-crimson/30 bg-background/90 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
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

        {/* Right Side Header Controls */}
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

          {/* User Account / Balance Pill if Signed In */}
          {currentUser ? (
            <div className="relative">
              <div className="flex items-center space-x-2">
                {/* Wallet Balance Pill */}
                <Link
                  href="/wallet"
                  className="flex items-center space-x-2 rounded-xl border border-neon-gold/40 bg-surface-100/90 px-3 py-1.5 shadow-[0_0_15px_rgba(255,215,0,0.15)] transition-all hover:border-neon-gold group"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neon-gold/10 text-neon-gold">
                    <Wallet className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Balance</span>
                    <span className="text-xs font-black text-neon-gold">? {currentUser.balancePKR.toLocaleString()}</span>
                  </div>
                  <div className="pl-1 text-crimson hover:text-crimson-light">
                    <PlusCircle className="h-4 w-4" />
                  </div>
                </Link>

                {/* User Dropdown Trigger */}
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center space-x-2 rounded-xl border border-white/10 bg-surface-200 px-3 py-1.5 hover:border-crimson transition"
                >
                  <div className="h-7 w-7 rounded-lg bg-crimson/20 border border-crimson/40 flex items-center justify-center text-xs font-black text-white uppercase">
                    {currentUser.ign.slice(0, 2)}
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-black text-white line-clamp-1 max-w-[100px]">{currentUser.ign}</span>
                    <span className="text-[9px] text-slate-400 font-mono">UID: {currentUser.uid}</span>
                  </div>
                </button>
              </div>

              {/* User Dropdown Menu */}
              {userDropdown && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-crimson/30 bg-surface-100/98 p-2 shadow-2xl backdrop-blur-xl z-50">
                  <div className="px-3 py-2 border-b border-white/5 mb-1">
                    <p className="text-xs font-black text-white">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono">FF UID: {currentUser.uid}</p>
                    {currentUser.role === 'admin' && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded bg-crimson/20 text-crimson text-[9px] font-black uppercase">
                        Admin Deck
                      </span>
                    )}
                  </div>

                  {currentUser.role === 'admin' && (
                    <Link
                      href="/admin"
                      onClick={() => setUserDropdown(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-neon-gold hover:bg-surface-200 transition"
                    >
                      <ShieldAlert className="w-4 h-4" />
                      <span>Admin Control Deck</span>
                    </Link>
                  )}

                  <Link
                    href="/profile"
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-300 hover:bg-surface-200 hover:text-white transition"
                  >
                    <User className="w-4 h-4" />
                    <span>Player Profile & Stats</span>
                  </Link>

                  <Link
                    href="/wallet"
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-300 hover:bg-surface-200 hover:text-white transition"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>Wallet & Transactions</span>
                  </Link>

                  <button
                    onClick={() => {
                      setUserDropdown(false);
                      logout();
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-crimson hover:bg-crimson/10 transition mt-1 border-t border-white/5"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                href="/login"
                className="flex items-center space-x-1.5 rounded-xl border border-crimson/50 bg-gradient-to-r from-crimson to-crimson-dark px-4 py-2 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(255,0,60,0.35)] transition-all hover:shadow-[0_0_30px_rgba(255,0,60,0.6)]"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Sign In</span>
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-crimson/40 bg-surface-200 text-slate-200 md:hidden hover:border-crimson hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-crimson" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="border-b border-crimson/30 bg-surface-100/98 backdrop-blur-2xl md:hidden overflow-hidden"
          >
            <div className="space-y-2 px-4 pt-3 pb-6">
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

              {currentUser ? (
                <div className="rounded-2xl border border-white/10 bg-surface-200/70 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black text-white">{currentUser.ign}</p>
                      <p className="text-xs text-slate-400 font-mono">UID: {currentUser.uid}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Balance</span>
                      <p className="text-sm font-black text-neon-gold">PKR {currentUser.balancePKR.toLocaleString()}</p>
                    </div>
                  </div>
                  {currentUser.role === 'admin' && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full rounded-xl bg-neon-gold/20 border border-neon-gold/40 py-2.5 text-xs font-black text-neon-gold uppercase"
                    >
                      <ShieldAlert className="w-4 h-4" />
                      <span>Admin Control Deck</span>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full rounded-xl bg-crimson/20 border border-crimson/40 py-2.5 text-xs font-bold text-crimson"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full rounded-xl bg-gradient-to-r from-crimson to-crimson-dark py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(255,0,60,0.4)]"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Account Sign In / Register</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
