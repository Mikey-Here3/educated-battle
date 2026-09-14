'use client';

import React, { useState } from 'react';
import { Tournament } from '../data/mockData';
import { TournamentCard } from './TournamentCard';
import { Search, Filter, Gamepad2, Flame, Clock, Trophy, Sparkles } from 'lucide-react';

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
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedMode, setSelectedMode] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const statusTabs = [
    { id: 'all', label: 'ALL MATCHES', icon: Gamepad2 },
    { id: 'live', label: 'LIVE NOW 🔴', icon: Flame },
    { id: 'upcoming', label: 'UPCOMING ⏰', icon: Clock },
    { id: 'special', label: 'SPECIAL EVENTS ⚡', icon: Sparkles },
    { id: 'completed', label: 'COMPLETED 🏆', icon: Trophy },
  ];

  const modeFilters = ['all', 'Solo', 'Duo', 'Squad', 'Clash Squad'];

  const filteredTournaments = tournaments.filter((t) => {
    const matchesStatus = selectedStatus === 'all' || t.status === selectedStatus;
    const matchesMode = selectedMode === 'all' || t.type === selectedMode;
    const matchesSearch = 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.map.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.game.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesMode && matchesSearch;
  });

  return (
    <section id="tournaments" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-neon-cyan font-bold text-xs uppercase tracking-widest mb-1">
            <span className="h-2 w-2 rounded-full bg-neon-cyan animate-pulse" />
            <span>DAILY FREE FIRE CUSTOM ROOMS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display uppercase tracking-tight">
            TOURNAMENT ARENA
          </h2>
        </div>

        {/* Search Input Box */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search map or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-purple-900/40 bg-surface-200/90 pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:border-neon-purple focus:outline-none focus:ring-1 focus:ring-neon-purple backdrop-blur-md"
          />
        </div>
      </div>

      {/* Main Status Category Tabs */}
      <div className="flex overflow-x-auto pb-3 pt-1 no-scrollbar gap-2 mb-6 border-b border-purple-900/30">
        {statusTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedStatus === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`flex shrink-0 items-center space-x-2 rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                isActive
                  ? 'bg-neon-purple/20 text-neon-purple-light border border-neon-purple/60 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                  : 'bg-surface-200/60 text-slate-400 border border-transparent hover:bg-surface-300 hover:text-white'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-neon-cyan' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mode Sub-Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-surface-200/40 p-3 rounded-2xl border border-purple-900/20">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-neon-purple-light" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Game Mode:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {modeFilters.map((mode) => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`rounded-lg px-3 py-1.5 text-xs font-extrabold uppercase transition-all ${
                selectedMode === mode
                  ? 'bg-neon-purple text-white shadow-md'
                  : 'bg-surface-300 text-slate-400 hover:text-white hover:bg-surface-400'
              }`}
            >
              {mode === 'all' ? 'All Modes' : mode}
            </button>
          ))}
        </div>
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
        <div className="rounded-3xl border border-purple-900/30 bg-surface-200/50 p-12 text-center my-8">
          <Gamepad2 className="mx-auto h-12 w-12 text-slate-500 mb-3 animate-bounce" />
          <h3 className="text-xl font-bold text-white uppercase font-display">No Tournaments Found</h3>
          <p className="mt-1 text-sm text-slate-400 max-w-md mx-auto">
            Try adjusting your search criteria or mode filters to explore more matches.
          </p>
          <button
            onClick={() => {
              setSelectedStatus('all');
              setSelectedMode('all');
              setSearchQuery('');
            }}
            className="mt-4 rounded-xl bg-neon-purple/20 px-4 py-2 text-xs font-bold text-neon-purple-light border border-neon-purple/40 hover:bg-neon-purple/30"
          >
            RESET ALL FILTERS
          </button>
        </div>
      )}

    </section>
  );
};
