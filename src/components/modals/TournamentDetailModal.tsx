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
  const isUserRegistered = Boolean(currentUser) && registeredTournaments.includes(tournament.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border border-crimson/40 bg-surface-100 shadow-[0_0_50px_rgba(255,0,60,0.3)]">

        {/* Sticky Close Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-end px-5 pt-4 pb-2 bg-surface-100 rounded-t-3xl border-b border-white/5">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-full bg-surface-200 hover:bg-crimson/20 border border-white/10 hover:border-crimson/40 px-3 py-1.5 text-slate-400 hover:text-white transition-colors text-xs font-bold"
          >
            <X className="h-4 w-4" /> Close
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 pt-4">

        {/* Banner image if present */}
        {tournament.bannerImage && (
          <div className="relative w-full h-40 sm:h-52 rounded-2xl overflow-hidden mb-4 border border-white/10 bg-surface-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={tournament.bannerImage} alt={tournament.title} className="w-full h-full object-contain" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
          </div>
        )}

        {/* Modal Title & Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="rounded-lg bg-crimson/20 px-3 py-1 text-xs font-black uppercase text-crimson border border-crimson/40">
            {tournament.category || tournament.type} • {tournament.format || tournament.type}
          </span>
          {tournament.mode && (
            <span className="rounded-lg bg-primary/20 px-2.5 py-1 text-xs font-black uppercase text-primary border border-primary/40">
              {tournament.mode}
            </span>
          )}
          <span className="rounded-lg bg-neon-gold/20 px-3 py-1 text-xs font-black uppercase text-neon-gold border border-neon-gold/40">
            {tournament.game}
          </span>
          <span className="flex items-center space-x-1 rounded-lg bg-surface-300 px-3 py-1 text-xs font-bold text-slate-300">
            <MapPin className="h-3 w-3" />
            <span>{tournament.map}</span>
          </span>
          {tournament.mapCode && (
            <span className="flex items-center space-x-1 rounded-md bg-amber-500/20 px-2 py-0.5 text-[11px] font-mono text-amber-400 border border-amber-500/40">
              <span>Code: {tournament.mapCode}</span>
            </span>
          )}
          <span className="flex items-center space-x-1 rounded-lg bg-primary/20 border border-primary/40 px-2.5 py-1 text-xs font-bold text-primary">
            <Clock className="h-3.5 w-3.5" />
            <span>{tournament.matchDate || 'Sat/Sun'} · {tournament.matchTime || tournament.startTime}</span>
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase font-display tracking-wide">
          {tournament.title}
        </h2>
        <p className="text-xs text-slate-400 mt-1">{tournament.description || 'Official competitive Free Fire custom match'}</p>

        {tournament.allowedWeapons && tournament.allowedWeapons.length > 0 && (
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <span>🔫 Allowed Weapons:</span>
            <span>{tournament.allowedWeapons.join(' • ')}</span>
          </div>
        )}

        {/* Winner Highlight if match completed */}
        {isCompleted && tournament.winner && (
          <div className="mt-4 rounded-2xl border border-neon-gold/50 bg-gradient-to-r from-neon-gold/20 via-surface-200 to-black p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neon-gold/20 text-neon-gold border border-neon-gold/40">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-neon-gold tracking-wider">★ BOOYAH WINNER</span>
                <p className="text-base font-black text-white">{tournament.winner.name}</p>
                <p className="text-xs font-mono text-slate-300">FF UID: {tournament.winner.uid} • Total Kills: {tournament.winner.kills}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Confirmed Payout</span>
              <p className="text-lg font-black text-emerald-400">PKR {tournament.winner.prizePKR.toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* Prize Pool Breakdown Cards (1st to 6th) */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-neon-gold tracking-wider">
              🏆 Prize Distribution (Pool: PKR {tournament.prizePool.toLocaleString()})
            </span>
            {tournament.hasPerKill && tournament.perKill > 0 && (
              <span className="text-xs font-bold text-crimson">
                Per Kill: PKR {tournament.perKill}
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-center">
            {tournament.prizes.first > 0 && (
              <div className="rounded-xl border border-neon-gold/50 bg-neon-gold/10 p-2.5">
                <span className="text-[10px] font-black uppercase text-neon-gold block">🥇 1st (Booyah)</span>
                <p className="text-sm font-black text-white mt-0.5">PKR {tournament.prizes.first.toLocaleString()}</p>
              </div>
            )}
            {Boolean(tournament.prizes.second && tournament.prizes.second > 0) && (
              <div className="rounded-xl border border-white/20 bg-surface-200 p-2.5">
                <span className="text-[10px] font-bold uppercase text-slate-300 block">🥈 2nd Place</span>
                <p className="text-sm font-black text-white mt-0.5">PKR {tournament.prizes.second.toLocaleString()}</p>
              </div>
            )}
            {Boolean(tournament.prizes.third && tournament.prizes.third > 0) && (
              <div className="rounded-xl border border-white/10 bg-surface-200 p-2.5">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">🥉 3rd Place</span>
                <p className="text-sm font-black text-slate-200 mt-0.5">PKR {tournament.prizes.third.toLocaleString()}</p>
              </div>
            )}
            {Boolean(tournament.prizes.fourth && tournament.prizes.fourth > 0) && (
              <div className="rounded-xl border border-white/10 bg-surface-200 p-2.5">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">4th Place</span>
                <p className="text-sm font-black text-slate-200 mt-0.5">PKR {tournament.prizes.fourth?.toLocaleString()}</p>
              </div>
            )}
            {Boolean(tournament.prizes.fifth && tournament.prizes.fifth > 0) && (
              <div className="rounded-xl border border-white/10 bg-surface-200 p-2.5">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">5th Place</span>
                <p className="text-sm font-black text-slate-200 mt-0.5">PKR {tournament.prizes.fifth?.toLocaleString()}</p>
              </div>
            )}
            {Boolean(tournament.prizes.sixth && tournament.prizes.sixth > 0) && (
              <div className="rounded-xl border border-white/10 bg-surface-200 p-2.5">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">6th Place</span>
                <p className="text-sm font-black text-slate-200 mt-0.5">PKR {tournament.prizes.sixth?.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>



        {/* Match Highlights & Details */}
        {tournament.bulletPoints && tournament.bulletPoints.length > 0 && (
          <div className="mt-5 space-y-2">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
              MATCH HIGHLIGHTS
            </h4>
            <div className="space-y-1.5 rounded-xl border border-white/10 bg-surface-200/50 p-3.5">
              {tournament.bulletPoints.map((bp, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-slate-200">
                  <span className="text-primary font-black text-sm leading-none">•</span>
                  <span>{bp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rules Box — only show DB rules, no hardcoded duplicates */}
        {tournament.rules && tournament.rules.length > 0 && (
          <div className="mt-5 rounded-2xl border border-primary/40 bg-surface-200/80 p-4 space-y-2.5 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h4 className="text-xs font-black uppercase text-primary tracking-wider flex items-center gap-1.5">
                <Shield className="h-4 w-4" />
                OFFICIAL MATCH RULES & REQUIREMENTS
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary uppercase border border-primary/30">
                Strictly Enforced
              </span>
            </div>

            <div className="space-y-1.5">
              {tournament.rules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-primary font-black mt-0.5 shrink-0">•</span>
                  <span className="leading-relaxed">{rule}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Stream, WhatsApp & Action Buttons */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-2.5">
          {tournament.liveStreamUrl && (
            <a
              href={tournament.liveStreamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 rounded-xl bg-red-600 hover:bg-red-700 px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg transition shrink-0"
            >
              <Youtube className="h-4 w-4" />
              <span>Watch Live</span>
            </a>
          )}

          <a
            href={`https://wa.me/923190799711?text=${encodeURIComponent(`Hello Admin, I need help with match: "${tournament.title}" (ID: ${tournament.id})`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 rounded-xl bg-emerald-600/20 border border-emerald-500/40 hover:bg-emerald-600 text-emerald-400 hover:text-white px-4 py-3 text-xs font-black uppercase tracking-wider transition shrink-0"
          >
            <span>💬 Match Support</span>
          </a>

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
        </div>{/* end scrollable content */}

      </div>
    </div>
  );
};
