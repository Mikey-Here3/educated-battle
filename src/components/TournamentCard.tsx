'use client';

import React from 'react';
import { Tournament } from '../data/mockData';
import { useAuth } from '@/context/AuthContext';
import { Trophy, Clock, ArrowRight, MapPin, Users, Youtube, CheckCircle2 } from 'lucide-react';

interface TournamentCardProps {
  tournament: Tournament;
  onJoin: (tournament: Tournament) => void;
  onViewRoomDetails: (tournament: Tournament) => void;
  onViewDetails: (tournament: Tournament) => void;
}

export const TournamentCard: React.FC<TournamentCardProps> = ({
  tournament,
  onJoin,
  onViewDetails,
}) => {
  const { currentUser, registeredTournaments } = useAuth();
  
  const percentageSlots = Math.min(Math.round((tournament.slotsFilled / Math.max(tournament.totalSlots, 1)) * 100), 100);
  const isFull = tournament.slotsFilled >= tournament.totalSlots;
  const isLive = tournament.status === 'live';
  const isSpecial = tournament.status === 'special';
  const isCompleted = tournament.status === 'completed';
  const isUserRegistered = Boolean(currentUser) && registeredTournaments.includes(tournament.id);
  const [imgError, setImgError] = React.useState(false);
  const hasValidImage = Boolean(tournament.bannerImage) && !imgError;

  return (
    <div 
      onClick={() => onViewDetails(tournament)}
      className={`group relative flex flex-col overflow-hidden rounded-[20px] bg-surface-200 border transition-all duration-300 cursor-pointer ${
        isCompleted
          ? 'border-emerald-500/30 hover:border-emerald-500/50'
          : isLive
          ? 'border-crimson shadow-[0_0_35px_rgba(255,0,60,0.25)]'
          : isSpecial 
          ? 'border-neon-gold/40 shadow-[0_0_30px_rgba(255,215,0,0.15)]' 
          : 'border-white/10 hover:border-white/20 hover:shadow-lg'
      }`}
    >
      {/* 1. Large Poster */}
      {hasValidImage ? (
        <div className="relative w-full bg-black/60 overflow-hidden flex items-center justify-center min-h-[180px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tournament.bannerImage}
            alt={tournament.title}
            loading="lazy"
            className="w-full h-auto max-h-[320px] object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            onError={() => setImgError(true)}
          />
          {/* Subtle cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-200 via-surface-200/5 to-transparent pointer-events-none" />

          
          {/* Status Badge */}
          <div className="absolute top-3 left-3 z-10">
            {isLive ? (
              <span className="flex items-center space-x-1.5 rounded-lg bg-crimson/90 border border-crimson px-3 py-1 text-xs font-black text-white uppercase animate-pulse shadow-lg backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                <span>LIVE</span>
              </span>
            ) : isCompleted ? (
              <span className="flex items-center space-x-1 rounded-lg bg-emerald-500/90 px-3 py-1 text-xs font-black text-white uppercase shadow-lg backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4 mr-0.5" />COMPLETED
              </span>
            ) : isSpecial ? (
              <span className="rounded-lg bg-neon-gold/90 border border-neon-gold px-3 py-1 text-xs font-black text-black uppercase shadow-lg backdrop-blur-sm">
                ⚡ MAJOR EVENT
              </span>
            ) : isFull ? (
              <span className="rounded-lg bg-surface-300/90 border border-white/20 px-3 py-1 text-xs font-black text-white uppercase shadow-lg backdrop-blur-sm">
                FULL
              </span>
            ) : (
              <span className="flex items-center space-x-1 rounded-lg bg-black/70 border border-white/20 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
                <Clock className="h-3.5 w-3.5 text-primary mr-1" />
                {tournament.matchDate ? `${tournament.matchDate}` : 'UPCOMING'}
              </span>
            )}
          </div>
        </div>
      ) : (
        // Fallback gradient if no image
        <div className={`relative w-full aspect-[4/3] sm:aspect-video min-h-[180px] flex flex-col items-center justify-center p-6 ${
          isLive ? 'bg-gradient-to-br from-crimson/30 to-surface-300' : 'bg-gradient-to-br from-primary/20 to-surface-300'
        }`}>
          <Trophy className={`h-16 w-16 opacity-30 ${isLive ? 'text-crimson' : 'text-primary'}`} />
          <p className="mt-3 text-xs font-bold text-white/40 uppercase tracking-widest text-center">Educated Gamer<br/>Tournament Arena</p>
          <div className="absolute top-3 left-3 z-10">
            {isLive ? (
              <span className="flex items-center space-x-1.5 rounded-lg bg-crimson/90 border border-crimson px-3 py-1 text-xs font-black text-white uppercase shadow-lg backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                <span>LIVE</span>
              </span>
            ) : (
              <span className="flex items-center space-x-1 rounded-lg bg-black/70 border border-white/20 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
                <Clock className="h-3.5 w-3.5 text-primary mr-1" />
                {tournament.matchDate ? `${tournament.matchDate}` : 'UPCOMING'}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex flex-col p-4 sm:p-5 gap-3.5">
        
        {/* Title */}
        <h3 className="text-[20px] sm:text-[22px] font-black text-white uppercase font-display leading-tight line-clamp-2">
          {tournament.title}
        </h3>

        {/* Metadata Pills */}
        <div className="flex flex-wrap gap-2 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-300">
          {tournament.category && <span className="px-2.5 py-1 bg-surface-300 rounded-md border border-white/5">{tournament.category}</span>}
          {tournament.format && <span className="px-2.5 py-1 bg-surface-300 rounded-md border border-white/5">{tournament.format}</span>}
          {tournament.mode && <span className="px-2.5 py-1 bg-surface-300 rounded-md border border-white/5 text-primary/90">{tournament.mode}</span>}
          <span className="px-2.5 py-1 bg-surface-300 rounded-md border border-white/5 flex items-center gap-1"><MapPin size={12}/> {tournament.map}</span>
        </div>

        {/* Weapons */}
        {tournament.allowedWeapons && tournament.allowedWeapons.length > 0 && (
          <div className="text-xs font-bold text-slate-400">
            🔫 {tournament.allowedWeapons.join(' + ')}
          </div>
        )}

        <hr className="border-white/5 my-0.5" />

        {/* Prize / Entry (2 columns) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Winner</span>
            <span className="text-xl sm:text-2xl font-black text-neon-gold font-display">
              PKR {tournament.booyahPrize || tournament.prizePool}
            </span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Entry Fee</span>
            <span className={`text-xl sm:text-2xl font-black font-display ${tournament.entryFee === 0 ? 'text-emerald-400' : 'text-white'}`}>
              {tournament.entryFee === 0 ? 'FREE' : `PKR ${tournament.entryFee}`}
            </span>
          </div>
        </div>

        {/* Per Kill */}
        {(tournament.hasPerKill || tournament.perKill > 0) ? (
          <div className="flex justify-between items-center px-3.5 py-2 bg-crimson/10 border border-crimson/20 rounded-xl mt-1">
            <span className="text-xs font-bold text-crimson uppercase tracking-wider">Per Kill Reward</span>
            <span className="text-sm font-black text-crimson font-display">PKR {tournament.perKill}</span>
          </div>
        ) : null}

        {/* Completed Winner Spotlight */}
        {isCompleted && tournament.winner && (
          <div className="rounded-xl border border-neon-gold/40 bg-gradient-to-r from-neon-gold/10 to-surface-300 p-3 flex items-center gap-3 mt-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon-gold/20 text-neon-gold border border-neon-gold/30">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-neon-gold tracking-widest">★ Champion</span>
              <p className="text-sm font-black text-white">{tournament.winner.name}</p>
            </div>
          </div>
        )}

        {/* Slots */}
        <div className="flex flex-col gap-2 mt-1">
          <div className="flex justify-between items-end">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Users size={14} className="text-slate-400"/> Players
            </span>
            <span className={`text-sm font-black ${isFull ? 'text-crimson' : 'text-white'}`}>
              {tournament.slotsFilled} / {tournament.totalSlots}
            </span>
          </div>
          <div className="h-2.5 w-full bg-surface-300 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${isFull ? 'bg-crimson' : 'bg-neon-gold'}`}
              style={{ width: `${percentageSlots}%` }}
            />
          </div>
        </div>

        {/* Schedule Row */}
        {(tournament.matchDate || tournament.matchTime) && (
          <div className="flex items-center gap-2 px-1 text-xs text-slate-400">
            <Clock size={12} className="text-primary shrink-0" />
            <span className="font-semibold">
              {tournament.matchDate || ''}{tournament.matchDate && tournament.matchTime ? ' · ' : ''}{tournament.matchTime || ''}
            </span>
          </div>
        )}

        {/* CTA */}
        <div className="mt-2 flex flex-col gap-2">
          {/* Live Match YouTube Watch Button */}
          {isLive && tournament.liveStreamUrl && (
            <a
              href={tournament.liveStreamUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-red-600 to-crimson py-3 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(255,0,0,0.5)] hover:shadow-[0_0_30px_rgba(255,0,0,0.7)] transition"
            >
              <Youtube className="h-4 w-4" />
              <span>Watch Live Stream</span>
            </a>
          )}

          {isCompleted ? (
            <button onClick={(e) => { e.stopPropagation(); onViewDetails(tournament); }} className="w-full py-3.5 rounded-xl bg-surface-300 border border-emerald-500/30 text-emerald-400 text-sm font-black uppercase hover:bg-surface-300/80 transition-colors">
              View Results →
            </button>
          ) : isUserRegistered ? (
            <span className="w-full py-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-sm font-black uppercase flex items-center justify-center gap-2">
              <CheckCircle2 size={18}/> Registered
            </span>
          ) : isFull ? (
            <button disabled className="w-full py-3.5 rounded-xl bg-surface-300 text-slate-500 text-sm font-black uppercase cursor-not-allowed">
              Registration Closed
            </button>
          ) : (
            <button 
              onClick={(e) => { e.stopPropagation(); onJoin(tournament); }} 
              className="w-full py-3.5 rounded-xl bg-crimson hover:bg-crimson-light text-white text-[13px] font-black uppercase tracking-wider transition-colors shadow-[0_0_20px_rgba(255,0,60,0.3)] hover:shadow-[0_0_30px_rgba(255,0,60,0.5)] flex items-center justify-center gap-1.5"
            >
              <span>{currentUser ? 'Join Tournament' : 'Sign in to Join'}</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
