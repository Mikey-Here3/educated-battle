'use client';

import React from 'react';
import { Tournament } from '../data/mockData';
import { Trophy, Swords, Shield, Clock, Key, ArrowRight, Lock, MapPin, Users } from 'lucide-react';

interface TournamentCardProps {
  tournament: Tournament;
  onJoin: (tournament: Tournament) => void;
  onViewRoomDetails: (tournament: Tournament) => void;
  onViewDetails: (tournament: Tournament) => void;
}

export const TournamentCard: React.FC<TournamentCardProps> = ({
  tournament,
  onJoin,
  onViewRoomDetails,
  onViewDetails,
}) => {
  const percentageSlots = Math.round((tournament.slotsFilled / tournament.totalSlots) * 100);
  const isFull = tournament.slotsFilled >= tournament.totalSlots;
  const isLive = tournament.status === 'live';
  const isSpecial = tournament.status === 'special';

  return (
    <div className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border transition-all duration-300 card-glass ${
      isSpecial 
        ? 'border-neon-gold/50 shadow-[0_0_30px_rgba(255,190,26,0.2)] hover:shadow-[0_0_45px_rgba(255,190,26,0.35)]' 
        : isLive
        ? 'border-neon-fire/50 shadow-[0_0_30px_rgba(255,0,85,0.2)]'
        : 'border-neon-purple/30 hover:border-neon-purple/70 hover:shadow-[0_0_35px_rgba(168,85,247,0.3)]'
    }`}>
      
      {/* Top Banner & Header Tags */}
      <div className="relative p-5 pb-4">
        
        {/* Category Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          
          <div className="flex items-center space-x-2">
            <span className="rounded-lg bg-neon-purple/20 px-2.5 py-1 text-[11px] font-black uppercase text-neon-purple-light border border-neon-purple/40">
              {tournament.type}
            </span>
            <span className="rounded-lg bg-neon-cyan/20 px-2.5 py-1 text-[11px] font-black uppercase text-neon-cyan border border-neon-cyan/40">
              {tournament.game}
            </span>
            <span className="flex items-center space-x-1 rounded-lg bg-surface-300 px-2.5 py-1 text-[11px] font-bold text-slate-300">
              <MapPin className="h-3 w-3 text-slate-400" />
              <span>{tournament.map}</span>
            </span>
          </div>

          {/* Live / Status Indicator */}
          {isLive ? (
            <span className="flex items-center space-x-1.5 rounded-lg badge-live px-2.5 py-1 text-[11px] font-black text-neon-fire uppercase animate-pulse">
              <span className="h-2 w-2 rounded-full bg-neon-fire" />
              <span>LIVE MATCH</span>
            </span>
          ) : isSpecial ? (
            <span className="flex items-center space-x-1 rounded-lg bg-neon-gold/20 px-2.5 py-1 text-[11px] font-black text-neon-gold border border-neon-gold/50">
              <span>⚡ MAJOR EVENT</span>
            </span>
          ) : (
            <span className="flex items-center space-x-1 rounded-lg bg-surface-300 px-2.5 py-1 text-[11px] font-semibold text-slate-400">
              <Clock className="h-3 w-3" />
              <span>{tournament.startTime}</span>
            </span>
          )}

        </div>

        {/* Tournament Title */}
        <h3 
          onClick={() => onViewDetails(tournament)}
          className="text-lg sm:text-xl font-extrabold text-white font-display uppercase tracking-wide group-hover:text-neon-purple-light transition-colors cursor-pointer line-clamp-1"
        >
          {tournament.title}
        </h3>

      </div>

      {/* Prize Money & Key Metrics Grid */}
      <div className="px-5 py-3 my-1 border-y border-purple-900/30 bg-surface-200/50 grid grid-cols-3 gap-2 text-center">
        
        {/* Prize Pool */}
        <div className="flex flex-col justify-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Prize Pool</span>
          <span className="text-base sm:text-lg font-black text-neon-gold font-display">
            PKR {tournament.prizePool.toLocaleString()}
          </span>
        </div>

        {/* Per Kill Cash */}
        <div className="flex flex-col justify-center border-x border-purple-900/30 px-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Per Kill</span>
          <span className="text-base sm:text-lg font-black text-neon-purple-light font-display">
            {tournament.perKill > 0 ? `PKR ${tournament.perKill}` : 'N/A'}
          </span>
        </div>

        {/* Entry Fee */}
        <div className="flex flex-col justify-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Entry Fee</span>
          <span className={`text-base sm:text-lg font-black font-display ${tournament.entryFee === 0 ? 'text-neon-green' : 'text-slate-100'}`}>
            {tournament.entryFee === 0 ? 'FREE' : `PKR ${tournament.entryFee}`}
          </span>
        </div>

      </div>

      {/* Slots Progress Bar & Action Controls */}
      <div className="p-5 pt-3 space-y-4">
        
        {/* Slots Bar */}
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-300 mb-1.5">
            <span className="flex items-center space-x-1">
              <Users className="h-3.5 w-3.5 text-neon-purple-light" />
              <span>Slots Reserved</span>
            </span>
            <span className={isFull ? 'text-neon-fire font-black' : 'text-neon-cyan'}>
              {tournament.slotsFilled} / {tournament.totalSlots} ({percentageSlots}%)
            </span>
          </div>

          <div className="h-2.5 w-full rounded-full bg-surface-300 overflow-hidden p-0.5 border border-purple-900/30">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                isFull 
                  ? 'bg-neon-fire shadow-[0_0_10px_#ff0055]' 
                  : 'bg-gradient-to-r from-neon-purple to-neon-cyan shadow-[0_0_12px_rgba(168,85,247,0.5)]'
              }`}
              style={{ width: `${percentageSlots}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 pt-1">
          
          {/* Room Details / Join Button */}
          {tournament.roomStatus === 'ready' || isLive ? (
            <button
              onClick={() => onViewRoomDetails(tournament)}
              className="flex-1 flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-neon-cyan/90 to-blue-600 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all hover:scale-102 active:scale-95"
            >
              <Key className="h-4 w-4" />
              <span>ROOM ID & PASS</span>
            </button>
          ) : isFull ? (
            <button
              disabled
              className="flex-1 flex items-center justify-center space-x-2 rounded-xl bg-surface-300/80 border border-slate-700 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 cursor-not-allowed"
            >
              <Lock className="h-4 w-4" />
              <span>SLOTS FULL</span>
            </button>
          ) : (
            <button
              onClick={() => onJoin(tournament)}
              className="flex-1 flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-neon-purple-dark via-neon-purple to-neon-purple-light px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all hover:scale-102 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] active:scale-95"
            >
              <Swords className="h-4 w-4 text-neon-cyan" />
              <span>JOIN MATCH</span>
            </button>
          )}

          {/* Full Info Button */}
          <button
            onClick={() => onViewDetails(tournament)}
            className="rounded-xl border border-purple-900/40 bg-surface-200 p-2.5 text-slate-300 hover:border-neon-purple/50 hover:text-white transition-colors"
            title="View Match Rules & Details"
          >
            <ArrowRight className="h-4 w-4" />
          </button>

        </div>

      </div>

    </div>
  );
};
