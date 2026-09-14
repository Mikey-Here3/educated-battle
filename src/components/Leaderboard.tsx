'use client';

import React, { useState } from 'react';
import { MOCK_LEADERBOARD, PlayerRank } from '../data/mockData';
import { Trophy, Medal, Search, Flame, Swords, Zap, Crown } from 'lucide-react';

export const Leaderboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTime, setFilterTime] = useState<'all' | 'weekly'>('all');

  const filteredPlayers = MOCK_LEADERBOARD.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ign.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.uid.includes(searchQuery)
  );

  const top1 = MOCK_LEADERBOARD[0];
  const top2 = MOCK_LEADERBOARD[1];
  const top3 = MOCK_LEADERBOARD[2];

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
          Ranked by real tournament earnings (PKR), total match victories, and kill statistics.
        </p>
      </div>

      {/* Top 3 Podium Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end">
        
        {/* 2nd Place - Silver */}
        <div className="order-2 md:order-1 rounded-3xl border border-slate-400/40 bg-surface-200/90 p-6 text-center backdrop-blur-md relative shadow-[0_0_30px_rgba(203,213,225,0.15)] card-glass-hover">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-400 px-3 py-0.5 text-xs font-black text-slate-950 uppercase shadow-md">
            RANK #2
          </div>
          <div className="mx-auto h-20 w-20 rounded-full border-2 border-slate-300 p-1 mb-3 relative">
            <img src={top2.avatar} alt={top2.ign} className="h-full w-full rounded-full object-cover" />
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-300 text-xs font-black text-slate-950">🥈</span>
          </div>
          <h3 className="text-lg font-black text-white font-display">{top2.ign}</h3>
          <p className="text-xs text-slate-400 font-semibold">{top2.name}</p>
          <div className="mt-4 rounded-xl bg-surface-300/80 p-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase">EARNINGS</span>
            <p className="text-xl font-black text-neon-cyan font-display">PKR {top2.earningsPKR.toLocaleString()}</p>
          </div>
        </div>

        {/* 1st Place - Gold Champion */}
        <div className="order-1 md:order-2 rounded-3xl border-2 border-neon-gold bg-surface-200/95 p-8 text-center backdrop-blur-md relative shadow-[0_0_50px_rgba(255,190,26,0.35)] scale-105 card-glass-hover">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-neon-gold to-amber-500 px-4 py-1 text-xs font-black text-slate-950 uppercase shadow-lg flex items-center space-x-1">
            <Crown className="h-3.5 w-3.5 fill-slate-950" />
            <span>RANK #1 CHAMPION</span>
          </div>
          <div className="mx-auto h-24 w-24 rounded-full border-4 border-neon-gold p-1 mb-3 relative shadow-[0_0_20px_rgba(255,190,26,0.5)]">
            <img src={top1.avatar} alt={top1.ign} className="h-full w-full rounded-full object-cover" />
            <span className="absolute -bottom-2 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-neon-gold text-sm font-black text-slate-950 shadow-md">👑</span>
          </div>
          <h3 className="text-xl font-black text-white font-display uppercase tracking-wide">{top1.ign}</h3>
          <p className="text-xs text-neon-gold font-bold">{top1.name}</p>
          <div className="mt-4 rounded-2xl bg-neon-gold/10 border border-neon-gold/30 p-3">
            <span className="text-[10px] font-bold text-slate-300 uppercase">TOTAL CASH EARNED</span>
            <p className="text-2xl font-black text-neon-gold font-display">PKR {top1.earningsPKR.toLocaleString()}</p>
          </div>
        </div>

        {/* 3rd Place - Bronze */}
        <div className="order-3 rounded-3xl border border-amber-600/40 bg-surface-200/90 p-6 text-center backdrop-blur-md relative shadow-[0_0_30px_rgba(217,119,6,0.15)] card-glass-hover">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-amber-600 px-3 py-0.5 text-xs font-black text-white uppercase shadow-md">
            RANK #3
          </div>
          <div className="mx-auto h-20 w-20 rounded-full border-2 border-amber-500 p-1 mb-3 relative">
            <img src={top3.avatar} alt={top3.ign} className="h-full w-full rounded-full object-cover" />
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-xs font-black text-white">🥉</span>
          </div>
          <h3 className="text-lg font-black text-white font-display">{top3.ign}</h3>
          <p className="text-xs text-slate-400 font-semibold">{top3.name}</p>
          <div className="mt-4 rounded-xl bg-surface-300/80 p-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase">EARNINGS</span>
            <p className="text-xl font-black text-neon-purple-light font-display">PKR {top3.earningsPKR.toLocaleString()}</p>
          </div>
        </div>

      </div>

      {/* Leaderboard Table Container */}
      <div className="rounded-3xl border border-purple-900/30 bg-surface-200/80 overflow-hidden backdrop-blur-md shadow-xl">
        
        {/* Table Header Controls */}
        <div className="p-5 border-b border-purple-900/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search IGN or UID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-purple-900/40 bg-surface-100 pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:border-neon-purple focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFilterTime('all')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase transition-all ${
                filterTime === 'all'
                  ? 'bg-neon-purple text-white'
                  : 'bg-surface-300 text-slate-400 hover:text-white'
              }`}
            >
              ALL-TIME RANKINGS
            </button>
            <button
              onClick={() => setFilterTime('weekly')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase transition-all ${
                filterTime === 'weekly'
                  ? 'bg-neon-purple text-white'
                  : 'bg-surface-300 text-slate-400 hover:text-white'
              }`}
            >
              THIS WEEK
            </button>
          </div>
        </div>

        {/* Table Head & Rows */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-surface-300/60 text-[11px] font-black uppercase text-slate-400 tracking-wider">
              <tr>
                <th className="py-3.5 px-5">RANK</th>
                <th className="py-3.5 px-5">PLAYER</th>
                <th className="py-3.5 px-5 text-center">MATCHES</th>
                <th className="py-3.5 px-5 text-center">KILLS</th>
                <th className="py-3.5 px-5 text-center">WIN RATE</th>
                <th className="py-3.5 px-5 text-right">TOTAL EARNINGS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/20">
              {filteredPlayers.map((player) => (
                <tr key={player.rank} className="hover:bg-surface-300/40 transition-colors">
                  <td className="py-4 px-5 font-black text-white font-display text-base">
                    #{player.rank}
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center space-x-3">
                      <img src={player.avatar} alt={player.ign} className="h-9 w-9 rounded-full object-cover border border-purple-900/40" />
                      <div>
                        <p className="font-extrabold text-white leading-none font-display">{player.ign}</p>
                        <p className="text-[11px] text-slate-400 mt-1 font-mono">UID: {player.uid}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-center font-bold text-slate-200">{player.matchesPlayed}</td>
                  <td className="py-4 px-5 text-center font-bold text-neon-purple-light">{player.totalKills}</td>
                  <td className="py-4 px-5 text-center font-bold text-neon-cyan">{player.winRate}%</td>
                  <td className="py-4 px-5 text-right font-black text-neon-gold font-display text-base">
                    PKR {player.earningsPKR.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </section>
  );
};
