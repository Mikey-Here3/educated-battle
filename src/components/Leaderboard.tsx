'use client';

import React, { useState } from 'react';
import { useTournaments } from '@/context/TournamentContext';
import { Trophy, Medal, Search, Flame, Swords, Zap, Crown } from 'lucide-react';

export const Leaderboard: React.FC = () => {
  const { leaderboard } = useTournaments();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlayers = leaderboard.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ign.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.uid.includes(searchQuery)
  );

  const top1 = leaderboard[0] || {
    rank: 1,
    name: 'Ashan Akhtar (Admin)',
    ign: 'EG_COMMANDER_PK',
    uid: '100000001',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=EG_COMMANDER',
    earningsPKR: 125400,
    matchesPlayed: 88,
    totalKills: 412,
  };
  const top2 = leaderboard[1] || {
    rank: 2,
    name: 'Hamza Khan',
    ign: 'PK_CYBORG_FF',
    uid: '489201482',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=CYBORG',
    earningsPKR: 84200,
    matchesPlayed: 64,
    totalKills: 320,
  };
  const top3 = leaderboard[2] || {
    rank: 3,
    name: 'Ali Raza',
    ign: 'EG_SHADOW_99',
    uid: '773918204',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=SHADOW',
    earningsPKR: 62500,
    matchesPlayed: 51,
    totalKills: 245,
  };

  return (
    <section id="leaderboard" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 rounded-full border border-neon-gold/40 bg-surface-200 px-4 py-1.5 text-xs font-black uppercase text-neon-gold mb-3 shadow-[0_0_20px_rgba(255,190,26,0.2)]">
          <Crown className="h-4 w-4" />
          <span>TOP PAKISTAN FREE FIRE PLAYERS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display uppercase tracking-tight">
          HALL OF FAME LEADERBOARD
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-300">
          Ranked by verified tournament cash payouts (PKR), total match victories, and verified kill bounties.
        </p>
      </div>

      {/* Top 3 Podium Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end">
        
        {/* 2nd Place - Silver */}
        <div className="order-2 md:order-1 rounded-3xl border border-slate-400/40 bg-surface-200/90 p-6 text-center backdrop-blur-md relative shadow-[0_0_30px_rgba(203,213,225,0.15)]">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-400 px-3 py-0.5 text-xs font-black text-slate-950 uppercase shadow-md">
            RANK #2
          </div>
          <div className="mx-auto h-20 w-20 rounded-full border-2 border-slate-300 p-1 mb-3 relative">
            <img src={top2.avatar} alt={top2.ign} className="h-full w-full rounded-full object-cover" />
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-300 text-xs font-black text-slate-950">??</span>
          </div>
          <h3 className="text-lg font-black text-white font-display">{top2.ign}</h3>
          <p className="text-xs text-slate-400 font-semibold">{top2.name} (UID: {top2.uid})</p>
          <div className="mt-4 rounded-xl bg-surface-300/80 p-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase">EARNINGS</span>
            <p className="text-xl font-black text-neon-gold font-display">PKR {top2.earningsPKR.toLocaleString()}</p>
          </div>
        </div>

        {/* 1st Place - Gold Champion */}
        <div className="order-1 md:order-2 rounded-3xl border-2 border-neon-gold bg-surface-200/95 p-8 text-center backdrop-blur-md relative shadow-[0_0_50px_rgba(255,190,26,0.35)] scale-105">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-neon-gold px-4 py-1 text-xs font-black text-slate-950 uppercase shadow-lg flex items-center space-x-1">
            <Trophy className="h-3.5 w-3.5" />
            <span>#1 GRANDMASTER</span>
          </div>
          <div className="mx-auto h-24 w-24 rounded-full border-4 border-neon-gold p-1 mb-3 relative shadow-[0_0_25px_rgba(255,190,26,0.5)]">
            <img src={top1.avatar} alt={top1.ign} className="h-full w-full rounded-full object-cover" />
            <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-neon-gold text-xs font-black text-slate-950 shadow-md">??</span>
          </div>
          <h3 className="text-2xl font-black text-white font-display">{top1.ign}</h3>
          <p className="text-xs text-neon-gold font-bold">{top1.name} (UID: {top1.uid})</p>
          <div className="mt-4 rounded-2xl bg-gradient-to-r from-neon-gold/20 via-surface-300 to-neon-gold/20 p-4 border border-neon-gold/40">
            <span className="text-[10px] font-black uppercase text-neon-gold tracking-widest">TOTAL PRIZE WINNINGS</span>
            <p className="text-3xl font-black text-white font-display">PKR {top1.earningsPKR.toLocaleString()}</p>
          </div>
        </div>

        {/* 3rd Place - Bronze */}
        <div className="order-3 rounded-3xl border border-amber-700/40 bg-surface-200/90 p-6 text-center backdrop-blur-md relative shadow-[0_0_30px_rgba(180,83,9,0.15)]">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-amber-700 px-3 py-0.5 text-xs font-black text-white uppercase shadow-md">
            RANK #3
          </div>
          <div className="mx-auto h-20 w-20 rounded-full border-2 border-amber-600 p-1 mb-3 relative">
            <img src={top3.avatar} alt={top3.ign} className="h-full w-full rounded-full object-cover" />
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-xs font-black text-white">??</span>
          </div>
          <h3 className="text-lg font-black text-white font-display">{top3.ign}</h3>
          <p className="text-xs text-slate-400 font-semibold">{top3.name} (UID: {top3.uid})</p>
          <div className="mt-4 rounded-xl bg-surface-300/80 p-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase">EARNINGS</span>
            <p className="text-xl font-black text-neon-gold font-display">PKR {top3.earningsPKR.toLocaleString()}</p>
          </div>
        </div>

      </div>

      {/* Full Rankings Table */}
      <div className="rounded-3xl border border-white/10 bg-surface-100/90 overflow-hidden shadow-2xl">
        
        {/* Search Filter Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by player name, IGN or Free Fire UID..."
              className="w-full rounded-xl border border-white/10 bg-surface-200 py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:border-crimson focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-surface-200/80 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <th className="p-4">Rank</th>
                <th className="p-4">Player / IGN</th>
                <th className="p-4">Free Fire UID</th>
                <th className="p-4">Total Earnings</th>
                <th className="p-4">Matches</th>
                <th className="p-4">Total Kills</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-bold text-slate-300">
              {filteredPlayers.map((player) => (
                <tr key={player.rank} className="hover:bg-surface-200/60 transition">
                  <td className="p-4 font-black text-neon-gold font-display">#{player.rank}</td>
                  <td className="p-4 flex items-center space-x-3">
                    <img src={player.avatar} alt={player.ign} className="h-8 w-8 rounded-full border border-white/10" />
                    <div>
                      <p className="text-white font-black">{player.ign}</p>
                      <span className="text-[10px] text-slate-400 font-normal">{player.name}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-slate-300">{player.uid}</td>
                  <td className="p-4 text-emerald-400 font-black font-mono">PKR {player.earningsPKR.toLocaleString()}</td>
                  <td className="p-4 font-mono">{player.matchesPlayed}</td>
                  <td className="p-4 font-mono">{player.totalKills}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </section>
  );
};
