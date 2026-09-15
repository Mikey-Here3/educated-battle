'use client';

import React from 'react';
import { Tournament } from '../../data/mockData';
import { useAuth } from '@/context/AuthContext';
import { X, Trophy, Swords, Shield, Clock, MapPin, Users, CheckCircle2, Youtube, Flame, Award } from 'lucide-react';

interface TournamentDetailModalProps {
  tournament: Tournament | null;
  isOpen: boolean;
  onClose: () => void;
  onJoin: (tournament: Tournament) => void;
}

export const TournamentDetailModal: React.FC<TournamentDetailModalProps> = ({
  tournament,
  isOpen,
  onClose,
  onJoin,
}) => {
  const { currentUser, registeredTournaments } = useAuth();
  if (!isOpen || !tournament) return null;

  const isFull = tournament.slotsFilled >= tournament.totalSlots;
  const isCompleted = tournament.status === 'completed';
  const isUserRegistered = registeredTournaments.includes(tournament.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-crimson/40 bg-surface-100 p-6 sm:p-8 shadow-[0_0_50px_rgba(255,0,60,0.3)] my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-surface-200 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Title & Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="rounded-lg bg-crimson/20 px-3 py-1 text-xs font-black uppercase text-crimson border border-crimson/40">
            {tournament.type}
          </span>
          <span className="rounded-lg bg-neon-gold/20 px-3 py-1 text-xs font-black uppercase text-neon-gold border border-neon-gold/40">
            {tournament.game}
          </span>
          <span className="flex items-center space-x-1 rounded-lg bg-surface-300 px-3 py-1 text-xs font-bold text-slate-300">
            <MapPin className="h-3 w-3 text-slate-400" />
            <span>{tournament.map}</span>
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase font-display tracking-wide">
          {tournament.title}
        </h2>
        <p className="text-xs text-slate-400 mt-1">{tournament.description || 'Official competitive Free Fire custom match'}</p>

        {/* Winner Highlight if match completed */}
        {isCompleted && tournament.winner && (
          <div className="mt-4 rounded-2xl border border-neon-gold/50 bg-gradient-to-r from-neon-gold/20 via-surface-200 to-black p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neon-gold/20 text-neon-gold border border-neon-gold/40">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-neon-gold tracking-wider">?? BOOYAH WINNER</span>
                <p className="text-base font-black text-white">{tournament.winner.name}</p>
                <p className="text-xs font-mono text-slate-300">FF UID: {tournament.winner.uid} ? Total Kills: {tournament.winner.kills}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Confirmed Payout</span>
              <p className="text-lg font-black text-emerald-400">PKR {tournament.winner.prizePKR.toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* Prize Pool Breakdown Cards */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          <div className="rounded-xl border border-neon-gold/40 bg-surface-200 p-3">
            <span className="text-[10px] font-bold uppercase text-neon-gold">1st Place (Booyah)</span>
            <p className="text-base font-black text-white">PKR {tournament.prizes.first.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-surface-200 p-3">
            <span className="text-[10px] font-bold uppercase text-slate-400">2nd Place</span>
            <p className="text-base font-black text-slate-200">PKR {tournament.prizes.second.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-surface-200 p-3">
            <span className="text-[10px] font-bold uppercase text-slate-400">3rd Place</span>
            <p className="text-base font-black text-slate-200">PKR {tournament.prizes.third.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-crimson/40 bg-surface-200 p-3">
            <span className="text-[10px] font-bold uppercase text-crimson">Per Kill Bonus</span>
            <p className="text-base font-black text-crimson">
              {tournament.hasPerKill && tournament.perKill > 0 ? `PKR ${tournament.perKill}` : 'N/A'}
            </p>
          </div>
        </div>

        {/* Match Guidelines & Bullet Points */}
        <div className="mt-6 space-y-3">
          <h4 className="text-xs font-black uppercase text-neon-gold tracking-wider">
            MATCH HIGHLIGHTS & DETAILS
          </h4>
          <div className="space-y-2 rounded-2xl border border-white/10 bg-surface-200/60 p-4">
            {tournament.bulletPoints && tournament.bulletPoints.length > 0 ? (
              tournament.bulletPoints.map((bp, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-slate-200">
                  <span className="text-crimson font-black text-sm leading-none">?</span>
                  <span>{bp}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">Standard competitive rules apply.</p>
            )}
          </div>
        </div>

        {/* Fair Play Rules */}
        <div className="mt-4 space-y-2">
          <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
            FAIR PLAY RULES
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
            {tournament.rules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>

        {/* Live Stream & Action Buttons */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
          {tournament.liveStreamUrl && (
            <a
              href={tournament.liveStreamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 rounded-xl bg-red-600 hover:bg-red-700 px-5 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg transition"
            >
              <Youtube className="h-4 w-4" />
              <span>Watch on YouTube</span>
            </a>
          )}

          {!isCompleted && !isFull && !isUserRegistered && (
            <button
              onClick={() => {
                onClose();
                onJoin(tournament);
              }}
              className="flex-grow rounded-xl bg-gradient-to-r from-crimson to-crimson-dark py-3 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_25px_rgba(255,0,60,0.4)] transition hover:shadow-[0_0_35px_rgba(255,0,60,0.6)]"
            >
              Join Tournament Slot
            </button>
          )}

          {isUserRegistered && (
            <div className="flex-grow flex items-center justify-center space-x-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 py-3 text-xs font-black text-emerald-400 uppercase">
              <CheckCircle2 className="h-4 w-4" />
              <span>You Are Registered in this Tournament</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
