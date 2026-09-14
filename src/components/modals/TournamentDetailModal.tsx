'use client';

import React from 'react';
import { Tournament } from '../../data/mockData';
import { X, Trophy, Swords, MapPin, Clock, ShieldCheck, Flame } from 'lucide-react';

interface TournamentDetailModalProps {
  tournament: Tournament | null;
  onClose: () => void;
  onJoin: (tournament: Tournament) => void;
}

export const TournamentDetailModal: React.FC<TournamentDetailModalProps> = ({
  tournament,
  onClose,
  onJoin,
}) => {
  if (!tournament) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-neon-purple/50 bg-surface-100 p-6 shadow-[0_0_60px_rgba(168,85,247,0.3)] sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full border border-purple-900/40 bg-surface-200 p-2 text-slate-400 hover:text-white hover:border-neon-purple"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 mb-6 border-b border-purple-900/40 pb-5">
          <div className="flex items-center space-x-2">
            <span className="rounded-lg bg-neon-purple/20 px-2.5 py-1 text-[11px] font-black uppercase text-neon-purple-light border border-neon-purple/40">
              {tournament.type}
            </span>
            <span className="rounded-lg bg-neon-cyan/20 px-2.5 py-1 text-[11px] font-black uppercase text-neon-cyan border border-neon-cyan/40">
              {tournament.game}
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase font-display">
            {tournament.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300 pt-1">
            <span className="flex items-center space-x-1">
              <MapPin className="h-4 w-4 text-neon-purple-light" />
              <span>Map: {tournament.map}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-neon-cyan" />
              <span>Time: {tournament.startTime}</span>
            </span>
          </div>
        </div>

        {/* Prize Pool Distribution Breakdown Table */}
        <div className="mb-6 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
            <Trophy className="h-4 w-4 text-neon-gold" />
            <span>Prize Pool Distribution (PKR)</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            
            <div className="rounded-2xl border border-neon-gold/40 bg-surface-200 p-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase">1st Place 🥇</span>
              <p className="text-base font-black text-neon-gold font-display mt-0.5">
                PKR {tournament.prizes.first.toLocaleString()}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-400/30 bg-surface-200 p-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase">2nd Place 🥈</span>
              <p className="text-base font-black text-slate-200 font-display mt-0.5">
                PKR {tournament.prizes.second.toLocaleString()}
              </p>
            </div>

            <div className="rounded-2xl border border-amber-600/30 bg-surface-200 p-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase">3rd Place 🥉</span>
              <p className="text-base font-black text-amber-500 font-display mt-0.5">
                PKR {tournament.prizes.third.toLocaleString()}
              </p>
            </div>

            <div className="rounded-2xl border border-neon-purple/40 bg-surface-200 p-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Per Kill Bonus 🎯</span>
              <p className="text-base font-black text-neon-purple-light font-display mt-0.5">
                {tournament.prizes.perKillBonus > 0 ? `PKR ${tournament.prizes.perKillBonus}` : 'N/A'}
              </p>
            </div>

          </div>
        </div>

        {/* Tournament Rules List */}
        <div className="mb-6 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
            <ShieldCheck className="h-4 w-4 text-neon-cyan" />
            <span>Official Match Rules</span>
          </h3>

          <div className="rounded-2xl border border-purple-900/30 bg-surface-200/60 p-4 space-y-2 text-xs text-slate-300">
            {tournament.rules.map((rule, idx) => (
              <div key={idx} className="flex items-start space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-purple-light mt-1.5 shrink-0" />
                <p>{rule}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Join Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              onClose();
              onJoin(tournament);
            }}
            className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-neon-purple-dark via-neon-purple to-neon-purple-light py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all hover:scale-102 active:scale-95"
          >
            <Swords className="h-5 w-5 text-neon-cyan" />
            <span>PROCEED TO JOIN MATCH</span>
          </button>
        </div>

      </div>
    </div>
  );
};
