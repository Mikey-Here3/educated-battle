'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { useAuth } from '@/context/AuthContext';
import { User, ShieldCheck, Trophy, Swords, Zap, Key, Settings, CheckCircle2, LogIn, Phone, Gamepad2, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const [ign, setIgn] = useState(currentUser?.ign || 'PK_CYBORG_FF');
  const [uid, setUid] = useState(currentUser?.uid || '489201482');
  const [phone, setPhone] = useState(currentUser?.phone || '03190799711');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <Navbar />
      
      <main className="flex-grow mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        {currentUser ? (
          <>
            {/* Profile Header Banner */}
            <div className="relative overflow-hidden rounded-3xl border border-crimson/40 bg-gradient-to-r from-crimson/20 via-surface-200 to-black p-6 sm:p-10 mb-8 shadow-[0_0_40px_rgba(255,0,60,0.25)]">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="relative h-24 w-24 rounded-full border-4 border-crimson p-1 shadow-[0_0_25px_rgba(255,0,60,0.5)] bg-surface-100 shrink-0 flex items-center justify-center text-3xl font-black text-white uppercase">
                  {currentUser.ign.slice(0, 2)}
                  <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-neon-gold text-xs font-black text-black shadow-md">
                    ??
                  </span>
                </div>

                <div className="text-center sm:text-left flex-grow">
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <span className="rounded-lg bg-crimson/20 px-2.5 py-0.5 text-[11px] font-black uppercase text-crimson border border-crimson/40">
                      {currentUser.role === 'admin' ? 'ADMINISTRATOR' : 'VERIFIED PRO PLAYER'}
                    </span>
                    <span className="rounded-lg bg-neon-gold/20 px-2.5 py-0.5 text-[11px] font-black uppercase text-neon-gold border border-neon-gold/40">
                      PAKISTAN ????
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-black text-white font-display uppercase tracking-tight mt-1">
                    {currentUser.ign}
                  </h1>
                  <p className="text-xs font-semibold text-slate-300 font-mono mt-0.5">
                    Free Fire UID: <strong className="text-neon-gold">{currentUser.uid}</strong> ? {currentUser.name}
                  </p>
                </div>

                <button
                  onClick={logout}
                  className="rounded-xl border border-crimson/50 bg-crimson/15 hover:bg-crimson px-4 py-2 text-xs font-bold text-white transition flex items-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* User Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="rounded-2xl border border-white/10 bg-surface-200 p-5 text-center">
                <Trophy className="mx-auto h-6 w-6 text-neon-gold mb-1" />
                <p className="text-2xl font-black text-white font-display">PKR {currentUser.winningPKR.toLocaleString()}</p>
                <p className="text-[11px] font-semibold text-slate-400 uppercase">Total Winning Payouts</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-surface-200 p-5 text-center">
                <Swords className="mx-auto h-6 w-6 text-crimson mb-1" />
                <p className="text-2xl font-black text-white font-display">PKR {currentUser.balancePKR.toLocaleString()}</p>
                <p className="text-[11px] font-semibold text-slate-400 uppercase">Available Coin Balance</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-surface-200 p-5 text-center">
                <Gamepad2 className="mx-auto h-6 w-6 text-neon-gold mb-1" />
                <p className="text-2xl font-black text-white font-display">{currentUser.uid}</p>
                <p className="text-[11px] font-semibold text-slate-400 uppercase">Player Free Fire UID</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-surface-200 p-5 text-center">
                <ShieldCheck className="mx-auto h-6 w-6 text-emerald-400 mb-1" />
                <p className="text-2xl font-black text-emerald-400 font-display">ACTIVE</p>
                <p className="text-[11px] font-semibold text-slate-400 uppercase">Anti-Cheat Status</p>
              </div>
            </div>

            {/* Profile Settings Form */}
            <div className="rounded-3xl border border-white/10 bg-surface-100 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center space-x-2 border-b border-white/10 pb-4 mb-6">
                <Settings className="h-5 w-5 text-crimson" />
                <h3 className="text-xl font-extrabold text-white uppercase font-display">
                  ACCOUNT &amp; GAME CREDENTIALS
                </h3>
              </div>

              {saved && (
                <div className="mb-4 flex items-center space-x-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Profile details updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                      Free Fire In-Game Name (IGN)
                    </label>
                    <input
                      type="text"
                      value={ign}
                      onChange={(e) => setIgn(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-surface-200 p-3 text-sm text-white focus:border-crimson focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                      Free Fire UID (Numeric ID)
                    </label>
                    <input
                      type="text"
                      value={uid}
                      onChange={(e) => setUid(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-surface-200 p-3 text-sm text-white font-mono focus:border-crimson focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                      WhatsApp / Phone Number (JazzCash)
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-surface-200 p-3 text-sm text-white font-mono focus:border-crimson focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-crimson to-crimson-dark px-8 py-3 text-xs font-black uppercase text-white shadow-[0_0_20px_rgba(255,0,60,0.4)] transition-all"
                >
                  SAVE PROFILE CHANGES
                </button>
              </form>
            </div>
          </>
        ) : (
          /* Guest mode */
          <div className="rounded-3xl border border-white/10 bg-surface-100 p-10 text-center max-w-lg mx-auto space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-crimson/20 text-crimson border border-crimson/40 mx-auto">
              <User className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-black text-white font-display uppercase">Sign In to View Gamer Profile</h2>
            <p className="text-xs text-slate-400">
              Create an account or sign in with your Free Fire UID to view tournament history, earnings, and personal statistics.
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-crimson px-6 py-3 text-xs font-black uppercase text-white shadow-[0_0_20px_rgba(255,0,60,0.4)] hover:bg-crimson-dark transition"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In / Register</span>
              </Link>
            </div>
          </div>
        )}

      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
