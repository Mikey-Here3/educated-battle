'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { User, ShieldCheck, Trophy, Swords, Zap, Key, Settings, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const [ign, setIgn] = useState('PK_CYBORG_FF');
  const [uid, setUid] = useState('489201482');
  const [phone, setPhone] = useState('03409842109');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <Navbar userBalance={1250} />
      
      <main className="flex-grow mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        {/* Profile Header Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-crimson/40 bg-gradient-to-r from-crimson-dark/90 via-surface-200 to-slate-950 p-6 sm:p-10 mb-8 shadow-[0_0_40px_rgba(255,0,60,0.25)]">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative h-24 w-24 rounded-full border-4 border-crimson p-1 shadow-[0_0_25px_rgba(255,0,60,0.5)] bg-surface-100 shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80" 
                alt="Profile Avatar" 
                className="h-full w-full rounded-full object-cover"
              />
              <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-neon-gold text-xs font-black text-slate-950 shadow-md">
                👑
              </span>
            </div>

            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <span className="rounded-lg bg-crimson/20 px-2.5 py-0.5 text-[11px] font-black uppercase text-crimson-light border border-crimson/40">
                  PRO ESPORTS PLAYER
                </span>
                <span className="rounded-lg bg-neon-gold/20 px-2.5 py-0.5 text-[11px] font-black uppercase text-neon-gold border border-neon-gold/40">
                  PAKISTAN 🇵🇰
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white font-display uppercase tracking-tight mt-1">
                {ign}
              </h1>
              <p className="text-xs font-semibold text-slate-300 font-mono mt-0.5">
                Free Fire UID: <strong className="text-neon-cyan">{uid}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* User Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="rounded-2xl border border-crimson/30 bg-surface-200 p-5 text-center">
            <Trophy className="mx-auto h-6 w-6 text-neon-gold mb-1" />
            <p className="text-2xl font-black text-white font-display">PKR 142,500</p>
            <p className="text-[11px] font-semibold text-slate-400 uppercase">Total Cash Earned</p>
          </div>

          <div className="rounded-2xl border border-crimson/30 bg-surface-200 p-5 text-center">
            <Swords className="mx-auto h-6 w-6 text-crimson-light mb-1" />
            <p className="text-2xl font-black text-white font-display">184</p>
            <p className="text-[11px] font-semibold text-slate-400 uppercase">Matches Played</p>
          </div>

          <div className="rounded-2xl border border-crimson/30 bg-surface-200 p-5 text-center">
            <Zap className="mx-auto h-6 w-6 text-neon-cyan mb-1" />
            <p className="text-2xl font-black text-white font-display">612</p>
            <p className="text-[11px] font-semibold text-slate-400 uppercase">Total Kills</p>
          </div>

          <div className="rounded-2xl border border-crimson/30 bg-surface-200 p-5 text-center">
            <ShieldCheck className="mx-auto h-6 w-6 text-neon-green mb-1" />
            <p className="text-2xl font-black text-white font-display">38.4%</p>
            <p className="text-[11px] font-semibold text-slate-400 uppercase">Win Rate</p>
          </div>
        </div>

        {/* Profile Settings Form */}
        <div className="rounded-3xl border border-crimson/40 bg-surface-200/90 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex items-center space-x-2 border-b border-crimson/30 pb-4 mb-6">
            <Settings className="h-5 w-5 text-crimson-light" />
            <h3 className="text-xl font-extrabold text-white uppercase font-display">
              ACCOUNT & GAME DETAILS
            </h3>
          </div>

          {saved && (
            <div className="mb-4 flex items-center space-x-2 rounded-xl border border-neon-green/40 bg-neon-green/10 p-3 text-xs font-bold text-neon-green">
              <CheckCircle2 className="h-4 w-4" />
              <span>Profile settings saved successfully!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Free Fire In-Game Name (IGN)
                </label>
                <input
                  type="text"
                  value={ign}
                  onChange={(e) => setIgn(e.target.value)}
                  className="w-full rounded-xl border border-crimson/30 bg-surface-100 p-3 text-sm text-white focus:border-crimson focus:outline-none"
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
                  className="w-full rounded-xl border border-crimson/30 bg-surface-100 p-3 text-sm text-white focus:border-crimson focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
                  Pakistan Phone Number (EasyPaisa/JazzCash)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-crimson/30 bg-surface-100 p-3 text-sm text-white focus:border-crimson focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-crimson-dark via-crimson to-crimson-light px-8 py-3 text-xs font-black uppercase text-white shadow-[0_0_20px_rgba(255,0,60,0.4)] transition-all hover:scale-102"
            >
              SAVE PROFILE CHANGES
            </button>
          </form>
        </div>

      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
