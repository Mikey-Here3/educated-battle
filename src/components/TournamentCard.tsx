'use client';

import React from 'react';
import { Tournament } from '../data/mockData';
import { useAuth } from '@/context/AuthContext';
import { Trophy, Swords, Shield, Clock, Key, ArrowRight, Lock, MapPin, Users, Youtube, CheckCircle2, Flame, Award } from 'lucide-react';

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
  const { currentUser, registeredTournaments } = useAuth();
  
  const percentageSlots = Math.round((tournament.slotsFilled / tournament.totalSlots) * 100);
  const isFull = tournament.slotsFilled >= tournament.totalSlots;
  const isLive = tournament.status === 'live';
  const isSpecial = tournament.status === 'special';
  const isCompleted = tournament.status === 'completed';
  const isUserRegistered = registeredTournaments.includes(tournament.id);

  return (
    <div className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border transition-all duration-300 card-glass ${
      isCompleted
        ? 'border-emerald-500/40 bg-surface-100/90'
        : isLive
        ? 'border-crimson shadow-[0_0_35px_rgba(255,0,60,0.3)]'
        : isSpecial 
        ? 'border-neon-gold/50 shadow-[0_0_30px_rgba(255,215,0,0.2)]' 
        : 'border-crimson/30 hover:border-crimson hover:shadow-[0_0_35px_rgba(255,0,60,0.25)]'
    }`}>
      
      {/* Top Banner & Header Tags */}
      <div className="relative p-5 pb-4">
        
        {/* Category Badges & Status */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          
          <div className="flex items-center space-x-2">
            <span className="rounded-lg bg-crimson/20 px-2.5 py-1 text-[11px] font-black uppercase text-crimson border border-crimson/40">
              {tournament.type}
            </span>
            <span className="rounded-lg bg-neon-gold/20 px-2.5 py-1 text-[11px] font-black uppercase text-neon-gold border border-neon-gold/40">
              {tournament.game}
            </span>
            <span className="flex items-center space-x-1 rounded-lg bg-surface-300 px-2.5 py-1 text-[11px] font-bold text-slate-300">
              <MapPin className="h-3 w-3 text-slate-400" />
              <span>{tournament.map}</span>
            </span>
            {tournament.mapCode && (
              <span className="rounded-lg bg-amber-500/20 px-2.5 py-1 text-[11px] font-mono text-amber-400 border border-amber-500/40">
                Code: {tournament.mapCode}
              </span>
            )}
          </div>

          {/* Live / Status Indicator */}
          {isLive ? (
            <span className="flex items-center space-x-1.5 rounded-lg bg-primary/20 border border-primary px-2.5 py-1 text-[11px] font-black text-primary uppercase animate-pulse shadow-[0_0_15px_rgba(14,165,233,0.4)]">
              <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
              <span>LIVE MATCH</span>
            </span>
          ) : isCompleted ? (
            <span className="flex items-center space-x-1 rounded-lg bg-emerald-500/20 px-2.5 py-1 text-[11px] font-black text-emerald-400 border border-emerald-500/40">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>COMPLETED</span>
            </span>
          ) : isSpecial ? (
            <span className="flex items-center space-x-1 rounded-lg bg-neon-gold/20 px-2.5 py-1 text-[11px] font-black text-neon-gold border border-neon-gold/50">
              <span>MAJOR EVENT</span>
            </span>
          ) : (
            <span className="flex items-center space-x-1 rounded-lg bg-surface-300 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
              <Clock className="h-3 w-3 text-primary" />
              <span>{tournament.matchDate ? `${tournament.matchDate} · ${tournament.matchTime || tournament.startTime}` : tournament.startTime}</span>
            </span>
          )}

        </div>

        {/* Tournament Title */}
        <h3 
          onClick={() => onViewDetails(tournament)}
          className="text-lg sm:text-xl font-black text-white font-display uppercase tracking-wide group-hover:text-primary transition-colors cursor-pointer line-clamp-1"
        >
          {tournament.title}
        </h3>

        {/* Bullet Points Preview if available */}
        {tournament.bulletPoints && tournament.bulletPoints.length > 0 && (
          <div className="mt-2.5 space-y-1">
            {tournament.bulletPoints.slice(0, 2).map((bp, idx) => (
              <p key={idx} className="text-xs text-slate-300 flex items-start space-x-1.5">
                <span className="text-primary font-black">•</span>
                <span className="line-clamp-1">{bp}</span>
              </p>
            ))}
          </div>
        )}

      </div>

      {/* Completed Match: Winner Spotlight Banner */}
      {isCompleted && tournament.winner && (
        <div className="mx-5 mb-2 rounded-2xl border border-neon-gold/50 bg-gradient-to-r from-neon-gold/20 via-surface-200 to-black p-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-gold/20 text-neon-gold border border-neon-gold/40">
              <Trophy className="h-5 w-5 animate-bounce" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-neon-gold tracking-wider">★ BOOYAH CHAMPION</span>
              <p className="text-sm font-black text-white">{tournament.winner.name}</p>
              <p className="text-[10px] font-mono text-slate-300">FF UID: {tournament.winner.uid} • {tournament.winner.kills} Kills</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-bold text-slate-400 uppercase">Paid Out</span>
            <p className="text-sm font-black text-emerald-400">PKR {tournament.winner.prizePKR.toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* Prize Money & Key Metrics Grid */}
      <div className="px-5 py-3 my-1 border-y border-white/10 bg-surface-200/60 grid grid-cols-3 gap-2 text-center">
        
        {/* Prize Pool */}
        <div className="flex flex-col justify-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Prize Pool</span>
          <span className="text-base sm:text-lg font-black text-neon-gold font-display">
            PKR {tournament.prizePool.toLocaleString()}
          </span>
        </div>

        {/* Per Kill Cash */}
        <div className="flex flex-col justify-center border-x border-white/10 px-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Per Kill</span>
          <span className="text-base sm:text-lg font-black text-crimson font-display">
            {tournament.hasPerKill && tournament.perKill > 0 ? `PKR ${tournament.perKill}` : 'Surviving'}
          </span>
        </div>

        {/* Entry Fee */}
        <div className="flex flex-col justify-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Entry Fee</span>
          <span className={`text-base sm:text-lg font-black font-display ${
            tournament.entryFee === 0 ? 'text-emerald-400' : 'text-white'
          }`}>
            {tournament.entryFee === 0 ? 'FREE' : `PKR ${tournament.entryFee}`}
          </span>
        </div>

      </div>

      {/* Slots Progress Bar */}
      <div className="px-5 py-3">
        <div className="flex justify-between text-xs font-bold mb-1.5">
          <span className="flex items-center space-x-1.5 text-slate-300">
            <Users className="h-3.5 w-3.5 text-slate-400" />
            <span>Slots Confirmed</span>
          </span>
          <span className={isFull ? 'text-crimson font-black' : 'text-slate-200'}>
            {tournament.slotsFilled} / {tournament.totalSlots} {isFull && '(FULL)'}
          </span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-300">
          <div 
            className={`h-full transition-all duration-500 ${
              isFull 
                ? 'bg-gradient-to-r from-crimson to-crimson-light' 
                : 'bg-gradient-to-r from-neon-gold to-amber-500'
            }`}
            style={{ width: `${Math.min(percentageSlots, 100)}%` }}
          />
        </div>
      </div>

      {/* Bottom Actions CTA */}
      <div className="p-5 pt-2 flex flex-col gap-2">
        
        {/* Live Match YouTube Watch Button */}
        {isLive && tournament.liveStreamUrl && (
          <a
            href={tournament.liveStreamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-red-600 to-crimson py-3 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(255,0,0,0.5)] hover:shadow-[0_0_30px_rgba(255,0,0,0.7)] transition"
          >
            <Youtube className="h-4 w-4" />
            <span>Watch Live Match on YouTube</span>
          </a>
        )}

        <div className="flex items-center gap-2">
          {/* Room ID & Pass Button */}
          {(isLive || isUserRegistered) && (
            <button
              onClick={() => onViewRoomDetails(tournament)}
              className={`flex flex-1 items-center justify-center space-x-1.5 rounded-xl border py-2.5 text-xs font-black uppercase tracking-wider transition ${
                isUserRegistered
                  ? 'border-neon-gold/50 bg-neon-gold/15 text-neon-gold hover:bg-neon-gold/25'
                  : 'border-white/10 bg-surface-200 text-slate-300 hover:text-white'
              }`}
            >
              <Key className="h-3.5 w-3.5" />
              <span>{isUserRegistered ? 'Room ID & Pass' : 'Room Status'}</span>
            </button>
          )}

          {/* Join / Details Button */}
          {!isCompleted && !isFull && !isUserRegistered && (
            <button
              onClick={() => onJoin(tournament)}
              className="flex flex-1 items-center justify-center space-x-1.5 rounded-xl bg-gradient-to-r from-crimson to-crimson-dark py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(255,0,60,0.4)] transition hover:shadow-[0_0_30px_rgba(255,0,60,0.6)]"
            >
              <span>Join Match</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}

          {isUserRegistered && !isCompleted && (
            <span className="flex flex-1 items-center justify-center space-x-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 py-2.5 text-xs font-black text-emerald-400 uppercase">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Registered</span>
            </span>
          )}

          {isFull && !isUserRegistered && !isCompleted && (
            <button
              onClick={() => onViewDetails(tournament)}
              className="flex flex-1 items-center justify-center space-x-1.5 rounded-xl bg-surface-200 border border-white/10 py-2.5 text-xs font-bold text-slate-400"
            >
              <span>Match Full ? View Details</span>
            </button>
          )}

          {isCompleted && (
            <button
              onClick={() => onViewDetails(tournament)}
              className="flex flex-1 items-center justify-center space-x-1.5 rounded-xl bg-surface-200 border border-emerald-500/30 py-2.5 text-xs font-bold text-emerald-400 hover:bg-surface-300 transition"
            >
              <span>View Leaderboard Results</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
