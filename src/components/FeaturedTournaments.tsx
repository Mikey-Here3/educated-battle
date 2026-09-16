'use client';

import React from 'react';
import Link from 'next/link';
import { Tournament } from '../data/mockData';
import { ArrowRight } from 'lucide-react';
import { TournamentCard } from './TournamentCard';

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {featured.map((t) => (
          <TournamentCard 
            key={t.id}
            tournament={t}
            onJoin={onJoin}
            onViewDetails={onViewDetails}
            onViewRoomDetails={() => {}} // No longer used in public card anyway
          />
        ))}
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
