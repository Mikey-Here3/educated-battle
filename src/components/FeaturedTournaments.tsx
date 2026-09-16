'use client';

import React from 'react';
import Link from 'next/link';
import { Tournament } from '../data/mockData';
import { Trophy, Flame, Clock, ArrowRight, Zap, Users, CheckCircle2 } from 'lucide-react';

interface FeaturedTournamentsProps {
  tournaments: Tournament[];
  onJoin: (t: Tournament) => void;
  onViewDetails: (t: Tournament) => void;
}

export const FeaturedTournaments: React.FC<FeaturedTournamentsProps> = ({
  tournaments,
  onJoin,
  onViewDetails,
}) => {
  // Show live first, then upcoming. Max 3 featured.
  const featured = [
    ...tournaments.filter(t => t.status === 'live'),
    ...tournaments.filter(t => t.status === 'upcoming' || t.status === 'special'),
  ].slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="h-2 w-2 rounded-full bg-crimson animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-crimson">Live &amp; Upcoming</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display uppercase tracking-tight">
            🏆 FEATURED TOURNAMENTS
          </h2>
        </div>
        <Link
          href="/matches"
          className="hidden sm:flex items-center space-x-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors group"
        >
          <span>View All</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Featured Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {featured.map((t, idx) => {
          const isLive = t.status === 'live';
          const isSpecial = t.status === 'special';
          const isFull = t.slotsFilled >= t.totalSlots;
          const pct = Math.round((t.slotsFilled / t.totalSlots) * 100);

          return (
            <div
              key={t.id}
              className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                isLive
                  ? 'border-crimson shadow-[0_0_30px_rgba(255,0,60,0.3)]'
                  : isSpecial
                  ? 'border-neon-gold/50 shadow-[0_0_25px_rgba(255,215,0,0.2)]'
                  : 'border-white/10 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(var(--color-primary-rgb),0.2)]'
              } bg-surface-200`}
              onClick={() => onViewDetails(t)}
            >
              {/* Banner image or gradient fallback */}
              <div className="relative" style={{ aspectRatio: '16/8' }}>
                {t.bannerImage ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.bannerImage}
                      alt={t.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  </>
                ) : (
                  <div
                    className={`w-full h-full flex items-center justify-center ${
                      isLive
                        ? 'bg-gradient-to-br from-crimson/40 via-surface-200 to-black'
                        : isSpecial
                        ? 'bg-gradient-to-br from-neon-gold/30 via-surface-200 to-black'
                        : idx === 0
                        ? 'bg-gradient-to-br from-primary/30 via-surface-200 to-black'
                        : 'bg-gradient-to-br from-purple-900/30 via-surface-200 to-black'
                    }`}
                  >
                    <Trophy className={`h-16 w-16 opacity-30 ${isSpecial ? 'text-neon-gold' : 'text-primary'}`} />
                  </div>
                )}

                {/* Status badge */}
                <div className="absolute top-3 left-3">
                  {isLive ? (
                    <span className="flex items-center space-x-1.5 rounded-lg bg-crimson px-2.5 py-1 text-[11px] font-black text-white uppercase animate-pulse shadow-lg">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                      <span>LIVE NOW</span>
                    </span>
                  ) : isSpecial ? (
                    <span className="rounded-lg bg-neon-gold px-2.5 py-1 text-[11px] font-black text-black uppercase shadow-lg">
                      ⚡ MAJOR EVENT
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1 rounded-lg bg-black/70 border border-white/20 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                      <Clock className="h-3 w-3 text-primary" />
                      <span>{t.matchDate || 'UPCOMING'}</span>
                    </span>
                  )}
                </div>

                {/* Game type badge */}
                <div className="absolute top-3 right-3">
                  <span className="rounded-lg bg-black/70 border border-white/10 px-2 py-1 text-[10px] font-bold text-slate-300 backdrop-blur-sm">
                    {t.type}
                  </span>
                </div>

                {/* Prize overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-[9px] font-bold text-white/50 uppercase tracking-wider">Total Prize Pool</p>
                  <p className="text-2xl font-black text-neon-gold font-display leading-none">
                    PKR {t.prizePool.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <h3 className="text-sm font-black text-white uppercase tracking-wide line-clamp-1 mb-2">
                  {t.title}
                </h3>

                {/* Info row */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-crimson" />
                    Per Kill: {t.hasPerKill && t.perKill > 0 ? `PKR ${t.perKill}` : 'Survival'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-primary" />
                    {t.slotsFilled}/{t.totalSlots}
                  </span>
                </div>

                {/* Slots bar */}
                <div className="h-1.5 w-full rounded-full bg-surface-300 mb-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${isFull ? 'bg-crimson' : 'bg-gradient-to-r from-neon-gold to-amber-400'}`}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>

                {/* CTA Row */}
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Entry</p>
                    <p className={`text-sm font-black ${t.entryFee === 0 ? 'text-emerald-400' : 'text-white'}`}>
                      {t.entryFee === 0 ? 'FREE' : `PKR ${t.entryFee}`}
                    </p>
                  </div>
                  {!isFull ? (
                    <button
                      onClick={e => { e.stopPropagation(); onJoin(t); }}
                      className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-black uppercase text-white transition-all hover:scale-105 active:scale-95"
                      style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
                    >
                      <Flame className="h-3.5 w-3.5" />
                      JOIN NOW
                    </button>
                  ) : (
                    <span className="flex items-center gap-1 rounded-xl bg-surface-300 px-4 py-2 text-xs font-bold text-slate-400 border border-white/10">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      FULL
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile "View All" link */}
      <div className="mt-5 flex justify-center sm:hidden">
        <Link
          href="/matches"
          className="flex items-center space-x-2 rounded-xl border border-white/15 bg-surface-200/80 px-6 py-2.5 text-xs font-black uppercase tracking-wider text-slate-200 transition hover:border-primary hover:text-white"
        >
          <span>VIEW ALL TOURNAMENTS</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};
