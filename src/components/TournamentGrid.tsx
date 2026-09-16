'use client';

import React, { useState, useMemo } from 'react';
import { Tournament } from '../data/mockData';
import { TournamentCard } from './TournamentCard';
import { Search, Filter, Gamepad2, Flame, Clock, Trophy, Sparkles, Swords, Crosshair, ArrowUpDown } from 'lucide-react';

interface TournamentGridProps {
  tournaments: Tournament[];
  onJoin: (tournament: Tournament) => void;
  onViewRoomDetails: (tournament: Tournament) => void;
  onViewDetails: (tournament: Tournament) => void;
}

export const TournamentGrid: React.FC<TournamentGridProps> = ({
  tournaments,
  onJoin,
  onViewRoomDetails,
  onViewDetails,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'soon' | 'prize' | 'entry'>('soon');

  // Comprehensive Category & Format Filters as specified in Phase 3
  const filterTabs = [
    { id: 'all', label: 'ALL', icon: Gamepad2 },
    { id: 'live', label: 'LIVE 🔴', icon: Flame },
    { id: 'upcoming', label: 'UPCOMING ⏰', icon: Clock },
    { id: 'clash-squad', label: 'CLASH SQUAD', icon: Swords },
    { id: 'battle-royale', label: 'BATTLE ROYALE', icon: Trophy },
    { id: 'headshot', label: 'HEADSHOT 🎯', icon: Crosshair },
    { id: 'esports', label: 'ESPORTS ⚡', icon: Sparkles },
    { id: '1v1', label: '1V1', icon: Swords },
    { id: '2v2', label: '2V2', icon: Swords },
    { id: '48-players', label: '48 PLAYERS', icon: Trophy },
  ];

  const filteredTournaments = useMemo(() => {
    return tournaments
      .filter((t) => {
        // Status & Category Matching
        let matchesFilter = true;
        if (selectedFilter === 'live') matchesFilter = t.status === 'live';
        else if (selectedFilter === 'upcoming') matchesFilter = t.status === 'upcoming' || t.status === 'special';
        else if (selectedFilter === 'clash-squad') {
          matchesFilter = t.category === 'Clash Squad' || t.type === 'Clash Squad' || t.title.includes('CS');
        } else if (selectedFilter === 'battle-royale') {
          matchesFilter = t.category === 'Battle Royale' || t.type === 'Squad' || t.type === 'Solo' || t.title.includes('BR');
        } else if (selectedFilter === 'headshot') {
          matchesFilter = t.mode === 'Headshot' || t.title.toLowerCase().includes('headshot');
        } else if (selectedFilter === 'esports') {
          matchesFilter = t.mode === 'Esports' || t.category === 'Esports' || t.title.toLowerCase().includes('esports');
        } else if (selectedFilter === '1v1') {
          matchesFilter = t.format === '1v1' || t.title.includes('1V1') || t.title.includes('1v1');
        } else if (selectedFilter === '2v2') {
          matchesFilter = t.format === '2v2' || t.type === 'Duo' || t.title.includes('2V2') || t.title.includes('2v2');
        } else if (selectedFilter === '48-players') {
          matchesFilter = t.totalSlots === 48 || t.title.includes('48');
        }

        // Search matching (title, map, category, mode, format, weapons)
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          t.title.toLowerCase().includes(q) ||
          t.map.toLowerCase().includes(q) ||
          t.game.toLowerCase().includes(q) ||
          (t.category && t.category.toLowerCase().includes(q)) ||
          (t.mode && t.mode.toLowerCase().includes(q)) ||
          (t.format && t.format.toLowerCase().includes(q)) ||
          (t.allowedWeapons && t.allowedWeapons.some((w) => w.toLowerCase().includes(q)));

        return matchesFilter && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'prize') return b.prizePool - a.prizePool;
        if (sortBy === 'entry') return a.entryFee - b.entryFee;
        // Default: Live first, then upcoming
        if (a.status === 'live' && b.status !== 'live') return -1;
        if (b.status === 'live' && a.status !== 'live') return 1;
        return 0;
      });
  }, [tournaments, selectedFilter, searchQuery, sortBy]);

  return (
    <section id="tournaments" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-widest mb-1.5">
            <span className="h-2 w-2 rounded-full bg-crimson animate-pulse" />
            <span>DAILY FREE FIRE CUSTOM ROOMS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
            TOURNAMENT ARENA
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Choose your tournament, verify your UID slot, and enter the battle.
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tournaments, maps, modes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-surface-200/90 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary backdrop-blur-md"
            />
          </div>

          {/* Sort Selector */}
          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-xl border border-white/10 bg-surface-200 px-3 py-2.5 text-xs font-bold text-slate-300 focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="soon">Starting Soon</option>
              <option value="prize">Highest Prize</option>
              <option value="entry">Lowest Fee</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Filter Scrollable Tabs Bar */}
      <div className="flex overflow-x-auto pb-3 pt-1 no-scrollbar gap-2 mb-8 border-b border-white/10">
        {filterTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`flex shrink-0 items-center space-x-2 rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                isActive
                  ? 'bg-crimson text-white shadow-[0_0_20px_rgba(255,0,60,0.4)] border border-crimson/80'
                  : 'bg-surface-200 text-slate-400 border border-white/5 hover:bg-surface-300 hover:text-white'
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tournaments Card Grid */}
      {filteredTournaments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTournaments.map((tournament) => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
              onJoin={onJoin}
              onViewRoomDetails={onViewRoomDetails}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-surface-200/50 p-12 text-center my-8">
          <Gamepad2 className="mx-auto h-12 w-12 text-slate-500 mb-3 animate-bounce" />
          <h3 className="text-xl font-bold text-white uppercase font-display">No Tournaments Found</h3>
          <p className="mt-1 text-sm text-slate-400 max-w-md mx-auto">
            Try adjusting your search criteria or selecting a different category filter.
          </p>
          <button
            onClick={() => {
              setSelectedFilter('all');
              setSearchQuery('');
              setSortBy('soon');
            }}
            className="mt-4 rounded-xl bg-crimson/20 px-5 py-2.5 text-xs font-black uppercase text-crimson border border-crimson/40 hover:bg-crimson/30 transition-colors"
          >
            RESET ALL FILTERS
          </button>
        </div>
      )}
    </section>
  );
};
